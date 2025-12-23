"use client"

import { useEffect, useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/lib/i18n/context"
import { TrendingUp, DollarSign, ShoppingCart, Clock, UtensilsCrossed, CreditCard, Building2, Users, Download, Calendar, TrendingUp as TrendingUpIcon, BarChart3, Percent, Gift, XCircle, Star } from "lucide-react"
import { ThemeColorPicker } from "@/components/dashboard/ThemeColorPicker"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ComposedChart, Bar, Area, AreaChart, BarChart } from 'recharts'
import { createDashboardTranslator } from "@/lib/i18n/dashboard-translator"

type PeriodType = 'daily' | 'weekly' | 'monthly' | 'yearly'

interface DateRange {
  start: Date
  end: Date
  day: string
  month: string
  fullLabel: string
}

interface TableAnalytics {
  tableNumber: number
  orders: number
  revenue: number
  avgOrder: number
  customers: number
}

interface TopItem {
  name: string
  revenue: number
  count: number
}

export default function AnalyticsPage() {
  const router = useRouter()
  const supabase = createClient()
  const { language, t } = useLanguage()
  const { t: dt } = useMemo(() => createDashboardTranslator(language), [language])

  const [loading, setLoading] = useState(true)
  const [restaurant, setRestaurant] = useState<any>(null)
  const [allRestaurants, setAllRestaurants] = useState<any[]>([])
  const [period, setPeriod] = useState<PeriodType>('daily')
  const [dates, setDates] = useState<DateRange[]>([])
  const [selected, setSelected] = useState(0)

  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    avgOrder: 0,
    cashRevenue: 0,
    qrisRevenue: 0,
    transferRevenue: 0,
    peakHour: '-',
    topTable: 0
  })
  const [topItems, setTopItems] = useState<TopItem[]>([])
  const [tableAnalytics, setTableAnalytics] = useState<TableAnalytics[]>([])
  const [ordersRaw, setOrdersRaw] = useState<any[]>([])
  const [showExportModal, setShowExportModal] = useState(false)
  
  // New chart data states
  const [cogsMarginData, setCogsMarginData] = useState<Array<{ period: string; cogs: number; margin: number; revenue: number }>>([])
  const [promoData, setPromoData] = useState<Array<{ name: string; revenue: number; discount: number; netRevenue: number }>>([])
  const [voidDiscountData, setVoidDiscountData] = useState<Array<{ type: string; count: number; amount: number }>>([])
  const [ratingData, setRatingData] = useState<Array<{ period: string; rating: number; reviews: number }>>([])

  // Initialize: Load user and restaurants
  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      // Load all restaurants
      const { data: restaurants } = await supabase
        .from('restaurants')
        .select('*')
        .eq('owner_id', user.id)

      if (!restaurants || restaurants.length === 0) {
        router.push('/dashboard')
        return
      }

      setAllRestaurants(restaurants)
      
      // Check localStorage for selected restaurant
      const savedRestaurantId = localStorage.getItem('selected_restaurant_id')
      if (savedRestaurantId) {
        const saved = restaurants.find(r => r.id === savedRestaurantId)
        if (saved) {
          setRestaurant(saved)
        } else {
          setRestaurant(restaurants[0])
        }
      } else {
        setRestaurant(restaurants[0])
      }
    }

    init()
  }, [])

  // Generate date ranges when period changes
  useEffect(() => {
    const now = new Date()
    const ranges: DateRange[] = []
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

    if (period === 'daily') {
      for (let i = 29; i >= 0; i--) {
        const d = new Date(now)
        d.setDate(now.getDate() - i)
        const start = new Date(d)
        start.setHours(0, 0, 0, 0)
        const end = new Date(d)
        end.setHours(23, 59, 59, 999)
        ranges.push({
          start,
          end,
          day: String(d.getDate()),
          month: months[d.getMonth()],
          fullLabel: `${d.getDate()} ${months[d.getMonth()]}`
        })
      }
    } else if (period === 'weekly') {
      for (let i = 11; i >= 0; i--) {
        const end = new Date(now)
        end.setDate(now.getDate() - (i * 7))
        const start = new Date(end)
        start.setDate(end.getDate() - 6)
        start.setHours(0, 0, 0, 0)
        end.setHours(23, 59, 59, 999)
        ranges.push({
          start,
          end,
          day: `${start.getDate()}-${end.getDate()}`,
          month: months[end.getMonth()],
          fullLabel: `${start.getDate()}-${end.getDate()} ${months[end.getMonth()]}`
        })
      }
    } else if (period === 'monthly') {
      for (let i = 11; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
        ranges.push({
          start: new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0, 0),
          end: new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999),
          day: months[d.getMonth()],
          month: String(d.getFullYear()),
          fullLabel: `${months[d.getMonth()]} ${d.getFullYear()}`
        })
      }
    } else {
      for (let i = 4; i >= 0; i--) {
        const year = now.getFullYear() - i
        ranges.push({
          start: new Date(year, 0, 1, 0, 0, 0, 0),
          end: new Date(year, 11, 31, 23, 59, 59, 999),
          day: String(year),
          month: '',
          fullLabel: String(year)
        })
      }
    }

    setDates(ranges)
    setSelected(ranges.length - 1) // Select most recent (today/this week/this month/this year)
    
    // Scroll date selector to the end (most recent date)
    setTimeout(() => {
      const dateScroll = document.getElementById('date-scroll')
      if (dateScroll) {
        dateScroll.scrollLeft = dateScroll.scrollWidth
      }
    }, 100)
  }, [period])

  // Load analytics data when restaurant or date range changes
  useEffect(() => {
    console.log('🔄 Effect triggered:', { hasRestaurant: !!restaurant, datesLength: dates.length, selected })
    if (restaurant && dates.length > 0) {
      loadAnalytics()
    }
  }, [restaurant, dates, selected])

  async function loadAnalytics() {
    if (!restaurant || dates.length === 0) return
    
    setLoading(true)
    try {
      const range = dates[selected]
      
      console.log('📅 Fetching analytics:', {
        restaurant: restaurant.name,
        period: range.fullLabel,
        start: range.start.toISOString(),
        end: range.end.toISOString()
      })

      // Fetch paid orders within date range
      const { data: orders } = await supabase
        .from('orders')
        .select('*, order_items(*), tables(number)')
        .eq('restaurant_id', restaurant.id)
        .eq('payment_status', 'paid')
        .gte('paid_at', range.start.toISOString())
        .lte('paid_at', range.end.toISOString())

      if (!orders) {
        console.log('❌ No orders found')
        setOrdersRaw([])
        setTopItems([])
        setTableAnalytics([])
        setStats({
          revenue: 0,
          orders: 0,
          avgOrder: 0,
          cashRevenue: 0,
          qrisRevenue: 0,
          transferRevenue: 0,
          peakHour: '-',
          topTable: 0
        })
        setLoading(false)
        return
      }

      console.log(`✅ Found ${orders.length} orders`)

      // Store raw orders for export and drill-down
      setOrdersRaw(orders)

      // Calculate revenue and orders
      const revenue = orders.reduce((sum, o) => {
        const amount = o.total || 0
        return o.status === 'cancelled' ? sum - amount : sum + amount
      }, 0)
      const count = orders.filter(o => o.status !== 'cancelled').length

      // Payment methods breakdown
      const cashOrders = orders.filter(o => ['cash', 'CASH'].includes(o.payment_method))
      const qrisOrders = orders.filter(o => ['qris', 'QRIS'].includes(o.payment_method))
      const transferOrders = orders.filter(o => ['transfer', 'TRANSFER', 'bank_transfer', 'BANK_TRANSFER'].includes(o.payment_method))
      
      const cash = cashOrders.reduce((s, o) => o.status === 'cancelled' ? s - (o.total || 0) : s + (o.total || 0), 0)
      const qris = qrisOrders.reduce((s, o) => o.status === 'cancelled' ? s - (o.total || 0) : s + (o.total || 0), 0)
      const transfer = transferOrders.reduce((s, o) => o.status === 'cancelled' ? s - (o.total || 0) : s + (o.total || 0), 0)

      // Top selling items
      const itemMap = new Map<string, { revenue: number; count: number }>()
      orders.filter(order => order.status !== 'cancelled').forEach((order: any) => {
        order.order_items?.forEach((item: any) => {
          const key = item.name || 'Item'
          const existing = itemMap.get(key) || { revenue: 0, count: 0 }
          itemMap.set(key, {
            revenue: existing.revenue + (item.price * item.quantity),
            count: existing.count + item.quantity
          })
        })
      })
      const items = Array.from(itemMap.entries())
        .map(([name, data]) => ({ name, ...data }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 10)

      // Table analytics
      const tableMap = new Map<number, { orders: number; revenue: number; customers: number }>()
      orders.filter(o => o.status !== 'cancelled').forEach((order: any) => {
        if (order.tables && order.tables.number) {
          const tableNum = order.tables.number
          const existing = tableMap.get(tableNum) || { orders: 0, revenue: 0, customers: 0 }
          tableMap.set(tableNum, {
            orders: existing.orders + 1,
            revenue: existing.revenue + (order.total || 0),
            customers: existing.customers + 1
          })
        }
      })
      const tables = Array.from(tableMap.entries())
        .map(([tableNumber, data]) => ({
          tableNumber,
          orders: data.orders,
          revenue: data.revenue,
          avgOrder: data.orders > 0 ? data.revenue / data.orders : 0,
          customers: data.customers
        }))
        .sort((a, b) => b.revenue - a.revenue)

      // Peak hour
      const hourMap = new Map<number, number>()
      orders.forEach((order: any) => {
        if (order.paid_at) {
          const hour = new Date(order.paid_at).getHours()
          hourMap.set(hour, (hourMap.get(hour) || 0) + 1)
        }
      })
      const peakHourData = Array.from(hourMap.entries()).sort((a, b) => b[1] - a[1])[0]
      const peakHour = peakHourData ? `${peakHourData[0].toString().padStart(2, '0')}:00` : '-'

      // Top table by revenue
      const topTable = tables[0]?.tableNumber || 0

      // Calculate COGS & Gross Margin Trend (simulated with 30% COGS)
      const cogsMarginTrend: Array<{ period: string; cogs: number; margin: number; revenue: number }> = []
      if (period === 'daily') {
        // Group by day for the selected date range
        const dayRevenue = new Map<string, number>()
        orders.forEach((order: any) => {
          if (order.paid_at && order.status !== 'cancelled') {
            const date = new Date(order.paid_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
            dayRevenue.set(date, (dayRevenue.get(date) || 0) + (order.total || 0))
          }
        })
        dayRevenue.forEach((rev, date) => {
          cogsMarginTrend.push({
            period: date,
            revenue: rev,
            cogs: rev * 0.3, // 30% COGS assumption
            margin: rev * 0.7 // 70% gross margin
          })
        })
      } else {
        // For weekly/monthly/yearly, aggregate the entire period
        cogsMarginTrend.push({
          period: range.fullLabel,
          revenue: revenue,
          cogs: revenue * 0.3,
          margin: revenue * 0.7
        })
      }
      setCogsMarginData(cogsMarginTrend.slice(-10)) // Last 10 periods

      // Promo Performance (simulated - track discounts given)
      const promoPerformance: Array<{ name: string; revenue: number; discount: number; netRevenue: number }> = []
      const discountedOrders = orders.filter(o => o.discount && o.discount > 0 && o.status !== 'cancelled')
      const discountTypes = new Map<string, { revenue: number; discount: number }>()
      
      discountedOrders.forEach((order: any) => {
        const promoName = order.promo_code || 'General Discount'
        const existing = discountTypes.get(promoName) || { revenue: 0, discount: 0 }
        discountTypes.set(promoName, {
          revenue: existing.revenue + (order.total || 0),
          discount: existing.discount + (order.discount || 0)
        })
      })

      discountTypes.forEach((data, name) => {
        promoPerformance.push({
          name,
          revenue: data.revenue + data.discount, // Total before discount
          discount: data.discount,
          netRevenue: data.revenue
        })
      })
      
      // Add no-promo revenue
      const noPromoRevenue = revenue - promoPerformance.reduce((sum, p) => sum + p.netRevenue, 0)
      if (noPromoRevenue > 0) {
        promoPerformance.unshift({
          name: 'No Promo',
          revenue: noPromoRevenue,
          discount: 0,
          netRevenue: noPromoRevenue
        })
      }
      setPromoData(promoPerformance.slice(0, 5))

      // Void/Discount/Refund Analysis
      const voidDiscountAnalysis: Array<{ type: string; count: number; amount: number }> = []
      const cancelledOrders = orders.filter(o => o.status === 'cancelled')
      const discountOrders = orders.filter(o => o.discount && o.discount > 0)
      const refundOrders = orders.filter(o => o.refund_amount && o.refund_amount > 0)

      voidDiscountAnalysis.push({
        type: 'Void Orders',
        count: cancelledOrders.length,
        amount: cancelledOrders.reduce((sum, o) => sum + (o.total || 0), 0)
      })
      voidDiscountAnalysis.push({
        type: 'Discounts',
        count: discountOrders.length,
        amount: discountOrders.reduce((sum, o) => sum + (o.discount || 0), 0)
      })
      voidDiscountAnalysis.push({
        type: 'Refunds',
        count: refundOrders.length,
        amount: refundOrders.reduce((sum, o) => sum + (o.refund_amount || 0), 0)
      })
      setVoidDiscountData(voidDiscountAnalysis)

      // Customer Rating Trend (simulated based on order satisfaction)
      const ratingTrend: Array<{ period: string; rating: number; reviews: number }> = []
      if (period === 'daily') {
        const dayRatings = new Map<string, { totalRating: number; count: number }>()
        orders.forEach((order: any) => {
          if (order.paid_at && order.status !== 'cancelled') {
            const date = new Date(order.paid_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
            // Simulate rating: 4-5 stars based on order completion
            const simulatedRating = order.status === 'completed' ? 4.5 + Math.random() * 0.5 : 4.0
            const existing = dayRatings.get(date) || { totalRating: 0, count: 0 }
            dayRatings.set(date, {
              totalRating: existing.totalRating + simulatedRating,
              count: existing.count + 1
            })
          }
        })
        dayRatings.forEach((data, date) => {
          ratingTrend.push({
            period: date,
            rating: Math.round((data.totalRating / data.count) * 10) / 10,
            reviews: data.count
          })
        })
      } else {
        const avgRating = orders.length > 0 ? 4.5 : 0
        ratingTrend.push({
          period: range.fullLabel,
          rating: Math.round(avgRating * 10) / 10,
          reviews: orders.length
        })
      }
      setRatingData(ratingTrend.slice(-10))

      setStats({
        revenue,
        orders: count,
        avgOrder: count > 0 ? revenue / count : 0,
        cashRevenue: cash,
        qrisRevenue: qris,
        transferRevenue: transfer,
        peakHour,
        topTable
      })
      setTopItems(items)
      setTableAnalytics(tables)

      console.log('📊 Analytics loaded:', {
        revenue,
        orders: count,
        topItemsCount: items.length,
        tablesCount: tables.length,
        items: items.slice(0, 3),
        tables: tables.slice(0, 3)
      })

    } catch (error) {
      console.error('❌ Error loading analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  function handleRestaurantChange(restaurantId: string) {
    const selected = allRestaurants.find(r => r.id === restaurantId)
    if (selected) {
      setRestaurant(selected)
      localStorage.setItem('selected_restaurant_id', restaurantId)
      // Dispatch custom event to notify theme provider
      window.dispatchEvent(new Event('restaurantChanged'))
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const exportToCSV = () => {
    const range = dates[selected]
    const csvData = [
      [dt("analyticsReport")],
      [dt("store"), restaurant?.name || ''],
      [dt("period"), range?.fullLabel || ''],
      [dt("generated"), new Date().toLocaleString(language === 'id' ? 'id-ID' : language === 'zh' ? 'zh-CN' : 'en-US')],
      [''],
      [dt("summary")],
      [dt("revenue"), stats.revenue],
      [dt("orders"), stats.orders],
      [dt("avgOrder"), stats.avgOrder],
      [''],
      [dt("paymentMethods")],
      [dt("cash"), stats.cashRevenue, `${stats.revenue > 0 ? ((stats.cashRevenue / stats.revenue) * 100).toFixed(1) : 0}%`],
      ['QRIS', stats.qrisRevenue, `${stats.revenue > 0 ? ((stats.qrisRevenue / stats.revenue) * 100).toFixed(1) : 0}%`],
      [dt("bankTransfer"), stats.transferRevenue, `${stats.revenue > 0 ? ((stats.transferRevenue / stats.revenue) * 100).toFixed(1) : 0}%`],
      [''],
      [dt("topSellingItems")],
      [dt("rank"), dt("itemName"), dt("quantitySold"), dt("revenue")],
      ...topItems.map((item, idx) => [idx + 1, item.name, item.count, item.revenue]),
      [''],
      [dt("tablePerformance")],
      [dt("rank"), dt("table"), dt("orders"), dt("customers"), dt("revenue"), dt("avgOrder")],
      ...tableAnalytics.map((t, idx) => [idx + 1, `${dt("table")} ${t.tableNumber}`, t.orders, t.customers, t.revenue, t.avgOrder]),
      [''],
      [dt("allOrders")],
      [dt("table"), dt("total"), dt("paymentMethods"), dt("paidAt"), dt("itemsCount")],
      ...ordersRaw.map(o => [
        o.tables?.number || 'Takeaway',
        o.total || 0,
        o.payment_method || '',
        o.paid_at ? new Date(o.paid_at).toLocaleString(language === 'id' ? 'id-ID' : language === 'zh' ? 'zh-CN' : 'en-US') : '',
        o.order_items?.length || 0
      ])
    ]

    const csvContent = csvData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `analytics-${restaurant?.name}-${range?.fullLabel}.csv`
    link.click()
    setShowExportModal(false)
  }

  const getBusiestDay = () => {
    const dayCounts: Record<string, number> = ordersRaw.reduce((acc, o) => {
      if (o.paid_at) {
        const day = new Date(o.paid_at).toLocaleDateString(language === 'id' ? 'id-ID' : language === 'zh' ? 'zh-CN' : 'en-US', { weekday: 'long' })
        acc[day] = (acc[day] || 0) + 1
      }
      return acc
    }, {} as Record<string, number>)
    const busiestDay = Object.entries(dayCounts).sort(([,a], [,b]) => b - a)[0]
    return busiestDay ? busiestDay[0] : '-'
  }

  const getAvgTableTime = () => {
    if (ordersRaw.length === 0) return 0
    const avgDiningTimeMinutes = 60
    const tableOccupancy: Record<number, number> = {}
    
    ordersRaw.forEach(order => {
      if (order.tables?.number && order.paid_at) {
        tableOccupancy[order.tables.number] = (tableOccupancy[order.tables.number] || 0) + avgDiningTimeMinutes
      }
    })
    
    const occupiedTables = Object.keys(tableOccupancy).length
    if (occupiedTables === 0) return 0
    
    const totalMinutes = Object.values(tableOccupancy).reduce((sum, minutes) => sum + minutes, 0)
    return Math.round(totalMinutes / occupiedTables)
  }

  const getTopPaymentMethod = () => {
    const total = ordersRaw.length
    if (total === 0) return '-'
    
    const counts = ordersRaw.reduce((acc, o) => {
      const method = o.payment_method?.toLowerCase()
      if (method?.includes('qris') || method?.includes('qr')) acc.qris++
      else if (method?.includes('cash')) acc.cash++
      else if (method?.includes('transfer') || method?.includes('bank')) acc.transfer++
      return acc
    }, { qris: 0, cash: 0, transfer: 0 })
    
    const topMethod = Object.entries(counts).sort(([,a], [,b]) => (b as number) - (a as number))[0]
    return topMethod && total > 0 ? `${Math.round(((topMethod[1] as number) / total) * 100)}%` : '-'
  }

  if (!restaurant || dates.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent)]"></div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{dt("analytics")}</h1>
            <p className="text-sm sm:text-base text-gray-600">{dt("performanceSummary")}</p>
          </div>
          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors w-full sm:w-auto"
          >
            <Download className="w-5 h-5" />
            {dt("exportCsv")}
          </button>
        </div>
      </div>

      {/* Period Selector */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-500 mb-3">{dt("period")}</p>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {(['daily', 'weekly', 'monthly', 'yearly'] as PeriodType[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                period === p
                  ? 'bg-[var(--color-accent)] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {p === 'daily' && dt("daily")}
              {p === 'weekly' && dt("weekly")}
              {p === 'monthly' && dt("monthly")}
              {p === 'yearly' && dt("yearly")}
            </button>
          ))}
        </div>
      </div>

      {/* Date Selector */}
      <div className="mb-8 -mx-8">
        <p className="text-sm font-semibold text-gray-500 mb-3 px-8">
          {period === 'daily' ? dt("daily").toUpperCase() : period === 'weekly' ? dt("weekly").toUpperCase() : period === 'monthly' ? dt("monthly").toUpperCase() : dt("yearly").toUpperCase()}
        </p>
        <div id="date-scroll" className="px-8 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory" style={{ overscrollBehavior: 'contain' }}>
          <div className="inline-flex gap-3">
            {dates.map((date, idx) => (
              <button
                key={idx}
                onClick={() => setSelected(idx)}
                className={`px-3 py-3 rounded-lg transition-all whitespace-nowrap snap-start flex-shrink-0 text-sm ${
                  selected === idx
                    ? 'bg-[var(--color-accent)] text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
              <div className="text-center">
                <div className={`font-bold ${selected === idx ? 'text-white' : 'text-gray-900'}`}>
                  {date.day}
                </div>
                {date.month && (
                  <div className={`text-xs ${selected === idx ? 'text-white' : 'text-gray-500'}`}>
                    {date.month}
                  </div>
                )}
              </div>
            </button>
          ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent)]"></div>
        </div>
      ) : (
          <>
            {/* Main Revenue Card */}
            <div className="bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)] rounded-2xl p-8 mb-8 text-white shadow-lg">
              <p className="text-sm opacity-90 mb-2">{dates[selected]?.fullLabel}</p>
              <h2 className="text-4xl font-bold mb-4">
                {formatCurrency(stats.revenue)}
              </h2>
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-2xl font-bold">{stats.orders}</p>
                  <p className="text-sm opacity-90">{dt("orders")}</p>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div>
                  <p className="text-2xl font-bold">{formatCurrency(stats.avgOrder)}</p>
                  <p className="text-sm opacity-90">{dt("average")}</p>
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-500 mb-4">{dt("analytics")}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="p-4 bg-yellow-50 rounded-xl text-center">
                  <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{stats.peakHour}</p>
                  <p className="text-sm text-gray-600">{dt("peakHour")}</p>
                </div>

                <div className="p-4 bg-blue-50 rounded-xl text-center">
                  <Building2 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.topTable > 0 ? `${dt("table")} ${stats.topTable}` : '-'}
                  </p>
                  <p className="text-sm text-gray-600">{dt("topTable")}</p>
                </div>

                <div className="p-4 bg-green-50 rounded-xl text-center">
                  <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.avgOrder)}</p>
                  <p className="text-sm text-gray-600">{dt("avgOrder")}</p>
                </div>

                <div className="p-4 bg-purple-50 rounded-xl text-center">
                  <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">
                    {getAvgTableTime()} min
                  </p>
                  <p className="text-sm text-gray-600">{dt("timePerTable")}</p>
                </div>

                <div className="p-4 bg-pink-50 rounded-xl text-center">
                  <Calendar className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">
                    {getBusiestDay()}
                  </p>
                  <p className="text-sm text-gray-600">{dt("busiestDay")}</p>
                </div>

                <div className="p-4 bg-orange-50 rounded-xl text-center">
                  <TrendingUpIcon className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">
                    {getTopPaymentMethod()}
                  </p>
                  <p className="text-sm text-gray-600">{dt("mostPopular")}</p>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-500 mb-4">{dt("paymentMethods")}</h3>
              
              {/* Donut Chart */}
              <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
                {/* Chart */}
                <div className="relative w-48 h-48 flex-shrink-0">
                  <svg viewBox="0 0 200 200" className="transform -rotate-90">
                    {(() => {
                      const total = stats.cashRevenue + stats.qrisRevenue + stats.transferRevenue;
                      if (total === 0) {
                        return (
                          <circle
                            cx="100"
                            cy="100"
                            r="70"
                            fill="none"
                            stroke="#E5E7EB"
                            strokeWidth="40"
                          />
                        );
                      }
                      
                      const cashPercent = (stats.cashRevenue / total) * 100;
                      const qrisPercent = (stats.qrisRevenue / total) * 100;
                      const transferPercent = (stats.transferRevenue / total) * 100;
                      
                      const circumference = 2 * Math.PI * 70;
                      const cashLength = (cashPercent / 100) * circumference;
                      const qrisLength = (qrisPercent / 100) * circumference;
                      const transferLength = (transferPercent / 100) * circumference;
                      
                      let offset = 0;
                      
                      return (
                        <>
                          {/* Cash */}
                          {cashPercent > 0 && (
                            <circle
                              cx="100"
                              cy="100"
                              r="70"
                              fill="none"
                              stroke="#10B981"
                              strokeWidth="40"
                              strokeDasharray={`${cashLength} ${circumference}`}
                              strokeDashoffset={-offset}
                              className="transition-all duration-300"
                            />
                          )}
                          {/* QRIS */}
                          {qrisPercent > 0 && (
                            <circle
                              cx="100"
                              cy="100"
                              r="70"
                              fill="none"
                              stroke="#3B82F6"
                              strokeWidth="40"
                              strokeDasharray={`${qrisLength} ${circumference}`}
                              strokeDashoffset={-(offset + cashLength)}
                              className="transition-all duration-300"
                            />
                          )}
                          {/* Transfer */}
                          {transferPercent > 0 && (
                            <circle
                              cx="100"
                              cy="100"
                              r="70"
                              fill="none"
                              stroke="#8B5CF6"
                              strokeWidth="40"
                              strokeDasharray={`${transferLength} ${circumference}`}
                              strokeDashoffset={-(offset + cashLength + qrisLength)}
                              className="transition-all duration-300"
                            />
                          )}
                        </>
                      );
                    })()}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{stats.orders}</p>
                      <p className="text-xs text-gray-500">{dt("transactions")}</p>
                    </div>
                  </div>
                </div>
                
                {/* Legend */}
                <div className="flex-1 space-y-3 w-full">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-semibold text-gray-900">💵 {dt("cash")}</p>
                        <p className="text-xs text-gray-600">
                          {stats.revenue > 0 ? `${((stats.cashRevenue / stats.revenue) * 100).toFixed(1)}%` : '0%'}
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {formatCurrency(stats.cashRevenue)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="font-semibold text-gray-900">📱 QRIS</p>
                        <p className="text-xs text-gray-600">
                          {stats.revenue > 0 ? `${((stats.qrisRevenue / stats.revenue) * 100).toFixed(1)}%` : '0%'}
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {formatCurrency(stats.qrisRevenue)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                      <div>
                        <p className="font-semibold text-gray-900">🏦 {dt("transfer")}</p>
                        <p className="text-xs text-gray-600">
                          {stats.revenue > 0 ? `${((stats.transferRevenue / stats.revenue) * 100).toFixed(1)}%` : '0%'}
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {formatCurrency(stats.transferRevenue)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Items */}
            <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-500 mb-4">{dt("topSellingItems")}</h3>
              {topItems.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <UtensilsCrossed className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>{dt("noItemData")}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {topItems.map((item, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-6 h-6 bg-[var(--color-accent)] text-white rounded-full flex items-center justify-center text-xs font-bold">
                              {idx + 1}
                            </span>
                            <p className="font-semibold text-gray-900 line-clamp-1">{item.name}</p>
                          </div>
                          <p className="text-sm text-gray-600">{item.count} {dt("sold")}</p>
                        </div>
                        <p className="text-lg font-bold text-[var(--color-accent)] ml-4">
                          {formatCurrency(item.revenue)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Table Analytics */}
            <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-500 mb-4">{dt("tablePerformance")}</h3>
              {tableAnalytics.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Building2 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>{dt("noTableData")}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tableAnalytics.map((table, idx) => (
                    <div key={table.tableNumber} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-6 h-6 bg-[var(--color-accent)] text-white rounded-full flex items-center justify-center text-xs font-bold">
                              {idx + 1}
                            </span>
                            <p className="font-semibold text-gray-900">{dt("table")} {table.tableNumber}</p>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{table.customers} {dt("customers")}</span>
                            <span>•</span>
                            <span>{table.orders} {dt("orders")}</span>
                          </div>
                        </div>
                        <p className="text-lg font-bold text-[var(--color-accent)] ml-4">
                          {formatCurrency(table.revenue)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Advanced Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* COGS % and Gross Margin Trend */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <Percent className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{dt("cogsMarginTitle")}</h3>
                    <p className="text-xs text-gray-600">{dt("cogsMarginDesc")}</p>
                  </div>
                </div>
                <div className="w-full h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={cogsMarginData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="period" 
                        stroke="#6b7280"
                        style={{ fontSize: '11px' }}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis 
                        stroke="#6b7280"
                        style={{ fontSize: '12px' }}
                        tickFormatter={(value) => `Rp ${(value / 1000).toFixed(0)}K`}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #e5e7eb', 
                          borderRadius: '8px' 
                        }}
                        formatter={(value: any, name?: string, props?: any) => {
                          const dataKey = props?.dataKey
                          if (dataKey === 'cogs') return [formatCurrency(Number(value)), `${dt("cogs")} (30%)`]
                          if (dataKey === 'margin') return [formatCurrency(Number(value)), `${dt("grossMargin")} (70%)`]
                          if (dataKey === 'revenue') return [formatCurrency(Number(value)), dt("revenue")]
                          return [formatCurrency(Number(value)), name || '']
                        }}
                      />
                      <Legend />
                      <Bar 
                        dataKey="cogs" 
                        stackId="a"
                        fill="#ef4444" 
                        name={dt("cogs")}
                        radius={[0, 0, 0, 0]}
                      />
                      <Bar 
                        dataKey="margin" 
                        stackId="a"
                        fill="#10b981" 
                        name={dt("grossMargin")}
                        radius={[8, 8, 0, 0]}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        name={dt("revenue")}
                        dot={{ fill: '#3b82f6', r: 4 }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                  <div className="p-2 bg-red-50 rounded-lg text-center">
                    <p className="text-red-700 font-semibold">{dt("cogsPercent")}</p>
                  </div>
                  <div className="p-2 bg-green-50 rounded-lg text-center">
                    <p className="text-green-700 font-semibold">{dt("marginPercent")}</p>
                  </div>
                  <div className="p-2 bg-blue-50 rounded-lg text-center">
                    <p className="text-blue-700 font-semibold">{dt("revenue")}</p>
                  </div>
                </div>
              </div>

              {/* Promo Performance */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center">
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{dt("promoPerformance")}</h3>
                    <p className="text-xs text-gray-600">{dt("discountCostAnalysis")}</p>
                  </div>
                </div>
                <div className="w-full h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={promoData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="name" 
                        stroke="#6b7280"
                        style={{ fontSize: '11px' }}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis 
                        stroke="#6b7280"
                        style={{ fontSize: '12px' }}
                        tickFormatter={(value) => `Rp ${(value / 1000).toFixed(0)}K`}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #e5e7eb', 
                          borderRadius: '8px' 
                        }}
                        formatter={(value: any, name?: string) => {
                          if (name === 'discount') return [formatCurrency(Number(value)), dt("discountGiven")]
                          if (name === 'netRevenue') return [formatCurrency(Number(value)), dt("netRevenue")]
                          return [formatCurrency(Number(value)), name || '']
                        }}
                      />
                      <Legend />
                      <Bar 
                        dataKey="netRevenue" 
                        stackId="a"
                        fill="#10b981" 
                        name={dt("netRevenue")}
                        radius={[0, 0, 0, 0]}
                      />
                      <Bar 
                        dataKey="discount" 
                        stackId="a"
                        fill="#f59e0b" 
                        name={dt("discountGiven")}
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 text-xs text-gray-600">
                  <p>💡 {dt("compareDiscount")}</p>
                </div>
              </div>

              {/* Void/Discount/Refund Analysis */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{dt("lossAnalysis")}</h3>
                    <p className="text-xs text-gray-600">{dt("voidsDiscounts")}</p>
                  </div>
                </div>
                <div className="w-full h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={voidDiscountData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="type" 
                        stroke="#6b7280"
                        style={{ fontSize: '12px' }}
                      />
                      <YAxis 
                        yAxisId="left"
                        stroke="#6b7280"
                        style={{ fontSize: '12px' }}
                      />
                      <YAxis 
                        yAxisId="right"
                        orientation="right"
                        stroke="#6b7280"
                        style={{ fontSize: '12px' }}
                        tickFormatter={(value) => `Rp ${(value / 1000).toFixed(0)}K`}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #e5e7eb', 
                          borderRadius: '8px' 
                        }}
                        formatter={(value: any, name?: string) => {
                          if (name === 'amount') return [formatCurrency(Number(value)), dt("totalAmount")]
                          return [value, dt("count")]
                        }}
                      />
                      <Legend />
                      <Bar 
                        yAxisId="left"
                        dataKey="count" 
                        fill="#3b82f6" 
                        name={dt("count")}
                        radius={[8, 8, 0, 0]}
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="amount" 
                        stroke="#ef4444" 
                        strokeWidth={3}
                        name={dt("amount")}
                        dot={{ fill: '#ef4444', r: 5 }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {voidDiscountData.map((item, idx) => {
                    const colors = ['bg-red-50 text-red-700', 'bg-amber-50 text-amber-700', 'bg-orange-50 text-orange-700']
                    return (
                      <div key={idx} className={`p-2 rounded-lg ${colors[idx]}`}>
                        <p className="text-xs font-medium">{item.type}</p>
                        <p className="text-sm font-bold">{item.count}</p>
                        <p className="text-xs">{formatCurrency(item.amount)}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Customer Rating Trend - Hidden until we have real rating data */}
              {false && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Customer Satisfaction</h3>
                    <p className="text-xs text-gray-600">Average rating trend over time</p>
                  </div>
                </div>
                <div className="w-full h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={ratingData}>
                      <defs>
                        <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="period" 
                        stroke="#6b7280"
                        style={{ fontSize: '11px' }}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis 
                        stroke="#6b7280"
                        style={{ fontSize: '12px' }}
                        domain={[0, 5]}
                        ticks={[0, 1, 2, 3, 4, 5]}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #e5e7eb', 
                          borderRadius: '8px' 
                        }}
                        formatter={(value: any, name: any) => {
                          if (name === 'rating') return [`⭐ ${value}/5`, 'Average Rating']
                          return [value, 'Reviews']
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="rating" 
                        stroke="#fbbf24" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorRating)"
                        name="Rating"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-center flex-1">
                    <p className="text-2xl font-bold text-gray-900">
                      {ratingData.length > 0 ? `⭐ ${ratingData[ratingData.length - 1].rating}/5` : '-'}
                    </p>
                    <p className="text-xs text-gray-600">Current Rating</p>
                  </div>
                  <div className="text-center flex-1">
                    <p className="text-2xl font-bold text-gray-900">
                      {ratingData.reduce((sum, r) => sum + r.reviews, 0)}
                    </p>
                    <p className="text-xs text-gray-600">Total Reviews</p>
                  </div>
                </div>
              </div>
              )}
            </div>


          </>
        )}

        {/* Export Modal */}
        {showExportModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">{dt("exportDataAnalytics")}</h2>
            <p className="text-gray-600 mb-6">
              {dt("downloadReportDesc")} <span className="font-semibold">{dates[selected]?.fullLabel}</span> {dt("inCsvFormat")}
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-700 mb-2">{dt("dataToExport")}:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ {dt("revenueOrderSummary")}</li>
                <li>✓ {dt("paymentMethodBreakdown")}</li>
                <li>✓ {dt("topSellingItems")}</li>
                <li>✓ {dt("tablePerformance")}</li>
                <li>✓ {dt("allTransactionsDetail")}</li>
              </ul>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowExportModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                {dt("cancel")}
              </button>
              <button
                onClick={exportToCSV}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                {dt("exportCsv")}
              </button>
            </div>
          </div>
        </div>
        )}
      </div>
    )
  }
