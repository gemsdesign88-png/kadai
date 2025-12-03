"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { MockupCarousel } from "@/components/ui/mockup-carousel"
import {
  OrdersListMockup,
  OrderDetailMockup,
  NewOrderMockup,
  KitchenDisplayMockup,
} from "@/components/mockups/orders-mockups"

export default function OrdersFeaturePage() {
  const { language } = useLanguage()
  
  const orderMockups = [
    OrdersListMockup,
    OrderDetailMockup,
    NewOrderMockup,
    KitchenDisplayMockup,
  ]

  return (
    <main className="bg-white">
      {/* Hero Section */}
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-6">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-sm font-bold text-red-700">Order Management</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                {language === "en" ? "Real-Time Order Management" : "Kelola Pesanan Real-Time"}
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {language === "en"
                  ? "Monitor all orders in one dashboard. Track status from pending to completed with instant notifications to kitchen and cashier."
                  : "Pantau semua pesanan dalam satu dashboard. Track status dari pending hingga completed dengan notifikasi instant ke dapur dan kasir."}
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
            >
              <MockupCarousel
                mockups={orderMockups}
                color="#FF5A5F"
                language={language}
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <Container>
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
            {language === "en" ? "Key Features" : "Fitur Utama"}
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: language === "en" ? "Live Order Tracking" : "Track Order Live",
                desc: language === "en" 
                  ? "Monitor all orders in real-time with instant status updates"
                  : "Monitor semua order real-time dengan update status instant"
              },
              {
                title: language === "en" ? "Multi-Table Support" : "Dukungan Multi-Meja",
                desc: language === "en"
                  ? "Manage multiple tables simultaneously with ease"
                  : "Kelola banyak meja sekaligus dengan mudah"
              },
              {
                title: language === "en" ? "Kitchen Integration" : "Integrasi Dapur",
                desc: language === "en"
                  ? "Automatic notifications sent directly to kitchen display"
                  : "Notifikasi otomatis langsung ke display dapur"
              },
              {
                title: language === "en" ? "Order History" : "Riwayat Pesanan",
                desc: language === "en"
                  ? "Complete order history with detailed tracking"
                  : "Riwayat order lengkap dengan tracking detail"
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
