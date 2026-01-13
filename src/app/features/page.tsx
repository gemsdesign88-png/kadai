"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { useLanguage } from "@/lib/i18n/context"
import { RealUIFeatures } from "@/components/sections/real-ui-features"
import { FinalCTA } from "@/components/sections/final-cta"
import Link from "next/link"
import {
  ShoppingCart,
  Menu,
  BarChart3,
  Users,
  Grid3x3,
  CreditCard,
  Package,
  ChefHat,
  QrCode,
  Palette,
  Building2,
  UserCog,
  Check,
  Clock,
  TrendingUp,
  Sparkles,
  HeartPulse,
  Zap,
} from "lucide-react"

const ownerFeatures = [
  {
    icon: HeartPulse,
    color: "#10B981",
    slug: "business-health",
    titleEn: "Business Health Monitor",
    titleId: "Monitor Kesehatan Bisnis",
    descEn: "Real-time monitoring of sales, HPP (COGS), OPEX, net profit, and inventory health with AI insights and actionable recommendations.",
    descId: "Monitoring real-time untuk penjualan, HPP, OPEX, laba bersih, dan kesehatan inventory dengan insights AI dan rekomendasi aksi.",
    status: "available",
    featured: true,
  },
  {
    icon: Sparkles,
    color: "#8B5CF6",
    slug: "ai-smart-paste",
    titleEn: "AI Magic Paste",
    titleId: "AI Magic Paste",
    descEn: "Bulk add ingredients or products instantly. Copy from WhatsApp, Notes, Text, or Excel, paste, and AI automatically organizes everything with smart categorization.",
    descId: "Tambah bahan atau produk secara bulk dengan instant. Copy dari WhatsApp, Notes, Text, atau Excel, paste, dan AI otomatis atur semuanya dengan kategorisasi pintar.",
    status: "available",
    featured: true,
  },
  {
    icon: BarChart3,
    color: "#00D4AA",
    slug: "analytics",
    titleEn: "Advanced Analytics",
    titleId: "Analytics Lanjutan",
    descEn: "Comprehensive business insights with revenue trends, top items, table performance, and detailed reports.",
    descId: "Insights bisnis komprehensif dengan trend revenue, top items, performa meja, dan laporan detail.",
    status: "available",
  },
  {
    icon: TrendingUp,
    color: "#3B82F6",
    slug: "dashboard",
    titleEn: "Real-Time Dashboard",
    titleId: "Dashboard Real-Time",
    descEn: "Live business metrics with revenue tracking, order statistics, and performance indicators.",
    descId: "Metrik bisnis live dengan tracking revenue, statistik pesanan, dan indikator performa.",
    status: "available",
  },
  {
    icon: CreditCard,
    color: "#10B981",
    slug: "cash-flow",
    titleEn: "Cash Flow Management",
    titleId: "Manajemen Cash Flow",
    descEn: "Track income and expenses with detailed cash flow reports and financial insights.",
    descId: "Track pemasukan dan pengeluaran dengan laporan cash flow detail dan insights finansial.",
    status: "available",
  },
  {
    icon: Users,
    color: "#FFB020",
    slug: "customers",
    titleEn: "Customer Insights",
    titleId: "Insights Pelanggan",
    descEn: "Analyze customer behavior, track loyalty, and understand purchasing patterns.",
    descId: "Analisa perilaku pelanggan, track loyalitas, dan pahami pola pembelian.",
    status: "available",
  },
  {
    icon: Users,
    color: "#8B5CF6",
    slug: "staff",
    titleEn: "Staff Performance",
    titleId: "Performa Staff",
    descEn: "Monitor staff productivity, sales performance, and team efficiency metrics.",
    descId: "Monitor produktivitas staff, performa penjualan, dan metrik efisiensi tim.",
    status: "available",
  },
  {
    icon: Package,
    color: "#F59E0B",
    slug: "inventory",
    titleEn: "Inventory Analytics",
    titleId: "Analytics Inventory",
    descEn: "Track stock levels, usage patterns, and optimize inventory costs.",
    descId: "Track level stok, pola penggunaan, dan optimalkan biaya inventory.",
    status: "available",
  },
  {
    icon: Grid3x3,
    color: "#EC4899",
    slug: "tables",
    titleEn: "Table Analytics",
    titleId: "Analytics Meja",
    descEn: "Analyze table turnover rates, revenue per table, and seating optimization.",
    descId: "Analisa tingkat turnover meja, revenue per meja, dan optimasi tempat duduk.",
    status: "available",
  },
]

const employeeFeatures = [
  {
    icon: ShoppingCart,
    color: "#FF5A5F",
    slug: "orders",
    titleEn: "Real-Time Order Management",
    titleId: "Kelola Pesanan Real-Time",
    descEn: "Monitor all orders in one dashboard. Track status from pending to completed with instant notifications.",
    descId: "Pantau semua pesanan dalam satu dashboard. Track status dari pending hingga completed dengan notifikasi instant.",
    status: "available",
  },
  {
    icon: Menu,
    color: "#0066FF",
    slug: "menu",
    titleEn: "Flexible Menu Management",
    titleId: "Manajemen Menu Fleksibel",
    descEn: "Manage menu with ease. Add, edit, or delete items instantly with automatic categorization.",
    descId: "Atur menu dengan mudah. Tambah, edit, atau hapus item dalam sekejap dengan kategorisasi otomatis.",
    status: "available",
  },
  {
    icon: Users,
    color: "#FFB020",
    slug: "staff",
    titleEn: "Efficient Team Management",
    titleId: "Manajemen Tim Efisien",
    descEn: "Manage team with role-based access control and track performance for each employee.",
    descId: "Kelola tim dengan role-based access control dan track performa setiap karyawan.",
    status: "available",
  },
  {
    icon: Grid3x3,
    color: "#8B5CF6",
    slug: "tables",
    titleEn: "Smart Table System",
    titleId: "Sistem Meja Pintar",
    descEn: "Monitor table status in real-time. Optimize layout to maximize capacity.",
    descId: "Monitor status meja real-time. Optimasi layout untuk maksimalkan kapasitas.",
    status: "available",
  },
  {
    icon: CreditCard,
    color: "#EC4899",
    slug: "payment",
    titleEn: "Multi-Method Payment",
    titleId: "Pembayaran Multi-Metode",
    descEn: "Accept payments with various methods: cash, QRIS, debit, transfer with automatic split bill.",
    descId: "Terima pembayaran dengan berbagai metode: cash, QRIS, debit, transfer dengan split bill otomatis.",
    status: "available",
  },
  {
    icon: Package,
    color: "#10B981",
    slug: "inventory",
    titleEn: "Smart Inventory Control",
    titleId: "Kontrol Stok Cerdas",
    descEn: "Monitor ingredient stock in real-time with automatic low-stock notifications.",
    descId: "Monitor stok bahan baku real-time dengan notifikasi otomatis saat stok menipis.",
    status: "available",
  },
  {
    icon: ChefHat,
    color: "#F59E0B",
    slug: "kitchen",
    titleEn: "Kitchen Display System",
    titleId: "Kitchen Display System",
    descEn: "Dedicated kitchen dashboard with automatic priority for urgent orders.",
    descId: "Dashboard khusus dapur dengan prioritas otomatis untuk urgent orders.",
    status: "available",
  },
  {
    icon: QrCode,
    color: "#06B6D4",
    slug: "qr-menu",
    titleEn: "Digital QR Menu",
    titleId: "QR Menu Digital",
    descEn: "Customers scan QR at table to view menu and order directly without physical contact.",
    descId: "Pelanggan scan QR di meja untuk lihat menu dan order langsung tanpa kontak fisik.",
    status: "available",
  },
  {
    icon: Palette,
    color: "#9C27B0",
    slug: "theme",
    titleEn: "Custom Interface Theme",
    titleId: "Tema Interface Custom",
    descEn: "Choose from 12 preset theme colors to match your brand identity.",
    descId: "Pilih dari 12 warna tema preset untuk sesuaikan dengan identitas brand Anda.",
    status: "available",
  },
]

export default function FeaturesPage() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = React.useState<"employee" | "owner">("owner")

  const t = {
    en: {
      hero: {
        title: "Powerful Features for",
        subtitle: "Modern Restaurant Management",
        description: "All the tools you need to run your restaurant efficiently, built with simplicity and power in mind.",
      },
      tabs: {
        employee: "For Employees",
        owner: "For Owners",
        employeeDesc: "Features ready to use today",
        ownerDesc: "Full business insights available",
      },
      status: {
        available: "Available Now",
        comingSoon: "Coming Soon",
      },
      cta: {
        tryFree: "Start Free Trial",
        viewDemo: "View Demo",
      },
    },
    id: {
      hero: {
        title: "Fitur Powerful untuk",
        subtitle: "Manajemen Restoran Modern",
        description: "Semua tools yang Anda butuhkan untuk jalankan restoran dengan efisien, dibangun dengan kesederhanaan dan kekuatan.",
      },
      tabs: {
        employee: "Untuk Karyawan",
        owner: "Untuk Pemilik",
        employeeDesc: "Fitur siap digunakan hari ini",
        ownerDesc: "Insights bisnis lengkap tersedia",
      },
      status: {
        available: "Tersedia Sekarang",
        comingSoon: "Segera Hadir",
      },
      cta: {
        tryFree: "Mulai Gratis",
        viewDemo: "Lihat Demo",
      },
    },
    zh: {
      hero: {
        title: "强大功能为",
        subtitle: "现代餐厅管理",
        description: "您需要的所有工具，高效运营餐厅，简单而强大。",
      },
      tabs: {
        employee: "员工功能",
        owner: "业主功能",
        employeeDesc: "今天可用的功能",
        ownerDesc: "完整商业洞察可用",
      },
      status: {
        available: "现已推出",
        comingSoon: "即将推出",
      },
      cta: {
        tryFree: "免费试用",
        viewDemo: "查看演示",
      },
    },
  }

  const content = t[language]
  const currentFeatures = activeTab === "employee" ? employeeFeatures : ownerFeatures

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white pt-32 pb-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              {content.hero.title}
              <span className="mt-2 block bg-gradient-to-r from-[#FF5A5F] to-[#0066FF] bg-clip-text text-transparent">
                {content.hero.subtitle}
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {content.hero.description}
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-12 max-w-xl"
          >
            <div className="relative flex rounded-2xl bg-white p-2 shadow-lg ring-1 ring-gray-200">
              <motion.div
                className="absolute inset-y-2 left-2 right-2 rounded-xl bg-gradient-to-r from-[#FF5A5F] to-[#0066FF]"
                initial={false}
                animate={{
                  x: activeTab === "owner" ? 0 : "calc(100% - 4px)",
                  width: "calc(50% + 2px)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              
              {[
                { id: "owner" as const, icon: Building2, label: content.tabs.owner, desc: content.tabs.ownerDesc },
                { id: "employee" as const, icon: UserCog, label: content.tabs.employee, desc: content.tabs.employeeDesc },
              ].map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="relative z-10 flex flex-1 flex-col items-center justify-center rounded-xl px-6 py-4 text-sm font-semibold transition-colors"
                  >
                    <Icon className={`h-6 w-6 mb-2 transition-colors ${isActive ? "text-white" : "text-gray-600"}`} />
                    <span className={`transition-colors ${isActive ? "text-white" : "text-gray-900"}`}>
                      {tab.label}
                    </span>
                    <span className={`mt-1 text-xs transition-colors ${isActive ? "text-white/80" : "text-gray-500"}`}>
                      {tab.desc}
                    </span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Features Grid */}
      <section className="relative bg-white py-20">
        <Container>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {currentFeatures.map((feature, index) => {
              const Icon = feature.icon
              const isAvailable = feature.status === "available"
              const isFeatured = (feature as { featured?: boolean }).featured === true
              
              return (
                <motion.div
                  key={feature.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`group relative ${isFeatured ? 'md:col-span-2 lg:col-span-1' : ''}`}
                >
                  <Link
                    href={`/features/${feature.slug}`}
                    className={`block h-full rounded-2xl border p-8 transition-all ${
                      isFeatured
                        ? "border-purple-200/60 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 shadow-xl hover:shadow-2xl ring-2 ring-purple-500/20"
                        : isAvailable
                        ? "border-gray-200 bg-white shadow-lg hover:shadow-2xl"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    {/* Status Badge */}
                    <div className="mb-4 flex items-center justify-between">
                      <div
                        className={`rounded-xl p-3 transition-transform group-hover:scale-110 ${
                          isFeatured ? 'shadow-lg' : ''
                        }`}
                        style={{
                          background: isFeatured ? `linear-gradient(135deg, ${feature.color}25, ${feature.color}15)` : `${feature.color}15`,
                        }}
                      >
                        <Icon className={`h-6 w-6 ${isFeatured ? 'animate-pulse' : ''}`} style={{ color: feature.color }} />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {isFeatured && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] px-3 py-1 text-xs font-bold text-white shadow-lg">
                            <Zap className="h-3 w-3" />
                            {content.status.available === 'Tersedia Sekarang' ? 'Unggulan' : 'Featured'}
                          </span>
                        )}
                        {isAvailable ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                            <Check className="h-3 w-3" />
                            {content.status.available}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                            <Clock className="h-3 w-3" />
                            {content.status.comingSoon}
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className={`mt-4 font-bold ${
                      isFeatured ? "text-2xl bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent" : "text-xl"
                    } ${
                      isAvailable && !isFeatured ? "text-gray-900" : !isFeatured ? "text-gray-700" : ""
                    }`}>
                      {language === "id" ? feature.titleId : feature.titleEn}
                    </h3>
                    <p className={`mt-3 text-sm leading-relaxed ${isAvailable ? "text-gray-600" : "text-gray-500"}`}>
                      {language === "id" ? feature.descId : feature.descEn}
                    </p>

                    {/* Hover Effect Gradient */}
                    <div
                      className="absolute inset-x-0 -bottom-px h-px transition-opacity group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)`,
                        opacity: isAvailable ? 0.5 : 0.2,
                      }}
                    />
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </Container>
      </section>

      {/* Real UI Features Showcase */}
      <RealUIFeatures />

      {/* Final CTA */}
      <FinalCTA />
    </div>
  )
}
