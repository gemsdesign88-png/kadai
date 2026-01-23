'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useLanguage } from '@/lib/i18n/context';
import { AuthHeader } from '@/components/auth-header';
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2, Mail, Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type LoginMode = 'login' | 'forgot-password';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const { language, t } = useLanguage();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<LoginMode>('login');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [awaitingVerification, setAwaitingVerification] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const hasAnyRestaurant = async (ownerId: string) => {
    try {
      const { count, error } = await supabase
        .from('restaurants')
        .select('id', { count: 'exact', head: true })
        .eq('owner_id', ownerId);

      if (error) {
        console.error('Restaurant existence check error:', error);
        // Fallback: limit(1) avoids maybeSingle/single multi-row errors
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

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const hasRestaurant = await hasAnyRestaurant(session.user.id);
        router.replace(hasRestaurant ? '/dashboard' : '/onboarding');
      }
    };
    checkUser();
  }, [router, supabase]);

  // Cooldown timer for resend verification
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!email.trim()) {
      setError(language === 'id' ? 'Email wajib diisi' : 'Email is required');
      return;
    }

    if (!password) {
      setError(language === 'id' ? 'Password wajib diisi' : 'Password is required');
      return;
    }

    setLoading(true);
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (signInError) {
        if (signInError.message.includes('Email not confirmed')) {
          setAwaitingVerification(true);
          setVerificationEmail(email.trim());
          setResendCooldown(60);
          setError(language === 'id' ? 'Email Anda belum diverifikasi. Silakan cek email Anda atau klik tombol kirim ulang.' : 'Email not verified. Please check your email or use resend button.');
        } else if (signInError.message.includes('Invalid login credentials')) {
          setError(language === 'id' ? 'Email atau password salah' : 'Invalid email or password');
        } else {
          setError(signInError.message);
        }
        return;
      }

      if (data.session) {
        // Check if user has any restaurant (supports multiple outlets)
        const hasRestaurant = await hasAnyRestaurant(data.user.id);
        router.replace(hasRestaurant ? '/dashboard' : '/onboarding');
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || (language === 'id' ? 'Terjadi kesalahan saat login' : 'An error occurred during login'));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim()) {
      setError(language === 'id' ? 'Email wajib diisi' : 'Email is required');
      return;
    }

    setLoading(true);
    try {
      const redirectUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/auth/reset-password`
        : 'https://sibos.kadai.id/auth/reset-password';

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: redirectUrl,
      });

      if (resetError) {
        if (resetError.message.includes('rate limit')) {
          setError(language === 'id' ? 'Terlalu banyak percobaan. Silakan coba lagi nanti.' : 'Too many attempts. Please try again later.');
        } else {
          setError(resetError.message);
        }
        return;
      }

      setSuccess(language === 'id' 
        ? `Link reset password telah dikirim ke ${email.trim()}. Silakan cek email Anda.`
        : `Password reset link sent to ${email.trim()}. Please check your email.`
      );
    } catch (err: any) {
      setError(err.message || (language === 'id' ? 'Terjadi kesalahan' : 'An error occurred'));
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (resendCooldown > 0) return;
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: verificationEmail,
      });

      if (error) {
        if (error.message?.toLowerCase().includes('rate limit')) {
          setError(language === 'id' ? 'Terlalu banyak percobaan. Silakan tunggu beberapa menit.' : 'Too many attempts. Please wait a few minutes.');
        } else {
          setError(error.message);
        }
        return;
      }

      setSuccess(language === 'id' 
        ? 'Email verifikasi telah dikirim ulang. Silakan cek inbox atau folder spam Anda.'
        : 'Verification email resent. Please check your inbox or spam folder.'
      );
      setResendCooldown(60);
    } catch (err: any) {
      setError(err.message || (language === 'id' ? 'Gagal mengirim ulang email' : 'Failed to resend email'));
    } finally {
      setLoading(false);
    }
  };

  // Show verification screen if awaiting verification
  if (awaitingVerification) {
    return (
      <>
        <AuthHeader />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-16 flex items-center justify-center p-4 relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#FF5A5F]/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
          </div>

          <div className="w-full max-w-md relative z-10">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FF5A5F] to-[#8B5CF6] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {language === 'id' ? 'Verifikasi Email Anda' : 'Verify Your Email'}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  {language === 'id' ? 'Kami telah mengirim link verifikasi ke:' : 'We sent a verification link to:'}
                </p>
                <p className="text-gray-900 font-semibold text-base">
                  {verificationEmail}
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-700">
                    <p className="font-bold text-gray-900 mb-2">
                      {language === 'id' ? 'Langkah selanjutnya:' : 'Next steps:'}
                    </p>
                    <ol className="space-y-1.5 text-xs">
                      <li>1. {language === 'id' ? 'Buka email Anda' : 'Open your email'}</li>
                      <li>2. {language === 'id' ? 'Cari email dari KadaiPOS' : 'Find email from KadaiPOS'}</li>
                      <li>3. {language === 'id' ? 'Klik link verifikasi' : 'Click verification link'}</li>
                      <li>4. {language === 'id' ? 'Login dengan akun Anda' : 'Login with your account'}</li>
                    </ol>
                  </div>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              {success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-green-800">{success}</p>
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={handleResendVerification}
                  disabled={loading || resendCooldown > 0}
                  className="w-full bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {language === 'id' ? 'Mengirim...' : 'Sending...'}
                    </>
                  ) : resendCooldown > 0 ? (
                    `${language === 'id' ? 'Kirim Ulang' : 'Resend'} (${resendCooldown}s)`
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      {language === 'id' ? 'Kirim Ulang Email Verifikasi' : 'Resend Verification Email'}
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setAwaitingVerification(false);
                    setMode('login');
                    setEmail('');
                  }}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {language === 'id' ? 'Kembali ke Login' : 'Back to Login'}
                </button>
              </div>

              <div className="mt-6 text-center border-t border-gray-200 pt-6">
                <p className="text-sm text-gray-600">
                  {language === 'id' ? 'Sudah verifikasi?' : 'Already verified?'}{' '}
                  <button
                    onClick={() => {
                      setAwaitingVerification(false);
                      setMode('login');
                    }}
                    className="text-[#FF5A5F] hover:underline font-semibold"
                  >
                    {language === 'id' ? 'Login sekarang' : 'Login now'}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AuthHeader />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-16 flex items-center justify-center">
        {/* Main Content */}
        <main className="w-full max-w-md px-4">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm">
              {success}
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8">
              {/* Title */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  {mode === 'login' 
                    ? (language === 'id' ? 'Selamat datang kembali' : 'Welcome back')
                    : (language === 'id' ? 'Reset password Anda' : 'Reset your password')
                  }
                </h2>
              </div>

              {/* Login Form */}
              {mode === 'login' && (
                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {language === 'id' ? 'Email' : 'Email'}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError('');
                        }}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] transition-all"
                        placeholder={language === 'id' ? 'nama@email.com' : 'name@email.com'}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {language === 'id' ? 'Password' : 'Password'}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setError('');
                        }}
                        className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] transition-all"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setMode('forgot-password')}
                      className="text-sm text-[#FF5A5F] hover:text-[#FF5A5F]/80 font-medium"
                    >
                      {language === 'id' ? 'Lupa Password?' : 'Forgot Password?'}
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] text-white py-3 rounded-3xl font-bold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {language === 'id' ? 'Memproses...' : 'Processing...'}
                      </>
                    ) : (
                      language === 'id' ? 'Masuk' : 'Login'
                    )}
                  </button>
                </form>
              )}

              {/* Google Login */}
              {mode === 'login' && (
                <>
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        {language === 'id' ? 'Atau lanjut dengan' : 'Or continue with'}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-3xl font-semibold hover:bg-gray-50 hover:shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </button>
                </>
              )}

              {/* Forgot Password Form */}
              {mode === 'forgot-password' && (
                <form onSubmit={handleForgotPassword} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {language === 'id' ? 'Email' : 'Email'}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError('');
                        }}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] transition-all"
                        placeholder={language === 'id' ? 'nama@email.com' : 'name@email.com'}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] text-white py-3 rounded-xl font-bold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {language === 'id' ? 'Mengirim...' : 'Sending...'}
                      </>
                    ) : (
                      language === 'id' ? 'Kirim Link Reset' : 'Send Reset Link'
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="w-full text-center text-sm text-gray-600 hover:text-gray-900 py-2"
                  >
                    {language === 'id' ? 'Kembali ke Login' : 'Back to Login'}
                  </button>
                </form>
              )}

              {/* Register Link */}
              {mode === 'login' && (
                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                  <p className="text-sm text-gray-600">
                    {language === 'id' ? 'Belum punya akun?' : 'Don\'t have an account?'}{' '}
                    <Link 
                      href="/register" 
                      className="text-[#FF5A5F] hover:underline font-semibold"
                    >
                      {language === 'id' ? 'Daftar Sekarang' : 'Register Now'}
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
