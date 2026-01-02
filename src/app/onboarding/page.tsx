'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useLanguage } from '@/lib/i18n/context';
import { AuthHeader } from '@/components/auth-header';
import BusinessTypeSelector from '@/components/onboarding/BusinessTypeSelector';
import CategorySelector from '@/components/onboarding/CategorySelector';
import PlanSelector from '@/components/onboarding/PlanSelector';
import { createRestaurantAction, createSubscriptionAction, createUserProfileAction } from '@/app/actions/register';

type Step = 'business-name' | 'business-type' | 'category' | 'plan';

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createClient();
  const { language, t } = useLanguage();
  const [currentStep, setCurrentStep] = useState<Step>('business-name');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const [onboardingData, setOnboardingData] = useState({
    businessName: '',
    businessType: null as 'toko' | 'resto' | null,
    category: null as string | null,
    planId: null as string | null,
  });

  const hasAnyRestaurant = async (ownerId: string) => {
    try {
      const { count, error } = await supabase
        .from('restaurants')
        .select('id', { count: 'exact', head: true })
        .eq('owner_id', ownerId);

      if (error) {
        console.error('Restaurant existence check error:', error);
        const { data: rows, error: fallbackError } = await supabase
          .from('restaurants')
          .select('id')
          .eq('owner_id', ownerId)
          .limit(1);
        if (fallbackError) {
          console.error('Restaurant existence fallback error:', fallbackError);
          return false;
        }
        return (rows?.length || 0) > 0;
      }

      return (count ?? 0) > 0;
    } catch (e) {
      console.error('Restaurant existence check unexpected error:', e);
      return false;
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);

      // Check if restaurant already exists
      const hasRestaurant = await hasAnyRestaurant(user.id);
      if (hasRestaurant) {
        router.replace('/dashboard');
      }
    };
    checkUser();
  }, [supabase, router]);

  const updateData = (updates: Partial<typeof onboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep === 'business-name' && onboardingData.businessName) {
      setCurrentStep('business-type');
    } else if (currentStep === 'business-type' && onboardingData.businessType) {
      setCurrentStep('category');
    } else if (currentStep === 'category' && onboardingData.category) {
      setCurrentStep('plan');
    }
  };

  const handleBack = () => {
    if (currentStep === 'business-type') setCurrentStep('business-name');
    else if (currentStep === 'category') setCurrentStep('business-type');
    else if (currentStep === 'plan') setCurrentStep('category');
  };

  const handleFinalSubmit = async () => {
    if (!onboardingData.planId || !user) return;
    
    setIsLoading(true);
    setError(null);

    try {
      // 1. Create/Update user profile
      await createUserProfileAction({
        userId: user.id,
        fullName: user.user_metadata.full_name || user.user_metadata.name || 'User',
        email: user.email!,
      });

      // 2. Create restaurant
      const restaurantResult = await createRestaurantAction({
        userId: user.id,
        businessName: onboardingData.businessName,
        businessType: onboardingData.businessType!,
        category: onboardingData.category!,
        planId: onboardingData.planId,
      });

      if (!restaurantResult.success || !restaurantResult.restaurant) {
        throw new Error(restaurantResult.error || 'Failed to create restaurant');
      }

      // 3. Create subscription
      await createSubscriptionAction({
        restaurantId: restaurantResult.restaurant.id,
        planId: onboardingData.planId,
      });

      // Success! Redirect to dashboard
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Onboarding error:', err);
      setError(err.message || 'Failed to complete onboarding');
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <>
      <AuthHeader />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-32">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {language === 'id' ? 'Selamat Datang!' : 'Welcome!'}
            </h1>
            <p className="text-gray-600">
              {language === 'id' 
                ? 'Mari siapkan toko atau restoran Anda dalam beberapa langkah mudah.' 
                : "Let's set up your store or restaurant in a few easy steps."}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-8">
            {currentStep === 'business-name' && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {language === 'id' ? 'Apa nama bisnis Anda?' : "What's your business name?"}
                  </h2>
                  <p className="text-gray-500 mt-2">
                    {language === 'id' ? 'Anda dapat mengubahnya nanti di pengaturan.' : 'You can change this later in settings.'}
                  </p>
                </div>
                <div className="max-w-md mx-auto">
                  <input
                    type="text"
                    value={onboardingData.businessName}
                    onChange={(e) => updateData({ businessName: e.target.value })}
                    placeholder={language === 'id' ? 'Contoh: Kedai Kopi Mantap' : 'e.g. Awesome Coffee Shop'}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent outline-none transition-all text-lg text-center"
                    autoFocus
                  />
                  <button
                    onClick={handleNext}
                    disabled={!onboardingData.businessName}
                    className={`w-full mt-8 py-4 rounded-xl font-bold text-white transition-all ${
                      onboardingData.businessName 
                        ? 'bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] shadow-lg hover:shadow-xl' 
                        : 'bg-gray-200 cursor-not-allowed'
                    }`}
                  >
                    {language === 'id' ? 'Lanjut' : 'Continue'}
                  </button>
                </div>
              </div>
            )}

            {currentStep === 'business-type' && (
              <BusinessTypeSelector
                businessName={onboardingData.businessName}
                onSelect={(type) => {
                  updateData({ businessType: type });
                  setCurrentStep('category');
                }}
                selected={onboardingData.businessType}
              />
            )}

            {currentStep === 'category' && onboardingData.businessType && (
              <CategorySelector
                businessType={onboardingData.businessType}
                businessName={onboardingData.businessName}
                onSelect={(cat) => {
                  updateData({ category: cat });
                  setCurrentStep('plan');
                }}
                selected={onboardingData.category}
              />
            )}

            {currentStep === 'plan' && onboardingData.businessType && (
              <PlanSelector
                businessType={onboardingData.businessType}
                category={onboardingData.category}
                businessName={onboardingData.businessName}
                onSelect={(planId) => updateData({ planId })}
                selected={onboardingData.planId}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>

        {/* Navigation Footer */}
        {currentStep !== 'business-name' && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <button
                onClick={handleBack}
                className="px-6 py-3 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition-all"
              >
                {language === 'id' ? 'Kembali' : 'Back'}
              </button>
              
              <div className="text-sm text-gray-500 font-medium">
                {currentStep === 'business-type' ? 'Step 2 of 4' : currentStep === 'category' ? 'Step 3 of 4' : 'Step 4 of 4'}
              </div>

              {currentStep === 'plan' ? (
                <button
                  onClick={handleFinalSubmit}
                  disabled={!onboardingData.planId || isLoading}
                  className={`px-8 py-3 rounded-xl font-bold text-white transition-all ${
                    onboardingData.planId && !isLoading
                      ? 'bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] shadow-lg hover:shadow-xl'
                      : 'bg-gray-200 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? 'Processing...' : (language === 'id' ? 'Selesai' : 'Finish')}
                </button>
              ) : (
                <div className="w-24"></div> // Spacer
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
