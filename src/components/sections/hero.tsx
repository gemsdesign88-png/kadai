"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { useLanguage } from "@/lib/i18n/context"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function Hero() {
  const { t, language } = useLanguage()
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF5A5F] rounded-full blur-[128px] opacity-20"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[128px] opacity-20"
        />
      </div>
      
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
      
      <Container className="relative z-10 text-center px-4 py-20">
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight leading-tight"
        >
          <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
            Kadai
          </span>
        </motion.h1>
        
        {/* Tagline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 text-white max-w-4xl mx-auto leading-tight"
        >
          {t.hero.heading}
        </motion.h2>
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          {t.hero.tagline}
        </motion.p>
        
        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Link 
            href="/demo"
            className="inline-flex items-center justify-center text-base md:text-lg px-10 py-5 bg-gradient-to-r from-[#FF5A5F] to-purple-600 hover:from-[#E8484D] hover:to-purple-700 text-white rounded-full font-semibold shadow-2xl shadow-[#FF5A5F]/30 transition-all hover:scale-105 active:scale-95 group"
          >
            {t.hero.watchDemo}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link 
            href="/contact"
            className="inline-flex items-center justify-center text-base md:text-lg px-10 py-5 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white rounded-full font-semibold backdrop-blur-xl transition-all hover:scale-105 active:scale-95"
          >
            {t.hero.contactUs}
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}