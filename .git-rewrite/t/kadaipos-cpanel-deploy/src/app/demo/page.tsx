'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/context';
import { Rocket, Bell, Sparkles, Calendar, Phone, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function DemoPage() {
  const { language } = useLanguage();
  const [whatsapp, setWhatsapp] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement WhatsApp number collection
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const features = [
    {
      icon: Rocket,
      title: language === "en" ? "Live Demo" : "Demo Langsung",
      description: language === "en"
        ? "Experience KadaiPOS in action with interactive demo"
        : "Rasakan KadaiPOS dengan demo interaktif"
    },
    {
      icon: Calendar,
      title: language === "en" ? "Schedule Tour" : "Jadwalkan Tour",
      description: language === "en"
        ? "Book a personalized walkthrough with our team"
        : "Booking tour personal dengan tim kami"
    },
    {
      icon: Sparkles,
      title: language === "en" ? "Try All Features" : "Coba Semua Fitur",
      description: language === "en"
        ? "Explore every feature without limitations"
        : "Jelajahi semua fitur tanpa batasan"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-32 pb-20">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#FF5A5F]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 -left-40 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute -bottom-40 right-1/3 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Coming Soon Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF5A5F]/10 to-[#8B5CF6]/10 backdrop-blur-sm rounded-full border border-[#FF5A5F]/20 mb-8"
            >
              <Sparkles className="w-5 h-5 text-[#FF5A5F]" />
              <span className="text-sm font-semibold bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent">
                {language === "en" ? "COMING SOON" : "SEGERA HADIR"}
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              {language === "en" ? "Experience" : "Rasakan"}{" "}
              <span className="bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent">
                {language === "en" ? "KadaiPOS" : "KadaiPOS"}
              </span>
              <br />
              {language === "en" ? "Live Demo" : "Demo Langsung"}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 mb-12 leading-relaxed"
            >
              {language === "en"
                ? "We're preparing an amazing interactive demo experience for you. Leave your WhatsApp number and we'll notify you when it's ready!"
                : "Kami sedang mempersiapkan pengalaman demo interaktif yang luar biasa untuk Anda. Tinggalkan nomor WhatsApp Anda dan kami akan memberitahu Anda saat sudah siap!"}
            </motion.p>

            {/* WhatsApp Notification Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-md mx-auto mb-16"
            >
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder={language === "en" ? "WhatsApp number (e.g., 628123456789)" : "Nomor WhatsApp (contoh: 628123456789)"}
                    required
                    pattern="[0-9]{10,15}"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#FF5A5F] focus:outline-none transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitted}
                  className="px-8 py-4 bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {isSubmitted ? (
                    <>
                      <Bell className="w-5 h-5" />
                      {language === "en" ? "Registered!" : "Terdaftar!"}
                    </>
                  ) : (
                    <>
                      {language === "en" ? "Notify Me" : "Beritahu Saya"}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
              {isSubmitted && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-green-600 font-medium"
                >
                  {language === "en"
                    ? "✓ We'll notify you via WhatsApp when the demo is ready!"
                    : "✓ Kami akan memberitahu Anda via WhatsApp saat demo sudah siap!"}
                </motion.p>
              )}
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 hover:border-[#FF5A5F]/30 hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FF5A5F]/10 to-[#8B5CF6]/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-[#FF5A5F]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Meanwhile Section */}
      <div className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">
              {language === "en" ? "Meanwhile..." : "Sementara itu..."}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {language === "en"
                ? "Want to learn more about KadaiPOS? Explore our features or contact us directly!"
                : "Ingin tahu lebih banyak tentang KadaiPOS? Jelajahi fitur kami atau hubungi kami langsung!"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/features"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                {language === "en" ? "Explore Features" : "Jelajahi Fitur"}
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/6281339765775"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl border-2 border-gray-200 hover:border-[#FF5A5F] hover:shadow-lg transition-all"
              >
                {language === "en" ? "Contact Us" : "Hubungi Kami"}
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-center mb-12">
              {language === "en" ? "What's Coming" : "Yang Akan Hadir"}
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: language === "en" ? "Interactive Product Tour" : "Tur Produk Interaktif",
                  desc: language === "en" ? "Click through the full KadaiPOS interface" : "Jelajahi seluruh antarmuka KadaiPOS"
                },
                {
                  title: language === "en" ? "Sample Data & Scenarios" : "Data & Skenario Contoh",
                  desc: language === "en" ? "Try realistic business scenarios" : "Coba skenario bisnis yang realistis"
                },
                {
                  title: language === "en" ? "Video Walkthrough" : "Video Tutorial",
                  desc: language === "en" ? "Guided video demonstrations" : "Demonstrasi video terpandu"
                },
                {
                  title: language === "en" ? "Live Chat Support" : "Dukungan Live Chat",
                  desc: language === "en" ? "Get instant help while exploring" : "Dapatkan bantuan instan saat menjelajah"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 items-start bg-white rounded-xl p-6 border border-gray-200 hover:border-[#FF5A5F]/30 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] flex items-center justify-center flex-shrink-0 text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF5A5F]/20 via-[#8B5CF6]/20 to-[#3B82F6]/20" />
        </div>

        <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#FF5A5F]/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#8B5CF6]/30 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {language === "en" ? "Can't Wait?" : "Tidak Sabar?"}
            </h2>
            <p className="text-xl text-white/80 mb-8">
              {language === "en"
                ? "Talk to our team and get started with KadaiPOS today"
                : "Bicara dengan tim kami dan mulai dengan KadaiPOS hari ini"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/6281339765775"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-semibold rounded-xl hover:shadow-xl transition-all"
              >
                {language === "en" ? "Chat on WhatsApp" : "Chat di WhatsApp"}
              </a>
              <a
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all"
              >
                {language === "en" ? "View Pricing" : "Lihat Harga"}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
