-- Force delete gemsdesign88@gmail.com from user_profiles
-- Run this in your Supabase SQL Editor

-- Delete by email
DELETE FROM public.user_profiles WHERE email = 'gemsdesign88@gmail.com';

-- Delete by ID (in case email doesn't match)
DELETE FROM public.user_profiles WHERE id = '1b17d1ad-1223-4fdb-b945-4583bc5e80d4';

-- Delete by full_name (in case the record is different)
DELETE FROM public.user_profiles WHERE full_name = 'Alesha Bahira';

-- Verify deletion
SELECT * FROM public.user_profiles WHERE email = 'gemsdesign88@gmail.com' OR id = '1b17d1ad-1223-4fdb-b945-4583bc5e80d4' OR full_name = 'Alesha Bahira';
-- Should return no rows if successful
