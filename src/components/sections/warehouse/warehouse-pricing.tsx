"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { ArrowRight, Building2 } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/context"

const pricingTiers = {
  monthly: [
    {
      name: "Warehouse Starter",
      price: "499K",
      priceNum: 499000,
      period: "/gudang/bulan",
      description: "Untuk bisnis dengan hingga 10 lokasi",
      capacity: {
        total_stores: 10,
        hub_stores: 3,
        regional_warehouses: 0,
        staff: 10
      },
      popular: false,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      name: "Warehouse Growth",
      price: "799K",
      priceNum: 799000,
      period: "/gudang/bulan",
      description: "Untuk bisnis dengan hingga 30 lokasi",
      capacity: {
        total_stores: 30,
        hub_stores: 10,
        regional_warehouses: 3,
        staff: 30
      },
      popular: true,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      name: "Warehouse Pro",
      price: "1.499JT",
      priceNum: 1499000,
      period: "/gudang/bulan",
      description: "Untuk bisnis dengan banyak cabang",
      capacity: {
        total_stores: -1,
        hub_stores: -1,
        regional_warehouses: -1,
        staff: -1
      },
      popular: false,
      gradient: "from-orange-500 to-red-500"
    }
  ],
  yearly: [
    {
      name: "Warehouse Starter",
      price: "5.388JT",
      priceNum: 5388000,
      period: "/gudang/tahun",
      description: "Untuk bisnis dengan hingga 10 lokasi",
      capacity: {
        total_stores: 10,
        hub_stores: 3,
        regional_warehouses: 0,
        staff: 10
      },
      popular: false,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      name: "Warehouse Growth",
      price: "8.628JT",
      priceNum: 8628000,
      period: "/gudang/tahun",
      description: "Untuk bisnis dengan hingga 30 lokasi",
      capacity: {
        total_stores: 30,
        hub_stores: 10,
        regional_warehouses: 3,
        staff: 30
      },
      popular: true,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      name: "Warehouse Pro",
      price: "16.188JT",
      priceNum: 16188000,
      period: "/gudang/tahun",
      description: "Untuk bisnis dengan banyak cabang",
      capacity: {
        total_stores: -1,
        hub_stores: -1,
        regional_warehouses: -1,
        staff: -1
      },
      popular: false,
      gradient: "from-orange-500 to-red-500"
    }
  ]
}

export function WarehousePricing() {
  const { t } = useLanguage()
  const pricing = t.warehousePage.pricing
  const [billingPeriod, setBillingPeriod] = React.useState<'monthly' | 'yearly'>('monthly');
  const currentTiers = pricingTiers[billingPeriod];

  return (
    <section className="relative py-20 md:py-32 bg-white overflow-hidden">
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
            <Building2 className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-gray-900">
              {pricing.badge}
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            {pricing.title}
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            {pricing.subtitle}
          </p>

          {/* Billing Period Toggle */}
          <div className="inline-flex items-center gap-2 p-1 rounded-full bg-gray-100 border border-gray-200">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                billingPeriod === 'monthly'
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {pricing.billing.monthly}
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                billingPeriod === 'yearly'
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {pricing.billing.yearly}
              <span className="ml-2 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs">
                {pricing.billing.save}
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">{currentTiers.map((tier, index) => {
            const tierKey = index === 0 ? 'starter' : index === 1 ? 'growth' : 'pro'
            const tierData = pricing.tiers[tierKey]
            
            return (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative ${tier.popular ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold shadow-lg">
                    {pricing.tiers.growth.popular}
                  </div>
                </div>
              )}

              <div className={`relative h-full rounded-3xl bg-gradient-to-br ${tier.gradient} p-[2px] ${
                tier.popular ? 'scale-105 shadow-2xl' : 'hover:scale-105 hover:shadow-xl'
              } transition-all duration-300`}>
                <div className="h-full rounded-3xl bg-white p-8 backdrop-blur-xl">
                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {tierData.name}
                    </h3>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-5xl font-bold bg-gradient-to-br ${tier.gradient} bg-clip-text text-transparent`}>
                        {billingPeriod === 'monthly' ? tierData.monthlyPrice : tierData.yearlyPrice}
                      </span>
                      <span className="text-gray-600">{tierData.period}</span>
                    </div>
                  </div>

                  {/* Capacity Badges */}
                  <div className="grid grid-cols-2 gap-2 mb-8">
                    <div className="text-center p-3 rounded-xl bg-gray-50">
                      <div className="text-2xl font-bold text-gray-900">
                        {tier.capacity.total_stores === -1 ? '∞' : tier.capacity.total_stores}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">{tierData.capacity.warehouses}</div>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-gray-50">
                      <div className="text-2xl font-bold text-gray-900">
                        {tier.capacity.hub_stores === -1 ? '∞' : tier.capacity.hub_stores}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">{tierData.capacity.outlets}</div>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-gray-50">
                      <div className="text-2xl font-bold text-gray-900">
                        {tier.capacity.staff === -1 ? '∞' : tier.capacity.staff}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">{tierData.capacity.users}</div>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-gray-50">
                      <div className="text-2xl font-bold text-gray-900">
                        ∞
                      </div>
                      <div className="text-xs text-gray-600 mt-1">{tierData.capacity.products}</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button
                    asChild
                    className={`w-full ${
                      tier.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                    } shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl py-6 h-auto text-base font-semibold`}
                  >
                    <Link href="/contact" className="flex items-center justify-center">
                      {tierData.cta}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )})}
        </div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center space-y-4"
        >
          <p className="text-lg text-gray-600">
            {pricing.footer.note}
          </p>
          <p className="text-sm text-gray-500">
            {pricing.footer.consultation}
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
