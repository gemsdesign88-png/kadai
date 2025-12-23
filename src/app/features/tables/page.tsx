"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { MockupCarousel } from "@/components/ui/mockup-carousel"
import {
  TablesOverviewMockup,
  TableDetailMockup,
  TableReservationMockup,
  TableMergingMockup,
} from "@/components/mockups/tables-mockups"

export default function TablesFeaturePage() {
  const { t, language } = useLanguage()
  
  const tablesMockups = [
    TablesOverviewMockup,
    TableDetailMockup,
    TableReservationMockup,
    TableMergingMockup,
  ]

  return (
    <main className="bg-white">
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <Container>
          <Link 
            href="/features"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#FF5A5F] mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.featurePages.backToFeatures}
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span className="text-sm font-bold text-purple-700">{t.featurePages.tables.badge}</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                {t.featurePages.tables.title}
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {t.featurePages.tables.description}
              </p>

              <Link href="/demo">
                <Button size="lg" className="bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] hover:from-[#E8484D] hover:to-[#7C3AED] text-white rounded-full px-8 py-6 text-lg font-bold shadow-xl">
                  {t.featurePages.tryDemo}
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <MockupCarousel
                mockups={tablesMockups}
                color="#8B5CF6"
                language={language}
              />
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <h2 className="text-4xl font-black text-gray-900 mb-12 text-center">
            {t.featurePages.keyFeatures}
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {t.featurePages.tables.features.map((feature, i) => (
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
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  )
}
