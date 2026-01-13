"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Smartphone, LineChart, Users, Zap, ShoppingCart, BarChart3, Clock, TrendingUp, Package, AlertCircle, Sparkles, Activity } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

type Mode = "sales" | "dashboard"

const modes = {
  sales: {
    icon: ShoppingCart,
    titleEn: "Sales Mode",
    titleId: "Mode Penjualan",
    subtitleEn: "For Your Staff",
    subtitleId: "Untuk Staff Anda",
    descEn: "Lightning-fast POS interface designed for frontline staff to take orders and process transactions efficiently.",
    descId: "Interface POS super cepat dirancang untuk staff mengambil pesanan dan memproses transaksi dengan efisien.",
    gradient: "from-[#FF5A5F] to-orange-500",
    features: [
      {
        iconEn: Zap,
        titleEn: "Lightning Fast",
        titleId: "Super Cepat",
        descEn: "Take orders in seconds",
        descId: "Ambil pesanan dalam hitungan detik"
      },
      {
        iconEn: Smartphone,
        titleEn: "Mobile First",
        titleId: "Mobile First",
        descEn: "Works on any device",
        descId: "Berfungsi di perangkat apa pun"
      },
      {
        iconEn: Users,
        titleEn: "Multi-Staff",
        titleId: "Multi-Staff",
        descEn: "Multiple staff can work simultaneously",
        descId: "Banyak staff bisa bekerja bersamaan"
      }
    ],
    mockup: {
      titleEn: "Order #1247",
      titleId: "Pesanan #1247",
      items: [
        { name: "Nasi Goreng", qty: 2, price: "50.000" },
        { name: "Es Teh Manis", qty: 2, price: "10.000" }
      ],
      total: "60.000"
    }
  },
  dashboard: {
    icon: LineChart,
    titleEn: "Dashboard Mode",
    titleId: "Mode Dashboard",
    subtitleEn: "For Owners & Managers",
    subtitleId: "Untuk Owner & Manager",
    descEn: "Real-time business health monitoring with AI-powered insights. Track sales, manage inventory, and get proactive recommendations - all from your pocket.",
    descId: "Monitoring kesehatan bisnis real-time dengan insight bertenaga AI. Lacak penjualan, kelola stok, dan dapatkan rekomendasi proaktif - semua dari kantong Anda.",
    gradient: "from-blue-500 to-purple-500",
    features: [
      {
        iconEn: Activity,
        titleEn: "Business Health Score",
        titleId: "Skor Kesehatan Bisnis",
        descEn: "Monitor vital metrics like a doctor",
        descId: "Monitor metrik vital seperti dokter"
      },
      {
        iconEn: Package,
        titleEn: "Smart Stock Alerts",
        titleId: "Alert Stok Cerdas",
        descEn: "Never run out of ingredients",
        descId: "Tidak pernah kehabisan bahan"
      },
      {
        iconEn: Sparkles,
        titleEn: "AI Recommendations",
        titleId: "Rekomendasi AI",
        descEn: "Actionable insights 24/7",
        descId: "Saran aksi 24/7"
      }
    ],
    mockup: {
      titleEn: "Business Health",
      titleId: "Kesehatan Bisnis",
      healthScore: 87,
      metrics: [
        { icon: TrendingUp, label: "Gross Sales", labelId: "Penjualan", value: "Rp 8.4M", color: "text-blue-400" },
        { icon: Package, label: "HPP/COGS", labelId: "HPP", value: "Rp 4.6M", color: "text-orange-400", subtitle: "55%", subtitleId: "55%" },
        { icon: BarChart3, label: "OPEX", labelId: "Biaya Operasional", value: "Rp 1.3M", color: "text-yellow-400", subtitle: "15%", subtitleId: "15%" },
        { icon: Activity, label: "Net Profit", labelId: "Laba Bersih", value: "Rp 2.5M", color: "text-green-400", subtitle: "30%", subtitleId: "30%" }
      ],
      insights: [
        { type: "success", text: "Sales up 12% today", textId: "Penjualan naik 12% hari ini" },
        { type: "warning", text: "3 items need restock", textId: "3 item perlu diisi ulang" }
      ]
    }
  }
}

export function DualModeSystem() {
  const { t } = useLanguage()
  const [activeMode, setActiveMode] = React.useState<Mode>("dashboard")

  const modes = {
    sales: {
      icon: ShoppingCart,
      title: t.dualMode?.modes.sales.title,
      subtitle: t.dualMode?.modes.sales.subtitle,
      description: t.dualMode?.modes.sales.description,
      gradient: "from-[#FF5A5F] to-orange-500",
      features: [
        {
          icon: Zap,
          title: t.dualMode?.modes.sales.features.fast.title,
          desc: t.dualMode?.modes.sales.features.fast.desc
        },
        {
          icon: Smartphone,
          title: t.dualMode?.modes.sales.features.mobile.title,
          desc: t.dualMode?.modes.sales.features.mobile.desc
        },
        {
          icon: Users,
          title: t.dualMode?.modes.sales.features.multi.title,
          desc: t.dualMode?.modes.sales.features.multi.desc
        }
      ],
      mockup: {
        title: t.dualMode?.modes.sales.mockup.title,
        items: [
          { name: "Nasi Goreng", qty: 2, price: "50.000" },
          { name: "Es Teh Manis", qty: 2, price: "10.000" }
        ],
        total: "60.000"
      }
    },
    dashboard: {
      icon: LineChart,
      title: t.dualMode?.modes.dashboard.title,
      subtitle: t.dualMode?.modes.dashboard.subtitle,
      description: t.dualMode?.modes.dashboard.description,
      gradient: "from-blue-500 to-purple-500",
      features: [
        {
          icon: Activity,
          title: t.dualMode?.modes.dashboard.features.health.title,
          desc: t.dualMode?.modes.dashboard.features.health.desc
        },
        {
          icon: Package,
          title: t.dualMode?.modes.dashboard.features.stock.title,
          desc: t.dualMode?.modes.dashboard.features.stock.desc
        },
        {
          icon: Sparkles,
          title: t.dualMode?.modes.dashboard.features.ai.title,
          desc: t.dualMode?.modes.dashboard.features.ai.desc
        }
      ],
      mockup: {
        title: t.dualMode?.modes.dashboard.mockup.title,
        healthScore: 87,
        metrics: [
          { icon: TrendingUp, label: t.dualMode?.modes.dashboard.mockup.metrics.sales, value: "Rp 8.4M", color: "text-blue-400" },
          { icon: Package, label: t.dualMode?.modes.dashboard.mockup.metrics.hpp, value: "Rp 4.6M", color: "text-orange-400", subtitle: "55%" },
          { icon: BarChart3, label: t.dualMode?.modes.dashboard.mockup.metrics.opex, value: "Rp 1.3M", color: "text-yellow-400", subtitle: "15%" },
          { icon: Activity, label: t.dualMode?.modes.dashboard.mockup.metrics.profit, value: "Rp 2.5M", color: "text-green-400", subtitle: "30%" }
        ],
        insights: [
          { type: "success", text: t.dualMode?.modes.dashboard.mockup.insights.sales },
          { type: "warning", text: t.dualMode?.modes.dashboard.mockup.insights.stock }
        ]
      }
    }
  }

  const currentMode = modes[activeMode]
  const Icon = currentMode.icon

  return (
    <section className="relative py-20 md:py-32 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-6">
            <span className="text-sm font-semibold text-white">
              {t.dualMode?.badge}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {t.dualMode?.title}
            <br />
            <span className="bg-gradient-to-r from-[#FF5A5F] via-purple-500 to-blue-500 bg-clip-text text-transparent">
              {t.dualMode?.titleHighlight}
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {t.dualMode?.description}
          </p>
        </motion.div>

        {/* Mode Selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-2">
            {(["dashboard", "sales"] as Mode[]).map((mode) => {
              const modeData = modes[mode]
              const ModeIcon = modeData.icon
              return (
                <button
                  key={mode}
                  onClick={() => setActiveMode(mode)}
                  className={`relative px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    activeMode === mode
                      ? "text-white"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  {activeMode === mode && (
                    <motion.div
                      layoutId="activeModeBg"
                      className={`absolute inset-0 rounded-xl bg-gradient-to-r ${modeData.gradient}`}
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <ModeIcon className="w-5 h-5" />
                    {modeData.title}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Mode Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto"
          >
            {/* Left: Description */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentMode.gradient} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {currentMode.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {currentMode.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-lg text-gray-300 mb-8">
                {currentMode.description}
              </p>

              {/* Features */}
              <div className="space-y-4">
                {currentMode.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${currentMode.gradient} flex items-center justify-center flex-shrink-0`}>
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {feature.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className={`relative rounded-3xl bg-gradient-to-br ${currentMode.gradient} p-[2px]`}>
                <div className="rounded-3xl bg-gray-900 p-6 backdrop-blur-xl">
                  {activeMode === "sales" ? (
                    <>
                      {/* Sales Mode Mockup */}
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-lg font-bold text-white">
                          {currentMode.mockup.title}
                        </h4>
                        <Clock className="w-5 h-5 text-gray-400" />
                      </div>
                      
                      {activeMode === "sales" && "items" in currentMode.mockup && (
                        <>
                          <div className="space-y-3 mb-6">
                            {currentMode.mockup.items.map((item, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                                className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                              >
                                <div>
                                  <div className="font-medium text-white">{item.name}</div>
                                  <div className="text-sm text-gray-400">Qty: {item.qty}</div>
                                </div>
                                <div className="font-bold text-[#FF5A5F]">Rp {item.price}</div>
                              </motion.div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[#FF5A5F] to-orange-500">
                            <span className="font-bold text-white">{t.dualMode?.modes.sales.mockup.total}</span>
                            <span className="text-2xl font-bold text-white">Rp {currentMode.mockup.total}</span>
                          </div>
                        </>
                      )}

                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 }}
                        className="w-full mt-4 py-3 rounded-xl bg-white text-gray-900 font-bold"
                      >
                        {t.dualMode?.modes.sales.mockup.process}
                      </motion.button>
                    </>
                  ) : (
                    <>
                      {/* Dashboard Mode Mockup - Enhanced for Owners */}
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h4 className="text-lg font-bold text-white">
                            {currentMode.mockup.title}
                          </h4>
                          <p className="text-xs text-gray-400 mt-1">
                            {t.dualMode?.modes.dashboard.mockup.update}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                          <span className="text-xs text-gray-400">Live</span>
                        </div>
                      </div>

                      {/* Health Score Circle - Dashboard Only */}
                      {activeMode === "dashboard" && "healthScore" in currentMode.mockup && (
                        <>
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="relative w-32 h-32 mx-auto mb-6"
                      >
                        <svg className="w-32 h-32 transform -rotate-90">
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            className="text-white/10"
                          />
                          <motion.circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="url(#dashboardGradient)"
                            strokeWidth="8"
                            fill="none"
                            strokeLinecap="round"
                            initial={{ strokeDasharray: "0 352" }}
                            animate={{ strokeDasharray: `${(currentMode.mockup.healthScore / 100) * 352} 352` }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                          />
                          <defs>
                            <linearGradient id="dashboardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#3B82F6" />
                              <stop offset="100%" stopColor="#8B5CF6" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <motion.div
                            className="text-3xl font-bold text-white"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                          >
                            {currentMode.mockup.healthScore}
                          </motion.div>
                          <span className="text-xs text-green-400 font-semibold">
                            {t.dualMode?.modes.dashboard.mockup.healthy}
                          </span>
                        </div>
                      </motion.div>

                      {/* Key Metrics */}
                      <div className="space-y-2 mb-4">
                        {currentMode.mockup.metrics.map((metric, index) => {
                          const MetricIcon = metric.icon
                          return (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                              className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                            >
                              <div className="flex items-center gap-2">
                                <MetricIcon className={`w-4 h-4 ${metric.color}`} />
                                <span className="text-sm text-gray-400">
                                  {metric.label}
                                </span>
                              </div>
                              <div className="text-right">
                                <div className={`text-sm font-bold ${metric.color}`}>
                                  {metric.value}
                                </div>
                                {metric.subtitle && (
                                  <div className="text-xs text-gray-500">
                                    {metric.subtitle}
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )
                        })}
                      </div>

                      {/* AI Insights */}
                      <div className="space-y-2">
                        {currentMode.mockup.insights.map((insight, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                            className={`flex items-start gap-2 p-3 rounded-lg ${
                              insight.type === 'success' 
                                ? 'bg-green-500/10 border border-green-500/20' 
                                : 'bg-yellow-500/10 border border-yellow-500/20'
                            }`}
                          >
                            {insight.type === 'success' ? (
                              <TrendingUp className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                            )}
                            <span className="text-xs text-gray-300">
                              {insight.text}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                        </>
                      )}

                      {/* AI Badge */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                        className="flex items-center justify-center gap-2 mt-4 py-2 px-3 rounded-full bg-purple-500/10 border border-purple-500/20"
                      >
                        <Sparkles className="w-3 h-3 text-purple-400" />
                        <span className="text-xs text-purple-300">
                          {t.dualMode?.modes.dashboard.mockup.aiPowered}
                        </span>
                      </motion.div>
                    </>
                  )}
                </div>
              </div>

              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${currentMode.gradient} opacity-20 blur-2xl -z-10`} />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  )
}
