const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupMenuItemsRLS() {
  console.log('🔧 Setting up RLS policies for menu_items table...')

  try {
    // Enable RLS if not already enabled
    const { error: enableError } = await supabase.rpc('exec_sql', {
      sql: `ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;`
    })
    if (enableError) {
      console.log('RLS already enabled or error:', enableError.message)
    }

    // Drop existing policies if they exist
    const policies = ['menu_items_select', 'menu_items_insert', 'menu_items_update', 'menu_items_delete']
    for (const policy of policies) {
      await supabase.rpc('exec_sql', {
        sql: `DROP POLICY IF EXISTS ${policy} ON menu_items;`
      })
    }

    // Create SELECT policy
    const { error: selectError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE POLICY menu_items_select ON menu_items
        FOR SELECT USING (
          restaurant_id IN (
            SELECT id FROM restaurants WHERE owner_id = auth.uid()
          )
        );
      `
    })
    if (selectError) throw selectError

    // Create INSERT policy
    const { error: insertError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE POLICY menu_items_insert ON menu_items
        FOR INSERT WITH CHECK (
          restaurant_id IN (
            SELECT id FROM restaurants WHERE owner_id = auth.uid()
          )
        );
      `
    })
    if (insertError) throw insertError

    // Create UPDATE policy
    const { error: updateError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE POLICY menu_items_update ON menu_items
        FOR UPDATE USING (
          restaurant_id IN (
            SELECT id FROM restaurants WHERE owner_id = auth.uid()
          )
        ) WITH CHECK (
          restaurant_id IN (
            SELECT id FROM restaurants WHERE owner_id = auth.uid()
          )
        );
      `
    })
    if (updateError) throw updateError

    // Create DELETE policy
    const { error: deleteError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE POLICY menu_items_delete ON menu_items
        FOR DELETE USING (
          restaurant_id IN (
            SELECT id FROM restaurants WHERE owner_id = auth.uid()
          )
        );
      `
    })
    if (deleteError) throw deleteError

    console.log('✅ RLS policies for menu_items table set up successfully!')

  } catch (error) {
    console.error('❌ Error setting up RLS policies:', error)
  }
}

setupMenuItemsRLS()