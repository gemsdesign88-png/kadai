"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

export default function AnalyticsFeaturePage() {
  const { language } = useLanguage()

  return (
    <main className="bg-white">
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <Container>
          <Link 
            href="/features"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#FF5A5F] mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === "en" ? "Back to Features" : "Kembali ke Fitur"}
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-full mb-6">
                <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                <span className="text-sm font-bold text-teal-700">Analytics & Insights</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                {language === "en" ? "Analytics & Insights" : "Analytics & Insights"}
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {language === "en"
                  ? "Get deep insights about your business performance with comprehensive analytics dashboard and real-time reporting."
                  : "Dapatkan insights mendalam tentang performa bisnis dengan dashboard analytics komprehensif dan laporan real-time."}
              </p>

              <Link href="/demo">
                <Button size="lg" className="bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] hover:from-[#E8484D] hover:to-[#7C3AED] text-white rounded-full px-8 py-6 text-lg font-bold shadow-xl">
                  {language === "en" ? "Try Demo" : "Coba Demo"}
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-square"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-3xl"></div>
              <div className="relative p-8">
                <div className="bg-white rounded-2xl p-6 shadow-2xl">
                  <h3 className="font-bold text-gray-900 mb-4">Sales Dashboard</h3>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 bg-teal-50 rounded-xl">
                      <div className="text-xs text-gray-600 mb-1">Today</div>
                      <div className="text-2xl font-bold text-teal-600">Rp 8.5M</div>
                    </div>
                    <div className="p-3 bg-cyan-50 rounded-xl">
                      <div className="text-xs text-gray-600 mb-1">Orders</div>
                      <div className="text-2xl font-bold text-cyan-600">142</div>
                    </div>
                  </div>
                  <div className="h-32 bg-gradient-to-t from-teal-100 to-transparent rounded-xl flex items-end justify-around p-3">
                    {[40, 65, 45, 80, 55, 70].map((h, i) => (
                      <div key={i} className="w-8 bg-gradient-to-t from-teal-500 to-teal-400 rounded-t" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
            {language === "en" ? "Key Features" : "Fitur Utama"}
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: language === "en" ? "Sales Dashboard" : "Dashboard Penjualan",
                desc: language === "en" 
                  ? "Real-time sales tracking with interactive charts and graphs"
                  : "Tracking penjualan real-time dengan chart dan grafik interaktif"
              },
              {
                title: language === "en" ? "Best Sellers Report" : "Laporan Best Seller",
                desc: language === "en"
                  ? "Identify your top-performing menu items and optimize inventory"
                  : "Identifikasi menu terlaris dan optimalkan inventory"
              },
              {
                title: language === "en" ? "Revenue Tracking" : "Tracking Pendapatan",
                desc: language === "en"
                  ? "Monitor daily, weekly, and monthly revenue trends"
                  : "Monitor tren pendapatan harian, mingguan, dan bulanan"
              },
              {
                title: language === "en" ? "Customer Insights" : "Insight Pelanggan",
                desc: language === "en"
                  ? "Understand customer behavior and preferences"
                  : "Pahami perilaku dan preferensi pelanggan"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4"
              >
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  )
}
