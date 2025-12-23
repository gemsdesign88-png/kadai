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

const EN_INSIGHTS = [
  { id: 'growth', icon: TrendingUp, title: 'Explosive Growth', message: '+34% revenue growth this week - steady uptrend!', color: 'green' },
  { id: 'top-item', icon: UtensilsCrossed, title: 'Hero Menu', message: 'Special Fried Rice generated Rp 5.8M this week (287 orders)', color: 'blue' },
  { id: 'top-table', icon: Building2, title: 'Premium Table', message: 'Table 8 generated Rp 8.9M - highest ROI area', color: 'purple' },
  { id: 'top-staff', icon: Users, title: 'Star Staff', message: 'Rina booked Rp 14.8M sales - 4.9 ⭐ rating', color: 'indigo' },
  { id: 'peak-time', icon: Clock, title: 'Peak Time', message: 'Fri-Sun 18:00-21:00 = 68% of weekly revenue', color: 'orange' },
  { id: 'customer-loyalty', icon: Star, title: 'High Loyalty', message: '68% customers return - loyalty program works!', color: 'pink' }
]

const ZH_INSIGHTS = [
  { id: 'growth', icon: TrendingUp, title: '高速增长', message: '本周收入 +34% ，趋势稳步上升', color: 'green' },
  { id: 'top-item', icon: UtensilsCrossed, title: '明星菜单', message: '招牌炒饭本周创造 Rp 5.8M（287 份）', color: 'blue' },
  { id: 'top-table', icon: Building2, title: '高价值餐桌', message: '餐桌 8 贡献 Rp 8.9M —— ROI 最高区域', color: 'purple' },
  { id: 'top-staff', icon: Users, title: '明星员工', message: 'Rina 完成 Rp 14.8M 销售，评分 4.9 ⭐', color: 'indigo' },
  { id: 'peak-time', icon: Clock, title: '高峰时段', message: '周五-周日 18:00-21:00 占每周收入 68%', color: 'orange' },
  { id: 'customer-loyalty', icon: Star, title: '高忠诚度', message: '68% 顾客回访 —— 会员计划有效', color: 'pink' }
]

const DUMMY_ALERTS = [
  { id: 'peak-prep', type: 'info', message: 'Persiapan weekend rush - Prediksi 130+ pesanan/hari', action: 'Lihat Jadwal' },
  { id: 'vip-reservation', type: 'info', message: '5 reservasi VIP untuk malam ini - Meja 8, 12, 15', action: 'Lihat Detail' },
  { id: 'stock-trending', type: 'warning', message: 'Ayam Premium stok tinggal 15 kg - Best seller alert', action: 'Order Sekarang' }
]

const EN_ALERTS = [
  { id: 'peak-prep', type: 'info', message: 'Prep for weekend rush - Expect 130+ orders/day', action: 'View Schedule' },
  { id: 'vip-reservation', type: 'info', message: '5 VIP reservations tonight - Tables 8, 12, 15', action: 'View Details' },
  { id: 'stock-trending', type: 'warning', message: 'Premium chicken stock only 15kg - Bestseller alert', action: 'Order Now' }
]

const ZH_ALERTS = [
  { id: 'peak-prep', type: 'info', message: '周末高峰准备——预计每日 130+ 订单', action: '查看排班' },
  { id: 'vip-reservation', type: 'info', message: '今晚 5 个 VIP 预订——餐桌 8、12、15', action: '查看详情' },
  { id: 'stock-trending', type: 'warning', message: '精品鸡肉仅剩 15kg —— 爆款预警', action: '立即补货' }
]

const DUMMY_TODOS = [
  { id: 'restock-premium', text: 'Order Ayam Premium 50kg (trending +45%)', priority: 'high' },
  { id: 'staff-schedule', text: 'Jadwal 3 staff extra untuk weekend', priority: 'high' },
  { id: 'promo-plan', text: 'Setup promo weekday (Mon-Thu) untuk boost traffic', priority: 'medium' }
]

const EN_TODOS = [
  { id: 'restock-premium', text: 'Order 50kg premium chicken (trending +45%)', priority: 'high' },
  { id: 'staff-schedule', text: 'Schedule 3 extra staff for the weekend', priority: 'high' },
  { id: 'promo-plan', text: 'Set up weekday promo (Mon-Thu) to boost traffic', priority: 'medium' }
]

const ZH_TODOS = [
  { id: 'restock-premium', text: '补货精品鸡肉 50kg（热度 +45%）', priority: 'high' },
  { id: 'staff-schedule', text: '周末增加 3 名排班', priority: 'high' },
  { id: 'promo-plan', text: '设置工作日促销（周一-周四）提升流量', priority: 'medium' }
]

export function InteractiveDashboard() {
  const { language, t } = useLanguage()
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

  const insightsData = React.useMemo(() => {
    if (language === 'en') return EN_INSIGHTS
    if (language === 'zh') return ZH_INSIGHTS
    return DUMMY_INSIGHTS
  }, [language])

  const alertsData = React.useMemo(() => {
    if (language === 'en') return EN_ALERTS
    if (language === 'zh') return ZH_ALERTS
    return DUMMY_ALERTS
  }, [language])

  const todosData = React.useMemo(() => {
    if (language === 'en') return EN_TODOS
    if (language === 'zh') return ZH_TODOS
    return DUMMY_TODOS
  }, [language])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

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

  const labels = {
    period: t.dashboard.period,
    periodTabs: [
      { id: 'daily' as const, label: t.dashboard.daily },
      { id: 'weekly' as const, label: t.dashboard.weekly },
      { id: 'monthly' as const, label: t.dashboard.monthly }
    ],
    cash: t.dashboard.cash,
    qris: t.dashboard.qris,
    bankTransfer: t.dashboard.bankTransfer,
    transactions: t.dashboard.transactions,
    sold: t.dashboard.sold,
    table: t.dashboard.table,
    customers: t.dashboard.customers,
    orders: t.dashboard.orders,
    topTenRevenue: t.dashboard.topTenRevenue,
    paretoAnalysis: t.dashboard.paretoAnalysis,
    categoryMix: t.dashboard.categoryMix,
    revenueBreakdown: t.dashboard.revenueBreakdown,
    topSellingItems: t.dashboard.topSellingItems,
    tablePerformance: t.dashboard.tablePerformance,
    promoPerformance: t.dashboard.promoPerformance,
    promoPerformanceDesc: t.dashboard.promoPerformanceDesc,
    cogsMarginTitle: t.dashboard.cogsMarginTitle,
    cogsMarginDesc: t.dashboard.cogsMarginDesc,
    vsYesterday: t.dashboard.vsYesterday,
    completedOrders: t.dashboard.completedOrders,
    perTransaction: t.dashboard.perTransaction,
    tapToExplore: t.dashboard.tapToExplore,
    dashboardPreview: t.dashboard.dashboardPreview || t.nav.dashboard,
    demoVersion: t.dashboard.demoVersion,
    starItems: t.dashboard.starItems,
    menuTotalRevenue: t.dashboard.menuTotalRevenue,
    avgMargin: t.dashboard.avgMargin,
    activeMenuItems: t.dashboard.activeMenuItems,
    popularTables: t.dashboard.popularTables,
    topStaff: t.dashboard.topStaff,
    revenueTrend: t.dashboard.revenueTrend,
    ordersVsAov: t.dashboard.ordersVsAov,
    customerInsights: t.dashboard.customerInsights,
    businessInsights: t.dashboard.businessInsights,
    notifications: t.dashboard.notifications,
    todos: t.dashboard.todos,
    active: t.dashboard.active,
    inProgress: t.dashboard.inProgress,
    loyalCustomers: t.dashboard.loyalCustomersTitle,
    loyaltyRate: t.dashboard.loyaltyRateLabel,
    totalCustomers: t.nav.customers,
    totalRevenue: t.dashboard.totalRevenue,
    avgOrderValue: t.dashboard.avgOrderValue,
    newCustomers: t.dashboard.newCustomersTitle,
    loyalCustomersTitle: t.dashboard.loyalCustomersTitle,
    manageInventory: t.dashboard.inventoryTitle || t.nav.inventory,
    inventorySubtitle: t.dashboard.inventorySubtitle,
    totalStockValue: t.dashboard.totalStockValueLabel,
    totalItems: t.dashboard.totalItemsLabel,
    items: t.dashboard.items,
    outOfStock: t.dashboard.outOfStockLabel,
    lowStock: t.dashboard.lowStockLabel,
    stockDistribution: t.dashboard.stockStatusDistribution,
    optimalStatus: t.dashboard.optimalStatus,
    overstockStatus: t.dashboard.overstockStatus,
    ingredient: t.dashboard.ingredient,
    category: t.dashboard.category,
    reorderPoint: t.dashboard.reorderPoint,
    staffPerformance: t.dashboard.staffPerformanceTitle,
    manageStaff: t.dashboard.staffTitle,
    tableInsights: t.dashboard.tableInsightsTitle,
    totalTables: t.dashboard.totalTablesLabel,
    popularTableTitle: t.dashboard.topTable,
    avgPerTable: t.dashboard.avgPerTable,
  }

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
            <p className="text-[10px] font-semibold text-gray-500 mb-1">{labels.period}</p>
            <div className="flex gap-1">
              {labels.periodTabs.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setRevenueTrendPeriod(p.id)}
                  className={`px-2 py-1 rounded-md text-[10px] font-medium transition-all ${
                    revenueTrendPeriod === p.id
                      ? 'bg-[var(--color-accent)] text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)] rounded-xl p-4 mb-4 text-white shadow-lg">
            <p className="text-[10px] opacity-90 mb-1">{t.dashboard.today}</p>
            <h2 className="text-2xl font-bold mb-2">{formatCurrency(dummyAnalyticsStats.revenue)}</h2>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-lg font-bold">{dummyAnalyticsStats.orders}</p>
                <p className="text-[10px] opacity-90">{labels.orders}</p>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div>
                <p className="text-lg font-bold">{formatCurrency(dummyAnalyticsStats.avgOrder)}</p>
                <p className="text-[10px] opacity-90">{t.dashboard.average}</p>
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
                    <p className="text-xs text-gray-500">{labels.transactions}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 space-y-3 w-full">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-gray-900">💵 {labels.cash}</p>
                      <p className="text-xs text-gray-600">{((dummyAnalyticsStats.cashRevenue / (dummyAnalyticsStats.cashRevenue + dummyAnalyticsStats.qrisRevenue + dummyAnalyticsStats.transferRevenue)) * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(dummyAnalyticsStats.cashRevenue)}</p>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-gray-900">📱 {labels.qris}</p>
                      <p className="text-xs text-gray-600">{((dummyAnalyticsStats.qrisRevenue / (dummyAnalyticsStats.cashRevenue + dummyAnalyticsStats.qrisRevenue + dummyAnalyticsStats.transferRevenue)) * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(dummyAnalyticsStats.qrisRevenue)}</p>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-gray-900">🏦 {labels.bankTransfer}</p>
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
                      <p className="text-sm text-gray-600">
                        {item.count} {labels.sold}
                      </p>
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
                        <p className="font-semibold text-gray-900">{labels.table} {table.tableNumber}</p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{Math.floor(table.orders * 1.2)} {labels.customers}</span>
                        <span>•</span>
                        <span>{table.orders} {labels.orders}</span>
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
                <p className="text-lg font-bold text-gray-900">{t.dashboard.table} {dummyAnalyticsStats.topTable}</p>
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
                  <h3 className="text-lg font-bold text-gray-900">{labels.cogsMarginTitle}</h3>
                  <p className="text-xs text-gray-600">{labels.cogsMarginDesc}</p>
                </div>
              </div>
              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%" minWidth={300} minHeight={200}>
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
                    <Bar dataKey="cogs" stackId="a" fill="#ef4444" name={t.dashboard.cogs} />
                    <Bar dataKey="margin" stackId="a" fill="#10b981" name={t.dashboard.grossMargin} radius={[8, 8, 0, 0]} />
                    <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} name={t.dashboard.revenue} dot={{ fill: '#3b82f6', r: 4 }} />
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
                  <h3 className="text-lg font-bold text-gray-900">{labels.promoPerformance}</h3>
                  <p className="text-xs text-gray-600">{labels.promoPerformanceDesc}</p>
                </div>
              </div>
              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%" minWidth={300} minHeight={200}>
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
            {[t.dashboard.today, t.dashboard.sevenDays, t.dashboard.thirtyDays].map((range, idx) => (
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
              <p className="text-xs text-gray-500 mt-2">{labels.vsYesterday}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{t.dashboard.totalOrders}</h3>
              <p className="text-2xl font-bold text-gray-900">{DUMMY_STATS.dailyOrders}</p>
              <p className="text-xs text-gray-500 mt-2">{labels.completedOrders}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{t.dashboard.avgOrder}</h3>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(DUMMY_STATS.avgOrderValue)}</p>
              <p className="text-xs text-gray-500 mt-2">{labels.perTransaction}</p>
            </div>
          </div>

          {/* Orders Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Revenue Trend Chart */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-xs font-semibold text-gray-500 mb-4">{t.dashboard.salesCharts}</h3>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%" minWidth={300} minHeight={200}>
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
                <ResponsiveContainer width="100%" height="100%" minWidth={300} minHeight={200}>
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
                    <Bar dataKey="orders" fill="#10b981" name={t.dashboard.orders} radius={[8, 8, 0, 0]} />
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
                      <p className="text-xs text-gray-600">
                        {item.count} {labels.sold}
                      </p>
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
                  <h3 className="font-bold text-gray-900">{t.dashboard.stars}</h3>
                  <p className="text-xs text-gray-600">{t.dashboard.highProfitPopular}</p>
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
                  <h3 className="font-bold text-gray-900">{t.dashboard.workhorses}</h3>
                  <p className="text-xs text-gray-600">{t.dashboard.popularLowerProfit}</p>
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
                  <h3 className="font-bold text-gray-900">{t.dashboard.puzzles}</h3>
                  <p className="text-xs text-gray-600">{t.dashboard.highProfitLowSales}</p>
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
                  <h3 className="font-bold text-gray-900">{t.dashboard.dogs}</h3>
                  <p className="text-xs text-gray-600">{t.dashboard.lowProfitUnpopular}</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">4</p>
              <p className="text-xs text-gray-600 mt-2">item</p>
            </div>
          </div>

          {/* Charts Grid - Top 10 Revenue + Category Mix */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Top 10 Revenue per Product */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-900">{labels.topTenRevenue}</h3>
                  <p className="text-[10px] text-gray-600">{labels.paretoAnalysis}</p>
                </div>
              </div>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%" minWidth={300} minHeight={200}>
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

            {/* Category Mix */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <PieChartIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-900">{labels.categoryMix}</h3>
                  <p className="text-[10px] text-gray-600">{labels.revenueBreakdown}</p>
                </div>
              </div>
              <div className="w-full h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%" minWidth={300} minHeight={200}>
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
              <h3 className="text-xs font-semibold text-gray-500">{labels.starItems} ⭐</h3>
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
                        <span>{item.count} {labels.sold}</span>
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
              <h4 className="text-xs font-semibold text-gray-500 mb-2">{labels.menuTotalRevenue}</h4>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(DUMMY_TOP_ITEMS.reduce((sum, item) => sum + item.revenue, 0))}</p>
              <p className="text-xs text-green-600 mt-1">↑ 34% dari bulan lalu</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h4 className="text-xs font-semibold text-gray-500 mb-2">{labels.avgMargin}</h4>
              <p className="text-2xl font-bold text-gray-900">73%</p>
              <p className="text-xs text-gray-600 mt-1">Margin keuntungan</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h4 className="text-xs font-semibold text-gray-500 mb-2">{labels.activeMenuItems}</h4>
              <p className="text-2xl font-bold text-gray-900">42</p>
              <p className="text-xs text-gray-600 mt-1">item dalam menu</p>
            </div>
          </div>

          {/* Charts Grid - Top 10 Revenue + Category Mix */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Top 10 Revenue per Product */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-900">{labels.topTenRevenue}</h3>
                  <p className="text-[10px] text-gray-600">{labels.paretoAnalysis}</p>
                </div>
              </div>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%" minWidth={300} minHeight={200}>
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

            {/* Category Mix */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <PieChartIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-900">{labels.categoryMix}</h3>
                  <p className="text-[10px] text-gray-600">{labels.revenueBreakdown}</p>
                </div>
              </div>
              <div className="w-full h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%" minWidth={300} minHeight={200}>
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
        </div>
      )
    }

    // CUSTOMERS TAB - Real UI (NON-INTERACTIVE)
    if (activeTab === 'customers') {
      const dummyCustomerMetrics = {
        totalCustomers: 478,
        activeCustomers: 186,
        loyalCustomers: 124,
        loyaltyRate: 68,
        totalRevenue: 45800000,
        avgOrderValue: 145000
      }

      const dummyTopCustomers = [
        { name: 'Budi Santoso', totalOrders: 24, totalSpent: 5800000, avgOrderValue: 241667, favoriteItem: 'Nasi Goreng Spesial' },
        { name: 'Ani Wijaya', totalOrders: 22, totalSpent: 4900000, avgOrderValue: 222727, favoriteItem: 'Ayam Bakar Premium' },
        { name: 'Dewi Lestari', totalOrders: 19, totalSpent: 4200000, avgOrderValue: 221052, favoriteItem: 'Mie Goreng Seafood' }
      ]

      return (
        <div className="space-y-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.nav.customers}</h1>
            <p className="text-sm text-gray-600">{labels.customerInsights}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <Users className="w-5 h-5 text-blue-600 mb-3" />
              <p className="text-xs text-gray-600 mb-1">{labels.totalCustomers}</p>
              <h3 className="text-lg font-bold text-gray-900">{dummyCustomerMetrics.totalCustomers}</h3>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <TrendingUp className="w-5 h-5 text-green-600 mb-3" />
              <p className="text-xs text-gray-600 mb-1">{labels.active}</p>
              <h3 className="text-lg font-bold text-gray-900">{dummyCustomerMetrics.activeCustomers}</h3>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <Star className="w-5 h-5 text-purple-600 mb-3" />
              <p className="text-xs text-gray-600 mb-1">{labels.loyalCustomersTitle}</p>
              <h3 className="text-lg font-bold text-gray-900">{dummyCustomerMetrics.loyalCustomers}</h3>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <ShoppingCart className="w-5 h-5 text-orange-600 mb-3" />
              <p className="text-xs text-gray-600 mb-1">{labels.loyaltyRate}</p>
              <h3 className="text-lg font-bold text-gray-900">{dummyCustomerMetrics.loyaltyRate}%</h3>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <DollarSign className="w-5 h-5 text-green-600 mb-3" />
              <p className="text-xs text-gray-600 mb-1">{labels.totalRevenue}</p>
              <h3 className="text-sm font-bold text-gray-900">{formatCurrency(dummyCustomerMetrics.totalRevenue)}</h3>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <Calendar className="w-5 h-5 text-pink-600 mb-3" />
              <p className="text-xs text-gray-600 mb-1">{labels.avgOrderValue}</p>
              <h3 className="text-sm font-bold text-gray-900">{formatCurrency(dummyCustomerMetrics.avgOrderValue)}</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Pelanggan Baru */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <Users className="w-5 h-5 text-[var(--color-accent)]" />
                <h3 className="text-lg font-bold text-gray-900">{labels.newCustomers}</h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Siti Aminah', lastOrder: '2 hari lalu', totalOrders: 1, totalSpent: 285000, favoriteItem: 'Nasi Goreng Spesial' },
                  { name: 'Joko Widodo', lastOrder: '3 hari lalu', totalOrders: 2, totalSpent: 420000, favoriteItem: 'Ayam Bakar' },
                  { name: 'Rina Kusuma', lastOrder: '5 hari lalu', totalOrders: 1, totalSpent: 195000, favoriteItem: 'Mie Goreng' }
                ].map((customer, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-0 rounded-lg border border-green-100">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{customer.name}</p>
                      <p className="text-xs text-gray-600">{customer.lastOrder} • {customer.totalOrders} {labels.orders}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-green-600">{formatCurrency(customer.totalSpent)}</p>
                      <p className="text-xs text-gray-500">{customer.favoriteItem}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pelanggan Setia */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[var(--color-accent)]" />
                  <h3 className="text-lg font-bold text-gray-900">{labels.loyalCustomersTitle}</h3>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Ahmad Yani', totalOrders: 38, totalSpent: 8900000, avgOrderValue: 234211 },
                  { name: 'Sri Mulyani', totalOrders: 32, totalSpent: 7200000, avgOrderValue: 225000 },
                  { name: 'Bambang Susilo', totalOrders: 28, totalSpent: 6100000, avgOrderValue: 217857 }
                ].map((customer, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-0 rounded-lg border border-purple-100">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{customer.name}</p>
                      <p className="text-xs text-gray-600">{customer.totalOrders} {labels.orders} • {formatCurrency(customer.avgOrderValue)}/{labels.orders}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-purple-600">⭐</p>
                      <p className="text-xs text-gray-500">{formatCurrency(customer.totalSpent)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <DollarSign className="w-5 h-5 text-[var(--color-accent)]" />
              <h3 className="text-lg font-bold text-gray-900">Pembeli Terbanyak</h3>
            </div>
            <div className="space-y-3">
              {dummyTopCustomers.map((customer, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-0 rounded-lg border border-blue-100">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold bg-[var(--color-accent)] text-white w-7 h-7 rounded-full flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900">{customer.name}</p>
                        <p className="text-xs text-gray-600">{customer.totalOrders} {labels.orders} • {formatCurrency(customer.avgOrderValue)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[var(--color-accent)]">{formatCurrency(customer.totalSpent)}</p>
                    <p className="text-xs text-gray-500">{customer.favoriteItem}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }

    // INVENTORY TAB - Real UI (NON-INTERACTIVE)
    if (activeTab === 'inventory') {
      const dummyStockStats = {
        totalValue: 28500000,
        totalItems: 42,
        outOfStock: 3,
        lowStock: 8
      }

      return (
        <div className="space-y-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{labels.manageInventory}</h1>
            <p className="text-sm text-gray-600">{labels.inventorySubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{formatCurrency(dummyStockStats.totalValue)}</h3>
                  <p className="text-xs text-gray-600">{labels.totalStockValue}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{dummyStockStats.totalItems}</h3>
                  <p className="text-xs text-gray-600">{labels.totalItems}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border-l-4 border-red-500 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{dummyStockStats.outOfStock}</h3>
                  <p className="text-xs text-gray-600">{labels.outOfStock}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border-l-4 border-yellow-500 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{dummyStockStats.lowStock}</h3>
                  <p className="text-xs text-gray-600">{labels.lowStock}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stock Status Distribution Chart */}
          <div className="bg-white rounded-xl p-5 mb-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <PieChartIcon className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">{labels.stockDistribution}</h3>
                <p className="text-[10px] text-gray-600">{labels.manageInventory}</p>
              </div>
            </div>
            
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%" minWidth={300} minHeight={200}>
                <PieChart>
                  <Pie
                    data={[
                      { name: labels.optimalStatus || 'Optimal', value: 28, color: '#10b981' },
                      { name: labels.lowStock || 'Low', value: 8, color: '#f59e0b' },
                      { name: labels.outOfStock || 'Out', value: 3, color: '#ef4444' },
                      { name: labels.overstockStatus || 'Overstock', value: 3, color: '#3b82f6' }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {[
                      { color: '#10b981' },
                      { color: '#f59e0b' },
                      { color: '#ef4444' },
                      { color: '#3b82f6' }
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '11px' }}
                    formatter={(value: any) => [`${value} ${labels.items || 'item'}`, labels.totalItems]}
                  />
                  <Legend verticalAlign="bottom" height={24} iconSize={8} wrapperStyle={{ fontSize: '10px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-3 grid grid-cols-4 gap-2">
                {[
                  { name: labels.optimalStatus || 'Optimal', value: 28, color: '#10b981' },
                  { name: labels.lowStock || 'Low', value: 8, color: '#f59e0b' },
                  { name: labels.outOfStock || 'Out', value: 3, color: '#ef4444' },
                  { name: labels.overstockStatus || 'Overstock', value: 3, color: '#3b82f6' }
                ].map((dist, idx) => (
                <div key={idx} className="p-2 rounded-lg border" style={{ borderColor: dist.color, backgroundColor: `${dist.color}15` }}>
                  <p className="text-[9px] font-medium" style={{ color: dist.color }}>{dist.name}</p>
                  <p className="text-lg font-bold" style={{ color: dist.color }}>{dist.value}</p>
                  <p className="text-[9px]" style={{ color: dist.color }}>item</p>
                </div>
              ))}
            </div>
          </div>

          {/* Inventory Table */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-3 py-2 text-left text-[10px] font-semibold text-gray-900">{labels.ingredient}</th>
                    <th className="px-3 py-2 text-left text-[10px] font-semibold text-gray-900">{labels.category}</th>
                    <th className="px-3 py-2 text-center text-[10px] font-semibold text-gray-900">{t.nav.inventory}</th>
                    <th className="px-3 py-2 text-center text-[10px] font-semibold text-gray-900">{labels.reorderPoint}</th>
                    <th className="px-3 py-2 text-center text-[10px] font-semibold text-gray-900">{t.dashboard.status || 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { name: 'Ayam Premium', category: 'Protein', stock: 15, unit: 'kg', reorder: 20, status: 'Rendah', statusColor: 'bg-yellow-100 text-yellow-700' },
                    { name: 'Beras Premium', category: 'Karbohidrat', stock: 25, unit: 'kg', reorder: 50, status: 'Rendah', statusColor: 'bg-yellow-100 text-yellow-700' },
                    { name: 'Minyak Goreng', category: 'Minyak', stock: 8, unit: 'L', reorder: 15, status: 'Sangat Rendah', statusColor: 'bg-red-100 text-red-700' },
                    { name: 'Cabai Merah', category: 'Sayuran', stock: 45, unit: 'kg', reorder: 10, status: 'Optimal', statusColor: 'bg-green-100 text-green-700' },
                    { name: 'Bawang Putih', category: 'Bumbu', stock: 32, unit: 'kg', reorder: 8, status: 'Optimal', statusColor: 'bg-green-100 text-green-700' },
                    { name: 'Gula Pasir', category: 'Pemanis', stock: 0, unit: 'kg', reorder: 20, status: 'Habis', statusColor: 'bg-red-100 text-red-700' }
                  ].map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                            <Package className="w-3 h-3 text-gray-400" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-[10px]">{item.name}</p>
                            <p className="text-[9px] text-gray-600">{item.unit}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <span className="inline-block px-1.5 py-0.5 bg-gray-100 text-gray-700 text-[9px] rounded-full">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-center">
                        <span className="text-sm font-bold text-gray-900">{item.stock}</span>
                        <span className="text-[9px] text-gray-500 ml-0.5">{item.unit}</span>
                      </td>
                      <td className="px-3 py-2 text-center">
                        <span className="text-[9px] text-gray-600">{item.reorder} {item.unit}</span>
                      </td>
                      <td className="px-3 py-2 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-semibold ${item.statusColor}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    }

    // STAFF TAB - Real UI (NON-INTERACTIVE)
    if (activeTab === 'staff') {
      const dummyStaffPerformance = [
        { name: 'Rina', revenue: 14800000, orders: 245 },
        { name: 'Budi', revenue: 13500000, orders: 228 },
        { name: 'Sari', revenue: 11900000, orders: 198 }
      ]

      return (
        <div className="space-y-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{labels.manageStaff}</h1>
            <p className="text-sm text-gray-600">{t.dashboard.managingStaffAccounts}</p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{labels.staffPerformance}</h3>
                  <p className="text-[10px] text-gray-600">{t.dashboard.revenueAndOrder}</p>
                </div>
              </div>
            </div>
            
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%" minWidth={300} minHeight={200}>
                <BarChart data={dummyStaffPerformance} layout="vertical" margin={{ left: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" stroke="#6b7280" style={{ fontSize: '10px' }} />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    stroke="#6b7280" 
                    style={{ fontSize: '10px' }}
                    width={35}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '11px' }}
                    formatter={(value: any, name: any) => {
                      if (name === 'revenue') return [formatCurrency(Number(value || 0)), t.dashboard.revenue]
                      if (name === 'orders') return [value, t.dashboard.orders]
                      return [value, name || '']
                    }}
                  />
                  <Legend iconSize={8} wrapperStyle={{ fontSize: '10px' }} />
                  <Bar dataKey="revenue" fill="#3b82f6" name={t.dashboard.revenue} radius={[0, 4, 4, 0]} />
                  <Bar dataKey="orders" fill="#10b981" name={t.dashboard.orders} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="p-2 rounded-lg bg-blue-50">
                <p className="text-[9px] text-blue-600 font-medium">{t.dashboard.totalRevenue}</p>
                <p className="text-sm font-bold text-blue-900">
                  {formatCurrency(dummyStaffPerformance.reduce((sum, s) => sum + s.revenue, 0))}
                </p>
              </div>
              <div className="p-2 rounded-lg bg-green-50">
                <p className="text-[9px] text-green-600 font-medium">{t.dashboard.totalOrders}</p>
                <p className="text-sm font-bold text-green-900">
                  {dummyStaffPerformance.reduce((sum, s) => sum + s.orders, 0)}
                </p>
              </div>
              <div className="p-2 rounded-lg bg-purple-50">
                <p className="text-[9px] text-purple-600 font-medium">{t.dashboard.avgOrderValue}</p>
                <p className="text-sm font-bold text-purple-900">
                  {formatCurrency(Math.round(
                    dummyStaffPerformance.reduce((sum, s) => sum + s.revenue, 0) / 
                    dummyStaffPerformance.reduce((sum, s) => sum + s.orders, 0)
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // TABLES TAB - Real UI (NON-INTERACTIVE)
    if (activeTab === 'tables') {
      const dummyTableStats = {
        totalTables: 15,
        availableTables: 8,
        occupiedTables: 7,
        totalCapacity: 60,
        occupancyRate: 47
      }

      const dummyTablePerformance = [
        { table: 'Meja 8', revenue: 8900000, orders: 72 },
        { table: 'Meja 5', revenue: 8200000, orders: 65 },
        { table: 'Meja 12', revenue: 7400000, orders: 58 }
      ]

      return (
        <div className="space-y-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{labels.tableInsights}</h1>
            <p className="text-sm text-gray-600">{t.dashboard.tablePerformance}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{dummyTableStats.totalTables}</h3>
              <p className="text-sm text-gray-600">{labels.totalTables}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-3xl font-bold text-green-600 mb-1">{dummyTableStats.availableTables}</h3>
              <p className="text-sm text-gray-600">{t.dashboard.available || 'Available'}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-3xl font-bold text-red-600 mb-1">{dummyTableStats.occupiedTables}</h3>
              <p className="text-sm text-gray-600">{t.dashboard.occupied || 'Occupied'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{t.dashboard.occupancyRate || 'Occupancy Rate'}</h3>
                  <p className="text-sm text-gray-600">{t.dashboard.tablePerformance}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-4xl font-bold text-blue-600">{dummyTableStats.occupancyRate}%</span>
                <span className="text-sm text-gray-600 mb-2">
                  ({dummyTableStats.occupiedTables}/{dummyTableStats.totalTables} {t.dashboard.tables})
                </span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${dummyTableStats.occupancyRate}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{t.dashboard.totalCapacity || 'Total Capacity'}</h3>
                  <p className="text-sm text-gray-600">{t.dashboard.customers}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-xl">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl font-bold text-purple-600">{dummyTableStats.totalCapacity}</span>
                <span className="text-sm text-gray-600 mb-2">{t.dashboard.customers}</span>
              </div>
              <p className="text-sm text-gray-600">
                {labels.avgPerTable}: {(dummyTableStats.totalCapacity / dummyTableStats.totalTables).toFixed(1)}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 mb-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">{t.dashboard.tablePerformance}</h3>
                <p className="text-[10px] text-gray-600">{t.dashboard.topTable}</p>
              </div>
            </div>
            
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%" minWidth={300} minHeight={200}>
                <ComposedChart 
                  data={[
                    { table: 'Meja 8', revenue: 8900000, orders: 72 },
                    { table: 'Meja 5', revenue: 8200000, orders: 65 },
                    { table: 'Meja 12', revenue: 7400000, orders: 58 },
                    { table: 'Meja 3', revenue: 7100000, orders: 55 },
                    { table: 'Meja 15', revenue: 6800000, orders: 52 },
                    { table: 'Meja 7', revenue: 6500000, orders: 49 },
                    { table: 'Meja 10', revenue: 6200000, orders: 46 },
                    { table: 'Meja 1', revenue: 5900000, orders: 43 },
                    { table: 'Meja 14', revenue: 5600000, orders: 40 },
                    { table: 'Meja 9', revenue: 5300000, orders: 38 }
                  ]} 
                  margin={{ top: 10, right: 10, left: 10, bottom: 40 }}
                >
                  <defs>
                    <linearGradient id="colorTableRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.3}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="table" 
                    stroke="#6b7280" 
                    style={{ fontSize: '9px' }}
                    angle={-45}
                    textAnchor="end"
                    height={40}
                  />
                  <YAxis 
                    yAxisId="left"
                    stroke="#10b981" 
                    style={{ fontSize: '9px' }}
                    tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    stroke="#3b82f6" 
                    style={{ fontSize: '9px' }}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '10px' }}
                    formatter={(value: any, name: any) => {
                      if (name === 'revenue') return [formatCurrency(Number(value || 0)), t.dashboard.revenue]
                      if (name === 'orders') return [value, t.dashboard.orders]
                      return [value, name || '']
                    }}
                  />
                  <Legend iconSize={8} wrapperStyle={{ fontSize: '9px' }} />
                  <Bar 
                    yAxisId="left"
                    dataKey="revenue" 
                    fill="url(#colorTableRevenue)" 
                    name={t.dashboard.revenue} 
                    radius={[4, 4, 0, 0]}
                    maxBarSize={30}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone"
                    dataKey="orders" 
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name={t.dashboard.orders}
                    dot={{ fill: '#3b82f6', r: 3 }}
                    activeDot={{ r: 4 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="p-2 rounded-lg bg-green-50">
                  <p className="text-[9px] text-green-600 font-medium">{t.dashboard.totalRevenue}</p>
                  <p className="text-sm font-bold text-green-900">
                    {formatCurrency(dummyTablePerformance.reduce((sum, t) => sum + t.revenue, 0))}
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-blue-50">
                  <p className="text-[9px] text-blue-600 font-medium">{t.dashboard.totalOrders}</p>
                  <p className="text-sm font-bold text-blue-900">
                    {dummyTablePerformance.reduce((sum, t) => sum + t.orders, 0)}
                  </p>
                </div>
              <div className="p-2 rounded-lg bg-purple-50">
                <p className="text-[9px] text-purple-600 font-medium">{labels.avgPerTable}</p>
                <p className="text-sm font-bold text-purple-900">
                  {formatCurrency(Math.round(dummyTablePerformance.reduce((sum, t) => sum + t.revenue, 0) / dummyTablePerformance.length))}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <Building2 className="w-5 h-5 text-[var(--color-accent)]" />
              <h3 className="text-lg font-bold text-gray-900">{labels.popularTables}</h3>
            </div>
            <div className="space-y-3">
              {dummyTablePerformance.map((table, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-100">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900">{table.table}</p>
                      <p className="text-xs text-gray-600">{table.orders} {labels.orders}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-emerald-600">{formatCurrency(table.revenue)}</p>
                    <p className="text-xs text-gray-500">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }

    // MAIN DASHBOARD - INTERACTIVE (only this tab has working buttons)
    const getRevenueTrendData = () => {
      switch (revenueTrendPeriod) {
        case 'daily': return DUMMY_REVENUE_TREND_DAILY
        case 'weekly': return DUMMY_REVENUE_TREND_WEEKLY
        case 'monthly': return DUMMY_REVENUE_TREND_MONTHLY
        default: return DUMMY_REVENUE_TREND_WEEKLY
      }
    }

    const getOrdersAOVData = () => {
      switch (revenueTrendPeriod) {
        case 'daily': return DUMMY_ORDERS_AOV_DAILY
        case 'weekly': return DUMMY_ORDERS_AOV_WEEKLY
        case 'monthly': return DUMMY_ORDERS_AOV_MONTHLY
        default: return DUMMY_ORDERS_AOV_WEEKLY
      }
    }

    const getRevenueOrders = () => {
      switch (revenueTrendPeriod) {
        case 'daily': return { revenue: DUMMY_STATS.dailyRevenue, orders: DUMMY_STATS.dailyOrders }
        case 'weekly': return { revenue: DUMMY_STATS.weekRevenue, orders: DUMMY_STATS.weekOrders }
        case 'monthly': return { revenue: DUMMY_STATS.monthRevenue, orders: DUMMY_STATS.monthOrders }
        default: return { revenue: DUMMY_STATS.weekRevenue, orders: DUMMY_STATS.weekOrders }
      }
    }

    const periodLabelMap = {
      daily: t.dashboard.today,
      weekly: t.dashboard.sevenDaysAnalytics,
      monthly: t.dashboard.thirtyDaysAnalytics,
    }

    const getPeriodLabel = () => periodLabelMap[revenueTrendPeriod] || periodLabelMap.weekly

    const getChartLabel = () => {
      if (revenueTrendPeriod === 'daily') return `${t.dashboard.daily} (${t.dashboard.today})`
      if (revenueTrendPeriod === 'monthly') return `${t.dashboard.monthly}`
      return periodLabelMap.weekly
    }

    const getOrdersChartLabel = () => {
      if (revenueTrendPeriod === 'daily') return `${t.dashboard.daily} (${t.dashboard.today})`
      if (revenueTrendPeriod === 'monthly') return `${t.dashboard.monthly}`
      return periodLabelMap.weekly
    }

    const chartData = getRevenueTrendData()
    const ordersChartData = getOrdersAOVData()
    const currentStats = getRevenueOrders()
    const chartDataKey = 'date'
    const ordersDataKey = revenueTrendPeriod === 'daily' ? 'time' : revenueTrendPeriod === 'weekly' ? 'day' : 'week'

    return (
      <div key={activeTab} className="space-y-4">
        {/* Interactive Period Toggle - ONLY ON MAIN DASHBOARD */}
        <div className="flex gap-1">
          {labels.periodTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setRevenueTrendPeriod(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                revenueTrendPeriod === tab.id
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* KPI Cards - EXACT REPLICA */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
            <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-2">
              <div className="w-6 h-6 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-white" />
              </div>
              <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-bold">+{DUMMY_STATS.growthPercent}%</span>
            </div>
            <p className="text-[10px] text-gray-600 mb-0.5">{getPeriodLabel()}</p>
            <h3 className="text-sm font-bold text-gray-900 leading-tight">{formatCurrency(currentStats.revenue)}</h3>
            </div>

            <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                <ShoppingCart className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-[10px] text-gray-600 mb-0.5">{t.dashboard.totalOrders}</p>
              <h3 className="text-sm font-bold text-gray-900 leading-tight">{currentStats.orders}</h3>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-xs text-gray-600 mb-1">{t.dashboard.avgOrder}</p>
              <h3 className="text-lg font-bold text-gray-900 leading-tight">{formatCurrency(DUMMY_STATS.avgOrderValue)}</h3>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-xs text-gray-600 mb-1">{t.nav.customers}</p>
              <h3 className="text-lg font-bold text-gray-900 leading-tight">{DUMMY_STATS.totalCustomers}</h3>
            </div>

            <div className="bg-yellow-50 border-yellow-100 rounded-xl p-4 border shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold">{labels.active}</span>
              </div>
              <p className="text-xs text-gray-600 mb-1">{labels.inProgress}</p>
              <h3 className="text-lg font-bold text-gray-900 leading-tight">{DUMMY_STATS.activeOrders}</h3>
            </div>
          </div>

        {/* Charts Grid - Changes based on period */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center mb-3">
              <BarChart3 className="w-4 h-4 text-[var(--color-accent)] mr-2" />
              <h3 className="text-xs font-bold text-gray-900">{labels.revenueTrend}</h3>
            </div>
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%" minWidth={300} minHeight={200}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey={chartDataKey} stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                  <Tooltip formatter={(value: any) => formatCurrency(Number(value))} contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center mb-3">
              <ShoppingCart className="w-4 h-4 text-[var(--color-accent)] mr-2" />
              <h3 className="text-xs font-bold text-gray-900">{labels.ordersVsAov}</h3>
            </div>
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%" minWidth={300} minHeight={200}>
                <ComposedChart data={ordersChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey={ordersDataKey} stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <YAxis yAxisId="left" stroke="#6b7280" style={{ fontSize: '12px' }} label={{ value: t.dashboard.orders, angle: -90, position: 'insideLeft' }} />
                  <YAxis yAxisId="right" orientation="right" stroke="#6b7280" style={{ fontSize: '12px' }} tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} label={{ value: t.dashboard.avgOrderValue, angle: 90, position: 'insideRight' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} formatter={(value: any, name: any) => {
                    if (typeof value === 'number' && value > 10000) return formatCurrency(value)
                    return value
                  }} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="orders" fill="#3b82f6" name={t.dashboard.orders} radius={[8, 8, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="avgOrderValue" stroke="#10b981" strokeWidth={3} name={t.dashboard.avgOrderValue} dot={{ fill: '#10b981', r: 4 }} activeDot={{ r: 6 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Business Insights - EXACT REPLICA */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-[var(--color-accent)]" />
            <h3 className="text-sm font-bold text-gray-900">{labels.businessInsights}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {insightsData.map((insight) => {
              const IconComponent = insight.icon
              const colorClasses: Record<string, string> = {
                green: 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200',
                blue: 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200',
                purple: 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200',
                orange: 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200',
                pink: 'bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200',
                indigo: 'bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200'
              }
              
              return (
                <div key={insight.id} className={`rounded-lg p-3 border transition-all hover:shadow-md ${colorClasses[insight.color]} shadow-sm`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-sm ${
                      insight.color === 'green' ? 'bg-gradient-to-br from-green-100 to-emerald-100' :
                      insight.color === 'blue' ? 'bg-gradient-to-br from-blue-100 to-cyan-100' :
                      insight.color === 'purple' ? 'bg-gradient-to-br from-purple-100 to-pink-100' :
                      insight.color === 'orange' ? 'bg-gradient-to-br from-orange-100 to-amber-100' :
                      insight.color === 'pink' ? 'bg-gradient-to-br from-pink-100 to-rose-100' :
                      'bg-gradient-to-br from-indigo-100 to-blue-100'
                    }`}>
                      <IconComponent className={`w-4 h-4 ${
                        insight.color === 'green' ? 'text-green-600' :
                        insight.color === 'blue' ? 'text-blue-600' :
                        insight.color === 'purple' ? 'text-purple-600' :
                        insight.color === 'orange' ? 'text-orange-600' :
                        insight.color === 'pink' ? 'text-pink-600' :
                        'text-indigo-600'
                      }`} />
                    </div>
                    <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      insight.color === 'green' ? 'bg-green-100 text-green-700' :
                      insight.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                      insight.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                      insight.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                      insight.color === 'pink' ? 'bg-pink-100 text-pink-700' :
                      'bg-indigo-100 text-indigo-700'
                    }`}>
                      ⚡
                    </div>
                  </div>
                  <h4 className={`font-bold text-gray-900 mb-2 text-sm ${
                    insight.color === 'green' ? 'text-green-900' :
                    insight.color === 'blue' ? 'text-blue-900' :
                    insight.color === 'purple' ? 'text-purple-900' :
                    insight.color === 'orange' ? 'text-orange-900' :
                    insight.color === 'pink' ? 'text-pink-900' :
                    'text-indigo-900'
                  }`}>{insight.title}</h4>
                  <p className={`text-sm leading-relaxed ${
                    insight.color === 'green' ? 'text-green-700' :
                    insight.color === 'blue' ? 'text-blue-700' :
                    insight.color === 'purple' ? 'text-purple-700' :
                    insight.color === 'orange' ? 'text-orange-700' :
                    insight.color === 'pink' ? 'text-pink-700' :
                    'text-indigo-700'
                  }`}>{insight.message}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Alerts & Todos Row - EXACT REPLICA */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="w-5 h-5 text-[var(--color-accent)]" />
                <h3 className="text-lg font-bold text-gray-900">{labels.notifications}</h3>
              </div>
              <div className="space-y-3">
              {alertsData.map((alert) => (
                  <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${alert.type === 'error' ? 'bg-red-50 border-red-500' : alert.type === 'warning' ? 'bg-yellow-50 border-yellow-500' : 'bg-blue-50 border-blue-500'}`}>
                    <p className="font-medium text-gray-900 text-sm">{alert.message}</p>
                </div>
              ))}
            </div>
          </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-[var(--color-accent)]" />
                <h3 className="text-lg font-bold text-gray-900">{labels.todos}</h3>
              </div>
            <div className="space-y-2">
              {todosData.map((todo) => (
                <div key={todo.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${todo.priority === 'high' ? 'bg-red-500' : todo.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
                    <span className="text-gray-900 font-medium text-sm">{todo.text}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performers - EXACT REPLICA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <UtensilsCrossed className="w-5 h-5 text-[var(--color-accent)]" />
              <h3 className="text-lg font-bold text-gray-900">{labels.topSellingItems}</h3>
            </div>
            <div className="space-y-3">
              {DUMMY_TOP_ITEMS.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                    <p className="text-xs text-gray-600">{item.count} {labels.sold}</p>
                  </div>
                  <span className="text-sm font-bold text-[var(--color-accent)]">{formatCurrency(item.revenue)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <Building2 className="w-5 h-5 text-[var(--color-accent)]" />
              <h3 className="text-lg font-bold text-gray-900">{labels.popularTables}</h3>
            </div>
              <div className="space-y-3">
                {DUMMY_TOP_TABLES.map((table, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">{labels.table} {table.tableNumber}</p>
                      <p className="text-xs text-gray-600">{table.orders} {labels.orders}</p>
                    </div>
                    <span className="text-sm font-bold text-[var(--color-accent)]">{formatCurrency(table.revenue)}</span>
                  </div>
                ))}
              </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <Users className="w-5 h-5 text-[var(--color-accent)]" />
              <h3 className="text-lg font-bold text-gray-900">{labels.topStaff}</h3>
            </div>
            <div className="space-y-3">
                {DUMMY_TOP_STAFF.map((member, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">{member.name}</p>
                      <p className="text-xs text-gray-600">{member.orders} {labels.orders}</p>
                    </div>
                    <span className="text-sm font-bold text-[var(--color-accent)]">{formatCurrency(member.revenue)}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
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
                      <p className="text-xs text-gray-500 mt-1">{labels.dashboardPreview}</p>
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
                <span className="text-sm font-semibold text-white">{labels.tapToExplore}</span>
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
                    <p className="text-[10px] text-gray-500 mt-1">{t.nav.dashboard}</p>
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
                    <p className="text-[10px] text-gray-500">{labels.demoVersion}</p>
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
                        <span className="text-sm text-gray-700 font-medium">{t.nav.dashboard}</span>
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
    </div>
  )
}
