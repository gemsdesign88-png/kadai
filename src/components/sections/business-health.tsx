"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Activity, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import Link from "next/link"
import { BusinessHealthDemo } from "@/components/features/business-health-demo"

export function BusinessHealth() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden pt-20">
      {/* Animated pulse background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full blur-[128px]"
        />
      </div>
      
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />

      <Container className="relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-white/10 backdrop-blur-xl mb-6">
            <Activity className="w-4 h-4 text-green-400" />
            <span className="text-sm font-semibold text-white">
              {t.businessHealth?.badge}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
              {t.businessHealth?.title}
            </span>
          </h1>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t.businessHealth?.subtitle}
            <br />
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t.businessHealth?.highlight}
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            {t.businessHealth?.description}
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Link 
              href="/demo"
              className="inline-flex items-center justify-center text-base md:text-lg px-10 py-5 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white rounded-full font-semibold shadow-2xl shadow-green-500/30 transition-all hover:scale-105 active:scale-95 group"
            >
              {t.businessHealth?.watchDemo}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center text-base md:text-lg px-10 py-5 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white rounded-full font-semibold backdrop-blur-xl transition-all hover:scale-105 active:scale-95"
            >
              {t.businessHealth?.contactUs}
            </Link>
          </motion.div>
        </motion.div>

        {/* Business Health Demo Component */}
        <BusinessHealthDemo />

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-16"
        >
          {(t.businessHealth?.stats || []).map((stat: any, index: number) => (
            <div 
              key={index} 
              className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
