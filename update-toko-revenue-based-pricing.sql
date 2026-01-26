-- Update Kadai Toko to Revenue-Based Pricing
-- This changes Toko from fixed pricing to tiered pricing based on monthly revenue
-- Run this in your Supabase SQL Editor

-- First, add revenue columns to subscription_plans table if they don't exist
ALTER TABLE subscription_plans 
ADD COLUMN IF NOT EXISTS plan_tier TEXT,
ADD COLUMN IF NOT EXISTS monthly_revenue_min BIGINT,
ADD COLUMN IF NOT EXISTS monthly_revenue_max BIGINT,
ADD COLUMN IF NOT EXISTS revenue_guide TEXT;

-- Update existing rows to set plan_tier to NULL if not already set
UPDATE subscription_plans SET plan_tier = NULL WHERE plan_tier NOT IN ('toko', 'resto', 'pro', 'lite') OR plan_tier IS NULL;

-- Update existing Resto plans to have proper plan_tier
UPDATE subscription_plans 
SET plan_tier = 'resto' 
WHERE (id LIKE 'resto_%' OR id LIKE '%_promo_%' OR id LIKE '%_starter_%' OR id LIKE '%_growth_%')
AND id NOT LIKE 'toko_%'
AND plan_tier IS NULL;

-- Update existing Pro service plans to have proper plan_tier (if they exist with different naming)
UPDATE subscription_plans 
SET plan_tier = 'pro' 
WHERE id LIKE 'pro_%' 
AND id NOT LIKE 'toko_pro%'
AND id NOT LIKE 'resto_pro%'
AND plan_tier IS NULL;

-- Drop the existing check constraint on plan_tier if it exists
ALTER TABLE subscription_plans DROP CONSTRAINT IF EXISTS subscription_plans_plan_tier_check;

-- Add new check constraint that allows 'toko', 'resto', and 'pro'
ALTER TABLE subscription_plans 
ADD CONSTRAINT subscription_plans_plan_tier_check 
CHECK (plan_tier IS NULL OR plan_tier IN ('toko', 'resto', 'pro', 'lite'));

-- Delete old lite plans if they exist
DELETE FROM subscription_plans WHERE plan_tier = 'lite' OR id LIKE 'lite_%';

-- Insert new Toko revenue-based pricing plans
INSERT INTO subscription_plans (
  id, name, icon, price_idr, price_display, period, duration,
  duration_months, color, badge, features, plan_tier,
  monthly_revenue_min, monthly_revenue_max, revenue_guide,
  is_active, sort_order
) VALUES
-- Toko Starter Plans (0-50M revenue)
(
  'toko_starter_monthly',
  'Toko Starter',
  '🏪',
  49000,
  'Rp49K',
  '/bulan',
  '1 bulan',
  1,
  '#0066FF',
  NULL,
  '["Kasir cepat & mudah", "Laporan penjualan", "Manajemen stok", "Cetak struk", "Multi device unlimited", "Support WhatsApp"]'::jsonb,
  'toko',
  0,
  50000000,
  'Rp0 - 50M/bulan',
  true,
  1
),
(
  'toko_starter_yearly',
  'Toko Starter',
  '🏪',
  529000,
  'Rp529K',
  '/tahun',
  '1 tahun',
  12,
  '#0066FF',
  'Hemat ~10%',
  '["Kasir cepat & mudah", "Laporan penjualan", "Manajemen stok", "Cetak struk", "Multi device unlimited", "Support WhatsApp"]'::jsonb,
  'toko',
  0,
  50000000,
  'Rp0 - 50M/bulan',
  true,
  2
),

-- Toko Growth Plans (50-150M revenue)
(
  'toko_growth_monthly',
  'Toko Growth',
  '📈',
  199000,
  'Rp199K',
  '/bulan',
  '1 bulan',
  1,
  '#0066FF',
  NULL,
  '["Semua fitur Starter", "Analitik lanjutan", "Multi outlet", "Manajemen staff", "Integrasi online", "Priority support"]'::jsonb,
  'toko',
  50000000,
  150000000,
  'Rp50M - 150M/bulan',
  true,
  3
),
(
  'toko_growth_yearly',
  'Toko Growth',
  '📈',
  2149000,
  'Rp2.149K',
  '/tahun',
  '1 tahun',
  12,
  '#0066FF',
  'Hemat ~10%',
  '["Semua fitur Starter", "Analitik lanjutan", "Multi outlet", "Manajemen staff", "Integrasi online", "Priority support"]'::jsonb,
  'toko',
  50000000,
  150000000,
  'Rp50M - 150M/bulan',
  true,
  4
),

-- Toko Pro Plans (>150M revenue)
(
  'toko_pro_monthly',
  'Toko Pro',
  '👑',
  349000,
  'Rp349K',
  '/bulan',
  '1 bulan',
  1,
  '#0066FF',
  NULL,
  '["Semua fitur Growth", "Custom features", "Dedicated support", "API access", "White-label option", "Training team"]'::jsonb,
  'toko',
  150000000,
  NULL,
  '> Rp150M/bulan',
  true,
  5
),
(
  'toko_pro_yearly',
  'Toko Pro',
  '👑',
  3769000,
  'Rp3.769K',
  '/tahun',
  '1 tahun',
  12,
  '#0066FF',
  'Hemat ~10%',
  '["Semua fitur Growth", "Custom features", "Dedicated support", "API access", "White-label option", "Training team"]'::jsonb,
  'toko',
  150000000,
  NULL,
  '> Rp150M/bulan',
  true,
  6
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  icon = EXCLUDED.icon,
  price_idr = EXCLUDED.price_idr,
  price_display = EXCLUDED.price_display,
  period = EXCLUDED.period,
  duration = EXCLUDED.duration,
  duration_months = EXCLUDED.duration_months,
  color = EXCLUDED.color,
  badge = EXCLUDED.badge,
  features = EXCLUDED.features,
  plan_tier = EXCLUDED.plan_tier,
  monthly_revenue_min = EXCLUDED.monthly_revenue_min,
  monthly_revenue_max = EXCLUDED.monthly_revenue_max,
  revenue_guide = EXCLUDED.revenue_guide,
  is_active = EXCLUDED.is_active,
  sort_order = EXCLUDED.sort_order,
  updated_at = NOW();

-- Verify the new data
SELECT id, name, plan_tier, period, price_display, revenue_guide, badge
FROM subscription_plans
WHERE plan_tier = 'toko'
ORDER BY sort_order;

-- Show all pricing plans
SELECT id, name, plan_tier, period, price_display, revenue_guide, sort_order
FROM subscription_plans
WHERE is_active = true
ORDER BY plan_tier, sort_order;
