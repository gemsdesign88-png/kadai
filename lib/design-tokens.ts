/**
 * Design Tokens extracted from KadaiPOS Mobile App
 * Source: /mobile-app/app/passwordless-auth.tsx & /mobile-app/constants/fonts.ts
 * 
 * These tokens ensure pixel-perfect recreation of mobile UI on web
 */

export const mobileDesignTokens = {
  // Colors - Extracted from mobile app StyleSheet
  colors: {
    primary: '#000000',
    
    background: {
      primary: '#F8FAFC',
      secondary: '#F1F5F9',
      surface: '#FFFFFF',
      warning: '#FEF3C7',
    },
    
    border: {
      default: '#E2E8F0',
      focus: '#000000',
    },
    
    text: {
      primary: '#121516',
      secondary: '#64748B',
      tertiary: '#94A3B8',
      highlight: '#1E293B',
      onDark: '#FFFFFF',
      body: '#373d3f',
    },
    
    status: {
      error: '#EF4444',
      success: '#10B981',
      warning: '#F59E0B',
      warningText: '#92400E',
      info: '#3B82F6',
    },
  },
  
  // Typography - Extracted from fonts.ts
  // Web uses Geist Sans (similar to Plus Jakarta Sans)
  typography: {
    fontFamily: {
      regular: 'var(--font-geist-sans)',
      medium: 'var(--font-geist-sans)',
      semibold: 'var(--font-geist-sans)',
      bold: 'var(--font-geist-sans)',
    },
    
    fontSize: {
      // Mobile px → Web rem/px
      xs: '11px',      // caption
      sm: '12px',      // body small
      base: '14px',    // body medium
      md: '15px',      // medium text
      lg: '16px',      // body large
      xl: '18px',      // heading 2
      '2xl': '20px',   // heading 1
      '3xl': '24px',   // display small
      '4xl': '28px',   // display medium
      '5xl': '32px',   // display large
    },
    
    fontWeight: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    
    lineHeight: {
      tight: '1.2',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  
  // Spacing - Extracted from mobile app padding/margins
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    '4xl': '40px',
    '5xl': '48px',
  },
  
  // Border Radius - Extracted from mobile components
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '22px',
    '3xl': '48px',
    full: '9999px',
  },
  
  // Shadows - Extracted from mobile StyleSheet
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      // Web equivalent
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    button: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    },
  },
  
  // Component Dimensions - Extracted from mobile UI
  dimensions: {
    input: {
      height: '56px',
      padding: '16px',
      borderWidth: '2px',
    },
    button: {
      height: '56px',
      padding: '16px',
      borderRadius: '16px',
    },
    iconCircle: {
      width: '96px',
      height: '96px',
      borderRadius: '48px',
    },
    languageBtn: {
      minWidth: '56px',
      padding: '8px 16px',
      borderRadius: '20px',
      borderWidth: '2px',
    },
  },
  
  // Animation Timings
  transitions: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
} as const;

// Helper function to get mobile-style CSS classes
export function getMobileInputClasses() {
  return `
    flex items-center gap-3
    bg-white rounded-2xl border-2 border-gray-200
    px-4 h-14
    shadow-[0_2px_8px_rgba(0,0,0,0.05)]
    focus-within:border-black
    transition-all duration-150
  `.trim();
}

export function getMobileButtonClasses(variant: 'primary' | 'secondary' = 'primary') {
  const base = `
    w-full flex items-center justify-center gap-2
    rounded-2xl h-14 font-bold
    shadow-[0_4px_12px_rgba(0,0,0,0.2)]
    active:scale-95
    transition-all duration-150
  `.trim();
  
  if (variant === 'primary') {
    return `${base} bg-black text-white`;
  }
  
  return `${base} bg-gray-100 text-black`;
}

export function getMobileCardClasses() {
  return `
    bg-white rounded-2xl p-4
    shadow-[0_2px_8px_rgba(0,0,0,0.05)]
    hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]
    transition-shadow duration-150
  `.trim();
}
