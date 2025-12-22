'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useLanguage } from '@/lib/i18n/context';
import { AuthHeader } from '@/components/auth-header';
import BusinessTypeSelector from '@/components/onboarding/BusinessTypeSelector';
import CategorySelector from '@/components/onboarding/CategorySelector';
import PlanSelector from '@/components/onboarding/PlanSelector';

export const dynamic = 'force-dynamic';
import AccountCreation from '@/components/onboarding/AccountCreation';
import { createRestaurantAction, createSubscriptionAction, createUserProfileAction, createUserAction } from '@/app/actions/register';

type Step = 'account' | 'business-type' | 'category' | 'plan';

interface RegistrationData {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  businessName: string;
  businessType: 'toko' | 'resto' | null;
  category: string | null;
  planId: string | null;
}

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();
  const { language, setLanguage, t } = useLanguage();
  const [currentStep, setCurrentStep] = useState<Step>('account');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
    businessName: '',
    businessType: null,
    category: null,
    planId: null,
  });

  const updateData = (updates: Partial<RegistrationData>) => {
    setRegistrationData(prev => ({ ...prev, ...updates }));
  };

  const handleAccountComplete = (data: { email: string; password: string; fullName: string; phoneNumber: string; businessName: string }) => {
    updateData(data);
    setCurrentStep('business-type');
  };

  const handleBusinessTypeSelect = (type: 'toko' | 'resto') => {
    updateData({ businessType: type });
  };

  const handleCategorySelect = (category: string) => {
    updateData({ category });
  };

  const handlePlanSelect = (planId: string) => {
    updateData({ planId });
  };

  const handleNext = () => {
    if (currentStep === 'business-type' && registrationData.businessType) {
      setCurrentStep('category');
    } else if (currentStep === 'category' && registrationData.category) {
      setCurrentStep('plan');
    } else if (currentStep === 'plan' && registrationData.planId) {
      handleFinalSubmit();
    }
  };

  const handleFinalSubmit = async () => {
    if (!registrationData.planId) return;
    
    setIsLoading(true);
    setError(null);

    try {
      console.log('Starting registration with data:', { 
        email: registrationData.email, 
        businessName: registrationData.businessName,
        businessType: registrationData.businessType,
        category: registrationData.category,
        planId: registrationData.planId
      });

      // 1. Create user account using server action (bypasses email confirmation)
      const userResult = await createUserAction({
        email: registrationData.email,
        password: registrationData.password,
        fullName: registrationData.fullName,
      });

      console.log('User creation result:', userResult);

      if (!userResult.success || !userResult.userId) {
        throw new Error(userResult.error || 'Failed to create account');
      }

      const userId = userResult.userId;
      console.log('User created with ID:', userId);

      // Sign in the user after creation
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: registrationData.email,
        password: registrationData.password,
      });

      if (signInError) {
        console.error('Sign in after creation failed:', signInError);
        // Continue anyway - user can sign in manually
      }

      // Small delay to ensure user is propagated to database
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 2. Create user profile
      const profileResult = await createUserProfileAction({
        userId: userId,
        fullName: registrationData.fullName,
        phoneNumber: registrationData.phoneNumber,
        email: registrationData.email,
      });

      if (!profileResult.success) {
        console.error('User profile creation failed:', profileResult.error);
        // Continue anyway - profile can be created later
      } else {
        console.log('User profile created successfully');
      }

      // 3. Create restaurant using server action (bypasses RLS client-side issues)
      const restaurantResult = await createRestaurantAction({
        userId: userId,
        businessName: registrationData.businessName,
        businessType: registrationData.businessType || 'toko',
        category: registrationData.category || 'general',
        planId: registrationData.planId,
      });

      if (!restaurantResult.success || !restaurantResult.restaurant) {
        throw new Error(`Failed to create restaurant: ${restaurantResult.error || 'Unknown error'}`);
      }

      console.log('Restaurant created successfully:', restaurantResult.restaurant);

      // 4. Create initial subscription using server action
      const subscriptionResult = await createSubscriptionAction({
        restaurantId: restaurantResult.restaurant.id,
        planId: registrationData.planId,
      });

      if (!subscriptionResult.success) {
        console.error('Subscription creation failed:', subscriptionResult.error);
        throw new Error(`Failed to create subscription: ${subscriptionResult.error || 'Unknown error'}`);
      }

      console.log('Subscription created successfully');

      // Success! Show message and redirect
      console.log('Registration successful, redirecting...');
      const message = language === 'id' 
        ? 'Selamat datang di KadaiPOS'
        : language === 'zh'
        ? '欢迎使用 KadaiPOS'
        : 'Welcome to KadaiPOS';
      
      setSuccessMessage(message);
      setIsLoading(false);
      
      // Wait 2 seconds to show success message
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      router.push('/dashboard?welcome=true');
    } catch (err: any) {
      console.error('Registration error caught:', err);
      console.error('Error message:', err?.message);
      
      // Enhanced error handling with specific messages
      let errorMessage = 'Failed to complete registration';
      
      if (err?.message) {
        errorMessage = err.message;
      } else if (err?.error_description) {
        errorMessage = err.error_description;
      } else if (typeof err === 'string') {
        errorMessage = err;
      } else {
        errorMessage = `Registration failed. Please check console for details.`;
      }
      
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    const steps: Step[] = ['account', 'business-type', 'category', 'plan'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const progress = {
    account: 25,
    'business-type': 50,
    category: 75,
    plan: 100,
  }[currentStep];

  return (
    <>
      <AuthHeader />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-16">
        {/* Progress Bar */}
        <div className="fixed top-16 left-0 right-0 h-1 bg-gray-200 z-50">
          <div
            className="h-full bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] transition-all duration-500 ease-out"
            style={{width: `${progress}%`}}
          ></div>
        </div>

        {/* Success Modal Overlay */}
        {successMessage && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {language === 'id' ? 'Registrasi Berhasil!' : language === 'zh' ? '注册成功！' : 'Registration Successful!'}
              </h3>
              <p className="text-gray-600 mb-4">{successMessage}</p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{language === 'id' ? 'Mengarahkan ke dashboard...' : language === 'zh' ? '正在跳转到仪表板...' : 'Redirecting to dashboard...'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-32">
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {currentStep === 'account' && (
            <AccountCreation
              onComplete={handleAccountComplete}
              initialData={{
                email: registrationData.email,
                password: registrationData.password,
                fullName: registrationData.fullName,
                phoneNumber: registrationData.phoneNumber,
                businessName: registrationData.businessName,
              }}
            />
          )}

          {currentStep === 'business-type' && (
            <BusinessTypeSelector
              businessName={registrationData.businessName}
              onSelect={handleBusinessTypeSelect}
              selected={registrationData.businessType}
            />
          )}

          {currentStep === 'category' && registrationData.businessType && (
            <CategorySelector
              businessType={registrationData.businessType}
              businessName={registrationData.businessName}
              onSelect={handleCategorySelect}
              selected={registrationData.category}
            />
          )}

          {currentStep === 'plan' && registrationData.businessType && (
            <PlanSelector
              businessType={registrationData.businessType}
              category={registrationData.category}
              businessName={registrationData.businessName}
              onSelect={handlePlanSelect}
              selected={registrationData.planId}
              isLoading={isLoading}
            />
          )}
        </div>
      </main>

      {/* Sticky Bottom Navigation - Only show after account step */}
      {currentStep !== 'account' && (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors border border-gray-300"
              disabled={isLoading}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">
                {language === 'id' ? 'Kembali' : language === 'zh' ? '返回' : 'Back'}
              </span>
            </button>
            
            {/* Step Counter */}
            <div className="text-sm text-gray-500 font-medium">
              {t.register?.step || 'Step'} {['account', 'business-type', 'category', 'plan'].indexOf(currentStep) + 1} {t.register?.of || 'of'} 4
            </div>

            {/* Next Button */}
            {currentStep !== 'plan' ? (
              <button
                onClick={() => {
                  if (currentStep === 'business-type' && registrationData.businessType) {
                    setCurrentStep('category');
                  } else if (currentStep === 'category' && registrationData.category) {
                    setCurrentStep('plan');
                  }
                }}
                disabled={
                  (currentStep === 'business-type' && !registrationData.businessType) ||
                  (currentStep === 'category' && !registrationData.category)
                }
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                  ((currentStep === 'business-type' && registrationData.businessType) ||
                   (currentStep === 'category' && registrationData.category))
                    ? 'bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] text-white hover:shadow-lg hover:shadow-[#FF5A5F]/30'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <span className="text-sm font-medium">
                  {language === 'id' ? 'Lanjut' : language === 'zh' ? '继续' : 'Next'}
                </span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleFinalSubmit}
                disabled={!registrationData.planId || isLoading}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                  registrationData.planId && !isLoading
                    ? 'bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] text-white hover:shadow-lg hover:shadow-[#FF5A5F]/30'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-sm font-medium">
                      {language === 'id' ? 'Memproses...' : language === 'zh' ? '处理中...' : 'Processing...'}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-sm font-medium">
                      {language === 'id' ? 'Submit' : language === 'zh' ? '提交' : 'Submit'}
                    </span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      )}
    </div>
    </>
  );
}
