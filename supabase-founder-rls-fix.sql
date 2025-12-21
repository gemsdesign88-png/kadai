-- Fix RLS policies for founder dashboard to see all data

-- For user_profiles table
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;

-- Allow all authenticated users to view all profiles (for founder dashboard)
CREATE POLICY "Allow authenticated users to view all profiles" ON user_profiles
  FOR SELECT
  TO authenticated
  USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- For restaurants table
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view all restaurants" ON restaurants;
DROP POLICY IF EXISTS "Users can view own restaurants" ON restaurants;
DROP POLICY IF EXISTS "Users can update own restaurants" ON restaurants;

-- Allow all authenticated users to view all restaurants (for founder dashboard)
CREATE POLICY "Allow authenticated users to view all restaurants" ON restaurants
  FOR SELECT
  TO authenticated
  USING (true);

-- Users can update their own restaurants
CREATE POLICY "Users can update own restaurants" ON restaurants
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

-- Users can insert their own restaurants
CREATE POLICY "Users can insert own restaurants" ON restaurants
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);
