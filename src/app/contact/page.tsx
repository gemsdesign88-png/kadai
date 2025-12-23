'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/context';
import { MessageCircle, Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const { t } = useLanguage();
  const [whatsapp, setWhatsapp] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement WhatsApp number collection
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const contactMethods = [
    {
      icon: MessageCircle,
      title: t.contact.contactMethods.whatsapp.title,
      description: t.contact.contactMethods.whatsapp.description,
      action: "https://wa.me/6281339765775"
    },
    {
      icon: Mail,
      title: t.contact.contactMethods.email.title,
      description: t.contact.contactMethods.email.description,
      action: "mailto:mamak@kadaipos.id"
    },
    {
      icon: Phone,
      title: t.contact.contactMethods.phone.title,
      description: t.contact.contactMethods.phone.description,
      action: "tel:+6281339765775"
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
              <Send className="w-5 h-5 text-[#FF5A5F]" />
              <span className="text-sm font-semibold bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent">
                {t.contact.badge}
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              {t.contact.title}{" "}
              <span className="bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent">
                {t.contact.titleHighlight}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 mb-12 leading-relaxed"
            >
              {t.contact.subtitle}
            </motion.p>

            {/* WhatsApp Quick Contact */}
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
                    placeholder={t.contact.whatsappPlaceholder}
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
                      <MessageCircle className="w-5 h-5" />
                      {t.contact.registered}
                    </>
                  ) : (
                    <>
                      {t.contact.contactMe}
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
                  {t.contact.successMessage}
                </motion.p>
              )}
            </motion.div>
          </motion.div>

          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.action}
                target={method.action.startsWith('http') ? '_blank' : undefined}
                rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 hover:border-[#FF5A5F]/30 hover:shadow-xl transition-all group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FF5A5F]/10 to-[#8B5CF6]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <method.icon className="w-7 h-7 text-[#FF5A5F]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {method.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {method.description}
                </p>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Location/Info Section */}
      <div className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#FF5A5F]/10 to-[#8B5CF6]/10 mb-6">
              <MapPin className="w-8 h-8 text-[#FF5A5F]" />
            </div>
            <h2 className="text-4xl font-bold mb-4">
              {t.contact.visitUs.title}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t.contact.visitUs.subtitle}
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-full text-gray-700 font-semibold">
              <MapPin className="w-5 h-5" />
              {t.contact.visitUs.location}
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
              {t.contact.cta.title}
            </h2>
            <p className="text-xl text-white/80 mb-8">
              {t.contact.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/6281339765775"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-semibold rounded-xl hover:shadow-xl transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                {t.contact.cta.chatOnWhatsApp}
              </a>
              <a
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all"
              >
                {t.contact.cta.viewPricing}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
