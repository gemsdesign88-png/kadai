"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Container } from "@/components/ui/container"
import { useLanguage } from "@/lib/i18n/context"
import { TablesOverviewMockup } from "@/components/mockups/tables-mockups"
import { OrdersListMockup } from "@/components/mockups/orders-mockups"
import { MenuListMockup } from "@/components/mockups/menu-mockups"
import { AnalyticsDashboardMockup } from "@/components/mockups/analytics-mockups"
import { StaffListMockup } from "@/components/mockups/staff-mockups"
import { PaymentCheckoutMockup } from "@/components/mockups/payment-mockups"
import { InventoryListMockup } from "@/components/mockups/inventory-mockups"
import { KitchenQueueMockup } from "@/components/mockups/kitchen-mockups"
import { QRMenuDisplayMockup } from "@/components/mockups/qr-mockups"
import { PromoListMockup } from "@/components/mockups/promo-mockups"
import { CustomerListMockup } from "@/components/mockups/crm-mockups"
import { GeneralSettingsMockup } from "@/components/mockups/settings-mockups"
import { InteractiveThemeMockup } from "@/components/mockups/theme-mockups"
import Link from "next/link"

// =============================================================================
// INDIVIDUAL MOCKUP COMPONENTS
// =============================================================================

// Use imported mockups
const OrdersMockup = OrdersListMockup
const TablesMockup = TablesOverviewMockup
const MenuMockup = MenuListMockup
const AnalyticsMockup = AnalyticsDashboardMockup
const StaffMockup = StaffListMockup
const PaymentMockup = PaymentCheckoutMockup
const StockMockup = InventoryListMockup
const KitchenMockup = KitchenQueueMockup
const QRMockup = QRMenuDisplayMockup
const PromoMockup = PromoListMockup
const CRMMockup = CustomerListMockup
const SettingsMockup = GeneralSettingsMockup
const ThemeMockup = InteractiveThemeMockup

// =============================================================================
// FEATURE SECTION WITH SCROLL TRACKING
// =============================================================================

interface Feature {
  title: string
  subtitle: string
  description: string
  mockup: React.ComponentType<{ color: string; language: string }>
  color: string
  slug: string
}

function FeatureSection({ feature, index }: { feature: Feature; index: number }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { language } = useLanguage()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])

  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, y }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32 ${
        isEven ? "" : "lg:flex-row-reverse"
      }`}
    >
      <div className={`space-y-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-4">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: feature.color }}></div>
            <span className="text-sm font-bold text-gray-700">{feature.subtitle}</span>
          </div>
          <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">{feature.title}</h3>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">{feature.description}</p>
          
          <motion.a
            href={`/features/${feature.slug}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] hover:from-[#E8484D] hover:to-[#7C3AED] text-white rounded-full font-bold shadow-lg transition-all"
          >
            {language === "en" ? "Learn More" : "Pelajari Lebih Lanjut"}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>
        </div>
      </div>

      <div className={isEven ? "lg:order-2" : "lg:order-1"}>
        <feature.mockup color={feature.color} language={language} />
      </div>
    </motion.div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function RealUIFeatures() {
  const { language } = useLanguage()
  
  const features: Feature[] = [
    {
      title: language === "en" ? "Real-Time Order Management" : "Kelola Pesanan Real-Time",
      subtitle: "Order Management",
      description: language === "en"
        ? "Monitor all orders in one dashboard. Track status from pending to completed with instant notifications to kitchen and cashier."
        : "Pantau semua pesanan dalam satu dashboard. Track status dari pending hingga completed dengan notifikasi instant ke dapur dan kasir.",
      mockup: OrdersMockup,
      color: "#FF5A5F",
      slug: "orders",
    },
    {
      title: language === "en" ? "Flexible Menu Management" : "Manajemen Menu Fleksibel",
      subtitle: "Menu Management",
      description: language === "en"
        ? "Manage menu with ease. Add, edit, or delete items instantly. Automatic categorization and real-time availability control."
        : "Atur menu dengan mudah. Tambah, edit, atau hapus item dalam sekejap. Kategorisasi otomatis dan control availability real-time.",
      mockup: MenuMockup,
      color: "#0066FF",
      slug: "menu",
    },
    {
      title: "Analytics & Insights",
      subtitle: "Business Intelligence",
      description: language === "en"
        ? "Get deep insights about your business performance. View sales trends, popular menu items, and revenue growth in one dashboard."
        : "Dapatkan insights mendalam tentang performa bisnis Anda. Lihat tren penjualan, menu terpopuler, dan revenue growth dalam satu dashboard.",
      mockup: AnalyticsMockup,
      color: "#00D4AA",
      slug: "analytics",
    },
    {
      title: language === "en" ? "Efficient Team Management" : "Manajemen Tim Efisien",
      subtitle: "Staff Management",
      description: language === "en"
        ? "Manage team with role-based access control. Track attendance, performance, and easily assign tasks for each employee."
        : "Kelola tim dengan role-based access control. Track kehadiran, performa, dan assign tugas dengan mudah untuk setiap karyawan.",
      mockup: StaffMockup,
      color: "#FFB020",
      slug: "staff",
    },
    {
      title: language === "en" ? "Smart Table System" : "Sistem Meja Pintar",
      subtitle: "Table Management",
      description: language === "en"
        ? "Monitor table status in real-time. See which tables are empty, occupied, or reserved. Optimize layout to maximize restaurant capacity."
        : "Monitor status meja real-time. Lihat meja mana yang kosong, terisi, atau reserved. Optimasi layout untuk maksimalkan kapasitas restoran.",
      mockup: TablesMockup,
      color: "#8B5CF6",
      slug: "tables",
    },
    {
      title: language === "en" ? "Multi-Method Payment" : "Pembayaran Multi-Metode",
      subtitle: "Payment System",
      description: language === "en"
        ? "Accept payments with various methods: cash, QRIS, debit, transfer. Automatic split bill and print digital or physical receipts."
        : "Terima pembayaran dengan berbagai metode: cash, QRIS, debit, transfer. Split bill otomatis dan cetak struk digital atau fisik.",
      mockup: PaymentMockup,
      color: "#EC4899",
      slug: "payment",
    },
    {
      title: language === "en" ? "Smart Inventory Control" : "Kontrol Stok Cerdas",
      subtitle: "Inventory Control",
      description: language === "en"
        ? "Monitor ingredient stock in real-time. Get automatic notifications when stock is low. Track inventory value and forecast needs."
        : "Monitor stok bahan baku real-time. Dapat notifikasi otomatis saat stok menipis. Lacak nilai inventaris dan forecast kebutuhan.",
      mockup: StockMockup,
      color: "#10B981",
      slug: "inventory",
    },
    {
      title: "Kitchen Display System",
      subtitle: "Kitchen Operations",
      description: language === "en"
        ? "Dedicated kitchen dashboard to track items to be made. Automatic priority for urgent orders and notifications to waiters when ready."
        : "Dashboard khusus dapur untuk track item yang harus dibuat. Prioritas otomatis untuk urgent orders dan notifikasi ke pelayan saat siap.",
      mockup: KitchenMockup,
      color: "#F59E0B",
      slug: "kitchen",
    },
    {
      title: language === "en" ? "Digital QR Menu" : "QR Menu Digital",
      subtitle: "Contactless Ordering",
      description: language === "en"
        ? "Customers scan QR at table to view menu and order directly. Reduce physical contact, increase efficiency, and speed up service."
        : "Pelanggan scan QR di meja untuk lihat menu dan order langsung. Kurangi kontak fisik, tingkatkan efisiensi, dan percepat layanan.",
      mockup: QRMockup,
      color: "#06B6D4",
      slug: "qr-menu",
    },
    {
      title: language === "en" ? "Promo & Campaign Manager" : "Promo & Campaign Manager",
      subtitle: "Marketing Tools",
      description: language === "en"
        ? "Create and manage vouchers, coupons, and bundles. Set promo periods, track redemption rate, and increase repeat orders."
        : "Buat dan kelola voucher, kupon, dan bundling. Atur periode promo, track redemption rate, dan tingkatkan repeat orders.",
      mockup: PromoMockup,
      color: "#EF4444",
      slug: "promo",
    },
    {
      title: language === "en" ? "Customer Relationship" : "Customer Relationship",
      subtitle: "CRM System",
      description: language === "en"
        ? "Manage customer database. Track spending history, favorite items, and give loyalty rewards to improve customer retention."
        : "Kelola database pelanggan. Track spending history, favorite items, dan berikan loyalty rewards untuk meningkatkan customer retention.",
      mockup: CRMMockup,
      color: "#3B82F6",
      slug: "crm",
    },
    {
      title: language === "en" ? "Complete Settings" : "Pengaturan Lengkap",
      subtitle: "System Settings",
      description: language === "en"
        ? "Customize system to restaurant needs. Set theme, notifications, timezone, backup data, and access 24/7 support help."
        : "Customize sistem sesuai kebutuhan restoran. Atur tema, notifikasi, zona waktu, backup data, dan akses bantuan support 24/7.",
      mockup: SettingsMockup,
      color: "#6366F1",
      slug: "settings",
    },
    {
      title: language === "en" ? "Custom Interface Theme" : "Tema Interface Custom",
      subtitle: "Brand Customization",
      description: language === "en"
        ? "Choose from 12 preset theme colors or create your own custom color with color picker. Match interface with your restaurant brand identity."
        : "Pilih dari 12 warna tema preset atau buat warna custom sendiri dengan color picker. Sesuaikan interface dengan identitas brand restoran Anda.",
      mockup: ThemeMockup,
      color: "#9C27B0",
      slug: "theme",
    },
  ]

  return (
    <section className="py-20 sm:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <Container className="relative">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full mb-6">
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
              <span className="text-sm font-bold text-gray-900">
                {language === "en" ? "Real UI Preview" : "Tampilan UI Asli"}
              </span>
            </div>

            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              {language === "en" ? "See The Real Interface" : "Lihat Langsung Tampilan Asli"}
            </h2>

            <p className="text-xl sm:text-2xl leading-relaxed text-gray-600 max-w-2xl mx-auto">
              {language === "en" 
                ? "These aren't empty mockups. Every component displays real UI from our mobile app with actual data and interactions."
                : "Ini bukan mockup kosong. Setiap komponen menampilkan UI asli dari aplikasi mobile kami dengan data dan interaksi real."}
            </p>
          </motion.div>
        </div>

        {/* Feature Sections */}
        <div className="max-w-7xl mx-auto">
          {features.slice(0, 6).map((feature, index) => (
            <FeatureSection key={index} feature={feature} index={index} />
          ))}

          {/* Cross-Platform Power Section */}
          <div className="my-32 -mx-4 sm:-mx-6 lg:-mx-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-screen"
              style={{ marginLeft: 'calc(-50vw + 50%)' }}
            >
              {/* Animated Background - Darker Base */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF5A5F]/20 via-[#8B5CF6]/20 to-[#3B82F6]/20" />
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
              
              {/* Floating Orbs */}
              <div className="absolute top-10 left-10 w-72 h-72 bg-[#FF5A5F]/30 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#8B5CF6]/30 rounded-full blur-3xl animate-pulse animation-delay-2000" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#3B82F6]/20 rounded-full blur-3xl" />
              
              <div className="relative py-20 md:py-28 px-6">
                <div className="max-w-6xl mx-auto">
                  {/* Main Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center mb-8"
                  >
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 shadow-2xl">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="w-8 h-8 rounded-full bg-white flex items-center justify-center"
                      >
                        <span className="text-xl">⚡</span>
                      </motion.div>
                      <span className="text-white font-bold text-sm md:text-base">
                        {language === "en" ? "Works Everywhere, Anytime" : "Bekerja Dimana Saja, Kapan Saja"}
                      </span>
                    </div>
                  </motion.div>
                  
                  {/* Headline */}
                  <motion.h3
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-black text-center mb-6 text-white leading-tight"
                  >
                    {language === "en" ? (
                      <>
                        One Platform.<br />
                        <span className="bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent">
                          Every Device.
                        </span>
                      </>
                    ) : (
                      <>
                        Satu Platform.<br />
                        <span className="bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent">
                          Semua Perangkat.
                        </span>
                      </>
                    )}
                  </motion.h3>
                  
                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-xl md:text-2xl text-white/90 text-center mb-12 max-w-3xl mx-auto leading-relaxed"
                  >
                    {language === "en" 
                      ? "Mobile app for staff on the go. Tablet for kitchen display. Web dashboard for owners. All synced in real-time with zero lag."
                      : "Aplikasi mobile untuk staff yang bergerak. Tablet untuk display dapur. Web dashboard untuk owner. Semua sinkron real-time tanpa lag."}
                  </motion.p>
                  
                  {/* Device Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                      {
                        icon: "📱",
                        title: language === "en" ? "Mobile App" : "Aplikasi Mobile",
                        desc: language === "en" ? "iOS & Android" : "iOS & Android",
                        gradient: "from-pink-500 to-rose-500"
                      },
                      {
                        icon: "💻",
                        title: language === "en" ? "Web Browser" : "Web Browser",
                        desc: language === "en" ? "Any device, anywhere" : "Perangkat apapun, dimana saja",
                        gradient: "from-blue-500 to-cyan-500"
                      },
                      {
                        icon: "🖥️",
                        title: "Tablet",
                        desc: language === "en" ? "Perfect for kitchen" : "Sempurna untuk dapur",
                        gradient: "from-purple-500 to-indigo-500"
                      }
                    ].map((device, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="relative group"
                      >
                        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl text-center h-full">
                          {/* Icon */}
                          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${device.gradient} mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                            <span className="text-4xl">{device.icon}</span>
                          </div>
                          
                          {/* Title */}
                          <h4 className="text-2xl font-black text-white mb-2">
                            {device.title}
                          </h4>
                          
                          {/* Description */}
                          <p className="text-white/70 font-semibold">
                            {device.desc}
                          </p>
                          
                          {/* Checkmark */}
                          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full border border-green-400/30">
                            <span className="text-green-300 text-xl">✓</span>
                            <span className="text-green-300 font-bold text-sm">
                              {language === "en" ? "Real-time Sync" : "Sinkron Real-time"}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Stats Bar */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12"
                  >
                    {[
                      { number: "< 50ms", label: language === "en" ? "Sync Speed" : "Kecepatan Sinkron" },
                      { number: "99.9%", label: "Uptime" },
                      { number: "24/7", label: "Support" }
                    ].map((stat, i) => (
                      <div key={i} className="text-center">
                        <div className="text-3xl md:text-4xl font-black text-white mb-1">
                          {stat.number}
                        </div>
                        <div className="text-white/70 font-semibold text-sm">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                  
                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9 }}
                    className="text-center"
                  >
                    <p className="text-white/80 font-semibold mb-6 text-lg">
                      {language === "en" ? "Still got 7 more features to show you 👇" : "Masih ada 7 fitur lagi yang mau kami tunjukkan 👇"}
                    </p>
                    
                    <motion.div
                      animate={{ y: [0, 12, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="inline-flex flex-col items-center gap-3"
                    >
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/30">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                      <span className="text-sm font-bold text-white/60 uppercase tracking-wider">
                        {language === "en" ? "Keep Scrolling" : "Lanjutkan Scroll"}
                      </span>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {features.slice(6).map((feature, index) => (
            <FeatureSection key={index + 6} feature={feature} index={index + 6} />
          ))}
        </div>
      </Container>
    </section>
  )
}
