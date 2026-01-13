"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/context";
import { Target, Users, Zap, Heart, Award, TrendingUp, Sparkles, Shield, Rocket } from "lucide-react";
import { Container } from "@/components/ui/container";
import Link from "next/link";

export default function AboutPage() {
  const { language, t } = useLanguage();

  const tText = (en: string, id: string, zh: string) => {
    if (language === "id") return id;
    if (language === "zh") return zh;
    return en;
  };

  const values = [
    {
      icon: Users,
      title: t.about.values.customerFirst.title,
      description: t.about.values.customerFirst.description,
      color: "#FF5A5F",
      principles: t.about.values.customerFirst.principles
    },
    {
      icon: Zap,
      title: t.about.values.innovationSimplicity.title,
      description: t.about.values.innovationSimplicity.description,
      color: "#8B5CF6",
      principles: t.about.values.innovationSimplicity.principles
    },
    {
      icon: Heart,
      title: t.about.values.builtForIndonesia.title,
      description: t.about.values.builtForIndonesia.description,
      color: "#3B82F6",
      principles: t.about.values.builtForIndonesia.principles
    }
  ];

  const stats = [
    {
      number: "2025",
      label: t.about.stats.founded,
      icon: Rocket
    },
    {
      number: "100%",
      label: t.about.stats.cloudBased,
      icon: Shield
    },
    {
      number: "13+",
      label: t.about.stats.coreFeatures,
      icon: Sparkles
    },
    {
      number: "24/7",
      label: t.about.stats.supportReady,
      icon: Heart
    }
  ];

  return (
    <main className="bg-white">
      {/* Hero Section - Minimalist & Bold */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gray-50/50">
        <Container>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-black bg-gray-900 text-white mb-8 tracking-widest uppercase">
                {t.about.badge}
              </span>
              <h1 className="text-5xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-[0.9]">
                {t.about.title} <br/>
                <span className="bg-gradient-to-r from-[#FF5A5F] to-purple-600 bg-clip-text text-transparent">
                  {t.about.titleHighlight}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
                {t.about.subtitle}
              </p>
            </motion.div>
          </div>
        </Container>

        {/* Decorative Grid */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </section>

      {/* Stats - Grid Modern */}
      <section className="py-24 border-y border-gray-100">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-900 group-hover:text-white transition-all duration-500 rotate-3 group-hover:rotate-0">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-5xl font-black text-gray-900 mb-2 tracking-tighter">
                  {stat.number}
                </div>
                <div className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 tracking-tight">
                {t.about.values.title} <br/>
                <span className="text-[#FF5A5F]">{t.about.values.titleHighlight}</span>
              </h2>
              <p className="text-xl text-gray-600 font-medium leading-relaxed mb-12">
                {t.about.values.subtitle}
              </p>
              <div className="space-y-8">
                {values.map((v, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex-shrink-0 flex items-center justify-center">
                      <v.icon className="w-6 h-6 text-gray-900" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{v.title}</h4>
                      <p className="text-gray-500 font-medium">{v.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF5A5F] to-purple-600 rounded-[60px] blur-[100px] opacity-10 animate-pulse" />
              <div className="relative h-full w-full bg-gray-900 rounded-[60px] p-12 overflow-hidden border border-gray-800 flex flex-col justify-end">
                <div className="absolute top-12 left-12">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 className="text-3xl font-black text-white mb-4 leading-tight">
                  {tText(
                    "Building the Business OS for the next generation.",
                    "Membangun Business OS untuk generasi masa depan.",
                    "为下一代打造业务操作系统。"
                  )}
                </h3>
                <div className="flex gap-2">
                  <div className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-white/60">Cloud Native</div>
                  <div className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-white/60">AI Driven</div>
                  <div className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-white/60">Mobile First</div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Creator Focus */}
      <section className="py-32 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto bg-white rounded-[60px] p-12 md:p-24 border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <Sparkles className="w-32 h-32 text-[#FF5A5F]" />
            </div>
            
            <div className="relative z-10 text-center">
              <div className="w-40 h-40 rounded-full bg-gray-900 mx-auto mb-8 flex items-center justify-center text-white ring-8 ring-gray-50 overflow-hidden">
                <img 
                  src="/founder.png" 
                  alt="Gemmy Adyendra" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-2">Gemmy Adyendra</h2>
              <p className="text-[#FF5A5F] font-black uppercase tracking-widest text-sm mb-8">{t.about.team.founder.role}</p>
              <p className="text-xl md:text-2xl text-gray-500 font-medium italic leading-relaxed mb-10">
                "{t.about.team.founder.description}"
              </p>
              <Link 
                href="/founder" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-[#FF5A5F] transition-all shadow-lg hover:shadow-[#FF5A5F]/20"
              >
                {t.about.team.founder.readMessage}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-white">
        <Container>
          <div className="bg-gray-900 rounded-[60px] p-12 md:p-24 relative overflow-hidden text-center text-white">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF5A5F]/20 to-purple-600/20 opacity-40" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[0.95] tracking-tighter">
                {t.about.cta.title}
              </h2>
              <p className="text-xl text-white/60 font-medium mb-12 leading-relaxed">
                {t.about.cta.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="https://wa.me/628211031903"
                  className="px-8 py-5 bg-white text-gray-900 rounded-full font-black hover:scale-105 transition-transform"
                >
                  {t.about.cta.contactUs}
                </Link>
                <Link
                  href="/pricing"
                  className="px-8 py-5 border-2 border-white/20 text-white rounded-full font-black hover:bg-white/10 transition-colors"
                >
                  {t.about.cta.viewPricing}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
