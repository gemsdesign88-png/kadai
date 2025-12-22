'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2, Mail, Lock, User, Phone, Building2 } from 'lucide-react';
import Link from 'next/link';

type AuthMode = 'login' | 'signup' | 'forgot-password';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [phone, setPhone] = useState('');
  
  // Email validation
  const [emailError, setEmailError] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);

  // Email validation function
  const validateEmail = (email: string): { isValid: boolean; error: string } => {
    const trimmedEmail = email.trim();
    
    if (!trimmedEmail) {
      return { isValid: false, error: 'Email wajib diisi' };
    }
    
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!emailRegex.test(trimmedEmail)) {
      return { isValid: false, error: 'Format email tidak valid' };
    }
    
    if (trimmedEmail.includes('..') || trimmedEmail.startsWith('.') || trimmedEmail.endsWith('.')) {
      return { isValid: false, error: 'Format email tidak valid' };
    }
    
    if (trimmedEmail.length > 254) {
      return { isValid: false, error: 'Email terlalu panjang' };
    }
    
    return { isValid: true, error: '' };
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    const validation = validateEmail(value);
    setIsEmailValid(validation.isValid);
    setEmailError(validation.error);
    setError('');
  };

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/dashboard');
      }
    };
    checkUser();
  }, [router, supabase]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setError(emailValidation.error);
      return;
    }

    if (!password) {
      setError('Password wajib diisi');
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
          setError('Email belum diverifikasi. Silakan cek email Anda dan klik link verifikasi.');
        } else if (signInError.message.includes('Invalid login credentials')) {
          setError('Email atau password salah');
        } else {
          setError(signInError.message);
        }
        return;
      }

      if (data.session) {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat login');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!fullName || !restaurantName || !phone) {
      setError('Semua field wajib diisi');
      return;
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setError(emailValidation.error);
      return;
    }

    if (password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }

    setLoading(true);
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            full_name: fullName,
            restaurant_name: restaurantName,
            phone: phone,
          },
        },
      });

      if (signUpError) {
        if (signUpError.message?.toLowerCase().includes('rate limit')) {
          setError('Terlalu banyak percobaan. Silakan tunggu beberapa menit.');
        } else if (signUpError.message?.toLowerCase().includes('already')) {
          setError('Email sudah terdaftar. Silakan login atau gunakan email lain.');
        } else {
          setError(signUpError.message);
        }
        return;
      }

      if (!data.user) {
        setError('Gagal membuat akun. Silakan coba lagi.');
        return;
      }

      // Wait for profile creation
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create/verify profile
      const { error: profileError } = await supabase
        .from('user_profiles')
        .upsert({
          id: data.user.id,
          email: email.trim(),
          full_name: fullName,
          restaurant_name: restaurantName,
          phone: phone || '',
          onboarding_completed: false,
        });

      if (profileError) {
        console.error('Profile creation error:', profileError);
      }

      // Create initial restaurant
      const { error: restaurantError } = await supabase
        .from('restaurants')
        .insert({
          name: restaurantName,
          owner_id: data.user.id,
          address: '',
          phone: phone || '',
        });

      if (restaurantError) {
        console.error('Restaurant creation error:', restaurantError);
      }

      if (!data.session) {
        setSuccess('Registrasi berhasil! Silakan cek email Anda untuk verifikasi.');
        setMode('login');
      } else {
        setSuccess('Registrasi berhasil! Mengalihkan ke dashboard...');
        setTimeout(() => {
          router.push('/dashboard');
          router.refresh();
        }, 1000);
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat registrasi');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setError(emailValidation.error);
      return;
    }

    setLoading(true);
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (resetError) {
        if (resetError.message.includes('rate limit')) {
          setError('Terlalu banyak percobaan. Silakan coba lagi nanti.');
        } else {
          setError(resetError.message);
        }
        return;
      }

      setSuccess(`Link reset password telah dikirim ke ${email.trim()}. Silakan cek email Anda.`);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF5A5F]/5 via-white to-[#8B5CF6]/5 flex items-center justify-center p-4 pt-24">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FF5A5F]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#8B5CF6]/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] bg-clip-text text-transparent">
              KadaiPOS
            </h1>
          </Link>
          <p className="text-gray-600 mt-2">
            {mode === 'login' && 'Selamat datang kembali'}
            {mode === 'signup' && 'Mulai kelola bisnis Anda'}
            {mode === 'forgot-password' && 'Reset password Anda'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          {/* Alerts */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-800">{success}</p>
            </div>
          )}

          {/* Login Form */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                      emailError ? 'border-red-300 focus:ring-red-500' : 
                      isEmailValid ? 'border-green-300 focus:ring-green-500' : 
                      'border-gray-300 focus:ring-[#FF5A5F]'
                    } focus:outline-none focus:ring-2 transition-all`}
                    placeholder="nama@email.com"
                    required
                  />
                </div>
                {emailError && <p className="text-xs text-red-600 mt-1 ml-1">{emailError}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
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
                  Lupa password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#FF5A5F] to-[#FF5A5F]/90 text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  'Masuk'
                )}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">atau</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMode('signup')}
                className="w-full text-center text-sm text-gray-600 hover:text-gray-900"
              >
                Belum punya akun? <span className="text-[#FF5A5F] font-semibold">Daftar sekarang</span>
              </button>
            </form>
          )}

          {/* Signup Form */}
          {mode === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      setError('');
                    }}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Bisnis
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={restaurantName}
                    onChange={(e) => {
                      setRestaurantName(e.target.value);
                      setError('');
                    }}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] transition-all"
                    placeholder="Nama Restoran/Toko Anda"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                      emailError ? 'border-red-300 focus:ring-red-500' : 
                      isEmailValid ? 'border-green-300 focus:ring-green-500' : 
                      'border-gray-300 focus:ring-[#FF5A5F]'
                    } focus:outline-none focus:ring-2 transition-all`}
                    placeholder="nama@email.com"
                    required
                  />
                </div>
                {emailError && <p className="text-xs text-red-600 mt-1 ml-1">{emailError}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  No. Telepon
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setError('');
                    }}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] transition-all"
                    placeholder="+62 812-3456-7890"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
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
                    placeholder="Min. 6 karakter"
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

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-xs text-blue-800">
                  📝 Dengan mendaftar, Anda dapat mencoba fitur KadaiPOS dan mengelola bisnis Anda.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#FF5A5F] to-[#FF5A5F]/90 text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Mendaftar...
                  </>
                ) : (
                  'Daftar Sekarang'
                )}
              </button>

              <button
                type="button"
                onClick={() => setMode('login')}
                className="w-full text-center text-sm text-gray-600 hover:text-gray-900"
              >
                Sudah punya akun? <span className="text-[#FF5A5F] font-semibold">Masuk</span>
              </button>
            </form>
          )}

          {/* Forgot Password Form */}
          {mode === 'forgot-password' && (
            <form onSubmit={handleForgotPassword} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                      emailError ? 'border-red-300 focus:ring-red-500' : 
                      isEmailValid ? 'border-green-300 focus:ring-green-500' : 
                      'border-gray-300 focus:ring-[#FF5A5F]'
                    } focus:outline-none focus:ring-2 transition-all`}
                    placeholder="nama@email.com"
                    required
                  />
                </div>
                {emailError && <p className="text-xs text-red-600 mt-1 ml-1">{emailError}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#FF5A5F] to-[#FF5A5F]/90 text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  'Kirim Link Reset'
                )}
              </button>

              <button
                type="button"
                onClick={() => setMode('login')}
                className="w-full text-center text-sm text-gray-600 hover:text-gray-900"
              >
                Kembali ke <span className="text-[#FF5A5F] font-semibold">Login</span>
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <Link href="/" className="hover:text-[#FF5A5F] transition-colors">
            ← Kembali ke Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
