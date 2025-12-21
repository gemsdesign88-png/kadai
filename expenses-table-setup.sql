-- Create expenses table for tracking operational expenses
CREATE TABLE IF NOT EXISTS expenses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL CHECK (category IN ('stock_purchase', 'salary', 'utilities', 'rent', 'marketing', 'equipment', 'inventory', 'other')),
  amount DECIMAL(12,2) NOT NULL CHECK (amount > 0),
  description TEXT,
  date DATE NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_expenses_restaurant_id ON expenses(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(date DESC);
CREATE INDEX IF NOT EXISTS idx_expenses_category ON expenses(category);
CREATE INDEX IF NOT EXISTS idx_expenses_created_by ON expenses(created_by);

-- Enable Row Level Security
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Create policies for expenses table
-- Users can view expenses for restaurants they own
CREATE POLICY "Users can view expenses for own restaurants" ON expenses
  FOR SELECT
  TO authenticated
  USING (
    restaurant_id IN (
      SELECT id FROM restaurants WHERE owner_id = auth.uid()
    )
  );

-- Users can insert expenses for restaurants they own
CREATE POLICY "Users can insert expenses for own restaurants" ON expenses
  FOR INSERT
  TO authenticated
  WITH CHECK (
    restaurant_id IN (
      SELECT id FROM restaurants WHERE owner_id = auth.uid()
    )
    AND created_by = auth.uid()
  );

-- Users can update expenses for restaurants they own
CREATE POLICY "Users can update expenses for own restaurants" ON expenses
  FOR UPDATE
  TO authenticated
  USING (
    restaurant_id IN (
      SELECT id FROM restaurants WHERE owner_id = auth.uid()
    )
  )
  WITH CHECK (
    restaurant_id IN (
      SELECT id FROM restaurants WHERE owner_id = auth.uid()
    )
  );

-- Users can delete expenses for restaurants they own
CREATE POLICY "Users can delete expenses for own restaurants" ON expenses
  FOR DELETE
  TO authenticated
  USING (
    restaurant_id IN (
      SELECT id FROM restaurants WHERE owner_id = auth.uid()
    )
  );

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_expenses_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_expenses_updated_at
  BEFORE UPDATE ON expenses
  FOR EACH ROW
  EXECUTE FUNCTION update_expenses_updated_at();

-- =============================================================================
-- DATA MIGRATION - Jalankan query di bawah ini jika ada data existing
-- =============================================================================

-- Update existing NULL descriptions
UPDATE expenses SET description = 'No description' WHERE description IS NULL;

-- Update existing NULL created_by (set to restaurant owner if available)
UPDATE expenses
SET created_by = restaurants.owner_id
FROM restaurants
WHERE expenses.restaurant_id = restaurants.id
AND expenses.created_by IS NULL;

-- Map old categories to new ones if needed
-- UPDATE expenses SET category = 'stock_purchase' WHERE category = 'inventory';

-- =============================================================================
-- VERIFICATION QUERIES - Jalankan query di bawah ini untuk memverifikasi setup
-- =============================================================================

-- Cek struktur kolom
select column_name, data_type, is_nullable, column_default
from information_schema.columns
where table_schema = 'public' and table_name = 'expenses'
order by ordinal_position;

-- Cek index
select indexname, indexdef
from pg_indexes
where schemaname = 'public' and tablename = 'expenses';

-- Cek status RLS
select relrowsecurity, relforcerowsecurity
from pg_class
where relname = 'expenses';

-- Daftar policy RLS
select policyname, cmd, roles, qual, with_check
from pg_policies
where schemaname = 'public' and tablename = 'expenses';

-- Siapa user yang aktif (untuk debug RLS)
select auth.uid() as current_uid;

-- Sampel data
select * from expenses limit 10;