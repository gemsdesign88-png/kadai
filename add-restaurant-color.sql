-- Add primary_color column to restaurants table
ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS primary_color TEXT;

-- Update the specific restaurant with blue color
UPDATE restaurants SET primary_color = '#3B82F6' WHERE id = '3af205f4-aa37-4ec8-878f-eb6399dcfcea';