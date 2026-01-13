"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/context";
import { Container } from "@/components/ui/container";
import { 
  Store, 
  Check, 
  ArrowRight,
  ShoppingBag,
  Scissors,
  Coffee,
  ShoppingCart,
  Smartphone,
  BookOpen,
  Gift,
  Dumbbell,
  Wrench,
  Heart,
  Shirt,
  Watch,
  Home
} from "lucide-react";
import Link from "next/link";

export default function TokoPage() {
  const { t } = useLanguage();
  const toko = t.tokoPage;

  const useCaseIcons = {
    minimarket: Store,
    supermarket: ShoppingCart,
    warung: ShoppingBag,
    boutique: Shirt,
    pharmacy: Heart,
    electronics: Smartphone,
    bookstore: BookOpen,
    giftshop: Gift,
    sportinggoods: Dumbbell,
    hardware: Wrench,
    fashionstore: Watch,
    homedecor: Home,
    cafe: Coffee,
    salon: Scissors,
  };

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        </div>

        <Container>
          <div className="text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium text-white mb-6" style={{backgroundColor: '#0066FF'}}>
                {toko.hero.badge}
              </span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                {toko.hero.title}{" "}
                <span className="bg-clip-text text-transparent" style={{backgroundImage: 'linear-gradient(to right, #0066FF, #0099FF)'}}>
                  {toko.hero.titleHighlight}
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                {toko.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                <span className="text-3xl font-bold" style={{color: '#0066FF'}}>{toko.hero.price}</span>
              </div>
              <Link href="/pricing">
                <button className="px-8 py-4 text-white rounded-xl font-semibold transition-opacity shadow-lg flex items-center gap-2 mx-auto group hover:opacity-90" style={{backgroundColor: '#0066FF'}}>
                  {toko.hero.getStarted}
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
            <h2 className="text-4xl font-bold mb-4 text-white">{toko.useCases.title}</h2>
            <p className="text-xl text-gray-300">{toko.useCases.subtitle}</p>
          </div>

          <div className="space-y-20">
            {Object.entries(toko.useCases).map(([key, useCase]: [string, any], idx) => {
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
                      <div className="p-3 rounded-2xl shadow-lg" style={{background: 'linear-gradient(to bottom right, #0066FF, #0099FF)', boxShadow: '0 10px 15px -3px rgba(0, 102, 255, 0.3)'}}>
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
                    <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-blue-500/30">
                      <p className="text-gray-300 italic">{useCase.story}</p>
                    </div>
                  </div>

                  <div className={isEven ? '' : 'md:col-start-1 md:row-start-1'}>
                    <div className="backdrop-blur-sm border rounded-3xl p-8 shadow-2xl" style={{background: 'linear-gradient(to bottom right, rgba(0, 102, 255, 0.15), rgba(0, 153, 255, 0.15))', borderColor: 'rgba(0, 102, 255, 0.2)'}}>
                      <h4 className="text-xl font-bold mb-6 text-white">How Kadai Toko Helps:</h4>
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

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{toko.features.title}</h2>
            <p className="text-xl text-gray-600">{toko.features.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {toko.features.list.map((feature: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Check className="w-5 h-5 text-blue-600" />
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
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">{toko.pricing.title}</h2>
              <p className="text-xl text-gray-600">{toko.pricing.subtitle}</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 text-center">
              <div className="mb-8">
                <div className="text-5xl font-bold text-blue-600 mb-2">
                  {toko.pricing.price}
                  <span className="text-2xl text-gray-600">{toko.pricing.period}</span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {toko.pricing.features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-xl">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-900">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href="/pricing">
                <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors shadow-lg flex items-center justify-center gap-2 mx-auto group">
                  {toko.pricing.cta}
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
            <h2 className="text-4xl font-bold text-center mb-12">{toko.faq.title}</h2>
            <div className="space-y-6">
              {toko.faq.items.map((item: any, idx: number) => (
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
      <section className="py-20 relative overflow-hidden" style={{background: 'linear-gradient(to bottom right, #0066FF, #0099FF)'}}>
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
              {toko.cta.title}
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              {toko.cta.subtitle}
            </p>
            <div className="flex flex-col items-center gap-4">
              <Link href="/pricing">
                <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-xl flex items-center gap-2 group">
                  {toko.cta.button}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <span className="text-blue-100 text-sm">{toko.cta.noCard}</span>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
