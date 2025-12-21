-- =====================================================
-- KADAIPOS BUSINESS TYPE MIGRATION
-- Add business_type and business_category to restaurants
-- Update trial period to 14 days
-- =====================================================

-- 1. Add new columns to restaurants table
ALTER TABLE restaurants 
ADD COLUMN IF NOT EXISTS business_type TEXT DEFAULT 'resto' CHECK (business_type IN ('lite', 'resto')),
ADD COLUMN IF NOT EXISTS business_category TEXT,
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS plan_tier TEXT DEFAULT 'starter' CHECK (plan_tier IN ('lite', 'starter', 'growth', 'pro'));

-- 2. Update existing restaurants to default 'resto' type (to maintain all features)
UPDATE restaurants 
SET business_type = 'resto', 
    onboarding_completed = true,
    business_category = 'restaurant'
WHERE business_type IS NULL;

-- 3. Create business_categories lookup table
CREATE TABLE IF NOT EXISTS business_categories (
  id TEXT PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_id TEXT NOT NULL,
  name_zh TEXT,
  business_type TEXT NOT NULL CHECK (business_type IN ('lite', 'resto')),
  icon TEXT,
  description_en TEXT,
  description_id TEXT,
  description_zh TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Insert business categories (EN, ID, ZH)
INSERT INTO business_categories (id, name_en, name_id, name_zh, business_type, icon, description_en, description_id, description_zh, sort_order) VALUES
-- LITE CATEGORIES
('warung', 'Small Eatery', 'Warung/Warteg', '小吃摊', 'lite', '🍜', 'Simple food stalls, street food', 'Warung makan sederhana, warteg, pecel lele', '简易食品摊，街头小吃', 1),
('warkop', 'Coffee Stall', 'Warkop/Kopi', '咖啡摊', 'lite', '☕', 'Small coffee shop, street coffee', 'Warung kopi, kedai kopi kecil', '小咖啡店，街头咖啡', 2),
('kios', 'Small Store/Kiosk', 'Kios/Toko Kecil', '小商店/亭', 'lite', '🏪', 'Grocery kiosk, small convenience store', 'Kios sembako, toko kelontong, minimarket kecil', '杂货亭，小型便利店', 3),
('retail_fashion', 'Fashion Retail', 'Toko Baju/Fashion', '时装零售', 'lite', '👕', 'Clothing store, accessories, shoes', 'Toko pakaian, aksesoris, sepatu', '服装店，配饰，鞋类', 4),
('salon_barber_small', 'Salon/Barbershop', 'Salon/Barbershop', '美发/理发店', 'lite', '💇', 'Beauty salon, barbershop, hair cutting', 'Salon kecantikan, barbershop, pangkas rambut', '美容院，理发店，剪发', 5),
('retail_other', 'Other Retail', 'Retail Lainnya', '其他零售', 'lite', '🛍️', 'Other retail stores', 'Toko retail lainnya', '其他零售商店', 6),

-- RESTO CATEGORIES
('cafe_small', 'Small Café', 'Café Kecil', '小咖啡馆', 'resto', '☕', 'Home café, startup coffee shop', 'Café rumahan, coffee shop skala awal', '家庭咖啡馆，初创咖啡店', 10),
('restaurant_small', 'Small Restaurant', 'Restoran Kecil', '小餐厅', 'resto', '🍽️', 'Home restaurant, simple dining', 'Restoran rumahan, RM sederhana', '家庭餐厅，简餐', 11),
('cafe_medium', 'Growing Café', 'Café Berkembang', '成长型咖啡馆', 'resto', '☕', 'Growing café with busy customers', 'Café berkembang dengan customer rame', '客流量大的成长型咖啡馆', 12),
('restaurant_medium', 'Growing Restaurant', 'Restoran Berkembang', '成长型餐厅', 'resto', '🍽️', 'Growing restaurant, multiple outlets', 'Restoran berkembang, multiple outlet', '发展中的餐厅，多店', 13),
('restaurant_premium', 'Premium Restaurant', 'Restoran Premium', '高级餐厅', 'resto', '⭐', 'Fine dining, large restaurant', 'Fine dining, restoran besar', '精致餐饮，大型餐厅', 14),
('food_court', 'Food Court/Canteen', 'Food Court/Kantin', '美食广场/食堂', 'resto', '🏢', 'Food court, school/office canteen', 'Food court, kantin sekolah/kantor', '美食广场，学校/办公室食堂', 15),
('bakery', 'Bakery/Pastry', 'Bakery/Pastry', '面包店/糕点店', 'resto', '🥐', 'Bakery, pastry shop, cakes', 'Toko roti, pastry, kue', '面包店，糕点店，蛋糕', 16)
ON CONFLICT (id) DO NOTHING;

-- 5. Add new columns to existing subscription_plans table (table should already exist)
ALTER TABLE subscription_plans 
ADD COLUMN IF NOT EXISTS plan_tier TEXT CHECK (plan_tier IN ('lite', 'starter', 'growth', 'pro')),
ADD COLUMN IF NOT EXISTS monthly_revenue_min BIGINT,
ADD COLUMN IF NOT EXISTS monthly_revenue_max BIGINT,
ADD COLUMN IF NOT EXISTS suitable_for_id TEXT,
ADD COLUMN IF NOT EXISTS suitable_for_en TEXT,
ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- 6. Delete old plans
DELETE FROM subscription_plans WHERE id IN ('monthly', 'yearly', 'trial');

-- 7. Insert new 4-tier pricing
-- Note: monthly_revenue_min/max values are based on average revenue over last 3 months
-- Note: Using price_idr as default price column (IDR currency)
-- Lite Plan: Simple POS for warung/kios/retail/salon - fixed Rp49K/month
-- Resto Plans: Full restaurant system - pricing based on monthly revenue
--   - Under Rp7M/month: Rp49K (promotional pricing for small restaurants)
--   - Rp7M - Rp50M/month: Rp149K Starter
--   - Rp50M - Rp150M/month: Rp249K Growth
--   - Above Rp150M/month: Rp349K Pro
INSERT INTO subscription_plans (
  id, 
  plan_tier, 
  name,
  icon,
  price_idr,
  price_display,
  period,
  duration,
  color,
  features,
  monthly_revenue_min,
  monthly_revenue_max,
  suitable_for_id,
  suitable_for_en,
  sort_order
) VALUES
-- LITE PLAN (Simple POS - Warung/Kios/Retail/Salon - fixed pricing)
(
  'lite_monthly',
  'lite',
  'Lite',
  '🏪',
  49000,
  'Rp49K/bulan',
  'monthly',
  30,
  '#10b981',
  '["Simple POS", "Order & Payment", "Basic Inventory", "Up to 5 items"]'::jsonb,
  0,
  NULL,
  'Warung, warkop, warteg, kios kecil, toko baju kecil, salon/barber kecil',
  'Small eatery, coffee stall, small store, fashion retail, small salon/barber',
  1
),
(
  'lite_yearly',
  'lite',
  'Lite',
  '🏪',
  529000,
  'Rp529K/tahun',
  'yearly',
  365,
  '#10b981',
  '["Simple POS", "Order & Payment", "Basic Inventory", "Up to 5 items"]'::jsonb,
  0,
  NULL,
  'Warung, warkop, warteg, kios kecil, toko baju kecil, salon/barber kecil',
  'Small eatery, coffee stall, small store, fashion retail, small salon/barber',
  2
),

-- RESTO PROMO (< Rp7 juta/bulan rata-rata 3 bulan terakhir - promotional pricing)
(
  'resto_promo_monthly',
  'lite',
  'Resto Promo',
  '🎁',
  49000,
  'Rp49K/bulan',
  'monthly',
  30,
  '#06b6d4',
  '["Full POS System", "Kitchen Display", "Inventory Management", "Unlimited Items", "Staff Management", "Table Management"]'::jsonb,
  0,
  7000000,
  'Restoran kecil dengan omzet rendah - promo harga khusus',
  'Small restaurant with low revenue - special promotional price',
  3
),
(
  'resto_promo_yearly',
  'lite',
  'Resto Promo',
  '🎁',
  529000,
  'Rp529K/tahun',
  'yearly',
  365,
  '#06b6d4',
  '["Full POS System", "Kitchen Display", "Inventory Management", "Unlimited Items", "Staff Management", "Table Management"]'::jsonb,
  0,
  7000000,
  'Restoran kecil dengan omzet rendah - promo harga khusus',
  'Small restaurant with low revenue - special promotional price',
  4
),

-- RESTO STARTER (Rp7M - Rp50M/bulan rata-rata 3 bulan terakhir)
(
  'starter_monthly',
  'starter',
  'Resto Starter',
  '☕',
  149000,
  'Rp149K/bulan',
  'monthly',
  30,
  '#3b82f6',
  '["Full POS System", "Kitchen Display", "Inventory Management", "Unlimited Items", "Staff Management", "Table Management"]'::jsonb,
  7000001,
  50000000,
  'Café kecil, resto rumahan, coffee shop skala awal',
  'Small café, home restaurant, startup coffee shop - Rp7M-50M/month',
  5
),
(
  'starter_yearly',
  'starter',
  'Resto Starter',
  '☕',
  1599000,
  'Rp1.599M/tahun',
  'yearly',
  365,
  '#3b82f6',
  '["Full POS System", "Kitchen Display", "Inventory Management", "Unlimited Items", "Staff Management", "Table Management"]'::jsonb,
  7000001,
  50000000,
  'Café kecil, resto rumahan, coffee shop skala awal',
  'Small café, home restaurant, startup coffee shop - Rp7M-50M/month',
  6
),

-- RESTO GROWTH (Rp50M - Rp150M/bulan rata-rata 3 bulan terakhir)
(
  'growth_monthly',
  'growth',
  'Resto Growth',
  '📈',
  249000,
  'Rp249K/bulan',
  'monthly',
  30,
  '#8b5cf6',
  '["Full POS System", "Kitchen Display", "Table Management", "Advanced Inventory", "Staff Roles", "Analytics Dashboard", "Multiple Outlets"]'::jsonb,
  50000001,
  150000000,
  'Resto/café berkembang, retail/salon rame',
  'Growing restaurant/café, busy retail/salon - Rp50M-150M/month',
  7
),
(
  'growth_yearly',
  'growth',
  'Resto Growth',
  '📈',
  2689000,
  'Rp2.689M/tahun',
  'yearly',
  365,
  '#8b5cf6',
  '["Full POS System", "Kitchen Display", "Table Management", "Advanced Inventory", "Staff Roles", "Analytics Dashboard", "Multiple Outlets"]'::jsonb,
  50000001,
  150000000,
  'Resto/café berkembang, retail/salon rame',
  'Growing restaurant/café, busy retail/salon - Rp50M-150M/month',
  8
),

-- RESTO PRO (> Rp150M/bulan rata-rata 3 bulan terakhir)
(
  'pro_monthly',
  'pro',
  'Resto Pro',
  '⭐',
  349000,
  'Rp349K/bulan',
  'monthly',
  30,
  '#f59e0b',
  '["Full POS System", "Kitchen Display", "Table Management", "Advanced Inventory", "Staff Roles", "Advanced Analytics", "Multiple Outlets", "Priority Support", "API Access"]'::jsonb,
  150000001,
  NULL,
  'Resto besar, premium, omzet tinggi',
  'Large restaurant, premium, high revenue - above Rp150M/month',
  9
),
(
  'pro_yearly',
  'pro',
  'Resto Pro',
  '⭐',
  3769000,
  'Rp3.769M/tahun',
  'yearly',
  365,
  '#f59e0b',
  '["Full POS System", "Kitchen Display", "Table Management", "Advanced Inventory", "Staff Roles", "Advanced Analytics", "Multiple Outlets", "Priority Support", "API Access"]'::jsonb,
  150000001,
  NULL,
  'Resto besar, premium, omzet tinggi',
  'Large restaurant, premium, high revenue - above Rp150M/month',
  10
)
ON CONFLICT (id) DO UPDATE SET
  plan_tier = EXCLUDED.plan_tier,
  monthly_revenue_min = EXCLUDED.monthly_revenue_min,
  monthly_revenue_max = EXCLUDED.monthly_revenue_max,
  suitable_for_id = EXCLUDED.suitable_for_id,
  suitable_for_en = EXCLUDED.suitable_for_en;

-- 8. Create or update pricing table for multi-currency support
CREATE TABLE IF NOT EXISTS subscription_pricing (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  plan_id TEXT NOT NULL REFERENCES subscription_plans(id) ON DELETE CASCADE,
  currency_code TEXT NOT NULL CHECK (currency_code IN ('IDR', 'USD', 'MYR', 'SAR', 'AED', 'CNY', 'JPY')),
  amount BIGINT NOT NULL CHECK (amount >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(plan_id, currency_code)
);

-- Insert pricing for all plans in all currencies
INSERT INTO subscription_pricing (plan_id, currency_code, amount) VALUES
-- IDR Pricing (Indonesian Rupiah)
('lite_monthly', 'IDR', 49000),
('lite_yearly', 'IDR', 529000),
('resto_promo_monthly', 'IDR', 49000),
('resto_promo_yearly', 'IDR', 529000),
('starter_monthly', 'IDR', 149000),
('starter_yearly', 'IDR', 1599000),
('growth_monthly', 'IDR', 249000),
('growth_yearly', 'IDR', 2689000),
('pro_monthly', 'IDR', 349000),
('pro_yearly', 'IDR', 3769000),
-- USD Pricing (US Dollar)
('lite_monthly', 'USD', 3),
('lite_yearly', 'USD', 35),
('resto_promo_monthly', 'USD', 3),
('resto_promo_yearly', 'USD', 35),
('starter_monthly', 'USD', 10),
('starter_yearly', 'USD', 105),
('growth_monthly', 'USD', 16),
('growth_yearly', 'USD', 175),
('pro_monthly', 'USD', 23),
('pro_yearly', 'USD', 245),
-- MYR Pricing (Malaysian Ringgit)
('lite_monthly', 'MYR', 15),
('lite_yearly', 'MYR', 159),
('resto_promo_monthly', 'MYR', 15),
('resto_promo_yearly', 'MYR', 159),
('starter_monthly', 'MYR', 45),
('starter_yearly', 'MYR', 480),
('growth_monthly', 'MYR', 75),
('growth_yearly', 'MYR', 810),
('pro_monthly', 'MYR', 105),
('pro_yearly', 'MYR', 1135),
-- SAR Pricing (Saudi Riyal)
('lite_monthly', 'SAR', 11),
('lite_yearly', 'SAR', 120),
('resto_promo_monthly', 'SAR', 11),
('resto_promo_yearly', 'SAR', 120),
('starter_monthly', 'SAR', 37),
('starter_yearly', 'SAR', 395),
('growth_monthly', 'SAR', 62),
('growth_yearly', 'SAR', 660),
('pro_monthly', 'SAR', 87),
('pro_yearly', 'SAR', 925),
-- AED Pricing (UAE Dirham)
('lite_monthly', 'AED', 11),
('lite_yearly', 'AED', 120),
('resto_promo_monthly', 'AED', 11),
('resto_promo_yearly', 'AED', 120),
('starter_monthly', 'AED', 37),
('starter_yearly', 'AED', 395),
('growth_monthly', 'AED', 62),
('growth_yearly', 'AED', 660),
('pro_monthly', 'AED', 87),
('pro_yearly', 'AED', 925),
-- CNY Pricing (Chinese Yuan)
('lite_monthly', 'CNY', 22),
('lite_yearly', 'CNY', 235),
('resto_promo_monthly', 'CNY', 22),
('resto_promo_yearly', 'CNY', 235),
('starter_monthly', 'CNY', 72),
('starter_yearly', 'CNY', 770),
('growth_monthly', 'CNY', 120),
('growth_yearly', 'CNY', 1280),
('pro_monthly', 'CNY', 168),
('pro_yearly', 'CNY', 1790),
-- JPY Pricing (Japanese Yen)
('lite_monthly', 'JPY', 450),
('lite_yearly', 'JPY', 4800),
('resto_promo_monthly', 'JPY', 450),
('resto_promo_yearly', 'JPY', 4800),
('starter_monthly', 'JPY', 1450),
('starter_yearly', 'JPY', 15500),
('growth_monthly', 'JPY', 2400),
('growth_yearly', 'JPY', 25600),
('pro_monthly', 'JPY', 3350),
('pro_yearly', 'JPY', 35800)
ON CONFLICT (plan_id, currency_code) DO UPDATE SET
  amount = EXCLUDED.amount,
  updated_at = NOW();

-- Enable RLS for pricing table
ALTER TABLE subscription_pricing ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read pricing (public data)
CREATE POLICY "Anyone can view subscription pricing" ON subscription_pricing
  FOR SELECT USING (true);

-- 9. Create function to check subscription status (14 day trial + subscription end check)
CREATE OR REPLACE FUNCTION check_subscription_access(restaurant_id_param UUID)
RETURNS TABLE (
  has_access BOOLEAN,
  is_trial BOOLEAN,
  days_remaining INTEGER,
  status TEXT,
  reason TEXT
) 
LANGUAGE plpgsql
AS $$
DECLARE
  restaurant_record RECORD;
  trial_end TIMESTAMP;
  subscription_end TIMESTAMP;
  now_time TIMESTAMP := NOW();
BEGIN
  -- Get restaurant subscription info
  SELECT * INTO restaurant_record
  FROM restaurants
  WHERE id = restaurant_id_param;

  IF NOT FOUND THEN
    RETURN QUERY SELECT false, false, 0, 'not_found'::TEXT, 'Restaurant not found'::TEXT;
    RETURN;
  END IF;

  -- Check trial period (14 days from creation)
  trial_end := restaurant_record.created_at + INTERVAL '14 days';
  
  IF restaurant_record.is_trial AND now_time <= trial_end THEN
    -- Still in trial period
    RETURN QUERY SELECT 
      true,
      true,
      EXTRACT(DAY FROM (trial_end - now_time))::INTEGER,
      'trial'::TEXT,
      'Trial period active'::TEXT;
    RETURN;
  END IF;

  -- Check if trial expired and no subscription
  IF restaurant_record.is_trial AND now_time > trial_end AND 
     (restaurant_record.subscription_status IS NULL OR restaurant_record.subscription_status = 'none') THEN
    RETURN QUERY SELECT 
      false,
      true,
      0,
      'trial_expired'::TEXT,
      'Trial period ended, subscription required'::TEXT;
    RETURN;
  END IF;

  -- Check active subscription
  IF restaurant_record.subscription_status = 'active' THEN
    subscription_end := restaurant_record.subscription_ends_at;
    
    IF subscription_end IS NULL OR now_time <= subscription_end THEN
      RETURN QUERY SELECT 
        true,
        false,
        EXTRACT(DAY FROM (subscription_end - now_time))::INTEGER,
        'active'::TEXT,
        'Active subscription'::TEXT;
      RETURN;
    ELSE
      -- Subscription expired
      RETURN QUERY SELECT 
        false,
        false,
        0,
        'expired'::TEXT,
        'Subscription expired'::TEXT;
      RETURN;
    END IF;
  END IF;

  -- No valid access
  RETURN QUERY SELECT 
    false,
    false,
    0,
    'no_subscription'::TEXT,
    'No active subscription'::TEXT;
END;
$$;

-- 10. Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_subscription_pricing_plan ON subscription_pricing(plan_id);
CREATE INDEX IF NOT EXISTS idx_subscription_pricing_currency ON subscription_pricing(currency_code);
CREATE INDEX IF NOT EXISTS idx_restaurants_business_type ON restaurants(business_type);
CREATE INDEX IF NOT EXISTS idx_restaurants_plan_tier ON restaurants(plan_tier);
CREATE INDEX IF NOT EXISTS idx_restaurants_subscription_status ON restaurants(subscription_status);
CREATE INDEX IF NOT EXISTS idx_subscription_plans_tier ON subscription_plans(plan_tier);
CREATE INDEX IF NOT EXISTS idx_business_categories_type ON business_categories(business_type);

-- 11. Add Mandarin (Chinese) column if not exists
ALTER TABLE business_categories 
ADD COLUMN IF NOT EXISTS name_zh TEXT,
ADD COLUMN IF NOT EXISTS description_zh TEXT;

-- 12. Update RLS policies to include business type checks if needed
-- (Add any specific RLS policies here based on your security requirements)

COMMENT ON COLUMN restaurants.business_type IS 'Business type: lite (simple POS) or resto (full restaurant system with all features)';
COMMENT ON COLUMN restaurants.business_category IS 'Detailed business category from business_categories table';
COMMENT ON COLUMN restaurants.plan_tier IS 'Current subscription tier: lite, starter, growth, or pro (pricing based on monthly revenue)';
COMMENT ON COLUMN restaurants.onboarding_completed IS 'Whether user completed onboarding flow';
COMMENT ON COLUMN subscription_plans.monthly_revenue_min IS 'Minimum average monthly revenue over last 3 months (in restaurant''s currency)';
COMMENT ON COLUMN subscription_plans.monthly_revenue_max IS 'Maximum average monthly revenue over last 3 months (in restaurant''s currency)';
COMMENT ON COLUMN business_categories.name_en IS 'Category name in English';
COMMENT ON COLUMN business_categories.name_id IS 'Category name in Bahasa Indonesia';
COMMENT ON COLUMN business_categories.name_zh IS 'Category name in Mandarin Chinese (中文)';
COMMENT ON COLUMN business_categories.description_en IS 'Category description in English';
COMMENT ON COLUMN business_categories.description_id IS 'Category description in Bahasa Indonesia';
COMMENT ON COLUMN business_categories.description_zh IS 'Category description in Mandarin Chinese (中文)';
COMMENT ON TABLE subscription_pricing IS 'Multi-currency pricing for subscription plans (IDR, USD, MYR, SAR, AED, CNY, JPY)';
COMMENT ON COLUMN subscription_pricing.currency_code IS 'Currency code: IDR (Indonesian Rupiah), USD (US Dollar), MYR (Malaysian Ringgit), SAR (Saudi Riyal), AED (UAE Dirham), CNY (Chinese Yuan), JPY (Japanese Yen)';
