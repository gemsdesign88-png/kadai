"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

export default function PromoFeaturePage() {
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 rounded-full mb-6">
                <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                <span className="text-sm font-bold text-rose-700">Promo & Campaign</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                {language === "en" ? "Promo & Campaign Manager" : "Promo & Campaign Manager"}
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {language === "en"
                  ? "Create and manage vouchers, coupons, and bundles to increase repeat orders and boost customer loyalty."
                  : "Buat dan kelola voucher, kupon, dan bundling untuk tingkatkan repeat orders dan boost loyalitas pelanggan."}
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
              <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-red-100 rounded-3xl"></div>
              <div className="relative p-8">
                <div className="bg-white rounded-2xl p-6 shadow-2xl">
                  <h3 className="font-bold text-gray-900 mb-4">Active Promos</h3>
                  {[
                    {name: "Happy Hour", discount: "25%", time: "14:00-17:00"},
                    {name: "Paket Hemat", discount: "Rp 15k", time: "All Day"},
                    {name: "Buy 2 Get 1", discount: "Free", time: "Weekend"}
                  ].map((promo, i) => (
                    <div key={i} className="mb-3 p-4 bg-gradient-to-r from-rose-50 to-red-50 border-2 border-rose-200 rounded-xl">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-gray-900">{promo.name}</span>
                        <span className="px-3 py-1 bg-rose-500 text-white rounded-full text-xs font-bold">
                          {promo.discount}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">{promo.time}</div>
                    </div>
                  ))}
                  <button className="w-full mt-3 py-2 bg-gradient-to-r from-rose-500 to-red-500 text-white rounded-xl font-bold text-sm">Create New Promo</button>
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
                title: language === "en" ? "Flexible Discounts" : "Diskon Fleksibel",
                desc: language === "en" 
                  ? "Create percentage or fixed amount discounts for items or orders"
                  : "Buat diskon persentase atau nominal tetap untuk item atau order"
              },
              {
                title: language === "en" ? "Bundle Deals" : "Paket Bundling",
                desc: language === "en"
                  ? "Create special bundle packages to increase average order value"
                  : "Buat paket bundling spesial untuk tingkatkan nilai order rata-rata"
              },
              {
                title: language === "en" ? "Time-Based Promos" : "Promo Berbasis Waktu",
                desc: language === "en"
                  ? "Schedule promotions for specific days, hours, or happy hours"
                  : "Jadwalkan promosi untuk hari, jam, atau happy hour tertentu"
              },
              {
                title: language === "en" ? "Coupon Codes" : "Kode Kupon",
                desc: language === "en"
                  ? "Generate unique coupon codes for marketing campaigns"
                  : "Generate kode kupon unik untuk kampanye marketing"
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
