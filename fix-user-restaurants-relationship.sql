-- Fix user_profiles to show all restaurants for each owner
-- This ensures the relationship between user_profiles and restaurants is correct

-- 1. Check current user_profiles structure and data
SELECT 
  up.id as user_id,
  up.full_name,
  up.email,
  COUNT(r.id) as restaurant_count,
  STRING_AGG(r.name, ', ') as restaurant_names
FROM user_profiles up
LEFT JOIN restaurants r ON r.owner_id = up.id
GROUP BY up.id, up.full_name, up.email
ORDER BY up.created_at DESC;

-- 2. Check if there are any orphaned restaurants (restaurants without user_profiles)
SELECT 
  r.id as restaurant_id,
  r.name as restaurant_name,
  r.owner_id,
  CASE 
    WHEN up.id IS NULL THEN 'NO USER PROFILE'
    ELSE up.full_name
  END as owner_name
FROM restaurants r
LEFT JOIN user_profiles up ON up.id = r.owner_id
ORDER BY r.created_at DESC;

-- 3. Fix: Ensure all restaurants are properly linked to their owners
-- This query will show any restaurants that have owner_id but no matching user_profile
SELECT 
  r.id,
  r.name,
  r.owner_id,
  'Missing user profile' as issue
FROM restaurants r
WHERE r.owner_id IS NOT NULL 
  AND NOT EXISTS (
    SELECT 1 FROM user_profiles up WHERE up.id = r.owner_id
  );

-- 4. Create missing user profiles for restaurants that have owner_id but no profile
-- (This shouldn't happen in the new flow, but fixes legacy data)
INSERT INTO user_profiles (id, full_name, email)
SELECT DISTINCT
  r.owner_id,
  'Owner of ' || r.name,
  'owner_' || r.owner_id || '@kadaipos.id'
FROM restaurants r
WHERE r.owner_id IS NOT NULL 
  AND NOT EXISTS (
    SELECT 1 FROM user_profiles up WHERE up.id = r.owner_id
  )
ON CONFLICT (id) DO NOTHING;

-- 5. Verify the fix - this should show all restaurants per owner
SELECT 
  up.id as user_id,
  up.full_name,
  up.email,
  COUNT(r.id) as total_restaurants,
  JSON_AGG(
    JSON_BUILD_OBJECT(
      'id', r.id,
      'name', r.name,
      'business_type', r.business_type,
      'plan_tier', r.plan_tier,
      'created_at', r.created_at
    ) ORDER BY r.created_at DESC
  ) as restaurants
FROM user_profiles up
LEFT JOIN restaurants r ON r.owner_id = up.id
GROUP BY up.id, up.full_name, up.email
HAVING COUNT(r.id) > 0
ORDER BY up.created_at DESC;

-- 6. Check RLS policies to ensure owners can see all their restaurants
-- Drop and recreate the policy for restaurants SELECT
DROP POLICY IF EXISTS "Users can view own restaurants" ON restaurants;

CREATE POLICY "Users can view own restaurants"
ON restaurants
FOR SELECT
TO authenticated
USING (owner_id = auth.uid());

-- 7. Verify RLS policies are correct
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename IN ('restaurants', 'user_profiles', 'subscriptions')
ORDER BY tablename, policyname;
