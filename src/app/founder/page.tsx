"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { useLanguage } from "@/lib/i18n/context"
import { 
  Quote, 
  Heart, 
  Target, 
  ArrowLeft,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Zap
} from "lucide-react"
import Link from "next/link"

export default function FounderMessagePage() {
  const { t, language } = useLanguage()
  const founder = t.about.team.founder

  return (
    <main className="min-h-screen bg-[#0A0A0B] text-white pt-32 pb-24 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] bg-[#FF5A5F]/10 rounded-full blur-[120px]" />
      </div>

      <Container className="relative z-10">
        {/* Navigation */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Portal</span>
        </Link>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#FF5A5F] text-[10px] font-black uppercase tracking-[0.3em] mb-6">
              Leadership Perspective
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none">
              {founder.messageTitle}
            </h1>
            <p className="text-xl text-gray-400 font-medium">
              {founder.messageSubtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Personal Card */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl space-y-8"
              >
                <div className="space-y-4">
                  <div className="relative">
                    <div className="relative w-full aspect-square rounded-2xl bg-gray-800 border border-white/10 flex items-center justify-center overflow-hidden">
                      <img 
                        src="/founder.png" 
                        alt={founder.name} 
                        className="w-full h-full object-cover pointer-events-none"
                      />
                    </div>
                  </div>
                  
                  <div className="px-2">
                    <h3 className="text-2xl font-black tracking-tight text-white mb-1">{founder.name}</h3>
                    <p className="text-sm text-[#FF5A5F] font-black uppercase tracking-wider">{founder.role}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-400 font-medium">
                    <Sparkles className="w-4 h-4 text-[#FF5A5F]" />
                    <span>Est. 2025</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400 font-medium">
                    <Heart className="w-4 h-4 text-[#FF5A5F]" />
                    <span>Jakarta, Indonesia</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <a
                    href="https://www.linkedin.com/in/gemmy-adyendra-agardi/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-[#FF5A5F] text-white font-black uppercase tracking-widest text-[11px] hover:bg-[#E8484D] transition-all shadow-[0_0_20px_rgba(255,90,95,0.2)]"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Connect on LinkedIn
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Narrative */}
            <div className="lg:col-span-8 space-y-16">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <Quote className="absolute -top-8 -left-8 w-16 h-16 text-white/5 pointer-events-none" />
                
                <div className="prose prose-invert max-w-none">
                  <div className="space-y-12">
                    <section>
                      <h2 className="text-2xl font-black uppercase tracking-widest text-white/40 mb-6 flex items-center gap-4">
                        <span className="h-px flex-1 bg-white/10" />
                        {founder.storyTitle}
                      </h2>
                      <p className="text-xl text-gray-300 leading-relaxed font-medium">
                        {founder.storyContent}
                      </p>
                    </section>

                    <section>
                      <h2 className="text-2xl font-black uppercase tracking-widest text-white/40 mb-6 flex items-center gap-4">
                        <span className="h-px flex-1 bg-white/10" />
                        {founder.visionTitle}
                      </h2>
                      <p className="text-xl text-gray-300 leading-relaxed font-medium">
                        {founder.visionContent}
                      </p>
                    </section>

                    <section className="bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl group-hover:bg-purple-600/20 transition-colors" />
                      <div className="relative z-10">
                        <h2 className="text-2xl font-black mb-6 text-white flex items-center gap-3">
                          <ShieldCheck className="w-6 h-6 text-[#FF5A5F]" />
                          {founder.commitmentTitle}
                        </h2>
                        <p className="text-lg text-gray-400 font-medium italic border-l-2 border-[#FF5A5F] pl-6 mb-8">
                          "{founder.commitmentContent}"
                        </p>
                      </div>
                    </section>
                  </div>
                </div>

                {/* Sign-off */}
                <div className="mt-20 space-y-2">
                  <p className="text-gray-500 font-medium italic">{founder.signOff}</p>
                  <p className="text-4xl font-cursive text-white tracking-widest" style={{ fontFamily: 'Georgia, serif' }}>
                    {founder.name}
                  </p>
                  <p className="text-[10px] uppercase font-black tracking-[0.4em] text-gray-600">
                    Founder, Kadai Business OS
                  </p>
                </div>
              </motion.div>

              {/* Founder Values Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
                <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 group hover:border-[#FF5A5F]/30 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF5A5F]/10 flex items-center justify-center mb-6">
                    <Target className="w-6 h-6 text-[#FF5A5F]" />
                  </div>
                  <h4 className="text-lg font-black mb-2 tracking-tight">Radical Simplicity</h4>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">
                    We believe complexity is the enemy of growth. Everything we build is designed to be mastered in minutes.
                  </p>
                </div>
                <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 group hover:border-purple-500/30 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6">
                    <Zap className="w-6 h-6 text-purple-500" />
                  </div>
                  <h4 className="text-lg font-black mb-2 tracking-tight">Active Partnership</h4>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed">
                    We don't just sell licenses; we invest in your success. Your feedback directly shapes our engine.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}
