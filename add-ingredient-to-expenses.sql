-- Add transaction type and update expenses table
-- This allows expenses to be categorized as income or expense

-- Add missing timestamp columns if they don't exist
ALTER TABLE expenses
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now());

-- Add the new columns
ALTER TABLE expenses
ADD COLUMN IF NOT EXISTS transaction_type VARCHAR(10) DEFAULT 'expense' CHECK (transaction_type IN ('income', 'expense')),
ADD COLUMN IF NOT EXISTS ingredient_id UUID REFERENCES ingredients(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS quantity DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS employee_id TEXT;

-- Update existing records to have transaction_type
UPDATE expenses SET transaction_type = 'expense' WHERE transaction_type IS NULL;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_expenses_transaction_type ON expenses(transaction_type);
CREATE INDEX IF NOT EXISTS idx_expenses_ingredient_id ON expenses(ingredient_id);
CREATE INDEX IF NOT EXISTS idx_expenses_employee_id ON expenses(employee_id);

-- Update RLS policies to allow new columns access
-- (The existing policies should work since they reference the expenses table)