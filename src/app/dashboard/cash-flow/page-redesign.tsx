"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/lib/i18n/context"
import {
  DollarSign, Plus, TrendingUp, TrendingDown, Calendar, Receipt, Users, ShoppingCart,
  FileText, Edit, Trash2, Search, AlertTriangle, CheckCircle, Clock, X, Wallet,
  ArrowUpRight, ArrowDownRight, Filter, Eye, CreditCard, Package
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts'

// Types
type TransactionType = 'income' | 'expense' | 'debt'
type IncomeCategory = 'sales' | 'investment' | 'other_income' | 'order'
type ExpenseCategory = 'operational' | 'stock_purchase' | 'salary' | 'capital'
type DebtCategory = 'supplier' | 'loan' | 'equipment' | 'other_debt'
type TransactionCategory = IncomeCategory | ExpenseCategory | DebtCategory

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
}

const COLORS = ['#FF385C', '#00A699', '#FFB400', '#8B5CF6', '#06B6D4', '#F59E0B']

export default function CashFlowPage() {
  const router = useRouter()
  const { language } = useLanguage()
  const supabase = createClient()

  // State
  const [restaurant, setRestaurant] = useState<any>(null)
  const [transactions, setTransactions] = useState<any[]>([])
  const [debts, setDebts] = useState<Debt[]>([])
  const [ingredients, setIngredients] = useState<any[]>([])
  const [employees, setEmployees] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    totalDebt: 0,
    netWorth: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    cashFlowTrend: [] as any[],
    categoryBreakdown: {} as any
  })

  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'debts'>('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  
  // Modals
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDebtModal, setShowDebtModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedDebt, setSelectedDebt] = useState<Debt | null>(null)
  const [editingTransaction, setEditingTransaction] = useState<any>(null)
  const [editingDebt, setEditingDebt] = useState<Debt | null>(null)

  // Form states
  const [formData, setFormData] = useState({
    transaction_type: 'expense' as TransactionType,
    category: 'operational' as TransactionCategory,
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    ingredientId: '',
    quantity: '',
    employeeId: ''
  })

  const [debtFormData, setDebtFormData] = useState({
    creditor_name: '',
    amount: '',
    description: '',
    due_date: '',
    status: 'active' as 'active' | 'paid' | 'overdue'
  })

  const [paymentFormData, setPaymentFormData] = useState({
    amount: '',
    payment_date: new Date().toISOString().split('T')[0],
    notes: ''
  })

  const t = language === 'id' ? {
    title: 'Arus Kas',
    subtitle: 'Kelola keuangan restoran dengan mudah',
    netWorth: 'Kekayaan Bersih',
    income: 'Pendapatan',
    expenses: 'Pengeluaran',
    debts: 'Utang',
    overview: 'Ringkasan',
    transactions: 'Transaksi',
    addTransaction: 'Tambah Transaksi',
    recordDebt: 'Catat Utang',
    payDebt: 'Bayar Utang',
    searchPlaceholder: 'Cari transaksi...',
    allCategories: 'Semua Kategori',
    noData: 'Belum ada data',
    save: 'Simpan',
    cancel: 'Batal',
    creditor: 'Kreditor',
    amount: 'Jumlah',
    description: 'Keterangan',
    date: 'Tanggal',
    dueDate: 'Jatuh Tempo',
    status: 'Status',
    paymentAmount: 'Jumlah Pembayaran',
    paymentDate: 'Tanggal Pembayaran',
    notes: 'Catatan',
    paid: 'Dibayar',
    remaining: 'Sisa',
    active: 'Aktif',
    partial: 'Sebagian',
    overdue: 'Jatuh Tempo',
    category: 'Kategori',
    transactionType: 'Tipe Transaksi',
    monthlyIncome: 'Pendapatan Bulanan',
    monthlyExpenses: 'Pengeluaran Bulanan'
  } : {
    title: 'Cash Flow',
    subtitle: 'Manage restaurant finances easily',
    netWorth: 'Net Worth',
    income: 'Income',
    expenses: 'Expenses',
    debts: 'Debts',
    overview: 'Overview',
    transactions: 'Transactions',
    addTransaction: 'Add Transaction',
    recordDebt: 'Record Debt',
    payDebt: 'Pay Debt',
    searchPlaceholder: 'Search transactions...',
    allCategories: 'All Categories',
    noData: 'No data yet',
    save: 'Save',
    cancel: 'Cancel',
    creditor: 'Creditor',
    amount: 'Amount',
    description: 'Description',
    date: 'Date',
    dueDate: 'Due Date',
    status: 'Status',
    paymentAmount: 'Payment Amount',
    paymentDate: 'Payment Date',
    notes: 'Notes',
    paid: 'Paid',
    remaining: 'Remaining',
    active: 'Active',
    partial: 'Partial',
    overdue: 'Overdue',
    category: 'Category',
    transactionType: 'Transaction Type',
    monthlyIncome: 'Monthly Income',
    monthlyExpenses: 'Monthly Expenses'
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  async function loadData() {
    try {
      setLoading(true)
      
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return router.push('/auth/login')

      const { data: restaurantsData } = await supabase
        .from('restaurants')
        .select('*')
        .eq('owner_id', user.id)

      if (!restaurantsData?.[0]) return router.push('/dashboard')

      let selectedRestaurant = restaurantsData[0]
      if (typeof window !== 'undefined') {
        const savedId = localStorage.getItem('selected_restaurant_id')
        const saved = restaurantsData.find(r => r.id === savedId)
        if (saved) selectedRestaurant = saved
      }

      setRestaurant(selectedRestaurant)

      // Load all data
      const [expensesRes, debtsRes, ordersRes, ingredientsRes, employeesRes] = await Promise.all([
        supabase.from('expenses').select('*, ingredients(name, unit)').eq('restaurant_id', selectedRestaurant.id).order('date', { ascending: false }),
        supabase.from('debts').select('*').eq('restaurant_id', selectedRestaurant.id).order('due_date', { ascending: true }),
        supabase.from('orders').select('id, total, created_at, status, payment_status').eq('restaurant_id', selectedRestaurant.id).order('created_at', { ascending: false }),
        supabase.from('ingredients').select('*').eq('restaurant_id', selectedRestaurant.id),
        supabase.from('employees').select('*').eq('restaurant_id', selectedRestaurant.id)
      ])

      const expensesData = expensesRes.data || []
      const debtsData = (debtsRes.data || []).map(d => ({
        ...d,
        amount_paid: d.amount_paid ?? 0,
        remaining_amount: d.remaining_amount ?? d.amount,
        status: d.status || 'active'
      }))
      const ordersData = (ordersRes.data || []).filter(o => !['cancelled', 'canceled', 'void'].includes(o.status?.toLowerCase() || ''))
      
      setTransactions(expensesData)
      setDebts(debtsData)
      setIngredients(ingredientsRes.data || [])
      setEmployees(employeesRes.data || [])

      // Calculate stats
      const totalExpenses = expensesData.reduce((sum, t) => sum + (t.amount || 0), 0)
      const totalIncome = ordersData.reduce((sum, o) => sum + (o.total || 0), 0)
      const totalDebt = debtsData.filter(d => d.status !== 'paid').reduce((sum, d) => sum + d.remaining_amount, 0)
      
      const now = new Date()
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
      const monthlyExpenses = expensesData.filter(t => new Date(t.date) >= monthStart).reduce((sum, t) => sum + t.amount, 0)
      const monthlyIncome = ordersData.filter(o => new Date(o.created_at) >= monthStart).reduce((sum, o) => sum + o.total, 0)

      // Build trend data
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date()
        d.setDate(d.getDate() - (6 - i))
        return d.toISOString().split('T')[0]
      })

      const trend = last7Days.map(date => {
        const dayExpenses = expensesData.filter(t => t.date === date).reduce((sum, t) => sum + t.amount, 0)
        const dayIncome = ordersData.filter(o => o.created_at.split('T')[0] === date).reduce((sum, o) => sum + o.total, 0)
        return {
          period: new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
          income: dayIncome,
          expenses: dayExpenses,
          net: dayIncome - dayExpenses
        }
      })

      setStats({
        totalIncome,
        totalExpenses,
        totalDebt,
        netWorth: totalIncome - totalExpenses - totalDebt,
        monthlyIncome,
        monthlyExpenses,
        cashFlowTrend: trend,
        categoryBreakdown: {}
      })

      setLoading(false)
    } catch (error) {
      console.error('Load error:', error)
      setLoading(false)
    }
  }

  async function handleAddTransaction() {
    if (!restaurant || !formData.amount) return
    
    const amount = parseFloat(formData.amount)
    if (isNaN(amount) || amount <= 0) return alert('Invalid amount')

    try {
      await supabase.from('expenses').insert({
        restaurant_id: restaurant.id,
        category: formData.category,
        amount,
        description: formData.description,
        date: formData.date,
        transaction_type: formData.transaction_type,
        ingredient_id: formData.ingredientId || null,
        employee_id: formData.employeeId || null,
        quantity: formData.quantity ? parseFloat(formData.quantity) : null
      })

      setShowAddModal(false)
      setFormData({
        transaction_type: 'expense',
        category: 'operational',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        ingredientId: '',
        quantity: '',
        employeeId: ''
      })
      loadData()
    } catch (error) {
      alert('Error: ' + (error as Error).message)
    }
  }

  async function handleAddDebt() {
    if (!restaurant || !debtFormData.amount) return
    
    const amount = parseFloat(debtFormData.amount)
    if (isNaN(amount) || amount <= 0) return alert('Invalid amount')

    try {
      await supabase.from('debts').insert({
        restaurant_id: restaurant.id,
        creditor_name: debtFormData.creditor_name,
        amount,
        amount_paid: 0,
        remaining_amount: amount,
        description: debtFormData.description,
        due_date: debtFormData.due_date,
        status: debtFormData.status
      })

      setShowDebtModal(false)
      setDebtFormData({
        creditor_name: '',
        amount: '',
        description: '',
        due_date: '',
        status: 'active'
      })
      loadData()
    } catch (error) {
      alert('Error: ' + (error as Error).message)
    }
  }

  async function handlePayDebt() {
    if (!selectedDebt || !paymentFormData.amount) return
    
    const amount = parseFloat(paymentFormData.amount)
    if (isNaN(amount) || amount <= 0) return alert('Invalid amount')
    if (amount > selectedDebt.remaining_amount) return alert('Amount exceeds remaining debt')

    try {
      const newPaid = selectedDebt.amount_paid + amount
      const newRemaining = selectedDebt.remaining_amount - amount
      const newStatus = newRemaining === 0 ? 'paid' : selectedDebt.status

      await supabase.from('debts').update({
        amount_paid: newPaid,
        remaining_amount: newRemaining,
        status: newStatus
      }).eq('id', selectedDebt.id)

      await supabase.from('expenses').insert({
        restaurant_id: selectedDebt.restaurant_id,
        amount,
        description: `Pembayaran hutang ke ${selectedDebt.creditor_name}`,
        date: paymentFormData.payment_date,
        category: 'operational',
        transaction_type: 'expense'
      })

      setShowPaymentModal(false)
      setSelectedDebt(null)
      setPaymentFormData({
        amount: '',
        payment_date: new Date().toISOString().split('T')[0],
        notes: ''
      })
      loadData()
    } catch (error) {
      alert('Error: ' + (error as Error).message)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const getDebtStatus = (debt: Debt) => {
    if (debt.status === 'paid') return 'paid'
    if (debt.amount_paid > 0 && debt.amount_paid < debt.amount) return 'partial'
    if (new Date(debt.due_date) < new Date() && debt.status === 'active') return 'overdue'
    return 'active'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Modern Header with Glassmorphism */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {t.title}
              </h1>
              <p className="mt-1 text-sm text-gray-500">{t.subtitle}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDebtModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-200 font-medium"
              >
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                <span className="hidden sm:inline">{t.recordDebt}</span>
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-semibold"
              >
                <Plus className="w-5 h-5" />
                {t.addTransaction}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Premium Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Net Worth - Gradient Card */}
          <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Wallet className="w-6 h-6" />
                </div>
                <TrendingUp className="w-5 h-5 opacity-60" />
              </div>
              <p className="text-sm font-medium opacity-90 mb-1">{t.netWorth}</p>
              <p className="text-3xl font-bold">{formatCurrency(stats.netWorth)}</p>
            </div>
          </div>

          {/* Income Card */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-green-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-2xl">
                <ArrowUpRight className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex items-center gap-1 px-3 py-1 bg-green-50 rounded-full">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-xs font-medium text-green-600">Bulanan</span>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">{t.income}</p>
            <p className="text-2xl font-bold text-gray-900 mb-1">{formatCurrency(stats.monthlyIncome)}</p>
            <p className="text-xs text-gray-500">Total: {formatCurrency(stats.totalIncome)}</p>
          </div>

          {/* Expenses Card */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-red-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-50 rounded-2xl">
                <ArrowDownRight className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex items-center gap-1 px-3 py-1 bg-red-50 rounded-full">
                <TrendingDown className="w-3 h-3 text-red-600" />
                <span className="text-xs font-medium text-red-600">Bulanan</span>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">{t.expenses}</p>
            <p className="text-2xl font-bold text-gray-900 mb-1">{formatCurrency(stats.monthlyExpenses)}</p>
            <p className="text-xs text-gray-500">Total: {formatCurrency(stats.totalExpenses)}</p>
          </div>

          {/* Debts Card */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-orange-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-50 rounded-2xl">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <span className="px-3 py-1 bg-orange-50 rounded-full text-xs font-medium text-orange-600">
                {debts.filter(d => d.status !== 'paid').length} aktif
              </span>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">{t.debts}</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalDebt)}</p>
          </div>
        </div>

        {/* Modern Tabs */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <div className="border-b border-gray-100 px-6">
            <div className="flex gap-1">
              {[
                { id: 'overview', label: t.overview, icon: TrendingUp },
                { id: 'transactions', label: t.transactions, icon: Receipt },
                { id: 'debts', label: t.debts, icon: AlertTriangle }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`inline-flex items-center gap-2 px-6 py-4 font-medium transition-all duration-200 relative ${
                    activeTab === tab.id
                      ? 'text-pink-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Chart */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Tren Arus Kas 7 Hari Terakhir</h3>
                  {stats.cashFlowTrend.length > 0 ? (
                    <div className="h-80 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={stats.cashFlowTrend}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                          <XAxis dataKey="period" stroke="#6B7280" style={{ fontSize: '12px' }} />
                          <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                          <Tooltip
                            formatter={(value: any) => value !== undefined ? formatCurrency(value) : ''}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
                          />
                          <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 4 }} name="Pendapatan" />
                          <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={3} dot={{ fill: '#EF4444', r: 4 }} name="Pengeluaran" />
                          <Line type="monotone" dataKey="net" stroke="#8B5CF6" strokeWidth={4} dot={{ fill: '#8B5CF6', r: 5 }} name="Neto" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-80 flex items-center justify-center bg-gray-50 rounded-2xl">
                      <div className="text-center text-gray-400">
                        <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>{t.noData}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'transactions' && (
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder={t.searchPlaceholder}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <button className="px-5 py-3 bg-white border border-gray-200 rounded-2xl hover:border-gray-300 transition-all flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-600" />
                    <span className="hidden sm:inline text-gray-700 font-medium">Filter</span>
                  </button>
                </div>

                {/* Transaction List */}
                <div className="space-y-3">
                  {transactions.length === 0 ? (
                    <div className="text-center py-16">
                      <Receipt className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500">{t.noData}</p>
                    </div>
                  ) : (
                    transactions
                      .filter(t => !searchQuery || t.description?.toLowerCase().includes(searchQuery.toLowerCase()))
                      .slice(0, 20)
                      .map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:shadow-md hover:border-gray-200 transition-all duration-200"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${
                              transaction.transaction_type === 'income'
                                ? 'bg-green-50'
                                : 'bg-red-50'
                            }`}>
                              {transaction.transaction_type === 'income' ? (
                                <ArrowUpRight className="w-5 h-5 text-green-600" />
                              ) : (
                                <ArrowDownRight className="w-5 h-5 text-red-600" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{transaction.description || 'Transaksi'}</p>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {formatDate(transaction.date)}
                                </span>
                                <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                  {transaction.category}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`text-lg font-bold ${
                              transaction.transaction_type === 'income'
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}>
                              {transaction.transaction_type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                            </p>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'debts' && (
              <div className="space-y-4">
                {debts.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertTriangle className="w-10 h-10 text-orange-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum ada utang</h3>
                    <p className="text-gray-500 mb-6">Mulai catat utang untuk mengelola kewajiban keuangan</p>
                    <button
                      onClick={() => setShowDebtModal(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                    >
                      <Plus className="w-5 h-5" />
                      {t.recordDebt}
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {debts.map((debt) => {
                      const displayStatus = getDebtStatus(debt)
                      const progress = (debt.amount_paid / debt.amount) * 100

                      return (
                        <div
                          key={debt.id}
                          className="bg-white border border-gray-100 rounded-3xl p-6 hover:shadow-xl hover:border-gray-200 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold text-gray-900">{debt.creditor_name}</h3>
                                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                                  displayStatus === 'paid'
                                    ? 'bg-green-100 text-green-700'
                                    : displayStatus === 'partial'
                                    ? 'bg-blue-100 text-blue-700'
                                    : displayStatus === 'overdue'
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {t[displayStatus]}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">{debt.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                {formatCurrency(debt.remaining_amount)}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">dari {formatCurrency(debt.amount)}</p>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          {debt.amount_paid > 0 && (
                            <div className="mb-5">
                              <div className="flex items-center justify-between text-xs font-medium text-gray-600 mb-2">
                                <span className="flex items-center gap-1">
                                  <CheckCircle className="w-4 h-4 text-blue-500" />
                                  {t.paid}: {formatCurrency(debt.amount_paid)}
                                </span>
                                <span className="text-blue-600 font-bold">{Math.round(progress)}%</span>
                              </div>
                              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-full transition-all duration-500 ease-out"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                            <div className="flex items-center gap-4 text-sm">
                              <span className="flex items-center gap-2 text-gray-500">
                                <Calendar className="w-4 h-4" />
                                <span className="font-medium">{formatDate(debt.due_date)}</span>
                              </span>
                            </div>
                            {displayStatus !== 'paid' && (
                              <button
                                onClick={() => {
                                  setSelectedDebt(debt)
                                  setPaymentFormData({
                                    amount: debt.remaining_amount.toString(),
                                    payment_date: new Date().toISOString().split('T')[0],
                                    notes: ''
                                  })
                                  setShowPaymentModal(true)
                                }}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-semibold"
                              >
                                <DollarSign className="w-5 h-5" />
                                {t.payDebt}
                              </button>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">{t.addTransaction}</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t.transactionType}</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setFormData({ ...formData, transaction_type: 'income', category: 'sales' })}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      formData.transaction_type === 'income'
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <ArrowUpRight className={`w-6 h-6 mx-auto mb-2 ${formData.transaction_type === 'income' ? 'text-green-600' : 'text-gray-400'}`} />
                    <p className={`font-medium ${formData.transaction_type === 'income' ? 'text-green-700' : 'text-gray-600'}`}>
                      {t.income}
                    </p>
                  </button>
                  <button
                    onClick={() => setFormData({ ...formData, transaction_type: 'expense', category: 'operational' })}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      formData.transaction_type === 'expense'
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <ArrowDownRight className={`w-6 h-6 mx-auto mb-2 ${formData.transaction_type === 'expense' ? 'text-red-600' : 'text-gray-400'}`} />
                    <p className={`font-medium ${formData.transaction_type === 'expense' ? 'text-red-700' : 'text-gray-600'}`}>
                      {t.expenses}
                    </p>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t.amount} *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">Rp</span>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t.description}</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
                  rows={3}
                  placeholder="Keterangan transaksi..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t.date}</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="p-6 bg-gray-50 flex gap-3 rounded-b-3xl">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-100 transition-all font-semibold"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleAddTransaction}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl hover:shadow-lg transition-all font-semibold"
              >
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Debt Modal */}
      {showDebtModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-xl">
                    <AlertTriangle className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{t.recordDebt}</h3>
                </div>
                <button
                  onClick={() => setShowDebtModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t.creditor} *</label>
                <input
                  type="text"
                  value={debtFormData.creditor_name}
                  onChange={(e) => setDebtFormData({ ...debtFormData, creditor_name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  placeholder="Nama kreditor"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t.amount} *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">Rp</span>
                  <input
                    type="number"
                    value={debtFormData.amount}
                    onChange={(e) => setDebtFormData({ ...debtFormData, amount: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t.description}</label>
                <textarea
                  value={debtFormData.description}
                  onChange={(e) => setDebtFormData({ ...debtFormData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
                  rows={3}
                  placeholder="Keterangan utang..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t.dueDate}</label>
                <input
                  type="date"
                  value={debtFormData.due_date}
                  onChange={(e) => setDebtFormData({ ...debtFormData, due_date: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="p-6 bg-gray-50 flex gap-3 rounded-b-3xl">
              <button
                onClick={() => setShowDebtModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-100 transition-all font-semibold"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleAddDebt}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl hover:shadow-lg transition-all font-semibold"
              >
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedDebt && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-xl">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{t.payDebt}</h3>
                </div>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Debt Summary Card */}
              <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-5">
                <p className="text-sm font-medium text-gray-600 mb-1">{t.creditor}</p>
                <p className="text-xl font-bold text-gray-900 mb-4">{selectedDebt.creditor_name}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">{t.remaining}</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(selectedDebt.remaining_amount)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600 mb-1">Total Utang</p>
                    <p className="text-lg font-semibold text-gray-700">{formatCurrency(selectedDebt.amount)}</p>
                  </div>
                </div>
              </div>

              {/* Quick Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentFormData({ ...paymentFormData, amount: (selectedDebt.remaining_amount * 0.5).toString() })}
                  className="p-4 border-2 border-gray-200 rounded-2xl hover:border-pink-500 hover:bg-pink-50 transition-all font-semibold text-gray-700 hover:text-pink-600"
                >
                  50%
                </button>
                <button
                  onClick={() => setPaymentFormData({ ...paymentFormData, amount: selectedDebt.remaining_amount.toString() })}
                  className="p-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl hover:shadow-lg transition-all font-semibold"
                >
                  Lunas
                </button>
              </div>

              {/* Payment Form */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t.paymentAmount} *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">Rp</span>
                  <input
                    type="number"
                    value={paymentFormData.amount}
                    onChange={(e) => setPaymentFormData({ ...paymentFormData, amount: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all font-semibold"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t.paymentDate}</label>
                <input
                  type="date"
                  value={paymentFormData.payment_date}
                  onChange={(e) => setPaymentFormData({ ...paymentFormData, payment_date: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t.notes}</label>
                <textarea
                  value={paymentFormData.notes}
                  onChange={(e) => setPaymentFormData({ ...paymentFormData, notes: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
                  rows={3}
                  placeholder="Catatan pembayaran (opsional)"
                />
              </div>
            </div>

            <div className="p-6 bg-gray-50 flex gap-3 rounded-b-3xl">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-100 transition-all font-semibold"
              >
                {t.cancel}
              </button>
              <button
                onClick={handlePayDebt}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:shadow-lg transition-all font-semibold"
              >
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
