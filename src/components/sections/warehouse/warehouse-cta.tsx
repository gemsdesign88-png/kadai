"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/context"

export function WarehouseCTA() {
  const { t } = useLanguage()
  const cta = t.warehousePage.cta
  
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-blob" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {cta.title}
            </h2>
            
            <p className="text-xl text-white/90 mb-12 leading-relaxed">
              {cta.subtitle}
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              {cta.benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3 justify-center p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20"
                >
                  <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0" />
                  <span className="text-white font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-50 shadow-2xl hover:shadow-3xl transition-all duration-300 group text-lg px-10 py-7 h-auto rounded-xl font-bold"
              >
                <Link href="/contact" className="flex items-center justify-center">
                  {cta.button}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/20 backdrop-blur-xl text-lg px-10 py-7 h-auto rounded-xl font-bold transition-all duration-300 hover:scale-105"
              >
                <Link href="/pricing" className="flex items-center justify-center">
                  {cta.contact}
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
