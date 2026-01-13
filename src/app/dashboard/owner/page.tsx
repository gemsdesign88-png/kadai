'use client';

import { useEffect, useState, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Building2, Calendar, CreditCard, MapPin, Phone, Mail, Edit, Plus, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';
import { createDashboardTranslator } from '@/lib/i18n/dashboard-translator';

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

interface UserProfile {
  full_name: string;
  phone: string;
  address: string;
  email: string;
}

export default function OwnerPage() {
  const router = useRouter();
  const supabase = createClient();
  const { language } = useLanguage();
  const { t: dt } = useMemo(() => createDashboardTranslator(language), [language]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      // Load profile
      const { data: profileData } = await supabase
        .from('user_profiles')
        .select('full_name, phone, address')
        .eq('user_id', user.id)
        .single();

      setProfile({
        full_name: profileData?.full_name || '',
        phone: profileData?.phone || '',
        address: profileData?.address || '',
        email: user.email || ''
      });

      // Load restaurants
      const { data: restaurantsData } = await supabase
        .from('restaurants')
        .select('*')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false });

      setRestaurants(restaurantsData || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case 'monthly': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'yearly': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'lifetime': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getPlanName = (plan: string) => {
    switch (plan) {
      case 'monthly': return dt('monthly');
      case 'yearly': return dt('yearly');
      case 'lifetime': return dt('lifetime');
      default: return dt('trial');
    }
  };

  const getExpiryStatus = (restaurant: Restaurant) => {
    const expiryDate = restaurant.subscription_ends_at || restaurant.trial_ends_at;
    if (!expiryDate) return null;

    const daysLeft = Math.ceil((new Date(expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    const isExpiringSoon = daysLeft <= 7 && daysLeft >= 0;
    const isExpired = daysLeft < 0;

    return {
      date: new Date(expiryDate).toLocaleDateString(dt.locale, { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }),
      daysLeft,
      isExpiringSoon,
      isExpired
    };
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-3 gap-6">
            <div className="h-48 bg-gray-200 rounded"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          {dt('ownerProfile')}
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          {dt('manageAccount')}
        </p>
      </div>

      {/* Owner Profile Card */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-sm mb-8 overflow-hidden">
        <div className="bg-gradient-to-br from-[var(--color-accent)] to-[#8B5CF6] h-32"></div>
        <div className="px-8 pb-8">
          <div className="flex items-start justify-between -mt-16 mb-6">
            <div className="w-32 h-32 bg-gradient-to-br from-[var(--color-accent)] to-[#8B5CF6] rounded-2xl flex items-center justify-center text-white text-5xl font-bold border-4 border-white shadow-lg">
              {profile?.full_name.charAt(0).toUpperCase() || profile?.email.charAt(0).toUpperCase()}
            </div>
            <button
              onClick={() => router.push('/dashboard/profile')}
              className="mt-16 px-6 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              {dt('editProfile')}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{profile?.full_name || 'Owner'}</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  <span>{profile?.email}</span>
                </div>
                {profile?.phone && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="w-5 h-5 flex-shrink-0" />
                    <span>{profile.phone}</span>
                  </div>
                )}
                {profile?.address && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-5 h-5 flex-shrink-0" />
                    <span>{profile.address}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">{dt('accountSummary')}</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{dt('totalRestaurants')}</span>
                  <span className="font-bold text-2xl text-[var(--color-accent)]">{restaurants.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{dt('active')}</span>
                  <span className="font-bold text-lg text-green-600">
                    {restaurants.filter(r => {
                      const status = getExpiryStatus(r);
                      return !status?.isExpired;
                    }).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{dt('needsRenewal')}</span>
                  <span className="font-bold text-lg text-amber-600">
                    {restaurants.filter(r => {
                      const status = getExpiryStatus(r);
                      return status?.isExpiringSoon;
                    }).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurants Section */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{dt('yourRestaurants')}</h2>
          <p className="text-gray-600">{dt('manageRestaurantsDesc')}</p>
        </div>
        <button
          onClick={() => router.push('/onboarding')}
          className="px-6 py-2.5 bg-[var(--color-accent)] text-white rounded-xl font-semibold hover:bg-[var(--color-accent-hover)] transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {dt('addRestaurant')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => {
          const expiryStatus = getExpiryStatus(restaurant);
          
          return (
            <div 
              key={restaurant.id}
              className={`bg-white rounded-2xl p-6 shadow-sm border-2 transition-all hover:shadow-lg ${
                expiryStatus?.isExpired ? 'border-red-300 bg-red-50' : 
                expiryStatus?.isExpiringSoon ? 'border-amber-300 bg-amber-50' : 
                'border-gray-200'
              }`}
            >
              {/* Restaurant Header */}
              <div className="flex items-start gap-4 mb-4">
                {restaurant.logo_url ? (
                  <img 
                    src={restaurant.logo_url} 
                    alt={restaurant.name}
                    className="w-16 h-16 rounded-xl object-cover border-2 border-gray-100"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-accent)] to-[#8B5CF6] rounded-xl flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 mb-1 truncate">{restaurant.name}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{restaurant.address || dt('addressNotSet')}</p>
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${getPlanBadgeColor(restaurant.subscription_plan)}`}>
                    <Calendar className="w-3 h-3" />
                    <span className="text-xs font-semibold">{getPlanName(restaurant.subscription_plan)}</span>
                  </div>
                </div>
              </div>

              {/* Expiry Status */}
              {expiryStatus && (
                <div className={`mb-4 p-3 rounded-xl ${
                  expiryStatus.isExpired ? 'bg-red-100' : 
                  expiryStatus.isExpiringSoon ? 'bg-amber-100' : 
                  'bg-gray-50'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">
                      {expiryStatus.isExpired ? dt('expiredOn') : dt('activeUntil')}
                    </span>
                    <span className={`text-xs font-bold ${
                      expiryStatus.isExpired ? 'text-red-700' : 
                      expiryStatus.isExpiringSoon ? 'text-amber-700' : 
                      'text-gray-900'
                    }`}>
                      {expiryStatus.date}
                    </span>
                  </div>
                  {!expiryStatus.isExpired && (
                    <div className="text-xs text-gray-600">
                      {expiryStatus.daysLeft} {dt('daysLeft')}
                    </div>
                  )}
                  {expiryStatus.isExpired && (
                    <div className="text-xs font-semibold text-red-700 mt-1">
                      ⚠️ {dt('subscriptionExpired')}
                    </div>
                  )}
                </div>
              )}

              {/* Action Button */}
              <button
                onClick={() => router.push(`/dashboard/owner/restaurant/${restaurant.id}`)}
                className={`w-full px-4 py-2.5 rounded-xl font-semibold transition-colors flex items-center gap-2 ${
                  expiryStatus?.isExpired 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : expiryStatus?.isExpiringSoon
                    ? 'bg-amber-600 text-white hover:bg-amber-700'
                    : 'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span className="flex-1 text-center">{dt('manageSubscription')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {restaurants.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">{dt('noRestaurantsYet')}</h3>
          <p className="text-gray-600 mb-6">{dt('startByAddingRestaurant')}</p>
          <button
            onClick={() => router.push('/onboarding')}
            className="px-6 py-2.5 bg-[var(--color-accent)] text-white rounded-xl font-semibold hover:bg-[var(--color-accent-hover)] transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            {dt('addRestaurant')}
          </button>
        </div>
      )}
    </div>
  );
}
