"use client"

import * as React from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/context"
import { ArrowRight, ShoppingCart, BarChart3, Users, CreditCard, Package, Receipt, TrendingUp, Clock, Zap, Shield, Smartphone } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

const InteractiveDashboard = dynamic(() => import("./interactive-dashboard").then(mod => mod.InteractiveDashboard), {
  ssr: true,
  loading: () => (
    <div className="w-full aspect-[16/10] bg-white/5 rounded-3xl animate-pulse border border-white/10" />
  )
})

export function Hero() {
  const { t, language } = useLanguage()
  const containerRef = React.useRef<HTMLDivElement>(null)
  const heroRef = React.useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  
  // Hero animations
  const heroY = useTransform(smoothProgress, [0, 1], [0, -300])
  const heroOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(smoothProgress, [0, 1], [1, 0.8])
  
  // Dashboard animations
  const dashboardY = useTransform(smoothProgress, [0, 0.3], [0, -100])
  const dashboardScale = useTransform(smoothProgress, [0, 0.2, 0.3], [1, 1, 0.95])
  
  return (
    <div ref={containerRef} className="relative bg-black">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF5A5F] via-[#FF5A5F] to-[#FF5A5F] origin-left z-50"
        style={{ scaleX: smoothProgress }}
      />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
        
        {/* Animated background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_100%)]" />
        
        <Container className="relative z-10">
          <motion.div
            style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
            className="text-center px-4 py-12"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8"
            >
              <Zap className="h-4 w-4 text-[#FF5A5F]" />
              <span className="text-sm font-semibold text-white">
                {t.hero.badge}
              </span>
            </motion.div>
            
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-6xl md:text-6xl lg:text-8xl font-bold mb-6 tracking-tight leading-none"
            >
              <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
                Kadai
              </span>
            </motion.h1>
            
            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-white"
            >
              {t.hero.heading}
            </motion.p>
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-lg md:text-xl text-gray-400 mb-2 max-w-3xl mx-auto font-medium"
            >
              {t.hero.tagline}
            </motion.p>
            {t.hero.realUi && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-base md:text-lg text-gray-300 mb-8 max-w-2xl mx-auto font-normal"
              >
                {t.hero.realUi}
              </motion.p>
            )}
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link 
                href="/demo"
                className="inline-flex items-center justify-center text-base md:text-lg px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] hover:from-[#E8484D] hover:to-[#7C3AED] text-white rounded-full font-semibold shadow-2xl shadow-[#FF5A5F]/20 transition-all hover:scale-105 active:scale-95 group"
              >
                {t.hero.watchDemo}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link 
                href="#features"
                className="inline-flex items-center justify-center text-base md:text-lg px-8 md:px-10 py-4 md:py-5 bg-white/5 hover:bg-white/10 border-2 border-white/20 hover:border-white/30 text-white rounded-full font-semibold backdrop-blur-xl transition-all hover:scale-105 active:scale-95"
              >
                {t.hero.learnMore}
              </Link>
            </motion.div>
            
            {/* Excellence Features - Glass Morphism */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto"
            >
              {[
                { 
                  icon: Zap, 
                  title: t.hero.realtimeSync,
                  color: "#10B981"
                },
                { 
                  icon: Shield, 
                  title: t.hero.secure,
                  color: "#FF5A5F"
                },
                { 
                  icon: Clock, 
                  title: t.hero.support24x7,
                  color: "#EC4899"
                },
                { 
                  icon: Users, 
                  title: t.hero.easyToUse,
                  color: "#F59E0B"
                },
                { 
                  icon: Zap, 
                  title: t.hero.lightningFast,
                  color: "#8B5CF6"
                },
                { 
                  icon: Smartphone, 
                  title: t.hero.multiDevice,
                  color: "#3B82F6"
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-4 md:p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${feature.color}15` }}
                    >
                      <feature.icon className="h-5 w-5 md:h-6 md:w-6" style={{ color: feature.color }} />
                    </div>
                    <span className="text-sm md:text-base font-bold text-white">{feature.title}</span>
                  </div>
                  
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Interactive Dashboard - EXACT replica with sidebar - OUTSIDE fading container */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mt-16"
          >
            <InteractiveDashboard />
          </motion.div>
          
          {/* Dashboard Preview - Real UI - REMOVED, now using InteractiveDashboard */}
        </Container>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.7, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-gray-500">{t.hero.scrollExplore}</span>
            <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-white rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
