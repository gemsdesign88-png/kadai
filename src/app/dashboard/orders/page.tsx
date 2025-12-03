"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { TrendingUp, DollarSign, ShoppingBag, Clock, Calendar, Users, ArrowUp, ArrowDown, Star, PieChart as PieChartIcon, BarChart3 } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

interface OrderStats {
  today: {
    revenue: number
    orders: number
    avgOrderValue: number
    growth: number
  }
  thisWeek: {
    revenue: number
    orders: number
    avgOrderValue: number
  }
  thisMonth: {
    revenue: number
    orders: number
    avgOrderValue: number
  }
  topItems: Array<{
    name: string
    quantity: number
    revenue: number
  }>
  peakHours: Array<{
    hour: number
    orders: number
  }>
  hourlySales: Array<{
    hour: string
    orders: number
    revenue: number
  }>
  channelSales: Array<{
    name: string
    value: number
    orders: number
  }>
  recentOrders: any[]
}

export default function OrdersPage() {
  const router = useRouter()
  const supabase = createClient()
  const { language } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<OrderStats | null>(null)
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('today')

  useEffect(() => {
    loadOrderStats()
  }, [timeRange])

  async function loadOrderStats() {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      const selectedRestaurantId = localStorage.getItem('selected_restaurant_id')
      if (!selectedRestaurantId) {
        router.push('/dashboard')
        return
      }

      // Get today's date ranges
      const now = new Date()
      const todayStart = new Date(now.setHours(0, 0, 0, 0)).toISOString()
      const todayEnd = new Date(now.setHours(23, 59, 59, 999)).toISOString()
      
      const weekStart = new Date(now.setDate(now.getDate() - 7)).toISOString()
      const monthStart = new Date(now.setDate(now.getDate() - 30)).toISOString()
      
      const yesterdayStart = new Date(now.setDate(now.getDate() - 1))
      yesterdayStart.setHours(0, 0, 0, 0)
      const yesterdayEnd = new Date(yesterdayStart)
      yesterdayEnd.setHours(23, 59, 59, 999)

      // Fetch all orders
      const { data: allOrders } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('restaurant_id', selectedRestaurantId)
        .order('created_at', { ascending: false })

      if (!allOrders) return

      // Today's orders
      const todayOrders = allOrders.filter(o => 
        new Date(o.created_at) >= new Date(todayStart) && 
        new Date(o.created_at) <= new Date(todayEnd)
      )

      // Yesterday's orders for growth calculation
      const yesterdayOrders = allOrders.filter(o =>
        new Date(o.created_at) >= yesterdayStart &&
        new Date(o.created_at) <= yesterdayEnd
      )

      // Week's orders
      const weekOrders = allOrders.filter(o => new Date(o.created_at) >= new Date(weekStart))

      // Month's orders
      const monthOrders = allOrders.filter(o => new Date(o.created_at) >= new Date(monthStart))

      // Calculate stats
      const todayRevenue = todayOrders.reduce((sum, o) => sum + (o.total || 0), 0)
      const yesterdayRevenue = yesterdayOrders.reduce((sum, o) => sum + (o.total || 0), 0)
      const growth = yesterdayRevenue > 0 
        ? ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100 
        : 0

      const weekRevenue = weekOrders.reduce((sum, o) => sum + (o.total || 0), 0)
      const monthRevenue = monthOrders.reduce((sum, o) => sum + (o.total || 0), 0)

      // Top selling items
      const itemCounts: { [key: string]: { quantity: number; revenue: number } } = {}
      allOrders.forEach(order => {
        order.order_items?.forEach((item: any) => {
          if (!itemCounts[item.menu_item_name]) {
            itemCounts[item.menu_item_name] = { quantity: 0, revenue: 0 }
          }
          itemCounts[item.menu_item_name].quantity += item.quantity
          itemCounts[item.menu_item_name].revenue += item.price * item.quantity
        })
      })

      const topItems = Object.entries(itemCounts)
        .map(([name, data]) => ({ name, ...data }))
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5)

      // Peak hours analysis
      const hourCounts: { [key: number]: number } = {}
      todayOrders.forEach(order => {
        const hour = new Date(order.created_at).getHours()
        hourCounts[hour] = (hourCounts[hour] || 0) + 1
      })

      const peakHours = Object.entries(hourCounts)
        .map(([hour, orders]) => ({ hour: parseInt(hour), orders }))
        .sort((a, b) => b.orders - a.orders)
        .slice(0, 3)

      // Hourly Sales Data - Dynamic based on time range
      const hourlySalesChart: Array<{ hour: string; orders: number; revenue: number }> = []
      const relevantOrders = timeRange === 'today' ? todayOrders : timeRange === 'week' ? weekOrders : monthOrders
      
      if (timeRange === 'today') {
        // For today: show hourly breakdown (24 hours)
        const hourlyData: { [key: number]: { orders: number; revenue: number } } = {}
        for (let i = 0; i < 24; i++) {
          hourlyData[i] = { orders: 0, revenue: 0 }
        }
        
        relevantOrders.forEach(order => {
          const hour = new Date(order.created_at).getHours()
          hourlyData[hour].orders += 1
          hourlyData[hour].revenue += order.total || 0
        })

        Object.entries(hourlyData).forEach(([hour, data]) => {
          hourlySalesChart.push({
            hour: `${hour.padStart(2, '0')}:00`,
            orders: data.orders,
            revenue: data.revenue
          })
        })
      } else if (timeRange === 'week') {
        // For 7 days: show daily breakdown
        const dailyData: { [key: string]: { orders: number; revenue: number } } = {}
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const daysId = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
        
        relevantOrders.forEach(order => {
          const date = new Date(order.created_at)
          const dayIndex = date.getDay()
          const dayName = language === 'en' ? days[dayIndex] : daysId[dayIndex]
          
          if (!dailyData[dayName]) {
            dailyData[dayName] = { orders: 0, revenue: 0 }
          }
          dailyData[dayName].orders += 1
          dailyData[dayName].revenue += order.total || 0
        })

        // Sort by day of week
        const sortedDays = language === 'en' ? days : daysId
        sortedDays.forEach(day => {
          hourlySalesChart.push({
            hour: day,
            orders: dailyData[day]?.orders || 0,
            revenue: dailyData[day]?.revenue || 0
          })
        })
      } else {
        // For 30 days: show weekly breakdown
        const now = new Date()
        for (let i = 3; i >= 0; i--) {
          const weekEnd = new Date(now)
          weekEnd.setDate(now.getDate() - (i * 7))
          const weekStart = new Date(weekEnd)
          weekStart.setDate(weekEnd.getDate() - 6)
          
          const weekOrders = relevantOrders.filter(o => {
            const orderDate = new Date(o.created_at)
            return orderDate >= weekStart && orderDate <= weekEnd
          })
          
          const weekRevenue = weekOrders.reduce((sum, o) => sum + (o.total || 0), 0)
          
          hourlySalesChart.push({
            hour: `Week ${4 - i}`,
            orders: weekOrders.length,
            revenue: weekRevenue
          })
        }
      }

      // Sales by Channel (Dine-in, Takeaway, Delivery) - Read from actual data
      const channelData: { [key: string]: { orders: number; revenue: number } } = {
        'Dine-in': { orders: 0, revenue: 0 },
        'Takeaway': { orders: 0, revenue: 0 },
        'Delivery': { orders: 0, revenue: 0 }
      }

      relevantOrders.forEach(order => {
        // Check multiple fields to determine channel type
        let channel = 'Takeaway' // Default
        
        // If has table_number, it's dine-in
        if (order.table_number && order.table_number > 0) {
          channel = 'Dine-in'
        }
        // If has delivery info, it's delivery
        else if (
          order.order_type === 'delivery' || 
          order.delivery_address || 
          order.is_delivery === true ||
          order.channel === 'delivery'
        ) {
          channel = 'Delivery'
        }
        // If explicitly marked as takeaway
        else if (
          order.order_type === 'takeaway' || 
          order.is_takeaway === true ||
          order.channel === 'takeaway'
        ) {
          channel = 'Takeaway'
        }
        
        channelData[channel].orders += 1
        channelData[channel].revenue += order.total || 0
      })

      const channelSalesChart = Object.entries(channelData)
        .map(([name, data]) => ({
          name,
          value: data.revenue,
          orders: data.orders
        }))
        .filter(item => item.orders > 0) // Only show channels with orders

      setStats({
        today: {
          revenue: todayRevenue,
          orders: todayOrders.length,
          avgOrderValue: todayOrders.length > 0 ? todayRevenue / todayOrders.length : 0,
          growth
        },
        thisWeek: {
          revenue: weekRevenue,
          orders: weekOrders.length,
          avgOrderValue: weekOrders.length > 0 ? weekRevenue / weekOrders.length : 0
        },
        thisMonth: {
          revenue: monthRevenue,
          orders: monthOrders.length,
          avgOrderValue: monthOrders.length > 0 ? monthRevenue / monthOrders.length : 0
        },
        topItems,
        peakHours,
        hourlySales: hourlySalesChart,
        channelSales: channelSalesChart,
        recentOrders: allOrders.slice(0, 10)
      })
    } catch (error) {
      console.error('Error loading order stats:', error)
    } finally {
      setLoading(false)
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

  const formatTime = (hour: number) => {
    return `${hour.toString().padStart(2, '0')}:00`
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-3 gap-6">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  const currentStats = stats?.[timeRange === 'today' ? 'today' : timeRange === 'week' ? 'thisWeek' : 'thisMonth']

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          {language === 'en' ? 'Orders Analytics' : 'Analitik Pesanan'}
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          {language === 'en' ? 'Monitor your orders performance and trends' : 'Pantau performa dan tren pesanan Anda'}
        </p>
      </div>

      {/* Time Range Selector */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setTimeRange('today')}
          className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap text-sm ${
            timeRange === 'today'
              ? 'bg-[var(--color-accent)] text-white'
              : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300'
          }`}
        >
          {language === 'en' ? 'Today' : 'Hari Ini'}
        </button>
        <button
          onClick={() => setTimeRange('week')}
          className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap text-sm ${
            timeRange === 'week'
              ? 'bg-[var(--color-accent)] text-white'
              : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300'
          }`}
        >
          {language === 'en' ? '7 Days' : '7 Hari'}
        </button>
        <button
          onClick={() => setTimeRange('month')}
          className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap text-sm ${
            timeRange === 'month'
              ? 'bg-[var(--color-accent)] text-white'
              : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300'
          }`}
        >
          {language === 'en' ? '30 Days' : '30 Hari'}
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Revenue */}
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            {timeRange === 'today' && stats?.today.growth !== undefined && (
              <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                stats.today.growth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {stats.today.growth >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                <span className="text-xs font-bold">{Math.abs(stats.today.growth).toFixed(1)}%</span>
              </div>
            )}
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">
            {language === 'en' ? 'Total Revenue' : 'Total Pendapatan'}
          </h3>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(currentStats?.revenue || 0)}</p>
          {timeRange === 'today' && (
            <p className="text-xs text-gray-500 mt-2">
              {language === 'en' ? 'vs yesterday' : 'vs kemarin'}
            </p>
          )}
        </div>

        {/* Total Orders */}
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">
            {language === 'en' ? 'Total Orders' : 'Total Pesanan'}
          </h3>
          <p className="text-2xl font-bold text-gray-900">{currentStats?.orders || 0}</p>
          <p className="text-xs text-gray-500 mt-2">
            {language === 'en' ? 'completed orders' : 'pesanan selesai'}
          </p>
        </div>

        {/* Average Order Value */}
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">
            {language === 'en' ? 'Avg Order Value' : 'Rata-rata Nilai Pesanan'}
          </h3>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(currentStats?.avgOrderValue || 0)}</p>
          <p className="text-xs text-gray-500 mt-2">
            {language === 'en' ? 'per transaction' : 'per transaksi'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Items */}
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              {language === 'en' ? 'Top Selling Items' : 'Item Terlaris'}
            </h3>
          </div>
          <div className="space-y-4">
            {stats?.topItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-accent)] to-[#8B5CF6] rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.quantity} {language === 'en' ? 'sold' : 'terjual'}
                    </p>
                  </div>
                </div>
                <p className="font-bold text-gray-900">{formatCurrency(item.revenue)}</p>
              </div>
            ))}
            {(!stats?.topItems || stats.topItems.length === 0) && (
              <p className="text-gray-500 text-center py-8">
                {language === 'en' ? 'No sales data yet' : 'Belum ada data penjualan'}
              </p>
            )}
          </div>
        </div>

        {/* Peak Hours */}
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              {language === 'en' ? 'Peak Hours Today' : 'Jam Sibuk Hari Ini'}
            </h3>
          </div>
          <div className="space-y-4">
            {stats?.peakHours.map((peak, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-semibold text-gray-900">{formatTime(peak.hour)}</p>
                    <p className="text-sm text-gray-600">
                      {peak.orders} {language === 'en' ? 'orders' : 'pesanan'}
                    </p>
                  </div>
                </div>
                <div className="w-24 bg-gray-100 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[var(--color-accent)] to-[#8B5CF6] h-2 rounded-full"
                    style={{ width: `${(peak.orders / (stats?.today.orders || 1)) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
            {(!stats?.peakHours || stats.peakHours.length === 0) && (
              <p className="text-gray-500 text-center py-8">
                {language === 'en' ? 'No orders today yet' : 'Belum ada pesanan hari ini'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Charts Section Header */}
      <div className="mt-8 mb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          📊 {language === 'en' ? 'Sales Analytics Charts' : 'Grafik Analitik Penjualan'}
        </h2>
        <p className="text-gray-600">
          {language === 'en' ? 'Visual breakdown of your sales performance' : 'Visualisasi performa penjualan Anda'}
        </p>
      </div>

      {/* New Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Hourly Sales Heatmap */}
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {language === 'en' 
                  ? timeRange === 'today' 
                    ? 'Sales by Hour' 
                    : timeRange === 'week' 
                      ? 'Sales by Day (7 Days)' 
                      : 'Sales by Week (4 Weeks)'
                  : timeRange === 'today'
                    ? 'Penjualan per Jam'
                    : timeRange === 'week'
                      ? 'Penjualan per Hari (7 Hari)'
                      : 'Penjualan per Minggu (4 Minggu)'}
              </h3>
              <p className="text-xs text-gray-600">
                {language === 'en' 
                  ? timeRange === 'today'
                    ? 'Hourly revenue distribution'
                    : timeRange === 'week'
                      ? 'Daily revenue distribution'
                      : 'Weekly revenue distribution'
                  : timeRange === 'today'
                    ? 'Distribusi pendapatan per jam'
                    : timeRange === 'week'
                      ? 'Distribusi pendapatan per hari'
                      : 'Distribusi pendapatan per minggu'}
              </p>
            </div>
          </div>
          <div className="w-full h-80">
            {(!stats?.hourlySales || stats.hourlySales.length === 0 || stats.hourlySales.every(d => d.revenue === 0)) ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <BarChart3 className="w-16 h-16 mb-3 opacity-50" />
                <p className="text-sm font-medium">{language === 'en' ? 'No sales data yet' : 'Belum ada data penjualan'}</p>
                <p className="text-xs">{language === 'en' ? 'Create some orders to see this chart' : 'Buat pesanan untuk melihat grafik ini'}</p>
              </div>
            ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.hourlySales || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="hour" 
                  stroke="#6b7280"
                  style={{ fontSize: '11px' }}
                  interval={timeRange === 'today' ? 1 : 0}
                  angle={timeRange === 'today' ? -45 : 0}
                  textAnchor={timeRange === 'today' ? 'end' : 'middle'}
                  height={timeRange === 'today' ? 60 : 40}
                />
                <YAxis 
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value: any, name: string) => {
                    if (name === 'revenue') return [formatCurrency(Number(value)), language === 'en' ? 'Revenue' : 'Pendapatan']
                    return [value, language === 'en' ? 'Orders' : 'Pesanan']
                  }}
                />
                <Bar 
                  dataKey="revenue" 
                  fill="url(#colorRevenue)" 
                  radius={[8, 8, 0, 0]}
                  isAnimationActive={true}
                />
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f97316" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#dc2626" stopOpacity={0.6}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
            )}
          </div>
          <div className="mt-4 text-xs text-gray-600">
            <p>💡 {language === 'en' 
              ? timeRange === 'today'
                ? 'Identify peak hours to optimize staffing and inventory'
                : timeRange === 'week'
                  ? 'Identify busiest days to plan promotions and resources'
                  : 'Track weekly trends to forecast monthly performance'
              : timeRange === 'today'
                ? 'Identifikasi jam sibuk untuk mengoptimalkan staff dan stok'
                : timeRange === 'week'
                  ? 'Identifikasi hari tersibuk untuk rencanakan promo dan sumber daya'
                  : 'Lacak tren mingguan untuk perkirakan performa bulanan'}</p>
          </div>
        </div>

        {/* Sales by Channel (Pie Chart) */}
        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <PieChartIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {language === 'en' ? 'Sales by Channel' : 'Penjualan per Saluran'}
              </h3>
              <p className="text-xs text-gray-600">
                {language === 'en' ? 'Breakdown by order type' : 'Breakdown berdasarkan tipe pesanan'}
              </p>
            </div>
          </div>
          <div className="w-full h-80 flex items-center justify-center">
            {(!stats?.channelSales || stats.channelSales.length === 0 || stats.channelSales.every(d => d.value === 0)) ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <PieChartIcon className="w-16 h-16 mb-3 opacity-50" />
                <p className="text-sm font-medium">{language === 'en' ? 'No channel data yet' : 'Belum ada data saluran'}</p>
                <p className="text-xs">{language === 'en' ? 'Create some orders to see this chart' : 'Buat pesanan untuk melihat grafik ini'}</p>
              </div>
            ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats?.channelSales || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  isAnimationActive={true}
                >
                  {(stats?.channelSales || []).map((entry, index) => {
                    const COLORS = ['#3b82f6', '#10b981', '#f59e0b']
                    return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  })}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px' 
                  }}
                  formatter={(value: any, name: string, props: any) => {
                    if (name === 'value') return [formatCurrency(Number(value)), language === 'en' ? 'Revenue' : 'Pendapatan']
                    return [value, name]
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value, entry: any) => {
                    const channel = stats?.channelSales.find(c => c.name === value)
                    return `${value} (${channel?.orders || 0} ${language === 'en' ? 'orders' : 'pesanan'})`
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            )}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {stats?.channelSales.map((channel, idx) => {
              const colors = ['bg-blue-100 text-blue-700', 'bg-green-100 text-green-700', 'bg-amber-100 text-amber-700']
              return (
                <div key={idx} className={`p-3 rounded-lg ${colors[idx]}`}>
                  <p className="text-xs font-medium">{channel.name}</p>
                  <p className="text-lg font-bold">{formatCurrency(channel.value)}</p>
                  <p className="text-xs">{channel.orders} {language === 'en' ? 'orders' : 'pesanan'}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Smart Suggestions */}
      <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              {language === 'en' ? '💡 Smart Suggestions' : '💡 Saran Cerdas'}
            </h3>
            <div className="space-y-3">
              {/* Revenue Growth Suggestion */}
              {stats?.today.growth !== undefined && stats.today.growth < -10 && (
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    {language === 'en' ? '📉 Revenue Down vs Yesterday' : '📉 Pendapatan Turun vs Kemarin'}
                  </p>
                  <p className="text-sm text-gray-700">
                    {language === 'en' 
                      ? 'Consider running promotions or creating limited-time offers to boost sales. Review your menu pricing and customer feedback.'
                      : 'Pertimbangkan untuk menjalankan promo atau membuat penawaran terbatas untuk meningkatkan penjualan. Tinjau harga menu dan feedback pelanggan.'}
                  </p>
                </div>
              )}
              
              {stats?.today.growth !== undefined && stats.today.growth > 20 && (
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    {language === 'en' ? '🚀 Great Performance Today!' : '🚀 Performa Hari Ini Luar Biasa!'}
                  </p>
                  <p className="text-sm text-gray-700">
                    {language === 'en' 
                      ? 'Revenue is up significantly! Ensure you have enough inventory for top sellers. Consider extending successful promotions.'
                      : 'Pendapatan naik signifikan! Pastikan Anda punya stok cukup untuk item terlaris. Pertimbangkan perpanjang promo yang berhasil.'}
                  </p>
                </div>
              )}

              {/* Peak Hours Suggestion */}
              {stats?.peakHours && stats.peakHours.length > 0 && (
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    {language === 'en' ? '⏰ Optimize Staff Schedule' : '⏰ Optimalkan Jadwal Staff'}
                  </p>
                  <p className="text-sm text-gray-700">
                    {language === 'en' 
                      ? `Your busiest hour today was ${formatTime(stats.peakHours[0].hour)}. Schedule more staff during peak hours to improve service speed and customer satisfaction.`
                      : `Jam tersibuk hari ini adalah ${formatTime(stats.peakHours[0].hour)}. Jadwalkan lebih banyak staff saat jam sibuk untuk meningkatkan kecepatan layanan dan kepuasan pelanggan.`}
                  </p>
                </div>
              )}

              {/* Top Items Suggestion */}
              {stats?.topItems && stats.topItems.length > 0 && (
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    {language === 'en' ? '⭐ Focus on Bestsellers' : '⭐ Fokus pada Bestseller'}
                  </p>
                  <p className="text-sm text-gray-700">
                    {language === 'en' 
                      ? `"${stats.topItems[0].name}" is your top seller! Consider: 1) Creating combo deals with it, 2) Ensuring consistent quality, 3) Training staff to upsell it, 4) Promoting it on social media.`
                      : `"${stats.topItems[0].name}" adalah item terlaris Anda! Pertimbangkan: 1) Buat paket combo dengannya, 2) Jaga konsistensi kualitas, 3) Latih staff untuk upsell, 4) Promosikan di media sosial.`}
                  </p>
                </div>
              )}

              {/* Low Order Volume Suggestion */}
              {currentStats && currentStats.orders < 5 && timeRange === 'today' && (
                <div className="bg-white rounded-lg p-4 border border-amber-200">
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    {language === 'en' ? '📢 Low Order Volume Today' : '📢 Volume Pesanan Rendah Hari Ini'}
                  </p>
                  <p className="text-sm text-gray-700">
                    {language === 'en' 
                      ? 'Drive more traffic with: 1) Flash sales during slow hours, 2) Social media posts with attractive food photos, 3) Loyalty rewards for repeat customers, 4) Partner with delivery apps.'
                      : 'Tingkatkan traffic dengan: 1) Flash sale saat jam sepi, 2) Posting media sosial dengan foto makanan menarik, 3) Reward loyalitas untuk pelanggan repeat, 4) Bermitra dengan aplikasi delivery.'}
                  </p>
                </div>
              )}

              {/* High Average Order Value */}
              {currentStats && currentStats.avgOrderValue > 100000 && (
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    {language === 'en' ? '💰 High Average Order Value' : '💰 Nilai Pesanan Rata-rata Tinggi'}
                  </p>
                  <p className="text-sm text-gray-700">
                    {language === 'en' 
                      ? 'Customers are spending well! Maintain this by: 1) Creating premium menu items, 2) Offering exclusive experiences, 3) Implementing a VIP program, 4) Upselling desserts and beverages.'
                      : 'Pelanggan spending dengan baik! Pertahankan dengan: 1) Buat menu item premium, 2) Tawarkan pengalaman eksklusif, 3) Implementasi program VIP, 4) Upsell dessert dan minuman.'}
                  </p>
                </div>
              )}

              {/* No Data Suggestion */}
              {(!stats?.today.orders || stats.today.orders === 0) && timeRange === 'today' && (
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    {language === 'en' ? '🎯 Get Started Today' : '🎯 Mulai Hari Ini'}
                  </p>
                  <p className="text-sm text-gray-700">
                    {language === 'en' 
                      ? 'No orders yet today. Boost visibility by: 1) Posting breakfast/lunch specials on social media, 2) Sending push notifications to app users, 3) Offering early bird discounts, 4) Updating your business hours online.'
                      : 'Belum ada pesanan hari ini. Tingkatkan visibilitas dengan: 1) Post spesial sarapan/makan siang di media sosial, 2) Kirim notifikasi push ke user app, 3) Tawarkan diskon early bird, 4) Update jam operasional online.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
