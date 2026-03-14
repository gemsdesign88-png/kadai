"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { useLanguage } from "@/lib/i18n/context"
import { CircularOptionA } from "@/components/ecosystem/circular-option-a"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function EcosystemHero() {
  const { t } = useLanguage()

  return (
    <section className="relative md:min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden py-16 md:py-20">
      {/* Top content */}
      <Container className="relative z-10 text-center mb-6 md:mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-400/20 backdrop-blur-xl mb-4 md:mb-6">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-semibold text-green-400">
              {t.ecosystemHero?.badge || "Complete Ecosystem"}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 tracking-tight px-4">
            {t.ecosystemHero?.title || "Ekosistem"}{" "}
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
              {t.ecosystemHero?.highlight || "Kadai"}
            </span>
          </h1>

          <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            {t.ecosystemHero?.subtitle || "Platform satu pintu untuk segala jenis bisnis"}
          </p>
        </motion.div>
      </Container>

      {/* Ecosystem visualization - Desktop only */}
      <div className="hidden md:flex w-full flex-1 items-center justify-center">
        <CircularOptionA />
      </div>

      {/* Mobile: Enhanced card grid */}
      <div className="md:hidden w-full px-4 my-8">
        <div className="space-y-4 max-w-md mx-auto">
          {[
            { 
              name: "Customer", 
              icon: "👥",
              tagline: "Loyalty & Engagement",
              color: "from-purple-500 to-pink-500", 
              href: "/business/customer",
              border: "border-purple-400/30"
            },
            { 
              name: "Toko", 
              icon: "🏪",
              tagline: "Retail & Small Business",
              color: "from-blue-500 to-cyan-500", 
              href: "/business/toko",
              border: "border-blue-400/30"
            },
            { 
              name: "Resto", 
              icon: "🍽️",
              tagline: "Restaurant & Cafe",
              color: "from-orange-500 to-red-500", 
              href: "/business/resto",
              border: "border-orange-400/30"
            },
            { 
              name: "Preppo", 
              icon: "👨‍🍳",
              tagline: "Central Kitchen",
              color: "from-yellow-500 to-orange-500", 
              href: "/business/preppo",
              border: "border-yellow-400/30"
            },
            { 
              name: "Depo", 
              icon: "📦",
              tagline: "Warehouse & Distributor",
              color: "from-green-500 to-emerald-500", 
              href: "/business/depo",
              border: "border-green-400/30"
            },
            { 
              name: "Pro", 
              icon: "💼",
              tagline: "Service Business",
              color: "from-indigo-500 to-purple-500", 
              href: "/business/pro",
              border: "border-indigo-400/30"
            },
          ].map((item, idx) => (
            <Link key={idx} href={item.href}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-6 rounded-2xl bg-gradient-to-br ${item.color} shadow-xl border ${item.border} backdrop-blur-sm overflow-hidden group`}
              >
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-active:opacity-100 transition-opacity" />
                
                {/* Shimmer effect */}
                <div className="absolute -inset-full group-active:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                
                <div className="relative z-10 flex items-center gap-4">
                  <div className="text-4xl flex-shrink-0 drop-shadow-lg">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg mb-0.5 drop-shadow-md">
                      {item.name}
                    </h3>
                    <p className="text-white/90 text-xs font-medium drop-shadow">
                      {item.tagline}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/70 group-active:translate-x-1 transition-transform flex-shrink-0" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <Container className="relative z-10 text-center mt-6 md:mt-8 mb-8 md:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <p className="text-gray-400 mb-6 text-sm md:text-base">
            <span className="hidden md:inline">{t.ecosystemHero?.ctaText || "Hover untuk melihat relasi. Klik untuk explore lebih lanjut."}</span>
            <span className="md:hidden">Pilih solusi bisnis Anda atau explore semua</span>
          </p>
          
          <Link href="/business">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white rounded-full font-semibold shadow-2xl shadow-green-500/30 transition-all"
            >
              {t.ecosystemHero?.ctaButton || "Explore All Solutions"}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}
