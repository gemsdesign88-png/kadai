'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { LogOut, Building2, Mail, Phone, Calendar } from 'lucide-react';
import { useState } from 'react';

interface DashboardClientProps {
  user: any;
  profile: any;
  restaurants: any[];
}

export default function DashboardClient({ user, profile, restaurants }: DashboardClientProps) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF5A5F]/5 via-white to-[#8B5CF6]/5">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent">
            KadaiPOS Dashboard
          </h1>
          <button
            onClick={handleSignOut}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#FF5A5F] hover:bg-gray-50 rounded-xl transition-all disabled:opacity-50"
          >
            <LogOut className="w-4 h-4" />
            Keluar
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Selamat datang, {profile?.full_name || user.email}! 👋
          </h2>
          <p className="text-gray-600">
            Kelola bisnis Anda dengan mudah menggunakan KadaiPOS
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#FF5A5F]/10 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-[#FF5A5F]" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {restaurants.length}
            </h3>
            <p className="text-sm text-gray-600">Total Bisnis</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#8B5CF6]/10 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-[#8B5CF6]" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-1 truncate">
              {user.email}
            </h3>
            <p className="text-sm text-gray-600">Email Terdaftar</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">
              {new Date(user.created_at).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </h3>
            <p className="text-sm text-gray-600">Bergabung Sejak</p>
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Profil Anda</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Email</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
            {profile?.full_name && (
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Nama Lengkap</p>
                  <p className="text-sm text-gray-600">{profile.full_name}</p>
                </div>
              </div>
            )}
            {profile?.phone && (
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">No. Telepon</p>
                  <p className="text-sm text-gray-600">{profile.phone}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Restaurants Section */}
        {restaurants.length > 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Bisnis Anda</h3>
            <div className="space-y-4">
              {restaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="p-4 border border-gray-200 rounded-xl hover:border-[#FF5A5F] transition-colors"
                >
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {restaurant.name}
                  </h4>
                  {restaurant.address && (
                    <p className="text-sm text-gray-600">{restaurant.address}</p>
                  )}
                  {restaurant.phone && (
                    <p className="text-sm text-gray-500 mt-1">📞 {restaurant.phone}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 border border-gray-100 shadow-sm text-center">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Belum Ada Bisnis
            </h3>
            <p className="text-gray-600 mb-6">
              Tambahkan bisnis pertama Anda untuk mulai menggunakan KadaiPOS
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-[#FF5A5F] to-[#FF5A5F]/90 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all">
              Tambah Bisnis
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
