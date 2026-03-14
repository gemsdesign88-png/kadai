const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjcxMzE1NCwiZXhwIjoyMDc4Mjg5MTU0fQ.GcZT8vuuD_8eOU4pr6X5vYjAnmH81arHOBnQTJbqpZM';

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function checkMenuItemsTable() {
  console.log('🔍 Checking schema for "menu_items" table...\n');

  try {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .limit(1);

    if (error) {
      console.error('❌ Error fetching menu_items:', error);
    } else {
      if (data && data.length > 0) {
        const columns = Object.keys(data[0]);
        console.log('✅ Columns in "menu_items":');
        console.log(columns.join(', '));
      } else {
        console.log('Table "menu_items" found but no data to determine columns.');
      }
    }
  } catch (err) {
    console.error('Exception:', err);
  }
}

checkMenuItemsTable();
