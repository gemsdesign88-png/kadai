"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { StaffListMockup, StaffDetailMockup, AttendanceMockup, PerformanceMockup } from "@/components/mockups/staff-mockups"
import { MockupCarousel } from "@/components/ui/mockup-carousel"


export default function StaffFeaturePage() {
  const { language } = useLanguage()
  const staffMockups = [
    StaffListMockup, StaffDetailMockup, AttendanceMockup, PerformanceMockup
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full mb-6">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <span className="text-sm font-bold text-amber-700">Team Management</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                {language === "en" ? "Efficient Team Management" : "Manajemen Tim Efisien"}
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {language === "en"
                  ? "Manage team with role-based access control and track performance for each employee with detailed reports."
                  : "Kelola tim dengan role-based access control dan track performa setiap karyawan dengan laporan detail."}
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
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl"></div>
              <div className="relative p-8">
                <MockupCarousel mockups={staffMockups} color="#FFB020" language={language} />
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
                title: language === "en" ? "Role-Based Access" : "Akses Berbasis Role",
                desc: language === "en" 
                  ? "Define custom roles and permissions for different staff levels"
                  : "Tentukan role dan permission custom untuk berbagai level staff"
              },
              {
                title: language === "en" ? "Shift Management" : "Manajemen Shift",
                desc: language === "en"
                  ? "Schedule and track employee shifts efficiently"
                  : "Jadwalkan dan track shift karyawan secara efisien"
              },
              {
                title: language === "en" ? "Performance Tracking" : "Tracking Performa",
                desc: language === "en"
                  ? "Monitor individual performance with detailed metrics"
                  : "Monitor performa individu dengan metrik detail"
              },
              {
                title: language === "en" ? "Clock In/Out System" : "Sistem Absensi",
                desc: language === "en"
                  ? "Track attendance with integrated clock in/out system"
                  : "Track kehadiran dengan sistem absensi terintegrasi"
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
