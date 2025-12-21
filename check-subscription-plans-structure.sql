-- Check subscription_plans table structure
-- Run this in your Supabase SQL Editor to see the actual columns

SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'subscription_plans'
AND table_schema = 'public'
ORDER BY ordinal_position;
