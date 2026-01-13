"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { FinalCTA } from "@/components/sections/final-cta";
import { useLanguage } from "@/lib/i18n/context";
import { ArrowRight, Check, TrendingUp, Shield, Zap } from "lucide-react";
import Link from "next/link";

type Language = "en" | "id" | "zh";

function tText(language: Language, en: string, id: string, zh: string) {
  return language === "id" ? id : language === "zh" ? zh : en;
}

export default function BenefitsPage() {
  const { language } = useLanguage();

  const hero = {
    badge: tText(language, "BUSINESS OPERATION SYSTEM", "BUSINESS OPERATION SYSTEM", "业务运营系统"),
    titleA: tText(language, "Kadai is not a POS.", "Kadai bukan POS.", "Kadai 不是 POS。"),
    titleB: tText(
      language,
      "Kadai is a Business Operation System.",
      "Kadai adalah Business Operation System.",
      "Kadai 是业务运营系统。"
    ),
    subtitle: tText(
      language,
      "Most POS tools only record transactions. Kadai turns daily operations into clarity, decisions, and scalable growth.",
      "Kebanyakan POS hanya mencatat transaksi. Kadai mengubah operasional harian menjadi kejelasan, keputusan, dan pertumbuhan yang bisa diskalakan.",
      "多数 POS 只记录交易。Kadai 将日常运营转化为清晰洞察、决策能力与可规模化增长。"
    ),
    ctaPrimary: tText(language, "Try the demo", "Coba demo", "试用演示"),
    ctaSecondary: tText(language, "See pricing", "Lihat harga", "查看价格"),
  };

  const pillars = [
    {
      icon: TrendingUp,
      title: tText(language, "Clarity", "Kejelasan", "清晰洞察"),
      desc: tText(
        language,
        "Know what’s happening in your business today — revenue, margin, best sellers, and leaks.",
        "Tahu apa yang terjadi di bisnis hari ini — omzet, margin, produk terlaris, dan kebocoran.",
        "了解今天业务正在发生什么——营收、毛利、畅销品与损耗点。"
      ),
    },
    {
      icon: Shield,
      title: tText(language, "Control", "Kontrol", "可控运营"),
      desc: tText(
        language,
        "Turn SOP into a system: stock, staff roles, approvals, and audit-ready trails.",
        "Jadikan SOP sebagai sistem: stok, role staf, approval, dan jejak audit.",
        "把 SOP 变成系统：库存、员工权限、审批与可审计记录。"
      ),
    },
    {
      icon: Zap,
      title: tText(language, "Growth", "Bertumbuh", "增长"),
      desc: tText(
        language,
        "Scale outlets without chaos. Same playbook, same visibility, same standards.",
        "Scale outlet tanpa chaos. Playbook sama, visibilitas sama, standar sama.",
        "无混乱扩张门店：同一套打法、同样的可视化与标准。"
      ),
    },
  ];

  const quadrant = {
    title: tText(language, "Competitive Advantages", "Keunggulan Kompetitif", "竞争优势"),
    xLeft: tText(language, "Transaction Focus", "Fokus Transaksi", "交易导向"),
    xRight: tText(language, "Decision Focus", "Fokus Keputusan", "决策导向"),
    yTop: tText(language, "High Business Clarity", "Kejelasan Bisnis Tinggi", "高业务清晰度"),
    yBottom: tText(language, "Low Business Insight", "Insight Bisnis Rendah", "低业务洞察"),
    q1: {
      label: tText(language, "Reporting POS", "Reporting POS", "报表型 POS"),
      items: ["Pawoon", "Moka", "Square"],
      tone: "border-emerald-300 bg-emerald-50",
    },
    q2: {
      label: tText(language, "Business OS", "Business OS", "业务操作系统"),
      items: ["Kadai"],
      tone: "border-purple-300 bg-purple-50",
      highlight: true,
    },
    q3: {
      label: tText(language, "Basic POS", "Basic POS", "基础 POS"),
      items: ["Majoo", "Olsera", "Kasir Pintar"],
      tone: "border-orange-300 bg-orange-50",
    },
    q4: {
      label: tText(language, "Operation Tools", "Tools Operasional", "运营工具"),
      items: ["StockIQ", "Jubelio"],
      tone: "border-amber-300 bg-amber-50",
    },
    note: tText(
      language,
      "This is a positioning map to explain categories. Brand names are shown as plain text (no logos).",
      "Ini peta positioning untuk menjelaskan kategori. Nama brand ditampilkan sebagai teks (tanpa logo).",
      "这是用于解释类别的定位图。品牌名称以纯文字显示（不使用 Logo）。"
    ),
  };

  const outcomes = [
    tText(
      language,
      "See your real profit drivers (not just revenue).",
      "Lihat penggerak profit yang sebenarnya (bukan hanya omzet).",
      "看清真正的利润驱动因素（不仅是营收）。"
    ),
    tText(
      language,
      "Catch leakage early: waste, voids, discounts, and stock drift.",
      "Deteksi kebocoran lebih awal: waste, void, diskon, dan selisih stok.",
      "提前发现漏洞：浪费、作废、折扣与库存偏差。"
    ),
    tText(
      language,
      "Make faster decisions with one source of truth.",
      "Ambil keputusan lebih cepat dengan satu sumber data.",
      "以单一事实来源更快做决策。"
    ),
    tText(
      language,
      "Standardize operations across outlets.",
      "Standarisasi operasional antar outlet.",
      "跨门店标准化运营。"
    ),
    tText(
      language,
      "Reclaim your time for family while Kadai handles the complexity.",
      "Dapatkan kembali waktu Anda untuk keluarga sementara Kadai menangani kompleksitasnya.",
      "在 Kadai 处理复杂运营的同时，找回陪伴家人的时间。"
    ),
  ];

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-6">
              {hero.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              {hero.titleA}{" "}
              <span className="bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent">
                {hero.titleB}
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-10">{hero.subtitle}</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-8 py-5 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] text-white font-bold shadow-lg hover:opacity-95 transition-opacity"
              >
                {hero.ctaPrimary}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-8 py-5 rounded-full bg-white border border-gray-200 text-gray-900 font-bold shadow-sm hover:shadow-md transition-shadow"
              >
                {hero.ctaSecondary}
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Pillars */}
      <section className="py-20">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {pillars.map((p, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition-shadow"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center mb-5">
                    <p.icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{p.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {outcomes.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-gray-700 font-medium leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Competitive Advantage Quadrant */}
      <section className="py-24 bg-white overflow-hidden border-t border-gray-100">
        <Container>
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">{quadrant.title}</h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-[#FF5A5F] to-purple-600 mx-auto rounded-full mb-8" />
              <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
                {tText(
                  language,
                  "Kadai is strategically positioned to handle high-level business intelligence, not just transactions.",
                  "Kadai diposisikan secara strategis untuk menangani intelijen bisnis tingkat tinggi, bukan sekadar transaksi.",
                  "Kadai 的战略定位是处理高级商业智能，而不仅仅是交易。"
                )}
              </p>
            </motion.div>

            <div className="relative pt-20 pb-20">
              {/* Luxury Mesh Background Effect */}
              <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

              {/* Axes with refined gradients */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                <div className="h-full w-[1px] bg-gradient-to-b from-transparent via-gray-200 to-transparent" />
              </div>

              {/* Refined Axis Labels */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase z-30 shadow-xl">
                {quadrant.yTop}
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white text-gray-400 border border-gray-100 px-6 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase z-30 shadow-sm">
                {quadrant.yBottom}
              </div>
              
              <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 bg-white text-gray-400 border border-gray-100 px-3 py-6 rounded-full text-[10px] font-black tracking-[0.2em] uppercase z-30 shadow-sm [writing-mode:vertical-lr] rotate-180">
                {quadrant.xLeft}
              </div>
              <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 bg-gray-900 text-white px-3 py-6 rounded-full text-[10px] font-black tracking-[0.2em] uppercase z-30 shadow-xl [writing-mode:vertical-lr]">
                {quadrant.xRight}
              </div>

              {/* Quadrant Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative z-10 p-4 max-w-5xl mx-auto">
                {/* Q1: Reporting POS */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="aspect-square rounded-[60px] border border-gray-100 bg-white/50 p-12 flex flex-col items-center justify-center relative hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  <div className="flex flex-col gap-6 items-center">
                    {quadrant.q1.items.map(b => (
                      <span key={b} className="text-xl font-bold text-gray-300">
                        {b}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 text-[10px] font-black uppercase text-gray-400 tracking-widest bg-gray-50 px-4 py-2 rounded-full">
                    {quadrant.q1.label}
                  </div>
                </motion.div>

                {/* Q2: Business OS (HERO) */}
                <motion.div 
                   initial={{ opacity: 0, scale: 1.05 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   transition={{ type: "spring", damping: 15 }}
                   viewport={{ once: true }}
                   className="aspect-square rounded-[60px] bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] p-12 flex flex-col items-center justify-center relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] ring-4 ring-[#FF5A5F]/10 overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,90,95,0.1),transparent_70%)]" />
                  
                  <div className="flex flex-col items-center relative z-10">
                    <div className="w-20 h-20 mb-6 relative">
                       <div className="absolute inset-0 bg-[#FF5A5F] blur-2xl opacity-20 animate-pulse" />
                       <div className="relative w-full h-full bg-gradient-to-br from-[#FF5A5F] to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
                          <span className="text-4xl font-black text-white italic">K</span>
                       </div>
                    </div>
                    
                    <h4 className="text-6xl font-black text-white tracking-tighter mb-4 group-hover:scale-110 transition-transform duration-500">
                      KADAI<span className="text-[#FF5A5F]">.</span>
                    </h4>
                    
                    <div className="flex flex-wrap gap-2 justify-center">
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold text-[#FF5A5F] border border-white/10 uppercase tracking-widest">
                        Decision First
                      </span>
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold text-violet-400 border border-white/10 uppercase tracking-widest">
                        Data Driven
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-12 text-[11px] font-black uppercase text-white tracking-[0.3em] bg-[#FF5A5F] px-8 py-3 rounded-full shadow-lg shadow-[#FF5A5F]/30">
                    {quadrant.q2.label}
                  </div>
                </motion.div>

                {/* Q3: Basic POS */}
                <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   className="aspect-square rounded-[60px] border border-gray-100 bg-gray-50/30 p-12 flex flex-col items-center justify-center relative grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                >
                  <div className="flex flex-wrap gap-6 items-center justify-center max-w-[200px]">
                    {quadrant.q3.items.map(b => (
                      <span key={b} className="text-lg font-bold text-gray-300">
                        {b}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 text-[11px] font-black uppercase text-gray-300 tracking-widest border border-gray-100 px-4 py-2 rounded-full">
                    {quadrant.q3.label}
                  </div>
                </motion.div>

                {/* Q4: Operation Tools */}
                <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   className="aspect-square rounded-[60px] border border-gray-100 bg-white/50 p-12 flex flex-col items-center justify-center relative hover:shadow-2xl transition-all duration-500"
                >
                   <div className="flex flex-col gap-6 items-center">
                    {quadrant.q4.items.map(b => (
                      <span key={b} className="text-xl font-bold text-gray-300">
                        {b}
                      </span>
                    ))}
                  </div>
                   <div className="mt-8 text-[11px] font-black uppercase text-gray-400 tracking-widest bg-gray-50 px-4 py-2 rounded-full">
                    {quadrant.q4.label}
                  </div>
                </motion.div>
              </div>

              <div className="mt-24 text-center">
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] max-w-lg mx-auto leading-loose opacity-60">
                  {quadrant.note}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <FinalCTA />
    </main>
  );
}
