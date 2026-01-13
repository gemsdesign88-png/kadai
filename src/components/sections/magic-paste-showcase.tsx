"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Sparkles } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { AISmartPasteDemo } from "@/components/features/ai-smart-paste-demo"

export function MagicPasteShowcase() {
  const { t } = useLanguage()

  return (
    <section className="relative py-20 md:py-32 bg-black overflow-hidden">
      {/* Animated background blobs */}
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
          className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-[#FF5A5F] rounded-full blur-[128px] opacity-20"
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
          className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[128px] opacity-20"
        />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#FF5A5F]/10 to-purple-500/10 border border-white/10 backdrop-blur-xl mb-6">
            <Sparkles className="w-4 h-4 text-[#FF5A5F]" />
            <span className="text-sm font-semibold text-white">
              {t.magicPaste?.badge}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {t.magicPaste?.title}
            <br />
            <span className="bg-gradient-to-r from-[#FF5A5F] to-purple-500 bg-clip-text text-transparent">
              {t.magicPaste?.subtitle}
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            {t.magicPaste?.description}
          </p>
        </motion.div>

        {/* AI Smart Paste Demo Component */}
        <AISmartPasteDemo />
      </Container>
    </section>
  )
}
