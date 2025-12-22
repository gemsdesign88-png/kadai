"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/lib/i18n/context"
import { Plus, Edit2, Trash2, QrCode, Users, TrendingUp, AlertCircle, CheckCircle, Clock, BarChart3 } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ComposedChart, Line } from 'recharts'

type TableStatus = 'available' | 'occupied' | 'reserved'

export default function TablesPage() {
  const router = useRouter()
  const supabase = createClient()
  const { language } = useLanguage()
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

      const { data: tablesData, error: tablesError } = await supabase
        .from('tables')
        .select('*')
        .eq('restaurant_id', restaurants.id)
        .order('number')

      console.log('Tables data:', tablesData)
      console.log('Tables error:', tablesError)
      console.log('Restaurant ID:', restaurants.id)

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
          table: `Table ${a.tableNumber}`,
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
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{language === 'en' ? 'Table Insights' : 'Insight Meja'}</h1>
          <p className="text-gray-600">{language === 'en' ? 'Analyze table performance and statistics' : 'Analisis performa dan statistik meja restoran'}</p>
        </div>
        <button
          onClick={() => router.push('/dashboard/tables/manage')}
          className="flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-white rounded-xl font-semibold hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          <Edit2 className="w-5 h-5" />
          {language === 'en' ? 'Manage Tables' : 'Kelola Meja'}
        </button>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{tables.length}</h3>
            <p className="text-sm text-gray-600">{language === 'en' ? 'Total Tables' : 'Total Meja'}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-3xl font-bold text-green-600 mb-1">{availableTables}</h3>
            <p className="text-sm text-gray-600">{language === 'en' ? 'Available' : 'Tersedia'}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-3xl font-bold text-red-600 mb-1">{occupiedTables}</h3>
            <p className="text-sm text-gray-600">{language === 'en' ? 'Occupied' : 'Terisi'}</p>
          </div>
        </div>

        {/* Table Performance Chart */}
        <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{language === 'en' ? 'Table Performance' : 'Performa Meja'}</h3>
              <p className="text-xs text-gray-600">{language === 'en' ? 'Top 10 tables by revenue' : 'Top 10 meja berdasarkan revenue'}</p>
            </div>
          </div>
          
          <div className="w-full h-96">
            {tablePerformance.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <TrendingUp className="w-16 h-16 mb-3 opacity-50" />
                <p className="text-sm font-medium">{language === 'en' ? 'No transaction data yet' : 'Belum ada data transaksi'}</p>
                <p className="text-xs">{language === 'en' ? 'Orders with table_id will appear here' : 'Orders dengan table_id akan muncul di sini'}</p>
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
                    label={{ value: language === 'en' ? 'Revenue (Rp)' : 'Pendapatan (Rp)', angle: -90, position: 'insideLeft', style: { fontSize: '12px', fill: '#10b981' } }}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    stroke="#3b82f6" 
                    style={{ fontSize: '11px' }}
                    label={{ value: language === 'en' ? 'Orders' : 'Pesanan', angle: 90, position: 'insideRight', style: { fontSize: '12px', fill: '#3b82f6' } }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '8px',
                      padding: '12px'
                    }}
                    formatter={(value: any, name: string) => {
                      if (name === 'revenue') return [`Rp ${Number(value).toLocaleString('id-ID')}`, language === 'en' ? 'Revenue' : 'Pendapatan']
                      if (name === 'orders') return [value, language === 'en' ? 'Orders' : 'Pesanan']
                      return [value, name]
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
                    name={language === 'en' ? 'Revenue (Rp)' : 'Pendapatan (Rp)'} 
                    radius={[8, 8, 0, 0]}
                    maxBarSize={50}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone"
                    dataKey="orders" 
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name={language === 'en' ? 'Total Orders' : 'Jumlah Pesanan'}
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
                <p className="text-xs text-green-600 font-medium">{language === 'en' ? 'Total Revenue' : 'Total Pendapatan'}</p>
                <p className="text-lg font-bold text-green-900">
                  Rp {tablePerformance.reduce((sum, t) => sum + t.revenue, 0).toLocaleString('id-ID')}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50">
                <p className="text-xs text-blue-600 font-medium">{language === 'en' ? 'Total Orders' : 'Total Pesanan'}</p>
                <p className="text-lg font-bold text-blue-900">
                  {tablePerformance.reduce((sum, t) => sum + t.orders, 0)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-50">
                <p className="text-xs text-purple-600 font-medium">{language === 'en' ? 'Avg per Order' : 'Rata-rata per Pesanan'}</p>
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
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{language === 'en' ? 'Occupancy Rate' : 'Tingkat Okupansi'}</h3>
                  <p className="text-sm text-gray-600">{language === 'en' ? 'Current occupied table percentage' : 'Persentase meja terisi saat ini'}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-4xl font-bold text-blue-600">
                  {tables.length > 0 ? Math.round((occupiedTables / tables.length) * 100) : 0}%
                </span>
                <span className="text-sm text-gray-600 mb-2">
                  ({occupiedTables} {language === 'en' ? 'of' : 'dari'} {tables.length} {language === 'en' ? 'tables' : 'meja'})
                </span>
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
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{language === 'en' ? 'Total Capacity' : 'Total Kapasitas'}</h3>
                  <p className="text-sm text-gray-600">{language === 'en' ? 'Maximum guest count' : 'Jumlah maksimal tamu'}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-xl">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl font-bold text-purple-600">
                  {tables.reduce((sum, t) => sum + (t.capacity || 0), 0)}
                </span>
                <span className="text-sm text-gray-600 mb-2">{language === 'en' ? 'people' : 'orang'}</span>
              </div>
              <p className="text-sm text-gray-600">
                {language === 'en' ? 'Average' : 'Rata-rata'} {tables.length > 0 ? (tables.reduce((sum, t) => sum + (t.capacity || 0), 0) / tables.length).toFixed(1) : 0} {language === 'en' ? 'people per table' : 'orang per meja'}
              </p>
            </div>
          </div>
        )}

        {/* Table Performance Analytics */}
        {tables.length > 0 && Object.keys(tableAnalytics).length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{language === 'en' ? 'Table Performance Analysis' : 'Analisis Performa Meja'}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Most Popular Table */}
              {(() => {
                const mostPopular = Object.values(tableAnalytics).reduce((max: any, curr: any) => 
                  curr.totalOrders > (max?.totalOrders || 0) ? curr : max
                , null) as any
                
                if (!mostPopular) return null
                
                return (
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">🏆 {language === 'en' ? 'Most Popular Table' : 'Meja Terlaris'}</h3>
                        <p className="text-sm text-gray-600">{language === 'en' ? 'Most frequently ordered' : 'Paling sering dipesan'}</p>
                      </div>
                      <div className="bg-emerald-100 px-4 py-2 rounded-xl">
                        <span className="text-2xl font-bold text-emerald-600">{language === 'en' ? 'Table' : 'Meja'} {mostPopular.tableNumber}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{language === 'en' ? 'Total Orders:' : 'Total Pesanan:'}</span>
                        <span className="text-lg font-bold text-emerald-600">{mostPopular.totalOrders}x</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{language === 'en' ? 'Total Revenue:' : 'Total Pendapatan:'}</span>
                        <span className="text-lg font-bold text-emerald-600">
                          Rp {mostPopular.totalRevenue.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{language === 'en' ? 'Average per Order:' : 'Rata-rata per Pesanan:'}</span>
                        <span className="text-sm font-semibold text-emerald-600">
                          Rp {Math.round(mostPopular.totalRevenue / mostPopular.totalOrders).toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div className="mt-4 pt-4 border-t border-emerald-200">
                        <p className="text-sm text-gray-700">
                          <strong>{language === 'en' ? 'Insight:' : 'Insight:'}</strong> {language === 'en' ? 'This table is very popular!' : 'Meja ini sangat populer!'}
                          {mostPopular.totalOrders > (Object.values(tableAnalytics).reduce((sum: number, t: any) => sum + t.totalOrders, 0) / Object.keys(tableAnalytics).length * 1.5) 
                            ? (language === 'en' ? ' Consider adding tables with similar characteristics (size, location, view).' : ' Pertimbangkan untuk menambah meja dengan karakteristik serupa (ukuran, lokasi, view).') 
                            : (language === 'en' ? ' Keep it in top condition and easily accessible.' : ' Pastikan selalu dalam kondisi terbaik dan mudah diakses.')}
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
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">⏱️ {language === 'en' ? 'Longest Occupied Table' : 'Meja Terlama Dihuni'}</h3>
                        <p className="text-sm text-gray-600">{language === 'en' ? 'Currently occupied longest' : 'Sedang terisi paling lama'}</p>
                      </div>
                      <div className="bg-orange-100 px-4 py-2 rounded-xl">
                        <span className="text-2xl font-bold text-orange-600">{language === 'en' ? 'Table' : 'Meja'} {longestOccupied.number}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{language === 'en' ? 'Occupied Duration:' : 'Durasi Terisi:'}</span>
                        <span className="text-lg font-bold text-orange-600">
                          {hours > 0 ? `${hours}${language === 'en' ? 'h' : 'j'} ${minutes}${language === 'en' ? 'm' : 'm'}` : `${minutes}${language === 'en' ? 'm' : 'm'}`}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{language === 'en' ? 'Capacity:' : 'Kapasitas:'}</span>
                        <span className="text-sm font-semibold text-orange-600">{longestOccupied.capacity} {language === 'en' ? 'people' : 'orang'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{language === 'en' ? 'Started At:' : 'Mulai Terisi:'}</span>
                        <span className="text-sm font-semibold text-orange-600">
                          {occupiedSince.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="mt-4 pt-4 border-t border-orange-200">
                        <p className="text-sm text-gray-700">
                          <strong>{language === 'en' ? 'Insight:' : 'Insight:'}</strong>
                          {duration > 120 
                            ? (language === 'en' ? ' Guest has been here >2 hours. Consider checking status and offering dessert or extra drinks.' : ' Tamu sudah >2 jam. Pertimbangkan untuk check status dan tawarkan dessert atau minuman tambahan.') 
                            : duration > 60 
                            ? (language === 'en' ? ' Normal duration. Monitor to ensure smooth service.' : ' Durasi normal. Pantau untuk memastikan pelayanan berjalan lancar.') 
                            : (language === 'en' ? ' Guest just sat down. Give time to enjoy the meal.' : ' Tamu baru duduk. Berikan waktu untuk menikmati makanan.')}
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
                <h3 className="text-lg font-bold text-gray-900 mb-4">📊 {language === 'en' ? 'Table Performance Ranking' : 'Ranking Performa Semua Meja'}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">{language === 'en' ? 'Rank' : 'Peringkat'}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">{language === 'en' ? 'Table' : 'Meja'}</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">{language === 'en' ? 'Orders' : 'Pesanan'}</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">{language === 'en' ? 'Revenue' : 'Pendapatan'}</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">{language === 'en' ? 'Average' : 'Rata-rata'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.values(tableAnalytics)
                        .sort((a: any, b: any) => b.totalRevenue - a.totalRevenue)
                        .slice(0, 5)
                        .map((analytics: any, index: number) => (
                          <tr key={analytics.tableId} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                                index === 0 ? 'bg-yellow-100 text-yellow-700' :
                                index === 1 ? 'bg-gray-100 text-gray-700' :
                                index === 2 ? 'bg-orange-100 text-orange-700' :
                                'bg-gray-50 text-gray-600'
                              }`}>
                                {index + 1}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-semibold text-gray-900">{language === 'en' ? 'Table' : 'Meja'} {analytics.tableNumber}</td>
                            <td className="py-3 px-4 text-right text-gray-900">{analytics.totalOrders}x</td>
                            <td className="py-3 px-4 text-right font-semibold text-emerald-600">
                              Rp {analytics.totalRevenue.toLocaleString('id-ID')}
                            </td>
                            <td className="py-3 px-4 text-right text-gray-600">
                              Rp {Math.round(analytics.totalRevenue / analytics.totalOrders).toLocaleString('id-ID')}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                {Object.keys(tableAnalytics).length > 5 && (
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    Menampilkan top 5 dari {Object.keys(tableAnalytics).length} meja
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Smart Suggestions */}
        {tables.length > 0 && (
          <div className="mb-8 space-y-3">
            {/* High Occupancy Alert */}
            {tables.length > 0 && (occupiedTables / tables.length) >= 0.8 && (
              <div className="bg-red-50 border-l-4 border-red-400 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-red-900 mb-1">Kapasitas Hampir Penuh</h4>
                  <p className="text-sm text-red-800">
                    {Math.round((occupiedTables / tables.length) * 100)}% meja terisi. Pertimbangkan untuk menambah meja atau siapkan waiting list.
                  </p>
                </div>
              </div>
            )}

            {/* Low Occupancy Tip */}
            {tables.length > 0 && (occupiedTables / tables.length) < 0.3 && occupiedTables > 0 && (
              <div className="bg-blue-50 border-l-4 border-blue-400 rounded-xl p-4 flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">Waktu Sepi Terdeteksi</h4>
                  <p className="text-sm text-blue-800">
                    Hanya {Math.round((occupiedTables / tables.length) * 100)}% meja terisi. Manfaatkan waktu ini untuk persiapan atau promosi happy hour!
                  </p>
                </div>
              </div>
            )}

            {/* All Tables Free */}
            {occupiedTables === 0 && tables.length > 0 && (
              <div className="bg-green-50 border-l-4 border-green-400 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">Semua Meja Tersedia</h4>
                  <p className="text-sm text-green-800">
                    Semua meja siap menerima tamu. Pastikan QR code sudah terpasang di setiap meja untuk memudahkan pemesanan.
                  </p>
                </div>
              </div>
            )}

            {/* First Time Setup */}
            {tables.length === 0 && (
              <div className="bg-blue-50 border-l-4 border-blue-400 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">Mulai Tambahkan Meja</h4>
                  <p className="text-sm text-blue-800 mb-3">
                    Belum ada meja yang terdaftar. Klik tombol "Kelola Meja" di atas untuk menambahkan meja pertama Anda.
                  </p>
                  <button
                    onClick={() => router.push('/dashboard/tables/manage')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Kelola Meja
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
