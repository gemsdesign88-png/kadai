"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/i18n/context"
import { 
  BarChart3, ShoppingCart, Users, Package, TrendingUp, Clock, DollarSign, 
  Building2, UtensilsCrossed, Zap, Bell, CheckCircle, ChevronRight, Star, AlertTriangle
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar, Legend } from "recharts"

// Same dummy data
const DUMMY_STATS = {
  weekRevenue: 45800000,
  weekOrders: 623,
  avgOrderValue: 145000,
  totalCustomers: 478,
  activeOrders: 18,
  growthPercent: 34.2
}

const DUMMY_REVENUE_TREND = [
  { date: "Nov 26", revenue: 9800000 },
  { date: "Nov 27", revenue: 10600000 },
  { date: "Nov 28", revenue: 10300000 },
  { date: "Nov 29", revenue: 11100000 },
  { date: "Nov 30", revenue: 11800000 },
  { date: "Dec 1", revenue: 11400000 },
  { date: "Dec 2", revenue: 12200000 }
]

const DUMMY_ORDERS_AOV = [
  { day: "Senin", orders: 68, avgOrderValue: 125000 },
  { day: "Selasa", orders: 74, avgOrderValue: 118000 },
  { day: "Rabu", orders: 62, avgOrderValue: 138000 },
  { day: "Kamis", orders: 82, avgOrderValue: 132000 },
  { day: "Jumat", orders: 105, avgOrderValue: 158000 },
  { day: "Sabtu", orders: 128, avgOrderValue: 175000 },
  { day: "Minggu", orders: 116, avgOrderValue: 168000 }
]

const DUMMY_TOP_ITEMS = [
  { name: "Nasi Goreng Spesial", revenue: 5800000, count: 287 },
  { name: "Ayam Bakar Premium", revenue: 4900000, count: 214 },
  { name: "Mie Goreng Seafood", revenue: 4200000, count: 196 },
  { name: "Soto Ayam Komplit", revenue: 3600000, count: 189 },
  { name: "Es Teh Manis", revenue: 2100000, count: 412 }
]

const DUMMY_TOP_TABLES = [
  { tableNumber: 8, orders: 72, revenue: 8900000 },
  { tableNumber: 5, orders: 65, revenue: 8200000 },
  { tableNumber: 12, orders: 58, revenue: 7400000 }
]

const DUMMY_TOP_STAFF = [
  { name: "Rina", orders: 245, revenue: 14800000, rating: 4.9 },
  { name: "Budi", orders: 228, revenue: 13500000, rating: 4.9 },
  { name: "Sari", orders: 198, revenue: 11900000, rating: 4.8 }
]

const DUMMY_INSIGHTS = [
  { id: 'growth', icon: TrendingUp, title: 'Pertumbuhan Eksplosif', message: '+34% pertumbuhan pendapatan minggu ini', color: 'green' },
  { id: 'top-item', icon: UtensilsCrossed, title: 'Menu Andalan', message: 'Nasi Goreng Spesial menghasilkan Rp 5.8M minggu ini', color: 'blue' },
  { id: 'top-table', icon: Building2, title: 'Meja Premium', message: 'Meja 8 menghasilkan Rp 8.9M - Area ROI tertinggi', color: 'purple' },
  { id: 'top-staff', icon: Users, title: 'Staf Bintang', message: 'Rina mencatat Rp 14.8M penjualan', color: 'indigo' }
]

const DUMMY_ALERTS = [
  { id: 'peak-prep', type: 'info', message: 'Persiapan weekend rush - Prediksi 130+ pesanan/hari' },
  { id: 'vip', type: 'info', message: '5 reservasi VIP untuk malam ini' }
]

const DUMMY_TODOS = [
  { id: 'restock', text: 'Order Ayam Premium 50kg', priority: 'high' },
  { id: 'staff', text: 'Jadwal 3 staff extra untuk weekend', priority: 'high' },
  { id: 'promo', text: 'Setup promo weekday untuk boost traffic', priority: 'medium' }
]

export function InteractiveDashboard() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = React.useState('dashboard')
  const [dashboardPeriod, setDashboardPeriod] = React.useState<'harian' | 'mingguan'>('mingguan')

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const menuItems = [
    { id: 'dashboard', label: language === 'en' ? 'Dashboard' : 'Dasbor', icon: BarChart3 },
    { id: 'analytics', label: language === 'en' ? 'Analytics' : 'Analitik', icon: TrendingUp },
    { id: 'orders', label: language === 'en' ? 'Orders' : 'Pesanan', icon: ShoppingCart },
    { id: 'menu', label: 'Menu', icon: UtensilsCrossed },
    { id: 'customers', label: language === 'en' ? 'Customers' : 'Pelanggan', icon: Users },
    { id: 'inventory', label: language === 'en' ? 'Inventory' : 'Stok', icon: Package },
    { id: 'staff', label: language === 'en' ? 'Staff' : 'Staf', icon: Users },
    { id: 'tables', label: language === 'en' ? 'Tables' : 'Meja', icon: Building2 }
  ]

  const renderContent = () => {
    // Static pages (non-interactive) - Show "Demo Mode"
    if (activeTab !== 'dashboard') {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-900 font-semibold text-lg mb-1">Demo Mode</p>
            <p className="text-sm text-gray-500 mb-4">Full analytics available in real app</p>
            <p className="text-xs text-gray-400">Click "Dasbor" to see interactive demo</p>
          </div>
        </div>
      )
    }

    // Main Dashboard - Interactive with period toggle
    const chartData = dashboardPeriod === 'harian' ? DUMMY_REVENUE_TREND.slice(-1) : DUMMY_REVENUE_TREND

    return (
      <div key={activeTab} className="space-y-8">
        {/* Period Toggle - INTERACTIVE */}
        <div className="flex gap-2">
          <button
            onClick={() => setDashboardPeriod('harian')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              dashboardPeriod === 'harian'
                ? 'bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] text-white shadow-md'
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300'
            }`}
          >
            {language === 'en' ? 'Today' : 'Hari Ini'}
          </button>
          <button
            onClick={() => setDashboardPeriod('mingguan')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              dashboardPeriod === 'mingguan'
                ? 'bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] text-white shadow-md'
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300'
            }`}
          >
            {language === 'en' ? 'This Week' : 'Minggu Ini'}
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-gradient-to-br from-[#FF5A5F] to-[#8B5CF6] rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <DollarSign className="w-5 h-5 opacity-80" />
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full font-bold">+{DUMMY_STATS.growthPercent}%</span>
            </div>
            <p className="text-xs opacity-80 mb-1">{dashboardPeriod === 'harian' ? 'Hari Ini' : 'Minggu Ini'}</p>
            <h3 className="text-lg font-bold">{formatCurrency(dashboardPeriod === 'harian' ? 12200000 : DUMMY_STATS.weekRevenue)}</h3>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <ShoppingCart className="w-5 h-5 text-blue-600 mb-3" />
            <p className="text-xs text-gray-600 mb-1">Total Pesanan</p>
            <h3 className="text-lg font-bold text-gray-900">{dashboardPeriod === 'harian' ? 186 : DUMMY_STATS.weekOrders}</h3>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <TrendingUp className="w-5 h-5 text-green-600 mb-3" />
            <p className="text-xs text-gray-600 mb-1">Rata Pesanan</p>
            <h3 className="text-lg font-bold text-gray-900">{formatCurrency(DUMMY_STATS.avgOrderValue)}</h3>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <Users className="w-5 h-5 text-purple-600 mb-3" />
            <p className="text-xs text-gray-600 mb-1">Pelanggan</p>
            <h3 className="text-lg font-bold text-gray-900">{DUMMY_STATS.totalCustomers}</h3>
          </div>

          <div className="bg-yellow-50 border-yellow-100 rounded-xl p-4 border shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <Clock className="w-5 h-5 text-yellow-600" />
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold">Aktif</span>
            </div>
            <p className="text-xs text-gray-600 mb-1">Sedang Diproses</p>
            <h3 className="text-lg font-bold text-gray-900">{DUMMY_STATS.activeOrders}</h3>
          </div>
        </div>

        {/* Charts - Change based on period */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#FF5A5F]" />
              Tren Pendapatan ({dashboardPeriod === 'harian' ? 'Hari Ini' : '7 Hari'})
            </h3>
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                  <Tooltip formatter={(value: any) => formatCurrency(Number(value))} />
                  <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-[#FF5A5F]" />
              Pesanan vs AOV per Hari
            </h3>
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={DUMMY_ORDERS_AOV}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis yAxisId="left" stroke="#6b7280" />
                  <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="orders" fill="#3b82f6" name="Pesanan" />
                  <Line yAxisId="right" type="monotone" dataKey="avgOrderValue" stroke="#10b981" strokeWidth={3} name="AOV" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {DUMMY_INSIGHTS.map((insight) => {
            const IconComponent = insight.icon
            const colorClass = insight.color === 'green' ? 'from-green-50 to-emerald-50 border-green-200' :
              insight.color === 'blue' ? 'from-blue-50 to-cyan-50 border-blue-200' :
              insight.color === 'purple' ? 'from-purple-50 to-pink-50 border-purple-200' :
              'from-indigo-50 to-blue-50 border-indigo-200'
            
            return (
              <div key={insight.id} className={`rounded-2xl p-6 border-2 bg-gradient-to-br ${colorClass} shadow-md`}>
                <IconComponent className="w-6 h-6 text-gray-700 mb-3" />
                <h4 className="font-bold text-gray-900 mb-2 text-sm">{insight.title}</h4>
                <p className="text-sm text-gray-700">{insight.message}</p>
              </div>
            )
          })}
        </div>

        {/* Alerts & Todos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-[#FF5A5F]" />
              <h3 className="text-lg font-bold text-gray-900">Notifikasi</h3>
            </div>
            <div className="space-y-3">
              {DUMMY_ALERTS.map((alert) => (
                <div key={alert.id} className="p-4 rounded-lg border-l-4 bg-blue-50 border-blue-500">
                  <p className="font-medium text-gray-900 text-sm">{alert.message}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-[#FF5A5F]" />
              <h3 className="text-lg font-bold text-gray-900">Hal yang Harus Dilakukan</h3>
            </div>
            <div className="space-y-2">
              {DUMMY_TODOS.map((todo) => (
                <div key={todo.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${todo.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                    <span className="text-gray-900 font-medium text-sm">{todo.text}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <UtensilsCrossed className="w-5 h-5 text-[#FF5A5F]" />
              <h3 className="text-lg font-bold text-gray-900">Menu Terlaris</h3>
            </div>
            <div className="space-y-3">
              {DUMMY_TOP_ITEMS.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                    <p className="text-xs text-gray-600">{item.count} terjual</p>
                  </div>
                  <span className="text-sm font-bold text-[#FF5A5F]">{formatCurrency(item.revenue)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <Building2 className="w-5 h-5 text-[#FF5A5F]" />
              <h3 className="text-lg font-bold text-gray-900">Meja Populer</h3>
            </div>
            <div className="space-y-3">
              {DUMMY_TOP_TABLES.map((table, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">Meja {table.tableNumber}</p>
                    <p className="text-xs text-gray-600">{table.orders} pesanan</p>
                  </div>
                  <span className="text-sm font-bold text-[#FF5A5F]">{formatCurrency(table.revenue)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <Users className="w-5 h-5 text-[#FF5A5F]" />
              <h3 className="text-lg font-bold text-gray-900">Staf Terbaik</h3>
            </div>
            <div className="space-y-3">
              {DUMMY_TOP_STAFF.map((member, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{member.name}</p>
                    <p className="text-xs text-gray-600">{member.orders} pesanan</p>
                  </div>
                  <span className="text-sm font-bold text-[#FF5A5F]">{formatCurrency(member.revenue)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto">
      <div className="bg-gray-50 rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        <div className="flex h-[900px]">
          {/* Sidebar */}
          <div className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col flex-shrink-0">
            <div className="mb-8">
              <img src="/logo-black.svg" alt="KadaiPOS" className="h-8 w-auto" />
              <p className="text-xs text-gray-500 mt-2">Dashboard</p>
            </div>

            <nav className="flex-1 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                )
              })}
            </nav>

            <div className="pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500">Versi Demo</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto bg-gray-50 p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}
