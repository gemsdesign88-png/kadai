"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/context";
import { Container } from "@/components/ui/container";
import { 
  Check, 
  ArrowRight,
  Utensils,
  Coffee,
  Blocks,
  Cloud,
  Store,
  UtensilsCrossed,
  Pizza,
  IceCream,
  Beer,
  Cake,
  CupSoda,
  Soup
} from "lucide-react";
import Link from "next/link";
import { MobileUIShowcase, MobileUIShowcaseSection } from "@/components/sections/MobileUIShowcase";
import { SalesDashboardScreen } from "@/components/mobile-ui/screens/SalesDashboardScreen";
import { TableManagementScreen } from "@/components/mobile-ui/screens/resto/TableManagementScreen";

export default function RestoPage() {
  const { t } = useLanguage();
  const resto = t.restoPage;

  const useCaseIcons = {
    warung: Store,
    restaurant: Utensils,
    cafe: Coffee,
    fastfood: Pizza,
    bakery: Cake,
    icecream: IceCream,
    bar: Beer,
    foodcourt: Blocks,
    catering: UtensilsCrossed,
    cloudkitchen: Cloud,
    juicebar: CupSoda,
    streetfood: Soup,
  };

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-orange-50 via-white to-red-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        </div>

        <Container>
          <div className="text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium text-white mb-6" style={{backgroundColor: '#FF6B35'}}>
                {resto.hero.badge}
              </span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                {resto.hero.title}{" "}
                <span className="bg-clip-text text-transparent" style={{backgroundImage: 'linear-gradient(to right, #FF6B35, #FF8C5A)'}}>
                  {resto.hero.titleHighlight}
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                {resto.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                <span className="text-3xl font-bold" style={{color: '#FF6B35'}}>
                  {resto.hero.price}
                </span>
              </div>
              <Link href="/pricing">
                <button className="px-8 py-4 text-white rounded-xl font-semibold transition-all shadow-lg flex items-center gap-2 mx-auto group hover:opacity-90" style={{backgroundColor: '#FF6B35'}}>
                  {resto.hero.getStarted}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">{resto.useCases.title}</h2>
            <p className="text-xl text-gray-300">{resto.useCases.subtitle}</p>
          </div>

          <div className="space-y-20">
            {Object.entries(resto.useCases).map(([key, useCase]: [string, any], idx) => {
              if (key === 'title' || key === 'subtitle' || typeof useCase !== 'object') return null;
              
              const Icon = useCaseIcons[key as keyof typeof useCaseIcons];
              if (!Icon) return null; // Skip if no icon is defined
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`grid md:grid-cols-2 gap-12 items-center ${isEven ? '' : 'md:grid-flow-dense'}`}
                >
                  <div className={isEven ? '' : 'md:col-start-2'}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-2xl shadow-lg" style={{background: 'linear-gradient(to bottom right, #FF6B35, #FF8C5A)', boxShadow: '0 10px 15px -3px rgba(255, 107, 53, 0.3)'}}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold text-white">{useCase.name}</h3>
                    </div>
                    <p className="text-lg text-gray-300 mb-6">{useCase.description}</p>

                    {/* Challenges */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-3 text-white">Common Challenges:</h4>
                      <ul className="space-y-2">
                        {useCase.challenges?.map((challenge: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-gray-400">
                            <span className="text-red-400 mt-1">✕</span>
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Story */}
                    <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border" style={{borderColor: 'rgba(255, 107, 53, 0.3)'}}>
                      <p className="text-gray-300 italic">{useCase.story}</p>
                    </div>
                  </div>

                  <div className={isEven ? '' : 'md:col-start-1 md:row-start-1'}>
                    <div className="backdrop-blur-sm border rounded-3xl p-8 shadow-2xl" style={{background: 'linear-gradient(to bottom right, rgba(255, 107, 53, 0.15), rgba(255, 140, 90, 0.15))', borderColor: 'rgba(255, 107, 53, 0.2)'}}>
                      <h4 className="text-xl font-bold mb-6 text-white">How Kadai Resto Helps:</h4>
                      <div className="space-y-4">
                        {useCase.solutions?.map((solution: any, i: number) => (
                          <div key={i} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm border border-white/10 p-4 rounded-xl hover:bg-white/20 transition-all">
                            <div className="p-1 bg-green-500/20 rounded-lg mt-0.5">
                              <Check className="w-4 h-4 text-green-400" />
                            </div>
                            <div>
                              <p className="font-semibold text-white">{solution.title}</p>
                              <p className="text-sm text-gray-300">{solution.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Mobile UI Showcase Section */}
      <MobileUIShowcaseSection
        title="See Real Business Impact"
        subtitle="Experience the actual mobile app interface that helps restaurant owners track revenue and manage operations in real-time"
      >
        <MobileUIShowcase
          title="Live Sales Dashboard"
          description="Monitor your restaurant's performance in real-time. Track today's revenue, order count, customer flow, and identify your best-selling items instantly - all from your phone."
          screen={<SalesDashboardScreen />}
          features={[
            'Real-time revenue tracking with trend indicators',
            'Hourly sales visualization to identify peak hours',
            'Top-selling products with profit insights',
            'Quick export for accounting and tax reporting',
          ]}
        />

        <MobileUIShowcase
          title="Visual Table Management"
          description="Manage your restaurant floor plan with an intuitive, color-coded interface. See all table statuses at a glance and tap to manage orders instantly."
          screen={<TableManagementScreen />}
          features={[
            'Real-time status updates with color indicators',
            'Quick overview of guests and order totals',
            'Tap any table to view or edit orders',
            'Track available, occupied, and reserved tables',
          ]}
          reverse
        />
      </MobileUIShowcaseSection>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{resto.features.title}</h2>
            <p className="text-xl text-gray-600">{resto.features.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resto.features.list.map((feature: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-4">
                  <Check className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">{resto.pricing.title}</h2>
              <p className="text-xl text-gray-600">{resto.pricing.subtitle}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 md:p-12">
              <div className="grid md:grid-cols-5 gap-4 mb-8">
                {resto.pricing.tiers.map((tier: any, idx: number) => (
                  <div key={idx} className="text-center p-6 bg-white rounded-2xl shadow-sm">
                    <div className="text-xs text-gray-500 mb-2">{tier.revenue}</div>
                    <div className="text-2xl font-bold text-purple-600 mb-1">{tier.price}</div>
                    <div className="text-xs text-gray-600">{tier.note}</div>
                  </div>
                ))}
              </div>

              <p className="text-center text-gray-600 mb-8">{resto.pricing.note}</p>

              <Link href="/pricing">
                <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center gap-2 mx-auto group">
                  {resto.pricing.cta}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">{resto.faq.title}</h2>
            <div className="space-y-6">
              {resto.faq.items.map((item: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-sm"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{item.q}</h3>
                  <p className="text-gray-600">{item.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden" style={{background: 'linear-gradient(to bottom right, #FF6B35, #FF8C5A)'}}>
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
              {resto.cta.title}
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              {resto.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/pricing">
                <button className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-xl flex items-center gap-2 group">
                  {resto.cta.button}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-colors border-2 border-white/30">
                  {resto.cta.demo}
                </button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
