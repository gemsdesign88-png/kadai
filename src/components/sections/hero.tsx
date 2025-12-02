"use client"

import * as React from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/context"
import { ArrowRight, ShoppingCart, BarChart3, Users, CreditCard, Package, Receipt, TrendingUp, Clock, Zap, Shield, Smartphone } from "lucide-react"
import Link from "next/link"

export function Hero() {
  const { t, language } = useLanguage()
  const containerRef = React.useRef<HTMLDivElement>(null)
  const heroRef = React.useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  
  // Hero animations
  const heroY = useTransform(smoothProgress, [0, 1], [0, -300])
  const heroOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(smoothProgress, [0, 1], [1, 0.8])
  
  // Dashboard animations
  const dashboardY = useTransform(smoothProgress, [0, 0.3], [0, -100])
  const dashboardScale = useTransform(smoothProgress, [0, 0.2, 0.3], [1, 1, 0.95])
  const dashboardOpacity = useTransform(smoothProgress, [0, 0.1, 0.3, 0.5], [1, 1, 1, 0])
  
  return (
    <div ref={containerRef} className="relative bg-black">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF5A5F] via-[#FF5A5F] to-[#FF5A5F] origin-left z-50"
        style={{ scaleX: smoothProgress }}
      />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
        
        {/* Animated background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_100%)]" />
        
        <Container className="relative z-10">
          <motion.div
            style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
            className="text-center px-4 py-12"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8"
            >
              <Zap className="h-4 w-4 text-[#FF5A5F]" />
              <span className="text-sm font-semibold text-white">
                {language === "en" ? "The Best POS System" : "Sistem POS Terbaik"}
              </span>
            </motion.div>
            
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-6xl md:text-6xl lg:text-8xl font-bold mb-6 tracking-tight leading-none"
            >
              <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
                Kadai
              </span>
            </motion.h1>
            
            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-white"
            >
              {language === "en" ? "Excellence. Built in." : "Keunggulan demi keunggulan."}
            </motion.p>
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-lg md:text-xl text-gray-400 mb-8 max-w-3xl mx-auto font-medium"
            >
              {language === "en" 
                ? "The most powerful POS system designed for modern restaurants. Fast, intuitive, and built for growth."
                : "Sistem POS paling powerful yang dirancang untuk restoran modern. Cepat, intuitif, dan dibangun untuk pertumbuhan."}
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link 
                href="/demo"
                className="inline-flex items-center justify-center text-base md:text-lg px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] hover:from-[#E8484D] hover:to-[#7C3AED] text-white rounded-full font-semibold shadow-2xl shadow-[#FF5A5F]/20 transition-all hover:scale-105 active:scale-95 group"
              >
                {language === "en" ? "Try Demo" : "Coba Demo"}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link 
                href="#features"
                className="inline-flex items-center justify-center text-base md:text-lg px-8 md:px-10 py-4 md:py-5 bg-white/5 hover:bg-white/10 border-2 border-white/20 hover:border-white/30 text-white rounded-full font-semibold backdrop-blur-xl transition-all hover:scale-105 active:scale-95"
              >
                {language === "en" ? "Learn More" : "Pelajari Lebih Lanjut"}
              </Link>
            </motion.div>
            
            {/* Excellence Features - Glass Morphism */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto"
            >
              {[
                { 
                  icon: Zap, 
                  title: language === "en" ? "Real-time Sync" : "Sinkron Real-time",
                  color: "#10B981"
                },
                { 
                  icon: Shield, 
                  title: language === "en" ? "100% Secure" : "100% Aman",
                  color: "#FF5A5F"
                },
                { 
                  icon: Clock, 
                  title: language === "en" ? "24/7 Support" : "Dukungan 24/7",
                  color: "#EC4899"
                },
                { 
                  icon: Users, 
                  title: language === "en" ? "Easy to Use" : "Mudah Dipakai",
                  color: "#F59E0B"
                },
                { 
                  icon: Zap, 
                  title: language === "en" ? "Lightning Fast" : "Super Cepat",
                  color: "#8B5CF6"
                },
                { 
                  icon: Smartphone, 
                  title: language === "en" ? "Multi-Device" : "Multi-Perangkat",
                  color: "#3B82F6"
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-4 md:p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${feature.color}15` }}
                    >
                      <feature.icon className="h-5 w-5 md:h-6 md:w-6" style={{ color: feature.color }} />
                    </div>
                    <span className="text-sm md:text-base font-bold text-white">{feature.title}</span>
                  </div>
                  
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Dashboard Preview - Real UI */}
          <motion.div
            style={{ 
              y: dashboardY, 
              scale: dashboardScale,
              opacity: dashboardOpacity 
            }}
            className="relative max-w-5xl mx-auto mt-8 mb-20"
          >
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#FF5A5F]/20 via-purple-500/20 to-[#3B82F6]/20 rounded-3xl blur-3xl" />
            
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-[#F9FAFB] shadow-2xl border border-gray-200">
              <div className="h-full p-6 md:p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-1">Dashboard</h2>
                    <p className="text-sm text-[#6B7280]">{language === "en" ? "Sales & Inventory Overview" : "Ringkasan Penjualan & Stok"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Period Tabs */}
                    <div className="flex items-center gap-1 p-1 rounded-xl bg-[#F3F4F6] border border-[#E5E7EB]">
                      {[
                        { key: 'daily', label: language === "en" ? "Daily" : "Harian" },
                        { key: 'weekly', label: language === "en" ? "Weekly" : "Mingguan" },
                        { key: 'monthly', label: language === "en" ? "Monthly" : "Bulanan" },
                        { key: 'yearly', label: language === "en" ? "Yearly" : "Tahunan" }
                      ].map((period, i) => (
                        <div
                          key={period.key}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            i === 1 
                              ? 'bg-white text-[#FF5A5F] shadow-sm' 
                              : 'text-[#6B7280] hover:text-[#111827]'
                          }`}
                        >
                          {period.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Left Column - Sales Stats */}
                  <div className="space-y-4">
                    {/* Revenue Card */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.3, duration: 0.6 }}
                      className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5E7EB]"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 rounded-xl bg-[#DBEAFE] flex items-center justify-center">
                          <TrendingUp className="h-6 w-6 text-[#3B82F6]" />
                        </div>
                        <span className="text-sm font-semibold text-[#10B981]">+24%</span>
                      </div>
                      <p className="text-sm text-[#6B7280] mb-1">{language === "en" ? "Today's Revenue" : "Pendapatan Hari Ini"}</p>
                      <p className="text-3xl font-bold text-[#111827]">Rp 4.2M</p>
                    </motion.div>

                    {/* Orders Card */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.4, duration: 0.6 }}
                      className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5E7EB]"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 rounded-xl bg-[#FEF3C7] flex items-center justify-center">
                          <ShoppingCart className="h-6 w-6 text-[#F59E0B]" />
                        </div>
                        <span className="text-sm font-semibold text-[#10B981]">+12%</span>
                      </div>
                      <p className="text-sm text-[#6B7280] mb-1">{language === "en" ? "Total Orders" : "Total Pesanan"}</p>
                      <p className="text-3xl font-bold text-[#111827]">127</p>
                    </motion.div>
                  </div>

                  {/* Right Column - Stock Alerts & Reminders */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.6 }}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5E7EB]"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-[#6B7280] mb-1">{language === "en" ? "Stock Alerts" : "Peringatan Stok"}</p>
                        <p className="text-xl font-bold text-[#EF4444]">3 {language === "en" ? "Items Need Attention" : "Item Perlu Perhatian"}</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-[#FEE2E2] flex items-center justify-center">
                        <Package className="h-6 w-6 text-[#EF4444]" />
                      </div>
                    </div>
                    
                    <div className="space-y-2.5">
                      {[
                        { 
                          name: language === "en" ? "Cooking Oil" : "Minyak Goreng", 
                          stock: 3, 
                          unit: "L", 
                          minStock: 20,
                          status: "critical", 
                          color: "#EF4444",
                          alert: language === "en" ? "Critical - Order Now!" : "Kritis - Pesan Sekarang!"
                        },
                        { 
                          name: language === "en" ? "Chicken Fillet" : "Ayam Fillet", 
                          stock: 12, 
                          unit: "kg", 
                          minStock: 30,
                          status: "low", 
                          color: "#F59E0B",
                          alert: language === "en" ? "Low Stock" : "Stok Menipis"
                        },
                        { 
                          name: language === "en" ? "Chili Sauce" : "Saus Sambal", 
                          stock: 8, 
                          unit: language === "en" ? "btl" : "btl", 
                          minStock: 25,
                          status: "low", 
                          color: "#F59E0B",
                          alert: language === "en" ? "Restock Soon" : "Segera Isi Ulang"
                        },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 1.6 + i * 0.1, duration: 0.4 }}
                          className="p-3 rounded-lg border-2"
                          style={{ 
                            borderColor: item.color,
                            backgroundColor: `${item.color}08`
                          }}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: item.color }} />
                              <span className="text-sm font-bold text-[#111827]">{item.name}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-bold" style={{ color: item.color }}>{item.stock}</span>
                              <span className="text-xs text-[#6B7280] ml-0.5">/{item.minStock}{item.unit}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3 w-3" style={{ color: item.color }} />
                            <span className="text-xs font-semibold" style={{ color: item.color }}>{item.alert}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Sales Chart */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.9, duration: 0.6 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5E7EB]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-[#6B7280] mb-1">{language === "en" ? "Sales This Week" : "Penjualan Minggu Ini"}</p>
                      <p className="text-xl font-bold text-[#111827]">Rp 18.5M</p>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-[#D1FAE5]">
                      <span className="text-xs font-bold text-[#059669]">+15.3%</span>
                    </div>
                  </div>
                  <div className="flex items-end justify-between h-24 md:h-32 gap-2">
                    {[65, 45, 80, 55, 90, 70, 85].map((height, i) => (
                      <motion.div
                        key={i}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: 2.1 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                        className="flex-1 rounded-t-lg origin-bottom"
                        style={{ 
                          height: `${height}%`,
                          backgroundColor: i === 6 ? '#FF5A5F' : '#E5E7EB'
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-3">
                    {(language === "en" ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] : ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']).map((day, i) => (
                      <div key={i} className="text-xs text-[#6B7280] text-center flex-1">{day}</div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </Container>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.7, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-gray-500">{language === "en" ? "Scroll to explore" : "Gulir untuk melihat"}</span>
            <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-white rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
