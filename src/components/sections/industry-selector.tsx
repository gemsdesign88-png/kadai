"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Store, UtensilsCrossed, Scissors, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/context"

const industries = [
  {
    id: "toko",
    icon: Store,
    gradient: "from-blue-500 to-cyan-500",
    featureKeys: ["inventoryTracking", "barcodeScanning", "salesAnalytics"],
    href: "/business/toko"
  },
  {
    id: "resto",
    icon: UtensilsCrossed,
    gradient: "from-orange-500 to-red-500",
    featureKeys: ["tableManagement", "kitchenDisplay", "recipeCosting"],
    href: "/business/resto"
  },
  {
    id: "pro",
    icon: Scissors,
    gradient: "from-purple-500 to-pink-500",
    featureKeys: ["appointmentBooking", "staffScheduling", "customerCRM"],
    href: "/business/pro"
  }
]

export function IndustrySelector() {
  const { t } = useLanguage()
  const [selectedIndustry, setSelectedIndustry] = React.useState<string | null>(null)

  return (
    <section className="relative py-20 md:py-32 bg-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200 backdrop-blur-xl mb-6">
            <span className="text-sm font-semibold text-gray-900">
              {t.industrySelector?.badge}
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            {t.industrySelector?.title}
            <br />
            <span className="bg-gradient-to-r from-[#FF5A5F] via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              {t.industrySelector?.subtitle}
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.industrySelector?.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {industries.map((industry, index) => (
            <Link 
              key={industry.id} 
              href={industry.href}
              className="group relative flex"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setSelectedIndustry(industry.id)}
                onHoverEnd={() => setSelectedIndustry(null)}
                className="relative w-full"
              >
                <div className={`relative h-full rounded-3xl bg-gradient-to-br ${industry.gradient} p-[2px] transition-all duration-300 ${
                  selectedIndustry === industry.id ? 'scale-105 shadow-2xl' : ''
                }`}>
                  <div className="h-full rounded-3xl bg-white p-8 backdrop-blur-xl">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${industry.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <industry.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {(() => {
                        const data = t.industrySelector[industry.id as keyof typeof t.industrySelector];
                        return typeof data === 'object' ? data.title : '';
                      })()}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-6">
                      {(() => {
                        const data = t.industrySelector[industry.id as keyof typeof t.industrySelector];
                        return typeof data === 'object' ? data.description : '';
                      })()}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {(() => {
                        const industryData = t.industrySelector[industry.id as keyof typeof t.industrySelector];
                        if (!industryData || typeof industryData !== 'object' || !('features' in industryData)) return null;
                        
                        return industry.featureKeys.map((featureKey, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${industry.gradient}`} />
                            {(industryData.features as any)[featureKey]}
                          </li>
                        ));
                      })()}
                    </ul>

                    {/* CTA */}
                    <div
                      className="inline-flex items-center gap-2 text-gray-900 font-semibold group-hover:gap-3 transition-all"
                    >
                      {t.industrySelector?.viewFeatures}
                      <ArrowRight className="w-4 h-4 text-[#FF5A5F]" />
                    </div>
                  </div>
                </div>

                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${industry.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-300 -z-10`} />
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">
            {t.industrySelector?.notSure}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 hover:bg-gray-800 border border-gray-900 text-white rounded-full font-semibold transition-all hover:scale-105"
          >
            {t.nav.contact}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}
