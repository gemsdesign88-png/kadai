-- Check what period values exist in subscription_plans table
SELECT 
  id,
  name,
  period,
  duration,
  duration_months,
  plan_tier,
  is_active
FROM subscription_plans
ORDER BY plan_tier, duration_months;
