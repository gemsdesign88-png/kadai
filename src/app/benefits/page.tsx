'use client'

import { CheckCircle, TrendingUp, Clock, Shield, Users, Globe } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { motion } from 'framer-motion'

const benefitsList = [
  { title: 'Fast', description: 'Lightning fast performance', icon: Clock },
  { title: 'Reliable', description: 'Rock solid reliability', icon: Shield },
  { title: 'Scalable', description: 'Grows with your business', icon: TrendingUp },
  { title: 'Team Friendly', description: 'Built for collaboration', icon: Users },
  { title: 'Global Ready', description: 'Works worldwide', icon: Globe },
  { title: 'Secure', description: 'Enterprise grade security', icon: CheckCircle },
]

export default function BenefitsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <section className="relative overflow-hidden py-24">
        <Container>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Why Choose{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  KadaiPOS?
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The modern POS system built for restaurants that want to grow
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefitsList.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:border-blue-200 group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center mb-6 group-hover:from-blue-100 group-hover:to-purple-100 transition-colors">
                    <Icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>
    </main>
  )
}

export const dynamic = 'force-dynamic';
