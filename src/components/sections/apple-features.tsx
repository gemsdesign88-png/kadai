"use client"

import * as React from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Container } from "@/components/ui/container"
import { useLanguage } from "@/lib/i18n/context"
import { ShoppingCart, BarChart3, Users, CreditCard, Zap, Shield, Smartphone, Check, Receipt, Package } from "lucide-react"

export function AppleFeatures() {
  const { language } = useLanguage()
  const containerRef = React.useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  
  const features = [
    {
      id: "orders",
      icon: ShoppingCart,
      badge: language === "en" ? "Orders" : "Pesanan",
      title: language === "en" ? "Lightning-fast ordering." : "Pesanan super cepat.",
      subtitle: language === "en" ? "From table to kitchen in seconds" : "Dari meja ke dapur dalam hitungan detik",
      description: language === "en" 
        ? "Complete order management system with real-time kitchen notifications, customer ordering via QR code, split bill support, and payment tracking. Process orders in under a second."
        : "Sistem manajemen pesanan lengkap dengan notifikasi dapur real-time, pemesanan pelanggan via QR code, dukungan split bill, dan pelacakan pembayaran. Proses pesanan dalam waktu kurang dari satu detik.",
      color: "#3B82F6",
      features: [
        language === "en" ? "QR code customer ordering" : "Pemesanan pelanggan via QR code",
        language === "en" ? "Real-time kitchen notifications" : "Notifikasi dapur real-time",
        language === "en" ? "Split bill & payment tracking" : "Split bill & tracking pembayaran",
        language === "en" ? "Order status monitoring" : "Monitor status pesanan"
      ],
      mockup: "orders"
    },
    {
      id: "menu",
      icon: Receipt,
      badge: language === "en" ? "Menu" : "Menu",
      title: language === "en" ? "Flexible menu management." : "Manajemen menu yang fleksibel.",
      subtitle: language === "en" ? "Update menu instantly" : "Update menu secara instan",
      description: language === "en"
        ? "Complete menu management with photo uploads, categories, price variations, and modifiers. Add recipes, manage ingredients, and track stock levels automatically."
        : "Manajemen menu lengkap dengan upload foto, kategori, variasi harga, dan modifier. Tambah resep, kelola bahan, dan lacak level stok secara otomatis.",
      color: "#10B981",
      features: [
        language === "en" ? "Photo & description upload" : "Upload foto & deskripsi",
        language === "en" ? "Category & price variations" : "Kategori & variasi harga",
        language === "en" ? "Recipe & ingredient tracking" : "Tracking resep & bahan",
        language === "en" ? "Auto stock deduction" : "Pengurangan stok otomatis"
      ],
      mockup: "menu"
    },
    {
      id: "analytics",
      icon: BarChart3,
      badge: language === "en" ? "Analytics" : "Analitik",
      title: language === "en" ? "Real-time insights." : "Wawasan real-time.",
      subtitle: language === "en" ? "See your business performance instantly" : "Lihat performa bisnis Anda secara instan",
      description: language === "en"
        ? "Powerful analytics dashboard with real-time data visualization. Track sales, revenue, popular items, peak hours, and staff performance with beautiful, actionable insights."
        : "Dashboard analitik powerful dengan visualisasi data real-time. Lacak penjualan, revenue, item populer, jam sibuk, dan performa staff dengan wawasan yang indah dan dapat ditindaklanjuti.",
      color: "#8B5CF6",
      features: [
        language === "en" ? "Live sales & revenue tracking" : "Pelacakan penjualan & revenue live",
        language === "en" ? "Popular items analysis" : "Analisis item populer",
        language === "en" ? "Peak hours insights" : "Wawasan jam sibuk",
        language === "en" ? "Staff performance tracking" : "Pelacakan performa staff"
      ],
      mockup: "analytics"
    },
    {
      id: "team",
      icon: Users,
      badge: language === "en" ? "Team" : "Tim",
      title: language === "en" ? "Smart team management." : "Manajemen tim yang pintar.",
      subtitle: language === "en" ? "Role-based access control" : "Kontrol akses berbasis peran",
      description: language === "en"
        ? "Complete staff management system with QR code login, role-based permissions (Owner, Manager, Cashier, Waiter, Kitchen), shift scheduling, and performance tracking. Keep your team organized and productive."
        : "Sistem manajemen staff lengkap dengan login QR code, izin berbasis peran (Owner, Manager, Kasir, Pelayan, Dapur), penjadwalan shift, dan pelacakan performa. Jaga tim Anda tetap terorganisir dan produktif.",
      color: "#F59E0B",
      features: [
        language === "en" ? "QR code staff login" : "Login staff dengan QR code",
        language === "en" ? "5 role types with permissions" : "5 tipe peran dengan izin",
        language === "en" ? "Performance tracking" : "Pelacakan performa",
        language === "en" ? "Multi-outlet support" : "Dukungan multi-outlet"
      ],
      mockup: "team"
    },
    {
      id: "table",
      icon: Smartphone,
      badge: language === "en" ? "Tables" : "Meja",
      title: language === "en" ? "Efficient table management." : "Manajemen meja yang efisien.",
      subtitle: language === "en" ? "Monitor all tables in real-time" : "Monitor semua meja secara real-time",
      description: language === "en"
        ? "Smart table management with real-time status monitoring, capacity settings, layout organization, and usage history. Perfect for dine-in restaurants."
        : "Manajemen meja pintar dengan monitoring status real-time, pengaturan kapasitas, organisasi layout, dan histori penggunaan. Sempurna untuk restoran dine-in.",
      color: "#EC4899",
      features: [
        language === "en" ? "Real-time table status" : "Status meja real-time",
        language === "en" ? "Capacity & layout settings" : "Pengaturan kapasitas & layout",
        language === "en" ? "Table usage history" : "Histori penggunaan meja",
        language === "en" ? "QR code per table" : "QR code per meja"
      ],
      mockup: "table"
    },
    {
      id: "payments",
      icon: CreditCard,
      badge: language === "en" ? "Payments" : "Pembayaran",
      title: language === "en" ? "Every payment method." : "Semua metode pembayaran.",
      subtitle: language === "en" ? "Cash, card, QRIS, e-wallets" : "Tunai, kartu, QRIS, e-wallet",
      description: language === "en"
        ? "Integrated payment processing supporting cash, cards, QRIS, and all major Indonesian e-wallets (GoPay, OVO, ShopeePay). Auto PDF receipts, WhatsApp sharing, and complete payment reconciliation."
        : "Pemrosesan pembayaran terintegrasi yang mendukung tunai, kartu, QRIS, dan semua e-wallet Indonesia utama (GoPay, OVO, ShopeePay). PDF struk otomatis, sharing WhatsApp, dan rekonsiliasi pembayaran lengkap.",
      color: "#0EA5E9",
      features: [
        language === "en" ? "Cash, card & QRIS" : "Tunai, kartu & QRIS",
        language === "en" ? "E-wallet integration" : "Integrasi e-wallet",
        language === "en" ? "Auto PDF receipt & WhatsApp" : "Struk PDF otomatis & WhatsApp",
        language === "en" ? "Split payment support" : "Dukungan split payment"
      ],
      mockup: "payments"
    },
    {
      id: "stock",
      icon: Package,
      badge: language === "en" ? "Inventory" : "Inventaris",
      title: language === "en" ? "Smart stock control." : "Kontrol stok yang pintar.",
      subtitle: language === "en" ? "Never run out of ingredients" : "Tidak pernah kehabisan bahan",
      description: language === "en"
        ? "Intelligent inventory management with real-time stock monitoring, automatic low stock notifications, ingredient tracking, recipe management, and complete inventory valuation reports."
        : "Manajemen inventaris cerdas dengan monitoring stok real-time, notifikasi stok menipis otomatis, pelacakan bahan, manajemen resep, dan laporan nilai inventaris lengkap.",
      color: "#14B8A6",
      features: [
        language === "en" ? "Real-time stock monitoring" : "Monitor stok real-time",
        language === "en" ? "Auto low stock alerts" : "Notifikasi stok menipis otomatis",
        language === "en" ? "Recipe-based deduction" : "Pengurangan berbasis resep",
        language === "en" ? "Inventory value reports" : "Laporan nilai inventaris"
      ],
      mockup: "stock"
    },
    {
      id: "kitchen",
      icon: Zap,
      badge: language === "en" ? "Kitchen" : "Dapur",
      title: language === "en" ? "Streamlined kitchen operations." : "Operasi dapur yang efisien.",
      subtitle: language === "en" ? "From order to preparation" : "Dari pesanan ke persiapan",
      description: language === "en"
        ? "Dedicated kitchen dashboard with real-time order notifications, cooking status tracking, preparation time monitoring, and role-based kitchen staff access (Chef, Cook, Bartender)."
        : "Dashboard dapur khusus dengan notifikasi pesanan real-time, pelacakan status memasak, monitoring waktu persiapan, dan akses staff dapur berbasis peran (Chef, Cook, Bartender).",
      color: "#F97316",
      features: [
        language === "en" ? "Real-time order notifications" : "Notifikasi pesanan real-time",
        language === "en" ? "Cooking status tracking" : "Pelacakan status memasak",
        language === "en" ? "Preparation time monitoring" : "Monitoring waktu persiapan",
        language === "en" ? "Kitchen role management" : "Manajemen peran dapur"
      ],
      mockup: "kitchen"
    }
  ]
  
  return (
    <div ref={containerRef} className="relative bg-white">
      {features.map((feature, index) => {
        const isReversed = index % 2 !== 0
        
        return (
          <section 
            key={feature.id}
            id={feature.id}
            className="min-h-screen flex items-center py-20 md:py-32 relative overflow-hidden"
          >
            <Container>
              <div className={`grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center ${isReversed ? 'md:grid-flow-dense' : ''}`}>
                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={isReversed ? 'md:col-start-2' : ''}
                >
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 mb-6">
                    <feature.icon className="h-4 w-4" style={{ color: feature.color }} />
                    <span className="text-sm font-semibold text-gray-900">{feature.badge}</span>
                  </div>
                  
                  {/* Title */}
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-gray-900 tracking-tight leading-none">
                    {feature.title}
                  </h2>
                  
                  {/* Subtitle */}
                  <p className="text-xl md:text-2xl text-gray-600 mb-6 font-medium">
                    {feature.subtitle}
                  </p>
                  
                  {/* Description */}
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Feature List */}
                  <div className="space-y-3">
                    {feature.features.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3"
                      >
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${feature.color}15` }}
                        >
                          <Check className="h-4 w-4" style={{ color: feature.color }} />
                        </div>
                        <span className="text-gray-700 font-medium">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                {/* Mockup */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`${isReversed ? 'md:col-start-1 md:row-start-1' : ''}`}
                >
                  {feature.mockup === "orders" && <OrdersMockup color={feature.color} language={language} />}
                  {feature.mockup === "menu" && <MenuMockup color={feature.color} language={language} />}
                  {feature.mockup === "analytics" && <AnalyticsMockup color={feature.color} language={language} />}
                  {feature.mockup === "team" && <TeamMockup color={feature.color} language={language} />}
                  {feature.mockup === "table" && <TableMockup color={feature.color} language={language} />}
                  {feature.mockup === "payments" && <PaymentsMockup color={feature.color} language={language} />}
                  {feature.mockup === "stock" && <StockMockup color={feature.color} language={language} />}
                  {feature.mockup === "kitchen" && <KitchenMockup color={feature.color} language={language} />}
                </motion.div>
              </div>
            </Container>
          </section>
        )
      })}
    </div>
  )
}

// Mockup Components
function OrdersMockup({ color, language }: { color: string, language: string }) {
  return (
    <div className="relative aspect-[4/5] rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 shadow-2xl border border-gray-200">
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: color }}>
              <ShoppingCart className="h-7 w-7 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">New Order</div>
              <div className="text-xs text-gray-500">#ORD-2847</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">Table</div>
            <div className="text-2xl font-bold text-gray-900">12</div>
          </div>
        </div>
        
        <div className="flex-1 space-y-3 mb-6">
          {[
            { name: "Nasi Goreng Spesial", price: "45K", qty: 2 },
            { name: "Es Teh Manis", price: "8K", qty: 2 },
            { name: "Ayam Bakar", price: "35K", qty: 1 }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  <span className="text-sm font-bold text-gray-600">{item.qty}x</span>
                </div>
                <div className="text-sm font-semibold text-gray-900">{item.name}</div>
              </div>
              <div className="text-base font-bold text-gray-900">{item.price}</div>
            </motion.div>
          ))}
        </div>
        
        <div className="pt-6 border-t-2 border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-bold text-gray-900">Total</span>
            <span className="text-3xl font-bold" style={{ color }}>Rp 141.000</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="px-6 py-4 bg-gray-100 hover:bg-gray-200 rounded-xl text-center font-semibold text-gray-700 transition-all">
              Add Item
            </button>
            <button className="px-6 py-4 rounded-xl text-center font-semibold text-white transition-all" style={{ backgroundColor: color }}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function AnalyticsMockup({ color, language }: { color: string, language: string }) {
  return (
    <div className="relative aspect-[4/5] rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 shadow-2xl border border-gray-200">
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: color }}>
              <BarChart3 className="h-7 w-7 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">Analytics</div>
              <div className="text-xs text-gray-500">Today's Performance</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { label: "Revenue", value: "Rp 4.2M", change: "+24%" },
            { label: "Orders", value: "127", change: "+12%" },
            { label: "Avg. Order", value: "33K", change: "+8%" },
            { label: "Peak Hour", value: "19:00", change: "7PM" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-4 bg-white rounded-xl shadow-sm"
            >
              <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-xs font-semibold" style={{ color }}>
                {stat.change}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="flex-1 bg-white rounded-xl shadow-sm p-6">
          <div className="text-sm text-gray-500 mb-4">Sales This Week</div>
          <div className="flex items-end justify-between h-48 gap-2">
            {[65, 45, 80, 55, 90, 70, 85].map((height, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex-1 rounded-t-lg origin-bottom"
                style={{ 
                  height: `${height}%`,
                  backgroundColor: i === 6 ? color : '#E5E7EB'
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-3">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
              <div key={i} className="text-xs text-gray-400">{day}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function TeamMockup({ color, language }: { color: string, language: string }) {
  return (
    <div className="relative aspect-[4/5] rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 shadow-2xl border border-gray-200">
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: color }}>
              <Users className="h-7 w-7 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">Team</div>
              <div className="text-xs text-gray-500">Active Staff (4)</div>
            </div>
          </div>
          <div className="px-4 py-2 bg-green-100 rounded-full">
            <span className="text-xs font-semibold text-green-700">On Shift</span>
          </div>
        </div>
        
        <div className="flex-1 space-y-4 mb-6">
          {[
            { name: "Ahmad Rizki", role: "Cashier", orders: 24, color: "#10B981" },
            { name: "Siti Nurhaliza", role: "Waiter", orders: 18, color: "#3B82F6" },
            { name: "Budi Santoso", role: "Kitchen", orders: 31, color: "#F59E0B" },
            { name: "Dewi Lestari", role: "Manager", orders: 12, color: "#8B5CF6" }
          ].map((staff, i) => (
            <motion.div
              key={i}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: staff.color }}
                >
                  {staff.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{staff.name}</div>
                  <div className="text-xs text-gray-500">{staff.role}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-gray-900">{staff.orders}</div>
                <div className="text-xs text-gray-500">orders</div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="grid grid-cols-3 gap-3 pt-6 border-t-2 border-gray-200">
          {[
            { label: "Total", value: "85" },
            { label: "Avg", value: "21" },
            { label: "Peak", value: "31" }
          ].map((stat, i) => (
            <div key={i} className="p-3 bg-white rounded-xl shadow-sm text-center">
              <div className="text-xs text-gray-500">{stat.label}</div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PaymentsMockup({ color, language }: { color: string, language: string }) {
  return (
    <div className="relative aspect-[4/5] rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 shadow-2xl border border-gray-200">
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: color }}>
              <CreditCard className="h-7 w-7 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">Payment</div>
              <div className="text-xs text-gray-500">Select Method</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">Total</div>
            <div className="text-xl font-bold text-gray-900">Rp 141K</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { name: "Cash", icon: "💵" },
            { name: "Card", icon: "💳" },
            { name: "QRIS", icon: "📱" },
            { name: "GoPay", icon: "🟢" },
            { name: "OVO", icon: "🟣" },
            { name: "ShopeePay", icon: "🟠" }
          ].map((method, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              className="p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border-2 border-transparent hover:border-current"
              style={{ color: color }}
            >
              <div className="text-3xl mb-2">{method.icon}</div>
              <div className="text-sm font-semibold text-gray-900">{method.name}</div>
              <div className="text-xs text-green-600 mt-1">Available</div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-auto pt-6 border-t-2 border-gray-200">
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold text-gray-900">Rp 141.000</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax (10%)</span>
              <span className="font-semibold text-gray-900">Rp 14.100</span>
            </div>
            <div className="flex justify-between text-lg pt-3 border-t border-gray-200">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold" style={{ color }}>Rp 155.100</span>
            </div>
          </div>
          <button className="w-full px-6 py-4 rounded-xl text-center font-semibold text-white transition-all" style={{ backgroundColor: color }}>
            Process Payment
          </button>
        </div>
      </div>
    </div>
  )
}

function MenuMockup({ color, language }: { color: string, language: string }) {
  return (
    <div className="relative aspect-[4/5] rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 shadow-2xl border border-gray-200">
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: color }}>
              <Receipt className="h-7 w-7 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">Menu Management</div>
              <div className="text-xs text-gray-500">45 Items</div>
            </div>
          </div>
          <div className="px-4 py-2 bg-green-100 rounded-full">
            <span className="text-xs font-semibold text-green-700">Active</span>
          </div>
        </div>
        
        <div className="flex-1 space-y-3 overflow-hidden">
          {[
            { name: "Nasi Goreng Spesial", category: "Main Course", price: "45K", stock: "✓", image: "🍚" },
            { name: "Ayam Bakar", category: "Main Course", price: "35K", stock: "✓", image: "🍗" },
            { name: "Es Teh Manis", category: "Beverages", price: "8K", stock: "✓", image: "🥤" },
            { name: "Soto Ayam", category: "Main Course", price: "25K", stock: "Low", image: "🍜" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm"
            >
              <div className="text-4xl">{item.image}</div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-900">{item.name}</div>
                <div className="text-xs text-gray-500">{item.category}</div>
              </div>
              <div className="text-right">
                <div className="text-base font-bold text-gray-900">{item.price}</div>
                <div className={`text-xs font-semibold ${item.stock === "✓" ? "text-green-600" : "text-orange-600"}`}>
                  {item.stock === "✓" ? "In Stock" : item.stock}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="pt-6 border-t-2 border-gray-200 mt-6">
          <button className="w-full px-6 py-4 rounded-xl text-center font-semibold text-white transition-all" style={{ backgroundColor: color }}>
            + Add New Item
          </button>
        </div>
      </div>
    </div>
  )
}

function TableMockup({ color, language }: { color: string, language: string }) {
  return (
    <div className="relative aspect-[4/5] rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 shadow-2xl border border-gray-200">
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: color }}>
              <Smartphone className="h-7 w-7 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">Table Status</div>
              <div className="text-xs text-gray-500">12 Tables Total</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { num: 1, status: "available", guests: 0 },
            { num: 2, status: "occupied", guests: 4 },
            { num: 3, status: "occupied", guests: 2 },
            { num: 4, status: "reserved", guests: 6 },
            { num: 5, status: "available", guests: 0 },
            { num: 6, status: "occupied", guests: 3 },
            { num: 7, status: "available", guests: 0 },
            { num: 8, status: "occupied", guests: 5 },
            { num: 9, status: "available", guests: 0 }
          ].map((table, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className={`aspect-square rounded-2xl p-4 flex flex-col items-center justify-center ${
                table.status === "available" 
                  ? "bg-green-50 border-2 border-green-200" 
                  : table.status === "occupied"
                  ? "bg-red-50 border-2 border-red-200"
                  : "bg-yellow-50 border-2 border-yellow-200"
              }`}
            >
              <div className={`text-2xl font-bold mb-1 ${
                table.status === "available" ? "text-green-700" : table.status === "occupied" ? "text-red-700" : "text-yellow-700"
              }`}>
                {table.num}
              </div>
              {table.status !== "available" && (
                <div className="text-xs text-gray-600">{table.guests} guests</div>
              )}
              <div className={`text-[10px] mt-1 font-semibold ${
                table.status === "available" ? "text-green-600" : table.status === "occupied" ? "text-red-600" : "text-yellow-600"
              }`}>
                {table.status === "available" ? "Free" : table.status === "occupied" ? "Busy" : "Reserved"}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="grid grid-cols-3 gap-2 pt-4 border-t-2 border-gray-200">
          <div className="p-3 bg-green-50 rounded-lg text-center">
            <div className="text-xs text-gray-500">Available</div>
            <div className="text-xl font-bold text-green-700">4</div>
          </div>
          <div className="p-3 bg-red-50 rounded-lg text-center">
            <div className="text-xs text-gray-500">Occupied</div>
            <div className="text-xl font-bold text-red-700">7</div>
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg text-center">
            <div className="text-xs text-gray-500">Reserved</div>
            <div className="text-xl font-bold text-yellow-700">1</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StockMockup({ color, language }: { color: string, language: string }) {
  return (
    <div className="relative aspect-[4/5] rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 shadow-2xl border border-gray-200">
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: color }}>
              <Package className="h-7 w-7 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">Stock Inventory</div>
              <div className="text-xs text-gray-500">32 Ingredients</div>
            </div>
          </div>
          <div className="px-4 py-2 bg-orange-100 rounded-full">
            <span className="text-xs font-semibold text-orange-700">3 Low</span>
          </div>
        </div>
        
        <div className="flex-1 space-y-3 overflow-hidden">
          {[
            { name: "Beras", qty: 50, unit: "kg", status: "good", icon: "🌾" },
            { name: "Ayam", qty: 8, unit: "kg", status: "low", icon: "🍗" },
            { name: "Cabai", qty: 3, unit: "kg", status: "low", icon: "🌶️" },
            { name: "Gula", qty: 25, unit: "kg", status: "good", icon: "🧂" },
            { name: "Teh", qty: 15, unit: "pack", status: "good", icon: "🍵" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm"
            >
              <div className="text-3xl">{item.icon}</div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-900">{item.name}</div>
                <div className="text-xs text-gray-500">Current Stock</div>
              </div>
              <div className="text-right">
                <div className="text-base font-bold text-gray-900">{item.qty} {item.unit}</div>
                <div className={`text-xs font-semibold ${item.status === "good" ? "text-green-600" : "text-orange-600"}`}>
                  {item.status === "good" ? "Good" : "Low Stock"}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-3 pt-6 border-t-2 border-gray-200 mt-6">
          <div className="p-3 bg-white rounded-xl shadow-sm text-center">
            <div className="text-xs text-gray-500">Total Value</div>
            <div className="text-lg font-bold text-gray-900">Rp 12.5M</div>
          </div>
          <div className="p-3 bg-white rounded-xl shadow-sm text-center">
            <div className="text-xs text-gray-500">Items</div>
            <div className="text-lg font-bold text-gray-900">32</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function KitchenMockup({ color, language }: { color: string, language: string }) {
  return (
    <div className="relative aspect-[4/5] rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 p-8 shadow-2xl border border-gray-200">
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: color }}>
              <Zap className="h-7 w-7 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">Kitchen Orders</div>
              <div className="text-xs text-gray-500">5 Active</div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 space-y-3 overflow-hidden">
          {[
            { table: 12, items: ["Nasi Goreng x2", "Ayam Bakar x1"], time: "2 min", status: "preparing", priority: "high" },
            { table: 8, items: ["Soto Ayam x1", "Es Teh x2"], time: "5 min", status: "preparing", priority: "normal" },
            { table: 5, items: ["Ayam Bakar x2"], time: "8 min", status: "waiting", priority: "normal" },
            { table: 15, items: ["Nasi Goreng x1"], time: "1 min", status: "ready", priority: "normal" }
          ].map((order, i) => (
            <motion.div
              key={i}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`p-4 rounded-xl shadow-sm border-2 ${
                order.status === "ready" 
                  ? "bg-green-50 border-green-200" 
                  : order.status === "preparing"
                  ? "bg-yellow-50 border-yellow-200"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center font-bold text-sm">
                    {order.table}
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Table {order.table}</div>
                  </div>
                </div>
                <div className={`text-xs font-bold ${
                  order.status === "ready" ? "text-green-700" : order.status === "preparing" ? "text-yellow-700" : "text-gray-700"
                }`}>
                  {order.time}
                </div>
              </div>
              <div className="space-y-1">
                {order.items.map((item, idx) => (
                  <div key={idx} className="text-sm font-medium text-gray-900">{item}</div>
                ))}
              </div>
              <div className="mt-2 pt-2 border-t border-gray-200">
                <div className={`text-xs font-semibold ${
                  order.status === "ready" ? "text-green-600" : order.status === "preparing" ? "text-yellow-600" : "text-gray-600"
                }`}>
                  {order.status === "ready" ? "✓ Ready to Serve" : order.status === "preparing" ? "👨‍🍳 Preparing" : "⏳ Waiting"}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
