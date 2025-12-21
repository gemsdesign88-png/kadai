'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/context';
import { createClient } from '@/lib/supabase/client';

interface PlanSelectorProps {
  businessType: 'toko' | 'resto';
  category: string | null;
  businessName: string;
  onSelect: (planId: string) => void;
  selected: string | null;
  isLoading?: boolean;
}

interface BasePlan {
  id: string;
  name: string;
  billing: 'monthly' | 'yearly';
  price: number;
  priceDisplay: string;
  period: string;
  description: string;
  features: string[];
  recommended: boolean;
  discount?: string;
  revenueGuide?: string;
  note?: string;
}

// Category icon mapping
const categoryIcons: { [key: string]: string } = {
  // Lite categories
  warung: '🍜',
  kios: '🏪',
  retail: '🛍️',
  fashion: '👕',
  salon: '💇',
  other_lite: '✨',
  // Resto categories
  cafe: '☕',
  restaurant: '🍽️',
  fine_dining: '⭐',
  catering: '🏢',
  bakery: '🥐',
  food_court: '🍱',
  other_resto: '✨',
};

// Helper function to get category icon
const getCategoryIcon = (categoryId: string | null): string => {
  if (!categoryId) return '✨';
  return categoryIcons[categoryId] || '✨';
};

export default function PlanSelector({ businessType, category, businessName, onSelect, selected, isLoading }: PlanSelectorProps) {
  const { language, t } = useLanguage();
  const supabase = createClient();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [plans, setPlans] = useState<{ toko: BasePlan[]; resto: BasePlan[] }>({ toko: [], resto: [] });
  const [isLoadingPlans, setIsLoadingPlans] = useState(true);

  // Fetch pricing plans from Supabase
  useEffect(() => {
    async function fetchPlans() {
      setIsLoadingPlans(true);
      try {
        const { data, error } = await supabase
          .from('subscription_plans')
          .select('*')
          .eq('is_active', true)
          .order('sort_order');

        if (error) {
          console.error('Error fetching subscription plans:', error);
          return;
        }

        if (data) {
          console.log('[PlanSelector] Raw plans data:', data);
          
          // Transform database format to component format
          const transformedPlans: { toko: BasePlan[]; resto: BasePlan[] } = {
            toko: [],
            resto: [],
          };

          data.forEach((plan: any) => {
            // Determine billing cycle from period or duration_months field
            // Check for 'monthly', 'month', or duration_months === 1 for monthly plans
            const billing = 
              plan.period === 'monthly' || 
              plan.period === 'month' || 
              plan.duration_months === 1 
                ? 'monthly' 
                : 'yearly';
            
            console.log(`[PlanSelector] Plan ${plan.id}: period="${plan.period}", duration_months="${plan.duration_months}", billing="${billing}"`);
            
            // Determine business type from plan_tier
            const businessType = plan.plan_tier === 'lite' ? 'toko' : 'resto';
            
            // Build revenue guide text
            let revenueGuide = '';
            if (plan.monthly_revenue_min !== null && plan.monthly_revenue_max !== null) {
              revenueGuide = `Rp${(plan.monthly_revenue_min / 1000000).toFixed(0)}M - ${(plan.monthly_revenue_max / 1000000).toFixed(0)}M/month`;
            } else if (plan.monthly_revenue_max !== null) {
              revenueGuide = `s/d Rp${(plan.monthly_revenue_max / 1000000).toFixed(0)}M/month`;
            } else if (plan.monthly_revenue_min !== null) {
              revenueGuide = `> Rp${(plan.monthly_revenue_min / 1000000).toFixed(0)}M/month`;
            } else {
              revenueGuide = 'Skala usaha kecil';
            }
            
            const transformedPlan: BasePlan = {
              id: plan.id,
              name: plan.name,
              billing: billing,
              price: plan.price_idr,
              priceDisplay: plan.price_display,
              period: plan.period === 'month' ? '/month' : '/year',
              description: language === 'id' ? plan.suitable_for_id : plan.suitable_for_en || plan.suitable_for_id || '',
              features: [], // Features are shown separately for resto plans
              recommended: !!plan.badge, // Has badge = recommended
              discount: plan.badge || undefined,
              revenueGuide: revenueGuide,
            };

            if (businessType === 'toko') {
              // Add toko features
              transformedPlan.features = [
                'Unlimited orders',
                'Basic inventory',
                'Cash register mode',
                'Receipt printing',
                'Basic reports',
              ];
              transformedPlans.toko.push(transformedPlan);
            } else if (businessType === 'resto') {
              transformedPlans.resto.push(transformedPlan);
            }
          });

          setPlans(transformedPlans);
        }
      } catch (err) {
        console.error('Unexpected error fetching subscription plans:', err);
      } finally {
        setIsLoadingPlans(false);
      }
    }

    fetchPlans();
  }, [supabase]);

  const availablePlans = plans[businessType]?.filter(
    (plan) => plan.billing === billingCycle
  ) || [];
  
  console.log(`[PlanSelector] Filtering: businessType="${businessType}", billingCycle="${billingCycle}"`);
  console.log('[PlanSelector] Available plans:', availablePlans);
  console.log('[PlanSelector] All plans:', plans);

  // General features for Resto (shown once at top)
  const restoFeatures = [
    t.register.plan.feature1,
    t.register.plan.feature2,
    t.register.plan.feature3,
    t.register.plan.feature4,
    t.register.plan.feature5,
    t.register.plan.feature6,
    t.register.plan.feature7,
    t.register.plan.feature8,
    t.register.plan.feature9,
    t.register.plan.feature10,
    t.register.plan.feature11,
    t.register.plan.feature12,
  ];

  return (
    <div className="p-8 sm:p-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Loading State */}
        {isLoadingPlans ? (
          <div className="flex flex-col items-center justify-center py-20">
            <svg className="animate-spin h-12 w-12 text-[#FF5A5F] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-600 font-medium">Loading subscription plans...</p>
          </div>
        ) : (
        <>
        {/* Selected Info Summary - Enhanced Cards */}
        <div className="mb-10 grid md:grid-cols-3 gap-4">
          {/* Business Name Card */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 text-xl">
                🏢
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Business Name</p>
                <p className="text-base font-bold text-gray-900 truncate">{businessName}</p>
              </div>
            </div>
          </div>

          {/* Business Type Card */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-xl ${
                businessType === 'toko'
                  ? 'bg-gradient-to-r from-green-500 to-green-600'
                  : 'bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6]'
              }`}>
                {businessType === 'toko' ? '🏪' : '🍽️'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Business Type</p>
                <p className="text-base font-bold text-gray-900 capitalize">{businessType}</p>
              </div>
            </div>
          </div>

          {/* Category Card */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF5A5F] to-[#8B5CF6] flex items-center justify-center flex-shrink-0 text-xl">
                {getCategoryIcon(category)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Category</p>
                <p className="text-base font-bold text-gray-900 truncate">{category || 'Not specified'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            {t.register.plan.title}
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            {t.register.plan.subtitle}
          </p>
        </div>

        {/* Resto: Show Features First */}
        {businessType === 'resto' && (
          <div className="mb-12 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                {t.register.plan.allPlansIncludeTitle}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {restoFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <svg
                      className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Billing Toggle */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center p-1 bg-gray-100 rounded-full">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] text-white shadow-lg shadow-[#FF5A5F]/30'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t.register.plan.monthly}
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] text-white shadow-lg shadow-[#FF5A5F]/30'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t.register.plan.yearly}
              <span className="ml-1.5 text-xs font-semibold">{businessType === 'toko' ? t.register.plan.save : '~10% off'}</span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className={`grid gap-6 ${businessType === 'toko' ? 'md:grid-cols-2 max-w-4xl mx-auto' : 'md:grid-cols-3'}`}>
          {availablePlans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => onSelect(plan.id)}
              className={`group relative p-8 rounded-2xl border-2 transition-all duration-300 text-left hover:shadow-xl hover:-translate-y-1 ${
                selected === plan.id
                  ? 'border-[#FF5A5F] bg-gradient-to-br from-red-50 to-purple-50 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              {/* Selected Indicator */}
              {selected === plan.id && (
                <div className="absolute top-8 right-8 w-8 h-8 rounded-full bg-gradient-to-br from-[#FF5A5F] to-[#8B5CF6] flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}

              <div className="relative">
                {/* Plan Header */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                {plan.revenueGuide && (
                  <p className="text-lg text-[#FF5A5F] font-semibold mb-4">
                    {plan.revenueGuide}
                  </p>
                )}

                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-bold bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent">
                      {plan.priceDisplay}
                    </span>
                    <span className="text-gray-500 text-sm">{plan.period}</span>
                  </div>
                  {plan.discount && (
                    <p className="text-sm text-green-600 font-medium mt-1">
                      {plan.discount}
                    </p>
                  )}
                  {plan.note && businessType === 'resto' && (
                    <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-xs text-blue-700 font-medium">
                        {plan.note}
                      </p>
                    </div>
                  )}
                </div>

                {/* Features - Only for Toko */}
                {businessType === 'toko' && (
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => {
                      return (
                        <li key={idx} className="flex items-start space-x-2">
                          <svg
                            className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {/* CTA */}
                <div className={`pt-6 border-t transition-colors ${
                  selected === plan.id ? 'border-[#FF5A5F]/30' : 'border-gray-200'
                }`}>
                  <p className="text-center text-xs text-gray-600 mb-3">
                    {t.register.plan.trialIncluded}
                  </p>
                  <div className={`w-full py-3 px-4 rounded-full font-medium transition-all text-center ${
                    selected === plan.id
                      ? 'bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] text-white shadow-lg shadow-[#FF5A5F]/30'
                      : 'bg-gray-100 text-gray-700 group-hover:bg-gray-200'
                  }`}>
                    {selected === plan.id ? t.register.plan.selected : t.register.plan.selectPlan}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-10 text-center space-y-3">
          {businessType === 'resto' && (
            <div className="max-w-2xl mx-auto mb-4 p-4 bg-gray-50 border border-gray-200 rounded-xl">
              <p className="text-sm text-gray-700 font-medium">
                📊 {t.register.plan.monitoringNote}
              </p>
            </div>
          )}
          <p className="text-sm text-gray-600">
            {t.register.plan.allPlansInclude}
          </p>
          <p className="text-xs text-gray-500">
            {t.register.plan.canChange}
          </p>
        </div>
        </>
        )}
      </div>
    </div>
  );
}
