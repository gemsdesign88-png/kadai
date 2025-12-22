import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function AuthCodeError() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF5A5F]/5 via-white to-[#8B5CF6]/5 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Verifikasi Gagal
          </h1>
          
          <p className="text-gray-600 mb-8">
            Link verifikasi tidak valid atau sudah kedaluwarsa. Silakan minta link verifikasi baru atau hubungi support jika masalah berlanjut.
          </p>
          
          <div className="space-y-3">
            <Link
              href="/login"
              className="block w-full bg-gradient-to-r from-[#FF5A5F] to-[#FF5A5F]/90 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Kembali ke Login
            </Link>
            
            <Link
              href="/contact"
              className="block w-full text-gray-600 hover:text-gray-900 py-3 rounded-xl font-medium transition-all"
            >
              Hubungi Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
