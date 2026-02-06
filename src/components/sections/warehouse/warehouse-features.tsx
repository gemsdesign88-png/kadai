"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { 
  ArrowRightLeft, 
  Package, 
  TrendingUp, 
  BarChart3, 
  Users, 
  CheckCircle2,
  Truck,
  Warehouse as WarehouseIcon,
  Activity
} from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

const gradients = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-orange-500 to-red-500",
  "from-green-500 to-emerald-500",
  "from-indigo-500 to-blue-500",
  "from-pink-500 to-rose-500"
]

export function WarehouseFeatures() {
  const { t } = useLanguage()
  const data = t.warehousePage.warehouseFeatures

  const iconComponents = [
    WarehouseIcon,
    ArrowRightLeft,
    Package,
    TrendingUp,
    BarChart3,
    Users
  ]

  return (
    <section id="features" className="relative py-20 md:py-32 bg-white overflow-hidden">
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200 backdrop-blur-xl mb-6">
            <Activity className="w-4 h-4 text-blue-600" />
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

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.features.map((feature, index) => {
            const Icon = iconComponents[index]
            const gradient = gradients[index]
            
            return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className={`relative h-full rounded-3xl bg-gradient-to-br ${gradient} p-[2px] transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>
                <div className="h-full rounded-3xl bg-white p-8 backdrop-blur-xl">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Benefits list */}
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )})}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-3xl bg-gradient-to-r from-blue-50 via-purple-50 to-cyan-50 border border-gray-200">
            <Truck className="w-10 h-10 text-blue-600" />
            <div className="text-left">
              <div className="font-bold text-gray-900 mb-1">
                {data.integration.title}
              </div>
              <div className="text-sm text-gray-600">
                {data.integration.description}
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
