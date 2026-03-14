"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/context";
import { Container } from "@/components/ui/container";
import { 
  ChefHat, 
  Check, 
  ArrowRight,
  TrendingUp,
  Users,
  PackageCheck,
  BarChart3,
  ShoppingBag,
  Package,
  QrCode,
  Target,
  FileText,
  Grid3x3,
  Barcode,
  AlertCircle,
  Globe,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PreppoPage() {
  const { t } = useLanguage();
  const preppo = t.preppoPage;
  const [isYearly, setIsYearly] = useState(false);

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-yellow-50 via-white to-orange-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        </div>

        <Container>
          <div className="text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium text-white mb-6" style={{backgroundColor: '#F59E0B'}}>
                <ChefHat className="w-4 h-4 mr-2" />
                {preppo.hero.badge}
              </span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                {preppo.hero.title}{" "}
                <span className="bg-clip-text text-transparent" style={{backgroundImage: 'linear-gradient(to right, #F59E0B, #F97316)'}}>
                  {preppo.hero.titleHighlight}
                </span>
                {preppo.hero.titleSuffix && ` ${preppo.hero.titleSuffix}`}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                {preppo.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                <span className="text-lg text-gray-600">
                  {preppo.hero.priceLabel}{" "}
                  <span className="text-3xl font-bold" style={{color: '#F59E0B'}}>
                    {preppo.hero.price}
                  </span>
                  {preppo.hero.pricePeriod}
                </span>
              </div>
              <Link href="/pricing">
                <button className="px-8 py-4 text-white rounded-xl font-semibold transition-all shadow-lg flex items-center gap-2 mx-auto group hover:opacity-90" style={{backgroundColor: '#F59E0B'}}>
                  {preppo.hero.getStarted}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              {preppo.featuresSection.titlePrefix} <span style={{color: '#F59E0B'}}>{preppo.featuresSection.title}</span>
            </h2>
            <p className="text-xl text-gray-600">{preppo.featuresSection.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {preppo.features.map((feature, idx) => {
              const icons = [ChefHat, Package, AlertCircle, QrCode, PackageCheck, BarChart3, TrendingUp, Target, FileText];
              const Icon = icons[idx];
              
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-2xl border border-gray-200 hover:border-yellow-300 transition-all hover:shadow-lg"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{backgroundColor: 'rgba(245, 158, 11, 0.1)'}}>
                    <Icon className="w-6 h-6" style={{color: '#F59E0B'}} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">{preppo.useCasesSection.title}</h2>
            <p className="text-xl text-gray-300">{preppo.useCasesSection.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {preppo.useCases.map((useCase, idx) => {
              const icons = [ShoppingBag, ChefHat, Users];
              const Icon = icons[idx];
              
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all opacity-50" />
                  <div className="relative bg-gray-800 border border-gray-700 rounded-3xl p-8 hover:border-yellow-500/50 transition-all">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{backgroundColor: 'rgba(245, 158, 11, 0.1)'}}>
                      <Icon className="w-7 h-7" style={{color: '#F59E0B'}} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white">{useCase.title}</h3>
                    <p className="text-gray-400 mb-6">{useCase.description}</p>
                    <div className="space-y-3">
                      {useCase.benefits.map((benefit, bidx) => (
                        <div key={bidx} className="flex items-center gap-2 text-gray-300">
                          <Check className="w-5 h-5 flex-shrink-0" style={{color: '#F59E0B'}} />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Label Configuration Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              {preppo.labelConfigSection.title}{" "}
              <span style={{color: '#F59E0B'}}>{preppo.labelConfigSection.titleHighlight}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {preppo.labelConfigSection.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {preppo.labelConfigs.map((config, idx) => {
              const colors = ["#3B82F6", "#10B981", "#F59E0B", "#6B7280"];
              const icons = [Grid3x3, Globe, Clock, Barcode];
              const Icon = icons[idx];
              const color = colors[idx];
              
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-10 rounded-2xl blur-xl group-hover:opacity-20 transition-all" style={{background: `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`}} />
                  <div className="relative p-6 rounded-2xl border-2 hover:shadow-xl transition-all bg-white" style={{borderColor: `${color}20`}}>
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{backgroundColor: `${color}15`}}>
                      <Icon className="w-7 h-7" style={{color: color}} />
                    </div>
                    <h3 className="text-xl font-bold mb-1" style={{color: color}}>{config.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">{config.desc}</p>
                    <ul className="space-y-2">
                      {config.features.map((feature, fidx) => (
                        <li key={fidx} className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="w-4 h-4 flex-shrink-0" style={{color: color}} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-orange-50 border border-orange-200 rounded-full">
              <QrCode className="w-5 h-5" style={{color: '#F59E0B'}} />
              <span className="text-sm font-medium text-gray-700">
                {preppo.printerSupport}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* UI Preview Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              {preppo.uiPreviewSection.titlePrefix} <span style={{color: '#F59E0B'}}>{preppo.uiPreviewSection.title}</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {preppo.uiPreviewSection.subtitle}
            </p>
          </div>

          <div className="space-y-20">
            {/* Prep Library UI */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-4">
                  <PackageCheck className="w-4 h-4" style={{color: '#F59E0B'}} />
                  <span className="text-sm font-medium" style={{color: '#F59E0B'}}>{preppo.uiPreviews[0].badge}</span>
                </div>
                <h3 className="text-3xl font-bold mb-4">{preppo.uiPreviews[0].title}</h3>
                <p className="text-gray-600 text-lg mb-6">
                  {preppo.uiPreviews[0].description}
                </p>
                <ul className="space-y-3">
                  {preppo.uiPreviews[0].features.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <Check className="w-5 h-5 flex-shrink-0" style={{color: '#F59E0B'}} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-orange-200 bg-white">
                  <div className="aspect-[4/3] bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center p-8">
                    <div className="w-full space-y-3">
                      {["Nasi Goreng Spesial", "Ayam Goreng Crispy", "Sambal Matah", "Bumbu Rendang"].map((item, idx) => (
                        <div key={idx} className="bg-white rounded-xl p-4 shadow-md border border-orange-100 flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center">
                            <ChefHat className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900">{item}</div>
                            <div className="text-sm text-gray-500 flex gap-4">
                              <span>🧊 24h</span>
                              <span>❄️ 72h</span>
                              <span>🌡️ 6h</span>
                            </div>
                          </div>
                          <div className="px-3 py-1 bg-orange-100 rounded-full text-xs font-medium" style={{color: '#F59E0B'}}>
                            Main
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Task Management UI */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1 relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-orange-200 bg-white">
                  <div className="aspect-[4/3] bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center p-8">
                    <div className="w-full space-y-3">
                      {[
                        { item: "Nasi Goreng", qty: "50 porsi", status: "In Progress", color: "bg-blue-500" },
                        { item: "Ayam Goreng", qty: "30 porsi", status: "Completed", color: "bg-green-500" },
                        { item: "Sambal Matah", qty: "2 kg", status: "Pending", color: "bg-gray-400" },
                      ].map((task, idx) => (
                        <div key={idx} className="bg-white rounded-xl p-4 shadow-md border border-orange-100">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold text-gray-900">{task.item}</div>
                            <div className={`px-3 py-1 ${task.color} text-white rounded-full text-xs font-medium`}>
                              {task.status}
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>🎯 {task.qty}</span>
                            <span>👨‍🍳 Staff A</span>
                            <span>⚡ High</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-4">
                  <Target className="w-4 h-4" style={{color: '#F59E0B'}} />
                  <span className="text-sm font-medium" style={{color: '#F59E0B'}}>{preppo.uiPreviews[1].badge}</span>
                </div>
                <h3 className="text-3xl font-bold mb-4">{preppo.uiPreviews[1].title}</h3>
                <p className="text-gray-600 text-lg mb-6">
                  {preppo.uiPreviews[1].description}
                </p>
                <ul className="space-y-3">
                  {preppo.uiPreviews[1].features.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <Check className="w-5 h-5 flex-shrink-0" style={{color: '#F59E0B'}} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Expiry Monitor UI */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-4">
                  <AlertCircle className="w-4 h-4" style={{color: '#F59E0B'}} />
                  <span className="text-sm font-medium" style={{color: '#F59E0B'}}>{preppo.uiPreviews[2].badge}</span>
                </div>
                <h3 className="text-3xl font-bold mb-4">{preppo.uiPreviews[2].title}</h3>
                <p className="text-gray-600 text-lg mb-6">
                  {preppo.uiPreviews[2].description}
                </p>
                <ul className="space-y-3">
                  {preppo.uiPreviews[2].features.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <Check className="w-5 h-5 flex-shrink-0" style={{color: '#F59E0B'}} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-orange-200 bg-white">
                  <div className="aspect-[4/3] bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center p-8">
                    <div className="w-full space-y-3">
                      {[
                        { item: "Nasi Goreng #001", expiry: "2h left", status: "expiring", color: "bg-red-100 border-red-300" },
                        { item: "Ayam Goreng #002", expiry: "12h left", status: "fresh", color: "bg-green-100 border-green-300" },
                        { item: "Sambal Matah #003", expiry: "Expired", status: "expired", color: "bg-gray-100 border-gray-300" },
                      ].map((batch, idx) => (
                        <div key={idx} className={`rounded-xl p-4 shadow-md border-2 ${batch.color}`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold text-gray-900">{batch.item}</div>
                            <div className="text-sm font-bold text-red-600">{batch.expiry}</div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                            <span>📅 Prep: 18 Feb</span>
                            <span>❄️ Chiller</span>
                            <span>👨‍🍳 Staff A</span>
                          </div>
                          <div className="flex gap-2">
                            <button className="flex-1 px-3 py-2 bg-green-500 text-white rounded-lg text-xs font-medium">
                              ✓ Use
                            </button>
                            <button className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg text-xs font-medium">
                              ✗ Discard
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Label Print Previews */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-6">
                <QrCode className="w-4 h-4" style={{color: '#F59E0B'}} />
                <span className="text-sm font-medium" style={{color: '#F59E0B'}}>{preppo.labelTemplatesSection.badge}</span>
              </div>
              <h3 className="text-3xl font-bold mb-4">{preppo.labelTemplatesSection.title}</h3>
              <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
                {preppo.labelTemplatesSection.subtitle}
              </p>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Template 1: Classic */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="bg-gray-50 rounded-xl p-6 shadow-lg">
                    <div className="mb-3">
                      <h4 className="font-bold text-lg text-gray-900">{preppo.labelTemplatesSection.templates[0].name}</h4>
                      <p className="text-sm text-gray-600">{preppo.labelTemplatesSection.templates[0].description}</p>
                    </div>
                    <div className="flex justify-center">
                      <div className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden flex flex-col" style={{ width: '275px', height: '137.5px' }}>
                      {/* Header */}
                      <div className="px-3 pt-2.5 pb-2 flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0 text-left">
                          <div className="font-extrabold text-gray-900 leading-tight text-left" style={{ fontSize: '13px' }}>
                            Nasi Goreng Spesial
                          </div>
                          <div className="font-bold text-gray-400 leading-tight mt-0.5 text-left" style={{ fontSize: '7px' }}>
                            Batch: #001
                          </div>
                        </div>
                        <div className="flex-shrink-0 px-2 py-1 bg-gray-100 rounded">
                          <div className="font-extrabold text-gray-900 leading-none" style={{ fontSize: '9px' }}>
                            Ahmad
                          </div>
                        </div>
                      </div>
                      
                      {/* Timeline - centered */}
                      <div className="flex-1 px-3 flex items-center justify-center">
                        <div className="flex items-center justify-between w-full gap-2">
                          <div className="flex-1">
                            <div className="font-bold text-gray-400 uppercase leading-none mb-1" style={{ fontSize: '7px' }}>DIBUAT</div>
                            <div className="font-black text-gray-900 leading-none tracking-tight" style={{ fontSize: '20px' }}>08:30</div>
                            <div className="font-bold text-gray-600 leading-tight mt-0.5" style={{ fontSize: '9px' }}>18 Feb</div>
                          </div>
                          <div className="flex-shrink-0">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="opacity-25">
                              <path d="M2 8h12M10 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div className="flex-1 text-right">
                            <div className="font-bold text-gray-900 uppercase leading-none mb-1" style={{ fontSize: '7px' }}>BAIK S/D</div>
                            <div className="font-black text-gray-900 leading-none tracking-tight" style={{ fontSize: '20px' }}>20:30</div>
                            <div className="font-bold text-gray-600 leading-tight mt-0.5" style={{ fontSize: '9px' }}>18 Feb</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                </motion.div>

                {/* Template 2: Big Expiry */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="bg-gray-50 rounded-xl p-6 shadow-lg">
                    <div className="mb-3">
                      <h4 className="font-bold text-lg text-gray-900">{preppo.labelTemplatesSection.templates[1].name}</h4>
                      <p className="text-sm text-gray-600">{preppo.labelTemplatesSection.templates[1].description}</p>
                    </div>
                    <div className="flex justify-center">
                      <div className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden flex flex-col" style={{ width: '275px', height: '137.5px' }}>
                      {/* Header */}
                      <div className="px-3 pt-2.5 pb-2 flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0 text-left">
                          <div className="font-bold text-gray-900 leading-tight text-left" style={{ fontSize: '11px' }}>
                            Nasi Goreng Spesial
                          </div>
                          <div className="font-semibold text-gray-400 leading-tight mt-0.5 text-left" style={{ fontSize: '7px' }}>
                            Batch: #001
                          </div>
                        </div>
                        <div className="font-semibold text-gray-600 flex-shrink-0" style={{ fontSize: '8px' }}>Ahmad</div>
                      </div>
                      
                      {/* Center Content */}
                      <div className="flex-1 px-3 flex flex-col items-center justify-center">
                        <div className="font-bold text-gray-900 uppercase tracking-wide mb-1" style={{ fontSize: '7px' }}>BAIK S/D:</div>
                        <div className="font-black text-gray-900 text-center leading-none mb-1" style={{ fontSize: '15px' }}>
                          Sen, 18 Feb 2026
                        </div>
                        <div className="font-bold text-gray-700" style={{ fontSize: '11px' }}>
                          Pukul 20:30
                        </div>
                      </div>
                      
                      {/* Footer */}
                      <div className="px-3 pb-2 pt-1.5 border-t border-gray-200 text-center">
                        <div className="text-gray-400" style={{ fontSize: '7px' }}>
                          Dibuat: 18 Feb 08:30
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                </motion.div>

                {/* Template 3: Compact/Minimal */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="bg-gray-50 rounded-xl p-6 shadow-lg">
                    <div className="mb-3">
                      <h4 className="font-bold text-lg text-gray-900">{preppo.labelTemplatesSection.templates[2].name}</h4>
                      <p className="text-sm text-gray-600">{preppo.labelTemplatesSection.templates[2].description}</p>
                    </div>
                    <div className="flex justify-center">
                      <div className="bg-white border-2 border-gray-300 rounded-lg relative overflow-hidden" style={{ width: '275px', height: '137.5px' }}>
                      <div className="px-3 pt-2 pb-1 border-b-2 border-gray-900 text-center">
                        <div className="font-black text-gray-900 leading-tight truncate" style={{ fontSize: '13px' }}>
                          NASI GORENG SPESIAL
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col items-center justify-center py-3">
                        <div className="font-extrabold text-gray-700 uppercase tracking-widest" style={{ fontSize: '7px' }}>
                          BAIK S/D
                        </div>
                        <div className="font-black text-gray-900 leading-none my-1" style={{ fontSize: '24px' }}>
                          20:30
                        </div>
                        <div className="font-extrabold text-gray-900" style={{ fontSize: '10px' }}>
                          SEN 18 FEB
                        </div>
                      </div>
                      <div className="flex justify-between items-center px-3 pb-2 border-t-2 border-gray-900 pt-1">
                        <div className="font-extrabold text-gray-900" style={{ fontSize: '7px' }}>
                          DIBUAT: 08:30
                        </div>
                        <div className="font-black text-gray-900" style={{ fontSize: '8px' }}>
                          #001
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                </motion.div>

                {/* Template 4: Industrial */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="bg-gray-50 rounded-xl p-6 shadow-lg">
                    <div className="mb-3">
                      <h4 className="font-bold text-lg text-gray-900">{preppo.labelTemplatesSection.templates[3].name}</h4>
                      <p className="text-sm text-gray-600">{preppo.labelTemplatesSection.templates[3].description}</p>
                    </div>
                    <div className="flex justify-center">
                      <div className="bg-white border-2 border-gray-300 rounded-lg relative overflow-hidden" style={{ width: '275px', height: '137.5px' }}>
                      <div className="px-3 pt-2 pb-1 border-b-2 border-gray-900">
                        <div className="font-black text-gray-900 leading-tight truncate" style={{ fontSize: '18px' }}>
                          NASI GORENG SPESIAL
                        </div>
                      </div>
                      <div className="px-3 py-2 flex-1 flex flex-col justify-center">
                        <div className="flex justify-between items-center mb-1">
                          <div className="text-gray-600 font-extrabold" style={{ fontSize: '9px' }}>
                            #001
                          </div>
                          <div className="text-gray-900 font-extrabold" style={{ fontSize: '11px' }}>
                            AHMAD
                          </div>
                        </div>
                        <div className="text-gray-700 font-semibold mb-0.5" style={{ fontSize: '8px' }}>
                          Dibuat: Sen, 18 Feb 08:30
                        </div>
                        <div className="text-gray-700 font-semibold" style={{ fontSize: '8px' }}>
                          Baik s/d: 18 Feb 2026
                        </div>
                      </div>
                      <div className="bg-gray-900 px-3 py-2 flex items-center justify-center mt-1">
                        <div className="text-white font-black tracking-wider" style={{ fontSize: '13px' }}>
                          SEN 20:30
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="mt-12 text-center">
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {preppo.labelTemplatesSection.footer}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{preppo.howItWorksSection.title}</h2>
            <p className="text-xl text-gray-600">{preppo.howItWorksSection.subtitle}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {preppo.howItWorksSteps.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-6 items-start"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{backgroundColor: '#F59E0B'}}>
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{preppo.pricing.title}</h2>
            <p className="text-xl text-gray-600 mb-8">{preppo.pricing.subtitle}</p>
            
            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-3 p-1.5 bg-white rounded-full shadow-lg border-2 border-gray-200">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-6 py-2.5 rounded-full font-semibold transition-all ${
                  !isYearly 
                    ? 'text-white shadow-md' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                style={!isYearly ? {backgroundColor: '#F59E0B'} : {}}
              >
                {preppo.pricing.toggle.monthly}
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-6 py-2.5 rounded-full font-semibold transition-all relative ${
                  isYearly 
                    ? 'text-white shadow-md' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                style={isYearly ? {backgroundColor: '#F59E0B'} : {}}
              >
                {preppo.pricing.toggle.yearly}
                <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full">
                  {preppo.pricing.toggle.save}
                </span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {preppo.pricing.tiers.map((tier, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-3xl p-8 shadow-xl ${
                  tier.badge ? 'border-4 border-orange-400 scale-105' : 'border-2 border-gray-200'
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-bold text-white" style={{backgroundColor: '#F59E0B'}}>
                    {tier.badge}
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{tier.description}</p>
                  <div className="mb-2">
                    <span className="text-5xl font-bold" style={{color: '#F59E0B'}}>
                      {isYearly ? tier.priceYearlyMonthly : tier.priceMonthly}
                    </span>
                  </div>
                  <span className="text-gray-600">
                    {isYearly ? tier.period : tier.period}
                  </span>
                  {isYearly && (
                    <div className="mt-2 text-sm text-gray-500">
                      {tier.priceYearly} {tier.periodYearly}
                    </div>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: '#F59E0B'}} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/pricing">
                  <button className={`w-full px-6 py-3 rounded-xl font-semibold transition-all ${
                    tier.badge 
                      ? 'text-white shadow-lg hover:opacity-90' 
                      : 'bg-orange-50 hover:bg-orange-100'
                  }`} style={tier.badge ? {backgroundColor: '#F59E0B'} : {color: '#F59E0B'}}>
                    {preppo.pricing.cta}
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-gray-600 mt-12">{preppo.pricing.note}</p>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">
                {preppo.ctaSection.title}{" "}
                <span style={{color: '#F59E0B'}}>{preppo.ctaSection.titleHighlight}</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {preppo.ctaSection.subtitle}
              </p>
              <Link href="/pricing">
                <button className="px-8 py-4 text-white rounded-xl font-semibold transition-all shadow-lg inline-flex items-center gap-2 group hover:opacity-90" style={{backgroundColor: '#F59E0B'}}>
                  {preppo.ctaSection.button}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>
    </main>
  );
}
