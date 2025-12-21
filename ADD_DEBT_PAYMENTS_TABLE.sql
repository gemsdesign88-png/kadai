-- Add debt payments tracking table
-- This allows tracking partial and full debt payments

-- Create debt_payments table
CREATE TABLE IF NOT EXISTS debt_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  debt_id UUID NOT NULL REFERENCES debts(id) ON DELETE CASCADE,
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
  payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  transaction_id UUID REFERENCES expenses(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_debt_payments_debt_id ON debt_payments(debt_id);
CREATE INDEX IF NOT EXISTS idx_debt_payments_restaurant_id ON debt_payments(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_debt_payments_payment_date ON debt_payments(payment_date);
CREATE INDEX IF NOT EXISTS idx_debt_payments_transaction_id ON debt_payments(transaction_id);

-- Add new columns to debts table (safe - won't error if already exists)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='debts' AND column_name='amount_paid') THEN
    ALTER TABLE debts ADD COLUMN amount_paid DECIMAL(10, 2) NOT NULL DEFAULT 0;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='debts' AND column_name='remaining_amount') THEN
    ALTER TABLE debts ADD COLUMN remaining_amount DECIMAL(10, 2) NOT NULL DEFAULT 0;
  END IF;
END $$;

-- Update existing debts to set remaining_amount = amount for active debts
UPDATE debts 
SET remaining_amount = amount, amount_paid = 0
WHERE (remaining_amount IS NULL OR remaining_amount = 0) AND status != 'paid';

-- Add RLS policies for debt_payments
ALTER TABLE debt_payments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid errors on re-run)
DROP POLICY IF EXISTS "Users can view debt payments for their restaurants" ON debt_payments;
DROP POLICY IF EXISTS "Users can insert debt payments for their restaurants" ON debt_payments;
DROP POLICY IF EXISTS "Users can update debt payments for their restaurants" ON debt_payments;
DROP POLICY IF EXISTS "Users can delete debt payments for their restaurants" ON debt_payments;

-- Policy: Users can view debt payments for their restaurants
CREATE POLICY "Users can view debt payments for their restaurants"
  ON debt_payments FOR SELECT
  USING (
    restaurant_id IN (
      SELECT id FROM restaurants WHERE owner_id = auth.uid()
    )
  );

-- Policy: Users can insert debt payments for their restaurants
CREATE POLICY "Users can insert debt payments for their restaurants"
  ON debt_payments FOR INSERT
  WITH CHECK (
    restaurant_id IN (
      SELECT id FROM restaurants WHERE owner_id = auth.uid()
    )
  );

-- Policy: Users can update debt payments for their restaurants
CREATE POLICY "Users can update debt payments for their restaurants"
  ON debt_payments FOR UPDATE
  USING (
    restaurant_id IN (
      SELECT id FROM restaurants WHERE owner_id = auth.uid()
    )
  );

-- Policy: Users can delete debt payments for their restaurants
CREATE POLICY "Users can delete debt payments for their restaurants"
  ON debt_payments FOR DELETE
  USING (
    restaurant_id IN (
      SELECT id FROM restaurants WHERE owner_id = auth.uid()
    )
  );

-- Create trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_debt_payments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS debt_payments_updated_at ON debt_payments;
CREATE TRIGGER debt_payments_updated_at
  BEFORE UPDATE ON debt_payments
  FOR EACH ROW
  EXECUTE FUNCTION update_debt_payments_updated_at();

-- Function to calculate debt totals (useful for validation)
CREATE OR REPLACE FUNCTION calculate_debt_totals(debt_uuid UUID)
RETURNS TABLE (
  total_paid DECIMAL,
  remaining DECIMAL,
  payment_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(SUM(dp.amount), 0) as total_paid,
    d.amount - COALESCE(SUM(dp.amount), 0) as remaining,
    COUNT(dp.id) as payment_count
  FROM debts d
  LEFT JOIN debt_payments dp ON dp.debt_id = d.id
  WHERE d.id = debt_uuid
  GROUP BY d.id, d.amount;
END;
$$ LANGUAGE plpgsql;

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON debt_payments TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
