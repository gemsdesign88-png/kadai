"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Store, UtensilsCrossed, Warehouse, Package, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/context"

const gradients = [
  "from-blue-500 to-cyan-500",
  "from-orange-500 to-red-500",
  "from-purple-500 to-pink-500"
]

export function WarehouseUseCases() {
  const { t } = useLanguage()
  const data = t.warehousePage.warehouseUseCases

  const iconComponents = [
    Store,
    UtensilsCrossed,
    Warehouse
  ]

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      <Container className="relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-gray-200 backdrop-blur-xl mb-6">
            <Package className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-gray-900">
              {data.badge}
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            {data.title}{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              {data.titleHighlight}
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </motion.div>

        {/* Use cases */}
        <div className="space-y-12">
          {data.useCases.map((useCase, index) => {
            const Icon = iconComponents[index]
            const gradient = gradients[index]
            
            return (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              <div className={`relative rounded-3xl bg-gradient-to-br ${gradient} p-[2px]`}>
                <div className="rounded-3xl bg-white/95 backdrop-blur-xl p-8 md:p-12">
                  <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    {/* Left: Icon and scenario */}
                    <div>
                      <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      
                      <div className="text-sm font-semibold text-blue-600 mb-2">
                        {useCase.title}
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">
                        {useCase.business}
                      </h3>
                      
                      <p className="text-lg text-gray-700 font-medium mb-6">
                        {useCase.scenario}
                      </p>

                      {/* Challenges */}
                      <div className="space-y-3">
                        <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                          {useCase.challengesTitle}
                        </div>
                        {useCase.challenges.map((challenge, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                            <span className="text-gray-600">{challenge}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Solutions */}
                    <div className="flex flex-col justify-center">
                      <div className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-4">
                        {useCase.solutionsTitle}
                      </div>
                      <div className="space-y-4">
                        {useCase.solutions.map((solution, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.1 * idx }}
                            className="flex items-start gap-3 p-4 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50"
                          >
                            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-800 font-medium">{solution}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )})}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <Link href="/contact">
              {data.cta.button}
            </Link>
          </Button>
          <p className="mt-4 text-sm text-gray-600">
            {data.cta.note}
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
