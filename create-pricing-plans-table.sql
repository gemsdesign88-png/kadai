-- Create pricing_plans table
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.pricing_plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  business_type TEXT NOT NULL CHECK (business_type IN ('lite', 'resto')),
  billing_cycle TEXT NOT NULL CHECK (billing_cycle IN ('monthly', 'yearly')),
  price_idr INTEGER NOT NULL,
  price_display TEXT NOT NULL,
  revenue_min INTEGER,
  revenue_max INTEGER,
  revenue_guide TEXT,
  description TEXT,
  discount_label TEXT,
  is_recommended BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_pricing_plans_business_type ON public.pricing_plans(business_type);
CREATE INDEX IF NOT EXISTS idx_pricing_plans_billing_cycle ON public.pricing_plans(billing_cycle);
CREATE INDEX IF NOT EXISTS idx_pricing_plans_active ON public.pricing_plans(is_active);

-- Enable RLS
ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read active pricing plans
CREATE POLICY "Anyone can view active pricing plans"
ON public.pricing_plans
FOR SELECT
USING (is_active = true);

-- Service role has full access
CREATE POLICY "Service role has full access to pricing_plans"
ON public.pricing_plans
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Insert pricing data
INSERT INTO public.pricing_plans (
  id, name, business_type, billing_cycle, price_idr, price_display, 
  revenue_min, revenue_max, revenue_guide, description, discount_label, 
  is_recommended, sort_order
) VALUES
-- Lite Plans
(
  'lite_monthly', 
  'Lite Monthly', 
  'lite', 
  'monthly', 
  49000, 
  'Rp49K',
  NULL,
  NULL,
  'Skala usaha kecil',
  'Warung, warkop, warteg, kios kecil, toko baju kecil, salon/barber kecil',
  NULL,
  false,
  1
),
(
  'lite_yearly', 
  'Lite Yearly', 
  'lite', 
  'yearly', 
  529000, 
  'Rp529K',
  NULL,
  NULL,
  'Skala usaha kecil',
  'Warung, warkop, warteg, kios kecil, toko baju kecil, salon/barber kecil',
  'Save ~10%',
  true,
  2
),

-- Resto Starter Plans
(
  'starter_monthly', 
  'Starter', 
  'resto', 
  'monthly', 
  149000, 
  'Rp149K',
  0,
  50000000,
  'Rp0 - 50M/month',
  'Café kecil, resto rumahan, coffee shop skala awal',
  NULL,
  false,
  3
),
(
  'starter_yearly', 
  'Starter', 
  'resto', 
  'yearly', 
  1599000, 
  'Rp1.599K',
  0,
  50000000,
  'Rp0 - 50M/month',
  'Café kecil, resto rumahan, coffee shop skala awal',
  'Save ~10%',
  true,
  4
),

-- Resto Growth Plans
(
  'growth_monthly', 
  'Growth', 
  'resto', 
  'monthly', 
  299000, 
  'Rp299K',
  50000000,
  150000000,
  'Rp50M - 150M/month',
  'Resto/café berkembang, retail/salon rame',
  NULL,
  false,
  5
),
(
  'growth_yearly', 
  'Growth', 
  'resto', 
  'yearly', 
  3229000, 
  'Rp3.229K',
  50000000,
  150000000,
  'Rp50M - 150M/month',
  'Resto/café berkembang, retail/salon rame',
  'Save ~10%',
  true,
  6
),

-- Resto Pro Plans
(
  'pro_monthly', 
  'Pro', 
  'resto', 
  'monthly', 
  499000, 
  'Rp499K',
  150000000,
  NULL,
  '> Rp150M/month',
  'Resto besar, premium, omzet tinggi',
  NULL,
  false,
  7
),
(
  'pro_yearly', 
  'Pro', 
  'resto', 
  'yearly', 
  5389000, 
  'Rp5.389K',
  150000000,
  NULL,
  '> Rp150M/month',
  'Resto besar, premium, omzet tinggi',
  'Save ~10%',
  true,
  8
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  business_type = EXCLUDED.business_type,
  billing_cycle = EXCLUDED.billing_cycle,
  price_idr = EXCLUDED.price_idr,
  price_display = EXCLUDED.price_display,
  revenue_min = EXCLUDED.revenue_min,
  revenue_max = EXCLUDED.revenue_max,
  revenue_guide = EXCLUDED.revenue_guide,
  description = EXCLUDED.description,
  discount_label = EXCLUDED.discount_label,
  is_recommended = EXCLUDED.is_recommended,
  sort_order = EXCLUDED.sort_order,
  updated_at = NOW();

-- Add updated_at trigger
CREATE TRIGGER update_pricing_plans_updated_at
BEFORE UPDATE ON public.pricing_plans
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Verify data
SELECT id, name, business_type, billing_cycle, price_display, revenue_guide, is_recommended
FROM public.pricing_plans
ORDER BY sort_order;
