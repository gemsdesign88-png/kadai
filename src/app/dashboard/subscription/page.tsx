"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { CreditCard, Check, ArrowLeft, Calendar, Building2 } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { createDashboardTranslator } from "@/lib/i18n/dashboard-translator"

export default function SubscriptionPage() {
  const router = useRouter()
  const supabase = createClient()
  const { language } = useLanguage()
  const { t: dt } = createDashboardTranslator(language)
  const [loading, setLoading] = useState(true)
  const [restaurants, setRestaurants] = useState<any[]>([])

  useEffect(() => {
    loadRestaurants()
  }, [])

  async function loadRestaurants() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      const { data } = await supabase
        .from('restaurants')
        .select('*')
        .eq('owner_id', user.id)
        .order('name')

      if (data) {
        setRestaurants(data)
      }
    } catch (error) {
      console.error('Error loading restaurants:', error)
    } finally {
      setLoading(false)
    }
  }

  const plans = [
    {
      id: 'monthly',
      name: dt('monthlyPlan'),
      price: 'Rp 149.000',
      period: dt('monthly'),
      duration: dt('perOutlet'),
      icon: '📅',
      features: [
        dt('featOrderSystem'),
        dt('featAnalytics'),
        dt('featStaff'),
        dt('featKitchen'),
        dt('featTable'),
        dt('featInventory'),
        dt('featQR'),
        dt('featWA')
      ]
    },
    {
      id: 'yearly',
      name: dt('yearlyPlan'),
      price: 'Rp 1.599.000',
      period: dt('yearly'),
      duration: dt('perOutlet'),
      icon: '⭐',
      badge: dt('save11'),
      popular: true,
      savings: dt('saveAmount'),
      monthlyEquivalent: dt('monthlyEquivalent'),
      features: [
        dt('featAllMonthly'),
        dt('featMultiOutlet'),
        dt('featLoyalty'),
        dt('featPayments'),
        dt('featBackup'),
        dt('featPriority'),
        dt('featTraining')
      ]
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent)]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{dt('manageSubscription')}</h1>
              <p className="text-sm text-gray-500 mt-1">{dt('choosePlanDesc')}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Restaurants */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{dt('yourRestaurants')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => {
              const planName = restaurant.subscription_plan === 'monthly' ? dt('monthly') :
                               restaurant.subscription_plan === 'yearly' ? dt('yearly') :
                               restaurant.subscription_plan === 'lifetime' ? dt('lifetime') : dt('trial')
              
              const expiryDate = restaurant.subscription_ends_at 
                ? new Date(restaurant.subscription_ends_at).toLocaleDateString(dt.locale, { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })
                : restaurant.trial_ends_at
                ? new Date(restaurant.trial_ends_at).toLocaleDateString(dt.locale, { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })
                : null
              
              const daysLeft = expiryDate && restaurant.subscription_ends_at
                ? Math.ceil((new Date(restaurant.subscription_ends_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                : null
              
              const isExpiringSoon = daysLeft !== null && daysLeft <= 7 && daysLeft >= 0
              const isExpired = daysLeft !== null && daysLeft < 0

              return (
                <div 
                  key={restaurant.id} 
                  className={`bg-white rounded-2xl p-6 shadow-sm border-2 ${
                    isExpired ? 'border-red-300 bg-red-50' : 
                    isExpiringSoon ? 'border-amber-300 bg-amber-50' : 
                    'border-gray-200'
                  }`}
                >
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
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{restaurant.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{restaurant.address || dt('addressNotSet')}</p>
                      <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-white rounded-lg border border-gray-200">
                        <Calendar className="w-3 h-3 text-gray-500" />
                        <span className="text-xs font-semibold text-gray-700">{planName}</span>
                      </div>
                    </div>
                  </div>

                  {expiryDate && (
                    <div className={`mb-4 p-3 rounded-xl ${
                      isExpired ? 'bg-red-100' : 
                      isExpiringSoon ? 'bg-amber-100' : 
                      'bg-gray-50'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">
                          {isExpired ? dt('expiredOn') : dt('activeUntil')}
                        </span>
                        <span className={`text-xs font-bold ${
                          isExpired ? 'text-red-700' : 
                          isExpiringSoon ? 'text-amber-700' : 
                          'text-gray-900'
                        }`}>
                          {expiryDate}
                        </span>
                      </div>
                      {daysLeft !== null && !isExpired && (
                        <div className="text-xs text-gray-600 mt-1">
                          {daysLeft} {dt('daysLeft')}
                        </div>
                      )}
                      {isExpired && (
                        <div className="text-xs font-semibold text-red-700 mt-1">
                          ⚠️ {dt('subscriptionExpired')}
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    onClick={() => {
                      // Scroll to pricing section
                      document.getElementById('pricing-plans')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className={`w-full py-2.5 rounded-xl font-semibold transition-colors ${
                      isExpired 
                        ? 'bg-red-600 text-white hover:bg-red-700' 
                        : isExpiringSoon
                        ? 'bg-amber-600 text-white hover:bg-amber-700'
                        : 'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]'
                    }`}
                  >
                    {isExpired ? `🔄 ${dt('renewNow')}` : 
                     isExpiringSoon ? `⚡ ${dt('renewNow')}` : 
                     `🔄 ${dt('renewSubscription')}`}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Pricing Plans */}
        <div id="pricing-plans">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{dt('chooseSubscriptionPlan')}</h2>
            <p className="text-gray-600">{dt('upgradeDowngradeDesc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className={`bg-white rounded-2xl p-8 border-2 shadow-sm hover:shadow-lg transition-all ${
                  plan.popular 
                    ? 'border-[var(--color-accent)] ring-4 ring-[var(--color-accent)]/10 scale-105' 
                    : 'border-gray-200'
                }`}
              >
                <div className="text-4xl mb-3">{plan.icon}</div>
                {plan.badge && (
                  <div className="inline-block px-3 py-1 bg-[var(--color-accent)] text-white text-xs font-bold rounded-full mb-4">
                    {plan.badge}
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <p className="text-sm text-gray-500 mb-6">{dt('from')} {plan.duration}</p>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-xl font-bold transition-colors ${
                    plan.popular
                      ? 'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {dt('selectPlan')}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-12 bg-blue-50 border-2 border-blue-200 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">💡 {dt('subscriptionInfo')}</h3>
          <ul className="space-y-3 text-gray-700">
            <li>• {dt('subscriptionInfo1')}</li>
            <li>• {dt('subscriptionInfo2')}</li>
            <li>• {dt('subscriptionInfo3')}</li>
            <li>• {dt('subscriptionInfo4')}</li>
            <li>• {dt('subscriptionInfo5')}</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
