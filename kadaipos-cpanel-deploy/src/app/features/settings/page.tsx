"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { GeneralSettingsMockup, RestaurantInfoMockup, UserProfileMockup, IntegrationsMockup } from "@/components/mockups/settings-mockups"
import { MockupCarousel } from "@/components/ui/mockup-carousel"


export default function SettingsFeaturePage() {
  const { language } = useLanguage()
  const settingsMockups = [
    GeneralSettingsMockup, RestaurantInfoMockup, UserProfileMockup, IntegrationsMockup
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full mb-6">
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                <span className="text-sm font-bold text-indigo-700">Settings</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                {language === "en" ? "Complete Settings" : "Pengaturan Lengkap"}
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {language === "en"
                  ? "Customize system to your business needs with comprehensive configuration options for every aspect of operations."
                  : "Customize sistem sesuai kebutuhan bisnis dengan opsi konfigurasi lengkap untuk setiap aspek operasi."}
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
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl"></div>
              <div className="relative p-8">
                <MockupCarousel mockups={settingsMockups} color="#6366F1" language={language} />
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
                title: language === "en" ? "Business Profile" : "Profil Bisnis",
                desc: language === "en" 
                  ? "Configure store name, logo, contact info, and business hours"
                  : "Konfigurasi nama toko, logo, info kontak, dan jam operasi"
              },
              {
                title: language === "en" ? "Tax Settings" : "Pengaturan Pajak",
                desc: language === "en"
                  ? "Set up multiple tax rates and automatic calculation"
                  : "Setup berbagai tarif pajak dan kalkulasi otomatis"
              },
              {
                title: language === "en" ? "Receipt Customization" : "Kustomisasi Struk",
                desc: language === "en"
                  ? "Customize receipt layout, footer messages, and branding"
                  : "Kustomisasi layout struk, pesan footer, dan branding"
              },
              {
                title: language === "en" ? "Notification Preferences" : "Preferensi Notifikasi",
                desc: language === "en"
                  ? "Control which notifications you receive and when"
                  : "Kontrol notifikasi mana yang Anda terima dan kapan"
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
