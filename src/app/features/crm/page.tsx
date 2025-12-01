"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

export default function CRMFeaturePage() {
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 rounded-full mb-6">
                <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                <span className="text-sm font-bold text-sky-700">Customer Relationship</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                {language === "en" ? "Customer Relationship" : "Customer Relationship"}
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {language === "en"
                  ? "Manage customer database and give loyalty rewards to improve retention and build lasting relationships."
                  : "Kelola database pelanggan dan berikan loyalty rewards untuk tingkatkan retention dan bangun hubungan jangka panjang."}
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
              <div className="absolute inset-0 bg-gradient-to-br from-sky-100 to-blue-100 rounded-3xl"></div>
              <div className="relative p-8">
                <div className="bg-white rounded-2xl p-6 shadow-2xl">
                  <h3 className="font-bold text-gray-900 mb-4">Top Customers</h3>
                  {[
                    {name: "Andi S.", points: 2450, tier: "Gold", visits: 24},
                    {name: "Budi W.", points: 1890, tier: "Silver", visits: 18},
                    {name: "Citra M.", points: 3200, tier: "Platinum", visits: 32}
                  ].map((customer, i) => (
                    <div key={i} className="mb-3 p-4 bg-sky-50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-sky-300 rounded-full flex items-center justify-center font-bold text-white">
                            {customer.name[0]}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">{customer.name}</div>
                            <div className="text-xs text-gray-600">{customer.visits} visits</div>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          customer.tier === 'Platinum' ? 'bg-purple-100 text-purple-700' :
                          customer.tier === 'Gold' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {customer.tier}
                        </span>
                      </div>
                      <div className="text-sm text-sky-600 font-semibold">{customer.points} points</div>
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
                title: language === "en" ? "Customer Database" : "Database Pelanggan",
                desc: language === "en" 
                  ? "Store customer contact info, preferences, and order history"
                  : "Simpan info kontak, preferensi, dan riwayat order pelanggan"
              },
              {
                title: language === "en" ? "Loyalty Points" : "Poin Loyalitas",
                desc: language === "en"
                  ? "Reward repeat customers with points and redemption system"
                  : "Beri reward pelanggan setia dengan poin dan sistem penukaran"
              },
              {
                title: language === "en" ? "Member Tiers" : "Tingkat Member",
                desc: language === "en"
                  ? "Create VIP tiers with exclusive benefits and perks"
                  : "Buat tingkat VIP dengan benefit dan keuntungan eksklusif"
              },
              {
                title: language === "en" ? "Purchase History" : "Riwayat Pembelian",
                desc: language === "en"
                  ? "View complete purchase history for personalized service"
                  : "Lihat riwayat pembelian lengkap untuk layanan personal"
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
