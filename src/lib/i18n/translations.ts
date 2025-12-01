export const translations = {
  en: {
    nav: {
      features: "Features",
      pricing: "Pricing",
      about: "About",
      contact: "Contact",
      docs: "Documentation",
      login: "Log in",
      getDemo: "Try Demo",
    },
    hero: {
      title: "Streamline Your Business with",
      titleHighlight: "Smart POS",
      subtitle: "KadaiPOS is the all-in-one point of sale solution for restaurants, cafes, and retail stores. Increase efficiency, delight customers, and grow your business.",
      getStarted: "Get Started",
      watchDemo: "Watch Demo",
    },
    features: {
      sectionTitle: "Everything you need",
      title: "All-in-one business management",
      subtitle: "Powerful features designed to help you run your business more efficiently and profitably.",
      fastOrder: {
        title: "Fast Order Processing",
        description: "Lightning-fast order entry with intuitive interface. Serve more customers in less time.",
      },
      inventory: {
        title: "Inventory Management",
        description: "Real-time inventory tracking. Never run out of stock or over-order again.",
      },
      analytics: {
        title: "Advanced Analytics",
        description: "Detailed reports and insights to help you make data-driven decisions.",
      },
      customer: {
        title: "Customer Management",
        description: "Build customer loyalty with integrated CRM and rewards programs.",
      },
      payment: {
        title: "Multiple Payment Options",
        description: "Accept all major payment methods including contactless and mobile payments.",
      },
      mobile: {
        title: "Mobile Ready",
        description: "Manage your business from anywhere with our mobile app.",
      },
    },
    cta: {
      title: "Ready to transform your business?",
      subtitle: "Join thousands of businesses already using KadaiPOS. Start your free trial today, no credit card required.",
      startTrial: "Start Free Trial",
      talkSales: "Talk to Sales",
    },
    footer: {
      description: "Modern point of sale system for restaurants, cafes, and retail stores. Streamline your operations and delight your customers.",
      product: "Product",
      company: "Company",
      legal: "Legal",
    },
  },
  id: {
    nav: {
      features: "Fitur",
      pricing: "Harga",
      about: "Tentang",
      contact: "Kontak",
      docs: "Dokumentasi",
      login: "Masuk",
      getDemo: "Coba Demo",
    },
    hero: {
      title: "Tingkatkan Bisnis Anda dengan",
      titleHighlight: "POS Pintar",
      subtitle: "KadaiPOS adalah solusi point of sale lengkap untuk restoran, kafe, dan toko retail. Tingkatkan efisiensi, puaskan pelanggan, dan kembangkan bisnis Anda.",
      getStarted: "Mulai Sekarang",
      watchDemo: "Lihat Demo",
    },
    features: {
      sectionTitle: "Semua yang Anda butuhkan",
      title: "Manajemen bisnis lengkap",
      subtitle: "Fitur-fitur canggih yang dirancang untuk membantu Anda menjalankan bisnis dengan lebih efisien dan menguntungkan.",
      fastOrder: {
        title: "Pemrosesan Pesanan Cepat",
        description: "Entri pesanan super cepat dengan antarmuka intuitif. Layani lebih banyak pelanggan dalam waktu singkat.",
      },
      inventory: {
        title: "Manajemen Inventori",
        description: "Pelacakan inventori real-time. Tidak akan pernah kehabisan stok atau memesan berlebihan lagi.",
      },
      analytics: {
        title: "Analitik Canggih",
        description: "Laporan dan wawasan terperinci untuk membantu Anda membuat keputusan berbasis data.",
      },
      customer: {
        title: "Manajemen Pelanggan",
        description: "Bangun loyalitas pelanggan dengan CRM terintegrasi dan program reward.",
      },
      payment: {
        title: "Berbagai Opsi Pembayaran",
        description: "Terima semua metode pembayaran utama termasuk pembayaran contactless dan mobile.",
      },
      mobile: {
        title: "Siap Mobile",
        description: "Kelola bisnis Anda dari mana saja dengan aplikasi mobile kami.",
      },
    },
    cta: {
      title: "Siap mentransformasi bisnis Anda?",
      subtitle: "Bergabunglah dengan ribuan bisnis yang sudah menggunakan KadaiPOS. Mulai uji coba gratis hari ini, tanpa kartu kredit.",
      startTrial: "Mulai Uji Coba Gratis",
      talkSales: "Hubungi Sales",
    },
    footer: {
      description: "Sistem point of sale modern untuk restoran, kafe, dan toko retail. Sederhanakan operasi Anda dan puaskan pelanggan Anda.",
      product: "Produk",
      company: "Perusahaan",
      legal: "Legal",
    },
  },
} as const

export type Language = keyof typeof translations
export type TranslationKeys = typeof translations.en
