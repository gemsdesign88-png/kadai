"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/context";
import { Container } from "@/components/ui/container";
import { 
  ChefHat, 
  Check, 
  ArrowRight,
  Utensils,
  Coffee,
  Blocks,
  Cloud,
  Store,
  UtensilsCrossed
} from "lucide-react";
import Link from "next/link";

export default function RestoPage() {
  const { t } = useLanguage();
  const resto = t.restoPage;

  const useCaseIcons = {
    warung: Store,
    restaurant: Utensils,
    foodcourt: Blocks,
    catering: UtensilsCrossed,
    cloudkitchen: Cloud,
  };

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-purple-50 via-white to-pink-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        </div>

        <Container>
          <div className="text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white mb-6">
                {resto.hero.badge}
              </span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                {resto.hero.title}{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {resto.hero.titleHighlight}
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                {resto.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {resto.hero.price}
                </span>
              </div>
              <Link href="/pricing">
                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all shadow-lg flex items-center gap-2 mx-auto group">
                  {resto.hero.getStarted}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{resto.useCases.title}</h2>
            <p className="text-xl text-gray-600">{resto.useCases.subtitle}</p>
          </div>

          <div className="space-y-20">
            {Object.entries(resto.useCases).map(([key, useCase]: [string, any], idx) => {
              if (key === 'title' || key === 'subtitle' || typeof useCase !== 'object') return null;
              
              const Icon = useCaseIcons[key as keyof typeof useCaseIcons];
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
                      <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl">
                        <Icon className="w-8 h-8 text-purple-600" />
                      </div>
                      <h3 className="text-3xl font-bold">{useCase.name}</h3>
                    </div>
                    <p className="text-lg text-gray-600 mb-6">{useCase.description}</p>

                    {/* Challenges */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-3 text-gray-900">Common Challenges:</h4>
                      <ul className="space-y-2">
                        {useCase.challenges?.map((challenge: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-gray-600">
                            <span className="text-red-500 mt-1">✕</span>
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Story */}
                    <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-l-4 border-purple-600">
                      <p className="text-gray-700 italic">{useCase.story}</p>
                    </div>
                  </div>

                  <div className={isEven ? '' : 'md:col-start-1 md:row-start-1'}>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8">
                      <h4 className="text-xl font-bold mb-6 text-gray-900">How Kadai Resto Helps:</h4>
                      <div className="space-y-4">
                        {useCase.solutions?.map((solution: any, i: number) => (
                          <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
                            <div className="p-1 bg-green-100 rounded-lg mt-0.5">
                              <Check className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{solution.title}</p>
                              <p className="text-sm text-gray-600">{solution.description}</p>
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
      <section className="py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600 relative overflow-hidden">
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
