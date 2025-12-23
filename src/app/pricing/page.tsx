"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Zap, Shield, Users, Store, ChefHat, TrendingUp, Info } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { createClient } from "@/lib/supabase/client";
import { Container } from "@/components/ui/container";

interface PricingPlan {
  id: string;
  name: string;
  plan_tier: string;
  price_idr: number;
  price_display: string;
  period: string;
  duration_months: number;
  badge: string | null;
  suitable_for_id: string;
  suitable_for_en: string;
  monthly_revenue_min: number | null;
  monthly_revenue_max: number | null;
}

interface PackageData {
  type: 'toko' | 'resto';
  icon: React.ReactNode;
  name: string;
  tagline: string;
  monthlyPrice: number;
  yearlyPrice: number;
  monthlyPriceDisplay: string;
  yearlyPriceDisplay: string;
  suitableFor: string;
  features: string[];
  recommended?: boolean;
  badge?: string;
  isRevenueBased?: boolean;
  revenueNote?: string;
  revenueNoteMonthly?: string;
  revenueNoteYearly?: string;
  tiers?: Array<{
    name: string;
    price: string;
    revenue: string;
  }>;
}

export default function PricingPage() {
  const { t, language } = useLanguage();
  const supabase = createClient();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const allFeatures = t.pricing.features;
  const pricing = t.pricing.pricing;
  const faqs = t.pricing.faqs;

  // Fetch pricing plans from Supabase and transform into 2 packages
  useEffect(() => {
    async function fetchPlans() {
      setIsLoading(true);
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
          // Group plans by type
          const tokoPlans = data.filter((p: any) => p.plan_tier === 'lite');
          const restoPlans = data.filter((p: any) => 
            p.id.includes('promo') || p.id.includes('starter') || 
            p.id.includes('growth') || p.id.includes('pro')
          );

          const packagesData: PackageData[] = [];

          // Toko Package
          if (tokoPlans.length > 0) {
            const monthlyToko = tokoPlans.find((p: any) => p.period === 'monthly' || p.duration_months === 1);
            const yearlyToko = tokoPlans.find((p: any) => p.period === 'yearly' || p.duration_months === 12);

            packagesData.push({
              type: 'toko',
              icon: <Store className="w-12 h-12 text-blue-600" />,
              name: 'Kadai Toko',
              tagline: t.pricing.tokoTagline,
              monthlyPrice: monthlyToko?.price_idr || 49000,
              yearlyPrice: yearlyToko?.price_idr || 529000,
              monthlyPriceDisplay: monthlyToko?.price_display || 'Rp49K',
              yearlyPriceDisplay: yearlyToko?.price_display || 'Rp529K',
              suitableFor: t.pricing.tokoSuitable,
              features: [...t.pricing.tokoFeatures],
              recommended: false,
            });
          }

          // Resto Package (revenue-based)
          if (restoPlans.length > 0) {
            // Group resto plans by billing period
            const monthlyRestoPlans = restoPlans.filter((p: any) => p.period === 'monthly' || p.duration_months === 1);
            const yearlyRestoPlans = restoPlans.filter((p: any) => p.period === 'yearly' || p.duration_months === 12);

            // Get the lowest promo price for display
            const promoMonthly = monthlyRestoPlans.find((p: any) => p.id.includes('promo'));
            const promoYearly = yearlyRestoPlans.find((p: any) => p.id.includes('promo'));
            
            // Build revenue tiers info (using monthly plans)
            const tiers = monthlyRestoPlans.map((plan: any) => {
              let tierName = 'Promo';
              if (plan.id.includes('promo')) tierName = 'Promo';
              else if (plan.id.includes('starter')) tierName = 'Starter';
              else if (plan.id.includes('growth')) tierName = 'Growth';
              else if (plan.id.includes('pro')) tierName = 'Pro';

              let revenueRange = language === 'id' ? 'Skala kecil' : language === 'zh' ? '小规模' : 'Small scale';
              if (plan.monthly_revenue_min !== null && plan.monthly_revenue_max !== null) {
                const unit = language === 'id' ? '/bulan' : language === 'zh' ? '/月' : '/month';
                revenueRange = `Rp${(plan.monthly_revenue_min / 1000000).toFixed(0)}M - ${(plan.monthly_revenue_max / 1000000).toFixed(0)}M${unit}`;
              } else if (plan.monthly_revenue_max !== null) {
                const prefix = language === 'id' ? 'Hingga' : language === 'zh' ? '最多' : 'Up to';
                const unit = language === 'id' ? '/bulan' : language === 'zh' ? '/月' : '/month';
                revenueRange = `${prefix} Rp${(plan.monthly_revenue_max / 1000000).toFixed(0)}M${unit}`;
              } else if (plan.monthly_revenue_min !== null) {
                const prefix = language === 'id' ? 'Di atas' : language === 'zh' ? '超过' : 'Above';
                const unit = language === 'id' ? '/bulan' : language === 'zh' ? '/月' : '/month';
                revenueRange = `${prefix} Rp${(plan.monthly_revenue_min / 1000000).toFixed(0)}M${unit}`;
              }

              return {
                name: tierName,
                price: plan.price_display,
                revenue: revenueRange,
              };
            });

            packagesData.push({
              type: 'resto',
              icon: <ChefHat className="w-12 h-12 text-purple-600" />,
              name: 'Kadai Resto',
              tagline: t.pricing.restoTagline,
              monthlyPrice: 149000,
              yearlyPrice: 1599000,
              monthlyPriceDisplay: language === 'id' ? 'Rp149K - 499K' : language === 'zh' ? 'Rp149K - 499K' : 'Rp149K - 499K',
              yearlyPriceDisplay: language === 'id' ? 'Rp1.599K - 5.388K' : language === 'zh' ? 'Rp1.599K - 5.388K' : 'Rp1.599K - 5.388K',
              suitableFor: t.pricing.restoSuitable,
              features: [...t.pricing.restoFeatures],
              recommended: true,
              badge: promoMonthly?.badge || t.pricing.badge2,
              isRevenueBased: true,
              revenueNote: t.pricing.restoNote2,
              revenueNoteMonthly: t.pricing.restoNoteMonthly,
              revenueNoteYearly: t.pricing.restoNoteYearly,
              tiers,
            });
          }

          setPackages(packagesData);
        }
      } catch (err) {
        console.error('Unexpected error fetching subscription plans:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPlans();
  }, [supabase, language]);

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background blobs - Airbnb style */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-6">
              {t.pricing.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-10">
              {t.pricing.heroTitle}{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t.pricing.heroTitleHighlight}
              </span>
            </h1>
            
            <div className="max-w-5xl mx-auto space-y-6">
              {/* Two Pricing Cards Side by Side */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Kadai Toko Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="group relative"
                >
                  <div className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-3xl p-8 border-2 border-blue-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300">
                    {/* Icon Badge */}
                    <div className="absolute -top-4 left-8 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Store className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="pt-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {t.pricing.heroToko}
                      </h3>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                          {t.pricing.tokoPrice.split('/')[0]}
                        </span>
                        <span className="text-lg text-gray-600 font-semibold">
                          /{t.pricing.tokoPrice.split('/')[1]}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {t.pricing.tokoSuitable}
                      </p>
                    </div>
                    
                    {/* Decorative gradient */}
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-100 to-transparent rounded-br-3xl opacity-50" />
                  </div>
                </motion.div>

                {/* Kadai Resto Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="group relative"
                >
                  <div className="relative bg-gradient-to-br from-purple-50 via-white to-pink-50 rounded-3xl p-8 border-2 border-purple-300 hover:border-purple-500 hover:shadow-2xl transition-all duration-300">
                    {/* Popular Badge */}
                    <div className="absolute -top-3 -right-3 px-4 py-1.5 bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] rounded-full shadow-lg animate-pulse">
                      <span className="text-xs font-bold text-white">⭐ {t.pricing.badge2}</span>
                    </div>
                    
                    {/* Icon Badge */}
                    <div className="absolute -top-4 left-8 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <ChefHat className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="pt-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {t.pricing.heroResto}
                      </h3>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-lg text-gray-600 font-medium">
                          {t.pricing.restoPrice.split('Rp')[0]}
                        </span>
                        <span className="text-4xl font-black bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent">
                          Rp {t.pricing.restoPrice.split('Rp')[1]?.split('/')[0]}
                        </span>
                        <span className="text-lg text-gray-600 font-semibold">
                          /{t.pricing.restoPrice.split('/')[1]}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {t.pricing.restoSuitable}
                      </p>
                    </div>
                    
                    {/* Decorative gradient */}
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-100 to-transparent rounded-br-3xl opacity-50" />
                  </div>
                </motion.div>
              </div>

              {/* Info Note */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 rounded-2xl p-6 border border-purple-200"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-base text-gray-700 leading-relaxed font-medium">
                    {t.pricing.restoNote}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Package Selector - Primary Choice */}
      <section className="py-20 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {t.pricing.comparePackages}
              </h2>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                <span className="text-sm font-semibold text-gray-700">
                  {t.pricing.fixedPrice}
                </span>
                <span className="text-gray-400">vs</span>
                <span className="text-sm font-semibold text-gray-700">
                  {t.pricing.flexiblePrice}
                </span>
              </div>
            </div>

            {/* Billing Toggle */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center p-1.5 bg-white rounded-full border-2 border-gray-200 shadow-sm">
                <button
                  onClick={() => setBillingPeriod('monthly')}
                  className={`px-8 py-3 rounded-full text-base font-bold transition-all duration-300 ${
                    billingPeriod === 'monthly'
                      ? 'bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t.pricing.monthly}
                </button>
                <button
                  onClick={() => setBillingPeriod('yearly')}
                  className={`px-8 py-3 rounded-full text-base font-bold transition-all duration-300 relative ${
                    billingPeriod === 'yearly'
                      ? 'bg-gradient-to-r from-[#10B981] to-[#059669] text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t.pricing.yearly}
                  {billingPeriod !== 'yearly' && (
                    <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full">
                      {t.pricing.save11Percent}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF5A5F]"></div>
              </div>
            ) : (
              <>
                {/* 2 Main Packages Grid */}
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
                  {packages.map((pkg, index) => {
                    const price = billingPeriod === 'yearly' ? pkg.yearlyPrice : pkg.monthlyPrice;
                    const priceDisplay = billingPeriod === 'yearly' ? pkg.yearlyPriceDisplay : pkg.monthlyPriceDisplay;
                    const periodLabel = billingPeriod === 'yearly' 
                      ? t.pricing.perYear
                      : t.pricing.perMonth;
                    
                    return (
                      <motion.div
                        key={pkg.type}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.15 }}
                        className={`relative group ${pkg.recommended ? 'md:scale-105 z-10' : ''}`}
                      >
                        <div className={`h-full rounded-3xl p-8 md:p-10 transition-all duration-300 ${
                          pkg.recommended
                            ? 'bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 border-2 border-purple-400 shadow-2xl'
                            : 'bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-xl'
                        }`}>
                          {/* Badge */}
                          {pkg.badge && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-2 bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] text-white text-sm font-bold rounded-full shadow-lg animate-pulse">
                              ⭐ {pkg.badge}
                            </div>
                          )}

                          {/* Icon & Name */}
                          <div className="mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                              {pkg.icon}
                            </div>
                            <h3 className="text-3xl font-black text-gray-900 mb-2">
                              {pkg.name}
                            </h3>
                            <p className="text-base font-semibold text-gray-600 mb-3">
                              {pkg.tagline}
                            </p>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {pkg.suitableFor}
                            </p>
                          </div>

                          {/* Price */}
                          <div className="mb-6 pb-6 border-b-2 border-gray-200">
                            <div className="flex items-baseline gap-2 mb-1">
                              <span className={`text-4xl font-black ${
                                pkg.recommended 
                                  ? 'bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent'
                                  : 'text-gray-900'
                              }`}>
                                {priceDisplay.split('/')[0]}
                              </span>
                              <span className="text-lg text-gray-600 font-semibold">
                                {periodLabel}
                              </span>
                            </div>
                            {billingPeriod === 'yearly' && (
                              <p className="text-sm font-bold text-green-600 mt-2">
                                {t.pricing.savings}
                              </p>
                            )}
                            
                            {/* Revenue-based pricing note */}
                            {pkg.isRevenueBased && (
                              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                                <div className="flex items-start gap-2">
                                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                  <p className="text-sm text-gray-700 leading-relaxed font-medium">
                                    {billingPeriod === 'yearly' 
                                      ? (pkg.revenueNoteYearly || pkg.revenueNote)
                                      : (pkg.revenueNoteMonthly || pkg.revenueNote)}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Features */}
                          <div className="mb-8 space-y-3">
                            {pkg.features.map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-3 group/item">
                                <div className="mt-1 flex-shrink-0">
                                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                                    <Check className="w-3 h-3 text-white" />
                                  </div>
                                </div>
                                <span className="text-sm text-gray-700 leading-relaxed font-medium">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* CTA Button */}
                          <a
                            href={`/register?plan=${pkg.type}`}
                            className={`block w-full py-4 px-6 rounded-2xl font-bold text-center transition-all duration-300 ${
                              pkg.recommended
                                ? 'bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] text-white shadow-lg hover:shadow-xl hover:scale-105'
                                : 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg hover:scale-105'
                            } flex items-center justify-center gap-2 group`}
                          >
                            <span>{t.pricing.getStarted}</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </a>
                          
                          <p className="text-xs text-center text-gray-500 mt-4">
                            {t.pricing.trialText}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </>
            )}
          </motion.div>
        </Container>
      </section>

      {/* Resto Pricing Tiers Section */}
      {!isLoading && packages.find(p => p.type === 'resto')?.tiers && (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <Container>
            {packages.find(p => p.type === 'resto')?.tiers && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50 rounded-3xl p-8 md:p-10 border-2 border-purple-200 shadow-lg">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-4">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-bold text-gray-900">
                        Revenue-Based Pricing
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">
                      {t.pricing.tiersTitle}
                    </h3>
                    <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
                      {t.pricing.tiersSubtitle}
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {packages.find(p => p.type === 'resto')?.tiers?.map((tier, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 group"
                      >
                        <div className="text-center">
                          <h4 className="text-lg font-bold text-gray-900 mb-2">
                            {tier.name}
                          </h4>
                          <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                            {tier.price}
                          </div>
                          <div className="px-3 py-2 bg-purple-50 rounded-lg">
                            <p className="text-xs font-semibold text-gray-700">
                              {tier.revenue}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-sm text-gray-700 text-center leading-relaxed">
                      {t.pricing.tiersNote}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </Container>
        </section>
      )}

      {/* Package Comparison Section */}
      <section className="py-20 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t.pricing.comparisonTitle}
              </h2>
              <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200">
                <p className="text-sm font-bold text-gray-800">
                  {t.pricing.comparisonBox}
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-10 border border-gray-200 shadow-sm">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Kadai Toko */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Store className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Kadai Toko</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {t.pricing.tokoComparisonFeatures.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Kadai Resto */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                      <ChefHat className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Kadai Resto</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {t.pricing.restoComparisonFeatures.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-6">
                  <p className="text-sm text-gray-700 text-center leading-relaxed">
                    <strong>{t.pricing.comparisonHelp}</strong><br/>
                    {t.pricing.comparisonToko}<br/>
                    {t.pricing.comparisonResto}<br/>
                    <span className="text-xs text-gray-600 mt-2 block">{t.pricing.comparisonNote}</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  {t.pricing.faqTitle}
                </span>
                {" "}
                <span className="bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent">
                  {t.pricing.faqTitleHighlight}
                </span>
              </h2>
              <p className="text-lg text-gray-600">
                {t.pricing.faqSubtitle}
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
                    <h3 className="font-bold text-lg mb-2 text-gray-900">{faq.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF5A5F]/20 via-[#8B5CF6]/20 to-[#3B82F6]/20" />
        
        {/* Animated Blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF5A5F]/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8B5CF6]/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#3B82F6]/20 rounded-full blur-3xl animate-blob animation-delay-4000" />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {t.pricing.ctaTitle}
            </h2>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              {t.pricing.ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/6281339765775"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] text-white rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 group"
              >
                {t.pricing.contactSales}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/features"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white/10 backdrop-blur-sm text-white rounded-full font-bold text-lg border-2 border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300"
              >
                {t.pricing.viewAllFeatures}
              </a>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
