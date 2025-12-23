"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/context";
import { Target, Users, Zap, Heart, Award, TrendingUp } from "lucide-react";

export default function AboutPage() {
  const { t } = useLanguage();

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
    },
    {
      icon: Award,
      title: t.about.values.reliabilitySecurity.title,
      description: t.about.values.reliabilitySecurity.description,
      color: "#10B981",
      principles: t.about.values.reliabilitySecurity.principles
    },
    {
      icon: TrendingUp,
      title: t.about.values.growthPartnership.title,
      description: t.about.values.growthPartnership.description,
      color: "#F59E0B",
      principles: t.about.values.growthPartnership.principles
    },
    {
      icon: Target,
      title: t.about.values.transparencyTrust.title,
      description: t.about.values.transparencyTrust.description,
      color: "#EF4444",
      principles: t.about.values.transparencyTrust.principles
    }
  ];

  const stats = [
    {
      number: "2025",
      label: t.about.stats.founded
    },
    {
      number: "100%",
      label: t.about.stats.cloudBased
    },
    {
      number: "13+",
      label: t.about.stats.coreFeatures
    },
    {
      number: "24/7",
      label: t.about.stats.supportReady
    }
  ];

  const team = [
    {
      name: "Gemmy Adyendra",
      role: t.about.team.founder.role,
      description: t.about.team.founder.description
    }
  ];

  const whyChooseUs = [
    {
      icon: Award,
      title: t.about.whyChooseUs.modernTechnology.title,
      description: t.about.whyChooseUs.modernTechnology.description
    },
    {
      icon: TrendingUp,
      title: t.about.whyChooseUs.rapidDevelopment.title,
      description: t.about.whyChooseUs.rapidDevelopment.description
    },
    {
      icon: Heart,
      title: t.about.whyChooseUs.builtForIndonesia.title,
      description: t.about.whyChooseUs.builtForIndonesia.description
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-32 pb-20">
        {/* Animated Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#FF5A5F]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 -left-40 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute -bottom-40 right-1/3 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 mb-6">
              <span className="text-sm font-medium text-gray-700">
                {t.about.badge}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              {t.about.title}{" "}
              <span className="bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent">
                {t.about.titleHighlight}
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t.about.subtitle}
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-20"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              {t.about.values.title}{" "}
              <span className="bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent">
                {t.about.values.titleHighlight}
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t.about.values.subtitle}
            </p>
          </motion.div>

          <div className="space-y-12 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 md:p-10 border border-gray-200 hover:border-gray-300 transition-all hover:shadow-lg"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${value.color}15` }}>
                      <value.icon className="w-8 h-8" style={{ color: value.color }} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">{value.description}</p>
                    {value.principles && (
                      <div className="grid md:grid-cols-2 gap-2 mt-4">
                        {value.principles.map((principle, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className="mt-1.5 flex-shrink-0">
                              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: value.color }} />
                            </div>
                            <span className="text-sm text-gray-700">{principle}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              {t.about.whyChooseUs.title}{" "}
              <span className="bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent">
                {t.about.whyChooseUs.titleHighlight}
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FF5A5F]/10 to-[#8B5CF6]/10 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-[#FF5A5F]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              {t.about.team.title}{" "}
              <span className="bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent">
                {t.about.team.titleHighlight}
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t.about.team.subtitle}
            </p>
          </motion.div>

          <div className="max-w-md mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 border-2 border-gray-200 text-center"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-[#FF5A5F] font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 overflow-hidden">
        {/* Dark Background with Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF5A5F]/20 via-[#8B5CF6]/20 to-[#3B82F6]/20" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        </div>

        {/* Floating Orbs */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#FF5A5F]/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#8B5CF6]/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#3B82F6]/30 rounded-full blur-3xl animate-pulse delay-2000" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t.about.cta.title}
            </h2>
            <p className="text-xl text-white/80 mb-8">
              {t.about.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/6281339765775"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] text-white rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all"
              >
                {t.about.cta.contactUs}
              </a>
              <a
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold border border-white/20 hover:bg-white/20 transition-all"
              >
                {t.about.cta.viewPricing}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
