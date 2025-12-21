-- Find and delete gemsdesign88@gmail.com from ALL tables
-- Run this in your Supabase SQL Editor

-- Search for tables containing this email
SELECT 
  schemaname || '.' || tablename as full_table_name,
  'DELETE FROM ' || schemaname || '.' || tablename || ' WHERE email = ''gemsdesign88@gmail.com'';' as delete_query
FROM pg_tables
WHERE schemaname IN ('public', 'auth')
AND tablename NOT LIKE 'pg_%'
ORDER BY tablename;

-- Manual cleanup (run these one by one):

-- 1. Delete from auth.users
DELETE FROM auth.users WHERE email = 'gemsdesign88@gmail.com';

-- 2. Delete from user_profiles (if exists)
DELETE FROM public.user_profiles WHERE email = 'gemsdesign88@gmail.com';
DELETE FROM public.user_profiles WHERE id = '1b17d1ad-1223-4fdb-b945-4583bc5e80d4';

-- 3. Delete from restaurants owned by this user
DELETE FROM public.restaurants WHERE owner_id = '1b17d1ad-1223-4fdb-b945-4583bc5e80d4';

-- 4. Delete from subscriptions
DELETE FROM public.subscriptions WHERE restaurant_id IN (
  SELECT id FROM public.restaurants WHERE owner_id = '1b17d1ad-1223-4fdb-b945-4583bc5e80d4'
);

-- Verify - search all tables for this email or user ID
SELECT 'Checking auth.users...' as status;
SELECT * FROM auth.users WHERE email = 'gemsdesign88@gmail.com';

SELECT 'Checking user_profiles...' as status;
SELECT * FROM public.user_profiles WHERE email = 'gemsdesign88@gmail.com' OR id = '1b17d1ad-1223-4fdb-b945-4583bc5e80d4';

SELECT 'Checking restaurants...' as status;
SELECT * FROM public.restaurants WHERE owner_id = '1b17d1ad-1223-4fdb-b945-4583bc5e80d4';
