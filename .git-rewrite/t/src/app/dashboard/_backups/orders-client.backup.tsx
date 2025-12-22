"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { TrendingUp, DollarSign, ShoppingBag, Clock, Calendar, Users, ArrowUp, ArrowDown, Star, PieChart as PieChartIcon, BarChart3 } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { createDashboardTranslator } from "@/lib/i18n/dashboard-translator"

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

export default function OrdersClient() {
  const router = useRouter()
  const supabase = createClient()
  const { language } = useLanguage()
  const { t: dt, shortDayLabel } = createDashboardTranslator(language)
  const formatText = (key: string, replacements?: Record<string, string | number>) => {
    let text = dt(key)
    if (replacements) {
      Object.entries(replacements).forEach(([token, value]) => {
        text = text.replace(`{${token}}`, String(value))
      })
    }
    return text
  }
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

      // Fetch orders for different periods
      const { data: orders } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('restaurant_id', selectedRestaurantId)
        .eq('payment_status', 'paid')
        .gte('paid_at', monthStart)

      if (orders) {
        const todayOrders = orders.filter(o => o.paid_at >= todayStart)
        const yesterdayOrders = orders.filter(o => o.paid_at >= yesterdayStart.toISOString() && o.paid_at <= yesterdayEnd.toISOString())
        const weekOrders = orders.filter(o => o.paid_at >= weekStart)
        
        const todayRevenue = todayOrders.reduce((sum, o) => sum + (o.total || 0), 0)
        const yesterdayRevenue = yesterdayOrders.reduce((sum, o) => sum + (o.total || 0), 0)
        
        const growth = yesterdayRevenue > 0 
          ? ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100 
          : 0

        // Process hourly sales
        const hourlyMap = new Map<number, { orders: number; revenue: number }>()
        for (let i = 0; i < 24; i++) hourlyMap.set(i, { orders: 0, revenue: 0 })
        
        todayOrders.forEach(o => {
          const hour = new Date(o.paid_at).getHours()
          const current = hourlyMap.get(hour)!
          hourlyMap.set(hour, {
            orders: current.orders + 1,
            revenue: current.revenue + (o.total || 0)
          })
        })

        const hourlySales = Array.from(hourlyMap.entries()).map(([hour, data]) => ({
          hour: `${hour.toString().padStart(2, '0')}:00`,
          ...data
        }))

        // Process top items
        const itemMap = new Map<string, { quantity: number; revenue: number }>()
        orders.forEach(o => {
          o.order_items?.forEach((item: any) => {
            const current = itemMap.get(item.name) || { quantity: 0, revenue: 0 }
            itemMap.set(item.name, {
              quantity: current.quantity + item.quantity,
              revenue: current.revenue + (item.price * item.quantity)
            })
          })
        })

        const topItems = Array.from(itemMap.entries())
          .map(([name, data]) => ({ name, ...data }))
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, 5)

        // Process channel sales (simulated)
        const channelSales = [
          { name: dt("dineIn"), value: 65, orders: Math.round(orders.length * 0.65) },
          { name: dt("takeaway"), value: 25, orders: Math.round(orders.length * 0.25) },
          { name: dt("delivery"), value: 10, orders: Math.round(orders.length * 0.10) }
        ]

        setStats({
          today: {
            revenue: todayRevenue,
            orders: todayOrders.length,
            avgOrderValue: todayOrders.length > 0 ? todayRevenue / todayOrders.length : 0,
            growth
          },
          thisWeek: {
            revenue: weekOrders.reduce((sum, o) => sum + (o.total || 0), 0),
            orders: weekOrders.length,
            avgOrderValue: weekOrders.length > 0 ? weekOrders.reduce((sum, o) => sum + (o.total || 0), 0) / weekOrders.length : 0
          },
          thisMonth: {
            revenue: orders.reduce((sum, o) => sum + (o.total || 0), 0),
            orders: orders.length,
            avgOrderValue: orders.length > 0 ? orders.reduce((sum, o) => sum + (o.total || 0), 0) / orders.length : 0
          },
          topItems,
          peakHours: Array.from(hourlyMap.entries())
            .map(([hour, data]) => ({ hour, orders: data.orders }))
            .sort((a, b) => b.orders - a.orders)
            .slice(0, 3),
          hourlySales,
          channelSales,
          recentOrders: orders.slice(0, 10)
        })
      }
    } catch (error) {
      console.error('❌ Error loading order stats:', error)
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

  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444']

  if (loading || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent)]"></div>
      </div>
    )
  }

  const currentStats = timeRange === 'today' ? stats.today : timeRange === 'week' ? stats.thisWeek : stats.thisMonth

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{dt("orderAnalytics")}</h1>
            <p className="text-sm sm:text-base text-gray-600">{dt("orderAnalyticsDesc")}</p>
          </div>
          <div className="flex bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
            {(['today', 'week', 'month'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  timeRange === range
                    ? 'bg-[var(--color-accent)] text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {dt(range)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            {timeRange === 'today' && (
              <div className={`flex items-center gap-1 text-sm font-medium ${stats.today.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.today.growth >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                {Math.abs(stats.today.growth).toFixed(1)}%
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500 mb-1">{dt("totalRevenue")}</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(currentStats.revenue)}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-1">{dt("totalOrders")}</p>
          <p className="text-2xl font-bold text-gray-900">{currentStats.orders}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-1">{dt("avgOrderValue")}</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(currentStats.avgOrderValue)}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-1">{dt("peakHour")}</p>
          <p className="text-2xl font-bold text-gray-900">
            {stats.peakHours[0] ? `${stats.peakHours[0].hour.toString().padStart(2, '0')}:00` : '-'}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Hourly Sales Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900">{dt("hourlySales")}</h3>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-[var(--color-accent)] rounded-full"></div>
                <span className="text-gray-500">{dt("revenue")}</span>
              </div>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.hourlySales}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="hour" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                  tickFormatter={(value) => `Rp${value/1000}k`}
                />
                <Tooltip 
                  cursor={{ fill: '#f9fafb' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [formatCurrency(value), dt("revenue")]}
                />
                <Bar 
                  dataKey="revenue" 
                  fill="var(--color-accent)" 
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Channel Distribution */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-6">{dt("orderChannels")}</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.channelSales}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.channelSales.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Items */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-6">{dt("topSellingItems")}</h3>
          <div className="space-y-6">
            {stats.topItems.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-sm font-bold text-gray-400">
                    #{idx + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.quantity} {dt("sold")}</p>
                  </div>
                </div>
                <p className="font-bold text-gray-900">{formatCurrency(item.revenue)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">{dt("recentOrders")}</h3>
            <button 
              onClick={() => router.push('/dashboard/history')}
              className="text-sm font-medium text-[var(--color-accent)] hover:underline"
            >
              {dt("viewAll")}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-sm">
                  <th className="px-6 py-4 font-semibold">{dt("orderId")}</th>
                  <th className="px-6 py-4 font-semibold">{dt("time")}</th>
                  <th className="px-6 py-4 font-semibold">{dt("items")}</th>
                  <th className="px-6 py-4 font-semibold">{dt("total")}</th>
                  <th className="px-6 py-4 font-semibold">{dt("status")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stats.recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">#{order.id.slice(0, 8)}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(order.paid_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-4 text-gray-500">{order.order_items?.length || 0} {dt("items")}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{formatCurrency(order.total)}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-50 text-green-600 rounded-lg text-xs font-medium">
                        {dt("paid")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
