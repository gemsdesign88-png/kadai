-- Update Restaurant to Toko Mode
-- This will convert a restaurant business to toko (retail/shop) mode

-- 1. First, see all your restaurants and their current business_type
SELECT 
  id,
  name,
  business_type,
  plan_tier,
  created_at
FROM restaurants
ORDER BY created_at DESC;

-- 2. Update the FIRST restaurant to toko mode
-- (Change this if you want to update a different one)
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

-- 3. Verify the update
SELECT 
  id,
  name,
  business_type,
  plan_tier,
  owner_id
FROM restaurants
WHERE business_type = 'toko';

-- Alternative: Update by restaurant name
-- Uncomment and modify this if you want to update a specific restaurant by name:
/*
UPDATE restaurants
SET 
  business_type = 'toko',
  plan_tier = 'toko'
WHERE name = 'Your Restaurant Name Here'
RETURNING id, name, business_type, plan_tier;
*/

-- Alternative: Update ALL restaurants to toko (USE WITH CAUTION!)
-- Uncomment only if you want to convert ALL restaurants:
/*
UPDATE restaurants
SET 
  business_type = 'toko',
  plan_tier = 'toko'
RETURNING id, name, business_type, plan_tier;
*/
