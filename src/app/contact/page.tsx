'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/context';
import { MessageCircle, Mail, MapPin, Send, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import ContactForm from '@/components/forms/ContactForm';

export default function ContactPage() {
  const { t } = useLanguage();

  const contactMethods = [
    {
      icon: MessageCircle,
      title: t.contact.contactMethods.whatsapp.title,
      description: t.contact.contactMethods.whatsapp.description,
      action: "https://wa.me/628211031903"
    },
    {
      icon: Mail,
      title: t.contact.contactMethods.email.title,
      description: t.contact.contactMethods.email.description,
      action: "mailto:mamak@kadaipos.id"
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
            className="text-center max-w-4xl mx-auto mb-20"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-gray-100 mb-8 shadow-sm"
            >
              <Sparkles className="w-5 h-5 text-[#FF5A5F]" />
              <span className="text-sm font-bold uppercase tracking-widest text-gray-900">
                {t.contact.titleHighlight}
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]"
            >
              {t.contact.title}{" "}
              <span className="bg-gradient-to-r from-[#FF5A5F] to-purple-600 bg-clip-text text-transparent">
                Expert Support
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium"
            >
              {t.contact.subtitle}
            </motion.p>
          </motion.div>

          {/* Contact Form Section */}
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left Side: Info & Methods */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-12"
              >
                <div className="grid gap-6">
                  {contactMethods.map((method, index) => (
                    <motion.a
                      key={index}
                      href={method.action}
                      target={method.action.startsWith('http') ? '_blank' : undefined}
                      rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group flex items-start gap-6 p-8 bg-white rounded-[32px] border border-gray-100 hover:border-[#FF5A5F]/30 hover:shadow-xl transition-all"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-all duration-500">
                        <method.icon className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                        <p className="text-gray-500 font-medium leading-relaxed">{method.description}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Professional Support Badge */}
                <div className="p-10 bg-gradient-to-br from-gray-900 to-black rounded-[40px] text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Sparkles className="w-20 h-20 text-white" />
                  </div>
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10 mb-6">
                      <CheckCircle2 className="w-4 h-4 text-[#FF5A5F]" />
                      <span className="text-xs font-black uppercase tracking-widest">{t.contact.supportCard.badge}</span>
                    </div>
                    <h3 className="text-2xl font-black mb-4 leading-tight">{t.contact.supportCard.title}</h3>
                    <p className="text-gray-400 font-medium leading-relaxed">
                      {t.contact.supportCard.description}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Right Side: High Fidelity Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="relative"
              >
                <ContactForm type="contact" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Location/Info Section */}
      <section className="py-24 border-y border-gray-100 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center mb-10 rotate-3">
              <MapPin className="w-8 h-8" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
              {t.contact.visitUs.title}
            </h2>
            <p className="text-xl text-gray-500 mb-12 font-medium max-w-2xl">
              {t.contact.visitUs.subtitle}
            </p>
            
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-gray-50 rounded-full border border-gray-100 text-gray-900 font-bold uppercase tracking-widest text-sm shadow-sm hover:shadow-md transition-shadow">
              <span className="w-2 h-2 rounded-full bg-[#FF5A5F] animate-pulse" />
              {t.contact.visitUs.location}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#FF5A5F]/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
              {t.contact.cta.title}
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 font-medium max-w-2xl mx-auto">
              {t.contact.cta.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="https://wa.me/628211031903"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-10 py-5 bg-white text-gray-900 font-black rounded-2xl hover:bg-gray-50 transition-all flex items-center gap-3 w-full sm:w-auto justify-center overflow-hidden"
              >
                <div className="absolute inset-x-0 h-1 bottom-0 bg-gradient-to-r from-[#FF5A5F] to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                <MessageCircle className="w-5 h-5 text-[#FF5A5F]" />
                <span className="uppercase tracking-widest text-xs">{t.contact.cta.chatOnWhatsApp}</span>
              </a>
              
              <Link
                href="/pricing"
                className="px-10 py-5 bg-white/5 backdrop-blur-md text-white border border-white/10 font-black rounded-2xl hover:bg-white/10 transition-all w-full sm:w-auto justify-center text-center uppercase tracking-widest text-xs"
              >
                {t.contact.cta.viewPricing}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
