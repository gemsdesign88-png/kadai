"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export default function PricingPage() {
  const { language } = useLanguage();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');

  const allFeatures = [
    language === "en" ? "Complete order management system" : "Sistem manajemen pesanan lengkap",
    language === "en" ? "Real-time sales analytics & reports" : "Analitik & laporan penjualan real-time",
    language === "en" ? "Unlimited staff & user management" : "Manajemen staff & pengguna unlimited",
    language === "en" ? "Multi-outlet support" : "Dukungan multi-outlet",
    language === "en" ? "Kitchen display system integration" : "Integrasi sistem display dapur",
    language === "en" ? "Table & reservation management" : "Manajemen meja & reservasi",
    language === "en" ? "Inventory & stock tracking" : "Pelacakan inventori & stok",
    language === "en" ? "Customer loyalty & CRM system" : "Sistem loyalitas & CRM pelanggan",
    language === "en" ? "QR menu & online ordering" : "QR menu & pemesanan online",
    language === "en" ? "Multiple payment methods support" : "Dukungan berbagai metode pembayaran",
    language === "en" ? "Automatic data backup & security" : "Backup data & keamanan otomatis",
    language === "en" ? "24/7 priority customer support" : "Customer support prioritas 24/7",
  ];

  const pricing = {
    monthly: {
      price: 'Rp 149.000',
      period: language === "en" ? '/month' : '/bulan',
      total: 'Rp 149.000',
      perMonth: language === "en" ? 'per month' : 'per bulan'
    },
    yearly: {
      price: 'Rp 1.599.000',
      period: language === "en" ? '/year' : '/tahun',
      total: 'Rp 1.599.000',
      perMonth: language === "en" ? 'Rp 133.250/month' : 'Rp 133.250/bulan',
      savings: language === "en" ? 'Save Rp 189.000/year' : 'Hemat Rp 189.000/tahun'
    }
  };

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
          ? "Yes, we offer a free trial period for all new businesses."
          : "Ya, kami menawarkan periode uji coba gratis untuk semua bisnis baru.",
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
        language === "en" ? "How does pricing work for multiple outlets?" : "Bagaimana harga untuk beberapa outlet?",
      answer:
        language === "en"
          ? "Pricing is per outlet. Each outlet requires a separate subscription. For example, 3 outlets would be 3x the monthly/yearly price."
          : "Harga per outlet. Setiap outlet memerlukan langganan terpisah. Contoh: 3 outlet berarti 3x harga bulanan/tahunan.",
    },
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
                {language === "en" ? "💰 Simple & Transparent" : "💰 Sederhana & Transparan"}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              {language === "en" ? "One Plan," : "Satu Paket,"}{" "}
              <span className="bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent">
                {language === "en" ? "All Features" : "Semua Fitur"}
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {language === "en"
                ? "Everything you need to run your business. Price per outlet."
                : "Semua yang Anda butuhkan untuk menjalankan bisnis Anda. Harga per outlet."}
            </p>
          </motion.div>

          {/* Single Pricing Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative bg-white rounded-3xl p-12 border-2 border-gray-200 shadow-xl">
              {/* Features Grid - Top Section */}
              <div className="mb-12">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {language === "en" ? "Everything You Need" : "Semua Yang Anda Butuhkan"}
                  </h3>
                  <p className="text-gray-600">
                    {language === "en" ? "Complete POS solution for modern businesses" : "Solusi POS lengkap untuk bisnis modern"}
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 max-w-3xl mx-auto">
                  {allFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#10B981] to-[#059669] flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <span className="text-base text-gray-700 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t-2 border-gray-200 mb-10"></div>

              {/* CTA Section - Bottom */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {language === "en" ? "Choose Your Billing Period" : "Pilih Periode Pembayaran"}
                </h3>
                
                {/* Pricing Options */}
                <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
                  {/* Monthly Option */}
                  <button
                    onClick={() => setBillingPeriod('monthly')}
                    className={`relative p-6 rounded-2xl border-2 transition-all ${
                      billingPeriod === 'monthly'
                        ? 'border-[#FF5A5F] bg-gradient-to-br from-[#FF5A5F]/5 to-[#8B5CF6]/5 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-left">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-gray-900">
                          {language === "en" ? "Monthly" : "Bulanan"}
                        </span>
                        {billingPeriod === 'monthly' && (
                          <div className="w-6 h-6 bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="mb-2">
                        <div className="text-4xl font-bold bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent">
                          Rp 149.000
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {language === "en" ? 'per outlet/month' : 'per outlet/bulan'}
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Yearly Option */}
                  <button
                    onClick={() => setBillingPeriod('yearly')}
                    className={`relative p-6 rounded-2xl border-2 transition-all ${
                      billingPeriod === 'yearly'
                        ? 'border-[#10B981] bg-gradient-to-br from-[#10B981]/5 to-[#059669]/5 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {/* Best Value Badge */}
                    <div className="absolute -top-3 right-4 bg-gradient-to-r from-[#10B981] to-[#059669] text-white text-xs font-bold px-3 py-1 rounded-full">
                      {language === "en" ? "SAVE 11%" : "HEMAT 11%"}
                    </div>
                    
                    <div className="text-left">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-gray-900">
                          {language === "en" ? "Yearly" : "Tahunan"}
                        </span>
                        {billingPeriod === 'yearly' && (
                          <div className="w-6 h-6 bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="mb-2">
                        <div className="text-4xl font-bold text-[#10B981]">
                          Rp 1.599.000
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {language === "en" ? 'per outlet/year · Rp 133.250/month' : 'per outlet/tahun · Rp 133.250/bulan'}
                        </div>
                      </div>
                    </div>
                  </button>
                </div>

                {/* CTA Button */}
                <a
                  href="https://wa.me/6281339765775"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center px-12 py-5 rounded-full font-bold text-white text-lg shadow-2xl transition-all ${
                    billingPeriod === 'yearly'
                      ? 'bg-gradient-to-r from-[#10B981] to-[#059669] hover:shadow-green-500/50'
                      : 'bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] hover:shadow-purple-500/50'
                  }`}
                >
                  {language === "en" ? "Get Started Now →" : "Mulai Sekarang →"}
                </a>
                
                {billingPeriod === 'yearly' && (
                  <p className="mt-4 text-sm font-semibold text-green-600">
                    💰 {language === "en" ? 'Save Rp 189.000/year' : 'Hemat Rp 189.000/tahun'}
                  </p>
                )}
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
              {language === "en" ? "Ready to Transform Your Business?" : "Siap Transformasi Bisnis Anda?"}
            </h2>
            <p className="text-xl text-white/80 mb-8">
              {language === "en"
                ? "Start modernizing your business operations today"
                : "Mulai modernisasi operasi bisnis Anda hari ini"}
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
