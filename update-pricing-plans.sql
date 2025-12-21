-- Update subscription_plans with correct pricing
-- Run this in your Supabase SQL Editor

-- Update Lite Monthly
UPDATE public.subscription_plans
SET 
  price_idr = 49000,
  price_display = 'Rp49K',
  suitable_for_id = 'Warung, warkop, warteg, kios kecil, toko baju kecil, salon/barber kecil',
  suitable_for_en = 'Small warung, coffee stall, small shop, small salon/barber',
  monthly_revenue_min = NULL,
  monthly_revenue_max = NULL,
  badge = NULL,
  updated_at = NOW()
WHERE id = 'lite_monthly';

-- Update Lite Yearly
UPDATE public.subscription_plans
SET 
  price_idr = 529000,
  price_display = 'Rp529K',
  suitable_for_id = 'Warung, warkop, warteg, kios kecil, toko baju kecil, salon/barber kecil',
  suitable_for_en = 'Small warung, coffee stall, small shop, small salon/barber',
  monthly_revenue_min = NULL,
  monthly_revenue_max = NULL,
  badge = 'Save ~10%',
  updated_at = NOW()
WHERE id = 'lite_yearly';

-- Update Starter Monthly
UPDATE public.subscription_plans
SET 
  price_idr = 149000,
  price_display = 'Rp149K',
  monthly_revenue_min = 0,
  monthly_revenue_max = 50000000,
  suitable_for_id = 'Café kecil, resto rumahan, coffee shop skala awal',
  suitable_for_en = 'Small café, home restaurant, startup coffee shop',
  badge = NULL,
  updated_at = NOW()
WHERE id = 'starter_monthly';

-- Update Starter Yearly
UPDATE public.subscription_plans
SET 
  price_idr = 1599000,
  price_display = 'Rp1.599K',
  monthly_revenue_min = 0,
  monthly_revenue_max = 50000000,
  suitable_for_id = 'Café kecil, resto rumahan, coffee shop skala awal',
  suitable_for_en = 'Small café, home restaurant, startup coffee shop',
  badge = 'Save ~10%',
  updated_at = NOW()
WHERE id = 'starter_yearly';

-- Update Growth Monthly
UPDATE public.subscription_plans
SET 
  price_idr = 299000,
  price_display = 'Rp299K',
  monthly_revenue_min = 50000000,
  monthly_revenue_max = 150000000,
  suitable_for_id = 'Resto/café berkembang, retail/salon rame',
  suitable_for_en = 'Growing restaurant/café, busy retail/salon',
  badge = NULL,
  updated_at = NOW()
WHERE id = 'growth_monthly';

-- Update Growth Yearly
UPDATE public.subscription_plans
SET 
  price_idr = 3229000,
  price_display = 'Rp3.229K',
  monthly_revenue_min = 50000000,
  monthly_revenue_max = 150000000,
  suitable_for_id = 'Resto/café berkembang, retail/salon rame',
  suitable_for_en = 'Growing restaurant/café, busy retail/salon',
  badge = 'Save ~10%',
  updated_at = NOW()
WHERE id = 'growth_yearly';

-- Update Pro Monthly
UPDATE public.subscription_plans
SET 
  price_idr = 499000,
  price_display = 'Rp499K',
  monthly_revenue_min = 150000000,
  monthly_revenue_max = NULL,
  suitable_for_id = 'Resto besar, premium, omzet tinggi',
  suitable_for_en = 'Large restaurant, premium, high revenue',
  badge = NULL,
  updated_at = NOW()
WHERE id = 'pro_monthly';

-- Update Pro Yearly
UPDATE public.subscription_plans
SET 
  price_idr = 5389000,
  price_display = 'Rp5.389K',
  monthly_revenue_min = 150000000,
  monthly_revenue_max = NULL,
  suitable_for_id = 'Resto besar, premium, omzet tinggi',
  suitable_for_en = 'Large restaurant, premium, high revenue',
  badge = 'Save ~10%',
  updated_at = NOW()
WHERE id = 'pro_yearly';

-- Verify updates
SELECT 
  id, 
  name,
  price_display,
  period,
  monthly_revenue_min,
  monthly_revenue_max,
  suitable_for_id,
  badge
FROM public.subscription_plans
WHERE is_active = true
ORDER BY sort_order;
