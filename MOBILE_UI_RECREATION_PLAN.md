# Mobile UI Recreation Plan - Exact App Replica

## Goal
Recreate the mobile app's UI components directly on the kadai.id website using React/Next.js - NO screenshots, exact pixel-perfect replicas of the actual app interface.

## Strategy Overview

### Why Not Screenshots?
❌ Static images  
❌ Can't show interaction  
❌ Not responsive  
❌ Outdated when app updates  

### Why Recreate Components?
✅ Interactive and dynamic  
✅ Always up-to-date with design system  
✅ Responsive across devices  
✅ Better performance  
✅ Can show animations  
✅ Professional presentation  

---

## Phase 1: Design System Extraction (2-3 days)

### 1.1 Extract Design Tokens from Mobile App

**Files to Study:**
- `/mobile-app/constants/fonts.ts` - Typography system
- `/mobile-app/app/passwordless-auth.tsx` - Color palette, spacing, shadows
- Any theme files - Colors, borders, radiuses

**Create: `/lib/design-tokens.ts`**
```typescript
export const mobileDesignTokens = {
  colors: {
    // Extract from mobile app StyleSheet
    primary: '#000000',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    border: '#E2E8F0',
    borderFocus: '#000000',
    text: {
      primary: '#121516',
      secondary: '#64748B',
      tertiary: '#94A3B8',
    },
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
  },
  
  typography: {
    fontFamily: {
      regular: 'var(--font-geist-sans)',
      medium: 'var(--font-geist-sans)',
      semibold: 'var(--font-geist-sans)',
      bold: 'var(--font-geist-sans)',
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '32px',
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
  },
  
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.05)',
    md: '0 2px 8px rgba(0, 0, 0, 0.05)',
    lg: '0 4px 12px rgba(0, 0, 0, 0.1)',
    button: '0 4px 12px rgba(0, 0, 0, 0.2)',
  },
  
  dimensions: {
    input: {
      height: '56px',
      padding: '16px',
    },
    button: {
      height: '56px',
      padding: '16px',
    },
  },
};
```

### 1.2 Create Mobile Device Frame Component

**Component: `/components/mobile-ui/MobileDeviceFrame.tsx`**
```tsx
interface MobileDeviceFrameProps {
  children: React.ReactNode;
  device?: 'iphone' | 'android';
  showStatusBar?: boolean;
}

export function MobileDeviceFrame({ 
  children, 
  device = 'iphone',
  showStatusBar = true 
}: MobileDeviceFrameProps) {
  return (
    <div className="relative mx-auto" style={{ maxWidth: '390px' }}>
      {/* Device bezel/frame */}
      <div className="
        relative overflow-hidden
        bg-black rounded-[3rem] p-3
        shadow-2xl
      ">
        {/* Screen */}
        <div className="
          relative overflow-hidden
          bg-[#F8FAFC] rounded-[2.5rem]
          aspect-[9/19.5]
        ">
          {showStatusBar && (
            <div className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-6">
              <span className="text-sm font-semibold">9:41</span>
              <div className="flex gap-1">
                {/* Status icons */}
              </div>
            </div>
          )}
          
          {/* Content */}
          <div className="h-full overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## Phase 2: Recreate Core UI Components (1 week)

### 2.1 Authentication Screen (Example)

**Component: `/components/mobile-ui/screens/LoginScreen.tsx`**
```tsx
import { mobileDesignTokens as tokens } from '@/lib/design-tokens';

export function LoginScreen() {
  return (
    <div 
      className="min-h-screen px-6 py-8 flex flex-col"
      style={{ backgroundColor: tokens.colors.background }}
    >
      {/* Language Switcher */}
      <div className="flex justify-center gap-3 mb-8">
        <button className="px-4 py-2 rounded-full bg-black text-white font-semibold">
          ID
        </button>
        <button className="px-4 py-2 rounded-full bg-white border-2 border-gray-200">
          EN
        </button>
      </div>
      
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-base mb-3" style={{ color: tokens.colors.text.primary }}>
          Welcome to
        </p>
        <div className="mb-4">
          {/* Logo SVG */}
          <svg width="70" height="70" className="mx-auto">
            {/* Your logo */}
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-2">KadaiPOS</h1>
        <p style={{ color: tokens.colors.text.secondary }}>
          Enter your email to continue
        </p>
      </div>
      
      {/* Form */}
      <div className="space-y-3">
        {/* Email Input */}
        <div 
          className="flex items-center gap-3 bg-white rounded-2xl border-2 border-gray-200 px-4"
          style={{ 
            height: tokens.dimensions.input.height,
            boxShadow: tokens.shadows.md 
          }}
        >
          <svg width="20" height="20" className="text-gray-400">
            {/* Mail icon */}
          </svg>
          <input 
            type="email" 
            placeholder="Email address"
            className="flex-1 outline-none text-base"
            style={{ fontWeight: tokens.typography.fontWeight.medium }}
          />
        </div>
        
        {/* Continue Button */}
        <button
          className="w-full flex items-center justify-center gap-2 bg-black text-white rounded-2xl font-bold"
          style={{ 
            height: tokens.dimensions.button.height,
            boxShadow: tokens.shadows.button 
          }}
        >
          <span>Continue</span>
          <svg width="20" height="20">
            {/* Arrow icon */}
          </svg>
        </button>
        
        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-sm text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>
        
        {/* Staff Login Button */}
        <button className="w-full flex items-center justify-center gap-2 bg-gray-100 rounded-2xl">
          <svg width="20" height="20">
            {/* People icon */}
          </svg>
          <span className="font-semibold">Login as Staff</span>
        </button>
      </div>
    </div>
  );
}
```

### 2.2 Table Management Screen (Resto)

**Component: `/components/mobile-ui/screens/resto/TableManagementScreen.tsx`**
```tsx
export function TableManagementScreen() {
  const tables = [
    { id: 1, number: 1, status: 'available', guests: 0 },
    { id: 2, number: 2, status: 'occupied', guests: 4, total: 'Rp 250.000' },
    { id: 3, number: 3, status: 'reserved', guests: 2, time: '19:00' },
    { id: 4, number: 4, status: 'available', guests: 0 },
  ];
  
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Table Management</h1>
        <p className="text-gray-600">Tap a table to manage orders</p>
      </div>
      
      {/* Table Grid */}
      <div className="grid grid-cols-2 gap-4">
        {tables.map(table => (
          <div
            key={table.id}
            className={`
              relative p-6 rounded-2xl border-2 
              ${table.status === 'available' ? 'bg-white border-gray-200' : ''}
              ${table.status === 'occupied' ? 'bg-black text-white border-black' : ''}
              ${table.status === 'reserved' ? 'bg-blue-50 border-blue-200' : ''}
              shadow-md hover:shadow-lg transition-shadow cursor-pointer
            `}
          >
            {/* Table Number */}
            <div className="text-center mb-3">
              <div className="text-4xl font-bold">
                {table.number}
              </div>
            </div>
            
            {/* Status Badge */}
            <div className={`
              text-xs font-semibold px-2 py-1 rounded-full text-center
              ${table.status === 'available' ? 'bg-green-100 text-green-700' : ''}
              ${table.status === 'occupied' ? 'bg-white text-black' : ''}
              ${table.status === 'reserved' ? 'bg-blue-200 text-blue-700' : ''}
            `}>
              {table.status.toUpperCase()}
            </div>
            
            {/* Details */}
            {table.status === 'occupied' && (
              <div className="mt-3 text-sm">
                <div className="flex justify-between">
                  <span>Guests:</span>
                  <span className="font-bold">{table.guests}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Total:</span>
                  <span className="font-bold">{table.total}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 2.3 Product Grid Screen (Toko)

**Component: `/components/mobile-ui/screens/toko/ProductGridScreen.tsx`**
```tsx
export function ProductGridScreen() {
  const products = [
    { id: 1, name: 'Indomie Goreng', price: 3500, stock: 120, image: '🍜' },
    { id: 2, name: 'Aqua 600ml', price: 5000, stock: 85, image: '💧' },
    { id: 3, name: 'Teh Pucuk', price: 4000, stock: 45, image: '🍵' },
    { id: 4, name: 'Kopi ABC', price: 6000, stock: 12, image: '☕' },
  ];
  
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Search Bar */}
      <div className="p-4 bg-white border-b">
        <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3">
          <svg width="20" height="20" className="text-gray-400">
            {/* Search icon */}
          </svg>
          <input 
            placeholder="Search products..."
            className="flex-1 bg-transparent outline-none"
          />
        </div>
      </div>
      
      {/* Product Grid */}
      <div className="p-4 grid grid-cols-2 gap-4">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            {/* Product Image/Icon */}
            <div className="text-5xl text-center mb-3">
              {product.image}
            </div>
            
            {/* Product Name */}
            <h3 className="font-semibold text-sm mb-1 truncate">
              {product.name}
            </h3>
            
            {/* Price */}
            <p className="text-lg font-bold mb-2">
              Rp {product.price.toLocaleString('id-ID')}
            </p>
            
            {/* Stock Badge */}
            <div className={`
              text-xs px-2 py-1 rounded-full inline-block
              ${product.stock > 50 ? 'bg-green-100 text-green-700' : ''}
              ${product.stock <= 50 && product.stock > 20 ? 'bg-yellow-100 text-yellow-700' : ''}
              ${product.stock <= 20 ? 'bg-red-100 text-red-700' : ''}
            `}>
              Stock: {product.stock}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Phase 3: Business-Type Showcases (3-4 days)

### 3.1 Create Feature Showcase Component

**Component: `/components/sections/MobileUIShowcase.tsx`**
```tsx
import { MobileDeviceFrame } from '@/components/mobile-ui/MobileDeviceFrame';

interface MobileUIShowcaseProps {
  title: string;
  description: string;
  screen: React.ReactNode;
  features: string[];
}

export function MobileUIShowcase({ 
  title, 
  description, 
  screen, 
  features 
}: MobileUIShowcaseProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center py-20">
      {/* Mobile Preview */}
      <div className="order-2 lg:order-1">
        <MobileDeviceFrame>
          {screen}
        </MobileDeviceFrame>
      </div>
      
      {/* Feature Description */}
      <div className="order-1 lg:order-2">
        <h2 className="text-4xl font-bold mb-4">{title}</h2>
        <p className="text-xl text-gray-600 mb-6">{description}</p>
        
        <ul className="space-y-3">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5">
                {/* Checkmark icon */}
              </svg>
              <span className="text-lg">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

### 3.2 Integrate into Business Pages

**Update: `/app/(marketing)/business/resto/page.tsx`**
```tsx
import { MobileUIShowcase } from '@/components/sections/MobileUIShowcase';
import { TableManagementScreen } from '@/components/mobile-ui/screens/resto/TableManagementScreen';
import { OrderTakingScreen } from '@/components/mobile-ui/screens/resto/OrderTakingScreen';

export default function RestoPage() {
  return (
    <div>
      {/* Hero section */}
      
      {/* Mobile UI Showcases */}
      <section className="container mx-auto px-4">
        <MobileUIShowcase
          title="Visual Table Management"
          description="Manage your restaurant floor plan with an intuitive visual interface"
          screen={<TableManagementScreen />}
          features={[
            'Real-time table status updates',
            'Drag and drop table arrangement',
            'Track guests and order totals',
            'Color-coded status indicators',
          ]}
        />
        
        <MobileUIShowcase
          title="Fast Order Taking"
          description="Take orders quickly with our streamlined mobile interface"
          screen={<OrderTakingScreen />}
          features={[
            'Category-based menu navigation',
            'Quick item modifiers',
            'Real-time order totals',
            'Send directly to kitchen',
          ]}
        />
      </section>
      
      {/* Rest of page */}
    </div>
  );
}
```

---

## Phase 4: Animations & Interactions (2-3 days)

### 4.1 Add Framer Motion Animations

```tsx
import { motion } from 'framer-motion';

export function TableCard({ table }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="table-card"
    >
      {/* Content */}
    </motion.div>
  );
}
```

### 4.2 Interactive Demo States

- Tables can change status on click
- Products can be "added to cart" with animation
- Form inputs show focus states
- Buttons show hover/active states

---

## Phase 5: Responsive & Performance (2 days)

### 5.1 Responsive Scaling
- Desktop: Show side-by-side comparisons
- Tablet: Centered mobile frames
- Mobile: Full-width, no device frame

### 5.2 Lazy Loading
- Load screens only when in viewport
- Use `next/dynamic` for heavy components

---

## Timeline Summary

- **Phase 1**: Design System Extraction (2-3 days)
- **Phase 2**: Component Recreation (1 week)
- **Phase 3**: Business Showcases (3-4 days)
- **Phase 4**: Animations (2-3 days)
- **Phase 5**: Polish (2 days)

**Total: ~3 weeks**

---

## Advantages Over Screenshots

1. ✅ **Always Current**: UI updates with design system
2. ✅ **Interactive**: Users can see hover/click states
3. ✅ **Responsive**: Adapts to screen sizes
4. ✅ **Fast**: No large image files
5. ✅ **Professional**: Shows attention to detail
6. ✅ **Flexible**: Easy to A/B test variations
7. ✅ **Accurate**: Exact replica, not outdated screenshot

---

## Next Steps

1. Extract design tokens from mobile app
2. Build MobileDeviceFrame component
3. Recreate 3-5 key screens per business type
4. Integrate into existing pages
5. Add animations and interactions
6. Test responsiveness
7. Deploy and measure engagement
