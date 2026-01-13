"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { useLanguage } from "@/lib/i18n/context"
import { ShoppingBag, UtensilsCrossed, Wrench } from "lucide-react"

export function FinalCTA() {
  const { language, t } = useLanguage()

  return (
    <section className="pt-20 sm:pt-32 pb-32 sm:pb-48 relative overflow-hidden">
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
              {t.cta?.launchSpecialOffer}
            </span>
          </div>
          
          {/* Heading */}
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
              {t.cta?.readyToTransform}
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#FF5A5F] to-[#E8484D] bg-clip-text text-transparent">
              {t.cta?.yourBusiness}
            </span>
          </h2>
          
          {/* Description */}
          <p className="text-xl sm:text-2xl leading-relaxed text-gray-400 max-w-3xl mx-auto mb-12">
            {t.cta?.futureOfBusiness}
          </p>

          {/* Business types indicator */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { icon: ShoppingBag, label: t.cta?.retail, color: "text-blue-400" },
              { icon: UtensilsCrossed, label: t.cta?.fnb, color: "text-orange-400" },
              { icon: Wrench, label: t.cta?.services, color: "text-purple-400" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
              >
                <item.icon className={`w-4 h-4 ${item.color}`} />
                <span className="text-sm font-medium text-gray-300">{item.label}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="/register"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center text-base md:text-lg px-10 md:px-12 py-5 md:py-6 bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] hover:from-[#E8484D] hover:to-[#7C3AED] text-white rounded-full font-bold shadow-2xl shadow-[#FF5A5F]/30 transition-all group"
            >
              {t.cta?.startFreeTrial}
              <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.a>
            
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center text-base md:text-lg px-10 md:px-12 py-5 md:py-6 bg-white/5 hover:bg-white/10 border-2 border-white/20 hover:border-white/30 text-white rounded-full font-bold backdrop-blur-xl transition-all"
            >
              {t.cta?.contactSales}
            </motion.a>
          </div>

          {/* Stats / Value Props */}
          <div className="mt-16 pt-12 border-t border-white/10 flex flex-wrap justify-center gap-8 md:gap-16 text-center">
            <div className="px-4">
              <div className="text-3xl md:text-4xl font-black text-white mb-1">∞</div>
              <div className="text-sm font-bold uppercase tracking-wider text-gray-500">{t.cta?.features}</div>
            </div>
            <div className="px-4">
              <div className="text-3xl md:text-4xl font-black text-white mb-1">
                <span className="bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent italic">All-in-One</span>
              </div>
              <div className="text-sm font-bold uppercase tracking-wider text-gray-500">{t.cta?.dataSync}</div>
            </div>
            <div className="px-4">
              <div className="text-3xl md:text-4xl font-black text-white mb-1">24/7</div>
              <div className="text-sm font-bold uppercase tracking-wider text-gray-500">{t.cta?.support}</div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

