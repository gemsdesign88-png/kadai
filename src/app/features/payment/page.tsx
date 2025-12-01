"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

export default function PaymentFeaturePage() {
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-full mb-6">
                <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                <span className="text-sm font-bold text-pink-700">Payment System</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                {language === "en" ? "Multi-Method Payment" : "Pembayaran Multi-Metode"}
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {language === "en"
                  ? "Accept payments with various methods: cash, QRIS, debit, credit card, and transfer with automatic split bill functionality."
                  : "Terima pembayaran dengan berbagai metode: cash, QRIS, debit, credit card, dan transfer dengan split bill otomatis."}
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
              <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-rose-100 rounded-3xl"></div>
              <div className="relative p-8">
                <div className="bg-white rounded-2xl p-6 shadow-2xl">
                  <h3 className="font-bold text-gray-900 mb-4">Payment Methods</h3>
                  <div className="space-y-3 mb-4">
                    <div className="p-3 bg-pink-50 rounded-xl flex items-center justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="text-xl font-bold text-pink-600">Rp 125.000</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {["Cash", "QRIS", "Debit", "Transfer"].map((method, i) => (
                      <div key={i} className="p-3 bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 rounded-xl text-center font-semibold text-sm hover:border-pink-400 transition-colors cursor-pointer">
                        {method}
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl">Process Payment</button>
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
                title: language === "en" ? "QRIS Integration" : "Integrasi QRIS",
                desc: language === "en" 
                  ? "Accept all e-wallet payments through QRIS standard"
                  : "Terima semua e-wallet melalui standar QRIS"
              },
              {
                title: language === "en" ? "Split Bill" : "Split Bill",
                desc: language === "en"
                  ? "Divide bills easily among multiple customers"
                  : "Bagi tagihan dengan mudah untuk beberapa pelanggan"
              },
              {
                title: language === "en" ? "Multiple Payments" : "Pembayaran Ganda",
                desc: language === "en"
                  ? "Accept combination of different payment methods in one transaction"
                  : "Terima kombinasi berbagai metode pembayaran dalam satu transaksi"
              },
              {
                title: language === "en" ? "Auto Reconciliation" : "Rekonsiliasi Otomatis",
                desc: language === "en"
                  ? "Automatic payment reconciliation and reporting"
                  : "Rekonsiliasi dan pelaporan pembayaran otomatis"
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
