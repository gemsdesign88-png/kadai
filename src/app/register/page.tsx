'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/context';
import { AuthHeader } from '@/components/auth-header';
import AccountCreation from '@/components/onboarding/AccountCreation';
import { createUserAction } from '@/app/actions/register';
import { createClient } from '@/lib/supabase/client';

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();
  const { language, t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const [registrationData, setRegistrationData] = useState({
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
  });

  const handleAccountComplete = async (data: { email: string; password: string; fullName: string; phoneNumber: string }) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('Starting registration with data:', {
        email: data.email,
        fullName: data.fullName,
      });

      // Create user account using server action
      const userResult = await createUserAction({
        email: data.email,
        password: data.password,
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
      });

      if (!userResult.success) {
        setError(userResult.error || 'Failed to create account');
        setIsLoading(false);
        return;
      }

      console.log('User created successfully, showing verification message...');
      
      // Show verification message
      setRegisteredEmail(data.email);
      setShowVerifyEmail(true);
      setIsLoading(false);
    } catch (err: any) {
      console.error('Registration error:', err);
      let errorMessage = 'Failed to complete registration';

      if (err?.message) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }

      setError(errorMessage);
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    if (!registeredEmail) return;
    
    setIsResending(true);
    setResendMessage(null);
    
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: registeredEmail,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
      
      setResendMessage({
        type: 'success',
        text: language === 'id' ? 'Email verifikasi telah dikirim ulang!' : 'Verification email has been resent!'
      });
    } catch (err: any) {
      console.error('Resend error:', err);
      setResendMessage({
        type: 'error',
        text: err.message || (language === 'id' ? 'Gagal mengirim ulang email.' : 'Failed to resend email.')
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      <AuthHeader />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-16">
        {/* Verify Email Modal Overlay */}
        {showVerifyEmail && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {language === 'id' ? 'Cek Email Anda!' : language === 'zh' ? '检查您的电子邮件！' : 'Check Your Email!'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'id' 
                  ? `Kami telah mengirimkan link verifikasi ke ${registeredEmail}.`
                  : language === 'zh'
                  ? `我们已向 ${registeredEmail} 发送了验证链接。`
                  : `We've sent a verification link to ${registeredEmail}.`
                }
              </p>
              <p className="text-sm text-gray-500 mb-6">
                {language === 'id' 
                  ? 'Silakan klik link di email tersebut untuk memverifikasi akun Anda sebelum login.'
                  : language === 'zh'
                  ? '请点击电子邮件中的链接以在登录前验证您的账户。'
                  : 'Please click the link in that email to verify your account before logging in.'
                }
              </p>
              <button
                onClick={() => router.push('/login')}
                className="w-full py-3 bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all mb-4"
              >
                {language === 'id' ? 'Ke Halaman Login' : language === 'zh' ? '前往登录页面' : 'Go to Login Page'}
              </button>

              {resendMessage && (
                <div className={`mb-4 p-3 rounded-lg text-sm ${
                  resendMessage.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {resendMessage.text}
                </div>
              )}

              <button
                onClick={handleResendEmail}
                disabled={isResending}
                className="w-full py-2 text-gray-600 font-medium hover:text-gray-900 transition-colors disabled:opacity-50"
              >
                {isResending 
                  ? (language === 'id' ? 'Mengirim...' : 'Sending...') 
                  : (language === 'id' ? 'Kirim Ulang Email Verifikasi' : 'Resend Verification Email')
                }
              </button>

              <p className="mt-4 text-xs text-gray-500">
                {language === 'id' 
                  ? 'Tidak menerima email? Periksa folder spam atau'
                  : language === 'zh'
                  ? '没有收到电子邮件？检查垃圾邮件文件夹或'
                  : "Didn't receive the email? Check your spam folder or"
                }{' '}
                <button 
                  onClick={() => {
                    setShowVerifyEmail(false);
                    setError(null);
                    setResendMessage(null);
                  }}
                  className="text-[#FF5A5F] hover:underline font-medium"
                >
                  {language === 'id' ? 'coba lagi' : language === 'zh' ? '重试' : 'try again'}
                </button>
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && !showVerifyEmail && (
          <div className="max-w-md mx-auto mt-8 px-4">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
              <button 
                onClick={() => setError(null)}
                className="text-red-600 hover:text-red-800"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Account Creation Form */}
        {!showVerifyEmail && (
          <div className="container mx-auto max-w-2xl">
            <AccountCreation
              onComplete={handleAccountComplete}
              onGoogleLogin={handleGoogleLogin}
              initialData={registrationData}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
    </>
  );
}
