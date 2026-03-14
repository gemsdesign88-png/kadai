const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjcxMzE1NCwiZXhwIjoyMDc4Mjg5MTU0fQ.GcZT8vuuD_8eOU4pr6X5vYjAnmH81arHOBnQTJbqpZM';

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function checkModifiersData() {
  console.log('🔍 Checking for data in modifer tables...\n');

  try {
    const { data: groups, error: groupsError } = await supabase
      .from('modifier_groups')
      .select('*')
      .limit(5);

    if (groupsError) {
      console.log('❌ Error/Not found modifier_groups:', groupsError.message);
    } else {
      console.log(`✅ modifier_groups has ${groups.length} rows.`);
      if (groups.length > 0) {
        console.log('Sample Group:', groups[0].name);
        const { data: modifiers, error: modsError } = await supabase
          .from('modifiers')
          .select('*')
          .eq('group_id', groups[0].id);
        
        if (modsError) {
          console.log('❌ Error fetching modifiers for group:', modsError.message);
        } else {
          console.log(`✅ modifiers has ${modifiers.length} rows for sample group.`);
          if (modifiers.length > 0) {
            console.log('Sample Modifier:', modifiers[0].name, {
              ingredient_id: modifiers[0].ingredient_id,
              ingredient_quantity: modifiers[0].ingredient_quantity
            });
          }
        }
      }
    }
  } catch (err) {
    console.error('Exception:', err);
  }
}

checkModifiersData();
