"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { useLanguage } from "@/lib/i18n/context"
import { Quote, Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Bu Sari",
    business: "Warung Makan Sederhana",
    location: "Jakarta",
    quote: {
      id: "KadaiPOS bikin saya lebih fokus ke masakan, nggak ribet lagi ngitung-ngitung manual. Pelanggan juga senang karena transaksi lebih cepat!",
      en: "KadaiPOS lets me focus on cooking, no more manual calculations. Customers are happy because transactions are faster!"
    },
    color: "#FFE8E9",
    borderColor: "#FF5A5F",
    rating: 5
  },
  {
    id: 2,
    name: "Pak Budi",
    business: "Toko Kelontong Makmur",
    location: "Bandung",
    quote: {
      id: "Stok barang selalu terkontrol, nggak pernah kehabisan barang lagi. Laporan penjualan juga jelas, mantap!",
      en: "Stock is always monitored, never run out of goods again. Sales reports are clear too, excellent!"
    },
    color: "#E6F9F5",
    borderColor: "#00D4AA",
    rating: 5
  },
  {
    id: 3,
    name: "Mbak Dina",
    business: "Kafe Kopi Nusantara",
    location: "Yogyakarta",
    quote: {
      id: "Tim support-nya ramah banget, selalu siap bantu. KadaiPOS cocok banget buat bisnis kecil kayak punya saya!",
      en: "The support team is very friendly, always ready to help. KadaiPOS is perfect for small businesses like mine!"
    },
    color: "#F0E6FF",
    borderColor: "#8B5CF6",
    rating: 5
  }
]

export function Testimonials() {
  const { language, t } = useLanguage()

  return (
    <section className="py-20 sm:py-32 relative overflow-hidden">
      {/* Animated Background - Same as cross-platform section */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF5A5F]/20 via-[#8B5CF6]/20 to-[#3B82F6]/20" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      
      {/* Floating Orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#FF5A5F]/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#8B5CF6]/30 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#3B82F6]/20 rounded-full blur-3xl" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            bounce: 0.4 
          }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8">
            <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-sm font-bold text-white">
              {t.cta.launchSpecialOffer}
            </span>
          </div>
          
          {/* Heading */}
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
              {t.cta.readyToTransform}
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#FF5A5F] to-[#E8484D] bg-clip-text text-transparent">
              {t.cta.yourBusiness}
            </span>
          </h2>
          
          {/* Description */}
          <p className="text-xl sm:text-2xl leading-relaxed text-gray-400 max-w-3xl mx-auto mb-12">
            {t.cta.futureOfRestaurant}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="/demo"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center text-base md:text-lg px-10 md:px-12 py-5 md:py-6 bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] hover:from-[#E8484D] hover:to-[#7C3AED] text-white rounded-full font-bold shadow-2xl shadow-[#FF5A5F]/30 transition-all group"
            >
              {t.cta.startFreeTrial}
              <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.a>
            
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center text-base md:text-lg px-10 md:px-12 py-5 md:py-6 bg-white/5 hover:bg-white/10 border-2 border-white/20 hover:border-white/30 text-white rounded-full font-bold backdrop-blur-xl transition-all"
            >
              {t.cta.contactSales}
            </motion.a>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-center">
            <div className="px-6">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">13+</div>
              <div className="text-sm text-gray-500">{t.cta.features}</div>
            </div>
            <div className="px-6">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                <span className="bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent">Real-time</span>
              </div>
              <div className="text-sm text-gray-500">{t.cta.dataSync}</div>
            </div>
            <div className="px-6">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-gray-500">{t.cta.support}</div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
