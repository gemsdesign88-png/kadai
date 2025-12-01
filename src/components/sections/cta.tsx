"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/context"
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react"
import Link from "next/link"

export function CTA() {
  const { t, language } = useLanguage()
  
  return (
    <section className="relative overflow-hidden py-20 sm:py-32 bg-white">
      {/* Subtle floating decorative blobs */}
      <motion.div 
        className="absolute top-20 left-10 w-40 h-40 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-15"
        style={{ background: 'var(--color-peach)' }}
        animate={{
          y: [0, -30, 0],
          rotate: [0, 90, 0],
          borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 70% 30% / 40% 50% 60% 50%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-20 right-10 w-56 h-56 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] opacity-15"
        style={{ background: 'var(--color-lavender)' }}
        animate={{
          y: [0, 40, 0],
          rotate: [0, -90, 0],
          borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "30% 60% 70% 40% / 50% 60% 30% 60%", "60% 40% 30% 70% / 60% 30% 70% 40%"],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.8,
            type: "spring" as const,
            bounce: 0.4 
          }}
          className="mx-auto max-w-4xl"
        >
          <div 
            className="relative overflow-hidden p-12 sm:p-16 text-center bg-white"
            style={{
              borderRadius: 'var(--radius-card)',
              border: '4px solid var(--color-ink)',
              boxShadow: '8px 8px 0 var(--color-coral), 12px 12px 0 var(--color-ink)',
            }}
          >
            {/* Organic grid pattern */}
            <div className="absolute inset-0 organic-grid opacity-10" />
            
            {/* Floating sparkles */}
            <motion.div
              className="absolute top-8 right-8"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="h-8 w-8 text-[#FFD93D]" />
            </motion.div>

            <motion.div
              className="absolute bottom-12 left-8"
              animate={{ 
                rotate: [0, -10, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <Sparkles className="h-6 w-6 text-[#B4E7CE]" />
            </motion.div>
            
            <div className="relative z-10">
              {/* Sticker badge */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: -5 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring" as const,
                  bounce: 0.6,
                  delay: 0.2 
                }}
                className="inline-flex items-center gap-2 sticker px-5 py-2 text-sm font-bold rounded-xl mb-8"
              >
                <span className="text-[#121516]">🎉 {language === "en" ? "Limited Time Offer" : "Penawaran Terbatas"}</span>
              </motion.div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
                <span className="text-playful block mb-2">
                  {t.cta.title}
                </span>
              </h2>
              
              <p className="mx-auto max-w-2xl text-xl sm:text-2xl leading-relaxed text-[#4B5563] mb-10">
                {t.cta.subtitle}
              </p>
              
              <div className="flex items-center justify-center gap-4 flex-wrap mb-12">
                <Button 
                  size="lg" 
                  asChild
                  className="btn-playful text-lg px-10 py-6 bg-[#FF5A5F] hover:bg-[#E8484D] rounded-[16px] shadow-[0_8px_16px_rgba(255,90,95,0.08)] hover:shadow-[0_20px_40px_rgba(255,90,95,0.16)] font-bold"
                >
                  <Link href="/demo" className="gap-2">
                    {t.cta.startTrial}
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  asChild
                  className="text-lg px-10 py-6 rounded-[16px] border-[3px] border-[#121516] hover:bg-[#FFE8E9] font-bold bounce-hover"
                >
                  <Link href="/contact" className="gap-2">
                    <MessageCircle className="h-5 w-5" />
                    {t.cta.talkSales}
                  </Link>
                </Button>
              </div>
              
              {/* Trust indicators with playful cards */}
              <div className="flex items-center justify-center gap-6 flex-wrap">
                <motion.div 
                  whileHover={{ y: -5, rotate: -2 }}
                  className="flex flex-col items-center bg-white px-6 py-4 rounded-[16px] border-3 border-[#FFB4A2] shadow-[0_4px_12px_rgba(26,26,46,0.04)]"
                >
                  <div className="text-3xl font-black text-[#FF5A5F]">10,000+</div>
                  <div className="mt-1 text-sm font-bold text-[#4B5563]">
                    {language === "en" ? "Active users" : "Pengguna aktif"}
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -5, rotate: 2 }}
                  className="flex flex-col items-center bg-white px-6 py-4 rounded-[16px] border-3 border-[#B4E7CE] shadow-[0_4px_12px_rgba(26,26,46,0.04)]"
                >
                  <div className="text-3xl font-black text-[#00D4AA]">99.9%</div>
                  <div className="mt-1 text-sm font-bold text-[#4B5563]">
                    {language === "en" ? "Uptime" : "Waktu aktif"}
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -5, rotate: -2 }}
                  className="flex flex-col items-center bg-white px-6 py-4 rounded-[16px] border-3 border-[#D4B5F6] shadow-[0_4px_12px_rgba(26,26,46,0.04)]"
                >
                  <div className="text-3xl font-black text-[#8B5CF6]">24/7</div>
                  <div className="mt-1 text-sm font-bold text-[#4B5563]">
                    {language === "en" ? "Support" : "Dukungan"}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
