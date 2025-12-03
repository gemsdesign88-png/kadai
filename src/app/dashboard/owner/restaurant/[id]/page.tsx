'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter, useParams } from 'next/navigation';
import { Building2, Calendar, ArrowLeft, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';

interface Restaurant {
  id: string;
  name: string;
  address: string;
  logo_url: string | null;
  subscription_plan: string;
  subscription_status: string;
  subscription_ends_at: string | null;
  trial_ends_at: string | null;
}

export default function RestaurantSubscriptionPage() {
  const router = useRouter();
  const params = useParams();
  const restaurantId = params.id as string;
  const supabase = createClient();
  const { language } = useLanguage();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);

  const allFeatures = [
    "Sistem manajemen pesanan lengkap",
    "Analitik & laporan penjualan real-time",
    "Manajemen staff & pengguna unlimited",
    "Dukungan multi-outlet",
    "Integrasi sistem display dapur",
    "Manajemen meja & reservasi",
    "Pelacakan inventori & stok",
    "Sistem loyalitas & CRM pelanggan",
    "QR menu & pemesanan online",
    "Dukungan berbagai metode pembayaran",
    "Backup data & keamanan otomatis",
    "Customer support prioritas 24/7"
  ];

  useEffect(() => {
    loadRestaurant();
  }, [restaurantId]);

  const loadRestaurant = async () => {
    try {
      setLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .eq('id', restaurantId)
        .eq('owner_id', user.id)
        .single();

      if (error || !data) {
        router.push('/dashboard/owner');
        return;
      }

      setRestaurant(data);
    } catch (error) {
      console.error('Error loading restaurant:', error);
      router.push('/dashboard/owner');
    } finally {
      setLoading(false);
    }
  };

  const getPlanName = (plan: string) => {
    switch (plan) {
      case 'monthly': return 'Bulanan';
      case 'yearly': return 'Tahunan';
      case 'lifetime': return 'Lifetime';
      default: return 'Trial';
    }
  };

  const getExpiryStatus = () => {
    if (!restaurant) return null;
    
    const expiryDate = restaurant.subscription_ends_at || restaurant.trial_ends_at;
    if (!expiryDate) return null;

    const daysLeft = Math.ceil((new Date(expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    const isExpiringSoon = daysLeft <= 7 && daysLeft >= 0;
    const isExpired = daysLeft < 0;

    return {
      date: new Date(expiryDate).toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }),
      daysLeft,
      isExpiringSoon,
      isExpired
    };
  };

  if (loading || !restaurant) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-48 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-2 gap-6">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const expiryStatus = getExpiryStatus();

  return (
    <div className="p-8">
      {/* Back Button */}
      <button
        onClick={() => router.push('/dashboard/owner')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">{language === 'en' ? 'Back to Owner Profile' : 'Kembali ke Profil Owner'}</span>
      </button>

      {/* Restaurant Info Card */}
      <div className={`bg-white rounded-2xl p-8 shadow-sm mb-8 border-2 ${
        expiryStatus?.isExpired ? 'border-red-300 bg-red-50' : 
        expiryStatus?.isExpiringSoon ? 'border-amber-300 bg-amber-50' : 
        'border-gray-200'
      }`}>
        <div className="flex items-start gap-6">
          {restaurant.logo_url ? (
            <img 
              src={restaurant.logo_url} 
              alt={restaurant.name}
              className="w-24 h-24 rounded-2xl object-cover border-2 border-gray-100"
            />
          ) : (
            <div className="w-24 h-24 bg-gradient-to-br from-[var(--color-accent)] to-[#8B5CF6] rounded-2xl flex items-center justify-center">
              <Building2 className="w-12 h-12 text-white" />
            </div>
          )}
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
            <p className="text-gray-600 mb-4">{restaurant.address || 'Alamat belum diisi'}</p>
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl border-2 border-gray-200">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-semibold text-gray-700">
                  Paket {getPlanName(restaurant.subscription_plan)}
                </span>
              </div>
              
              {expiryStatus && (
                <div className={`inline-flex flex-col px-4 py-2 rounded-xl ${
                  expiryStatus.isExpired ? 'bg-red-100' : 
                  expiryStatus.isExpiringSoon ? 'bg-amber-100' : 
                  'bg-green-100'
                }`}>
                  <span className="text-xs text-gray-600">
                    {expiryStatus.isExpired ? 'Berakhir pada' : 'Aktif hingga'}
                  </span>
                  <span className={`text-sm font-bold ${
                    expiryStatus.isExpired ? 'text-red-700' : 
                    expiryStatus.isExpiringSoon ? 'text-amber-700' : 
                    'text-green-700'
                  }`}>
                    {expiryStatus.date}
                  </span>
                  {!expiryStatus.isExpired && (
                    <span className="text-xs text-gray-600">
                      {expiryStatus.daysLeft} hari lagi
                    </span>
                  )}
                </div>
              )}
            </div>

            {expiryStatus?.isExpired && (
              <div className="mt-4 p-3 bg-red-100 border-2 border-red-300 rounded-xl">
                <p className="text-sm font-semibold text-red-700">
                  ⚠️ Langganan telah berakhir. Pilih paket di bawah untuk melanjutkan.
                </p>
              </div>
            )}

            {expiryStatus?.isExpiringSoon && (
              <div className="mt-4 p-3 bg-amber-100 border-2 border-amber-300 rounded-xl">
                <p className="text-sm font-semibold text-amber-700">
                  ⏰ Langganan akan segera berakhir. Perpanjang sekarang untuk menghindari gangguan layanan.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {expiryStatus?.isExpired ? 'Pilih Paket untuk Melanjutkan' : 'Upgrade atau Perpanjang Langganan'}
          </h2>
          <p className="text-gray-600">Pilih paket yang sesuai dengan kebutuhan bisnis Anda</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-3xl p-12 border-2 border-gray-200 shadow-xl">
            {/* Features Grid - Top Section */}
            <div className="mb-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {language === 'en' ? 'Everything You Need' : 'Semua Yang Anda Butuhkan'}
                </h3>
                <p className="text-gray-600">
                  {language === 'en' ? 'Complete POS solution for modern businesses' : 'Solusi POS lengkap untuk bisnis modern'}
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 max-w-3xl mx-auto">
                {allFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#10B981] to-[#059669] flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <span className="text-base text-gray-700 leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t-2 border-gray-200 mb-10"></div>

            {/* CTA Section - Bottom */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {language === 'en' ? 'Choose Your Billing Period' : 'Pilih Periode Pembayaran'}
              </h3>
              
              {/* Pricing Options */}
              <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
                {/* Monthly Option */}
                <div className="relative p-6 rounded-2xl border-2 border-gray-200 hover:border-[var(--color-accent)] transition-all">
                  <div className="text-left">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-gray-900">
                        {language === 'en' ? 'Monthly' : 'Bulanan'}
                      </span>
                    </div>
                    <div className="mb-2">
                      <div className="text-4xl font-bold bg-gradient-to-r from-[var(--color-accent)] to-[#8B5CF6] bg-clip-text text-transparent">
                        Rp 149.000
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {language === 'en' ? 'per outlet/month' : 'per outlet/bulan'}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      window.open(`https://wa.me/6281339765775?text=Halo, saya ingin ${expiryStatus?.isExpired ? 'mengaktifkan kembali' : 'upgrade ke'} Paket Bulanan untuk restoran ${restaurant.name}`, '_blank');
                    }}
                    className="w-full mt-4 py-3 rounded-xl font-bold bg-gradient-to-r from-[var(--color-accent)] to-[#8B5CF6] text-white hover:shadow-lg transition-all"
                  >
                    {restaurant.subscription_plan === 'monthly' 
                      ? '🔄 Perpanjang Paket Ini' 
                      : expiryStatus?.isExpired 
                      ? '✨ Aktifkan Sekarang'
                      : '⬆️ Pilih Paket Ini'}
                  </button>
                </div>

                {/* Yearly Option */}
                <div className="relative p-6 rounded-2xl border-2 border-[#10B981] bg-gradient-to-br from-[#10B981]/5 to-[#059669]/5 hover:shadow-lg transition-all">
                  {/* Best Value Badge */}
                  <div className="absolute -top-3 right-4 bg-gradient-to-r from-[#10B981] to-[#059669] text-white text-xs font-bold px-3 py-1 rounded-full">
                    {language === 'en' ? 'SAVE 11%' : 'HEMAT 11%'}
                  </div>
                  
                  <div className="text-left">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-gray-900">
                        {language === 'en' ? 'Yearly' : 'Tahunan'}
                      </span>
                    </div>
                    <div className="mb-2">
                      <div className="text-4xl font-bold text-[#10B981]">
                        Rp 1.599.000
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {language === 'en' ? 'per outlet/year · Rp 133.250/month' : 'per outlet/tahun · Rp 133.250/bulan'}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      window.open(`https://wa.me/6281339765775?text=Halo, saya ingin ${expiryStatus?.isExpired ? 'mengaktifkan kembali' : 'upgrade ke'} Paket Tahunan untuk restoran ${restaurant.name}`, '_blank');
                    }}
                    className="w-full mt-4 py-3 rounded-xl font-bold bg-gradient-to-r from-[#10B981] to-[#059669] text-white hover:shadow-lg transition-all"
                  >
                    {restaurant.subscription_plan === 'yearly' 
                      ? '🔄 Perpanjang Paket Ini' 
                      : expiryStatus?.isExpired 
                      ? '✨ Aktifkan Sekarang'
                      : '⬆️ Pilih Paket Ini'}
                  </button>
                  <p className="mt-3 text-sm font-semibold text-green-600 text-center">
                    💰 {language === 'en' ? 'Save Rp 189.000/year' : 'Hemat Rp 189.000/tahun'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">{language === 'en' ? 'Need help or have questions?' : 'Butuh bantuan atau punya pertanyaan?'}</p>
          <button
            onClick={() => window.open('https://wa.me/6281339765775?text=Halo, saya butuh bantuan terkait langganan', '_blank')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {language === 'en' ? 'Contact via WhatsApp' : 'Hubungi via WhatsApp'}
          </button>
        </div>
      </div>
    </div>
  );
}
