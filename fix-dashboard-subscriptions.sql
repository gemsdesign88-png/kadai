-- Fix dashboard subscription alignment with register flow
-- This ensures subscription_plans table matches the new packages in register

-- First, check what columns actually exist
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'subscription_plans'
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Then check current subscription_plans data
SELECT *
FROM subscription_plans
ORDER BY plan_tier, duration_months
LIMIT 5;

-- Update subscription_plans to align with register and pricing flow
-- The flow uses plan_tier: 'lite' for Toko, 'starter', 'growth', 'pro' for Resto
-- We have 2 business types: 'toko' and 'resto'

-- Update Toko (Lite) plans (monthly & yearly)
UPDATE subscription_plans
SET 
  plan_tier = 'lite',
  period = CASE 
    WHEN duration_months = 1 THEN 'monthly'
    WHEN duration_months = 12 THEN 'yearly'
    ELSE period
  END,
  is_active = true
WHERE name ILIKE '%lite%' OR id ILIKE '%lite%' OR name ILIKE '%toko%' OR id ILIKE '%toko%';

-- Update Starter plans (monthly & yearly)
UPDATE subscription_plans
SET 
  plan_tier = 'starter',
  period = CASE 
    WHEN duration_months = 1 THEN 'monthly'
    WHEN duration_months = 12 THEN 'yearly'
    ELSE period
  END,
  is_active = true
WHERE name ILIKE '%starter%' OR id ILIKE '%starter%';

-- Update Growth plans (monthly & yearly)
UPDATE subscription_plans
SET 
  plan_tier = 'growth',
  period = CASE 
    WHEN duration_months = 1 THEN 'monthly'
    WHEN duration_months = 12 THEN 'yearly'
    ELSE period
  END,
  is_active = true
WHERE name ILIKE '%growth%' OR id ILIKE '%growth%';

-- Update Pro plans (monthly & yearly)
UPDATE subscription_plans
SET 
  plan_tier = 'pro',
  period = CASE 
    WHEN duration_months = 1 THEN 'monthly'
    WHEN duration_months = 12 THEN 'yearly'
    ELSE period
  END,
  is_active = true
WHERE name ILIKE '%pro%' OR id ILIKE '%pro%';

-- Verify the updates
SELECT *
FROM subscription_plans
WHERE is_active = true
ORDER BY 
  CASE plan_tier
    WHEN 'lite' THEN 1
    WHEN 'starter' THEN 2
    WHEN 'growth' THEN 3
    WHEN 'pro' THEN 4
  END,
  duration_months;

-- Summary: Toko vs Resto packages
SELECT 
  CASE 
    WHEN plan_tier = 'lite' THEN 'Kadai Toko'
    ELSE 'Kadai Resto (' || INITCAP(plan_tier) || ')'
  END as package_name,
  COUNT(*) as plan_count,
  STRING_AGG(name || ' (' || period || ')', ', ' ORDER BY duration_months) as variants
FROM subscription_plans
WHERE is_active = true
GROUP BY plan_tier
ORDER BY 
  CASE plan_tier
    WHEN 'lite' THEN 1
    WHEN 'starter' THEN 2
    WHEN 'growth' THEN 3
    WHEN 'pro' THEN 4
  END;
