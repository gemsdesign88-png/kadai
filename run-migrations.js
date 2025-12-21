import { createClient } from '@supabase/supabase-js'

async function runMigrations() {
  // Use service role key for migrations
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables')
    console.error('Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  try {
    console.log('Running database migrations...')

    // First migration: Add transaction_type and related columns
    console.log('Adding transaction_type column and related fields...')
    const { error: migration1Error } = await supabase.rpc('exec_sql', {
      sql: `
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
      `
    })

    if (migration1Error) {
      console.error('Migration 1 error:', migration1Error)
      throw migration1Error
    }

    console.log('Migration 1 completed successfully')

    // Second migration: Update existing records
    console.log('Updating existing expense records...')
    const { error: migration2Error } = await supabase.rpc('exec_sql', {
      sql: `
        UPDATE expenses
        SET transaction_type = 'expense'
        WHERE transaction_type IS NULL OR transaction_type = '';
      `
    })

    if (migration2Error) {
      console.error('Migration 2 error:', migration2Error)
      throw migration2Error
    }

    console.log('Migration 2 completed successfully')

    // Third migration: Create debts table
    console.log('Creating debts table...')
    const { error: migration3Error } = await supabase.rpc('exec_sql', {
      sql: `
        -- Create debt/liability table for cash flow management
        CREATE TABLE IF NOT EXISTS debts (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
          creditor_name TEXT NOT NULL,
          amount DECIMAL(15, 2) NOT NULL CHECK (amount > 0),
          description TEXT,
          due_date DATE,
          status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'paid', 'overdue')),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
          created_by UUID REFERENCES auth.users(id)
        );

        -- Add indexes for performance
        CREATE INDEX IF NOT EXISTS idx_debts_restaurant_id ON debts(restaurant_id);
        CREATE INDEX IF NOT EXISTS idx_debts_status ON debts(status);
        CREATE INDEX IF NOT EXISTS idx_debts_due_date ON debts(due_date);

        -- Enable RLS
        ALTER TABLE debts ENABLE ROW LEVEL SECURITY;

        -- RLS policies
        CREATE POLICY "Users can view debts from their restaurants" ON debts
          FOR SELECT USING (
            restaurant_id IN (
              SELECT id FROM restaurants WHERE owner_id = auth.uid()
            )
          );

        CREATE POLICY "Users can insert debts for their restaurants" ON debts
          FOR INSERT WITH CHECK (
            restaurant_id IN (
              SELECT id FROM restaurants WHERE owner_id = auth.uid()
            )
          );

        CREATE POLICY "Users can update debts from their restaurants" ON debts
          FOR UPDATE USING (
            restaurant_id IN (
              SELECT id FROM restaurants WHERE owner_id = auth.uid()
            )
          );

        CREATE POLICY "Users can delete debts from their restaurants" ON debts
          FOR DELETE USING (
            restaurant_id IN (
              SELECT id FROM restaurants WHERE owner_id = auth.uid()
            )
          );

        -- Update expenses table to include order_id for linking orders as income
        ALTER TABLE expenses
        ADD COLUMN IF NOT EXISTS order_id UUID REFERENCES orders(id) ON DELETE SET NULL;

        CREATE INDEX IF NOT EXISTS idx_expenses_order_id ON expenses(order_id);
      `
    })

    if (migration3Error) {
      console.error('Migration 3 error:', migration3Error)
      throw migration3Error
    }

    console.log('Migration 3 completed successfully')
    console.log('All migrations completed successfully!')

  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

runMigrations()