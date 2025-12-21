import { createClient } from './src/lib/supabase/server'

async function runMigration() {
  const supabase = createClient()

  try {
    const { error } = await supabase.rpc('exec_sql', {
      sql: `
        ALTER TABLE expenses
        ADD COLUMN IF NOT EXISTS ingredient_id UUID REFERENCES ingredients(id) ON DELETE SET NULL,
        ADD COLUMN IF NOT EXISTS quantity DECIMAL(10, 2);

        CREATE INDEX IF NOT EXISTS idx_expenses_ingredient_id ON expenses(ingredient_id);
      `
    })

    if (error) {
      console.error('Migration error:', error)
    } else {
      console.log('Migration completed successfully')
    }
  } catch (err) {
    console.error('Error running migration:', err)
  }
}

runMigration()