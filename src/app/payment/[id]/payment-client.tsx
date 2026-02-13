'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Copy } from 'lucide-react';

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string;
  business_type: string;
  metadata?: {
    payment_code?: number;
    resto_type?: string;
  };
}

interface PaymentClientProps {
  submission: Submission;
}

const formatIdr = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

const PLAN_PRICES = {
  toko: 299000,
  resto: 399000,
  pro: 499000,
};

export default function PaymentClient({ submission }: PaymentClientProps) {
  const [copied, setCopied] = useState(false);
  
  // Try to open app first, fallback to web app
  useEffect(() => {
    const deepLink = `kadai://payment/${submission.id}`;
    
    // Try to open app
    window.location.href = deepLink;
    
    // Fallback: if app not installed, redirect to web app after 2 seconds
    const fallbackTimer = setTimeout(() => {
      window.location.href = `https://app.kadai.id/payment/${submission.id}`;
    }, 2000);
    
    // Clean up timer if component unmounts
    return () => clearTimeout(fallbackTimer);
  }, [submission.id]);
  
  const businessType = submission.business_type?.toLowerCase() as keyof typeof PLAN_PRICES;
  const paymentCode = submission.metadata?.payment_code || 0;
  const subtotal = PLAN_PRICES[businessType] || 0;
  const totalAmount = subtotal + paymentCode;

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPlanName = () => {
    if (businessType === 'resto') {
      const restoType = submission.metadata?.resto_type;
      if (restoType === 'simple') return 'Resto Simple';
      if (restoType === 'full') return 'Resto Full';
      return 'Resto';
    }
    return businessType.charAt(0).toUpperCase() + businessType.slice(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Detail Pembayaran
          </h1>
          <p className="text-gray-600">
            Selesaikan pembayaran untuk aktivasi akun Kadai Anda
          </p>
        </div>

        {/* Payment Summary Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Ringkasan Pembayaran
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Paket {getPlanName()}</span>
                <span className="font-medium">{formatIdr(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-purple-600">
                <span>Kode Unik Verifikasi</span>
                <span className="font-mono font-bold">+{paymentCode}</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Total Bayar</span>
            <span className="text-2xl font-bold text-purple-600">
              {formatIdr(totalAmount)}
            </span>
          </div>
        </div>

        {/* Bank Details Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Informasi Transfer
          </h3>
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-sm text-gray-600 mb-1">Bank</div>
              <div className="font-semibold text-gray-900">BCA</div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-sm text-gray-600 mb-1">Nomor Rekening</div>
              <div className="flex items-center justify-between">
                <div className="font-mono text-lg font-bold text-gray-900">
                  8690868653
                </div>
                <button
                  onClick={() => copyToClipboard('8690868653')}
                  className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                  title="Copy nomor rekening"
                >
                  {copied ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-600" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-sm text-gray-600 mb-1">Atas Nama</div>
              <div className="font-semibold text-gray-900">Gemmy Adyendra</div>
            </div>
          </div>
        </div>

        {/* Instructions Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Cara Pembayaran
          </h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">
                  Transfer dengan Jumlah Tepat
                </div>
                <div className="text-gray-600 text-sm">
                  Transfer sebesar <span className="font-bold text-purple-600">{formatIdr(totalAmount)}</span> ke rekening BCA di atas
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">
                  Kode Unik untuk Verifikasi
                </div>
                <div className="text-gray-600 text-sm">
                  Kode unik <span className="font-mono font-bold text-purple-600">+{paymentCode}</span> membantu kami memverifikasi pembayaran Anda dengan cepat
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">
                  Konfirmasi via WhatsApp
                </div>
                <div className="text-gray-600 text-sm mb-3">
                  Kirim bukti transfer ke WhatsApp kami untuk aktivasi segera
                </div>
                <a
                  href={`https://wa.me/6282145454828?text=Halo, saya ${submission.name} sudah transfer untuk paket ${getPlanName()} sebesar ${formatIdr(totalAmount)} (kode: ${paymentCode})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Hubungi via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Info Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Setelah pembayaran dikonfirmasi, akun Anda akan diaktivasi dalam 1-24 jam
          </p>
        </div>
      </div>
    </div>
  );
}
