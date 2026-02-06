"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { 
  Package, 
  BarChart3, 
  Users,
  Truck,
  AlertTriangle,
  CheckCircle2,
  ArrowRightLeft
} from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

const iconMap = [AlertTriangle, ArrowRightLeft, Package, BarChart3, Truck, Users]
const colorMap = [
  "from-orange-500 to-red-500",
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-green-500 to-emerald-500",
  "from-yellow-500 to-orange-500",
  "from-indigo-500 to-purple-500"
]

export function WarehouseFeaturesSection() {
  const { t } = useLanguage()
  const featuresData = t.warehousePage.featuresSection
  
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
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
              {featuresData.badge}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            {featuresData.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {featuresData.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.features.map((feature, index) => {
            const Icon = iconMap[index]
            const color = colorMap[index]
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full p-8 rounded-3xl bg-white border-2 border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  <div className="relative">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {feature.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2">
                      {feature.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 bg-gradient-to-br ${color} bg-clip-text text-transparent`} style={{
                            WebkitTextFillColor: 'transparent',
                            WebkitBackgroundClip: 'text'
                          }} />
                          <span className="text-sm text-gray-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-600 mb-6">
            Semua fitur tersedia di semua paket. Yang membedakan hanya kapasitas lokasi.
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
