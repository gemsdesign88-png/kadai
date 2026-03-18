"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  Users,
  FileText,
  DollarSign,
  BarChart2,
  Building2,
  ArrowUpRight,
  Menu,
  X,
  ChevronDown,
  Clock,
  Briefcase,
  Wallet,
  Settings,
  CheckCircle2,
} from "lucide-react";

// ─── Pricing Component ────────────────────────────────────────────────────────
const PricingCalculator = ({ lang }: { lang: Lang }) => {
  const [workers, setWorkers] = useState(100);
  const [selectedModules, setSelectedModules] = useState<string[]>(["attendance"]);
  const [expandedModule, setExpandedModule] = useState<string | null>("attendance");

  const modules = [
    { 
      id: "attendance", 
      name: lang === 'id' ? "Absensi & GPS" : "Attendance & GPS", 
      icon: MapPin, 
      price: { type: 'per_person', base: 10000, mid: 9000, large: 8000 },
      desc: lang === 'id' ? "Geofencing, Selfie, Multi-shift" : "Geofencing, Selfie, Multi-shift",
      longDesc: lang === 'id' 
        ? "Verifikasi kehadiran tim di lapangan dengan GPS Fencing dan Foto Selfie. Hilangkan manipulasi absensi dan pantau tim secara real-time."
        : "Verify field team attendance with GPS Fencing and Selfie. Eliminate attendance manipulation and monitor your team in real-time."
    },
    { 
      id: "payroll", 
      name: lang === 'id' ? "Payroll & Payslip" : "Payroll & Payslips", 
      icon: Wallet, 
      price: { type: 'flat', value: 499000 },
      desc: lang === 'id' ? "Hitung gaji otomatis & kirim slip" : "Auto-calculate & send payslips",
      longDesc: lang === 'id'
        ? "Hemat waktu berhari-hari administrasi. Hitung gaji, lembur, dan potongan otomatis berdasarkan data absensi, lalu kirim slip gaji ke WhatsApp."
        : "Save days of admin work. Auto-calculate salary, overtime, and deductions based on attendance, then send payslips directly to WhatsApp."
    },
    { 
      id: "finance", 
      name: lang === 'id' ? "Finance & Accounting" : "Finance & Accounting", 
      icon: DollarSign, 
      price: { type: 'flat', value: 999000 },
      desc: lang === 'id' ? "Buku kas, Expense, Laporan P&L" : "Cashbook, Expenses, P&L Reports",
      longDesc: lang === 'id'
        ? "Cegah kebocoran dana proyek. Pantau setiap rupiah yang keluar-masuk, kelola budget proyek, dan hasilkan laporan laba rugi instan."
        : "Prevent fund leakage. Track every cent in and out, manage project budgets, and generate instant profit and loss reports."
    },
  ];

  const calculateTotal = () => {
    let total = 0;
    selectedModules.forEach(modId => {
      const mod = modules.find(m => m.id === modId);
      if (mod && mod.price) {
        if (mod.price.type === 'per_person') {
          let rate = mod.price.base;
          if (workers > 200) rate = mod.price.large;
          else if (workers > 100) rate = mod.price.mid;
          total += workers * rate;
        } else {
          total += mod.price.value;
        }
      }
    });
    return total;
  };

  const getModulePrice = (mId: string) => {
    const mod = modules.find(m => m.id === mId);
    if (!mod) return 0;
    if (mod.price.type === 'per_person') {
      let rate = mod.price.base;
      if (workers > 200) rate = mod.price.large;
      else if (workers > 100) rate = mod.price.mid;
      return workers * rate;
    }
    return mod.price.value;
  };

  const toggleModule = (id: string) => {
    if (id === 'attendance') {
      setExpandedModule(expandedModule === id ? null : id);
      return;
    }
    
    setSelectedModules(prev => {
      const isSelected = prev.includes(id);
      if (!isSelected) {
        setExpandedModule(id);
        return [...prev, id];
      } else {
        if (expandedModule === id) setExpandedModule(null);
        return prev.filter(m => m !== id);
      }
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
  };

  const generateCheckoutUrl = () => {
    const total = calculateTotal();
    const modulesText = selectedModules.map(mId => modules.find(m => m.id === mId)?.name).join(",");
    const params = new URLSearchParams({
      modules: modulesText,
      workers: workers.toString(),
      total: total.toString(),
      ref: 'marketing_site'
    });
    
    const baseUrl = window.location.origin;
    return `${baseUrl}/proyo/checkout?${params.toString()}`;
  };

  const efficiencyRate = (calculateTotal() / (workers || 1));

  return (
    <div className="grid lg:grid-cols-12 gap-12 items-start">
      {/* Left Column: Configuration */}
      <div className="lg:col-span-7 space-y-8">
        <div className="bg-gray-50/50 rounded-[40px] p-8 border border-gray-100">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-6 pl-2">
            {lang === 'id' ? 'KONFIGURASI MODUL' : 'MODULE CONFIGURATION'}
          </p>
          
          <div className="grid gap-4">
            {modules.map((mod) => {
              const Icon = mod.icon;
              const isSelected = selectedModules.includes(mod.id);
              const isExpanded = expandedModule === mod.id;
              
              let priceLabel = "";
              if (mod.price.type === 'per_person') {
                const currentRate = workers > 200 ? mod.price.large : workers > 100 ? mod.price.mid : mod.price.base;
                priceLabel = `Rp ${currentRate.toLocaleString('id-ID')}/org`;
              } else {
                priceLabel = `Rp ${mod.price.value.toLocaleString('id-ID')}/bln`;
              }
              
              return (
                <div key={mod.id} className={`group rounded-[32px] border transition-all duration-300 overflow-hidden ${
                  isSelected ? 'bg-white border-blue-200 shadow-xl shadow-blue-500/5 ring-1 ring-blue-100' : 'bg-white/50 border-gray-100 hover:border-gray-200'
                }`}>
                  {/* Header */}
                  <div 
                    onClick={() => toggleModule(mod.id)}
                    className="p-6 cursor-pointer flex items-center gap-5"
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      isSelected ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                    }`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className={`font-black text-base tracking-tight truncate ${isSelected ? 'text-black' : 'text-gray-500'}`}>
                          {mod.name}
                        </h4>
                        <div className="flex items-center gap-3">
                          <span className={`text-[11px] font-black px-3 py-1 rounded-full ${
                            isSelected ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-400'
                          }`}>
                            {priceLabel}
                          </span>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-200 bg-transparent'
                          }`}>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                      </div>
                      <p className="text-xs font-bold text-gray-400 truncate">{mod.desc}</p>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                      >
                        <div className="px-6 pb-6 pt-2">
                          <div className="h-px bg-gray-100 mb-6" />
                          
                          <p className="text-sm font-medium text-gray-500 leading-relaxed mb-6 italic">
                            "{mod.longDesc}"
                          </p>

                          {/* Specific configurations */}
                          {mod.id === 'attendance' && (
                            <div className="space-y-8 py-4 px-6 bg-blue-50/50 rounded-[24px] border border-blue-100/50">
                              <div className="flex justify-between items-center">
                                <div className="space-y-1">
                                  <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-900">
                                    {lang === 'id' ? 'SKALA PEKERJA' : 'WORKFORCE SCALE'}
                                  </h3>
                                  <div className="flex items-center gap-2">
                                    <span className="text-4xl font-black text-blue-600 tracking-tighter">{workers}</span>
                                    <span className="text-xs font-bold text-blue-400 uppercase tracking-widest mt-2">{lang === 'id' ? 'PEKERJA' : 'WORKERS'}</span>
                                  </div>
                                </div>
                                <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-blue-100 flex flex-col items-center">
                                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{lang === 'id' ? 'EFISIENSI' : 'EFFICIENCY'}</span>
                                  <span className="text-sm font-black text-blue-600">{formatPrice(efficiencyRate)}<span className="text-[10px] text-gray-400">/org</span></span>
                                </div>

                                <div className="space-y-4">
                                  <div className="relative h-10 flex flex-col justify-center">
                                    <input 
                                      type="range" 
                                      min="10" 
                                      max="1000" 
                                      step="10"
                                      value={workers}
                                      onChange={(e) => setWorkers(parseInt(e.target.value))}
                                      className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600 relative z-10"
                                    />
                                    <div className="absolute inset-0 flex justify-between items-center px-[2px] pointer-events-none">
                                      <div className="flex flex-col items-center gap-1">
                                        <div className="w-0.5 h-1.5 bg-blue-300/50 rounded-full" />
                                        <span className="text-[9px] font-black text-blue-300 mt-5">10</span>
                                      </div>
                                      <div className="flex flex-col items-center gap-1">
                                        <div className="w-0.5 h-2.5 bg-blue-400/50 rounded-full" />
                                        <span className="text-[10px] font-black text-blue-400 mt-5">500</span>
                                      </div>
                                      <div className="flex flex-col items-center gap-1">
                                        <div className="w-0.5 h-1.5 bg-blue-300/50 rounded-full" />
                                        <span className="text-[9px] font-black text-blue-300 mt-5">1.000+</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="lg:col-span-5 sticky top-32">
        <div className="bg-black text-white rounded-[48px] p-10 shadow-2xl shadow-blue-900/10 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] -mr-40 -mt-40" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/5 rounded-full blur-[60px] -ml-20 -mb-20" />
          
          <div className="relative z-10">
            <h3 className="text-xl font-black mb-10 tracking-tight flex items-center gap-3">
              <span className="w-2 h-8 bg-blue-600 rounded-full" />
              {lang === 'id' ? 'Estimasi Investasi' : 'Investment Estimate'}
            </h3>
            
            <div className="space-y-8 mb-12">
              <div className="space-y-4">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{lang === 'id' ? 'RINCIAN INVESTASI' : 'INVESTMENT BREAKDOWN'}</span>
                {selectedModules.map(mId => {
                  const mod = modules.find(m => m.id === mId);
                  const Icon = mod?.icon || MapPin;
                  const itemPrice = getModulePrice(mId);
                  return (
                    <div key={mId} className="flex items-center justify-between group/item">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gray-900 border border-white/5 flex items-center justify-center text-blue-400 group-hover/item:text-blue-300 transition-colors">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[13px] font-bold text-gray-200">{mod?.name}</span>
                          {mod?.id === 'attendance' && (
                            <span className="text-[9px] font-black text-blue-500/80 uppercase tracking-tighter">
                              {workers} {lang === 'id' ? 'Karyawan' : 'Employees'}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-sm font-black text-gray-300">{formatPrice(itemPrice)}</span>
                    </div>
                  );
                })}
              </div>

              <div className="h-px bg-white/5 w-full" />

              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">{lang === 'id' ? 'TOTAL PER BULAN' : 'TOTAL PER MONTH'}</span>
                <div>
                  <div className="flex items-baseline gap-2">
                    <p className="text-5xl font-black tracking-tighter">{formatPrice(calculateTotal())}</p>
                    <span className="text-gray-600 font-bold">/bln</span>
                  </div>
                  <p className="text-[11px] font-bold text-gray-500 uppercase mt-4 flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    {lang === 'id' 
                      ? `Hanya ${formatPrice(efficiencyRate)} per karyawan` 
                      : `Only ${formatPrice(efficiencyRate)} per employee`}
                  </p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => window.open(generateCheckoutUrl(), '_blank')}
              className="w-full py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[28px] font-black text-sm uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98] group"
            >
              <span className="flex items-center justify-center gap-2">
                {lang === 'id' ? 'Lanjut ke Pembayaran' : 'Continue to Payment'}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </button>
            
            <p className="text-center text-[10px] font-bold text-gray-600 mt-8 uppercase tracking-widest leading-loose">
              {lang === 'id' 
                ? 'Pendaftaran akun, domain perusahaan, & detail invoice di halaman selanjutnya' 
                : 'Account registration, company domain, & invoice details on the next page'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Types ────────────────────────────────────────────────────────────────────
type Lang = "en" | "id" | "zh";

// ─── Copy ─────────────────────────────────────────────────────────────────────
const copy = {
  en: {
    badge: "Construction Team Management App",
    nav: ["Features", "Pricing", "About", "Contact"],
    hero: {
      h1a: "Manage Your Construction,",
      h1b: "Team & Finance.",
      sub: "Smart attendance, project payroll, and financial reports — all in one powerful dashboard built for construction management.",
      cta1: "Download App",
      cta1note: "Coming soon",
      cta2: "Open Web App",
    },
    pains: {
      label: "THE PROBLEM",
      title: "Running a construction\ncompany is hard.",
      items: [
        {
          icon: MapPin,
          title: "Ghost Workers & Manual Logs",
          desc: "Paper sign-ins get lost or forged. You never know who's actually on site, where they are, or who's cheating their hours.",
        },
        {
          icon: FileText,
          title: "Nightmare Payroll Cycles",
          desc: "Project allowances, complex overtime, and varying deductions take days of manual spreadsheet work to calculate every month.",
        },
        {
          icon: Users,
          title: "WhatsApp Request Chaos",
          desc: "Leave and overtime requests are scattered across chat groups. Approvals are forgotten, and records are impossible to track.",
        },
        {
          icon: DollarSign,
          title: "Blind Spot on Profits",
          desc: "You have no idea how much cash is actually on site, which project is leaking money, or if bills are past due until it's too late.",
        },
        {
          icon: Briefcase,
          title: "Multi-Project Blindness",
          desc: "Managing multiple sites means you're spread thin. Each site has different rules and teams, making centralized control a nightmare.",
        },
      ],
    },
    solutions: {
      label: "THE SOLUTION",
      title: "Automate your site,\ncontrol your growth.",
      items: [
        {
          title: "Verify Every Clock-in",
          desc: "Use GPS fencing and mandatory selfies. If they aren't at the coords, they can't log in. No more ghost attendance.",
        },
        {
          title: "One-Click Payslips",
          desc: "All attendance and project rules are pre-calculated. Review and export thousands of payslips in minutes, not days.",
        },
        {
          title: "Centralized HQ",
          desc: "A single powerful dashboard to manage all your projects. See who's present at Site A while Site B is requesting more material.",
        },
        {
          title: "Financial Visibility",
          desc: "Every expense and bank transaction is recorded. Instant Balance Sheet and P&L reports mean you're always audit-ready.",
        },
      ],
    },
    features: {
      label: "FEATURES",
      title: "Everything your\nteam needs.",
      items: [
        {
          icon: MapPin,
          title: "Smart Attendance",
          desc: "Clock in/out with GPS, photo verification, and QR code options. Support for multiple sessions daily.",
          screen: "attendance",
        },
        {
          icon: Users,
          title: "Team & Payroll",
          desc: "Manage employees, roles, and auto-calculate salaries with project allowances in seconds.",
          screen: "team",
        },
        {
          icon: FileText,
          title: "Requests & Leave",
          desc: "Submit and approve leave or overtime requests directly from the app. No more WhatsApp chaos.",
          screen: "requests",
        },
        {
          icon: DollarSign,
          title: "Finance & Cash",
          desc: "Track company cash, bank balances, expenses, and bills. Integrated with your accounting flow.",
          screen: "finance",
        },
        {
          icon: Wallet,
          title: "Integrated Payslips",
          desc: "Generate and send professional payslips in one click.",
          screen: "payslip",
        },
        {
          icon: Settings,
          title: "Multi-Location",
          desc: "Manage multiple project sites and offices from one dashboard. Each with its own rules.",
          screen: "dashboard",
        },
      ],
    },
    showcase: {
      label: "THE APP",
      title: "Designed for people\nwho work in the field.",
      sub: "Simple enough for workers. Powerful enough for owners.",
      screens: ["Dashboard", "GPS Attendance", "Payslip"],
    },
    howItWorks: {
      label: "HOW IT WORKS",
      title: "Up and running\nin minutes.",
      steps: [
        {
          num: "01",
          title: "Register your company",
          desc: "Create an account, set up your organization, locations, and work schedules.",
        },
        {
          num: "02",
          title: "Invite your team",
          desc: "Share a link or QR code. Workers install the app and join automatically.",
        },
        {
          num: "03",
          title: "Run your operations",
          desc: "Attendance, leave approvals, payroll — all automated. Focus on what matters.",
        },
      ],
    },
    cta: {
      title: "Ready to take\ncontrol?",
      sub: "Download Proyo and manage your construction team from anywhere.",
      btn1: "Download App",
      btn1sub: "Coming Soon",
      btn2: "Open Web App",
    },
    footer: {
      tagline: "Construction team management, simplified.",
      ecosystem: "Part of the Kadai Ecosystem",
      rights: "© 2026 Proyo. All rights reserved.",
    },
  },
  id: {
    badge: "Aplikasi Manajemen Tim Konstruksi",
    nav: ["Fitur", "Harga", "Tentang", "Kontak"],
    hero: {
      h1a: "Kelola Konstruksi,",
      h1b: "Tim & Keuangan.",
      sub: "Absensi cerdas, payroll proyek, dan laporan keuangan — semua dalam satu dashboard canggih untuk manajemen konstruksi.",
      cta1: "Download App",
      cta1note: "Segera hadir",
      cta2: "Buka Web App",
    },
    pains: {
      label: "MASALAHNYA",
      title: "Jalanin perusahaan\nkonstruksi itu ribet.",
      items: [
        {
          icon: MapPin,
          title: "Absensi Kertas & Pegawai Hantu",
          desc: "Log manual gampang ilang atau dimanipulasi. Kamu nggak pernah tahu siapa yang beneran ada di lokasi, di mana, dan jam berapa.",
        },
        {
          icon: FileText,
          title: "Hitung Gaji Itu Mimpi Buruk",
          desc: "Tunjangan proyek, lembur rumit, dan potongan-potongan bikin admin pusing berhari-hari hitung manual setiap gajian.",
        },
        {
          icon: Users,
          title: "Kekacauan Chat WhatsApp",
          desc: "Request cuti dan lembur numpuk di grup chat. Approval sering lupa, dan rekapan data mustahil ditelusuri.",
        },
        {
          icon: DollarSign,
          title: "Keuangan Nggak Jelas",
          desc: "Kamu nggak tahu uang kas sisa berapa, proyek mana yang boros, atau tagihan mana yang nunggak sampe semuanya terlambat.",
        },
        {
          icon: Briefcase,
          title: "Manajemen Multi-Situs",
          desc: "Kalo punya banyak proyek, kontrolnya berantakan. Tiap lokasi punya aturan dan tim beda, bikin pusing pusat.",
        },
      ],
    },
    solutions: {
      label: "SOLUSINYA",
      title: "Otomatisasi lokasi,\nkendali pertumbuhan.",
      items: [
        {
          title: "Verifikasi Setiap Absen",
          desc: "Wajib selfie dan GPS fencing. Kalo nggak di koordinat yang benar, nggak bisa lapor masuk. Gak ada lagi manipulasi.",
        },
        {
          title: "Slip Gaji Sekali Klik",
          desc: "Semua aturan proyek sudah dihitung otomatis. Review dan ekspor ribuan slip gaji dalam hitungan menit, bukan hari.",
        },
        {
          title: "Pusat Kendali Tunggal",
          desc: "Satu dashboard untuk semua proyek. Pantau siapa yang hadir di Proyek A sambil approve lembur di Proyek B.",
        },
        {
          title: "Visibilitas Keuangan",
          desc: "Semua pengeluaran dan transaksi bank tercatat. Laporan Neraca dan Laba/Rugi siap saji kapan saja.",
        },
      ],
    },
    features: {
      label: "FITUR",
      title: "Semua yang tim\nkamu butuhkan.",
      items: [
        {
          icon: MapPin,
          title: "Absensi Cerdas",
          desc: "Clock in/out dengan GPS, verifikasi foto, dan opsi QR. Mendukung banyak sesi per hari.",
          screen: "attendance",
        },
        {
          icon: Users,
          title: "Tim & Payroll",
          desc: "Kelola karyawan, aturan posisi, dan hitung gaji otomatis dengan tunjangan proyek cepat.",
          screen: "team",
        },
        {
          icon: FileText,
          title: "Request & Cuti",
          desc: "Ajukan dan setujui cuti atau lembur langsung dari app. Tidak ada lagi kekacauan WhatsApp.",
          screen: "requests",
        },
        {
          icon: DollarSign,
          title: "Keuangan & Kas",
          desc: "Pantau saldo kas, bank, biaya (expenses), dan tagihan. Terintegrasi ke laporan akuntansi.",
          screen: "finance",
        },
        {
          icon: Wallet,
          title: "Slip Gaji Terintegrasi",
          desc: "Buat dan kirim slip gaji profesional hanya dengan satu klik.",
          screen: "payslip",
        },
        {
          icon: Settings,
          title: "Multi-Lokasi",
          desc: "Kelola beberapa lokasi proyek dan kantor dari satu dashboard. Masing-masing dengan aturan sendiri.",
          screen: "dashboard",
        },
      ],
    },
    showcase: {
      label: "APLIKASINYA",
      title: "Dirancang untuk orang\nyang kerja di lapangan.",
      sub: "Cukup simpel untuk karyawan. Cukup kuat untuk owner.",
      screens: ["Dashboard", "Absensi GPS", "Slip Gaji"],
    },
    howItWorks: {
      label: "CARA KERJANYA",
      title: "Siap digunakan dalam\nhitungan menit.",
      steps: [
        {
          num: "01",
          title: "Daftarkan perusahaan",
          desc: "Buat akun, atur organisasi, lokasi kerja, dan shift karyawan.",
        },
        {
          num: "02",
          title: "Undang tim kamu",
          desc: "Bagikan link atau QR code. Karyawan install app dan langsung bergabung.",
        },
        {
          num: "03",
          title: "Jalankan operasional",
          desc: "Absensi, approval cuti, gaji — semuanya otomatis. Fokus ke hal yang penting.",
        },
      ],
    },
    cta: {
      title: "Siap ambil\nkendali?",
      sub: "Download Proyo dan kelola tim konstruksi kamu dari mana saja.",
      btn1: "Download App",
      btn1sub: "Segera Hadir",
      btn2: "Buka Web App",
    },
    footer: {
      tagline: "Manajemen tim konstruksi, disederhanakan.",
      ecosystem: "Bagian dari Ekosistem Kadai",
      rights: "© 2026 Proyo. Hak cipta dilindungi.",
    },
  },
  zh: {
    badge: "建筑团队管理应用",
    nav: ["功能", "价格", "关于", "联系"],
    hero: {
      h1a: "管理您的施工",
      h1b: "团队与财务。",
      sub: "智能考勤、项目薪资 and 财务报表 — 为施工管理量身定制的一站式强大后台。",
      cta1: "下载应用",
      cta1note: "即将推出",
      cta2: "打开网页版",
    },
    pains: {
      label: "问题所在",
      title: "管理施工公司\n并不容易。",
      items: [
        {
          icon: MapPin,
          title: "虚假打卡 & 纸质记录",
          desc: "纸质签到容易丢失或作假，您永远不知道谁真正在现场打卡、从哪里、什么时间。",
        },
        {
          icon: FileText,
          title: "地狱般的薪资计算",
          desc: "项目津贴、复杂的加班费和各种扣款，每个发薪周期都要耗费数天手动计算表格。",
        },
        {
          icon: Users,
          title: "WhatsApp 申请混乱",
          desc: "请假和加班申请散落在各个聊天群中，审批容易遗忘，记录根本无法追溯。",
        },
        {
          icon: DollarSign,
          title: "财务状况盲区",
          desc: "您不知道账户里还剩多少现金，哪些项目正在亏损，或者账单是否逾期，直到为时已晚。",
        },
        {
          icon: Briefcase,
          title: "多项项目管理的头疼",
          desc: "同时管理多个工地意味着控制分散。每个工地的规则和团队都不同，总部管理极难。",
        },
      ],
    },
    solutions: {
      label: "解决方案",
      title: "工地自动化，\n掌控增长。",
      items: [
        {
          title: "验证每一次考勤",
          desc: "使用GPS围栏和强制自拍。如果不在指定坐标，则无法打卡。告备虚假打卡。",
        },
        {
          title: "一键生成工资单",
          desc: "所有考勤和项目规则均已预先计算。几分钟内即可审核并导出数千张工资单。",
        },
        {
          title: "单一管理总部",
          desc: "一个强大的仪表板即可管理所有项目。随时了解A工地的考勤，同时处理B工地的申请。",
        },
        {
          title: "财务透明度",
          desc: "每笔支出和银行交易都被记录。即时资产负债表和财报让您时刻准备好应对审计。",
        },
      ],
    },
    features: {
      label: "功能特点",
      title: "团队所需\n的一切。",
      items: [
        {
          icon: MapPin,
          title: "智能考勤",
          desc: "支持GPS、照片验证和二维码考勤。支持每日多次打卡。",
          screen: "attendance",
        },
        {
          icon: Users,
          title: "团队与薪资",
          desc: "管理员工、职位规则，并秒级自动计算包含项目津贴的薪资。",
          screen: "team",
        },
        {
          icon: FileText,
          title: "申请与请假",
          desc: "直接从应用申请和审批请假或加班。告别WhatsApp的混乱。",
          screen: "requests",
        },
        {
          icon: DollarSign,
          title: "财务与现金",
          desc: "跟踪公司现金、银行余额、支出和账单。与会计流程集成。",
          screen: "finance",
        },
        {
          icon: Wallet,
          title: "集成工资单",
          desc: "一键生成并发送专业工资单。",
          screen: "payslip",
        },
        {
          icon: Settings,
          title: "多地点管理",
          desc: "从一个仪表板管理多个项目工地和办公室。每个都有独立规则。",
          screen: "dashboard",
        },
      ],
    },
    showcase: {
      label: "应用界面",
      title: "专为现场工作人员\n精心设计。",
      sub: "员工用起来足够简单，老板用起来足够强大。",
      screens: ["仪表板", "GPS考勤", "工资单"],
    },
    howItWorks: {
      label: "使用方式",
      title: "几分钟内\n即可运行。",
      steps: [
        {
          num: "01",
          title: "注册您的公司",
          desc: "创建账户，设置组织架构、工地位置和工作班次。",
        },
        {
          num: "02",
          title: "邀请您的团队",
          desc: "分享链接或二维码，员工安装应用后自动加入。",
        },
        {
          num: "03",
          title: "运行您的业务",
          desc: "考勤、请假审批、工资 — 全部自动化。专注于重要的事情。",
        },
      ],
    },
    cta: {
      title: "准备好\n掌控一切了吗？",
      sub: "下载Proyo，随时随地管理您的建筑团队。",
      btn1: "下载应用",
      btn1sub: "即将推出",
      btn2: "打开网页版",
    },
    footer: {
      tagline: "建筑团队管理，化繁为简。",
      ecosystem: "属于Kadai生态系统",
      rights: "© 2026 Proyo。保留所有权利。",
    },
  },
};

// ─── Logo ─────────────────────────────────────────────────────────────────────
function ProyoLogo({ light = false, size = "md" }: { light?: boolean; size?: "sm" | "md" | "lg" }) {
  const color = light ? "white" : "#222222";
  const height = size === "sm" ? 18 : size === "lg" ? 40 : 28;
  const width = (height * 729) / 230;

  return (
    <div className="flex items-center">
      <svg
        width={width}
        height={height}
        viewBox="0 0 729 230"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-colors duration-300"
      >
        <path
          d="M43.5216 0C54.0842 7.40704e-05 62.647 8.51572 62.6471 19.0203V210.98C62.647 221.484 54.0843 230 43.5216 230C19.4853 230 2.12048e-06 210.622 0 186.718V43.2822C-2.12048e-06 19.3782 19.4853 2.10881e-06 43.5216 0Z"
          fill={color}
        />
        <path
          d="M98.4784 0C122.515 -2.10881e-06 142 19.3782 142 43.2822V124.415C142 148.319 122.515 167.698 98.4784 167.698C87.9158 167.697 79.353 159.182 79.3529 148.677V19.0203C79.353 8.51571 87.9158 6.6183e-05 98.4784 0Z"
          fill={color}
        />
        <path
          d="M207 179V46H262.86C271.347 46 279.073 47.9633 286.04 51.89C293.133 55.69 298.77 61.0733 302.95 68.04C307.13 74.88 309.22 82.86 309.22 91.98C309.22 100.973 307.13 108.953 302.95 115.92C298.897 122.887 293.323 128.333 286.23 132.26C279.263 136.06 271.41 137.96 262.67 137.96H229.61V179H207ZM229.61 118.01H260.01C264.95 118.01 269.383 116.997 273.31 114.97C277.363 112.943 280.53 109.967 282.81 106.04C285.217 102.113 286.42 97.49 286.42 92.17C286.42 86.5967 285.217 81.91 282.81 78.11C280.53 74.1833 277.363 71.2067 273.31 69.18C269.383 67.0267 265.013 65.95 260.2 65.95H229.61V118.01Z"
          fill={color}
        />
        <path
          d="M327.57 179V109.65C327.57 101.037 329.977 94.3233 334.79 89.51C339.73 84.57 346.507 82.1 355.12 82.1H378.49V100.72H359.11C356.07 100.72 353.663 101.607 351.89 103.38C350.243 105.153 349.42 107.56 349.42 110.6V179H327.57Z"
          fill={color}
        />
        <path
          d="M439.812 181.28C429.806 181.28 420.939 179.063 413.212 174.63C405.486 170.07 399.342 163.99 394.782 156.39C390.349 148.663 388.132 140.05 388.132 130.55C388.132 121.05 390.349 112.5 394.782 104.9C399.342 97.1733 405.486 91.0933 413.212 86.66C420.939 82.1 429.806 79.82 439.812 79.82C449.692 79.82 458.496 82.1 466.222 86.66C473.949 91.0933 480.029 97.11 484.462 104.71C489.022 112.31 491.302 120.923 491.302 130.55C491.302 140.05 489.022 148.663 484.462 156.39C480.029 163.99 473.949 170.07 466.222 174.63C458.496 179.063 449.692 181.28 439.812 181.28ZM439.812 162.66C445.766 162.66 450.959 161.267 455.392 158.48C459.826 155.567 463.246 151.703 465.652 146.89C468.059 142.077 469.262 136.63 469.262 130.55C469.262 124.597 468.059 119.213 465.652 114.4C463.246 109.46 459.826 105.597 455.392 102.81C450.959 99.8967 445.766 98.44 439.812 98.44C433.732 98.44 428.476 99.8967 424.042 102.81C419.736 105.597 416.316 109.397 413.782 114.21C411.376 119.023 410.172 124.47 410.172 130.55C410.172 136.503 411.376 141.95 413.782 146.89C416.316 151.703 419.736 155.567 424.042 158.48C428.476 161.267 433.732 162.66 439.812 162.66Z"
          fill={color}
        />
        <path
          d="M547.741 217.57V180.33C540.395 178.937 534.061 176.34 528.741 172.54C523.421 168.613 519.305 163.673 516.391 157.72C513.478 151.767 512.021 145.18 512.021 137.96V82.1H533.871V137.77C533.871 142.71 534.948 147.08 537.101 150.88C539.381 154.553 542.358 157.467 546.031 159.62C549.831 161.647 553.948 162.66 558.381 162.66C562.815 162.66 566.868 161.647 570.541 159.62C574.341 157.467 577.318 154.553 579.471 150.88C581.751 147.08 582.891 142.71 582.891 137.77V82.1H604.741V137.96C604.741 145.18 603.285 151.703 600.371 157.53C597.458 163.357 593.341 168.297 588.021 172.35C582.828 176.277 576.621 178.873 569.401 180.14V217.57H547.741Z"
          fill={color}
        />
        <path
          d="M677.127 181.28C667.12 181.28 658.253 179.063 650.527 174.63C642.8 170.07 636.657 163.99 632.097 156.39C627.663 148.663 625.447 140.05 625.447 130.55C625.447 121.05 627.663 112.5 632.097 104.9C636.657 97.1733 642.8 91.0933 650.527 86.66C658.253 82.1 667.12 79.82 677.127 79.82C687.007 79.82 695.81 82.1 703.537 86.66C711.263 91.0933 717.343 97.11 721.777 104.71C726.337 112.31 728.617 120.923 728.617 130.55C728.617 140.05 726.337 148.663 721.777 156.39C717.343 163.99 711.263 170.07 703.537 174.63C695.81 179.063 687.007 181.28 677.127 181.28ZM677.127 162.66C683.08 162.66 688.273 161.267 692.707 158.48C697.14 155.567 700.56 151.703 702.967 146.89C705.373 142.077 706.577 136.63 706.577 130.55C706.577 124.597 705.373 119.213 702.967 114.4C700.56 109.46 697.14 105.597 692.707 102.81C688.273 99.8967 683.08 98.44 677.127 98.44C671.047 98.44 665.79 99.8967 661.357 102.81C657.05 105.597 653.63 109.397 651.097 114.21C648.69 119.023 647.487 124.47 647.487 130.55C647.487 136.503 648.69 141.95 651.097 146.89C653.63 151.703 657.05 155.567 661.357 158.48C665.79 161.267 671.047 162.66 677.127 162.66Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

// ─── Tablet Frame ──────────────────────────────────────────────────────────
function TabletFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative mx-auto border-[#0A0A0A] bg-[#0A0A0A] border-[12px] rounded-[40px] h-[600px] w-[850px] shadow-2xl overflow-hidden ${className}`}>
      {/* Front-facing camera */}
      <div className="absolute top-0 inset-x-0 flex justify-center mt-3 z-50">
        <div className="h-1.5 w-1.5 bg-gray-800 rounded-full" />
      </div>
      
      {/* Screen Content */}
      <div className="h-full w-full bg-white rounded-[28px] overflow-hidden relative">
        {children}
      </div>
      
      {/* Home line */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-200/50 rounded-full z-50" />
    </div>
  );
}

// ─── Screen: Dashboard ────────────────────────────────────────────────────────
function DashboardScreen({ lang }: { lang: Lang }) {
  const isId = lang === "id";
  const isZh = lang === "zh";
  const title = isZh ? "管理" : isId ? "Manajemen" : "Management";
  
  const stats = [
    { label: isId ? "Hadir" : "Present", v: "158", c: "text-blue-600" },
    { label: isId ? "Izin" : "Leave", v: "12", c: "text-amber-600" },
    { label: isId ? "Terlambat" : "Late", v: "8", c: "text-rose-600" },
  ];

  const balances = [
    { label: isId ? "Saldo Kas" : "Cash Balance", v: "12,4jt", c: "text-emerald-600" },
    { label: isId ? "Saldo Bank" : "Bank Balance", v: "230,0jt", c: "text-blue-600" },
  ];

  return (
    <div className="h-full bg-[#F8F9FD] flex flex-col pt-6 px-6 pb-6 font-sans select-none overflow-y-auto no-scrollbar">
      {/* Real App Header Style */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center text-blue-600 font-black text-xl">
             G
          </div>
          <div>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest leading-none mb-1">Selamat Pagi,</p>
            <p className="font-black text-xl text-gray-900 tracking-tight leading-none">Gemmy Adyendra</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
           </div>
        </div>
      </div>
      
      <div className="grid grid-cols-12 gap-4 flex-1">
        {/* Left Column: Finance Focus */}
        <div className="col-span-12 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 transition-all group-hover:bg-emerald-50" />
            
            <div className="flex items-center justify-between mb-4 relative z-10">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
                  </div>
                  <p className="text-gray-900 font-bold text-sm">{isId ? "Total Kas & Bank" : "Total Cash & Bank"}</p>
               </div>
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300"><path d="m9 18 6-6-6-6"/></svg>
            </div>
            
            <p className="text-2xl font-black text-gray-900 tracking-tight mb-4 relative z-10">Rp 242.450.000</p>
            
            <div className="h-px bg-gray-50 mb-4" />
            
            <div className="grid grid-cols-2 gap-4 relative z-10">
               {balances.map((b, i) => (
                 <div key={i}>
                    <p className="text-gray-400 text-[9px] font-black uppercase tracking-widest mb-1">{b.label}</p>
                    <p className={`font-black text-base tracking-tight ${b.c}`}>Rp {b.v}</p>
                 </div>
               ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col items-center text-center group">
               <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3z"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
               </div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{isId ? "Proyek Aktif" : "Active Projects"}</p>
               <p className="text-2xl font-black text-gray-900">4</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
               <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                  </div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Absensi</p>
               </div>
               <div className="space-y-1">
                  <div className="flex justify-between items-center">
                     <span className="text-[9px] font-bold text-gray-400">Hadir</span>
                     <span className="text-xs font-black text-blue-600">158</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-[9px] font-bold text-gray-400">Terlambat</span>
                     <span className="text-xs font-black text-orange-600">8</span>
                  </div>
               </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
             <div className="flex justify-between items-center mb-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">{isId ? "Persetujuan" : "Approvals"}</p>
                <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
             </div>
             <div className="space-y-3">
                {[1,2].map(i => (
                  <div key={i} className="flex items-center justify-between pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-black text-gray-400">
                           {i === 1 ? 'A' : 'S'}
                        </div>
                        <div>
                           <p className="font-black text-xs text-gray-900 leading-none mb-1">{i === 1 ? 'Andi Wijaya' : 'Siti Aminah'}</p>
                           <p className="text-[9px] text-gray-400 font-bold leading-none">{i === 1 ? 'Izin Cuti • 3 Hari' : 'Lembur • 4 Jam'}</p>
                        </div>
                     </div>
                     <button className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Detail</button>
                  </div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ─── Screen: Attendance ───────────────────────────────────────────────────────
function AttendanceScreen({ lang }: { lang: Lang }) {
  const isId = lang === "id";
  const title = isId ? "Kehadiran" : "Attendance";
  const dateStr = isId ? "Senin, 16 Mar 2026" : "Mon, Mar 16, 2026";
  
  const stats = [
    { label: isId ? "Hadir" : "Present", value: "158", color: "text-blue-600", bg: "bg-blue-50" },
    { label: isId ? "Lembur" : "OT", value: "34", color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: isId ? "Terlambat" : "Late", value: "12", color: "text-orange-600", bg: "bg-orange-50" },
    { label: isId ? "Izin" : "Leave", value: "5", color: "text-rose-600", bg: "bg-rose-50" },
  ];

  return (
    <div className="h-full bg-[#F8F9FD] flex flex-col p-6 font-sans select-none overflow-y-auto no-scrollbar">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-100">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
          </div>
          <div>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest leading-none mb-1">{isId ? "Laporan Harian" : "Daily Report"}</p>
            <p className="text-2xl font-black text-gray-900 tracking-tight leading-none">{title}</p>
          </div>
        </div>
        <p className="text-gray-400 text-[11px] font-bold uppercase tracking-tight">{dateStr}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 flex-1">
         {stats.map((s, i) => (
           <div key={i} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group">
              <div className={`absolute top-0 right-0 w-20 h-20 ${s.bg} rounded-full blur-2xl -mr-10 -mt-10 opacity-40 group-hover:scale-125 transition-transform`} />
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2 relative z-10">{s.label}</p>
              <div className="flex items-end justify-between relative z-10">
                 <p className={`text-4xl font-black tracking-tighter ${s.color}`}>{s.value}</p>
                 <div className={`w-10 h-10 rounded-xl ${s.bg} ${s.color} flex items-center justify-center`}>
                    {i === 0 && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
                    {i === 1 && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
                    {i === 2 && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/></svg>}
                    {i === 3 && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
                 </div>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}

// ─── Screen: Payslip ──────────────────────────────────────────────────────────
function PayslipScreen({ lang }: { lang: Lang }) {
  const isId = lang === "id";
  const title = isId ? "Slip Gaji" : "Payslips";
  
  return (
    <div className="h-full bg-[#F8F9FD] flex flex-col p-6 font-sans select-none overflow-y-auto no-scrollbar">
       <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-100">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </div>
          <div>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest leading-none mb-1">Payroll Feb 2026</p>
            <p className="text-2xl font-black text-gray-900 tracking-tight leading-none">{title}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
         {[
           { n: "Andi Wijaya", a: "Rp 12,4jt", d: "15 Feb", s: "Sent" },
           { n: "Siti Aminah", a: "Rp 8,5jt", d: "15 Feb", s: "Sent" },
           { n: "Budi Santoso", a: "Rp 7,2jt", d: "15 Feb", s: "Draft" },
         ].map((p, i) => (
           <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center justify-between group">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 font-black text-xs">
                    {p.n[0]}
                 </div>
                 <div>
                    <p className="font-black text-sm text-gray-900 leading-none mb-1">{p.n}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">{p.d} • {p.s}</p>
                 </div>
              </div>
              <div className="text-right">
                 <p className="font-black text-sm text-gray-900 mb-1">{p.a}</p>
                 <button className="text-blue-600 font-black text-[9px] uppercase tracking-widest">Detail</button>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}

// ─── Screen: Team ────────────────────────────────────────────────────────────
function TeamScreen({ lang }: { lang: Lang }) {
  const isId = lang === "id";
  const title = isId ? "Tim Saya" : "My Team";
  
  const teams = [
    { name: "Andi Wijaya", role: "Project Manager", initial: "A", color: "bg-blue-100 text-blue-600" },
    { name: "Siti Aminah", role: "Site Supervisor", initial: "S", color: "bg-rose-100 text-rose-600" },
    { name: "Budi Santoso", role: "Purchasing", initial: "B", color: "bg-emerald-100 text-emerald-600" },
    { name: "Dewi Lestari", role: "Accountant", initial: "D", color: "bg-amber-100 text-amber-600" },
  ];

  return (
    <div className="h-full bg-[#F8F9FD] flex flex-col p-6 font-sans select-none overflow-y-auto no-scrollbar">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center shadow-lg shadow-orange-100">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest leading-none mb-1">{isId ? "Sumber Daya Manusia" : "Human Resources"}</p>
            <p className="text-2xl font-black text-gray-900 tracking-tight leading-none">{title}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
         {teams.map((t, i) => (
           <div key={i} className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex flex-col items-center text-center group">
              <div className={`w-14 h-14 rounded-full ${t.color} flex items-center justify-center font-black text-xl mb-4 shadow-inner group-hover:scale-110 transition-transform`}>
                 {t.initial}
              </div>
              <p className="font-black text-sm text-gray-900 leading-none mb-1">{t.name}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">{t.role}</p>
              
              <div className="mt-4 flex gap-2">
                 <div className="px-3 py-1 bg-gray-50 rounded-full text-[9px] font-black text-gray-400 uppercase tracking-widest">Detail</div>
                 <div className="px-3 py-1 bg-blue-50 rounded-full text-[9px] font-black text-blue-600 uppercase tracking-widest">Chat</div>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}

// ─── Screen: Requests ────────────────────────────────────────────────────────
function RequestsScreen({ lang }: { lang: Lang }) {
  const isId = lang === "id";
  const title = isId ? "Persetujuan" : "Approvals";

  const data = [
    { n: "Andi Wijaya", t: "Izin Cuti", d: "3 Hari", s: "Pending", i: "A" },
    { n: "Siti Aminah", t: "Lembur", d: "4 Jam", s: "Pending", i: "S" },
    { n: "Budi Santoso", t: "Sakit", d: "1 Hari", s: "Approved", i: "B" },
  ];

  return (
    <div className="h-full bg-[#F8F9FD] flex flex-col p-6 font-sans select-none overflow-y-auto no-scrollbar">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-100">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <div>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest leading-none mb-1">{isId ? "Status Pengajuan" : "Request Status"}</p>
            <p className="text-2xl font-black text-gray-900 tracking-tight leading-none">{title}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
         {data.map((r, i) => (
           <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm group">
              <div className="flex justify-between items-center mb-4">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-xs font-black text-gray-400">
                       {r.i}
                    </div>
                    <div>
                       <p className="font-black text-sm text-gray-900 leading-none mb-1">{r.n}</p>
                       <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">{r.t} • {r.d}</p>
                    </div>
                 </div>
                 <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${r.s === 'Pending' ? 'bg-orange-50 text-orange-600' : 'bg-emerald-50 text-emerald-600'}`}>
                    {r.s}
                 </div>
              </div>
              
              {r.s === 'Pending' && (
                <div className="flex gap-2">
                   <button className="flex-1 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm shadow-emerald-100 transition-transform active:scale-95 text-center">Setujui</button>
                   <button className="flex-1 py-2 bg-white border border-gray-100 text-rose-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-transform active:scale-95 text-center">Tolak</button>
                </div>
              )}
           </div>
         ))}
      </div>
    </div>
  );
}

// ─── Screen: Finance ──────────────────────────────────────────────────────────
function FinanceScreen({ lang }: { lang: Lang }) {
  const isId = lang === "id";
  const title = isId ? "Kas & Bank" : "Cash & Bank";

  return (
    <div className="h-full bg-[#F8F9FD] flex flex-col p-6 font-sans select-none overflow-y-auto no-scrollbar">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-100">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
          </div>
          <div>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest leading-none mb-1">{isId ? "Saldo Perusahaan" : "Company Balance"}</p>
            <p className="text-2xl font-black text-gray-900 tracking-tight leading-none">{title}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Kas Card */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/></svg>
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 leading-none">TOTAL KAS</p>
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-black text-gray-400">Rp</span>
            <span className="text-3xl font-black text-gray-900 tracking-tighter">12.450.000</span>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            </div>
            <p className="text-[10px] font-bold text-emerald-600 uppercase">+12.5%</p>
          </div>
        </div>

        {/* Bank Card */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 21h18"/><path d="M3 10h18"/><path d="M5 6l7-3 7 3"/><path d="M4 10v11"/><path d="M20 10v11"/></svg>
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 leading-none">TOTAL BANK</p>
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-black text-gray-400">Rp</span>
            <span className="text-3xl font-black text-gray-900 tracking-tighter">230.412.000</span>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            </div>
            <p className="text-[10px] font-bold text-blue-600 uppercase">+2.1%</p>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex-1">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 leading-none">{isId ? "PROYEK BERJALAN" : "ACTIVE PROJECTS"}</p>
        <div className="space-y-6">
           {[ { n: "Pembangunan Villa Canggu", p: 75, c: "bg-emerald-500" }, { n: "Renovasi Hotel Santika", p: 32, c: "bg-orange-500" } ].map((prj, i) => (
             <div key={i}>
                <div className="flex justify-between items-center mb-2">
                   <p className="text-sm font-black text-gray-900 truncate pr-4">{prj.n}</p>
                   <p className="text-[10px] font-black text-gray-400">{prj.p}%</p>
                </div>
                <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                   <div className={`h-full ${prj.c} rounded-full transition-all duration-1000`} style={{ width: `${prj.p}%` }} />
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}

// ─── Feature Accordion ──────────────────────────────────────────────────────
function FeatureAccordion({ items, lang }: { items: any[]; lang: Lang }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const getScreen = (screenName: string) => {
    switch (screenName) {
      case "attendance": return <AttendanceScreen lang={lang} />;
      case "payslip": return <PayslipScreen lang={lang} />;
      case "requests": return <RequestsScreen lang={lang} />;
      case "finance": return <FinanceScreen lang={lang} />;
      case "team": return <TeamScreen lang={lang} />;
      default: return <DashboardScreen lang={lang} />;
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Dynamic Screen View (Tablet) - MOVED TO TOP */}
      <div className="w-full flex justify-center relative mb-16">
        <div className="relative">
          {/* Enhanced glow background */}
          <div className="absolute -inset-24 bg-gradient-to-tr from-gray-100 via-white to-gray-50 rounded-full blur-[100px] opacity-40 transition-all duration-700 pointer-events-none" />
          
          <div className="relative z-10 transition-transform duration-500 hover:scale-[1.01]">
            <TabletFrame className="shadow-[0_45px_100px_-20px_rgba(0,0,0,0.15)]">
              <div className="flex h-full">
                {/* Real Sidebar Emulation */}
                <div className="w-[70px] bg-white border-r border-gray-100 flex flex-col items-center py-6 gap-6 z-20">
                  <div className="w-10 h-10 rounded-xl bg-[#F16126] flex items-center justify-center text-white mb-4 shadow-lg shadow-orange-100">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  </div>
                  {[
                    { i: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>, a: true },
                    { i: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, a: false },
                    { i: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>, a: false },
                    { i: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>, a: false }
                  ].map((it, idx) => (
                    <div key={idx} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${it.a ? 'bg-orange-50 text-[#F16126]' : 'text-gray-300 hover:bg-gray-50 hover:text-gray-400'}`}>
                      {it.i}
                    </div>
                  ))}
                  <div className="mt-auto w-10 h-10 rounded-full border-2 border-gray-100 p-0.5">
                    <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-black text-gray-400">GC</div>
                  </div>
                </div>

                <div className="flex-1 min-w-0 h-full relative overflow-hidden bg-[#F8F9FD]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                      className="h-full"
                    >
                      {getScreen(items[activeIndex].screen)}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </TabletFrame>
          </div>
        </div>
      </div>

      {/* Accordion list (Horizontal Grid) */}
      <div className="w-full grid md:grid-cols-3 lg:grid-cols-6 gap-3">
        {items.map((item, i) => {
          const isActive = activeIndex === i;
          return (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`text-left p-6 rounded-[32px] transition-all duration-500 border ${
                isActive 
                  ? "bg-white border-black/5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.06)] ring-1 ring-black/5" 
                  : "bg-transparent border-transparent hover:bg-gray-50"
              }`}
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 flex-shrink-0 ${
                  isActive ? "bg-black text-white scale-110 shadow-lg shadow-black/10" : "bg-gray-100 text-gray-400"
                }`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`text-xs font-black tracking-tight uppercase transition-all duration-500 ${
                    isActive ? "text-black" : "text-gray-400"
                  }`}>
                    {item.title}
                  </h3>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Section fade-in wrapper ──────────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ProyoPage() {
  const [lang, setLang] = useState<Lang>("id");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[lang];
  const langs: { code: Lang; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "id", label: "ID" },
    { code: "zh", label: "中文" },
  ];

  return (
    <div className="bg-white text-[#0A0A0A] min-h-screen" style={{ fontFamily: "var(--font-plus-jakarta-sans), system-ui, sans-serif" }}>

      {/* ── NAVBAR ──────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-black/8">
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <ProyoLogo />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {/* Language switcher */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
              {langs.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    lang === l.code
                      ? "bg-black text-white"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <Link
              href="https://proyo.kadai.id"
              target="_blank"
              className="flex items-center gap-1.5 bg-black text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-900 transition-colors"
            >
              {t.hero.cta2}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-black/8 bg-white px-5 py-4 space-y-4">
            <div className="flex gap-2">
              {langs.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setMenuOpen(false); }}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                    lang === l.code
                      ? "bg-black text-white border-black"
                      : "border-gray-200 text-gray-600"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <Link
              href="https://proyo.kadai.id"
              target="_blank"
              className="flex items-center justify-center gap-1.5 bg-black text-white px-4 py-2.5 rounded-full text-sm font-bold w-full"
              onClick={() => setMenuOpen(false)}
            >
              {t.hero.cta2} <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </header>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="min-h-screen flex items-center pt-16 relative overflow-hidden">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-24 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center w-full">
          {/* Left */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-black text-white text-xs font-bold px-4 py-2 rounded-full mb-8"
            >
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
              {t.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.0] tracking-tight mb-6"
            >
              {t.hero.h1a}
              <br />
              <span className="text-gray-400">{t.hero.h1b}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-500 leading-relaxed mb-10 max-w-md"
            >
              {t.hero.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                disabled
                className="flex flex-col items-center bg-black text-white px-7 py-3.5 rounded-2xl font-black text-base cursor-not-allowed opacity-60"
              >
                <span>{t.hero.cta1}</span>
                <span className="text-[10px] font-normal opacity-70">{t.hero.cta1note}</span>
              </button>
              <Link
                href="https://proyo.kadai.id"
                target="_blank"
                className="flex items-center gap-2 border-2 border-black text-black px-7 py-3.5 rounded-2xl font-black text-base hover:bg-black hover:text-white transition-all duration-200"
              >
                {t.hero.cta2}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Right: Tablet mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center xl:justify-end"
          >
            <div className="relative group">
              {/* Glow background */}
              <div className="absolute -inset-10 bg-blue-100/30 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <TabletFrame className="scale-[0.5] sm:scale-[0.6] md:scale-[0.7] lg:scale-[0.8] xl:scale-[0.85] origin-center xl:origin-right shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] transition-transform duration-700 group-hover:scale-[0.87]">
                <div className="flex h-full">
                  {/* Sidebar Emulation */}
                  <div className="w-[70px] bg-white border-r border-gray-100 flex flex-col items-center py-6 gap-6 z-20 flex-shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-[#F16126] flex items-center justify-center text-white mb-4 shadow-lg shadow-orange-100">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    </div>
                    {[
                      { i: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>, a: true },
                      { i: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, a: false },
                      { i: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>, a: false },
                      { i: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>, a: false }
                    ].map((it, idx) => (
                      <div key={idx} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${it.a ? 'bg-orange-50 text-[#F16126]' : 'text-gray-300 hover:bg-gray-50 hover:text-gray-400'}`}>
                        {it.i}
                      </div>
                    ))}
                    <div className="mt-auto w-10 h-10 rounded-full border-2 border-gray-100 p-0.5">
                      <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-black text-gray-400">GC</div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <DashboardScreen lang={lang} />
                  </div>
                </div>
              </TabletFrame>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 bg-white relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gray-100/50 rounded-full blur-[140px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
          <div className="mb-20 text-center">
            <FadeIn>
              <div className="inline-block px-6 py-2 bg-gray-50 rounded-full text-gray-400 font-extrabold text-[10px] uppercase tracking-[0.4em] mb-8 border border-gray-100 shadow-sm">
                POWER MANAGEMENT
              </div>
              <h2 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8 max-w-4xl mx-auto">
                {lang === 'id' ? 'Satu Layar,' : lang === 'zh' ? '一个屏幕,' : 'One Screen,'} <br/>
                <span className="text-gray-300">{lang === 'id' ? 'Kuasai Seluruh Proyek.' : lang === 'zh' ? '掌控所有工地.' : 'Master All Projects.'}</span>
              </h2>
              <p className="text-xl text-gray-400 font-bold max-w-2xl mx-auto tracking-tight">
                {lang === 'id' 
                  ? 'Dashboard tablet profesional untuk manajemen real-time. Pantau kehadiran, keuangan, dan progres tim dalam satu pandangan luas.' 
                  : lang === 'zh'
                  ? '专为平板电脑优化的大型管理面板，实时监控出勤、财务和团队进度。'
                  : 'Professional tablet dashboard for real-time management. Monitor attendance, finance, and team progress in one expansive view.'}
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.1}>
            <FeatureAccordion items={t.features.items} lang={lang} />
          </FadeIn>
        </div>
      </section>

      {/* ── PRICING CALCULATOR (Modular) ────────────────────────────────────── */}
      <section id="pricing" className="py-32 bg-white relative overflow-hidden border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
          <div className="text-center mb-20">
            <FadeIn>
              <div className="inline-block px-6 py-2 bg-blue-50 text-blue-600 rounded-full font-extrabold text-[10px] uppercase tracking-[0.4em] mb-8 shadow-sm">
                MODULAR PRICING
              </div>
              <h2 className="text-6xl md:text-7xl font-black leading-[0.9] tracking-tighter mb-4 max-w-2xl mx-auto">
                {lang === 'id' ? 'Bayar yang' : lang === 'zh' ? '按需' : 'Pay What'} <br/>
                <span className="text-gray-300">{lang === 'id' ? 'Anda Gunakan.' : lang === 'zh' ? '付费.' : 'You Use.'}</span>
              </h2>
              <p className="text-gray-400 font-bold text-sm">{lang === 'id' ? 'Pilih modul & jumlah pekerja untuk melihat estimasi investasi Anda.' : 'Choose modules & employee count to see your investment estimate.'}</p>
            </FadeIn>
          </div>

          <PricingCalculator lang={lang} />
        </div>
      </section>

      {/* ── PAIN POINTS (Redacted) ── */}
      <section id="pains" className="bg-[#0A0A0A] py-28 relative">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
          <FadeIn>
            <p className="text-red-500 text-xs font-bold tracking-[0.25em] uppercase mb-6">
              THE PAINS
            </p>
            <h2 className="text-5xl md:text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-20 max-w-4xl">
              {t.pains.title}
            </h2>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.pains.items.map((pain, i) => {
              const Icon = pain.icon;
              return (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="bg-[#111] border border-white/5 rounded-[32px] p-10 h-full hover:border-red-500/30 hover:bg-[#161616] transition-all duration-500 group relative overflow-hidden">
                     {/* Hover accent */}
                    <div className="absolute top-0 left-0 w-1 h-0 bg-red-500 group-hover:h-full transition-all duration-500" />
                    
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-red-500/10 transition-all duration-500">
                      <Icon className="w-7 h-7 text-gray-400 group-hover:text-red-500 transition-colors" />
                    </div>
                    
                    <h3 className="text-white font-black text-2xl mb-4 leading-tight tracking-tight">
                      {pain.title}
                    </h3>
                    <p className="text-gray-500 text-base leading-relaxed group-hover:text-gray-400 transition-colors">
                      {pain.desc}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS ───────────────────────────────────────────────────────── */}
      <section id="solutions" className="py-32 bg-[#0A0A0A] relative border-t border-white/5 overflow-hidden">
        {/* Deep emerald radial glow */}
        <div className="absolute bottom-[-10%] right-[10%] w-[1000px] h-[1000px] bg-emerald-500/[0.04] rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mb-24">
              <p className="text-emerald-500 text-xs font-bold tracking-[0.3em] uppercase mb-6">
                THE SOLUTIONS
              </p>
              <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-10">
                {t.solutions.title}
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.solutions.items.map((sol, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-[#111] border border-white/5 rounded-[40px] p-10 h-full hover:border-emerald-500/30 hover:bg-[#161616] transition-all duration-500 group relative">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center font-black text-2xl mb-10 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 text-emerald-500/50">
                    {i + 1}
                  </div>
                  <h3 className="text-white font-black text-2xl mb-6 tracking-tight leading-tight group-hover:translate-x-1 transition-transform">
                    {sol.title}
                  </h3>
                  <p className="text-gray-500 text-lg leading-relaxed group-hover:text-gray-400 transition-colors">
                    {sol.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────────────── */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Abstract background detail */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-gray-50 rounded-full blur-[100px] pointer-events-none -translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mb-24">
              <p className="text-gray-400 text-xs font-bold tracking-[0.3em] uppercase mb-6">
                {t.howItWorks.label}
              </p>
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter mb-8 max-w-xl whitespace-pre-line">
                {t.howItWorks.title}
              </h2>
            </div>
          </FadeIn>
          
          <div className="grid md:grid-cols-3 gap-12 lg:gap-20 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-[2.75rem] left-[10%] right-[10%] h-0.5 bg-gray-100" />
            
            {t.howItWorks.steps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div className="relative group">
                  <div className="w-20 h-20 bg-gray-50 text-black rounded-[28px] flex items-center justify-center font-black text-2xl mb-10 relative z-10 transition-all duration-500 group-hover:bg-black group-hover:text-white group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-black/20 ring-4 ring-white">
                    {step.num}
                  </div>
                  <h3 className="font-black text-3xl mb-6 tracking-tight leading-tight group-hover:translate-x-1 transition-transform duration-500">{step.title}</h3>
                  <p className="text-gray-500 text-lg leading-relaxed max-w-xs">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] py-40 relative overflow-hidden">
        {/* Animated glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.03] rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-5 md:px-8 text-center relative z-10">
          <FadeIn>
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-10 whitespace-pre-line">
              {t.cta.title}
            </h2>
            <p className="text-gray-400 text-xl md:text-2xl mb-16 max-w-xl mx-auto leading-relaxed">{t.cta.sub}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button
                disabled
                className="flex flex-col items-center bg-white text-black px-10 py-5 rounded-[24px] font-black text-xl cursor-not-allowed opacity-50 w-full sm:w-auto shadow-2xl shadow-white/10"
              >
                <span>{t.cta.btn1}</span>
                <span className="text-xs font-normal opacity-70 mt-0.5 tracking-wide">{t.cta.btn1sub}</span>
              </button>
              <Link
                href="https://proyo.kadai.id"
                target="_blank"
                className="flex items-center justify-center gap-3 border-2 border-white/20 text-white px-10 py-5 rounded-[24px] font-black text-xl hover:bg-white hover:text-black hover:border-white transition-all duration-300 w-full sm:w-auto group"
              >
                {t.cta.btn2}
                <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="bg-black border-t border-white/8 py-12">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <ProyoLogo light />
              <p className="text-gray-600 text-sm mt-3 max-w-xs">{t.footer.tagline}</p>
            </div>
            <div className="text-right">
              <Link
                href="https://kadai.id"
                target="_blank"
                className="inline-flex items-center gap-1.5 text-gray-500 text-sm hover:text-white transition-colors"
              >
                {t.footer.ecosystem}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <p className="text-gray-700 text-xs mt-2">{t.footer.rights}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
