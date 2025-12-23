'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/i18n/context';
import { createClient } from '@/lib/supabase/client';
import { checkEmailExistsAction } from '@/app/actions/register';

interface AccountCreationProps {
  onComplete: (data: { email: string; password: string; fullName: string; phoneNumber: string }) => void;
  onGoogleLogin?: () => void;
  initialData: {
    email: string;
    password: string;
    fullName: string;
    phoneNumber: string;
  };
  isLoading?: boolean;
}

export default function AccountCreation({ onComplete, onGoogleLogin, initialData, isLoading = false }: AccountCreationProps) {
  const { language, t } = useLanguage();
  const supabase = createClient();
  const [formData, setFormData] = useState(initialData);
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState('+62');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | null>(null);
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpecial: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [lastCheckedEmail, setLastCheckedEmail] = useState<string>('');

  const countryCodes = [
    { code: '+93', country: 'Afghanistan', flag: '🇦🇫' },
    { code: '+355', country: 'Albania', flag: '🇦🇱' },
    { code: '+213', country: 'Algeria', flag: '🇩🇿' },
    { code: '+376', country: 'Andorra', flag: '🇦🇩' },
    { code: '+244', country: 'Angola', flag: '🇦🇴' },
    { code: '+54', country: 'Argentina', flag: '🇦🇷' },
    { code: '+374', country: 'Armenia', flag: '🇦🇲' },
    { code: '+61', country: 'Australia', flag: '🇦🇺' },
    { code: '+43', country: 'Austria', flag: '🇦🇹' },
    { code: '+994', country: 'Azerbaijan', flag: '🇦🇿' },
    { code: '+973', country: 'Bahrain', flag: '🇧🇭' },
    { code: '+880', country: 'Bangladesh', flag: '🇧🇩' },
    { code: '+375', country: 'Belarus', flag: '🇧🇾' },
    { code: '+32', country: 'Belgium', flag: '🇧🇪' },
    { code: '+501', country: 'Belize', flag: '🇧🇿' },
    { code: '+229', country: 'Benin', flag: '🇧🇯' },
    { code: '+975', country: 'Bhutan', flag: '🇧🇹' },
    { code: '+591', country: 'Bolivia', flag: '🇧🇴' },
    { code: '+387', country: 'Bosnia and Herzegovina', flag: '🇧🇦' },
    { code: '+267', country: 'Botswana', flag: '🇧🇼' },
    { code: '+55', country: 'Brazil', flag: '🇧🇷' },
    { code: '+673', country: 'Brunei', flag: '🇧🇳' },
    { code: '+359', country: 'Bulgaria', flag: '🇧🇬' },
    { code: '+226', country: 'Burkina Faso', flag: '🇧🇫' },
    { code: '+257', country: 'Burundi', flag: '🇧🇮' },
    { code: '+855', country: 'Cambodia', flag: '🇰🇭' },
    { code: '+237', country: 'Cameroon', flag: '🇨🇲' },
    { code: '+1', country: 'Canada', flag: '🇨🇦' },
    { code: '+238', country: 'Cape Verde', flag: '🇨🇻' },
    { code: '+236', country: 'Central African Republic', flag: '🇨🇫' },
    { code: '+235', country: 'Chad', flag: '🇹🇩' },
    { code: '+56', country: 'Chile', flag: '🇨🇱' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
    { code: '+57', country: 'Colombia', flag: '🇨🇴' },
    { code: '+269', country: 'Comoros', flag: '🇰🇲' },
    { code: '+242', country: 'Congo', flag: '🇨🇬' },
    { code: '+506', country: 'Costa Rica', flag: '🇨🇷' },
    { code: '+385', country: 'Croatia', flag: '🇭🇷' },
    { code: '+53', country: 'Cuba', flag: '🇨🇺' },
    { code: '+357', country: 'Cyprus', flag: '🇨🇾' },
    { code: '+420', country: 'Czech Republic', flag: '🇨🇿' },
    { code: '+45', country: 'Denmark', flag: '🇩🇰' },
    { code: '+253', country: 'Djibouti', flag: '🇩🇯' },
    { code: '+593', country: 'Ecuador', flag: '🇪🇨' },
    { code: '+20', country: 'Egypt', flag: '🇪🇬' },
    { code: '+503', country: 'El Salvador', flag: '🇸🇻' },
    { code: '+372', country: 'Estonia', flag: '🇪🇪' },
    { code: '+251', country: 'Ethiopia', flag: '🇪🇹' },
    { code: '+679', country: 'Fiji', flag: '🇫🇯' },
    { code: '+358', country: 'Finland', flag: '🇫🇮' },
    { code: '+33', country: 'France', flag: '🇫🇷' },
    { code: '+241', country: 'Gabon', flag: '🇬🇦' },
    { code: '+220', country: 'Gambia', flag: '🇬🇲' },
    { code: '+995', country: 'Georgia', flag: '🇬🇪' },
    { code: '+49', country: 'Germany', flag: '🇩🇪' },
    { code: '+233', country: 'Ghana', flag: '🇬🇭' },
    { code: '+30', country: 'Greece', flag: '🇬🇷' },
    { code: '+502', country: 'Guatemala', flag: '🇬🇹' },
    { code: '+224', country: 'Guinea', flag: '🇬🇳' },
    { code: '+592', country: 'Guyana', flag: '🇬🇾' },
    { code: '+509', country: 'Haiti', flag: '🇭🇹' },
    { code: '+504', country: 'Honduras', flag: '🇭🇳' },
    { code: '+852', country: 'Hong Kong', flag: '🇭🇰' },
    { code: '+36', country: 'Hungary', flag: '🇭🇺' },
    { code: '+354', country: 'Iceland', flag: '🇮🇸' },
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+62', country: 'Indonesia', flag: '🇮🇩' },
    { code: '+98', country: 'Iran', flag: '🇮🇷' },
    { code: '+964', country: 'Iraq', flag: '🇮🇶' },
    { code: '+353', country: 'Ireland', flag: '🇮🇪' },
    { code: '+972', country: 'Israel', flag: '🇮🇱' },
    { code: '+39', country: 'Italy', flag: '🇮🇹' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' },
    { code: '+962', country: 'Jordan', flag: '🇯🇴' },
    { code: '+7', country: 'Kazakhstan', flag: '🇰🇿' },
    { code: '+254', country: 'Kenya', flag: '🇰🇪' },
    { code: '+965', country: 'Kuwait', flag: '🇰🇼' },
    { code: '+996', country: 'Kyrgyzstan', flag: '🇰🇬' },
    { code: '+856', country: 'Laos', flag: '🇱🇦' },
    { code: '+371', country: 'Latvia', flag: '🇱🇻' },
    { code: '+961', country: 'Lebanon', flag: '🇱🇧' },
    { code: '+266', country: 'Lesotho', flag: '🇱🇸' },
    { code: '+231', country: 'Liberia', flag: '🇱🇷' },
    { code: '+218', country: 'Libya', flag: '🇱🇾' },
    { code: '+370', country: 'Lithuania', flag: '🇱🇹' },
    { code: '+352', country: 'Luxembourg', flag: '🇱🇺' },
    { code: '+853', country: 'Macau', flag: '🇲🇴' },
    { code: '+261', country: 'Madagascar', flag: '🇲🇬' },
    { code: '+265', country: 'Malawi', flag: '🇲🇼' },
    { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
    { code: '+960', country: 'Maldives', flag: '🇲🇻' },
    { code: '+223', country: 'Mali', flag: '🇲🇱' },
    { code: '+356', country: 'Malta', flag: '🇲🇹' },
    { code: '+222', country: 'Mauritania', flag: '🇲🇷' },
    { code: '+230', country: 'Mauritius', flag: '🇲🇺' },
    { code: '+52', country: 'Mexico', flag: '🇲🇽' },
    { code: '+373', country: 'Moldova', flag: '🇲🇩' },
    { code: '+377', country: 'Monaco', flag: '🇲🇨' },
    { code: '+976', country: 'Mongolia', flag: '🇲🇳' },
    { code: '+382', country: 'Montenegro', flag: '🇲🇪' },
    { code: '+212', country: 'Morocco', flag: '🇲🇦' },
    { code: '+258', country: 'Mozambique', flag: '🇲🇿' },
    { code: '+95', country: 'Myanmar', flag: '🇲🇲' },
    { code: '+264', country: 'Namibia', flag: '🇳🇦' },
    { code: '+977', country: 'Nepal', flag: '🇳🇵' },
    { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
    { code: '+64', country: 'New Zealand', flag: '🇳🇿' },
    { code: '+505', country: 'Nicaragua', flag: '🇳🇮' },
    { code: '+227', country: 'Niger', flag: '🇳🇪' },
    { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
    { code: '+47', country: 'Norway', flag: '🇳🇴' },
    { code: '+968', country: 'Oman', flag: '🇴🇲' },
    { code: '+92', country: 'Pakistan', flag: '🇵🇰' },
    { code: '+507', country: 'Panama', flag: '🇵🇦' },
    { code: '+675', country: 'Papua New Guinea', flag: '🇵🇬' },
    { code: '+595', country: 'Paraguay', flag: '🇵🇾' },
    { code: '+51', country: 'Peru', flag: '🇵🇪' },
    { code: '+63', country: 'Philippines', flag: '🇵🇭' },
    { code: '+48', country: 'Poland', flag: '🇵🇱' },
    { code: '+351', country: 'Portugal', flag: '🇵🇹' },
    { code: '+974', country: 'Qatar', flag: '🇶🇦' },
    { code: '+40', country: 'Romania', flag: '🇷🇴' },
    { code: '+7', country: 'Russia', flag: '🇷🇺' },
    { code: '+250', country: 'Rwanda', flag: '🇷🇼' },
    { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '+221', country: 'Senegal', flag: '🇸🇳' },
    { code: '+381', country: 'Serbia', flag: '🇷🇸' },
    { code: '+65', country: 'Singapore', flag: '🇸🇬' },
    { code: '+421', country: 'Slovakia', flag: '🇸🇰' },
    { code: '+386', country: 'Slovenia', flag: '🇸🇮' },
    { code: '+252', country: 'Somalia', flag: '🇸🇴' },
    { code: '+27', country: 'South Africa', flag: '🇿🇦' },
    { code: '+82', country: 'South Korea', flag: '🇰🇷' },
    { code: '+34', country: 'Spain', flag: '🇪🇸' },
    { code: '+94', country: 'Sri Lanka', flag: '🇱🇰' },
    { code: '+249', country: 'Sudan', flag: '🇸🇩' },
    { code: '+597', country: 'Suriname', flag: '🇸🇷' },
    { code: '+46', country: 'Sweden', flag: '🇸🇪' },
    { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
    { code: '+963', country: 'Syria', flag: '🇸🇾' },
    { code: '+886', country: 'Taiwan', flag: '🇹🇼' },
    { code: '+992', country: 'Tajikistan', flag: '🇹🇯' },
    { code: '+255', country: 'Tanzania', flag: '🇹🇿' },
    { code: '+66', country: 'Thailand', flag: '🇹🇭' },
    { code: '+228', country: 'Togo', flag: '🇹🇬' },
    { code: '+216', country: 'Tunisia', flag: '🇹🇳' },
    { code: '+90', country: 'Turkey', flag: '🇹🇷' },
    { code: '+993', country: 'Turkmenistan', flag: '🇹🇲' },
    { code: '+256', country: 'Uganda', flag: '🇺🇬' },
    { code: '+380', country: 'Ukraine', flag: '🇺🇦' },
    { code: '+971', country: 'United Arab Emirates', flag: '🇦🇪' },
    { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
    { code: '+1', country: 'United States', flag: '🇺🇸' },
    { code: '+598', country: 'Uruguay', flag: '🇺🇾' },
    { code: '+998', country: 'Uzbekistan', flag: '🇺🇿' },
    { code: '+58', country: 'Venezuela', flag: '🇻🇪' },
    { code: '+84', country: 'Vietnam', flag: '🇻🇳' },
    { code: '+967', country: 'Yemen', flag: '🇾🇪' },
    { code: '+260', country: 'Zambia', flag: '🇿🇲' },
    { code: '+263', country: 'Zimbabwe', flag: '🇿🇼' },
  ];

  const selectedCountry = countryCodes.find(c => c.code === countryCode) || countryCodes[0];
  
  const filteredCountries = countryCodes.filter(country => 
    country.country.toLowerCase().includes(countrySearch.toLowerCase()) ||
    country.code.includes(countrySearch)
  );

  const calculatePasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
    const checks = {
      length: password.length >= 8,
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
    };
    setPasswordChecks(checks);
    const passedChecks = Object.values(checks).filter(Boolean).length;
    if (passedChecks >= 5) return 'strong';
    if (passedChecks >= 3) return 'medium';
    return 'weak';
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = t.register.account.emailRequired;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.register.account.invalidEmail;
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = t.register.account.phoneRequired;
    }

    if (!formData.password) {
      newErrors.password = t.register.account.passwordRequired;
    } else if (formData.password.length < 8) {
      newErrors.password = t.register.account.passwordMinLength;
    }

    if (!formData.fullName) {
      newErrors.fullName = t.register.account.fullNameRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkEmailExists = async (email: string) => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) return;
    
    if (lastCheckedEmail === email) return; // Skip if we just checked this email
    
    setIsCheckingEmail(true);
    setLastCheckedEmail(email);

    try {
      const result = await checkEmailExistsAction(email);
      
      if (result.error) {
        console.error('Error checking email:', result.error);
        // Don't block the user if checking fails
        setErrors(prev => ({ ...prev, email: '' }));
      } else if (result.exists) {
        const message = language === 'id' 
          ? 'Email sudah terdaftar. Silakan masuk.' 
          : language === 'zh'
          ? '此电子邮件已注册。请登录。'
          : 'This email is already registered. Please sign in instead.';
        setErrors(prev => ({ ...prev, email: message }));
      } else {
        // Email is available
        setErrors(prev => ({ ...prev, email: '' }));
      }
    } catch (err) {
      console.error('Error checking email:', err);
      // Don't block the user if checking fails
      setErrors(prev => ({ ...prev, email: '' }));
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Check if there's an email error (email already registered)
      if (errors.email) {
        return;
      }
      // Combine country code with phone number
      const fullPhoneNumber = countryCode + formData.phoneNumber;
      onComplete({ ...formData, phoneNumber: fullPhoneNumber });
    }
  };

  // Check if form is valid for button enable state
  const isFormValid = () => {
    return (
      formData.email &&
      /\S+@\S+\.\S+/.test(formData.email) &&
      !errors.email && // Email should not have errors (not registered)
      formData.phoneNumber &&
      formData.password &&
      formData.password.length >= 8 &&
      formData.fullName &&
      !isCheckingEmail
    );
  };

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error immediately when user starts typing
    if (field === 'email') {
      setErrors(prev => ({ ...prev, email: '' }));
      // Reset lastCheckedEmail so next blur will check the new email
      setLastCheckedEmail('');
      // Don't validate until they blur out of the field
    } else {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    // Calculate password strength
    if (field === 'password' && value) {
      setPasswordStrength(calculatePasswordStrength(value));
    } else if (field === 'password' && !value) {
      setPasswordStrength(null);
    }
  };

  return (
    <div className="p-8 sm:p-12">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.register.account.title}</h2>
          <p className="text-gray-600">{t.register.account.subtitle}</p>
        </div>

        {onGoogleLogin && (
          <>
            <button
              type="button"
              onClick={onGoogleLogin}
              disabled={isLoading}
              className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-50 hover:shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-3 mb-6"
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
              {language === 'id' ? 'Daftar dengan Google' : 'Register with Google'}
            </button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {language === 'id' ? 'Atau daftar manual' : 'Or register manually'}
                </span>
              </div>
            </div>
          </>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              {t.register.account.fullName}
            </label>
            <input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              className={`w-full px-4 py-4 rounded-xl border ${
                errors.fullName ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-[#FF5A5F] focus:ring-[#FF5A5F]'
              } focus:ring-2 focus:ring-opacity-50 transition-colors`}
              placeholder={t.register.account.fullNamePlaceholder}
            />
            {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              {t.register.account.email}
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  updateField('email', e.target.value);
                  // Reset lastCheckedEmail when user types to allow re-checking
                  if (lastCheckedEmail === e.target.value) {
                    setLastCheckedEmail('');
                  }
                }}
                onBlur={() => checkEmailExists(formData.email)}
                className={`w-full px-4 py-4 pr-12 rounded-xl border ${
                  errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-[#FF5A5F] focus:ring-[#FF5A5F]'
                } focus:ring-2 focus:ring-opacity-50 transition-colors`}
                placeholder={t.register.account.emailPlaceholder}
              />
              {isCheckingEmail && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              )}
            </div>
            {errors.email && (
              <div className="mt-1">
                <p className="text-sm text-red-600">{errors.email}</p>
                {errors.email.includes('already registered') && (
                  <a 
                    href="/login" 
                    className="text-sm text-[#FF5A5F] hover:text-[#E04F54] font-medium inline-flex items-center gap-1 mt-1"
                  >
                    {language === 'id' ? 'Masuk ke akun Anda' : language === 'zh' ? '登录到您的账户' : 'Sign in to your account'}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
              {t.register.account.phoneNumber}
            </label>
            <div className="relative flex gap-2">
              {/* Country Code Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  className="h-full px-4 py-4 rounded-xl border border-gray-300 hover:border-gray-400 focus:border-[#FF5A5F] focus:ring-[#FF5A5F] focus:ring-2 focus:ring-opacity-50 transition-colors bg-white flex items-center gap-2 min-w-[130px]"
                >
                  <span className="text-xl">{selectedCountry.flag}</span>
                  <span className="font-medium text-gray-700">{selectedCountry.code}</span>
                  <svg 
                    className={`w-4 h-4 text-gray-500 transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showCountryDropdown && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => {
                        setShowCountryDropdown(false);
                        setCountrySearch('');
                      }}
                    />
                    <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl border border-gray-200 shadow-xl z-20">
                      {/* Search Input */}
                      <div className="p-3 border-b border-gray-200">
                        <div className="relative">
                          <svg 
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                          <input
                            type="text"
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            placeholder="Search country or code..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent text-sm"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      </div>

                      {/* Countries List */}
                      <div className="max-h-80 overflow-y-auto">
                        {filteredCountries.length > 0 ? (
                          filteredCountries.map((country) => (
                            <button
                              key={country.code + country.country}
                              type="button"
                              onClick={() => {
                                setCountryCode(country.code);
                                setShowCountryDropdown(false);
                                setCountrySearch('');
                              }}
                              className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left ${
                                countryCode === country.code ? 'bg-red-50' : ''
                              }`}
                            >
                              <span className="text-2xl">{country.flag}</span>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-gray-900 truncate">{country.country}</div>
                                <div className="text-sm text-gray-500">{country.code}</div>
                              </div>
                              {countryCode === country.code && (
                                <svg className="w-5 h-5 text-[#FF5A5F] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-8 text-center text-gray-500 text-sm">
                            No countries found
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Phone Input */}
              <input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => updateField('phoneNumber', e.target.value)}
                className={`flex-1 px-4 py-4 rounded-xl border ${
                  errors.phoneNumber ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-[#FF5A5F] focus:ring-[#FF5A5F]'
                } focus:ring-2 focus:ring-opacity-50 transition-colors`}
                placeholder="812-3456-7890"
              />
            </div>
            {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              {t.register.account.password}
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => updateField('password', e.target.value)}
                className={`w-full px-4 py-4 rounded-xl border ${
                  errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-[#FF5A5F] focus:ring-[#FF5A5F]'
                } focus:ring-2 focus:ring-opacity-50 transition-colors pr-12`}
                placeholder={t.register.account.passwordPlaceholder}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            
            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-2">
                <div className="flex gap-1 mb-2">
                  <div className={`h-1 flex-1 rounded-full transition-all ${
                    passwordStrength === 'weak' ? 'bg-red-500' : 
                    passwordStrength === 'medium' ? 'bg-yellow-500' : 
                    passwordStrength === 'strong' ? 'bg-green-500' : 'bg-gray-200'
                  }`}></div>
                  <div className={`h-1 flex-1 rounded-full transition-all ${
                    passwordStrength === 'medium' ? 'bg-yellow-500' : 
                    passwordStrength === 'strong' ? 'bg-green-500' : 'bg-gray-200'
                  }`}></div>
                  <div className={`h-1 flex-1 rounded-full transition-all ${
                    passwordStrength === 'strong' ? 'bg-green-500' : 'bg-gray-200'
                  }`}></div>
                </div>
                <p className={`text-xs font-medium ${
                  passwordStrength === 'weak' ? 'text-red-600' : 
                  passwordStrength === 'medium' ? 'text-yellow-600' : 
                  passwordStrength === 'strong' ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {passwordStrength === 'weak' && (language === 'id' ? 'Password Lemah' : language === 'zh' ? '密码弱' : 'Weak Password')}
                  {passwordStrength === 'medium' && (language === 'id' ? 'Password Sedang' : language === 'zh' ? '密码中等' : 'Medium Password')}
                  {passwordStrength === 'strong' && (language === 'id' ? 'Password Kuat' : language === 'zh' ? '密码强' : 'Strong Password')}
                </p>
              </div>
            )}
            
            {/* Password Tips */}
            <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs font-semibold text-gray-700 mb-2">
                {language === 'id' ? 'Tips Password Kuat:' : language === 'zh' ? '强密码提示：' : 'Strong Password Tips:'}
              </p>
              <ul className="space-y-1">
                <li className={`flex items-start gap-2 text-xs transition-colors ${
                  passwordChecks.length ? 'text-green-600' : 'text-gray-600'
                }`}>
                  <span className="mt-0.5">
                    {passwordChecks.length ? '✓' : '•'}
                  </span>
                  <span>{t.register.account.passwordRequirements.length}</span>
                </li>
                <li className={`flex items-start gap-2 text-xs transition-colors ${
                  passwordChecks.hasUpper && passwordChecks.hasLower ? 'text-green-600' : 'text-gray-600'
                }`}>
                  <span className="mt-0.5">
                    {passwordChecks.hasUpper && passwordChecks.hasLower ? '✓' : '•'}
                  </span>
                  <span>{t.register.account.passwordRequirements.mix}</span>
                </li>
                <li className={`flex items-start gap-2 text-xs transition-colors ${
                  passwordChecks.hasNumber ? 'text-green-600' : 'text-gray-600'
                }`}>
                  <span className="mt-0.5">
                    {passwordChecks.hasNumber ? '✓' : '•'}
                  </span>
                  <span>{t.register.account.passwordRequirements.number}</span>
                </li>
                <li className={`flex items-start gap-2 text-xs transition-colors ${
                  passwordChecks.hasSpecial ? 'text-green-600' : 'text-gray-600'
                }`}>
                  <span className="mt-0.5">
                    {passwordChecks.hasSpecial ? '✓' : '•'}
                  </span>
                  <span>{t.register.account.passwordRequirements.special}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid() || isLoading}
            className={`w-full py-4 font-bold rounded-full shadow-lg transition-all duration-200 transform flex items-center justify-center gap-2 ${
              isFormValid() && !isLoading
                ? 'bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6] hover:from-[#E8484D] hover:to-[#7C3AED] text-white shadow-[#FF5A5F]/30 hover:shadow-xl hover:-translate-y-0.5'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{language === 'id' ? 'Memproses...' : 'Processing...'}</span>
              </>
            ) : (
              language === 'id' ? 'Daftar' : language === 'zh' ? '注册' : 'Register'
            )}
          </button>

          {/* Login Link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              {t.register.alreadyHaveAccount}{' '}
              <a 
                href="/login"
                className="text-[#FF5A5F] font-semibold hover:underline transition-colors"
              >
                {t.register.signIn}
              </a>
            </p>
          </div>
        </form>

        {/* Trial Notice */}
        <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-200">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-blue-800">
              <p className="font-medium">{t.register.account.trialNotice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
