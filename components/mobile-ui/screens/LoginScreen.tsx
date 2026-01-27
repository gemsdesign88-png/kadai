'use client';

import React, { useState } from 'react';
import { mobileDesignTokens, getMobileInputClasses, getMobileButtonClasses } from '@/lib/design-tokens';
import { Mail, ArrowRight, Users } from 'lucide-react';
import Logo from '@/components/Logo';
import KadaiBrand from '@/components/KadaiBrand';
import { MobileScreenContainer } from './MobileDeviceFrame';

/**
 * LoginScreen - Pixel-perfect recreation of mobile app auth screen
 * Source: /mobile-app/app/passwordless-auth.tsx
 */
export function LoginScreen() {
  const [activeLanguage, setActiveLanguage] = useState<'id' | 'en' | 'zh'>('id');
  const [email, setEmail] = useState('');

  return (
    <MobileScreenContainer>
      <div className="min-h-screen px-6 py-8 flex flex-col">
        {/* Language Switcher */}
        <div 
          className="flex justify-center gap-3 pb-4 mb-4"
          style={{ 
            borderBottomWidth: '1px',
            borderBottomColor: mobileDesignTokens.colors.border.default 
          }}
        >
          <button
            onClick={() => setActiveLanguage('id')}
            className={`
              px-4 py-2 rounded-full font-semibold text-sm
              border-2 min-w-[56px] transition-all duration-150
              ${activeLanguage === 'id' 
                ? 'bg-black text-white border-black' 
                : 'bg-white text-gray-700 border-gray-200'
              }
            `}
            style={{ boxShadow: mobileDesignTokens.shadows.sm.boxShadow }}
          >
            ID
          </button>
          <button
            onClick={() => setActiveLanguage('en')}
            className={`
              px-4 py-2 rounded-full font-semibold text-sm
              border-2 min-w-[56px] transition-all duration-150
              ${activeLanguage === 'en' 
                ? 'bg-black text-white border-black' 
                : 'bg-white text-gray-700 border-gray-200'
              }
            `}
            style={{ boxShadow: mobileDesignTokens.shadows.sm.boxShadow }}
          >
            EN
          </button>
          <button
            onClick={() => setActiveLanguage('zh')}
            className={`
              px-4 py-2 rounded-full font-semibold text-sm
              border-2 min-w-[56px] transition-all duration-150
              ${activeLanguage === 'zh' 
                ? 'bg-black text-white border-black' 
                : 'bg-white text-gray-700 border-gray-200'
              }
            `}
            style={{ boxShadow: mobileDesignTokens.shadows.sm.boxShadow }}
          >
            中文
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8 mt-4">
          <p 
            className="text-base mb-3"
            style={{ 
              color: mobileDesignTokens.colors.text.primary,
              fontWeight: mobileDesignTokens.typography.fontWeight.regular
            }}
          >
            Welcome to
          </p>
          
          {/* Logo */}
          <div className="mb-3 flex justify-center">
            <Logo width={70} height={70} color="#000000" />
          </div>
          
          {/* Brand */}
          <div className="mb-5 flex justify-center">
            <KadaiBrand color="#000000" />
          </div>
          
          <p 
            className="text-base"
            style={{ color: mobileDesignTokens.colors.text.secondary }}
          >
            Enter your email to continue
          </p>
        </div>

        {/* Form */}
        <div className="space-y-3">
          {/* Divider */}
          <div className="flex items-center gap-3 mb-3">
            <div 
              className="flex-1 h-px"
              style={{ backgroundColor: mobileDesignTokens.colors.border.default }}
            />
            <span 
              className="text-sm font-medium"
              style={{ color: mobileDesignTokens.colors.text.secondary }}
            >
              atau
            </span>
            <div 
              className="flex-1 h-px"
              style={{ backgroundColor: mobileDesignTokens.colors.border.default }}
            />
          </div>

          {/* Email Input */}
          <div className={getMobileInputClasses()}>
            <Mail size={20} className="text-gray-400" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 outline-none text-base bg-transparent"
              style={{ 
                fontWeight: mobileDesignTokens.typography.fontWeight.medium,
                color: mobileDesignTokens.colors.text.primary
              }}
            />
          </div>

          {/* Continue Button */}
          <button className={getMobileButtonClasses('primary')}>
            <span>Continue</span>
            <ArrowRight size={20} />
          </button>

          {/* Terms */}
          <div className="text-center mt-2">
            <p 
              className="text-sm"
              style={{ color: mobileDesignTokens.colors.text.secondary }}
            >
              By continuing you agree to our{' '}
              <span 
                className="font-semibold underline cursor-pointer"
                style={{ color: mobileDesignTokens.colors.primary }}
              >
                Terms and Conditions
              </span>
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-3">
            <div 
              className="flex-1 h-px"
              style={{ backgroundColor: mobileDesignTokens.colors.border.default }}
            />
            <span 
              className="text-sm font-medium"
              style={{ color: mobileDesignTokens.colors.text.secondary }}
            >
              or
            </span>
            <div 
              className="flex-1 h-px"
              style={{ backgroundColor: mobileDesignTokens.colors.border.default }}
            />
          </div>

          {/* Staff Login Button */}
          <button className={getMobileButtonClasses('secondary')}>
            <Users size={20} />
            <span>Login as Staff</span>
          </button>
        </div>
      </div>
    </MobileScreenContainer>
  );
}
