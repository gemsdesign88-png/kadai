"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function PricingPage() {
  const [language, setLanguage] = useState<"en" | "id">("id");

  const plans = [
    {
      id: 'monthly',
      name: language === "en" ? "Monthly Plan" : "Paket Bulanan",
      icon: '📅',
      price: 'Rp 299.000',
      priceNumber: 299000,
      period: language === "en" ? '/month' : '/bulan',
      duration: language === "en" ? '1 month' : '1 bulan',
      badge: '',
      features: [
        language === "en" ? "Access to all complete features" : "Akses semua fitur lengkap",
        language === "en" ? "Real-time analytics dashboard" : "Dashboard analitik real-time",
        language === "en" ? "Unlimited staff management" : "Manajemen staff unlimited",
        language === "en" ? "WhatsApp support" : "Support via WhatsApp",
        language === "en" ? "Free updates" : "Update gratis",
        language === "en" ? "Automatic data backup" : "Backup data otomatis"
      ],
      color: '#3B82F6'
    },
    {
      id: 'yearly',
      name: language === "en" ? "Yearly Plan" : "Paket Tahunan",
      icon: '⭐',
      price: 'Rp 2.999.000',
      priceNumber: 2999000,
      period: language === "en" ? '/year' : '/tahun',
      duration: language === "en" ? '1 year' : '1 tahun',
      badge: language === "en" ? 'Save 17%' : 'Hemat 17%',
      features: [
        language === "en" ? "All Monthly Plan features" : "Semua fitur Paket Bulanan",
        language === "en" ? "Priority support 24/7" : "Priority support 24/7",
        language === "en" ? "Free online training" : "Training online gratis",
        language === "en" ? "Custom report builder" : "Custom report builder",
        language === "en" ? "Multi-outlet (up to 3)" : "Multi-outlet (hingga 3)",
        language === "en" ? "Business consultation" : "Konsultasi bisnis"
      ],
      color: '#10B981',
      popular: true
    },
    {
      id: 'lifetime',
      name: language === "en" ? "Lifetime Plan" : "Paket Lifetime",
      icon: '👑',
      price: 'Rp 9.999.000',
      priceNumber: 9999000,
      period: language === "en" ? 'one-time payment' : 'sekali bayar',
      duration: language === "en" ? 'Forever' : 'Selamanya',
      badge: language === "en" ? 'Best Value' : 'Best Value',
      features: [
        language === "en" ? "All Yearly Plan features" : "Semua fitur Paket Tahunan",
        language === "en" ? "Lifetime updates" : "Lifetime updates",
        language === "en" ? "Unlimited outlets" : "Unlimited outlets",
        language === "en" ? "White-label options" : "White-label options",
        language === "en" ? "Dedicated account manager" : "Dedicated account manager",
        language === "en" ? "Custom feature development" : "Custom feature development"
      ],
      color: '#FF5A5F',
      premium: true
    }
  ];

  const faqs = [
    {
      question: language === "en" ? "Can I switch plans?" : "Bisakah saya mengubah paket?",
      answer:
        language === "en"
          ? "Yes, you can upgrade or downgrade your plan at any time. Just contact us via WhatsApp."
          : "Ya, Anda dapat meningkatkan atau menurunkan paket Anda kapan saja. Hubungi kami via WhatsApp.",
    },
    {
      question:
        language === "en" ? "Is there a free trial?" : "Apakah ada uji coba gratis?",
      answer:
        language === "en"
          ? "Yes, we offer a free trial period for all new restaurants."
          : "Ya, kami menawarkan periode uji coba gratis untuk semua restoran baru.",
    },
    {
      question:
        language === "en" ? "What payment methods do you accept?" : "Metode pembayaran apa yang Anda terima?",
      answer:
        language === "en"
          ? "We accept bank transfers (BCA). Simply transfer and send proof via WhatsApp for activation."
          : "Kami menerima transfer bank (BCA). Cukup transfer dan kirim bukti via WhatsApp untuk aktivasi.",
    },
    {
      question:
        language === "en" ? "Can I use for multiple outlets?" : "Bisakah digunakan untuk beberapa outlet?",
      answer:
        language === "en"
          ? "Yes! Yearly Plan supports up to 3 outlets, while Lifetime Plan supports unlimited outlets."
          : "Ya! Paket Tahunan mendukung hingga 3 outlet, sedangkan Paket Lifetime mendukung outlet tanpa batas.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Language Toggle */}
      <div className="fixed top-24 right-6 z-50">
        <button
          onClick={() => setLanguage(language === "en" ? "id" : "en")}
          className="px-4 py-2 bg-white rounded-full shadow-lg text-sm font-medium hover:shadow-xl transition-shadow"
        >
          {language === "en" ? "🇮🇩 ID" : "🇬🇧 EN"}
        </button>
      </div>

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
                {language === "en" ? "💰 Simple & Transparent" : "💰 Sederhana & Transparan"}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              {language === "en" ? "Choose Your" : "Pilih Paket"}{" "}
              <span className="bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent">
                {language === "en" ? "Perfect Plan" : "Sempurna"}
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {language === "en"
                ? "Flexible pricing designed for restaurants of all sizes"
                : "Harga fleksibel yang dirancang untuk restoran dari berbagai ukuran"}
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-[#10B981] to-[#059669] text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                      ⭐ {language === "en" ? "MOST POPULAR" : "PALING POPULER"}
                    </div>
                  </div>
                )}
                {plan.premium && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                      👑 PREMIUM
                    </div>
                  </div>
                )}

                <div
                  className={`relative h-full bg-white rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                    plan.popular
                      ? "border-[#10B981] shadow-xl"
                      : plan.premium
                      ? "border-[#FF5A5F] shadow-xl"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {/* Plan Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{plan.icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                      {plan.badge && (
                        <div className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-semibold text-white" style={{ backgroundColor: plan.color }}>
                          {plan.badge}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold" style={{ color: plan.color }}>
                        {plan.price}
                      </span>
                      <span className="text-gray-600 text-sm">{plan.period}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{plan.duration}</p>
                  </div>

                  {/* CTA Button */}
                  <a
                    href="https://wa.me/6281339765775"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-6 py-3 mb-8 rounded-full font-semibold text-white bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] hover:shadow-lg transition-shadow"
                  >
                    {language === "en" ? "Get Started →" : "Mulai Sekarang →"}
                  </a>

                  {/* Features */}
                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="mt-0.5">
                          <Check className="w-5 h-5 text-green-500" />
                        </div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Payment Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 max-w-3xl mx-auto text-center"
          >
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {language === "en" ? "💳 Easy Payment Process" : "💳 Proses Pembayaran Mudah"}
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] text-white flex items-center justify-center font-bold mb-2">
                    1
                  </div>
                  <p className="text-sm text-gray-700">
                    {language === "en" ? "Transfer to BCA 8690868653 (Gemmy Adyendra)" : "Transfer ke BCA 8690868653 a/n Gemmy Adyendra"}
                  </p>
                </div>
                <div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] text-white flex items-center justify-center font-bold mb-2">
                    2
                  </div>
                  <p className="text-sm text-gray-700">
                    {language === "en" ? "Send proof via WhatsApp" : "Kirim bukti via WhatsApp"}
                  </p>
                </div>
                <div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] text-white flex items-center justify-center font-bold mb-2">
                    3
                  </div>
                  <p className="text-sm text-gray-700">
                    {language === "en" ? "Get activated within 24 hours" : "Aktivasi dalam 1x24 jam"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                {language === "en" ? "Frequently Asked" : "Pertanyaan yang"}{" "}
                <span className="bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent">
                  {language === "en" ? "Questions" : "Sering Diajukan"}
                </span>
              </h2>
              <p className="text-gray-600">
                {language === "en" ? "Everything you need to know" : "Semua yang perlu Anda ketahui"}
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
              {language === "en" ? "Ready to Transform Your Restaurant?" : "Siap Transformasi Restoran Anda?"}
            </h2>
            <p className="text-xl text-white/80 mb-8">
              {language === "en"
                ? "Join hundreds of restaurants already using KadaiPOS"
                : "Bergabung dengan ratusan restoran yang sudah menggunakan KadaiPOS"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/6281339765775"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] text-white rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all"
              >
                {language === "en" ? "Contact Sales" : "Hubungi Sales"}
              </a>
              <a
                href="/features"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold border border-white/20 hover:bg-white/20 transition-all"
              >
                {language === "en" ? "View All Features" : "Lihat Semua Fitur"}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
