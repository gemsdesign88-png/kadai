'use client'

import { useLanguage } from '@/lib/i18n/context'
import { CheckCircle, TrendingUp, Clock, Shield, Users, Globe } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { motion } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const InteractiveDashboard = dynamic(() => import('@/components/sections/interactive-dashboard-client').then(mod => mod.InteractiveDashboardClient), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-[16/10] bg-gray-100 rounded-3xl animate-pulse border border-gray-200 flex items-center justify-center">
      <div className="text-gray-400 font-medium">Loading Dashboard...</div>
    </div>
  )
})

export default function BenefitsPage() {
  const { t } = useLanguage()
  const benefits = t.benefitsPage

  const iconMap = {
    0: Clock,
    1: TrendingUp,
    2: CheckCircle,
    3: Shield,
    4: Users,
    5: Globe
  }

  return (
    <main className="bg-white">
      {/* Hero Section with Interactive Dashboard */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
        </div>

        <Container>
          <div className="text-center mb-16 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-6">
                {benefits.hero.badge}
              </span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                {benefits.hero.title}{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {benefits.hero.titleHighlight}
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                {benefits.hero.subtitle}
              </p>
              <Link href="/demo" className="inline-flex items-center rounded-full px-8 py-5 bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] hover:from-[#E8484D] hover:to-[#7C3AED] text-white font-bold shadow-lg shadow-[#FF5A5F]/30 transition-all">
                {t.nav.getDemo}
              </Link>
            </motion.div>
          </div>

          {/* Interactive Dashboard Preview */}
          <div className="relative z-10">
            {/* Temporarily disabled - React #310 error fix pending */}
            {/* <InteractiveDashboard /> */}
          </div>
        </Container>
      </section>

      {/* Benefits Grid */}
      <section className="py-20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{benefits.benefits.title}</h2>
            <p className="text-xl text-gray-600">{benefits.benefits.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.benefits.list.map((benefit: any, index: number) => {
            const Icon = iconMap[index as keyof typeof iconMap] || CheckCircle
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:border-blue-200 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center mb-6 group-hover:from-blue-100 group-hover:to-purple-100 transition-colors">
                  <Icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600 mb-6">{benefit.description}</p>
                <div className="pt-6 border-t border-gray-100">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">{benefit.metric}</div>
                  <div className="text-sm text-gray-500">{benefit.metricLabel}</div>
                </div>
              </div>
            )
          })}
          </div>
        </Container>
      </section>

      {/* Before/After Comparison */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{benefits.comparison.title}</h2>
            <p className="text-xl text-gray-600">{benefits.comparison.subtitle}</p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-6 text-red-600">{benefits.comparison.before}</h3>
              {benefits.comparison.items.map((item: any, index: number) => (
                <div key={index} className="bg-red-50 p-4 rounded-xl border border-red-200">
                  <p className="text-gray-700">{item.before}</p>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-6 text-green-600">{benefits.comparison.after}</h3>
              {benefits.comparison.items.map((item: any, index: number) => (
                <div key={index} className="bg-green-50 p-4 rounded-xl border border-green-200">
                  <p className="text-gray-700">{item.after}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Multi-Platform Apps */}
      <section className="py-20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {benefits.apps.title}{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {benefits.apps.titleHighlight}
              </span>
            </h2>
            <p className="text-xl text-gray-600">{benefits.apps.subtitle}</p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-200 shadow-lg hover:shadow-xl transition-all">
            <div className="mb-6">
              <h3 className="text-3xl font-bold mb-2">{benefits.apps.mobile.title}</h3>
              <p className="text-blue-600 font-semibold">{benefits.apps.mobile.subtitle}</p>
            </div>
            <p className="text-gray-600 mb-6">{benefits.apps.mobile.description}</p>
            <ul className="space-y-3">
              {benefits.apps.mobile.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-200 shadow-lg hover:shadow-xl transition-all">
            <div className="mb-6">
              <h3 className="text-3xl font-bold mb-2">{benefits.apps.web.title}</h3>
              <p className="text-purple-600 font-semibold">{benefits.apps.web.subtitle}</p>
            </div>
            <p className="text-gray-600 mb-6">{benefits.apps.web.description}</p>
            <ul className="space-y-3">
              {benefits.apps.web.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{benefits.testimonials.title}</h2>
            <p className="text-xl text-gray-600">{benefits.testimonials.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
          {benefits.testimonials.items.map((testimonial: any, index: number) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
              <div className="mb-6">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">{testimonial.metric}</div>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
              </div>
              <p className="text-gray-700 mb-6 italic">&quot;{testimonial.quote}&quot;</p>
              <div>
                <div className="font-bold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.business}</div>
              </div>
            </div>
          ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <Container>
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">{benefits.cta.title}</h2>
          <p className="text-xl mb-8 text-white/90">{benefits.cta.subtitle}</p>
          <div className="flex justify-center mb-6">
            <Link href="/demo" className="inline-flex items-center justify-center px-8 py-5 bg-white hover:bg-gray-50 text-gray-900 font-bold rounded-full shadow-lg transition-all">
              {benefits.cta.secondaryButton}
            </Link>
          </div>
          <p className="text-sm text-white/80">{benefits.cta.guarantee}</p>
          </div>
        </Container>
      </section>
    </main>
  )
}
