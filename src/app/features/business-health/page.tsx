"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { useLanguage } from "@/lib/i18n/context"
import { FinalCTA } from "@/components/sections/final-cta"
import { BusinessHealthDemo } from "@/components/features/business-health-demo"
import { HeartPulse, DollarSign, Package, TrendingUp, Target, Activity, ArrowRight, Sparkles, CheckCircle2, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function BusinessHealthPage() {
  const { language } = useLanguage()

  const t = {
    en: {
      badge: "Business Intelligence",
      title: "Business Health Monitor",
      subtitle: "Monitor Your Business Health in Real-Time",
      description: "Complete financial health analysis with AI-powered insights to help you make better business decisions.",
      metrics: {
        title: "Track 5 Key Health Metrics",
        items: [
          {
            icon: DollarSign,
            title: "Sales Performance",
            desc: "Monitor daily, weekly, and monthly sales with trend analysis and growth predictions.",
            color: "from-green-500 to-emerald-500"
          },
          {
            icon: Package,
            title: "HPP / COGS",
            desc: "Track cost of goods sold automatically. Get alerts when margins drop below targets.",
            color: "from-orange-500 to-red-500"
          },
          {
            icon: TrendingUp,
            title: "OPEX Control",
            desc: "Monitor operational expenses and identify cost optimization opportunities.",
            color: "from-yellow-500 to-amber-500"
          },
          {
            icon: Target,
            title: "Net Profit",
            desc: "Real-time net profit calculations with historical comparisons and forecasting.",
            color: "from-blue-500 to-cyan-500"
          },
          {
            icon: Activity,
            title: "Inventory Health",
            desc: "Track stock levels, expiry alerts, and inventory turnover rates automatically.",
            color: "from-purple-500 to-pink-500"
          }
        ]
      },
      insights: {
        title: "AI-Powered Insights",
        subtitle: "Get Actionable Recommendations",
        items: [
          {
            type: "success",
            title: "Growth Opportunities",
            desc: "AI identifies your best-selling items and optimal pricing strategies."
          },
          {
            type: "warning",
            title: "Cost Optimization",
            desc: "Receive alerts when costs spike and get suggestions to reduce expenses."
          },
          {
            type: "info",
            title: "Predictive Analytics",
            desc: "Forecast sales trends and prepare inventory based on historical patterns."
          }
        ]
      },
      cta: {
        title: "Start Monitoring Your Business Health",
        subtitle: "Get real-time insights and make data-driven decisions",
        button: "Try Free Now",
        demo: "Watch Demo"
      }
    },
    id: {
      badge: "Business Intelligence",
      title: "Monitor Kesehatan Bisnis",
      subtitle: "Monitor Kesehatan Bisnis Anda Secara Real-Time",
      description: "Analisa kesehatan finansial lengkap dengan insights AI untuk membantu Anda membuat keputusan bisnis yang lebih baik.",
      metrics: {
        title: "Track 5 Metrik Kesehatan Utama",
        items: [
          {
            icon: DollarSign,
            title: "Performa Penjualan",
            desc: "Monitor penjualan harian, mingguan, dan bulanan dengan analisa trend dan prediksi pertumbuhan.",
            color: "from-green-500 to-emerald-500"
          },
          {
            icon: Package,
            title: "HPP / COGS",
            desc: "Track harga pokok penjualan otomatis. Dapatkan alert saat margin turun di bawah target.",
            color: "from-orange-500 to-red-500"
          },
          {
            icon: TrendingUp,
            title: "Kontrol OPEX",
            desc: "Monitor biaya operasional dan identifikasi peluang optimasi biaya.",
            color: "from-yellow-500 to-amber-500"
          },
          {
            icon: Target,
            title: "Laba Bersih",
            desc: "Kalkulasi laba bersih real-time dengan perbandingan historis dan forecasting.",
            color: "from-blue-500 to-cyan-500"
          },
          {
            icon: Activity,
            title: "Kesehatan Inventory",
            desc: "Track level stok, alert kadaluarsa, dan tingkat perputaran inventory otomatis.",
            color: "from-purple-500 to-pink-500"
          }
        ]
      },
      insights: {
        title: "Insights Bertenaga AI",
        subtitle: "Dapatkan Rekomendasi yang Actionable",
        items: [
          {
            type: "success",
            title: "Peluang Pertumbuhan",
            desc: "AI identifikasi item terlaris dan strategi harga optimal Anda."
          },
          {
            type: "warning",
            title: "Optimasi Biaya",
            desc: "Terima alert saat biaya naik dan dapatkan saran untuk kurangi pengeluaran."
          },
          {
            type: "info",
            title: "Predictive Analytics",
            desc: "Forecast trend penjualan dan siapkan inventory berdasarkan pola historis."
          }
        ]
      },
      cta: {
        title: "Mulai Monitor Kesehatan Bisnis Anda",
        subtitle: "Dapatkan insights real-time dan buat keputusan berbasis data",
        button: "Coba Gratis Sekarang",
        demo: "Lihat Demo"
      }
    }
  }

  const content = t[language]

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-blue-100 border border-green-200 mb-6">
              <HeartPulse className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-green-800">
                {content.badge}
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-6">
              {content.title}
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {content.subtitle}
              </span>
            </h2>

            <p className="text-lg leading-8 text-gray-600 mb-8">
              {content.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-green-600 to-blue-600 rounded-full hover:from-green-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                {content.cta.button}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-gray-900 bg-white rounded-full border-2 border-gray-200 hover:border-gray-300 transition-all hover:scale-105"
              >
                {content.cta.demo}
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Metrics Section */}
      <section className="relative py-20 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content.metrics.title}
            </h2>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {content.metrics.items.map((metric, index) => {
              const Icon = metric.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="h-full p-8 bg-white rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-all hover:shadow-xl">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${metric.color} mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {metric.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {metric.desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Example Dashboard Section */}
      <section className="relative py-20 bg-black">
        <Container>
          <BusinessHealthDemo />
        </Container>
      </section>

      {/* Insights Section */}
      <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 mb-4">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-purple-800">
                AI Powered
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content.insights.title}
            </h2>
            <p className="text-xl text-gray-600">
              {content.insights.subtitle}
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {content.insights.items.map((insight, index) => {
              const icons = {
                success: CheckCircle2,
                warning: AlertTriangle,
                info: Sparkles
              }
              const colors = {
                success: "from-green-500 to-emerald-500",
                warning: "from-yellow-500 to-orange-500",
                info: "from-blue-500 to-purple-500"
              }
              const Icon = icons[insight.type as keyof typeof icons]
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-white rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-all hover:shadow-lg"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${colors[insight.type as keyof typeof colors]} mb-4`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {insight.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {insight.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-600 to-blue-600">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {content.cta.title}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {content.cta.subtitle}
            </p>
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-green-600 bg-white rounded-full hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              {content.cta.button}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </Container>
      </section>

      <FinalCTA />
    </div>
  )
}
