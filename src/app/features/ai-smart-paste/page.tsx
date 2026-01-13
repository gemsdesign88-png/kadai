"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { useLanguage } from "@/lib/i18n/context"
import { FinalCTA } from "@/components/sections/final-cta"
import { AISmartPasteDemo } from "@/components/features/ai-smart-paste-demo"
import { Sparkles, Copy, Wand2, Package, Barcode, Zap, ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function AiSmartPastePage() {
  const { language } = useLanguage()

  const t = {
    en: {
      badge: "AI-Powered",
      title: "AI Magic Paste",
      subtitle: "Add Bulk Items in Seconds with AI",
      description: "Copy from anywhere - WhatsApp, Notes, Text, or Excel. Paste once and let AI automatically organize everything with smart categorization.",
      howItWorks: {
        title: "How It Works",
        subtitle: "3 Simple Steps to Bulk Import",
        steps: [
          {
            number: "1",
            title: "Copy Your Data",
            desc: "Copy ingredient or product lists from WhatsApp messages, Notes app, plain text, or Excel spreadsheets."
          },
          {
            number: "2",
            title: "Paste & Let AI Work",
            desc: "Paste into Kadai and AI instantly recognizes items, prices, quantities, suppliers, and categories."
          },
          {
            number: "3",
            title: "Review & Save",
            desc: "Review AI-organized items, make any adjustments, and save. Done in seconds!"
          }
        ]
      },
      features: {
        title: "Powerful Features",
        items: [
          {
            icon: Sparkles,
            title: "Smart Recognition",
            desc: "AI automatically detects item names, quantities, units, prices, and suppliers from unstructured text.",
            color: "from-purple-500 to-pink-500"
          },
          {
            icon: Package,
            title: "Auto Categorization",
            desc: "Items are automatically sorted into proper categories (ingredients, beverages, snacks, etc.).",
            color: "from-blue-500 to-cyan-500"
          },
          {
            icon: Barcode,
            title: "Barcode Support",
            desc: "Paste product lists with barcodes and AI links them automatically for faster scanning.",
            color: "from-orange-500 to-red-500"
          },
          {
            icon: Zap,
            title: "Instant Processing",
            desc: "Process hundreds of items in seconds. What used to take hours now takes minutes.",
            color: "from-green-500 to-emerald-500"
          },
          {
            icon: Wand2,
            title: "Smart Corrections",
            desc: "AI detects and suggests corrections for common typos and formatting inconsistencies.",
            color: "from-yellow-500 to-amber-500"
          },
          {
            icon: Copy,
            title: "Universal Format",
            desc: "Works with any text format. Copy from anywhere and AI figures out the structure.",
            color: "from-indigo-500 to-purple-500"
          }
        ]
      },
      useCases: {
        title: "Perfect For",
        items: [
          {
            title: "Initial Setup",
            desc: "Quickly import your entire inventory when starting with Kadai."
          },
          {
            title: "Supplier Orders",
            desc: "Paste supplier messages directly from WhatsApp into your inventory."
          },
          {
            title: "Bulk Updates",
            desc: "Update prices or stock levels for multiple items at once."
          },
          {
            title: "Product Catalogs",
            desc: "Import product catalogs from Excel or PDF (copy text) instantly."
          }
        ]
      },
      cta: {
        title: "Experience AI Magic Paste",
        subtitle: "Save hours on data entry with intelligent automation",
        button: "Try Free Now",
        demo: "Watch Demo"
      }
    },
    id: {
      badge: "Bertenaga AI",
      title: "AI Magic Paste",
      subtitle: "Tambah Item Bulk dalam Hitungan Detik dengan AI",
      description: "Copy dari mana saja - WhatsApp, Notes, Text, atau Excel. Paste sekali dan biarkan AI otomatis atur semuanya dengan kategorisasi pintar.",
      howItWorks: {
        title: "Cara Kerjanya",
        subtitle: "3 Langkah Mudah untuk Import Bulk",
        steps: [
          {
            number: "1",
            title: "Copy Data Anda",
            desc: "Copy daftar bahan atau produk dari pesan WhatsApp, aplikasi Notes, plain text, atau spreadsheet Excel."
          },
          {
            number: "2",
            title: "Paste & Biarkan AI Bekerja",
            desc: "Paste ke Kadai dan AI langsung kenali item, harga, jumlah, supplier, dan kategori."
          },
          {
            number: "3",
            title: "Review & Simpan",
            desc: "Review item yang sudah diatur AI, buat penyesuaian jika perlu, dan simpan. Selesai dalam hitungan detik!"
          }
        ]
      },
      features: {
        title: "Fitur Powerful",
        items: [
          {
            icon: Sparkles,
            title: "Pengenalan Pintar",
            desc: "AI otomatis deteksi nama item, jumlah, unit, harga, dan supplier dari teks yang tidak terstruktur.",
            color: "from-purple-500 to-pink-500"
          },
          {
            icon: Package,
            title: "Auto Kategorisasi",
            desc: "Item otomatis disortir ke kategori yang tepat (bahan, minuman, snack, dll.).",
            color: "from-blue-500 to-cyan-500"
          },
          {
            icon: Barcode,
            title: "Dukungan Barcode",
            desc: "Paste daftar produk dengan barcode dan AI link otomatis untuk scanning lebih cepat.",
            color: "from-orange-500 to-red-500"
          },
          {
            icon: Zap,
            title: "Pemrosesan Instant",
            desc: "Proses ratusan item dalam hitungan detik. Yang dulu butuh berjam-jam sekarang cuma beberapa menit.",
            color: "from-green-500 to-emerald-500"
          },
          {
            icon: Wand2,
            title: "Koreksi Pintar",
            desc: "AI deteksi dan sarankan perbaikan untuk typo umum dan inkonsistensi format.",
            color: "from-yellow-500 to-amber-500"
          },
          {
            icon: Copy,
            title: "Format Universal",
            desc: "Bekerja dengan format teks apa saja. Copy dari mana saja dan AI pahami strukturnya.",
            color: "from-indigo-500 to-purple-500"
          }
        ]
      },
      useCases: {
        title: "Sempurna Untuk",
        items: [
          {
            title: "Setup Awal",
            desc: "Import seluruh inventory Anda dengan cepat saat mulai pakai Kadai."
          },
          {
            title: "Pesanan Supplier",
            desc: "Paste pesan supplier langsung dari WhatsApp ke inventory Anda."
          },
          {
            title: "Update Bulk",
            desc: "Update harga atau level stok untuk banyak item sekaligus."
          },
          {
            title: "Katalog Produk",
            desc: "Import katalog produk dari Excel atau PDF (copy text) dengan instant."
          }
        ]
      },
      cta: {
        title: "Rasakan AI Magic Paste",
        subtitle: "Hemat berjam-jam waktu input data dengan otomasi intelligent",
        button: "Coba Gratis Sekarang",
        demo: "Lihat Demo"
      }
    }
  }

  const content = t[language]

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 mb-6">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-purple-800">
                {content.badge}
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-6">
              {content.title}
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {content.subtitle}
              </span>
            </h2>

            <p className="text-lg leading-8 text-gray-600 mb-8">
              {content.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                {content.cta.button}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-gray-900 bg-white rounded-full border-2 border-gray-200 hover:border-gray-300 transition-all hover:scale-105"
              >
                {content.cta.demo}
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="relative py-20 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content.howItWorks.title}
            </h2>
            <p className="text-xl text-gray-600">
              {content.howItWorks.subtitle}
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {content.howItWorks.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                {index < content.howItWorks.steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-purple-300 to-pink-300" />
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content.features.title}
            </h2>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {content.features.items.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="h-full p-8 bg-white rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-all hover:shadow-xl">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Live Example Section */}
      <section className="relative py-20 bg-black">
        <Container>
          <AISmartPasteDemo />
        </Container>
      </section>

      {/* Use Cases Section */}
      <section className="relative py-20 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content.useCases.title}
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {content.useCases.items.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100"
              >
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {useCase.title}
                    </h3>
                    <p className="text-gray-600">
                      {useCase.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-600 to-pink-600">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {content.cta.title}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {content.cta.subtitle}
            </p>
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-purple-600 bg-white rounded-full hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              {content.cta.button}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </Container>
      </section>

      <FinalCTA />
    </div>
  )
}
