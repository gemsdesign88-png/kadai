"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { QRMenuDisplayMockup, QRMenuCustomerMockup, QROrderCartMockup, QRAnalyticsMockup } from "@/components/mockups/qr-mockups"
import { MockupCarousel } from "@/components/ui/mockup-carousel"


export default function QRMenuFeaturePage() {
  const { language } = useLanguage()
  const qrmenuMockups = [
    QRMenuDisplayMockup, QRMenuCustomerMockup, QROrderCartMockup, QRAnalyticsMockup
  ]


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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 rounded-full mb-6">
                <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                <span className="text-sm font-bold text-cyan-700">QR Menu</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                {language === "en" ? "Digital QR Menu" : "QR Menu Digital"}
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {language === "en"
                  ? "Customers scan QR code at table to view menu and order directly without physical contact or waiting for staff."
                  : "Pelanggan scan QR di meja untuk lihat menu dan order langsung tanpa kontak fisik atau menunggu staff."}
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
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-3xl"></div>
              <div className="relative p-8">
                <MockupCarousel mockups={qrmenuMockups} color="#8B5CF6" language={language} />
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
                title: language === "en" ? "Contactless Ordering" : "Order Tanpa Kontak",
                desc: language === "en" 
                  ? "Customers order directly from their phones, no app download needed"
                  : "Pelanggan order langsung dari HP, tanpa perlu download app"
              },
              {
                title: language === "en" ? "Real-Time Menu" : "Menu Real-Time",
                desc: language === "en"
                  ? "Menu updates automatically when you make changes in the system"
                  : "Menu update otomatis saat Anda ubah di sistem"
              },
              {
                title: language === "en" ? "Multi-Language" : "Multi-Bahasa",
                desc: language === "en"
                  ? "Support multiple languages for international customers"
                  : "Dukung berbagai bahasa untuk pelanggan internasional"
              },
              {
                title: language === "en" ? "Image Gallery" : "Galeri Gambar",
                desc: language === "en"
                  ? "Showcase menu items with high-quality food photography"
                  : "Tampilkan item menu dengan fotografi makanan berkualitas tinggi"
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
