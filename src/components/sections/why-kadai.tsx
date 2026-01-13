"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Shield, Zap, Heart, TrendingUp, DollarSign, Users, Clock, Award } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

const reasons = [
  {
    icon: Heart,
    titleEn: "Built with Love\nby Restaurant Owners",
    titleId: "Dibuat dengan Cinta\noleh Pemilik Restoran",
    titleZh: "餐厅老板\n用心打造",
    descEn: "We're not just tech people - we run restaurants too. Kadai is born from real pain points we experienced daily.",
    descId: "Kami bukan hanya orang tech - kami juga menjalankan restoran. Kadai lahir dari masalah nyata yang kami alami setiap hari.",
    descZh: "我们不仅仅是技术人员 - 我们也经营餐厅。Kadai 诞生于我们每天经历的真实痛点。",
    gradient: "from-[#FF5A5F] to-pink-500"
  },
  {
    icon: Zap,
    titleEn: "5-Minute Setup,\nNot 5 Days",
    titleId: "Setup 5 Menit,\nBukan 5 Hari",
    titleZh: "5分钟设置，\n不是5天",
    descEn: "No complex training needed. Your staff will master it in one shift. No technician required for installation.",
    descId: "Tidak perlu pelatihan rumit. Staff Anda akan menguasainya dalam satu shift. Tidak perlu teknisi untuk instalasi.",
    descZh: "无需复杂培训。您的员工一班就能掌握。无需技术人员安装。",
    gradient: "from-yellow-400 to-orange-500"
  },
  {
    icon: DollarSign,
    titleEn: "Start from Rp49K,\nCancel Anytime",
    titleId: "Mulai dari Rp49K,\nBatal Kapan Saja",
    titleZh: "从 Rp49K 开始，\n随时取消",
    descEn: "No hefty upfront costs. No annual contracts. Flexible monthly or yearly plans. Pay as you grow.",
    descId: "Tidak ada biaya besar di awal. Tidak ada kontrak tahunan. Paket bulanan atau tahunan yang fleksibel. Bayar sesuai pertumbuhan Anda.",
    descZh: "无需巨额前期成本。无年度合同。灵活的月度或年度计划。按增长付费。",
    gradient: "from-green-400 to-emerald-500"
  },
  {
    icon: Shield,
    titleEn: "Your Data is\nAlways Protected",
    titleId: "Data Anda\nSelalu Terlindungi",
    titleZh: "您的数据\n始终受保护",
    descEn: "Advanced encryption. Automatic backups every hour. Your recipes and customers - always safe, always yours.",
    descId: "Enkripsi canggih. Backup otomatis setiap jam. Resep dan pelanggan Anda - selalu aman, selalu milik Anda.",
    descZh: "先进加密。每小时自动备份。您的配方和客户 - 始终安全，始终属于您。",
    gradient: "from-blue-400 to-indigo-500"
  },
  {
    icon: Clock,
    titleEn: "24/7 Real Human\nSupport",
    titleId: "Support Manusia Asli\n24/7",
    titleZh: "24/7 真人\n客服支持",
    descEn: "When your dinner rush hits and something breaks, you'll talk to a real person within minutes - not days.",
    descId: "Saat jam ramai makan malam dan ada masalah, Anda akan bicara dengan orang sungguhan dalam hitungan menit - bukan hari.",
    descZh: "当晚餐高峰期出现问题时，您将在几分钟内与真人交谈 - 而不是几天。",
    gradient: "from-purple-400 to-pink-500"
  },
  {
    icon: TrendingUp,
    titleEn: "Grow Without\nGrowing Pains",
    titleId: "Berkembang Tanpa\nSakit Kepala",
    titleZh: "无痛\n增长",
    descEn: "From 1 outlet to 100. Same system, same ease. We scale with you, not charge you more for success.",
    descId: "Dari 1 outlet ke 100. Sistem sama, kemudahan sama. Kami berkembang bersama Anda, tidak charge lebih untuk kesuksesan.",
    descZh: "从1家门店到100家。同样的系统，同样的简便。我们与您一起成长，不因成功而收取更多费用。",
    gradient: "from-cyan-400 to-blue-500"
  },
  {
    icon: Users,
    titleEn: "We Speak\nYour Language",
    titleId: "Kami Bicara\nBahasa Anda",
    titleZh: "我们说\n您的语言",
    descEn: "Full Indonesian, English, and Chinese. Because your staff shouldn't struggle with tech terms.",
    descId: "Indonesia, Inggris, dan Mandarin lengkap. Karena staff Anda tidak seharusnya berjuang dengan istilah tech.",
    descZh: "完整的印尼语、英语和中文。因为您的员工不应该为技术术语而烦恼。",
    gradient: "from-orange-400 to-red-500"
  },
  {
    icon: Award,
    titleEn: "Proven System\nReady to Use",
    titleId: "Sistem Terbukti\nSiap Pakai",
    titleZh: "经过验证的系统\n即用即得",
    descEn: "Battle-tested in real restaurants. From warungs to fine dining. Built for reliability, not just features.",
    descId: "Teruji di restoran sungguhan. Dari warung ke fine dining. Dibuat untuk keandalan, bukan hanya fitur.",
    descZh: "在真实餐厅中经过实战检验。从小吃店到高级餐厅。为可靠性而构建，而不仅仅是功能。",
    gradient: "from-pink-400 to-rose-500"
  }
]

export function WhyKadai() {
  const { t, language } = useLanguage()

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200 backdrop-blur-xl mb-6">
            <span className="text-sm font-semibold text-gray-900">
              {language === 'id' ? 'Kenapa Harus Kadai?' : language === 'zh' ? '为什么选择 Kadai？' : 'Why Kadai?'}
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {language === 'id' ? (
              <>
                Bukan Cuma <span className="bg-gradient-to-r from-[#FF5A5F] via-purple-500 to-cyan-500 bg-clip-text text-transparent">POS Biasa</span>
                <br />
                <span className="text-3xl md:text-4xl lg:text-5xl">Ini Partner Bisnis Anda</span>
              </>
            ) : language === 'zh' ? (
              <>
                不仅仅是 <span className="bg-gradient-to-r from-[#FF5A5F] via-purple-500 to-cyan-500 bg-clip-text text-transparent">普通POS</span>
                <br />
                <span className="text-3xl md:text-4xl lg:text-5xl">这是您的业务伙伴</span>
              </>
            ) : (
              <>
                Not Just Another <span className="bg-gradient-to-r from-[#FF5A5F] via-purple-500 to-cyan-500 bg-clip-text text-transparent">POS System</span>
                <br />
                <span className="text-3xl md:text-4xl lg:text-5xl">It's Your Business Partner</span>
              </>
            )}
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'id' 
              ? 'Kami tahu persis apa yang Anda butuhkan - karena kami juga merasakan perjuangan yang sama setiap hari.'
              : language === 'zh'
              ? '我们确切知道您需要什么 - 因为我们每天也在经历同样的挑战。'
              : 'We know exactly what you need - because we face the same challenges every single day.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${reason.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <reason.icon className="w-7 h-7 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 whitespace-pre-line leading-tight">
                  {language === 'id' ? reason.titleId : language === 'zh' ? reason.titleZh : reason.titleEn}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {language === 'id' ? reason.descId : language === 'zh' ? reason.descZh : reason.descEn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}