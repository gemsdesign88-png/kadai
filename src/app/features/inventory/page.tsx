"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

export default function InventoryFeaturePage() {
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full mb-6">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-sm font-bold text-emerald-700">Inventory Control</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                {language === "en" ? "Smart Inventory Control" : "Kontrol Stok Cerdas"}
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {language === "en"
                  ? "Monitor ingredient stock in real-time with automatic low-stock notifications and smart reorder suggestions."
                  : "Monitor stok bahan baku real-time dengan notifikasi otomatis saat stok menipis dan saran reorder cerdas."}
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
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-green-100 rounded-3xl"></div>
              <div className="relative p-8">
                <div className="bg-white rounded-2xl p-6 shadow-2xl">
                  <h3 className="font-bold text-gray-900 mb-4">Stock Inventory</h3>
                  {[
                    {name: "Beras", stock: 45, unit: "kg", status: "good"},
                    {name: "Ayam", stock: 12, unit: "kg", status: "low"},
                    {name: "Minyak", stock: 28, unit: "L", status: "good"}
                  ].map((item, i) => (
                    <div key={i} className="mb-3 p-4 bg-emerald-50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-gray-900">{item.name}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          item.status === 'low' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {item.stock} {item.unit}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className={`h-2 rounded-full ${
                          item.status === 'low' ? 'bg-red-500 w-1/4' : 'bg-green-500 w-3/4'
                        }`}></div>
                      </div>
                    </div>
                  ))}
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
                title: language === "en" ? "Real-Time Tracking" : "Tracking Real-Time",
                desc: language === "en" 
                  ? "Monitor stock levels in real-time with automatic updates"
                  : "Monitor level stok real-time dengan update otomatis"
              },
              {
                title: language === "en" ? "Low Stock Alerts" : "Alert Stok Menipis",
                desc: language === "en"
                  ? "Get automatic notifications when stock reaches minimum level"
                  : "Dapatkan notifikasi otomatis saat stok mencapai level minimum"
              },
              {
                title: language === "en" ? "Waste Management" : "Manajemen Waste",
                desc: language === "en"
                  ? "Track and reduce food waste with detailed reporting"
                  : "Track dan kurangi food waste dengan laporan detail"
              },
              {
                title: language === "en" ? "Supplier Management" : "Manajemen Supplier",
                desc: language === "en"
                  ? "Manage supplier contacts and purchase orders efficiently"
                  : "Kelola kontak supplier dan purchase order secara efisien"
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
