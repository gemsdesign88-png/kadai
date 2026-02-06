"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Package, TrendingDown, TrendingUp, AlertTriangle, ArrowRight, Store } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

export function WarehouseUIShowcase() {
  const { t } = useLanguage()
  const showcase = t.warehousePage.uiShowcase
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            {showcase.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {showcase.subtitle}
          </p>
        </motion.div>

        {/* Main Warehouse Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-7xl mx-auto"
        >
          {/* Browser-like frame */}
          <div className="rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 border-b border-gray-200">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 mx-4 px-3 py-1 bg-white rounded-md text-xs text-gray-500">
                app.kadai.id/warehouse/stock
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-6 bg-gradient-to-br from-slate-50 to-white">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{showcase.dashboard.title}</h3>
                </div>
                <div className="flex gap-2">
                  <div className="px-4 py-2 rounded-lg bg-green-50 border border-green-200">
                    <div className="text-xs text-green-600 font-medium">{showcase.dashboard.nav.overview}</div>
                    <div className="text-xl font-bold text-green-700">12</div>
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-orange-50 border border-orange-200">
                    <div className="text-xs text-orange-600 font-medium">{showcase.dashboard.stockStatus.status.needsRestock}</div>
                    <div className="text-xl font-bold text-orange-700">5</div>
                  </div>
                </div>
              </div>

              {/* Stock Items Grid */}
              <div className="space-y-3">
                {/* Item 1 - Needs Restock */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white rounded-xl border-2 border-orange-200 p-4 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                          <Package className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Kopi Arabica Premium</div>
                          <div className="text-sm text-gray-500">1kg Beans</div>
                        </div>
                      </div>

                      {/* Current vs Par Level */}
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">{showcase.stockItems.warehouseStock}</div>
                          <div className="text-lg font-bold text-gray-900">45 kg</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">{showcase.stockItems.parLevelTotal}</div>
                          <div className="text-lg font-bold text-blue-600">120 kg</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">{showcase.stockItems.reorderLevel}</div>
                          <div className="text-lg font-bold text-orange-600">60 kg</div>
                        </div>
                      </div>

                      {/* Alert */}
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-50 border border-orange-200">
                        <AlertTriangle className="w-4 h-4 text-orange-600" />
                        <div className="text-sm">
                          <span className="font-semibold text-orange-900">{showcase.stockItems.needOrder}: 75 kg</span>
                          <span className="text-orange-700"> {showcase.stockItems.toReachPar}</span>
                        </div>
                      </div>
                    </div>

                    {/* Distribution Status */}
                    <div className="ml-4 w-64">
                      <div className="text-xs font-semibold text-gray-700 mb-2">{showcase.stockItems.distributionNeeded}</div>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Store className="w-3 h-3 text-red-500" />
                            <span className="text-gray-700">Cabang Senayan</span>
                          </div>
                          <span className="font-semibold text-red-600">-8 kg</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Store className="w-3 h-3 text-orange-500" />
                            <span className="text-gray-700">Cabang Kelapa Gading</span>
                          </div>
                          <span className="font-semibold text-orange-600">-5 kg</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Store className="w-3 h-3 text-green-500" />
                            <span className="text-gray-700">Cabang PIK</span>
                          </div>
                          <span className="font-semibold text-green-600">+2 kg</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Item 2 - Good Status */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                          <Package className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Susu Full Cream</div>
                          <div className="text-sm text-gray-500">1 Liter</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 mb-3">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">{showcase.stockItems.warehouseStock}</div>
                          <div className="text-lg font-bold text-gray-900">180 L</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">{showcase.stockItems.parLevelTotal}</div>
                          <div className="text-lg font-bold text-blue-600">150 L</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">{showcase.stockItems.reorderLevel}</div>
                          <div className="text-lg font-bold text-orange-600">80 L</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 border border-green-200">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-900">{showcase.stockItems.optimalStock}</span>
                      </div>
                    </div>

                    <div className="ml-4 w-64">
                      <div className="text-xs font-semibold text-gray-700 mb-2">{showcase.stockItems.allStoresOptimal}</div>
                      <div className="flex items-center justify-center py-4">
                        <div className="text-4xl">✓</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Item 3 - Critical */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white rounded-xl border-2 border-red-200 p-4 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                          <Package className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Gula Pasir</div>
                          <div className="text-sm text-gray-500">1 kg</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 mb-3">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">{showcase.stockItems.warehouseStock}</div>
                          <div className="text-lg font-bold text-gray-900">25 kg</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">{showcase.stockItems.parLevelTotal}</div>
                          <div className="text-lg font-bold text-blue-600">200 kg</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">{showcase.stockItems.reorderLevel}</div>
                          <div className="text-lg font-bold text-orange-600">100 kg</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 border border-red-200">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <div className="text-sm">
                          <span className="font-semibold text-red-900">{showcase.stockItems.critical}: 175 kg</span>
                          <span className="text-red-700"> {showcase.stockItems.belowReorder}</span>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4 w-64">
                      <div className="text-xs font-semibold text-red-700 mb-2">{showcase.stockItems.urgentDistribution}</div>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Store className="w-3 h-3 text-red-600" />
                            <span className="text-gray-700">{showcase.stockItems.allBranches}</span>
                          </div>
                          <span className="font-semibold text-red-600">-175 kg</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* How it Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 grid md:grid-cols-3 gap-8"
        >
          {showcase.howItWorks.steps.map((step, index) => {
            const Icon = index === 0 ? TrendingDown : index === 1 ? AlertTriangle : ArrowRight
            const colors = [
              "from-blue-500 to-cyan-500",
              "from-purple-500 to-pink-500",
              "from-orange-500 to-red-500"
            ]
            
            return (
              <div key={step.number} className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${colors[index]} flex items-center justify-center`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            )
          })}
        </motion.div>
      </Container>
    </section>
  )
}
