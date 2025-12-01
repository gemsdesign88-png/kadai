"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

export default function ThemeFeaturePage() {
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 rounded-full mb-6">
                <div className="w-2 h-2 rounded-full bg-violet-500"></div>
                <span className="text-sm font-bold text-violet-700">Interface Theme</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                {language === "en" ? "Custom Interface Theme" : "Tema Interface Custom"}
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {language === "en"
                  ? "Choose from 12 preset theme colors to match your brand identity and create a consistent visual experience."
                  : "Pilih dari 12 warna tema preset untuk sesuaikan dengan identitas brand Anda dan ciptakan pengalaman visual konsisten."}
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
              <div className="absolute inset-0 bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded-3xl"></div>
              <div className="relative p-8">
                <div className="bg-white rounded-2xl p-6 shadow-2xl">
                  <h3 className="font-bold text-gray-900 mb-4">Choose Theme</h3>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[
                      {name: "Red", color: "#EF4444"},
                      {name: "Blue", color: "#3B82F6"},
                      {name: "Green", color: "#10B981"},
                      {name: "Purple", color: "#8B5CF6"},
                      {name: "Pink", color: "#EC4899"},
                      {name: "Orange", color: "#F59E0B"},
                      {name: "Teal", color: "#14B8A6"},
                      {name: "Indigo", color: "#6366F1"},
                      {name: "Yellow", color: "#EAB308"}
                    ].map((theme, i) => (
                      <div key={i} className="aspect-square rounded-xl border-2 border-gray-200 hover:border-gray-400 transition-colors cursor-pointer flex flex-col items-center justify-center p-2">
                        <div className="w-8 h-8 rounded-full mb-1" style={{ backgroundColor: theme.color }}></div>
                        <div className="text-xs font-semibold text-gray-600">{theme.name}</div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-violet-50 rounded-xl">
                    <div className="text-xs text-gray-600 mb-1">Preview</div>
                    <div className="h-16 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg"></div>
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
                title: language === "en" ? "12 Preset Themes" : "12 Tema Preset",
                desc: language === "en" 
                  ? "Choose from carefully selected color schemes for your brand"
                  : "Pilih dari skema warna yang dipilih dengan hati-hati untuk brand Anda"
              },
              {
                title: language === "en" ? "One-Click Apply" : "Apply Satu Klik",
                desc: language === "en"
                  ? "Change your entire interface theme with just one click"
                  : "Ubah seluruh tema interface dengan satu klik saja"
              },
              {
                title: language === "en" ? "Brand Consistency" : "Konsistensi Brand",
                desc: language === "en"
                  ? "Match your POS interface with your brand colors perfectly"
                  : "Sesuaikan interface POS dengan warna brand Anda dengan sempurna"
              },
              {
                title: language === "en" ? "Live Preview" : "Preview Langsung",
                desc: language === "en"
                  ? "See theme changes instantly before applying permanently"
                  : "Lihat perubahan tema langsung sebelum apply permanen"
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
