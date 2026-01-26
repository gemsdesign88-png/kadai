-- Create contact_submissions table for marketing site leads
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  whatsapp VARCHAR(20),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  status VARCHAR(20) DEFAULT 'new', -- new, read, replied, archived
  notes TEXT
);

-- Add index for management
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public to insert submissions
CREATE POLICY "Allow public inserts into contact_submissions" 
ON contact_submissions FOR INSERT 
TO public 
WITH CHECK (true);

-- Allow authenticated users (staff) to read/update
CREATE POLICY "Allow authenticated users to manage contact_submissions" 
ON contact_submissions FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);
