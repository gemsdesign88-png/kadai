"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Warehouse as WarehouseIcon, TrendingUp, Building2, ArrowRight, Package, Truck, BarChart3 } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/context"

export function Warehouse() {
  const { t } = useLanguage()
  const hero = t.warehousePage.hero
  
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-xl mb-6"
            >
              <WarehouseIcon className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-gray-900">
                {hero.badge}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              {(() => {
                const title = hero.title;
                const highlightWord = title.includes('Multi-Lokasi') ? 'Multi-Lokasi' : 'Multi-Location';
                const parts = title.split(highlightWord);
                return (
                  <>
                    {parts[0]}
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                      {highlightWord}
                    </span>
                    {parts[1]}
                  </>
                );
              })()}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              {hero.subtitle}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 mb-8"
            >
              <div className="text-center p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200">
                <div className="text-3xl font-bold text-blue-600 mb-1">{hero.stats.efficiency.value}</div>
                <div className="text-sm text-gray-600">{hero.stats.efficiency.label}</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200">
                <div className="text-3xl font-bold text-purple-600 mb-1">{hero.stats.automation.value}</div>
                <div className="text-sm text-gray-600">{hero.stats.automation.label}</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200">
                <div className="text-3xl font-bold text-cyan-600 mb-1">{hero.stats.accuracy.value}</div>
                <div className="text-sm text-gray-600">{hero.stats.accuracy.label}</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 group rounded-xl px-8 py-6 text-base font-semibold h-auto"
              >
                <Link href="/contact" className="flex items-center justify-center">
                  {hero.cta.demo}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 rounded-xl px-8 py-6 text-base font-semibold h-auto transition-all duration-300"
              >
                <Link href="#features" className="flex items-center justify-center">
                  {hero.cta.consultation}
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Main card */}
            <div className="relative z-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-gray-200 shadow-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <WarehouseIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Central Warehouse</div>
                  <div className="text-lg font-bold text-gray-900">Gudang Pusat</div>
                </div>
              </div>

              <div className="space-y-4">
                {/* Location cards */}
                {[
                  { name: "Cabang Jakarta", stock: 1250, icon: Building2, color: "blue" },
                  { name: "Cabang Bandung", stock: 890, icon: Building2, color: "purple" },
                  { name: "Cabang Surabaya", stock: 1480, icon: Building2, color: "cyan" },
                ].map((location, index) => (
                  <motion.div
                    key={location.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-${location.color}-100 flex items-center justify-center`}>
                        <location.icon className={`w-5 h-5 text-${location.color}-600`} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{location.name}</div>
                        <div className="text-xs text-gray-500">{location.stock} items</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-green-600">+5%</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Transfer indicator */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="mt-6 flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center animate-pulse">
                    <Truck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Transfer In Progress</div>
                    <div className="text-xs text-gray-500">Jakarta → Bandung</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">320 items</span>
                </div>
              </motion.div>
            </div>

            {/* Floating analytics card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="absolute -bottom-6 -right-6 w-64 rounded-2xl bg-white/90 backdrop-blur-xl border border-gray-200 shadow-xl p-4 z-20"
            >
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-gray-900">Stock Analytics</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Stock Value</span>
                  <span className="font-bold text-gray-900">Rp 450jt</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Transfers Today</span>
                  <span className="font-bold text-blue-600">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Low Stock Items</span>
                  <span className="font-bold text-orange-600">3</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
