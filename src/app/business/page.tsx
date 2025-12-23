"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/context";
import { Container } from "@/components/ui/container";
import { 
  Store, 
  ChefHat, 
  Check, 
  X,
  Smartphone,
  Monitor,
  ArrowRight,
  Zap,
  DollarSign,
  Users,
  BarChart3
} from "lucide-react";
import Link from "next/link";

export default function BusinessPage() {
  const { t } = useLanguage();

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
        </div>

        <Container>
          <div className="text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-6">
                {t.business.hero.badge}
              </span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                {t.business.hero.title}{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {t.business.hero.titleHighlight}
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t.business.hero.subtitle}
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Two Business Types Section */}
      <section className="py-20">
        <Container>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Kadai Toko Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl transform group-hover:scale-105 transition-transform duration-300 opacity-5 group-hover:opacity-10" />
              <div className="relative p-8 lg:p-10 border border-gray-200 rounded-3xl bg-white hover:shadow-2xl transition-all duration-300">
                {/* Icon and header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="p-4 bg-blue-50 rounded-2xl">
                    <Store className="w-10 h-10 text-blue-600" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-1">{t.business.toko.priceNote}</p>
                    <p className="text-2xl font-bold text-blue-600">{t.business.toko.price}</p>
                  </div>
                </div>

                <h2 className="text-3xl font-bold mb-2">{t.business.toko.name}</h2>
                <p className="text-lg text-gray-600 mb-4">{t.business.toko.tagline}</p>
                <p className="text-gray-700 mb-6">{t.business.toko.description}</p>

                {/* Ideal for */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-900 mb-3">{t.business.toko.idealFor}</p>
                  <div className="flex flex-wrap gap-2">
                    {t.business.toko.businesses.map((business: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm rounded-full font-medium"
                      >
                        {business}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-4 mb-6">
                  <p className="font-semibold text-gray-900">{t.business.toko.benefits.title}</p>
                  {t.business.toko.benefits.items.map((benefit: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="p-1 bg-blue-100 rounded-lg mt-0.5">
                        <Check className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{benefit.title}</p>
                        <p className="text-sm text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/pricing">
                  <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 group">
                    {t.business.cta.tokoButton}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Kadai Resto Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl transform group-hover:scale-105 transition-transform duration-300 opacity-5 group-hover:opacity-10" />
              <div className="relative p-8 lg:p-10 border-2 border-purple-200 rounded-3xl bg-white hover:shadow-2xl transition-all duration-300">
                {/* Recommended badge */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-full shadow-lg">
                    ⭐ {t.business.hero.badge}
                  </span>
                </div>

                {/* Icon and header */}
                <div className="flex items-start justify-between mb-6 mt-2">
                  <div className="p-4 bg-purple-50 rounded-2xl">
                    <ChefHat className="w-10 h-10 text-purple-600" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-1">{t.business.resto.priceNote}</p>
                    <p className="text-2xl font-bold text-purple-600">{t.business.resto.price}</p>
                  </div>
                </div>

                <h2 className="text-3xl font-bold mb-2">{t.business.resto.name}</h2>
                <p className="text-lg text-gray-600 mb-4">{t.business.resto.tagline}</p>
                <p className="text-gray-700 mb-6">{t.business.resto.description}</p>

                {/* Ideal for */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-900 mb-3">{t.business.resto.idealFor}</p>
                  <div className="flex flex-wrap gap-2">
                    {t.business.resto.businesses.map((business: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 text-sm rounded-full font-medium"
                      >
                        {business}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-4 mb-6">
                  <p className="font-semibold text-gray-900">{t.business.resto.benefits.title}</p>
                  {t.business.resto.benefits.items.map((benefit: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="p-1 bg-purple-100 rounded-lg mt-0.5">
                        <Check className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{benefit.title}</p>
                        <p className="text-sm text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/pricing">
                  <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 group">
                    {t.business.cta.restoButton}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20 bg-gray-50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">{t.business.comparison.title}</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
              <div className="p-6 font-semibold text-gray-900">Feature</div>
              <div className="p-6 text-center font-semibold text-blue-600 border-x border-gray-200">
                {t.business.comparison.toko}
              </div>
              <div className="p-6 text-center font-semibold text-purple-600">
                {t.business.comparison.resto}
              </div>
            </div>

            {/* Table Body */}
            {t.business.comparison.features.map((feature: any, idx: number) => (
              <div
                key={idx}
                className={`grid grid-cols-3 ${
                  idx !== t.business.comparison.features.length - 1 ? "border-b border-gray-200" : ""
                }`}
              >
                <div className="p-6 text-gray-900">{feature.name}</div>
                <div className="p-6 flex items-center justify-center border-x border-gray-200">
                  {feature.toko ? (
                    <div className="p-1 bg-blue-100 rounded-lg">
                      <Check className="w-5 h-5 text-blue-600" />
                    </div>
                  ) : (
                    <div className="p-1 bg-gray-100 rounded-lg">
                      <X className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="p-6 flex items-center justify-center">
                  {feature.resto ? (
                    <div className="p-1 bg-purple-100 rounded-lg">
                      <Check className="w-5 h-5 text-purple-600" />
                    </div>
                  ) : (
                    <div className="p-1 bg-gray-100 rounded-lg">
                      <X className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Multi-Device Section */}
      <section className="py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              {t.business.devices.title}{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t.business.devices.titleHighlight}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.business.devices.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Mobile App */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl"
            >
              <div className="mb-6">
                <div className="inline-flex p-3 bg-white rounded-2xl shadow-lg mb-4">
                  <Smartphone className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{t.business.devices.app.title}</h3>
                <p className="text-gray-600">{t.business.devices.app.subtitle}</p>
              </div>

              <div className="space-y-3">
                {t.business.devices.app.features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="p-1 bg-blue-100 rounded-lg">
                      <Check className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Visual mockup placeholder */}
              <div className="mt-8 relative">
                <div className="aspect-[9/16] max-w-[200px] mx-auto bg-white rounded-3xl shadow-2xl border-8 border-gray-800 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <Smartphone className="w-16 h-16 text-gray-400" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Web Dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl"
            >
              <div className="mb-6">
                <div className="inline-flex p-3 bg-white rounded-2xl shadow-lg mb-4">
                  <Monitor className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{t.business.devices.dashboard.title}</h3>
                <p className="text-gray-600">{t.business.devices.dashboard.subtitle}</p>
              </div>

              <div className="space-y-3">
                {t.business.devices.dashboard.features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="p-1 bg-purple-100 rounded-lg">
                      <Check className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Visual mockup placeholder */}
              <div className="mt-8">
                <div className="aspect-[16/10] bg-white rounded-2xl shadow-2xl border-4 border-gray-800 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                    <Monitor className="w-16 h-16 text-gray-400" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center relative z-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t.business.cta.title}
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              {t.business.cta.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/pricing">
                <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-xl flex items-center gap-2 group">
                  {t.business.cta.viewPricing}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              
              <span className="text-white font-medium">{t.business.cta.orText}</span>
              
              <Link href="/contact">
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-colors border-2 border-white/30">
                  {t.nav.contact}
                </button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
