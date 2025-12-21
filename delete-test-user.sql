-- Delete all data for gemmyadyendra@gmail.com
-- Run this in Supabase SQL Editor

DO $$
DECLARE
  target_email TEXT := 'gemmyadyendra@gmail.com';
  target_user_id UUID;
BEGIN
  -- Get user ID from auth.users
  SELECT id INTO target_user_id 
  FROM auth.users 
  WHERE email = target_email;

  IF target_user_id IS NULL THEN
    RAISE NOTICE 'User with email % not found', target_email;
    RETURN;
  END IF;

  RAISE NOTICE 'Found user ID: %', target_user_id;

  -- Delete subscriptions for user's restaurants
  DELETE FROM subscriptions 
  WHERE restaurant_id IN (
    SELECT id FROM restaurants WHERE owner_id = target_user_id
  );
  RAISE NOTICE 'Deleted subscriptions';

  -- Delete restaurants owned by user
  DELETE FROM restaurants WHERE owner_id = target_user_id;
  RAISE NOTICE 'Deleted restaurants';

  -- Delete user profile
  DELETE FROM user_profiles WHERE id = target_user_id;
  RAISE NOTICE 'Deleted user profile';

  -- Delete from auth.users (this will cascade to other auth tables)
  DELETE FROM auth.users WHERE id = target_user_id;
  RAISE NOTICE 'Deleted auth user';

  RAISE NOTICE 'Successfully deleted all data for %', target_email;
END $$;
