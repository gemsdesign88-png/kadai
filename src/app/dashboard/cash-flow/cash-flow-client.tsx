"use client"

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useLanguage } from '@/lib/i18n/context'
import {
  DollarSign,
  Plus,
  TrendingUp,
  TrendingDown,
  Calendar,
  Receipt,
  Users,
  ShoppingCart,
  FileText,
  Edit,
  Trash2,
  Search,
  Archive,
  CreditCard,
  Wallet,
  PieChart,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
} from 'lucide-react'
import { translations } from "@/lib/i18n/translations"
import { createDashboardTranslator } from '@/lib/i18n/dashboard-translator'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar, Legend } from 'recharts'

type TransactionType = 'income' | 'expense' | 'debt'

type IncomeCategory = 'sales' | 'investment' | 'other_income' | 'order'
type ExpenseCategory = 'operational' | 'stock_purchase' | 'salary' | 'capital'
type DebtCategory = 'supplier' | 'loan' | 'equipment' | 'other_debt'

type TransactionCategory = IncomeCategory | ExpenseCategory | DebtCategory

interface CashFlowTransaction {
  id: string
  restaurant_id: string
  transaction_type: TransactionType
  category: TransactionCategory
  amount: number
  description: string
  date: string
  created_at: string
  created_by: string
  ingredient_id?: string
  quantity?: number
  ingredient?: {
    name: string
    unit: string
  }
  employee_id?: string
  order_id?: string
  order?: {
    id: string
    total_amount?: number
    total?: number
    table_number?: string | null
  }
  // Debt specific fields
  creditor_name?: string
  due_date?: string
  status?: 'active' | 'paid' | 'overdue'
}

interface Debt {
  id: string
  restaurant_id: string
  creditor_name: string
  amount: number
  amount_paid: number
  remaining_amount: number
  description: string
  due_date: string
  status: 'active' | 'partial' | 'paid' | 'overdue'
  created_at: string
  updated_at: string
  created_by: string
  payments?: DebtPayment[]
}

interface DebtPayment {
  id: string
  debt_id: string
  amount: number
  payment_date: string
  notes: string
  created_at: string
  transaction_id?: string
}

interface CashFlowStats {
  totalIncome: number
  totalExpenses: number
  totalDebt: number
  netWorth: number
  monthlyIncome: number
  monthlyExpenses: number
  monthlyDebt: number
  cashFlow: number
  categoryBreakdown: Record<TransactionCategory, number>
  debtBreakdown: Record<string, number>
  cashFlowTrend: Array<{ period: string; income: number; expenses: number; debt: number; net: number }>
}

const categoryIcons = {
  // Income categories
  sales: DollarSign,
  investment: TrendingUp,
  other_income: DollarSign,
  order: CreditCard,
  // Expense categories
  operational: Receipt,
  stock_purchase: ShoppingCart,
  salary: Users,
  capital: FileText,
  // Debt categories
  supplier: ShoppingCart,
  loan: Wallet,
  equipment: FileText,
  other_debt: AlertTriangle
}

const categoryLabels = {
  // Income categories
  sales: 'Sales',
  investment: 'Investment',
  other_income: 'Other Income',
  order: 'Order Income',
  // Expense categories
  operational: 'Operational',
  stock_purchase: 'Stock Purchase',
  salary: 'Salary',
  capital: 'Capital Expenditure',
  // Debt categories
  supplier: 'Supplier Debt',
  loan: 'Loan',
  equipment: 'Equipment Debt',
  other_debt: 'Other Debt'
}

const debtStatusColors = {
  active: 'bg-yellow-100 text-yellow-800',
  partial: 'bg-blue-100 text-blue-800',
  paid: 'bg-green-100 text-green-800',
  overdue: 'bg-red-100 text-red-800'
}

const debtStatusIcons = {
  active: Clock,
  partial: Clock,
  paid: CheckCircle,
  overdue: AlertTriangle
}

export default function CashFlowClient() {
  const router = useRouter()
  const supabase = createClient()
  const { language } = useLanguage()
  const { t: dt, locale } = useMemo(() => createDashboardTranslator(language), [language])
  const cashFlowTranslations = translations[language].expenses

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [restaurant, setRestaurant] = useState<any>(null)
  const [transactions, setTransactions] = useState<CashFlowTransaction[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [debts, setDebts] = useState<Debt[]>([])
  const [ingredients, setIngredients] = useState<any[]>([])
  const [stats, setStats] = useState<CashFlowStats>({
    totalIncome: 0,
    totalExpenses: 0,
    totalDebt: 0,
    netWorth: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    monthlyDebt: 0,
    cashFlow: 0,
    categoryBreakdown: {} as Record<TransactionCategory, number>,
    debtBreakdown: {} as Record<string, number>,
    cashFlowTrend: []
  })

  const [showAddModal, setShowAddModal] = useState(false)
  const [showDebtModal, setShowDebtModal] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<CashFlowTransaction | null>(null)
  const [editingDebt, setEditingDebt] = useState<Debt | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [trendRange, setTrendRange] = useState<'1D' | '1W' | '1M' | '6M' | '1Y' | 'ALL'>('ALL')
  const [employees, setEmployees] = useState<any[]>([])
  const [ingredientSearch, setIngredientSearch] = useState('')
  const [employeeSearch, setEmployeeSearch] = useState('')
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const categoryLabel = (category: TransactionCategory) => {
    return (cashFlowTranslations.categories as any)[category] || categoryLabels[category] || category
  }

  const getRangeStart = (range: typeof trendRange) => {
    const d = new Date()
    switch (range) {
      case '1D':
        d.setDate(d.getDate() - 1)
        break
      case '1W':
        d.setDate(d.getDate() - 7)
        break
      case '1M':
        d.setMonth(d.getMonth() - 1)
        break
      case '6M':
        d.setMonth(d.getMonth() - 6)
        break
      case '1Y':
        d.setFullYear(d.getFullYear() - 1)
        break
      case 'ALL':
      default:
        d.setFullYear(1970)
        break
    }
    return d
  }

  const [formData, setFormData] = useState({
    transaction_type: 'income' as TransactionType,
    category: 'sales' as TransactionCategory,
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    ingredientId: '',
    quantity: '',
    employeeId: '',
    orderId: '',
    unit: ''
  })

  const [debtFormData, setDebtFormData] = useState({
    creditor_name: '',
    amount: '',
    description: '',
    due_date: '',
    status: 'active' as 'active' | 'partial' | 'paid' | 'overdue'
  })

  const [paymentFormData, setPaymentFormData] = useState({
    amount: '',
    payment_date: new Date().toISOString().split('T')[0],
    notes: ''
  })

  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedDebtForPayment, setSelectedDebtForPayment] = useState<Debt | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    // Recalculate stats when range or data updates
    if (!loading) {
      calculateStats(transactionsInRange, debtsInRange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trendRange, language, transactions, debts])

  useEffect(() => {
    // Reset search states when modal opens
    if (showAddModal) {
      setIngredientSearch('')
      setEmployeeSearch('')
    }
  }, [showAddModal])

  async function loadData() {
    try {
      setLoading(true)
      setError(null)

      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError) throw userError
      if (!user) {
        router.push('/login')
        return
      }

      // Get user's restaurants
      const { data: restaurantsData, error: restaurantsError } = await supabase
        .from('restaurants')
        .select('*')
        .eq('owner_id', user.id)

      if (restaurantsError) {
        throw new Error(`Failed to load restaurants: ${restaurantsError.message}`)
      }

      if (!restaurantsData || restaurantsData.length === 0) {
        router.push('/dashboard')
        return
      }

      // Get selected restaurant from localStorage or use first one
      let selectedRestaurant = restaurantsData[0]
      let savedRestaurantId: string | null = null

      if (typeof window !== 'undefined') {
        try {
          savedRestaurantId = localStorage.getItem('selected_restaurant_id')
        } catch (error) {
          console.warn('Error accessing localStorage:', error)
        }
      }

      if (savedRestaurantId) {
        const saved = restaurantsData.find(r => r.id === savedRestaurantId)
        if (saved) {
          selectedRestaurant = saved
        }
      }

      setRestaurant(selectedRestaurant)

      // Load transactions
      let transactionsData: any[] = []
      try {
        const { data: simpleData, error: simpleError } = await supabase
          .from('expenses')
          .select('id, restaurant_id, category, amount, description, date, created_at, created_by, transaction_type, ingredient_id, employee_id, order_id, quantity, ingredients(id, name, unit)')
          .eq('restaurant_id', selectedRestaurant.id)
          .order('date', { ascending: false })
          .limit(1000)

        if (!simpleError) {
          transactionsData = simpleData || []
        }
      } catch (error) {
        console.warn('Error with simple expenses query:', error)
      }

      // Load debts
      let debtsData: any[] = []
      try {
        const { data: debtsResult, error: debtsError } = await supabase
          .from('debts')
          .select('*')
          .eq('restaurant_id', selectedRestaurant.id)
          .order('due_date', { ascending: true })

        if (!debtsError) {
          debtsData = (debtsResult || []).map(debt => ({
            ...debt,
            amount_paid: debt.amount_paid ?? 0,
            remaining_amount: debt.remaining_amount ?? debt.amount,
            status: debt.status || 'active'
          }))
        }
      } catch (error) {
        console.warn('Error querying debts table:', error)
      }

      // Load orders as income
      let ordersData: any[] = []
      try {
        const { data: allOrders, error: allOrdersError } = await supabase
          .from('orders')
          .select('id, total, table_number, created_at, status, payment_status')
          .eq('restaurant_id', selectedRestaurant.id)
          .order('created_at', { ascending: false })
          .limit(1000)

        if (!allOrdersError && allOrders) {
          const normalizedOrders = allOrders.map(o => ({
            ...o,
            total_amount: Number((o as any).total ?? (o as any).total_amount ?? 0)
          }))

          ordersData = normalizedOrders.filter(order => {
            const status = (order.status || '').toLowerCase()
            const isCancelled = ['cancelled', 'canceled', 'void', 'refunded'].includes(status)
            return !isCancelled && order.total_amount > 0
          })
        }
      } catch (error) {
        console.warn('Error with orders query:', error)
      }

      // Load ingredients
      let ingredientsData: any[] = []
      try {
        const { data: ingredientsResult, error: ingredientsError } = await supabase
          .from('ingredients')
          .select('id, name, unit')
          .eq('restaurant_id', selectedRestaurant.id)
          .order('name')

        if (!ingredientsError) {
          ingredientsData = ingredientsResult || []
        }
      } catch (error) {
        console.warn('Error loading ingredients:', error)
      }

      // Load employees
      let employeesData: any[] = []
      try {
        const { data: employeesResult, error: employeesError } = await supabase
          .from('staff')
          .select('id, name')
          .eq('restaurant_id', selectedRestaurant.id)
          .order('name')

        if (!employeesError) {
          employeesData = employeesResult || []
        }
      } catch (error) {
        console.warn('Error loading employees:', error)
      }

      // Process data
      const processedTransactions = (transactionsData || []).map(transaction => {
        let ingredient = null
        if (transaction.ingredients) {
          ingredient = Array.isArray(transaction.ingredients) ? transaction.ingredients[0] : transaction.ingredients
        } else if (transaction.ingredient) {
          ingredient = transaction.ingredient
        }
        
        return {
          ...transaction,
          transaction_type: transaction.transaction_type || 'expense',
          ingredient: ingredient,
          order: transaction.order || null
        }
      })

      const orderTransactions = (ordersData || [])
        .map(order => ({
          id: `order-${order.id}`,
          restaurant_id: selectedRestaurant.id,
          transaction_type: 'income' as TransactionType,
          category: 'order' as TransactionCategory,
          amount: order.total ?? order.total_amount ?? 0,
          description: `Order ${order.table_number ? `#${order.table_number}` : `(ID: ${order.id.slice(-8)})`}`,
          date: order.created_at.split('T')[0],
          created_at: order.created_at,
          created_by: '',
          order_id: order.id,
          ingredient: null,
          order: {
            id: order.id,
            total_amount: order.total ?? order.total_amount ?? 0,
            total: order.total ?? order.total_amount ?? 0,
            table_number: order.table_number || null
          }
        }))

      const allTransactions = [...processedTransactions, ...orderTransactions]

      setTransactions(allTransactions)
      setOrders(ordersData)
      setDebts(debtsData)
      setIngredients(ingredientsData)
      setEmployees(employeesData)
      calculateStats(allTransactions, debtsData)

    } catch (error) {
      console.error('Error loading data:', error)
      setError(error instanceof Error ? error.message : 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  function calculateStats(transactions: CashFlowTransaction[], debts: Debt[]) {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()
    const startDate = getRangeStart(trendRange)

    let totalIncome = 0
    let totalExpenses = 0
    let totalDebt = 0
    let monthlyIncome = 0
    let monthlyExpenses = 0
    let monthlyDebt = 0

    const categoryBreakdown: Record<string, number> = {}
    const debtBreakdown: Record<string, number> = {}

    const rangeTransactions = transactions.filter(t => new Date(t.date) >= startDate)
    const rangeDebts = debts.filter(d => (d.status === 'active' || d.status === 'overdue') && (!d.due_date || new Date(d.due_date) >= startDate))

    rangeTransactions.forEach(transaction => {
      const amount = transaction.amount
      const transactionDate = new Date(transaction.date)
      const isCurrentMonth = transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear

      if (transaction.transaction_type === 'income') {
        totalIncome += amount
        if (isCurrentMonth) monthlyIncome += amount
      } else if (transaction.transaction_type === 'expense') {
        totalExpenses += amount
        if (isCurrentMonth) monthlyExpenses += amount
      }

      categoryBreakdown[transaction.category] = (categoryBreakdown[transaction.category] || 0) + amount
    })

    rangeDebts.forEach(debt => {
      totalDebt += debt.amount
      const dueDate = debt.due_date ? new Date(debt.due_date) : null
      const isCurrentMonth = dueDate ? (dueDate.getMonth() === currentMonth && dueDate.getFullYear() === currentYear) : false
      if (isCurrentMonth) monthlyDebt += debt.amount

      debtBreakdown[debt.status] = (debtBreakdown[debt.status] || 0) + debt.amount
    })

    monthlyIncome = totalIncome
    monthlyExpenses = totalExpenses
    monthlyDebt = totalDebt

    const netWorth = totalIncome - totalExpenses - totalDebt
    const cashFlow = monthlyIncome - monthlyExpenses - monthlyDebt

    const trendData: Array<{ period: string; income: number; expenses: number; debt: number; net: number }> = []
    const formatterLocale = language === 'id' ? 'id-ID' : 'en-US'

    const addPoint = (label: string, incomeVal: number, expenseVal: number, debtVal: number, netVal: number) => {
      trendData.push({
        period: label,
        income: incomeVal,
        expenses: expenseVal,
        debt: debtVal,
        net: netVal
      })
    }

    const bucketKey = (date: Date) => {
      if (trendRange === '1D') return date.getHours().toString()
      if (trendRange === '1W') return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
      if (trendRange === '1M') return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
      if (trendRange === '6M') return `${date.getFullYear()}-${date.getMonth()}`
      if (trendRange === '1Y') return `${date.getFullYear()}-${date.getMonth()}`
      return `${date.getFullYear()}-${date.getMonth()}`
    }

    const buckets = new Map<string, { income: number; expenses: number; debt: number; date: Date }>()

    const upsertBucket = (key: string, date: Date, incomeVal: number, expenseVal: number, debtVal: number) => {
      const existing = buckets.get(key)
      const payload = existing || { income: 0, expenses: 0, debt: 0, date }
      payload.income += incomeVal
      payload.expenses += expenseVal
      payload.debt += debtVal
      buckets.set(key, payload)
    }

    rangeTransactions.forEach(t => {
      const d = new Date(t.date)
      const key = bucketKey(d)
      upsertBucket(key, d, t.transaction_type === 'income' ? t.amount : 0, t.transaction_type === 'expense' ? t.amount : 0, 0)
    })

    rangeDebts.forEach(d => {
      if (!d.due_date) return
      const due = new Date(d.due_date)
      if (due < startDate) return
      const key = bucketKey(due)
      upsertBucket(key, due, 0, 0, d.amount)
    })

    const sorted = Array.from(buckets.entries()).sort((a, b) => a[1].date.getTime() - b[1].date.getTime())

    sorted.forEach(([, value]) => {
      const { date, income: incomeVal, expenses: expenseVal, debt: debtVal } = value

      let label = date.toLocaleDateString(formatterLocale, { month: 'short', year: 'numeric' })
      if (trendRange === '1D') label = `${date.getHours()}:00`
      if (trendRange === '1W' || trendRange === '1M') label = date.toLocaleDateString(formatterLocale, { day: 'numeric', month: 'short' })

      addPoint(label, incomeVal, expenseVal, debtVal, incomeVal - expenseVal - debtVal)
    })

    setStats({
      totalIncome,
      totalExpenses,
      totalDebt,
      netWorth,
      monthlyIncome,
      monthlyExpenses,
      monthlyDebt,
      cashFlow,
      categoryBreakdown,
      debtBreakdown,
      cashFlowTrend: trendData
    })
  }

  async function handleSubmitTransaction(e: React.FormEvent) {
    e.preventDefault()
    if (!restaurant) return

    const amount = parseFloat(formData.amount)
    if (isNaN(amount) || amount <= 0) {
      alert(dt.alertValidAmount)
      return
    }

    if (formData.transaction_type === 'expense' && formData.category === 'stock_purchase') {
      if (!formData.ingredientId.trim()) {
        alert(dt.alertSelectIngredient)
        return
      }
      if (!formData.quantity.trim() || parseFloat(formData.quantity) <= 0) {
        alert(dt.alertValidQuantity)
        return
      }
    }

    let description = formData.description
    if (formData.transaction_type === 'expense' && formData.category === 'stock_purchase' && formData.ingredientId && formData.quantity) {
      const ingredient = ingredients.find(i => i.id === formData.ingredientId)
      if (ingredient) {
        description = `${formData.quantity}${ingredient.unit} ${ingredient.name}`
      }
    } else if (formData.transaction_type === 'expense' && formData.category === 'salary' && formData.employeeId) {
      const employee = employees.find(e => e.id === formData.employeeId)
      if (employee) {
        description = `gaji ${employee.name}`
      }
    }

    try {
      if (editingTransaction) {
        const updateData: any = {
          transaction_type: formData.transaction_type,
          category: formData.category,
          amount,
          description,
          date: formData.date
        }

        if (formData.transaction_type === 'expense' && formData.category === 'stock_purchase' && formData.ingredientId) {
          updateData.ingredient_id = formData.ingredientId
          updateData.quantity = formData.quantity ? parseFloat(formData.quantity) : null
        } else {
          updateData.ingredient_id = null
          updateData.quantity = null
        }

        if (formData.transaction_type === 'expense' && formData.category === 'salary' && formData.employeeId) {
          updateData.employee_id = formData.employeeId
        } else {
          updateData.employee_id = null
        }

        const { error } = await supabase
          .from('expenses')
          .update(updateData)
          .eq('id', editingTransaction.id)

        if (error) throw error
      } else {
        const insertData: any = {
          restaurant_id: restaurant.id,
          transaction_type: formData.transaction_type,
          category: formData.category,
          amount,
          description,
          date: formData.date
        }

        if (formData.transaction_type === 'expense' && formData.category === 'stock_purchase' && formData.ingredientId) {
          insertData.ingredient_id = formData.ingredientId
          insertData.quantity = formData.quantity ? parseFloat(formData.quantity) : null
        }

        if (formData.transaction_type === 'expense' && formData.category === 'salary' && formData.employeeId) {
          insertData.employee_id = formData.employeeId
        }

        const { error } = await supabase
          .from('expenses')
          .insert(insertData)

        if (error) throw error
      }

      setNotification({
        type: 'success',
        message: editingTransaction ? 'Transaction updated successfully' : 'Transaction added successfully'
      })
      
      setFormData({
        transaction_type: 'income',
        category: 'sales',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        ingredientId: '',
        quantity: '',
        employeeId: '',
        orderId: '',
        unit: ''
      })
      setShowAddModal(false)
      setEditingTransaction(null)
      loadData()
      setTimeout(() => setNotification(null), 3000)

    } catch (error) {
      console.error('Error saving transaction:', error)
      setNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'Error saving transaction'
      })
      setTimeout(() => setNotification(null), 5000)
    }
  }

  async function deleteTransaction(id: string) {
    try {
      if (!restaurant) return
      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id)
        .eq('restaurant_id', restaurant.id)

      if (error) throw error
      loadData()
    } catch (error) {
      console.error('Error deleting transaction:', error)
      alert(dt.alertDeleteError)
    }
  }

  async function handleSubmitDebt(e: React.FormEvent) {
    e.preventDefault()
    if (!restaurant) return

    const amount = parseFloat(debtFormData.amount)
    if (isNaN(amount) || amount <= 0) {
      alert(dt.alertValidAmount)
      return
    }

    if (!debtFormData.creditor_name.trim()) {
      alert(dt.alertEnterCreditor)
      return
    }

    try {
      if (editingDebt) {
        const { error } = await supabase
          .from('debts')
          .update({
            creditor_name: debtFormData.creditor_name,
            amount,
            description: debtFormData.description,
            due_date: debtFormData.due_date,
            status: debtFormData.status
          })
          .eq('id', editingDebt.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('debts')
          .insert({
            restaurant_id: restaurant.id,
            creditor_name: debtFormData.creditor_name,
            amount,
            amount_paid: 0,
            remaining_amount: amount,
            description: debtFormData.description,
            due_date: debtFormData.due_date,
            status: debtFormData.status,
            created_by: (await supabase.auth.getUser()).data.user?.id || ''
          })

        if (error) throw error
      }

      setNotification({
        type: 'success',
        message: editingDebt ? 'Debt updated successfully' : 'Debt added successfully'
      })

      setDebtFormData({
        creditor_name: '',
        amount: '',
        description: '',
        due_date: '',
        status: 'active'
      })
      setShowDebtModal(false)
      setEditingDebt(null)
      loadData()
      setTimeout(() => setNotification(null), 3000)

    } catch (error) {
      console.error('Error saving debt:', error)
      setNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'Error saving debt'
      })
      setTimeout(() => setNotification(null), 5000)
    }
  }

  async function handlePayDebt(e: React.FormEvent) {
    e.preventDefault()
    if (!restaurant || !selectedDebtForPayment) return

    const paymentAmount = parseFloat(paymentFormData.amount)
    if (isNaN(paymentAmount) || paymentAmount <= 0) {
      alert(dt.alertValidPayment)
      return
    }

    if (paymentAmount > selectedDebtForPayment.remaining_amount) {
      alert(`${dt.alertPaymentExceed} (IDR ${selectedDebtForPayment.remaining_amount.toLocaleString()})`)
      return
    }

    try {
      const { data: paymentData, error: paymentError } = await supabase
        .from('debt_payments')
        .insert({
          debt_id: selectedDebtForPayment.id,
          amount: paymentAmount,
          payment_date: paymentFormData.payment_date,
          notes: paymentFormData.notes,
          restaurant_id: restaurant.id
        })
        .select()
        .single()

      if (paymentError) throw paymentError

      const { data: transactionData, error: transactionError } = await supabase
        .from('expenses')
        .insert({
          restaurant_id: restaurant.id,
          transaction_type: 'expense',
          category: 'operational',
          amount: paymentAmount,
          description: `Pembayaran hutang ke ${selectedDebtForPayment.creditor_name}${paymentFormData.notes ? ' - ' + paymentFormData.notes : ''}`,
          date: paymentFormData.payment_date,
          created_by: (await supabase.auth.getUser()).data.user?.id || ''
        })
        .select()
        .single()

      if (transactionError) throw transactionError

      if (paymentData && transactionData) {
        await supabase
          .from('debt_payments')
          .update({ transaction_id: transactionData.id })
          .eq('id', paymentData.id)
      }

      const newAmountPaid = (selectedDebtForPayment.amount_paid || 0) + paymentAmount
      const newRemainingAmount = selectedDebtForPayment.amount - newAmountPaid
      
      let newStatus: 'active' | 'partial' | 'paid' | 'overdue'
      if (newRemainingAmount === 0) {
        newStatus = 'paid'
      } else if (newAmountPaid > 0) {
        newStatus = 'partial'
      } else {
        newStatus = selectedDebtForPayment.status
      }

      const { error: updateError } = await supabase
        .from('debts')
        .update({
          amount_paid: newAmountPaid,
          remaining_amount: newRemainingAmount,
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedDebtForPayment.id)

      if (updateError) throw updateError

      setPaymentFormData({
        amount: '',
        payment_date: new Date().toISOString().split('T')[0],
        notes: ''
      })
      setShowPaymentModal(false)
      setSelectedDebtForPayment(null)
      loadData()

      setNotification({
        type: 'success',
        message: 'Payment recorded successfully'
      })
      setTimeout(() => setNotification(null), 3000)

    } catch (error) {
      console.error('Error recording payment:', error)
      setNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'Error recording payment'
      })
      setTimeout(() => setNotification(null), 5000)
    }
  }

  async function deleteDebt(id: string) {
    try {
      if (!restaurant) return
      const { error } = await supabase
        .from('debts')
        .delete()
        .eq('id', id)
        .eq('restaurant_id', restaurant.id)

      if (error) throw error
      loadData()
    } catch (error) {
      console.error('Error deleting debt:', error)
      alert(dt.alertDeleteDebtError)
    }
  }

  function formatCurrency(amount: number) {
    const formatted = new Intl.NumberFormat(language === 'id' ? 'id-ID' : language === 'zh' ? 'zh-CN' : 'en-US', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
    return formatted.replace(/\s+/g, '')
  }

  function formatAmountInput(value: string): string {
    const numericValue = value.replace(/\D/g, '')
    if (!numericValue) return ''
    return new Intl.NumberFormat('id-ID').format(parseInt(numericValue))
  }

  function parseAmountInput(value: string): string {
    return value.replace(/\D/g, '')
  }

  const rangeStart = getRangeStart(trendRange)
  const transactionsInRange = transactions.filter(t => new Date(t.date) >= rangeStart)
  const debtsInRange = debts.filter(d => (d.status === 'active' || d.status === 'overdue') && (!d.due_date || new Date(d.due_date) >= rangeStart))

  const allTransactionsWithOrders = [
    ...transactionsInRange,
    ...(orders?.map((order, index) => ({
      id: `order-${order.id}-${index}`,
      orderId: order.id,
      date: order.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
      amount: order.total || 0,
      description: `Order #${order.id}`,
      transaction_type: 'income' as const,
      category: 'order' as const
    })) || [])
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const filteredTransactions = allTransactionsWithOrders.filter(transaction => {
    const matchesSearch = (transaction.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (categoryLabel(transaction.category as TransactionCategory) || transaction.category).toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || transaction.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const filteredDebts = debtsInRange.filter(debt => {
    const matchesSearch = (debt.creditor_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (debt.description || '').toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null)
              loadData()
            }}
            className="px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[var(--color-accent)]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{dt.headerTitle}</h1>
              <p className="text-sm sm:text-base text-gray-600">{dt.headerSubtitle}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowDebtModal(true)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 border border-gray-200 rounded-xl font-semibold hover:shadow-sm transition-colors"
              >
                <AlertTriangle className="w-4 h-4 text-red-500" />
                {dt.recordDebt}
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-white rounded-xl font-semibold hover:bg-[var(--color-accent-hover)] transition-colors"
              >
                <Plus className="w-4 h-4" />
                {dt.addTransaction}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {([
              { key: '1D', label: dt.today },
              { key: '1W', label: dt.thisWeek },
              { key: '1M', label: dt.thisMonth },
              { key: '6M', label: dt.sixMonths },
              { key: '1Y', label: dt.thisYear },
              { key: 'ALL', label: dt.allCategories }
            ] as const).map(range => (
              <button
                key={range.key}
                onClick={() => setTrendRange(range.key as typeof trendRange)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  trendRange === range.key
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`relative overflow-hidden rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ${stats.netWorth >= 0 ? 'bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600' : 'bg-gradient-to-br from-red-500 via-rose-500 to-pink-600'}`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Target className="w-6 h-6" />
                </div>
                {stats.netWorth >= 0 ? (
                  <TrendingUp className="w-5 h-5 opacity-60" />
                ) : (
                  <TrendingDown className="w-5 h-5 opacity-60" />
                )}
              </div>
              <p className="text-sm font-medium opacity-90 mb-1">{dt.netWorth}</p>
              <p className="text-3xl font-bold">{formatCurrency(stats.netWorth)}</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-green-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-2xl">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex items-center gap-1 px-3 py-1 bg-green-100 rounded-full">
                <TrendingUp className="w-3 h-3 text-green-700" />
                <span className="text-xs font-bold text-green-700">{trendRange === '1D' ? dt.today : trendRange === '1W' ? dt.thisWeek : trendRange === '1M' ? dt.thisMonth : trendRange === '6M' ? dt.sixMonths : dt.thisYear}</span>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">{dt.totalIncome}</p>
            <p className="text-2xl font-bold text-gray-900 mb-3">{formatCurrency(stats.totalIncome)}</p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">{dt.selectedRange}:</span>
              <span className="font-semibold text-gray-700">{trendRange}</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-red-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-50 rounded-2xl">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex items-center gap-1 px-3 py-1 bg-red-100 rounded-full">
                <TrendingDown className="w-3 h-3 text-red-700" />
                <span className="text-xs font-bold text-red-700">{trendRange === '1D' ? dt.today : trendRange === '1W' ? dt.thisWeek : trendRange === '1M' ? dt.thisMonth : trendRange === '6M' ? dt.sixMonths : dt.thisYear}</span>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">{dt.totalExpenses}</p>
            <p className="text-2xl font-bold text-gray-900 mb-3">{formatCurrency(stats.totalExpenses)}</p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">{dt.selectedRange}:</span>
              <span className="font-semibold text-gray-700">{trendRange}</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-orange-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-50 rounded-2xl">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <span className="px-3 py-1 bg-orange-50 rounded-full text-xs font-medium text-orange-600">
                {debts.filter(d => d.status !== 'paid').length} {dt.active}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">{dt.totalDebt}</p>
            <p className="text-2xl font-bold text-gray-900 mb-1">{formatCurrency(stats.totalDebt)}</p>
            <p className="text-xs text-gray-500">{dt.debtHelper}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{dt.trendTitle}</h3>
                <p className="text-sm text-gray-500 mt-1">{dt.trendSubtitle}</p>
              </div>
            </div>
            <div className="h-96 min-h-[380px]">
              {stats.cashFlowTrend.length ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats.cashFlowTrend} margin={{ top: 10, right: 40, left: 40, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                    <XAxis dataKey="period" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                    <YAxis tickFormatter={(value) => formatCurrency(value)} stroke="#9CA3AF" style={{ fontSize: '12px' }} width={50} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#FFFFFF', 
                        border: '1px solid #E5E7EB', 
                        borderRadius: '12px',
                        padding: '12px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value: any, name: any) => [formatCurrency(value), name]}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={3} name={dt.income} dot={{ fill: '#10B981', r: 5 }} />
                    <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={3} name={dt.expenses} dot={{ fill: '#EF4444', r: 5 }} />
                    <Line type="monotone" dataKey="net" stroke="#3B82F6" strokeWidth={3} name={dt.netCashFlow} dot={{ fill: '#3B82F6', r: 5 }} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500 bg-gray-50/50">
                  <Calendar className="w-12 h-12 text-gray-400 mb-3" />
                  <p className="text-sm font-medium">{dt.trendEmpty}</p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-6">{dt.incomeBreakdown}</h3>
              <div className="space-y-4">
                {Object.entries(stats.categoryBreakdown)
                  .filter(([category]) => ['sales', 'investment', 'other_income', 'order'].includes(category))
                  .map(([category, amount]) => {
                    const Icon = categoryIcons[category as TransactionCategory] || DollarSign
                    const percentage = stats.totalIncome > 0 ? (amount / stats.totalIncome) * 100 : 0
                    return (
                      <div key={category} className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-transparent rounded-2xl border border-green-100 hover:border-green-200 transition-colors">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="p-2.5 bg-green-100 rounded-xl">
                            <Icon className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-900">{categoryLabel(category as TransactionCategory)}</p>
                            <div className="w-24 bg-gray-200 rounded-full h-1.5 mt-2">
                              <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-1.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-sm font-bold text-green-600">{formatCurrency(amount)}</p>
                          <p className="text-xs text-gray-500 mt-1">{percentage.toFixed(1)}%</p>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-6">{dt.expenseBreakdown}</h3>
              <div className="space-y-4">
                {Object.entries(stats.categoryBreakdown)
                  .filter(([category]) => ['operational', 'stock_purchase', 'salary', 'capital'].includes(category))
                  .map(([category, amount]) => {
                    const Icon = categoryIcons[category as TransactionCategory] || Receipt
                    const percentage = stats.totalExpenses > 0 ? (amount / stats.totalExpenses) * 100 : 0
                    return (
                      <div key={category} className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-transparent rounded-2xl border border-red-100 hover:border-red-200 transition-colors">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="p-2.5 bg-red-100 rounded-xl">
                            <Icon className="w-5 h-5 text-red-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-900">{categoryLabel(category as TransactionCategory)}</p>
                            <div className="w-24 bg-gray-200 rounded-full h-1.5 mt-2">
                              <div className="bg-gradient-to-r from-red-500 to-rose-500 h-1.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-sm font-bold text-red-600">{formatCurrency(amount)}</p>
                          <p className="text-xs text-gray-500 mt-1">{percentage.toFixed(1)}%</p>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder={dt.searchTransactions}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
                  />
                </div>
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
              >
                <option value="all">{dt.allCategories}</option>
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{dt.date}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{dt.transactionType}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{dt.category}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{dt.description}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{dt.amount}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{dt.actions || 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <DollarSign className="w-12 h-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{dt.noTransactionsTitle}</h3>
                        <p className="text-gray-500 mb-4">{dt.noTransactionsDesc}</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((transaction) => {
                    const Icon = categoryIcons[transaction.category] || DollarSign
                    return (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(transaction.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            transaction.transaction_type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {transaction.transaction_type === 'income' ? dt.income : dt.expenses}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            {categoryLabel(transaction.category as TransactionCategory)}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{transaction.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                          <span className={transaction.transaction_type === 'income' ? 'text-green-600' : 'text-red-600'}>
                            {transaction.transaction_type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            <button onClick={() => {
                              setEditingTransaction(transaction as CashFlowTransaction)
                              setFormData({
                                transaction_type: transaction.transaction_type as TransactionType,
                                category: transaction.category as TransactionCategory,
                                amount: transaction.amount.toString(),
                                description: transaction.description,
                                date: transaction.date,
                                ingredientId: (transaction as any).ingredient_id || '',
                                quantity: (transaction as any).quantity?.toString() || '',
                                employeeId: (transaction as any).employee_id || '',
                                orderId: (transaction as any).order_id || '',
                                unit: (transaction as any).ingredient?.unit || ''
                              })
                              setShowAddModal(true)
                            }} className="text-blue-600 hover:text-blue-800"><Edit className="w-4 h-4" /></button>
                            <button onClick={() => deleteTransaction(transaction.id)} className="text-red-600 hover:text-red-800"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Debts List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">{dt.debtsTab}</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredDebts.map((debt) => {
              const StatusIcon = debtStatusIcons[debt.status] || Clock
              return (
                <div key={debt.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <StatusIcon className={`w-5 h-5 ${debt.status === 'paid' ? 'text-green-600' : 'text-red-600'}`} />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{debt.creditor_name}</h3>
                        <p className="text-sm text-gray-500">{debt.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${debtStatusColors[debt.status]}`}>{debt.status}</span>
                        <p className="text-lg font-semibold text-gray-900 mt-1">{formatCurrency(debt.remaining_amount)}</p>
                      </div>
                      <div className="flex gap-2">
                        {debt.status !== 'paid' && (
                          <button onClick={() => {
                            setSelectedDebtForPayment(debt)
                            setPaymentFormData({ amount: debt.remaining_amount.toString(), payment_date: new Date().toISOString().split('T')[0], notes: '' })
                            setShowPaymentModal(true)
                          }} className="text-green-600 hover:text-green-800"><DollarSign className="w-4 h-4" /></button>
                        )}
                        <button onClick={() => {
                          setEditingDebt(debt)
                          setDebtFormData({ creditor_name: debt.creditor_name, amount: debt.amount.toString(), description: debt.description, due_date: debt.due_date, status: debt.status })
                          setShowDebtModal(true)
                        }} className="text-blue-600 hover:text-blue-800"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => deleteDebt(debt.id)} className="text-red-600 hover:text-red-800"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] px-4">
          <div className="bg-white rounded-3xl p-7 w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl">
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">{editingTransaction ? dt.editCashFlow : dt.addCashFlow}</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-700">✕</button>
            </div>
            <form onSubmit={handleSubmitTransaction} className="space-y-6">
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setFormData({ ...formData, transaction_type: 'income' })} className={`p-3 rounded-xl border-2 ${formData.transaction_type === 'income' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>{dt.income}</button>
                <button type="button" onClick={() => setFormData({ ...formData, transaction_type: 'expense' })} className={`p-3 rounded-xl border-2 ${formData.transaction_type === 'expense' ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}>{dt.expenses}</button>
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-900">{dt.category}</label>
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value as TransactionCategory })} className="w-full p-3 border border-gray-300 rounded-xl">
                  {(formData.transaction_type === 'income' ? ['sales', 'investment', 'other_income', 'order'] : ['operational', 'stock_purchase', 'salary', 'capital']).map(cat => (
                    <option key={cat} value={cat}>{categoryLabels[cat as TransactionCategory] || cat}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-900">{dt.amount}</label>
                  <input type="text" value={formatAmountInput(formData.amount)} onChange={(e) => setFormData({ ...formData, amount: parseAmountInput(e.target.value) })} className="w-full p-3 border border-gray-300 rounded-xl" required />
                </div>
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-900">{dt.date}</label>
                  <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full p-3 border border-gray-300 rounded-xl" required />
                </div>
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-900">{dt.description}</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full p-3 border border-gray-300 rounded-xl" rows={3} required />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 p-3 border border-gray-200 rounded-xl">{dt.cancel}</button>
                <button type="submit" className="flex-1 p-3 bg-[var(--color-accent)] text-white rounded-xl">{dt.save}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Debt Modal */}
      {showDebtModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] px-4">
          <div className="bg-white rounded-3xl p-7 w-full max-w-md shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{editingDebt ? dt.debtTitleEdit : dt.debtTitleNew}</h3>
            <form onSubmit={handleSubmitDebt} className="space-y-4">
              <input type="text" placeholder={dt.creditor} value={debtFormData.creditor_name} onChange={(e) => setDebtFormData({ ...debtFormData, creditor_name: e.target.value })} className="w-full p-3 border border-gray-300 rounded-xl" required />
              <input type="text" placeholder={dt.amount} value={formatAmountInput(debtFormData.amount)} onChange={(e) => setDebtFormData({ ...debtFormData, amount: parseAmountInput(e.target.value) })} className="w-full p-3 border border-gray-300 rounded-xl" required />
              <textarea placeholder={dt.description} value={debtFormData.description} onChange={(e) => setDebtFormData({ ...debtFormData, description: e.target.value })} className="w-full p-3 border border-gray-300 rounded-xl" rows={3} />
              <input type="date" value={debtFormData.due_date} onChange={(e) => setDebtFormData({ ...debtFormData, due_date: e.target.value })} className="w-full p-3 border border-gray-300 rounded-xl" />
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowDebtModal(false)} className="flex-1 p-3 border border-gray-200 rounded-xl">{dt.cancel}</button>
                <button type="submit" className="flex-1 p-3 bg-red-600 text-white rounded-xl">{dt.save}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedDebtForPayment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] px-4">
          <div className="bg-white rounded-3xl p-7 w-full max-w-md shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{dt.recordDebt}</h3>
            <form onSubmit={handlePayDebt} className="space-y-4">
              <input type="text" value={formatAmountInput(paymentFormData.amount)} onChange={(e) => setPaymentFormData({ ...paymentFormData, amount: parseAmountInput(e.target.value) })} className="w-full p-3 border border-gray-300 rounded-xl" required />
              <input type="date" value={paymentFormData.payment_date} onChange={(e) => setPaymentFormData({ ...paymentFormData, payment_date: e.target.value })} className="w-full p-3 border border-gray-300 rounded-xl" required />
              <textarea placeholder={dt.description} value={paymentFormData.notes} onChange={(e) => setPaymentFormData({ ...paymentFormData, notes: e.target.value })} className="w-full p-3 border border-gray-300 rounded-xl" rows={3} />
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowPaymentModal(false)} className="flex-1 p-3 border border-gray-200 rounded-xl">{dt.cancel}</button>
                <button type="submit" className="flex-1 p-3 bg-green-600 text-white rounded-xl">{dt.save}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div className={`fixed bottom-6 right-6 p-4 rounded-xl shadow-lg text-white ${notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {notification.message}
        </div>
      )}
    </div>
  )
}
