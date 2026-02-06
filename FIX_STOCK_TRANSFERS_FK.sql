-- Fix stock_transfers foreign key constraints
-- The table was incorrectly referencing user_profiles instead of restaurants

-- Drop existing foreign key constraints
ALTER TABLE stock_transfers 
  DROP CONSTRAINT IF EXISTS stock_transfers_from_location_id_fkey;

ALTER TABLE stock_transfers 
  DROP CONSTRAINT IF EXISTS stock_transfers_to_location_id_fkey;

-- Add correct foreign key constraints referencing restaurants table
ALTER TABLE stock_transfers 
  ADD CONSTRAINT stock_transfers_from_location_id_fkey 
  FOREIGN KEY (from_location_id) 
  REFERENCES restaurants(id) 
  ON DELETE RESTRICT;

ALTER TABLE stock_transfers 
  ADD CONSTRAINT stock_transfers_to_location_id_fkey 
  FOREIGN KEY (to_location_id) 
  REFERENCES restaurants(id) 
  ON DELETE RESTRICT;

-- Verify the constraints
SELECT 
  conname AS constraint_name,
  contype AS constraint_type,
  pg_get_constraintdef(oid) AS definition
FROM pg_constraint
WHERE conrelid = 'stock_transfers'::regclass
  AND contype = 'f';
