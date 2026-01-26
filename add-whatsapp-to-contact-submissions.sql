-- Robust script to ensure contact_submissions table exists and has whatsapp column
DO $$ 
BEGIN
    -- 1. Create table if it doesn't exist
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = 'contact_submissions') THEN
        CREATE TABLE public.contact_submissions (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(255) NOT NULL,
          whatsapp VARCHAR(20),
          subject VARCHAR(255) NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
          status VARCHAR(20) DEFAULT 'new',
          notes TEXT
        );
        
        -- Add index for management
        CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
        CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);

        -- Enable RLS
        ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

        -- Allow public to insert submissions
        EXECUTE 'CREATE POLICY "Allow public inserts into contact_submissions" ON contact_submissions FOR INSERT TO public WITH CHECK (true)';

        -- Allow authenticated users (staff) to manage contact_submissions
        EXECUTE 'CREATE POLICY "Allow authenticated users to manage contact_submissions" ON contact_submissions FOR ALL TO authenticated USING (true) WITH CHECK (true)';
    
    -- 2. If table exists, just check for the whatsapp column
    ELSE
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contact_submissions' AND column_name='whatsapp') THEN
            ALTER TABLE public.contact_submissions ADD COLUMN whatsapp VARCHAR(20);
        END IF;
    END IF;
END $$;
