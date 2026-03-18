"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { 
  CheckCircle2, 
  ArrowLeft, 
  Building2, 
  Mail, 
  User, 
  Wallet, 
  MapPin, 
  DollarSign, 
  ShieldCheck,
  CreditCard,
  MessageSquare,
  Globe
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1); // 1: Account, 2: Payment
  
  // Data from URL
  const modulesRaw = searchParams.get("modules") || "";
  const workers = searchParams.get("workers") || "100";
  const total = searchParams.get("total") || "0";
  const selectedModules = modulesRaw.split(",").filter(Boolean);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    companyName: "",
    companyDomain: "", // e.g. .proyo.app
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      maximumFractionDigits: 0 
    }).format(price);
  };

  const generateWAMessage = () => {
    const text = `Halo Proyo! Saya baru saja melakukan checkout di website.\n\n` +
      `📌 *Detail Pesanan:*\n` +
      `- Perusahaan: ${formData.companyName}\n` +
      `- Domain: ${formData.companyDomain}.proyo.app\n` +
      `- Nama: ${formData.fullName}\n` +
      `- Email: ${formData.email}\n` +
      `- Modul: ${selectedModules.join(", ")}\n` +
      `- Kapasitas: ${workers} Pekerja\n` +
      `- Total: ${formatPrice(parseInt(total))}/bln\n\n` +
      `Saya akan melakukan transfer ke Rekening BCA 8690868654 (Gemmy Adyendra). Mohon aktivasi akun saya.`;
    
    return `https://wa.me/628121650800?text=${encodeURIComponent(text)}`;
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) setStep(2);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Left Side: Form */}
      <div className="flex-1 p-6 lg:p-12 xl:p-20">
        <Link href="/proyo" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors mb-12 group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Kembali ke Simulasi
        </Link>

        <div className="max-w-xl">
          <div className="mb-10">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-3">Selesaikan Pendaftaran Proyo</h1>
            <p className="text-gray-500 font-medium">Langkah terakhir untuk mengotomatisasi manajemen tim konstruksi Anda.</p>
          </div>

          {/* Progress Steps */}
          <div className="flex gap-4 mb-10">
            {[1, 2].map((i) => (
              <div key={i} className="flex-1 h-1.5 rounded-full relative overflow-hidden bg-gray-200">
                <motion.div 
                  className="absolute inset-0 bg-blue-600"
                  initial={false}
                  animate={{ x: step >= i ? "0%" : "-100%" }}
                />
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.form 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleNextStep}
                className="space-y-6"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        required
                        type="text" 
                        placeholder="Budi Santoso"
                        value={formData.fullName}
                        onChange={e => setFormData({...formData, fullName: e.target.value})}
                        className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none font-medium text-black"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Bisnis</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        required
                        type="email" 
                        placeholder="budi@perusahaan.com"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none font-medium text-black"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Password Akun</label>
                    <div className="relative">
                      <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        required
                        type="password" 
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={e => setFormData({...formData, password: e.target.value})}
                        className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none font-medium text-black"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nomor WhatsApp</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        required
                        type="tel" 
                        placeholder="0812..."
                        value={formData.phoneNumber}
                        onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
                        className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none font-medium text-black"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Perusahaan</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      required
                      type="text" 
                      placeholder="PT Konstruksi Maju Jaya"
                      value={formData.companyName}
                      onChange={e => setFormData({...formData, companyName: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none font-medium text-black"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Subdomain Aplikasi</label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        required
                        type="text" 
                        placeholder="nama-perusahaan"
                        value={formData.companyDomain}
                        onChange={e => setFormData({...formData, companyDomain: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                        className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none font-medium"
                      />
                    </div>
                    <span className="text-gray-400 font-bold">.proyo.app</span>
                  </div>
                  <p className="text-[10px] text-gray-400 ml-1 italic">*Ini akan digunakan tim Anda untuk login di mobile & web app.</p>
                </div>

                <button 
                  type="submit"
                  className="w-full py-5 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-gray-900 transition-all active:scale-[0.98]"
                >
                  Pilih Metode Pembayaran
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="bg-white border-2 border-blue-600 rounded-[32px] p-6 shadow-xl shadow-blue-500/10">
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
                      <Wallet className="w-6 h-6" />
                    </div>
                    <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">Rekomendasi</span>
                  </div>
                  
                  <h3 className="text-xl font-black text-gray-900 mb-2">Transfer Bank (Manual)</h3>
                  <p className="text-sm text-gray-500 font-medium mb-8">Verifikasi cepat oleh admin kami setelah bukti transfer dikirim.</p>
                  
                  <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Bank Tujuan</p>
                      <p className="text-lg font-black text-gray-900">BCA (Bank Central Asia)</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Nomor Rekening</p>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-black text-blue-600 tracking-wider">8690868654</p>
                        <button onClick={() => navigator.clipboard.writeText("8690868654")} className="text-[10px] font-black text-blue-600 uppercase hover:underline">Salin</button>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Nama Pemilik</p>
                      <p className="text-sm font-black text-gray-900">GEMMY ADYENDRA</p>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <p className="text-[11px] font-bold text-emerald-700 leading-tight">Data Anda aman. Pembayaran diproses secara manual untuk keamanan transaksi.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setStep(1)}
                    className="py-5 border border-gray-200 text-gray-600 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-50 transition-all"
                  >
                    Edit Data
                  </button>
                  <button 
                    onClick={() => window.open(generateWAMessage(), '_blank')}
                    className="py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Konfirmasi WhatsApp
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Side: Order Summary */}
      <div className="w-full lg:w-[400px] xl:w-[480px] bg-white border-l border-gray-100 p-6 lg:p-12">
        <div className="sticky top-12">
          <h2 className="text-xl font-black text-gray-900 mb-8 tracking-tight">Ringkasan Pesanan</h2>
          
          <div className="space-y-6">
            <div className="space-y-4">
              {selectedModules.map(mId => (
                <div key={mId} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-blue-600 border border-gray-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      {mId === 'attendance' ? <MapPin className="w-4 h-4" /> : mId === 'payroll' ? <Wallet className="w-4 h-4" /> : <DollarSign className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-gray-900 capitalize">{mId.replace(/_/g, ' ')}</p>
                      {mId === 'attendance' && <p className="text-[10px] font-bold text-gray-400">{workers} Pekerja</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-px bg-gray-100 my-8" />

            <div className="bg-gray-50 rounded-[32px] p-8 space-y-4">
              <div className="flex justify-between items-center text-gray-500 font-bold text-xs uppercase tracking-widest">
                <span>Tagihan Bulanan</span>
                <span>{formatPrice(parseInt(total))}</span>
              </div>
              <div className="flex justify-between items-center text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                <span>Biaya Setup Domain</span>
                <span className="text-emerald-500">Gratis</span>
              </div>
              
              <div className="pt-4 mt-4 border-t border-gray-200 flex flex-col gap-1">
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Total Investasi</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-gray-900 tracking-tighter">{formatPrice(parseInt(total))}</span>
                  <span className="text-gray-400 font-bold text-xs">/bln</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 opacity-60">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <p className="text-[11px] font-medium text-gray-500">Akses penuh ke semua platform (Web, iOS, Android)</p>
              </div>
              <div className="flex items-center gap-3 opacity-60">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <p className="text-[11px] font-medium text-gray-500">Bantuan implementasi & training tim</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
