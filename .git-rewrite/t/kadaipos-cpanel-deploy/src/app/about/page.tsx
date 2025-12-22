"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/context";
import { Target, Users, Zap, Heart, Award, TrendingUp } from "lucide-react";

export default function AboutPage() {
  const { language } = useLanguage();

  const values = [
    {
      icon: Users,
      title: language === "en" ? "Customer First" : "Pelanggan Utama",
      description: language === "en"
        ? "Every decision we make starts with one question: How does this benefit our business partners? We build features that solve real problems faced by store owners daily."
        : "Setiap keputusan yang kami buat dimulai dengan satu pertanyaan: Bagaimana ini menguntungkan mitra bisnis kami? Kami membangun fitur yang menyelesaikan masalah nyata yang dihadapi pemilik toko setiap hari.",
      color: "#FF5A5F",
      principles: language === "en"
        ? [
            "Listen actively to customer feedback",
            "Prioritize features that add real value",
            "Provide responsive and helpful support",
            "Build long-term partnerships, not transactions"
          ]
        : [
            "Mendengarkan feedback pelanggan secara aktif",
            "Prioritaskan fitur yang memberikan nilai nyata",
            "Berikan dukungan yang responsif dan membantu",
            "Bangun kemitraan jangka panjang, bukan transaksi"
          ]
    },
    {
      icon: Zap,
      title: language === "en" ? "Innovation & Simplicity" : "Inovasi & Kesederhanaan",
      description: language === "en"
        ? "Technology should empower, not complicate. We continuously innovate to bring the latest features while keeping the user experience simple and intuitive for everyone."
        : "Teknologi seharusnya memberdayakan, bukan memperumit. Kami terus berinovasi untuk menghadirkan fitur terkini sambil menjaga pengalaman pengguna tetap sederhana dan intuitif untuk semua orang.",
      color: "#8B5CF6",
      principles: language === "en"
        ? [
            "Embrace modern technology and best practices",
            "Design for simplicity and ease of use",
            "Stay ahead with continuous improvements",
            "Make powerful features accessible to all"
          ]
        : [
            "Adopsi teknologi modern dan praktik terbaik",
            "Desain untuk kesederhanaan dan kemudahan penggunaan",
            "Tetap unggul dengan perbaikan berkelanjutan",
            "Buat fitur powerful dapat diakses semua orang"
          ]
    },
    {
      icon: Heart,
      title: language === "en" ? "Built for Indonesia" : "Dibuat untuk Indonesia",
      description: language === "en"
        ? "We deeply understand Indonesian business culture, operations, and challenges. KadaiPOS is designed from the ground up to meet the unique needs of Indonesian businesses."
        : "Kami sangat memahami budaya, operasi, dan tantangan bisnis Indonesia. KadaiPOS dirancang dari awal untuk memenuhi kebutuhan unik bisnis Indonesia.",
      color: "#3B82F6",
      principles: language === "en"
        ? [
            "Support local payment methods (QRIS, e-wallets)",
            "Accommodate Indonesian dining culture",
            "Provide bilingual interface (EN/ID)",
            "Understand local business practices"
          ]
        : [
            "Dukung metode pembayaran lokal (QRIS, e-wallet)",
            "Akomodasi budaya makan Indonesia",
            "Sediakan interface bilingual (EN/ID)",
            "Pahami praktik bisnis lokal"
          ]
    },
    {
      icon: Award,
      title: language === "en" ? "Reliability & Security" : "Keandalan & Keamanan",
      description: language === "en"
        ? "Business operations never stop, and neither should your POS system. We prioritize uptime, data security, and automatic backups so you can run your business with peace of mind."
        : "Operasi bisnis tidak pernah berhenti, begitu juga sistem POS Anda. Kami prioritaskan uptime, keamanan data, dan backup otomatis sehingga Anda dapat menjalankan bisnis dengan tenang.",
      color: "#10B981",
      principles: language === "en"
        ? [
            "Cloud-based with automatic data backup",
            "Secure payment processing",
            "24/7 system availability",
            "Regular security updates and monitoring"
          ]
        : [
            "Berbasis cloud dengan backup data otomatis",
            "Pemrosesan pembayaran yang aman",
            "Ketersediaan sistem 24/7",
            "Update keamanan dan monitoring rutin"
          ]
    },
    {
      icon: TrendingUp,
      title: language === "en" ? "Growth Partnership" : "Kemitraan Pertumbuhan",
      description: language === "en"
        ? "Your success is our success. We provide not just software, but insights and tools that help you understand your business better and make data-driven decisions for growth."
        : "Kesuksesan Anda adalah kesuksesan kami. Kami menyediakan bukan hanya software, tetapi insight dan tools yang membantu Anda memahami bisnis lebih baik dan membuat keputusan berbasis data untuk pertumbuhan.",
      color: "#F59E0B",
      principles: language === "en"
        ? [
            "Real-time analytics and actionable insights",
            "Help identify opportunities for growth",
            "Support business scaling and expansion",
            "Provide resources for continuous learning"
          ]
        : [
            "Analytics real-time dan insight yang actionable",
            "Bantu identifikasi peluang untuk pertumbuhan",
            "Dukung scaling dan ekspansi bisnis",
            "Sediakan resources untuk pembelajaran berkelanjutan"
          ]
    },
    {
      icon: Target,
      title: language === "en" ? "Transparency & Trust" : "Transparansi & Kepercayaan",
      description: language === "en"
        ? "We believe in honest communication and fair pricing. No hidden fees, no complicated contracts. What you see is what you get, with clear pricing per outlet."
        : "Kami percaya pada komunikasi yang jujur dan harga yang adil. Tanpa biaya tersembunyi, tanpa kontrak rumit. Apa yang Anda lihat adalah apa yang Anda dapatkan, dengan harga yang jelas per outlet.",
      color: "#EF4444",
      principles: language === "en"
        ? [
            "Simple, transparent pricing model",
            "No hidden fees or surprise charges",
            "Clear communication about updates and changes",
            "Honest about capabilities and limitations"
          ]
        : [
            "Model harga yang sederhana dan transparan",
            "Tanpa biaya tersembunyi atau tagihan mengejutkan",
            "Komunikasi jelas tentang update dan perubahan",
            "Jujur tentang kemampuan dan keterbatasan"
          ]
    }
  ];

  const stats = [
    {
      number: "2025",
      label: language === "en" ? "Founded" : "Didirikan"
    },
    {
      number: "100%",
      label: language === "en" ? "Cloud-Based" : "Berbasis Cloud"
    },
    {
      number: "13+",
      label: language === "en" ? "Core Features" : "Fitur Utama"
    },
    {
      number: "24/7",
      label: language === "en" ? "Support Ready" : "Support Siap"
    }
  ];

  const team = [
    {
      name: "Gemmy Adyendra",
      role: language === "en" ? "Founder & CEO" : "Founder & CEO",
      description: language === "en"
        ? "Passionate about helping businesses grow through technology"
        : "Bersemangat membantu bisnis berkembang melalui teknologi"
    }
  ];

  const whyChooseUs = [
    {
      icon: Award,
      title: language === "en" ? "Modern Technology" : "Teknologi Modern",
      description: language === "en"
        ? "Built with latest technology stack for reliability and performance"
        : "Dibangun dengan teknologi terkini untuk keandalan dan performa"
    },
    {
      icon: TrendingUp,
      title: language === "en" ? "Rapid Development" : "Pengembangan Cepat",
      description: language === "en"
        ? "Continuously adding new features and improvements every week"
        : "Terus menambahkan fitur baru dan peningkatan setiap minggu"
    },
    {
      icon: Heart,
      title: language === "en" ? "Built for Indonesia" : "Dibuat untuk Indonesia",
      description: language === "en"
        ? "Designed specifically for Indonesian business operations and culture"
        : "Dirancang khusus untuk operasi dan budaya bisnis Indonesia"
    }
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
                {language === "en" ? "🏢 About KadaiPOS" : "🏢 Tentang KadaiPOS"}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              {language === "en" ? "Revolutionizing" : "Merevolusi"}{" "}
              <span className="bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent">
                {language === "en" ? "Business Management" : "Manajemen Bisnis"}
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {language === "en"
                ? "KadaiPOS is a new, modern point of sale system designed for all types of Indonesian businesses - from restaurants and cafes to retail stores. We're building a powerful yet intuitive platform to help business owners manage their operations efficiently and focus on what matters most - serving their customers."
                : "KadaiPOS adalah sistem point of sale modern baru yang dirancang untuk semua jenis bisnis Indonesia - dari restoran dan kafe hingga toko retail. Kami membangun platform yang powerful namun intuitif untuk membantu pemilik bisnis mengelola operasi mereka secara efisien dan fokus pada yang paling penting - melayani pelanggan mereka."}
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-20"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              {language === "en" ? "Our" : "Nilai-Nilai"}{" "}
              <span className="bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent">
                {language === "en" ? "Values" : "Kami"}
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === "en"
                ? "The principles that guide everything we do"
                : "Prinsip yang memandu semua yang kami lakukan"}
            </p>
          </motion.div>

          <div className="space-y-12 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 md:p-10 border border-gray-200 hover:border-gray-300 transition-all hover:shadow-lg"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${value.color}15` }}>
                      <value.icon className="w-8 h-8" style={{ color: value.color }} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">{value.description}</p>
                    {value.principles && (
                      <div className="grid md:grid-cols-2 gap-2 mt-4">
                        {value.principles.map((principle, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className="mt-1.5 flex-shrink-0">
                              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: value.color }} />
                            </div>
                            <span className="text-sm text-gray-700">{principle}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              {language === "en" ? "Why Choose" : "Mengapa Memilih"}{" "}
              <span className="bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent">
                {language === "en" ? "KadaiPOS" : "KadaiPOS"}
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FF5A5F]/10 to-[#8B5CF6]/10 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-[#FF5A5F]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              {language === "en" ? "Meet Our" : "Tim"}{" "}
              <span className="bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent">
                {language === "en" ? "Team" : "Kami"}
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === "en"
                ? "The people behind KadaiPOS"
                : "Orang-orang di balik KadaiPOS"}
            </p>
          </motion.div>

          <div className="max-w-md mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 border-2 border-gray-200 text-center"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-[#FF5A5F] font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.description}</p>
              </motion.div>
            ))}
          </div>
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
              {language === "en" ? "Be an Early Adopter" : "Jadilah Early Adopter"}
            </h2>
            <p className="text-xl text-white/80 mb-8">
              {language === "en"
                ? "Join us in revolutionizing business management. Get special pricing and help shape the future of KadaiPOS."
                : "Bergabunglah dengan kami dalam merevolusi manajemen bisnis. Dapatkan harga spesial dan bantu membentuk masa depan KadaiPOS."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/6281339765775"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] text-white rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all"
              >
                {language === "en" ? "Contact Us" : "Hubungi Kami"}
              </a>
              <a
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold border border-white/20 hover:bg-white/20 transition-all"
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
