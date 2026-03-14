const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://bigjlzrnlzcfxwlkstpp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjcxMzE1NCwiZXhwIjoyMDc4Mjg5MTU0fQ.GcZT8vuuD_8eOU4pr6X5vYjAnmH81arHOBnQTJbqpZM',
  { auth: { autoRefreshToken: false, persistSession: false } }
);

async function run() {
  // 1. Menu items with modifier_groups JSONB column populated
  const { data: menuWithMods } = await supabase
    .from('menu_items')
    .select('id, name, has_modifiers, modifier_groups')
    .eq('has_modifiers', true)
    .limit(5);
  console.log('\n=== Menu items with has_modifiers=true ===');
  console.log(JSON.stringify(menuWithMods, null, 2));

  // 2. Recent order_items with modifiers_json set
  const { data: orderItemsWithMods } = await supabase
    .from('order_items')
    .select('id, name, modifiers_json, menu_item_id')
    .not('modifiers_json', 'is', null)
    .order('id', { ascending: false })
    .limit(3);
  console.log('\n=== Recent order_items with modifiers_json ===');
  console.log(JSON.stringify(orderItemsWithMods, null, 2));
}
run().catch(console.error);
