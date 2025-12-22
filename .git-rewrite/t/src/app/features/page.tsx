"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { useLanguage } from "@/lib/i18n/context"
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
  Tag,
  UserCircle,
  Settings,
  Palette,
} from "lucide-react"

const features = [
  {
    icon: ShoppingCart,
    color: "#FF5A5F",
    slug: "orders",
    titleEn: "Real-Time Order Management",
    titleId: "Kelola Pesanan Real-Time",
    descEn: "Monitor all orders in one dashboard. Track status from pending to completed with instant notifications.",
    descId: "Pantau semua pesanan dalam satu dashboard. Track status dari pending hingga completed dengan notifikasi instant.",
  },
  {
    icon: Menu,
    color: "#0066FF",
    slug: "menu",
    titleEn: "Flexible Menu Management",
    titleId: "Manajemen Menu Fleksibel",
    descEn: "Manage menu with ease. Add, edit, or delete items instantly with automatic categorization.",
    descId: "Atur menu dengan mudah. Tambah, edit, atau hapus item dalam sekejap dengan kategorisasi otomatis.",
  },
  {
    icon: BarChart3,
    color: "#00D4AA",
    slug: "analytics",
    titleEn: "Analytics & Insights",
    titleId: "Analytics & Insights",
    descEn: "Get deep insights about your business performance with comprehensive analytics dashboard.",
    descId: "Dapatkan insights mendalam tentang performa bisnis dengan dashboard analytics komprehensif.",
  },
  {
    icon: Users,
    color: "#FFB020",
    slug: "staff",
    titleEn: "Efficient Team Management",
    titleId: "Manajemen Tim Efisien",
    descEn: "Manage team with role-based access control and track performance for each employee.",
    descId: "Kelola tim dengan role-based access control dan track performa setiap karyawan.",
  },
  {
    icon: Grid3x3,
    color: "#8B5CF6",
    slug: "tables",
    titleEn: "Smart Table System",
    titleId: "Sistem Meja Pintar",
    descEn: "Monitor table status in real-time. Optimize layout to maximize capacity.",
    descId: "Monitor status meja real-time. Optimasi layout untuk maksimalkan kapasitas.",
  },
  {
    icon: CreditCard,
    color: "#EC4899",
    slug: "payment",
    titleEn: "Multi-Method Payment",
    titleId: "Pembayaran Multi-Metode",
    descEn: "Accept payments with various methods: cash, QRIS, debit, transfer with automatic split bill.",
    descId: "Terima pembayaran dengan berbagai metode: cash, QRIS, debit, transfer dengan split bill otomatis.",
  },
  {
    icon: Package,
    color: "#10B981",
    slug: "inventory",
    titleEn: "Smart Inventory Control",
    titleId: "Kontrol Stok Cerdas",
    descEn: "Monitor ingredient stock in real-time with automatic low-stock notifications.",
    descId: "Monitor stok bahan baku real-time dengan notifikasi otomatis saat stok menipis.",
  },
  {
    icon: ChefHat,
    color: "#F59E0B",
    slug: "kitchen",
    titleEn: "Kitchen Display System",
    titleId: "Kitchen Display System",
    descEn: "Dedicated kitchen dashboard with automatic priority for urgent orders.",
    descId: "Dashboard khusus dapur dengan prioritas otomatis untuk urgent orders.",
  },
  {
    icon: QrCode,
    color: "#06B6D4",
    slug: "qr-menu",
    titleEn: "Digital QR Menu",
    titleId: "QR Menu Digital",
    descEn: "Customers scan QR at table to view menu and order directly without physical contact.",
    descId: "Pelanggan scan QR di meja untuk lihat menu dan order langsung tanpa kontak fisik.",
  },
  {
    icon: Tag,
    color: "#EF4444",
    slug: "promo",
    titleEn: "Promo & Campaign Manager",
    titleId: "Promo & Campaign Manager",
    descEn: "Create and manage vouchers, coupons, and bundles to increase repeat orders.",
    descId: "Buat dan kelola voucher, kupon, dan bundling untuk tingkatkan repeat orders.",
  },
  {
    icon: UserCircle,
    color: "#3B82F6",
    slug: "crm",
    titleEn: "Customer Relationship",
    titleId: "Customer Relationship",
    descEn: "Manage customer database and give loyalty rewards to improve retention.",
    descId: "Kelola database pelanggan dan berikan loyalty rewards untuk tingkatkan retention.",
  },
  {
    icon: Settings,
    color: "#6366F1",
    slug: "settings",
    titleEn: "Complete Settings",
    titleId: "Pengaturan Lengkap",
    descEn: "Customize system to your business needs with comprehensive configuration options.",
    descId: "Customize sistem sesuai kebutuhan bisnis dengan opsi konfigurasi lengkap.",
  },
  {
    icon: Palette,
    color: "#9C27B0",
    slug: "theme",
    titleEn: "Custom Interface Theme",
    titleId: "Tema Interface Custom",
    descEn: "Choose from 12 preset theme colors to match your brand identity.",
    descId: "Pilih dari 12 warna tema preset untuk sesuaikan dengan identitas brand Anda.",
  },
]

export default function FeaturesPage() {
  const { language } = useLanguage()

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full mb-6">
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
              <span className="text-sm font-bold text-gray-900">
                {language === "en" ? "13 Powerful Features" : "13 Fitur Powerful"}
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                {language === "en" ? "Everything You Need" : "Semua yang Kamu Butuhkan"}
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent">
                {language === "en" ? "In One Platform" : "Dalam Satu Platform"}
              </span>
            </h1>

            <p className="text-xl sm:text-2xl leading-relaxed text-gray-600 max-w-3xl mx-auto">
              {language === "en"
                ? "Complete business management solution with real-time sync across all devices"
                : "Solusi manajemen bisnis lengkap dengan sinkronisasi real-time di semua perangkat"}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <motion.a
                key={feature.slug}
                href={`/features/${feature.slug}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white rounded-3xl p-8 border-2 border-gray-100 hover:border-gray-200 shadow-lg hover:shadow-2xl transition-all"
              >
                {/* Icon */}
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${feature.color}20` }}
                >
                  <feature.icon className="w-8 h-8" style={{ color: feature.color }} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-black text-gray-900 mb-3">
                  {language === "en" ? feature.titleEn : feature.titleId}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-4">
                  {language === "en" ? feature.descEn : feature.descId}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2 text-sm font-bold group-hover:gap-3 transition-all" style={{ color: feature.color }}>
                  {language === "en" ? "Learn More" : "Pelajari Lebih Lanjut"}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 relative overflow-hidden">
        {/* Same background as homepage CTA */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF5A5F]/20 via-[#8B5CF6]/20 to-[#3B82F6]/20" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#FF5A5F]/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#8B5CF6]/30 rounded-full blur-3xl animate-pulse animation-delay-2000" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6">
              <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
                {language === "en" ? "Ready to Get Started?" : "Siap Memulai?"}
              </span>
            </h2>
            
            <p className="text-xl sm:text-2xl leading-relaxed text-gray-400 max-w-3xl mx-auto mb-12">
              {language === "en" 
                ? "Experience all these features with our free trial. No credit card required."
                : "Rasakan semua fitur ini dengan trial gratis. Tidak perlu kartu kredit."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="/demo"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center text-base md:text-lg px-10 md:px-12 py-5 md:py-6 bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] hover:from-[#E8484D] hover:to-[#7C3AED] text-white rounded-full font-bold shadow-2xl shadow-[#FF5A5F]/30 transition-all group"
              >
                {language === "en" ? "Start Free Trial" : "Mulai Gratis"}
                <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.a>
              
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center text-base md:text-lg px-10 md:px-12 py-5 md:py-6 bg-white/5 hover:bg-white/10 border-2 border-white/20 hover:border-white/30 text-white rounded-full font-bold backdrop-blur-xl transition-all"
              >
                {language === "en" ? "Contact Sales" : "Hubungi Sales"}
              </motion.a>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  )
}
