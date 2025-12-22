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
  TablesOverviewMockup,
  TableDetailMockup,
  TableReservationMockup,
  TableMergingMockup,
} from "@/components/mockups/tables-mockups"

export default function TablesFeaturePage() {
  const { language } = useLanguage()
  
  const tableMockups = [
    TablesOverviewMockup,
    TableDetailMockup,
    TableReservationMockup,
    TableMergingMockup,
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span className="text-sm font-bold text-purple-700">Table System</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                {language === "en" ? "Smart Table System" : "Sistem Meja Pintar"}
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {language === "en"
                  ? "Monitor table status in real-time. Optimize layout to maximize capacity and improve customer flow."
                  : "Monitor status meja real-time. Optimasi layout untuk maksimalkan kapasitas dan tingkatkan alur pelanggan."}
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
                mockups={tableMockups}
                color="#8B5CF6"
                language={language}
              />
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
                title: language === "en" ? "Visual Floor Plan" : "Floor Plan Visual",
                desc: language === "en" 
                  ? "See your entire floor layout with real-time table status"
                  : "Lihat seluruh layout lantai dengan status meja real-time"
              },
              {
                title: language === "en" ? "Table Merging" : "Gabung Meja",
                desc: language === "en"
                  ? "Easily merge tables for large parties and groups"
                  : "Gabungkan meja dengan mudah untuk grup besar"
              },
              {
                title: language === "en" ? "Reservation System" : "Sistem Reservasi",
                desc: language === "en"
                  ? "Manage table reservations and waitlist efficiently"
                  : "Kelola reservasi meja dan waitlist secara efisien"
              },
              {
                title: language === "en" ? "Turn Time Tracking" : "Tracking Waktu",
                desc: language === "en"
                  ? "Monitor average turn time to optimize table rotation"
                  : "Monitor waktu rata-rata untuk optimasi rotasi meja"
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
