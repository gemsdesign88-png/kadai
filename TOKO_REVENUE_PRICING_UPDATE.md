# Kadai Toko Revenue-Based Pricing Update

## Overview
Updated Kadai Toko from fixed pricing (49K/month) to revenue-based tiered pricing, similar to Kadai Resto.

## New Pricing Structure

### Tiers Based on Monthly Revenue (Omzet)

| Tier | Monthly Revenue | Monthly Price | Yearly Price | Target Customers |
|------|----------------|---------------|--------------|------------------|
| **Starter** | Rp 0 - 50M | Rp 49K | Rp 529K | Warung, kios, toko kecil, UMKM pemula |
| **Growth** | Rp 50M - 150M | Rp 199K | Rp 2.149K | Minimarket, toko retail, toko baju, toko berkembang |
| **Pro** | > Rp 150M | Rp 349K | Rp 3.769K | Toko besar, multi-cabang, omzet tinggi |

## Important Notes
- **Price is per outlet** (per toko/cabang)
- **No limit on number of devices** - Customers can use unlimited devices/kasir per outlet
- Yearly plans save approximately 10%

## Files Updated

### 1. Database Schema (`update-toko-revenue-based-pricing.sql`)
- Created SQL migration file to update Supabase pricing_plans table
- Changed business_type from 'lite' to 'toko'
- Added 6 new pricing plans (3 tiers x 2 billing cycles)
- Added revenue_min, revenue_max, and revenue_guide columns support
- Updated subscription_plans table if it exists

**To apply**: Run the SQL file in Supabase SQL Editor

### 2. Pricing Page (`src/app/pricing/page.tsx`)
- Updated data fetching logic to handle Toko as revenue-based
- Added tier building logic for Toko (similar to Resto)
- Updated hero card to show price range: "Rp49K - 349K"
- Added new "Toko Pricing Tiers" section displaying all 3 tiers
- Shows revenue ranges for each tier
- Includes note about "Price per outlet, no device limits"

### 3. Translations (`src/lib/i18n/translations.ts`)
- Added `tokoNote2` in all 3 languages (en/id/zh)
- Text: "Price based on monthly revenue" / "Harga berdasarkan omzet bulanan" / "价格基于月收入"

## UI Changes

### Pricing Page Sections
1. **Hero Cards**: Toko card now shows "Rp49K - 349K/bulan" range
2. **Main Pricing Grid**: Toko package displays as revenue-based with tier information
3. **Toko Tiers Section**: New section with:
   - Blue gradient background (brand color #0066FF)
   - 3-column grid showing Starter, Growth, Pro
   - Each tier shows price and revenue range
   - Note explaining per-outlet pricing and unlimited devices

## Business Logic
- Customers choose the appropriate tier based on their monthly revenue
- Same features across all tiers - only price differs based on scale
- Encourages growth: as business revenue increases, they upgrade tiers
- Fair pricing: small businesses pay less, large businesses pay more

## Migration Path
For existing Kadai Toko customers:
- Currently on 49K plan → automatically Starter tier (no change)
- If revenue exceeds 50M/month → should upgrade to Growth
- If revenue exceeds 150M/month → should upgrade to Pro

## Next Steps
1. Run the SQL migration in Supabase
2. Test the pricing page to ensure all tiers display correctly
3. Update marketing materials to reflect new pricing
4. Communicate changes to existing customers
5. Update signup/onboarding flow to ask for estimated monthly revenue
