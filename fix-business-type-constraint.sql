-- Fix business_type constraint to allow 'toko'
-- The error shows the constraint doesn't allow 'toko' value

-- 1. Check current constraint
SELECT 
  conname,
  pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint
WHERE conrelid = 'restaurants'::regclass
  AND conname LIKE '%business_type%';

-- 2. First, check what values currently exist
SELECT DISTINCT business_type FROM restaurants;

-- 3. Update all NULL or invalid business_type to 'resto' (default)
UPDATE restaurants
SET business_type = 'resto'
WHERE business_type IS NULL OR business_type NOT IN ('toko', 'resto');

-- 4. Drop the old constraint
ALTER TABLE restaurants 
DROP CONSTRAINT IF EXISTS restaurants_business_type_check;

-- 5. Add new constraint that allows both 'toko' and 'resto'
ALTER TABLE restaurants
ADD CONSTRAINT restaurants_business_type_check 
CHECK (business_type IN ('toko', 'resto'));

-- 6. Update all NULL or invalid plan_tier to 'starter' (default for resto)
UPDATE restaurants
SET plan_tier = 'starter'
WHERE plan_tier IS NULL OR plan_tier NOT IN ('toko', 'starter', 'growth', 'pro');

-- 7. Also update plan_tier constraint if it exists
ALTER TABLE restaurants 
DROP CONSTRAINT IF EXISTS restaurants_plan_tier_check;

ALTER TABLE restaurants
ADD CONSTRAINT restaurants_plan_tier_check 
CHECK (plan_tier IN ('toko', 'starter', 'growth', 'pro'));

-- 8. Now update your restaurant to toko
UPDATE restaurants
SET 
  business_type = 'toko',
  plan_tier = 'toko'
WHERE id = (
  SELECT id 
  FROM restaurants 
  ORDER BY created_at DESC 
  LIMIT 1
)
RETURNING id, name, business_type, plan_tier;

-- 9. Verify the update
SELECT 
  id,
  name,
  business_type,
  plan_tier
FROM restaurants
ORDER BY created_at DESC;

-- 10. Delete the duplicate resto version of "Alesha Resto"
DELETE FROM restaurants
WHERE id = 'd17cf9ef-f35a-4615-a1a9-d98e333e350f'
RETURNING id, name, business_type, plan_tier;

-- 11. Verify only toko version remains
SELECT 
  id,
  name,
  business_type,
  plan_tier
FROM restaurants
WHERE name = 'Alesha Resto';
