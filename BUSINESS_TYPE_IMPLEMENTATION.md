# KadaiPOS Business Type Implementation Guide

## Overview
Implementation of two-tier business model:
- **Lite**: Simple POS for retail, small shops (order → pay → done)
- **Business**: Full restaurant POS with kitchen, table management, etc.

## Changes Summary

### 1. Database Schema (✅ SQL Created)
File: `supabase-business-type-migration.sql`

**New Columns in `restaurants` table:**
- `business_type`: 'lite' | 'business'
- `business_category`: Detailed category (warung, cafe, etc.)
- `plan_tier`: 'lite' | 'starter' | 'growth' | 'pro'
- `onboarding_completed`: Boolean

**New Tables:**
- `business_categories`: Lookup table for business types

**New Pricing Structure:**
| Tier | Monthly | Yearly | Target |
|------|---------|--------|--------|
| Lite | Rp49K | Rp529K | Warung, kios, retail kecil |
| Business Starter | Rp149K | Rp1.599K | Café kecil, resto rumahan |
| Business Growth | Rp249K | Rp2.689K | Resto berkembang |
| Business Pro | Rp349K | Rp3.769K | Resto premium |

**Trial Period:** 14 days (from restaurant creation)

**Subscription Check Function:**
- `check_subscription_access(restaurant_id)`: Returns access status, trial info, days remaining

### 2. Web App Changes (Next.js)

#### A. Registration/Onboarding Flow
**Files to Create/Update:**

1. `/src/app/register/page.tsx` - NEW
   - Multi-step registration
   - Step 1: Account creation (email, password, name)
   - Step 2: Business type selection (Lite vs Business)
   - Step 3: Business details (category, name, phone)
   - Step 4: Plan selection based on business type

2. `/src/app/onboarding/page.tsx` - NEW
   - Post-login onboarding for users who skipped
   - Same flow as registration

3. `/src/components/onboarding/BusinessTypeSelector.tsx` - NEW
   - Visual selector for Lite vs Business
   - Shows feature comparison

4. `/src/components/onboarding/CategorySelector.tsx` - NEW
   - Category selection based on business type
   - Dynamic loading from database

5. `/src/components/onboarding/PlanSelector.tsx` - NEW
   - Shows appropriate plans based on business type
   - Revenue-based recommendations

#### B. Pricing Page Update
**File:** `/src/app/pricing/page.tsx`

Update to show 4-tier pricing with:
- Target audience for each tier
- Revenue ranges
- Monthly vs Yearly toggle
- Clear feature differences between Lite and Business tiers

#### C. Login Page Update
**File:** `/src/app/login/page.tsx`

- Remove signup functionality (keep only login)
- Add "Register" button that routes to `/register`
- Add subscription check after login → redirect to subscription page if expired

#### D. Dashboard Updates
**File:** `/src/app/dashboard/page.tsx`

- Add subscription status check on mount
- Show banner if trial ending soon (< 3 days)
- Redirect to `/subscription-required` if no access

#### E. Subscription Required Page
**File:** `/src/app/subscription-required/page.tsx` - NEW

- Shows when trial expires or subscription ends
- Direct link to payment
- Shows days until trial ends
- Cannot access dashboard without subscribing

### 3. Mobile App Changes (React Native/Expo)

#### A. Remove Signup from Auth
**File:** `/mobile-app/app/auth.tsx`

Changes:
- Remove all signup/registration UI and logic
- Keep only login functionality
- Add "Register on web" message/link
- Remove restaurant creation flow

#### B. Add Subscription Gate
**File:** `/mobile-app/components/SubscriptionGate.tsx` - NEW

Component that wraps app and checks:
- Trial period (14 days)
- Subscription status
- Shows subscription required screen if no access

#### C. Feature Gating Based on Business Type
**File:** `/mobile-app/lib/featureGating.ts` - NEW

```typescript
type BusinessType = 'lite' | 'business';

const FEATURES = {
  // LITE features
  'simple_order': ['lite', 'business'],
  'stock_management': ['lite', 'business'],
  'basic_reporting': ['lite', 'business'],
  'customer_list': ['lite', 'business'],
  
  // BUSINESS only features
  'kitchen_display': ['business'],
  'table_management': ['business'],
  'order_tracking': ['business'],
  'cooking_workflow': ['business'],
  'advanced_analytics': ['business'],
  'staff_roles': ['business'],
  'recipe_management': ['business'],
};

export function hasFeature(
  businessType: BusinessType, 
  feature: keyof typeof FEATURES
): boolean {
  return FEATURES[feature]?.includes(businessType) ?? false;
}
```

#### D. Lite App Mode Implementation

**Files to Update:**

1. `/mobile-app/app/(tabs)/index.tsx` (Dashboard)
   - Check business_type
   - Show simplified dashboard for Lite
   - Hide kitchen stats, table status for Lite

2. `/mobile-app/app/(tabs)/menu-order.tsx`
   - For Lite: Simple flow (add items → calculate → pay → done)
   - For Business: Full flow (table selection, kitchen, etc.)

3. `/mobile-app/app/(tabs)/_layout.tsx`
   - Hide tabs based on business type:
     - Lite: Show only Orders, Menu, Stock, Profile
     - Business: Show all tabs

4. `/mobile-app/contexts/BusinessContext.tsx` - NEW
   ```typescript
   const BusinessContext = createContext({
     businessType: 'business' as BusinessType,
     planTier: 'starter' as PlanTier,
     hasFeature: (feature: string) => true,
     isLite: false,
     isBusiness: true,
   });
   ```

5. Navigation guards for feature-gated screens

#### E. Subscription Required Screen
**File:** `/mobile-app/app/subscription-required.tsx` - NEW

- Shows trial expiration or subscription end
- Deep link to web payment page
- Cannot proceed without subscription

### 4. Implementation Priority

#### Phase 1: Database & Core (Day 1)
- [ ] Run SQL migration
- [ ] Test database functions
- [ ] Verify existing restaurants still work

#### Phase 2: Web Registration (Day 2-3)
- [ ] Create registration flow
- [ ] Build onboarding components
- [ ] Update pricing page
- [ ] Add subscription check logic

#### Phase 3: Mobile App Updates (Day 4-5)
- [ ] Remove signup from mobile
- [ ] Add subscription gate
- [ ] Implement feature gating
- [ ] Create Lite mode UI

#### Phase 4: Testing & Polish (Day 6-7)
- [ ] Test Lite business flow end-to-end
- [ ] Test Business flow still works
- [ ] Test trial expiration
- [ ] Test subscription renewal

### 5. Testing Checklist

#### Database
- [ ] Run migration successfully
- [ ] Existing restaurants maintain 'business' type
- [ ] New restaurants get correct defaults
- [ ] Subscription check function works
- [ ] 14-day trial calculation correct

#### Web App
- [ ] New user can register
- [ ] Business type selection works
- [ ] Category selection dynamic
- [ ] Plan selection shows correct pricing
- [ ] Login redirects expired users
- [ ] Pricing page displays 4 tiers

#### Mobile App - Lite Mode
- [ ] Cannot signup from mobile
- [ ] Login works
- [ ] Simplified dashboard shows
- [ ] Kitchen tab hidden
- [ ] Table management hidden
- [ ] Order flow is simple (no table selection)
- [ ] Stock management visible
- [ ] Can add products
- [ ] Can process orders
- [ ] Payment recorded correctly

#### Mobile App - Business Mode
- [ ] All features still work
- [ ] Kitchen display works
- [ ] Table management works
- [ ] Full order flow works
- [ ] Staff roles work

#### Subscription Flow
- [ ] Trial period 14 days
- [ ] Warning shows at 3 days remaining
- [ ] Access blocked when trial ends
- [ ] Subscription page accessible
- [ ] After payment, access restored
- [ ] Subscription end also blocks access

### 6. API Endpoints Needed

#### Web API Routes
- `POST /api/auth/register` - New user registration with onboarding
- `GET /api/business-categories` - Get categories by type
- `POST /api/onboarding/complete` - Save onboarding data
- `GET /api/subscription/check` - Check access status
- `POST /api/subscription/subscribe` - Process payment

#### Mobile API (if separate)
- Use same endpoints as web
- Deeplink to web for registration

### 7. Environment Variables

Add to both web and mobile `.env`:
```
# Trial period in days
TRIAL_PERIOD_DAYS=14

# Subscription warning threshold
SUBSCRIPTION_WARNING_DAYS=3

# Feature flags
ENABLE_LITE_MODE=true
ENABLE_REGISTRATION_WEB_ONLY=true
```

### 8. Migration Plan for Existing Users

1. All existing restaurants → `business_type='business'`
2. Set `onboarding_completed=true`
3. Default category: `'restaurant'`
4. Maintain current subscription status
5. No disruption to existing users

### 9. Documentation Updates

- [ ] Update user guide with Lite vs Business differences
- [ ] Create onboarding tutorial video
- [ ] Update pricing page copy
- [ ] Add FAQ about business types
- [ ] Document feature comparison

### 10. Support Considerations

- Customer can upgrade from Lite to Business anytime
- Downgrade from Business to Lite requires data review
- Trial applies to first restaurant only
- Multiple restaurants = separate subscriptions

---

## Next Steps

1. **Review & Approve** this implementation plan
2. **Run SQL migration** on staging database first
3. **Build web registration** flow (highest priority)
4. **Update mobile app** to remove signup
5. **Test thoroughly** before production deploy

## Questions to Resolve

1. Can users have multiple restaurants with different business types?
2. Should we allow trial extension in special cases?
3. What happens to data if user downgrades Lite → Business?
4. Grace period after subscription ends?
5. Payment integration - which gateway?
