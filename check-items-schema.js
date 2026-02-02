const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjcxMzE1NCwiZXhwIjoyMDc4Mjg5MTU0fQ.GcZT8vuuD_8eOU4pr6X5vYjAnmH81arHOBnQTJbqpZM';

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function checkItemsSchema() {
  console.log('🔍 Checking schema for "items" table...\n');

  try {
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .limit(1);

    if (error) {
      console.error('❌ Error fetching items:', error);
    } else {
      if (data.length > 0) {
        const columns = Object.keys(data[0]);
        console.log('✅ Found items data.');
        console.log('\nColumn names in "items" table:');
        console.log(columns.join(', '));
        
        const targetColumns = ['use_purchase_conversion', 'purchase_unit', 'conversion_factor'];
        console.log('\nChecking for target columns:');
        targetColumns.forEach(col => {
          if (columns.includes(col)) {
            console.log(`- ${col}: PRESENT`);
          } else {
            console.log(`- ${col}: MISSING`);
          }
        });
      } else {
        console.log('Table "items" exists but is empty. Cannot determine columns via select * limit 1 if empty.');
        // Plan B: try to insert and catch error, or use RPC if available, or just use another table if we can't find columns here.
        // Actually, in Supabase we can query information_schema if we have enough permissions.
        const { data: schemaData, error: schemaError } = await supabase.rpc('get_table_columns', { table_name: 'items' });
        if (schemaError) {
           // If RPC fails, try a direct query to information_schema via a trick if possible, 
           // but usually restricted. Let's try to query the first row again or just check if it's empty.
           console.log('Trying to get columns via a different method...');
           const { data: colsData, error: colsError } = await supabase.from('items').select().limit(0);
           if (colsError) {
             console.error('Error:', colsError);
           } else {
             // Sometimes select().limit(0) returns headers in some clients, but likely not here.
           }
        }
      }
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

checkItemsSchema();
