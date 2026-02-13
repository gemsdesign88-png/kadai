-- Add metadata column to contact_submissions table
ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

-- Add comment
COMMENT ON COLUMN contact_submissions.metadata IS 'Additional metadata for subscription requests (userId, businessType, outletCount, etc)';
