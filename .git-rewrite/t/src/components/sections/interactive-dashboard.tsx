"use client"

import * as React from "react"
import { useLanguage } from "@/lib/i18n/context"
import { 
  BarChart3, ShoppingCart, Users, Package, TrendingUp, Clock, DollarSign, 
  Building2, UtensilsCrossed, Zap, Bell, CheckCircle, ChevronRight, Star, AlertTriangle,
  Download, Calendar, ArrowUp, ShoppingBag, TrendingDown, ThumbsUp, PieChart as PieChartIcon,
  Gift, XCircle, Percent, Info, Check, Award, X, Maximize2
} from "lucide-react"
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  ComposedChart, Bar, Legend, BarChart, PieChart, Pie, Cell, AreaChart, Area 
} from "recharts"

// Dummy data matching real dashboard exactly
const DUMMY_STATS = {
  dailyRevenue: 12200000,
  dailyOrders: 186,
  weekRevenue: 45800000,
  weekOrders: 623,
  monthRevenue: 185400000,
  monthOrders: 2847,
  avgOrderValue: 145000,
  totalCustomers: 478,
  activeOrders: 18,
  growthPercent: 34.2
}

// Daily data (24 hours)
const DUMMY_REVENUE_TREND_DAILY = [
  { date: "00:00", revenue: 0 },
  { date: "03:00", revenue: 0 },
  { date: "06:00", revenue: 450000 },
  { date: "09:00", revenue: 1200000 },
  { date: "12:00", revenue: 2800000 },
  { date: "15:00", revenue: 1800000 },
  { date: "18:00", revenue: 3200000 },
  { date: "21:00", revenue: 2750000 }
]

// Weekly data (7 days)
const DUMMY_REVENUE_TREND_WEEKLY = [
  { date: "Senin", revenue: 5200000 },
  { date: "Selasa", revenue: 5800000 },
  { date: "Rabu", revenue: 5400000 },
  { date: "Kamis", revenue: 6500000 },
  { date: "Jumat", revenue: 7800000 },
  { date: "Sabtu", revenue: 8900000 },
  { date: "Minggu", revenue: 6200000 }
]

// Monthly data (4 weeks)
const DUMMY_REVENUE_TREND_MONTHLY = [
  { date: "Week 1", revenue: 38200000 },
  { date: "Week 2", revenue: 42500000 },
  { date: "Week 3", revenue: 45800000 },
  { date: "Week 4", revenue: 48900000 },
  { date: "Week 5", revenue: 10000000 }
]

// Daily orders & AOV (24 hours)
const DUMMY_ORDERS_AOV_DAILY = [
  { time: "06:00", orders: 8, avgOrderValue: 135000 },
  { time: "09:00", orders: 18, avgOrderValue: 142000 },
  { time: "12:00", orders: 42, avgOrderValue: 158000 },
  { time: "15:00", orders: 28, avgOrderValue: 138000 },
  { time: "18:00", orders: 52, avgOrderValue: 168000 },
  { time: "21:00", orders: 38, avgOrderValue: 155000 }
]

// Weekly orders & AOV (7 days)
const DUMMY_ORDERS_AOV_WEEKLY = [
  { day: "Senin", orders: 68, avgOrderValue: 125000 },
  { day: "Selasa", orders: 74, avgOrderValue: 118000 },
  { day: "Rabu", orders: 62, avgOrderValue: 138000 },
  { day: "Kamis", orders: 82, avgOrderValue: 132000 },
  { day: "Jumat", orders: 105, avgOrderValue: 158000 },
  { day: "Sabtu", orders: 128, avgOrderValue: 175000 },
  { day: "Minggu", orders: 104, avgOrderValue: 168000 }
]

// Monthly orders & AOV (4 weeks)
const DUMMY_ORDERS_AOV_MONTHLY = [
  { week: "Week 1", orders: 542, avgOrderValue: 138000 },
  { week: "Week 2", orders: 618, avgOrderValue: 145000 },
  { week: "Week 3", orders: 623, avgOrderValue: 152000 },
  { week: "Week 4", orders: 687, avgOrderValue: 158000 },
  { week: "Week 5", orders: 145, avgOrderValue: 148000 }
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
  { id: 'growth', icon: TrendingUp, title: 'Pertumbuhan Eksplosif', message: '+34% pertumbuhan pendapatan minggu ini - Tren naik konsisten!', color: 'green' },
  { id: 'top-item', icon: UtensilsCrossed, title: 'Menu Andalan', message: 'Nasi Goreng Spesial menghasilkan Rp 5.8M minggu ini (287 porsi)', color: 'blue' },
  { id: 'top-table', icon: Building2, title: 'Meja Premium', message: 'Meja 8 menghasilkan Rp 8.9M - Area dengan ROI tertinggi', color: 'purple' },
  { id: 'top-staff', icon: Users, title: 'Staf Bintang', message: 'Rina mencatat Rp 14.8M penjualan - Rating 4.9 ⭐', color: 'indigo' },
  { id: 'peak-time', icon: Clock, title: 'Waktu Puncak', message: 'Jumat-Minggu 18:00-21:00 = 68% total pendapatan mingguan', color: 'orange' },
  { id: 'customer-loyalty', icon: Star, title: 'Loyalitas Tinggi', message: '68% pelanggan kembali - Program loyalty bekerja optimal!', color: 'pink' }
]

const DUMMY_ALERTS = [
  { id: 'peak-prep', type: 'info', message: 'Persiapan weekend rush - Prediksi 130+ pesanan/hari', action: 'Lihat Jadwal' },
  { id: 'vip-reservation', type: 'info', message: '5 reservasi VIP untuk malam ini - Meja 8, 12, 15', action: 'Lihat Detail' },
  { id: 'stock-trending', type: 'warning', message: 'Ayam Premium stok tinggal 15 kg - Best seller alert', action: 'Order Sekarang' }
]

const DUMMY_TODOS = [
  { id: 'restock-premium', text: 'Order Ayam Premium 50kg (trending +45%)', priority: 'high' },
  { id: 'staff-schedule', text: 'Jadwal 3 staff extra untuk weekend', priority: 'high' },
  { id: 'promo-plan', text: 'Setup promo weekday (Mon-Thu) untuk boost traffic', priority: 'medium' }
]

export function InteractiveDashboard() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = React.useState('dashboard')
  const [revenueTrendPeriod, setRevenueTrendPeriod] = React.useState<'daily' | 'weekly' | 'monthly'>('weekly')
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)

  // Mobile detection
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Prevent body scroll when fullscreen modal is open
  React.useEffect(() => {
    if (isFullscreen && isMobile) {
      document.body.style.overflow = 'hidden'
      document.body.setAttribute('data-dashboard-fullscreen', 'true')
    } else {
      document.body.style.overflow = ''
      document.body.removeAttribute('data-dashboard-fullscreen')
    }
    
    return () => {
      document.body.style.overflow = ''
      document.body.removeAttribute('data-dashboard-fullscreen')
    }
  }, [isFullscreen, isMobile])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const { t } = useLanguage();
  const menuItems = [
    { id: 'dashboard', label: t.nav.dashboard, icon: BarChart3 },
    { id: 'analytics', label: t.nav.analyticsShort, icon: TrendingUp },
    { id: 'orders', label: t.nav.orders, icon: ShoppingCart },
    { id: 'menu', label: t.nav.menu, icon: UtensilsCrossed },
    { id: 'customers', label: t.nav.customers, icon: Users },
    { id: 'inventory', label: t.nav.inventory, icon: Package },
    { id: 'staff', label: t.nav.staff, icon: Users },
    { id: 'tables', label: t.nav.tables, icon: Building2 }
  ]

  const renderContent = () => {
    // ANALYTICS TAB - Exact UI from analytics/page.tsx (NON-INTERACTIVE)
    if (activeTab === 'analytics') {
      const dummyAnalyticsStats = {
        revenue: 12200000,
        orders: 186,
        avgOrder: 145000,
        cashRevenue: 3660000,
        qrisRevenue: 5490000,
        transferRevenue: 3050000,
        peakHour: '19:00',
        topTable: 8
      }

      return (
        <div className="space-y-3">
          <div className="mb-3">
            <h1 className="text-lg font-bold text-gray-900 mb-1">{t.nav.analyticsShort}</h1>
            <p className="text-xs text-gray-600">{t.dashboard.monitorOrders}</p>
          </div>

          <div className="mb-3">
            <p className="text-[10px] font-semibold text-gray-500 mb-1">PERIODE</p>
            <div className="flex gap-1">
              {['Harian', 'Mingguan', 'Bulanan', 'Tahunan'].map((p, idx) => (
                <div key={p} className={`px-2 py-1 rounded-md text-[10px] font-medium ${idx === 0 ? 'bg-[var(--color-accent)] text-white shadow-md' : 'bg-white text-gray-700 border border-gray-200'}`}>
                  {p}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)] rounded-xl p-4 mb-4 text-white shadow-lg">
            <p className="text-[10px] opacity-90 mb-1">Dec 2</p>
            <h2 className="text-2xl font-bold mb-2">{formatCurrency(dummyAnalyticsStats.revenue)}</h2>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-lg font-bold">{dummyAnalyticsStats.orders}</p>
                <p className="text-[10px] opacity-90">Pesanan</p>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div>
                <p className="text-lg font-bold">{formatCurrency(dummyAnalyticsStats.avgOrder)}</p>
                <p className="text-[10px] opacity-90">Rata-rata</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 mb-4">{t.dashboard.paymentMethods}</h3>
            <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
              <div className="relative w-48 h-48 flex-shrink-0">
                <svg viewBox="0 0 200 200" className="transform -rotate-90">
                  {(() => {
                    const total = dummyAnalyticsStats.cashRevenue + dummyAnalyticsStats.qrisRevenue + dummyAnalyticsStats.transferRevenue
                    const cashPercent = (dummyAnalyticsStats.cashRevenue / total) * 100
                    const qrisPercent = (dummyAnalyticsStats.qrisRevenue / total) * 100
                    const circumference = 2 * Math.PI * 70
                    const cashLength = (cashPercent / 100) * circumference
                    const qrisLength = (qrisPercent / 100) * circumference
                    
                    return (
                      <>
                        <circle cx="100" cy="100" r="70" fill="none" stroke="#10B981" strokeWidth="40" 
                          strokeDasharray={`${cashLength} ${circumference}`} strokeDashoffset={0} />
                        <circle cx="100" cy="100" r="70" fill="none" stroke="#3B82F6" strokeWidth="40"
                          strokeDasharray={`${qrisLength} ${circumference}`} strokeDashoffset={-cashLength} />
                        <circle cx="100" cy="100" r="70" fill="none" stroke="#8B5CF6" strokeWidth="40"
                          strokeDasharray={`${(100-cashPercent-qrisPercent)/100 * circumference} ${circumference}`} 
                          strokeDashoffset={-(cashLength + qrisLength)} />
                      </>
                    )
                  })()}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{dummyAnalyticsStats.orders}</p>
                    <p className="text-xs text-gray-500">Transaksi</p>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 space-y-3 w-full">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-gray-900">💵 Tunai</p>
                      <p className="text-xs text-gray-600">{((dummyAnalyticsStats.cashRevenue / (dummyAnalyticsStats.cashRevenue + dummyAnalyticsStats.qrisRevenue + dummyAnalyticsStats.transferRevenue)) * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(dummyAnalyticsStats.cashRevenue)}</p>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-gray-900">📱 QRIS</p>
                      <p className="text-xs text-gray-600">{((dummyAnalyticsStats.qrisRevenue / (dummyAnalyticsStats.cashRevenue + dummyAnalyticsStats.qrisRevenue + dummyAnalyticsStats.transferRevenue)) * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(dummyAnalyticsStats.qrisRevenue)}</p>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-gray-900">🏦 Transfer</p>
                      <p className="text-xs text-gray-600">{((dummyAnalyticsStats.transferRevenue / (dummyAnalyticsStats.cashRevenue + dummyAnalyticsStats.qrisRevenue + dummyAnalyticsStats.transferRevenue)) * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(dummyAnalyticsStats.transferRevenue)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 mb-4">{t.dashboard.topSellingItems}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DUMMY_TOP_ITEMS.map((item, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-6 h-6 bg-[var(--color-accent)] text-white rounded-full flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                        <p className="font-semibold text-gray-900 line-clamp-1">{item.name}</p>
                      </div>
                      <p className="text-sm text-gray-600">{item.count} terjual</p>
                    </div>
                    <p className="text-lg font-bold text-[var(--color-accent)] ml-4">{formatCurrency(item.revenue)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 mb-4">{t.dashboard.tablePerformance}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DUMMY_TOP_TABLES.map((table, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-6 h-6 bg-[var(--color-accent)] text-white rounded-full flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                        <p className="font-semibold text-gray-900">Meja {table.tableNumber}</p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{Math.floor(table.orders * 1.2)} pelanggan</span>
                        <span>•</span>
                        <span>{table.orders} pesanan</span>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-[var(--color-accent)] ml-4">{formatCurrency(table.revenue)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 mb-4">{t.dashboard.insights}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="p-4 bg-yellow-50 rounded-xl text-center">
                <Clock className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                <p className="text-lg font-bold text-gray-900">{dummyAnalyticsStats.peakHour}</p>
                  <p className="text-[10px] text-gray-600">{t.dashboard.peakHour}</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl text-center">
                <Building2 className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-lg font-bold text-gray-900">Meja {dummyAnalyticsStats.topTable}</p>
                  <p className="text-[10px] text-gray-600">{t.dashboard.topTable}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl text-center">
                <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-lg font-bold text-gray-900">{formatCurrency(dummyAnalyticsStats.avgOrder)}</p>
                  <p className="text-[10px] text-gray-600">{t.dashboard.avgOrder}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl text-center">
                <Clock className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <p className="text-lg font-bold text-gray-900">65 min</p>
                  <p className="text-[10px] text-gray-600">{t.dashboard.timePerTable}</p>
              </div>
              <div className="p-4 bg-pink-50 rounded-xl text-center">
                <Calendar className="w-6 h-6 text-pink-600 mx-auto mb-2" />
                <p className="text-lg font-bold text-gray-900">Sabtu</p>
                  <p className="text-[10px] text-gray-600">{t.dashboard.busiestDay}</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-xl text-center">
                <TrendingUp className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                <p className="text-lg font-bold text-gray-900">45%</p>
                  <p className="text-[10px] text-gray-600">{t.dashboard.paymentMethods}</p>
              </div>
            </div>
          </div>

          {/* Advanced Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* COGS & Margin Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <Percent className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">COGS & Margin Kotor</h3>
                  <p className="text-xs text-gray-600">Harga pokok vs margin keuntungan</p>
                </div>
              </div>
              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={[
                    { period: 'Week 1', cogs: 3820000, margin: 8918000, revenue: 12738000 },
                    { period: 'Week 2', cogs: 4250000, margin: 9925000, revenue: 14175000 },
                    { period: 'Week 3', cogs: 4580000, margin: 10686000, revenue: 15266000 },
                    { period: 'Week 4', cogs: 4890000, margin: 11410000, revenue: 16300000 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="period" stroke="#6b7280" style={{ fontSize: '11px' }} />
                    <YAxis stroke="#6b7280" style={{ fontSize: '11px' }} tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                    <Tooltip formatter={(value: any) => formatCurrency(Number(value))} contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                    <Legend />
                    <Bar dataKey="cogs" stackId="a" fill="#ef4444" name="HPP" />
                    <Bar dataKey="margin" stackId="a" fill="#10b981" name="Margin Kotor" radius={[8, 8, 0, 0]} />
                    <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} name="Pendapatan" dot={{ fill: '#3b82f6', r: 4 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Promo Performance */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center">
                  <Gift className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Performa Promo</h3>
                  <p className="text-xs text-gray-600">Penggunaan dan efektivitas promo</p>
                </div>
              </div>
              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { promo: 'Diskon 20%', usage: 45, revenue: 6800000 },
                    { promo: 'Beli 2 Gratis 1', usage: 32, revenue: 4900000 },
                    { promo: 'Weekend Special', usage: 58, revenue: 8200000 },
                    { promo: 'Happy Hour', usage: 28, revenue: 3600000 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="promo" stroke="#6b7280" style={{ fontSize: '11px' }} angle={-15} textAnchor="end" height={80} />
                    <YAxis stroke="#6b7280" style={{ fontSize: '11px' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                    <Legend />
                    <Bar dataKey="usage" fill="#ec4899" name="Penggunaan" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // ORDERS TAB - Exact UI from orders/page.tsx (NON-INTERACTIVE)
    if (activeTab === 'orders') {
      return (
        <div className="space-y-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.dashboard.ordersAnalytics}</h1>
            <p className="text-sm text-gray-600">{t.dashboard.monitorOrders}</p>
          </div>

          <div className="mb-4 flex gap-2">
            {['Hari Ini', '7 Hari', '30 Hari'].map((range, idx) => (
              <div key={range} className={`px-4 py-2 rounded-lg font-medium ${idx === 0 ? 'bg-[var(--color-accent)] text-white' : 'bg-white text-gray-700 border-2 border-gray-200'}`}>
                {range}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-green-100 text-green-700">
                  <ArrowUp className="w-4 h-4" />
                  <span className="text-xs font-bold">34.2%</span>
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{t.dashboard.totalRevenue}</h3>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(DUMMY_STATS.dailyRevenue)}</p>
              <p className="text-xs text-gray-500 mt-2">vs kemarin</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{t.dashboard.totalOrders}</h3>
              <p className="text-2xl font-bold text-gray-900">{DUMMY_STATS.dailyOrders}</p>
              <p className="text-xs text-gray-500 mt-2">pesanan selesai</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{t.dashboard.avgOrder}</h3>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(DUMMY_STATS.avgOrderValue)}</p>
              <p className="text-xs text-gray-500 mt-2">per transaksi</p>
            </div>
          </div>

          {/* Orders Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Revenue Trend Chart */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-xs font-semibold text-gray-500 mb-4">{t.dashboard.salesCharts}</h3>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[
                    { hour: '06:00', revenue: 450000 },
                    { hour: '09:00', revenue: 1200000 },
                    { hour: '12:00', revenue: 2800000 },
                    { hour: '15:00', revenue: 1800000 },
                    { hour: '18:00', revenue: 3200000 },
                    { hour: '21:00', revenue: 2750000 }
                  ]}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="hour" stroke="#6b7280" style={{ fontSize: '11px' }} />
                    <YAxis stroke="#6b7280" style={{ fontSize: '11px' }} tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                    <Tooltip formatter={(value: any) => formatCurrency(Number(value))} contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                    <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Orders by Hour Chart */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-xs font-semibold text-gray-500 mb-4">{t.dashboard.orders}</h3>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { hour: '06:00', orders: 8 },
                    { hour: '09:00', orders: 18 },
                    { hour: '12:00', orders: 42 },
                    { hour: '15:00', orders: 28 },
                    { hour: '18:00', orders: 52 },
                    { hour: '21:00', orders: 38 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="hour" stroke="#6b7280" style={{ fontSize: '11px' }} />
                    <YAxis stroke="#6b7280" style={{ fontSize: '11px' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                    <Bar dataKey="orders" fill="#10b981" name="Pesanan" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-100">
            <h3 className="text-xs font-semibold text-gray-500 mb-4">{t.dashboard.peakHour}</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { hour: 12, orders: 45, label: '12:00' },
                { hour: 18, orders: 58, label: '18:00' },
                { hour: 19, orders: 72, label: '19:00' }
              ].map((peak, idx) => (
                <div key={peak.hour} className={`p-4 rounded-xl border-2 ${idx === 2 ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300' : 'bg-gray-50 border-gray-200'}`}>
                  <Clock className={`w-5 h-5 mb-2 ${idx === 2 ? 'text-purple-600' : 'text-gray-600'}`} />
                  <p className="text-xl font-bold text-gray-900">{peak.label}</p>
                  <p className="text-sm text-gray-600 mt-1">{peak.orders} pesanan</p>
                  {idx === 2 && <p className="text-xs text-purple-600 font-semibold mt-1">Paling Ramai</p>}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="text-xs font-semibold text-gray-500 mb-4">{t.dashboard.topSellingItems2}</h3>
            <div className="space-y-2">
              {DUMMY_TOP_ITEMS.slice(0, 5).map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">{idx + 1}</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-600">{item.count} porsi terjual</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-blue-600">{formatCurrency(item.revenue)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }

    // MENU TAB - Exact UI from menu/page.tsx (NON-INTERACTIVE)
    if (activeTab === 'menu') {
      return (
        <div className="space-y-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.dashboard.menuPerformance}</h1>
            <p className="text-sm text-gray-600">{t.dashboard.optimizeMenu}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 border-2 border-yellow-300 shadow-sm text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Bintang</h3>
                  <p className="text-xs text-gray-600">Untung tinggi & populer</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">18</p>
              <p className="text-xs text-gray-600 mt-2">item</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-300 shadow-sm text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Andalan</h3>
                  <p className="text-xs text-gray-600">Populer, untung rendah</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-xs text-gray-600 mt-2">item</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-300 shadow-sm text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Teka-teki</h3>
                  <p className="text-xs text-gray-600">Untung tinggi, kurang laku</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-xs text-gray-600 mt-2">item</p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-6 border-2 border-red-300 shadow-sm text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Perlu Perbaikan</h3>
                  <p className="text-xs text-gray-600">Untung rendah, kurang laku</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">4</p>
              <p className="text-xs text-gray-600 mt-2">item</p>
            </div>
          </div>

          {/* Charts Grid - Top 10 Revenue + Category Mix */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Top 10 Pendapatan per Produk */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-900">Top 10 Pendapatan per Produk</h3>
                  <p className="text-[10px] text-gray-600">Analisis Pareto: fokus pada performa teratas</p>
                </div>
              </div>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={[
                      { name: 'Nasi Goreng Spesial', revenue: 4800000 },
                      { name: 'Ayam Bakar Premium', revenue: 4200000 },
                      { name: 'Mie Goreng Seafood', revenue: 3900000 },
                      { name: 'Es Teh Manis', revenue: 3500000 },
                      { name: 'Sate Ayam 10 Tusuk', revenue: 3200000 },
                      { name: 'Nasi Uduk Komplit', revenue: 2900000 },
                      { name: 'Jus Alpukat', revenue: 2600000 },
                      { name: 'Gado-gado Jakarta', revenue: 2400000 },
                      { name: 'Bakso Spesial', revenue: 2200000 },
                      { name: 'Es Jeruk', revenue: 2000000 }
                    ]} 
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      type="number"
                      stroke="#6b7280"
                      style={{ fontSize: '10px' }}
                      tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                    />
                    <YAxis 
                      type="category"
                      dataKey="name" 
                      stroke="#6b7280"
                      style={{ fontSize: '9px' }}
                      width={100}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '11px' }}
                      formatter={(value: any) => formatCurrency(Number(value))}
                    />
                    <Bar dataKey="revenue" fill="url(#colorProductRevenue)" radius={[0, 8, 8, 0]} />
                    <defs>
                      <linearGradient id="colorProductRevenue" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 text-[10px] text-gray-600">
                <p>💡 Aturan 80/20: 80% pendapatan sering datang dari 20% produk</p>
              </div>
            </div>

            {/* Mix Kategori */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <PieChartIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-900">Mix Kategori</h3>
                  <p className="text-[10px] text-gray-600">Breakdown pendapatan per kategori</p>
                </div>
              </div>
              <div className="w-full h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Makanan', value: 18500000, items: 28 },
                        { name: 'Minuman', value: 8200000, items: 14 },
                        { name: 'Snack', value: 4100000, items: 8 },
                        { name: 'Dessert', value: 3200000, items: 6 }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                      outerRadius={80}
                      innerRadius={40}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {[
                        { color: '#10b981' },
                        { color: '#3b82f6' },
                        { color: '#f59e0b' },
                        { color: '#ef4444' }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '11px' }}
                      formatter={(value: any) => formatCurrency(Number(value))}
                    />
                    <Legend verticalAlign="bottom" height={24} iconSize={8} wrapperStyle={{ fontSize: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {[
                  { name: 'Makanan', value: 18500000, items: 28, color: 'bg-green-100 text-green-700' },
                  { name: 'Minuman', value: 8200000, items: 14, color: 'bg-blue-100 text-blue-700' },
                  { name: 'Snack', value: 4100000, items: 8, color: 'bg-amber-100 text-amber-700' },
                  { name: 'Dessert', value: 3200000, items: 6, color: 'bg-red-100 text-red-700' }
                ].map((category, idx) => (
                  <div key={idx} className={`p-2 rounded-lg ${category.color}`}>
                    <p className="text-[9px] font-medium">{category.name}</p>
                    <p className="text-xs font-bold">{formatCurrency(category.value)}</p>
                    <p className="text-[9px]">{category.items} item</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold text-gray-500">ITEM BINTANG ⭐</h3>
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-semibold">12 items</span>
            </div>
            <div className="space-y-2">
              {DUMMY_TOP_ITEMS.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-600 mt-0.5">
                        <span>{item.count} terjual</span>
                        <span>•</span>
                        <span>Margin: 72%</span>
                        <span>•</span>
                        <span className="text-green-600 font-semibold">Popularitas Tinggi</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-yellow-700">{formatCurrency(item.revenue)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h4 className="text-xs font-semibold text-gray-500 mb-2">TOTAL PENDAPATAN MENU</h4>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(DUMMY_TOP_ITEMS.reduce((sum, item) => sum + item.revenue, 0))}</p>
              <p className="text-xs text-green-600 mt-1">↑ 34% dari bulan lalu</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h4 className="text-xs font-semibold text-gray-500 mb-2">RATA-RATA MARGIN</h4>
              <p className="text-2xl font-bold text-gray-900">73%</p>
              <p className="text-xs text-gray-600 mt-1">Margin keuntungan</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h4 className="text-xs font-semibold text-gray-500 mb-2">TOTAL ITEM AKTIF</h4>
              <p className="text-2xl font-bold text-gray-900">42</p>
              <p className="text-xs text-gray-600 mt-1">item dalam menu</p>
            </div>
          </div>

          {/* Charts Grid - Top 10 Revenue + Category Mix */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Top 10 Pendapatan per Produk */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-900">Top 10 Pendapatan per Produk</h3>
                  <p className="text-[10px] text-gray-600">Analisis Pareto: fokus pada performa teratas</p>
                </div>
              </div>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={[
                      { name: 'Nasi Goreng Spesial', revenue: 4800000 },
                      { name: 'Ayam Bakar Premium', revenue: 4200000 },
                      { name: 'Mie Goreng Seafood', revenue: 3900000 },
                      { name: 'Es Teh Manis', revenue: 3500000 },
                      { name: 'Sate Ayam 10 Tusuk', revenue: 3200000 },
                      { name: 'Nasi Uduk Komplit', revenue: 2900000 },
                      { name: 'Jus Alpukat', revenue: 2600000 },
                      { name: 'Gado-gado Jakarta', revenue: 2400000 },
                      { name: 'Bakso Spesial', revenue: 2200000 },
                      { name: 'Es Jeruk', revenue: 2000000 }
                    ]} 
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      type="number"
                      stroke="#6b7280"
                      style={{ fontSize: '10px' }}
                      tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                    />
                    <YAxis 
                      type="category"
                      dataKey="name" 
                      stroke="#6b7280"
                      style={{ fontSize: '9px' }}
                      width={100}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '11px' }}
                      formatter={(value: any) => formatCurrency(Number(value))}
                    />
                    <Bar dataKey="revenue" fill="url(#colorProductRevenue)" radius={[0, 8, 8, 0]} />
                    <defs>
                      <linearGradient id="colorProductRevenue" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 text-[10px] text-gray-600">
                <p>💡 Aturan 80/20: 80% pendapatan sering datang dari 20% produk</p>
              </div>
            </div>

            {/* Mix Kategori */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <PieChartIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-900">Mix Kategori</h3>
                  <p className="text-[10px] text-gray-600">Breakdown pendapatan per kategori</p>
                </div>
              </div>
              <div className="w-full h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Makanan', value: 18500000, items: 28 },
                        { name: 'Minuman', value: 8200000, items: 14 },
                        { name: 'Snack', value: 4100000, items: 8 },
                        { name: 'Dessert', value: 3200000, items: 6 }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                      outerRadius={80}
                      innerRadius={40}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {[
                        { color: '#10b981' },
                        { color: '#3b82f6' },
                        { color: '#f59e0b' },
                        { color: '#ef4444' }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '11px' }}
                      formatter={(value: any) => formatCurrency(Number(value))}
                    />
                    <Legend verticalAlign="bottom" height={24} iconSize={8} wrapperStyle={{ fontSize: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {[
                  { name: 'Makanan', value: 18500000, items: 28, color: 'bg-green-100 text-green-700' },
                  { name: 'Minuman', value: 8200000, items: 14, color: 'bg-blue-100 text-blue-700' },
                  { name: 'Snack', value: 4100000, items: 8, color: 'bg-amber-100 text-amber-700' },
                  { name: 'Dessert', value: 3200000, items: 6, color: 'bg-red-100 text-red-700' }
                ].map((category, idx) => (
                  <div key={idx} className={`p-2 rounded-lg ${category.color}`}>
                    <p className="text-[9px] font-medium">{category.name}</p>
                    <p className="text-xs font-bold">{formatCurrency(category.value)}</p>
                    <p className="text-[9px]">{category.items} item</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold text-gray-500 mb-2">ITEM BINTANG ⭐</h3>
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-semibold">12 items</span>
            </div>
            <div className="space-y-2">
              {DUMMY_TOP_ITEMS.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-600 mt-0.5">
                        <span>{item.count} terjual</span>
                        <span>•</span>
                        <span>Margin: 72%</span>
                        <span>•</span>
                        <span className="text-green-600 font-semibold">Popularitas Tinggi</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-yellow-700">{formatCurrency(item.revenue)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h4 className="text-xs font-semibold text-gray-500 mb-2">TOTAL PENDAPATAN MENU</h4>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(DUMMY_TOP_ITEMS.reduce((sum, item) => sum + item.revenue, 0))}</p>
              <p className="text-xs text-green-600 mt-1">↑ 34% dari bulan lalu</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h4 className="text-xs font-semibold text-gray-500 mb-2">RATA-RATA MARGIN</h4>
              <p className="text-2xl font-bold text-gray-900">73%</p>
              <p className="text-xs text-gray-600 mt-1">Margin keuntungan</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h4 className="text-xs font-semibold text-gray-500 mb-2">TOTAL ITEM AKTIF</h4>
              <p className="text-2xl font-bold text-gray-900">42</p>
              <p className="text-xs text-gray-600 mt-1">item dalam menu</p>
            </div>
          </div>

          {/* Charts Grid - Top 10 Revenue + Category Mix */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Top 10 Pendapatan per Produk */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-900">Top 10 Pendapatan per Produk</h3>
                  <p className="text-[10px] text-gray-600">Analisis Pareto: fokus pada performa teratas</p>
                </div>
              </div>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={[
                      { name: 'Nasi Goreng Spesial', revenue: 4800000 },
                      { name: 'Ayam Bakar Premium', revenue: 4200000 },
                      { name: 'Mie Goreng Seafood', revenue: 3900000 },
                      { name: 'Es Teh Manis', revenue: 3500000 },
                      { name: 'Sate Ayam 10 Tusuk', revenue: 3200000 },
                      { name: 'Nasi Uduk Komplit', revenue: 2900000 },
                      { name: 'Jus Alpukat', revenue: 2600000 },
                      { name: 'Gado-gado Jakarta', revenue: 2400000 },
                      { name: 'Bakso Spesial', revenue: 2200000 },
                      { name: 'Es Jeruk', revenue: 2000000 }
                    ]} 
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      type="number"
                      stroke="#6b7280"
                      style={{ fontSize: '10px' }}
                      tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                    />
                    <YAxis 
                      type="category"
                      dataKey="name" 
                      stroke="#6b7280"
                      style={{ fontSize: '9px' }}
                      width={100}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '11px' }}
                      formatter={(value: any) => formatCurrency(Number(value))}
                    />
                    <Bar dataKey="revenue" fill="url(#colorProductRevenue)" radius={[0, 8, 8, 0]} />
                    <defs>
                      <linearGradient id="colorProductRevenue" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 text-[10px] text-gray-600">
                <p>💡 Aturan 80/20: 80% pendapatan sering datang dari 20% produk</p>
              </div>
            </div>

            {/* Mix Kategori */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <PieChartIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-900">Mix Kategori</h3>
                  <p className="text-[10px] text-gray-600">Breakdown pendapatan per kategori</p>
                </div>
              </div>
              <div className="w-full h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Makanan', value: 18500000, items: 28 },
                        { name: 'Minuman', value: 8200000, items: 14 },
                        { name: 'Snack', value: 4100000, items: 8 },
                        { name: 'Dessert', value: 3200000, items: 6 }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                      outerRadius={80}
                      innerRadius={40}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {[
                        { color: '#10b981' },
                        { color: '#3b82f6' },
                        { color: '#f59e0b' },
                        { color: '#ef4444' }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '11px' }}
                      formatter={(value: any) => formatCurrency(Number(value))}
                    />
                    <Legend verticalAlign="bottom" height={24} iconSize={8} wrapperStyle={{ fontSize: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {[
                  { name: 'Makanan', value: 18500000, items: 28, color: 'bg-green-100 text-green-700' },
                  { name: 'Minuman', value: 8200000, items: 14, color: 'bg-blue-100 text-blue-700' },
                  { name: 'Snack', value: 4100000, items: 8, color: 'bg-amber-100 text-amber-700' },
                  { name: 'Dessert', value: 3200000, items: 6, color: 'bg-red-100 text-red-700' }
                ].map((category, idx) => (
                  <div key={idx} className={`p-2 rounded-lg ${category.color}`}>
                    <p className="text-[9px] font-medium">{category.name}</p>
                    <p className="text-xs font-bold">{formatCurrency(category.value)}</p>
                    <p className="text-[9px]">{category.items} item</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold text-gray-500 mb-2">ITEM BINTANG ⭐</h3>
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-semibold">12 items</span>
            </div>
            <div className="space-y-2">
              {DUMMY_TOP_ITEMS.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-600 mt-0.5">
                        <span>{item.count} terjual</span>
                        <span>•</span>
                        <span>Margin: 72%</span>
                        <span>•</span>
                        <span className="text-green-600 font-semibold">Popularitas Tinggi</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-yellow-700">{formatCurrency(item.revenue)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h4 className="text-xs font-semibold text-gray-500 mb-2">TOTAL PENDAPATAN MENU</h4>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(DUMMY_TOP_ITEMS.reduce((sum, item) => sum + item.revenue, 0))}</p>
              <p className="text-xs text-green-600 mt-1">↑ 34% dari bulan lalu</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h4 className="text-xs font-semibold text-gray-500 mb-2">RATA-RATA MARGIN</h4>
              <p className="text-2xl font-bold text-gray-900">73%</p>
              <p className="text-xs text-gray-600 mt-1">Margin keuntungan</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h4 className="text-xs font-semibold text-gray-500 mb-2">TOTAL ITEM AKTIF</h4>
              <p className="text-2xl font-bold text-gray-900">42</p>
              <p className="text-xs text-gray-600 mt-1">item dalam menu</p>
            </div>
          </div>

          {/* Charts Grid - Top 10 Revenue + Category Mix */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Top 10 Pendapatan per Produk */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-900">Top 10 Pendapatan per Produk</h3>
                  <p className="text-[10px] text-gray-600">Analisis Pareto: fokus pada performa teratas</p>
                </div>
              </div>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={[
                      { name: 'Nasi Goreng Spesial', revenue: 4800000 },
                      { name: 'Ayam Bakar Premium', revenue: 4200000 },
                      { name: 'Mie Goreng Seafood', revenue: 3900000 },
                      { name: 'Es Teh Manis', revenue: 3500000 },
                      { name: 'Sate Ayam 10 Tusuk', revenue: 3200000 },
                      { name: 'Nasi Uduk Komplit', revenue: 2900000 },
                      { name: 'Jus Alpukat', revenue: 2600000 },
                      { name: 'Gado-gado Jakarta', revenue: 2400000 },
                      { name: 'Bakso Spesial', revenue: 2200000 },
                      { name: 'Es Jeruk', revenue: 2000000 }
                    ]} 
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      type="number"
                      stroke="#6b7280"
                      style={{ fontSize: '10px' }}
                      tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                    />
                    <YAxis 
                      type="category"
                      dataKey="name" 
                      stroke="#6b7280"
                      style={{ fontSize: '9px' }}
                      width={100}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '11px' }}
                      formatter={(value: any) => formatCurrency(Number(value))}
                    />
                    <Bar dataKey="revenue" fill="url(#colorProductRevenue)" radius={[0, 8, 8, 0]} />
                    <defs>
                      <linearGradient id="colorProductRevenue" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 text-[10px] text-gray-600">
                <p>💡 Aturan 80/20: 80% pendapatan sering datang dari 20% produk</p>
              </div>
            </div>

            {/* Mix Kategori */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <PieChartIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-900">Mix Kategori</h3>
                  <p className="text-[10px] text-gray-600">Breakdown pendapatan per kategori</p>
                </div>
              </div>
              <div className="w-full h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Makanan', value: 18500000, items: 28 },
                        { name: 'Minuman', value: 8200000, items: 14 },
                        { name: 'Snack', value: 4100000, items: 8 },
                        { name: 'Dessert', value: 3200000, items: 6 }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                      outerRadius={80}
                      innerRadius={40}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {[
                        { color: '#10b981' },
                        { color: '#3b82f6' },
                        { color: '#f59e0b' },
                        { color: '#ef4444' }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '11px' }}
                      formatter={(value: any) => formatCurrency(Number(value))}
                    />
                    <Legend verticalAlign="bottom" height={24} iconSize={8} wrapperStyle={{ fontSize: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {[
                  { name: 'Makanan', value: 18500000, items: 28, color: 'bg-green-100 text-green-700' },
                  { name: 'Minuman', value: 8200000, items: 14, color: 'bg-blue-100 text-blue-700' },
                  { name: 'Snack', value: 4100000, items: 8, color: 'bg-amber-100 text-amber-700' },
                  { name: 'Dessert', value: 3200000, items: 6, color: 'bg-red-100 text-red-700' }
                ].map((category, idx) => (
                  <div key={idx} className={`p-2 rounded-lg ${category.color}`}>
                    <p className="text-[9px] font-medium">{category.name}</p>
                    <p className="text-xs font-bold">{formatCurrency(category.value)}</p>
                    <p className="text-[9px]">{category.items} item</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-5">
              <UtensilsCrossed className="w-5 h-5 text-[var(--color-accent)]" />
              <h3 className="text-lg font-bold text-gray-900">Menu Terlaris</h3>
            </div>
            <div className="space-y-3">
              {DUMMY_TOP_ITEMS.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                    <p className="text-xs text-gray-600">{item.count} terjual</p>
                  </div>
                  <span className="text-sm font-bold text-[var(--color-accent)]">{formatCurrency(item.revenue)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-5">
              <Building2 className="w-5 h-5 text-[var(--color-accent)]" />
              <h3 className="text-lg font-bold text-gray-900">Meja Populer</h3>
            </div>
            <div className="space-y-3">
              {DUMMY_TOP_TABLES.map((table, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">Meja {table.tableNumber}</p>
                    <p className="text-xs text-gray-600">{table.orders} pesanan</p>
                  </div>
                  <span className="text-sm font-bold text-[var(--color-accent)]">{formatCurrency(table.revenue)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-5">
              <Users className="w-5 h-5 text-[var(--color-accent)]" />
              <h3 className="text-lg font-bold text-gray-900">Staf Terbaik</h3>
            </div>
            <div className="space-y-3">
              {DUMMY_TOP_STAFF.map((member, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{member.name}</p>
                    <p className="text-xs text-gray-600">{member.orders} pesanan</p>
                  </div>
                  <span className="text-sm font-bold text-[var(--color-accent)]">{formatCurrency(member.revenue)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <>
      {/* Fullscreen Modal for Mobile - Airbnb Style */}
      {isMobile && isFullscreen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-[99998] bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsFullscreen(false)}
          />
          {/* Modal Container */}
          <div className="fixed inset-0 z-[99999] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="w-full max-w-6xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[95vh] sm:max-h-[90vh] animate-slide-up">
              {/* Sticky Header with Logo and Close Button */}
              <div className="sticky top-0 z-50 bg-white rounded-t-3xl sm:rounded-t-3xl border-b border-gray-200">
                {/* Handle bar for mobile */}
                <div className="sm:hidden flex justify-center pt-3 pb-2">
                  <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
                </div>
                
                <div className="flex items-center justify-between px-6 py-4">
                  <div>
                    <img src="/logo-black.svg" alt="KadaiPOS" className="h-6 w-auto" />
                    <p className="text-xs text-gray-500 mt-1">Dashboard Preview</p>
                  </div>
                  
                  {/* Close Button */}
                  <button
                    onClick={() => setIsFullscreen(false)}
                    className="w-10 h-10 hover:bg-gray-100 rounded-full flex items-center justify-center transition-all active:scale-95"
                    aria-label="Close fullscreen"
                  >
                    <X className="w-5 h-5 text-gray-900" />
                  </button>
                </div>

                {/* Sticky Horizontal Scrollable Tabs */}
                <div className="overflow-x-auto pb-3 px-6 hide-scrollbar">
                  <div className="flex gap-2 min-w-max">
                    {menuItems.map((item) => {
                      const Icon = item.icon
                      const isActive = activeTab === item.id
                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveTab(item.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                            isActive
                              ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-sm font-medium">{item.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-auto bg-gray-50">
                <div className="p-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-sm">
                    {renderContent()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* Regular Dashboard Preview */}
      <div 
        className={`w-full mx-auto relative ${isMobile ? 'cursor-pointer mb-16' : 'max-w-[1400px]'}`}
        style={{ transform: isMobile ? 'scale(1)' : 'scale(0.8)', transformOrigin: 'top center' }}
        onClick={() => {
          if (isMobile && !isFullscreen) {
            setIsFullscreen(true)
          }
        }}
      >
        {/* Tap to expand hint on mobile - Single CTA */}
        {isMobile && !isFullscreen && (
          <div className="absolute -top-12 left-0 right-0 flex justify-center z-20">
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-2.5 rounded-full shadow-lg flex items-center gap-2">
              <Maximize2 className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white">Tap to explore dashboard</span>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          <div className={`flex ${isMobile ? 'flex-col h-[600px]' : 'flex-row h-[700px]'}`}>
            {/* Sidebar - Hidden on mobile preview */}
            {!isMobile && (
              <div className="w-52 bg-white border-r border-gray-200 p-4 flex flex-col flex-shrink-0">
                <div className="mb-6">
                  <img src="/logo-black.svg" alt="KadaiPOS" className="h-6 w-auto" />
                  <p className="text-[10px] text-gray-500 mt-1">Dashboard</p>
                </div>

                <nav className="flex-1 space-y-0.5">
                  {menuItems.map((item) => {
                    const Icon = item.icon
                    const isActive = activeTab === item.id
                    return (
                      <button
                        key={item.id}
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveTab(item.id)
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-xs font-medium">{item.label}</span>
                      </button>
                    )
                  })}
                </nav>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-[10px] text-gray-500">Versi Demo</p>
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden min-w-0">
              {/* Mobile: Compact header */}
              {isMobile && (
                <div className="bg-white border-b border-gray-200 p-4 flex-shrink-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <img src="/logo-black.svg" alt="KadaiPOS" className="h-6 w-auto" />
                      <div className="h-4 w-px bg-gray-300"></div>
                      <span className="text-sm text-gray-700 font-medium">Dashboard</span>
                    </div>
                  </div>
                  <div className="overflow-x-auto hide-scrollbar -mx-4 px-4">
                    <div className="flex gap-2 min-w-max">
                      {menuItems.map((item) => {
                        const Icon = item.icon
                        const isActive = activeTab === item.id
                        return (
                          <button
                            key={item.id}
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveTab(item.id)
                            }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                              isActive
                                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-sm font-medium">{item.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Content area - scrollable */}
              <div className="flex-1 overflow-auto p-4 bg-gray-50">
                <div className={`${isMobile ? 'scale-90 origin-top' : ''} pointer-events-none select-none`}>
                  <div className={isMobile ? 'text-xs' : 'text-sm'}>
                    {renderContent()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
