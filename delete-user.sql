-- Delete user gemsdesign88@gmail.com from Supabase
-- Run this in your Supabase SQL Editor

-- Get the user ID first
DO $$
DECLARE
  user_id UUID;
BEGIN
  -- Get user ID
  SELECT id INTO user_id FROM auth.users WHERE email = 'gemsdesign88@gmail.com';
  
  IF user_id IS NOT NULL THEN
    -- Delete from subscriptions
    DELETE FROM public.subscriptions WHERE restaurant_id IN (
      SELECT id FROM public.restaurants WHERE owner_id = user_id
    );
    
    -- Delete from restaurants
    DELETE FROM public.restaurants WHERE owner_id = user_id;
    
    -- Delete from user_profiles
    DELETE FROM public.user_profiles WHERE id = user_id;
    
    -- Delete from auth.users (this will trigger cascade deletes if configured)
    DELETE FROM auth.users WHERE id = user_id;
    
    RAISE NOTICE 'User % deleted successfully', user_id;
  ELSE
    RAISE NOTICE 'User not found';
  END IF;
END $$;

-- Verify deletion from all tables
SELECT 'auth.users' as table_name, COUNT(*) as count FROM auth.users WHERE email = 'gemsdesign88@gmail.com'
UNION ALL
SELECT 'user_profiles', COUNT(*) FROM public.user_profiles WHERE id IN (SELECT id FROM auth.users WHERE email = 'gemsdesign88@gmail.com')
UNION ALL
SELECT 'restaurants', COUNT(*) FROM public.restaurants WHERE owner_id IN (SELECT id FROM auth.users WHERE email = 'gemsdesign88@gmail.com')
UNION ALL
SELECT 'subscriptions', COUNT(*) FROM public.subscriptions WHERE restaurant_id IN (
  SELECT id FROM public.restaurants WHERE owner_id IN (SELECT id FROM auth.users WHERE email = 'gemsdesign88@gmail.com')
);
-- All counts should be 0
