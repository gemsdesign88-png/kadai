"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/lib/i18n/context"
import { Plus, Edit2, Trash2, QrCode, Users, TrendingUp, AlertCircle, CheckCircle, Clock, BarChart3, X } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ComposedChart, Line } from 'recharts'
import { createDashboardTranslator } from "@/lib/i18n/dashboard-translator"

type TableStatus = 'available' | 'occupied' | 'reserved'

export default function TablesClient() {
  const router = useRouter()
  const supabase = createClient()
  const { t, language } = useLanguage()
  const { t: dt } = createDashboardTranslator(language)
  
  const [loading, setLoading] = useState(true)
  const [tables, setTables] = useState<any[]>([])
  const [restaurant, setRestaurant] = useState<any>(null)
  const [tableAnalytics, setTableAnalytics] = useState<any>({})
  const [tablePerformance, setTablePerformance] = useState<any[]>([])

  useEffect(() => {
    loadTables()
    loadTableAnalytics()
  }, [])

  async function loadTables() {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      // Get selected restaurant from localStorage
      const selectedRestaurantId = localStorage.getItem('selected_restaurant_id')
      if (!selectedRestaurantId) {
        router.push('/dashboard')
        return
      }

      const { data: restaurants } = await supabase
        .from('restaurants')
        .select('*')
        .eq('id', selectedRestaurantId)
        .eq('owner_id', user.id)
        .single()

      if (!restaurants) return
      setRestaurant(restaurants)

      const { data: tablesData } = await supabase
        .from('tables')
        .select('*')
        .eq('restaurant_id', restaurants.id)
        .order('number')

      if (tablesData) {
        setTables(tablesData)
      }
    } catch (error) {
      console.error('Error loading tables:', error)
    } finally {
      setLoading(false)
    }
  }

  async function loadTableAnalytics() {
    try {
      const selectedRestaurantId = localStorage.getItem('selected_restaurant_id')
      if (!selectedRestaurantId) return

      // Get all orders with table information
      const { data: orders } = await supabase
        .from('orders')
        .select('*, tables(id, number)')
        .eq('restaurant_id', selectedRestaurantId)
        .order('created_at', { ascending: false })

      if (!orders) return

      // Calculate statistics per table
      const analytics: any = {}
      
      orders.forEach((order: any) => {
        if (!order.tables) return
        
        const tableId = order.tables.id
        const tableNumber = order.tables.number
        
        if (!analytics[tableId]) {
          analytics[tableId] = {
            tableId,
            tableNumber,
            totalOrders: 0,
            totalRevenue: 0,
            lastOccupied: null,
            occupiedDuration: 0
          }
        }
        
        analytics[tableId].totalOrders++
        analytics[tableId].totalRevenue += parseFloat(order.total || order.total_amount || 0)
        
        // Track last occupied time
        if (order.created_at) {
          const orderTime = new Date(order.created_at)
          if (!analytics[tableId].lastOccupied || orderTime > new Date(analytics[tableId].lastOccupied)) {
            analytics[tableId].lastOccupied = order.created_at
          }
        }
      })

      setTableAnalytics(analytics)

      // Prepare performance data for chart (top 10 tables by revenue)
      const performanceData = Object.values(analytics)
        .map((a: any) => ({
          table: `${dt("tableLabel")} ${a.tableNumber}`,
          revenue: a.totalRevenue,
          orders: a.totalOrders,
          avgOrder: a.totalOrders > 0 ? a.totalRevenue / a.totalOrders : 0
        }))
        .sort((a: any, b: any) => b.revenue - a.revenue)
        .slice(0, 10)
      
      setTablePerformance(performanceData)
    } catch (error) {
      console.error('Error loading table analytics:', error)
    }
  }

  const availableTables = tables.filter(t => !t.status || t.status === 'available').length
  const occupiedTables = tables.filter(t => t.status && t.status !== 'available').length

  if (loading) {
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
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{dt("tableInsightsTitle")}</h1>
            <p className="text-sm sm:text-base text-gray-600">{dt("tableInsightsDesc")}</p>
          </div>
          <button
            onClick={() => router.push('/dashboard/tables/manage')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-white rounded-xl font-semibold hover:bg-[var(--color-accent-hover)] transition-colors w-full sm:w-auto"
          >
            <Edit2 className="w-5 h-5" />
            {dt("manageTables")}
          </button>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{tables.length}</h3>
            <p className="text-sm text-gray-600">{dt("totalTablesLabel")}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-3xl font-bold text-green-600 mb-1">{availableTables}</h3>
            <p className="text-sm text-gray-600">{dt("available")}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-3xl font-bold text-red-600 mb-1">{occupiedTables}</h3>
            <p className="text-sm text-gray-600">{dt("occupied")}</p>
          </div>
        </div>

        {/* Table Performance Chart */}
        <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{dt("tablePerformance")}</h3>
              <p className="text-xs text-gray-600">{dt("topTablesSubtitle")}</p>
            </div>
          </div>
          
          <div className="w-full h-96">
            {tablePerformance.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <TrendingUp className="w-16 h-16 mb-3 opacity-50" />
                <p className="text-sm font-medium">{dt("noTransactionData")}</p>
                <p className="text-xs">{dt("tableOrdersHint")}</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={tablePerformance} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.3}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="table" 
                    stroke="#6b7280" 
                    style={{ fontSize: '11px' }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    yAxisId="left"
                    stroke="#10b981" 
                    style={{ fontSize: '11px' }}
                    label={{ value: `${dt("revenue")} (Rp)`, angle: -90, position: 'insideLeft', style: { fontSize: '12px', fill: '#10b981' } }}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    stroke="#3b82f6" 
                    style={{ fontSize: '11px' }}
                    label={{ value: dt("orders"), angle: 90, position: 'insideRight', style: { fontSize: '12px', fill: '#3b82f6' } }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '8px',
                      padding: '12px'
                    }}
                    formatter={(value?: any, name?: string) => {
                      if (name === 'revenue') return [`Rp ${Number(value || 0).toLocaleString('id-ID')}`, dt("revenue")]
                      if (name === 'orders') return [value, dt("orders")]
                      return [value, name || '']
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '10px' }}
                    iconType="circle"
                  />
                <Bar 
                  yAxisId="left"
                  dataKey="revenue" 
                  fill="url(#colorRevenue)" 
                  name={`${dt("revenue")} (Rp)`} 
                  radius={[8, 8, 0, 0]}
                  maxBarSize={50}
                />
                <Line 
                  yAxisId="right"
                  type="monotone"
                  dataKey="orders" 
                  stroke="#3b82f6"
                  strokeWidth={3}
                  name={dt("totalOrders")}
                  dot={{ fill: '#3b82f6', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
            )}
          </div>
          
          {tablePerformance.length > 0 && (
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="p-3 rounded-lg bg-green-50">
                <p className="text-xs text-green-600 font-medium">{dt("totalRevenue")}</p>
                <p className="text-lg font-bold text-green-900">
                  Rp {tablePerformance.reduce((sum, t) => sum + t.revenue, 0).toLocaleString('id-ID')}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50">
                <p className="text-xs text-blue-600 font-medium">{dt("totalOrders")}</p>
                <p className="text-lg font-bold text-blue-900">
                  {tablePerformance.reduce((sum, t) => sum + t.orders, 0)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-50">
                <p className="text-xs text-purple-600 font-medium">{dt("avgPerOrder")}</p>
                <p className="text-lg font-bold text-purple-900">
                  Rp {Math.round(
                    tablePerformance.reduce((sum, t) => sum + t.revenue, 0) / 
                    tablePerformance.reduce((sum, t) => sum + t.orders, 0)
                  ).toLocaleString('id-ID')}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Insights & Statistics */}
        {tables.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Occupancy Rate */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{dt("occupancyRate")}</h3>
                  <p className="text-sm text-gray-600">{dt("occupancyDesc")}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-4xl font-bold text-blue-600">
                  {tables.length > 0 ? Math.round((occupiedTables / tables.length) * 100) : 0}%
                </span>
                <span className="text-sm text-gray-600 mb-2">({occupiedTables}/{tables.length} {dt("tables")})</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${tables.length > 0 ? (occupiedTables / tables.length) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            {/* Total Capacity */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{dt("totalCapacity")}</h3>
                  <p className="text-sm text-gray-600">{dt("maxGuestCount")}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-xl">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl font-bold text-purple-600">
                  {tables.reduce((sum, t) => sum + (t.capacity || 0), 0)}
                </span>
                <span className="text-sm text-gray-600 mb-2">{dt("peopleLabel")}</span>
              </div>
              <p className="text-sm text-gray-600">
                {dt("averageLabel")} {tables.length > 0 ? (tables.reduce((sum, t) => sum + (t.capacity || 0), 0) / tables.length).toFixed(1) : 0} {dt("peoplePerTable")}
              </p>
            </div>
          </div>
        )}

        {/* Table Performance Analytics */}
        {tables.length > 0 && Object.keys(tableAnalytics).length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{dt("tablePerformanceAnalysis")}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Most Popular Table */}
              {(() => {
                const mostPopular = Object.values(tableAnalytics).reduce((max: any, curr: any) => 
                  curr.totalOrders > (max?.totalOrders || 0) ? curr : max
                , null) as any
                
                if (!mostPopular) return null
                
                return (
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 sm:p-6 border border-emerald-100">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0 mb-4">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">🏆 {dt("mostPopularTable")}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">{dt("mostFrequentlyOrdered")}</p>
                      </div>
                      <div className="bg-emerald-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl w-fit">
                        <span className="text-lg sm:text-2xl font-bold text-emerald-600">{dt("tableLabel")} {mostPopular.tableNumber}</span>
                      </div>
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm text-gray-600">{dt("totalOrdersLabel")}</span>
                        <span className="text-base sm:text-lg font-bold text-emerald-600">{mostPopular.totalOrders}x</span>
                      </div>
                      <div className="flex justify-between items-center gap-2">
                        <span className="text-xs sm:text-sm text-gray-600">{dt("totalRevenueLabel")}</span>
                        <span className="text-base sm:text-lg font-bold text-emerald-600 text-right">
                          Rp {mostPopular.totalRevenue.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div className="flex justify-between items-center gap-2">
                        <span className="text-xs sm:text-sm text-gray-600">{dt("averagePerOrderLabel")}</span>
                        <span className="text-xs sm:text-sm font-semibold text-emerald-600 text-right">
                          Rp {Math.round(mostPopular.totalRevenue / mostPopular.totalOrders).toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div className="mt-4 pt-4 border-t border-emerald-200">
                        <p className="text-sm text-gray-700">
                          <strong>{dt("insightLabel")}</strong> {dt("tablePopularNote")}
                          {mostPopular.totalOrders > (Object.values(tableAnalytics).reduce((sum: number, t: any) => sum + t.totalOrders, 0) / Object.keys(tableAnalytics).length * 1.5) 
                            ? dt("tableAddSimilar")
                            : dt("tableKeepCondition")}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })()}

              {/* Longest Occupied Table */}
              {(() => {
                const currentlyOccupied = tables.filter(t => t.status && t.status !== 'available')
                if (currentlyOccupied.length === 0) return null
                
                const longestOccupied = currentlyOccupied.reduce((max: any, curr: any) => {
                  const currAnalytics = tableAnalytics[curr.id]
                  const maxAnalytics = tableAnalytics[max?.id]
                  
                  if (!currAnalytics?.lastOccupied) return max
                  if (!max || !maxAnalytics?.lastOccupied) return curr
                  
                  return new Date(currAnalytics.lastOccupied) < new Date(maxAnalytics.lastOccupied) ? curr : max
                }, null)
                
                if (!longestOccupied || !tableAnalytics[longestOccupied.id]?.lastOccupied) return null
                
                const occupiedSince = new Date(tableAnalytics[longestOccupied.id].lastOccupied)
                const duration = Math.floor((Date.now() - occupiedSince.getTime()) / (1000 * 60)) // minutes
                const hours = Math.floor(duration / 60)
                const minutes = duration % 60
                
                return (
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-4 sm:p-6 border border-orange-100">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0 mb-4">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">⏱️ {dt("longestOccupiedTitle")}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">{dt("longestOccupiedDesc")}</p>
                      </div>
                      <div className="bg-orange-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl w-fit">
                        <span className="text-lg sm:text-2xl font-bold text-orange-600">{dt("tableLabel")} {longestOccupied.number}</span>
                      </div>
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm text-gray-600">{dt("occupiedDurationLabel")}</span>
                        <span className="text-base sm:text-lg font-bold text-orange-600">
                          {hours > 0 ? `${hours}${dt("hoursShort")} ${minutes}${dt("minutesShort")}` : `${minutes}${dt("minutesShort")}`}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm text-gray-600">{dt("capacityLabel")}</span>
                        <span className="text-xs sm:text-sm font-semibold text-orange-600">{longestOccupied.capacity} {dt("peopleLabel")}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm text-gray-600">{dt("startedAtLabel")}</span>
                        <span className="text-xs sm:text-sm font-semibold text-orange-600">
                          {occupiedSince.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="mt-4 pt-4 border-t border-orange-200">
                        <p className="text-sm text-gray-700">
                          <strong>{dt("insightLabel")}</strong>
                          {duration > 120 
                            ? dt("insightLongStay") 
                            : duration > 60 
                            ? dt("insightNormalStay") 
                            : dt("insightNewGuest")}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </div>

            {/* Table Performance Ranking */}
            {Object.keys(tableAnalytics).length > 2 && (
                <div className="mt-6 bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">📊 {dt("tablePerformanceRanking")}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">{dt("rankLabel")}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">{dt("tableLabel")}</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">{dt("orders")}</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">{dt("totalRevenueLabel")}</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">{dt("averageLabelShort")}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {Object.values(tableAnalytics)
                        .sort((a: any, b: any) => b.totalRevenue - a.totalRevenue)
                        .map((analytics: any, idx: number) => (
                          <tr key={analytics.tableId} className="hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-4 text-sm font-medium text-gray-500">#{idx + 1}</td>
                            <td className="py-3 px-4 text-sm font-bold text-gray-900">{dt("tableLabel")} {analytics.tableNumber}</td>
                            <td className="py-3 px-4 text-sm text-right text-gray-600">{analytics.totalOrders}</td>
                            <td className="py-3 px-4 text-sm text-right font-bold text-emerald-600">Rp {analytics.totalRevenue.toLocaleString('id-ID')}</td>
                            <td className="py-3 px-4 text-sm text-right text-gray-500">Rp {Math.round(analytics.totalRevenue / analytics.totalOrders).toLocaleString('id-ID')}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
