-- Create demo_requests table
CREATE TABLE IF NOT EXISTS demo_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  whatsapp VARCHAR(20) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  notified BOOLEAN DEFAULT false
);

-- Add indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_demo_requests_created_at ON demo_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_demo_requests_notified ON demo_requests(notified);

-- Enable Row Level Security
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;

-- TEMPORARILY DISABLE RLS FOR TESTING (remove this later if you want stricter security)
-- Or keep it simple and just use application-level security
ALTER TABLE demo_requests DISABLE ROW LEVEL SECURITY;

-- Drop existing policies first
DROP POLICY IF EXISTS "Allow public inserts" ON demo_requests;
DROP POLICY IF EXISTS "Allow authenticated users to view all" ON demo_requests;
DROP POLICY IF EXISTS "Allow authenticated users to update" ON demo_requests;

-- Create policy to allow anyone (anon or authenticated) to insert
CREATE POLICY "Enable insert for all users" ON demo_requests
  FOR INSERT
  WITH CHECK (true);

-- Create policy for authenticated users to view all records
CREATE POLICY "Enable read for authenticated users" ON demo_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to update notified status
CREATE POLICY "Enable update for authenticated users" ON demo_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
