-- Fix RLS policy for contact_submissions table
-- Allow public inserts for contact form submissions

-- Drop existing restrictive policies if any
DROP POLICY IF EXISTS "Allow public insert" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated insert" ON contact_submissions;

-- Create policy to allow anyone to insert (for contact forms and API)
CREATE POLICY "Allow public insert contact submissions"
ON contact_submissions
FOR INSERT
TO public
WITH CHECK (true);

-- Keep existing select policy for admins only
DROP POLICY IF EXISTS "Allow admin select" ON contact_submissions;
CREATE POLICY "Allow admin select contact submissions"
ON contact_submissions
FOR SELECT
TO authenticated
USING (
  auth.jwt() ->> 'email' IN (
    'gemmyadyendra@gmail.com',
    'admin@kadaipos.id',
    'mamak@kadaipos.id'
  )
);

-- Allow admins to update
DROP POLICY IF EXISTS "Allow admin update" ON contact_submissions;
CREATE POLICY "Allow admin update contact submissions"
ON contact_submissions
FOR UPDATE
TO authenticated
USING (
  auth.jwt() ->> 'email' IN (
    'gemmyadyendra@gmail.com',
    'admin@kadaipos.id',
    'mamak@kadaipos.id'
  )
);
