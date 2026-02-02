const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjcxMzE1NCwiZXhwIjoyMDc4Mjg5MTU0fQ.GcZT8vuuD_8eOU4pr6X5vYjAnmH81arHOBnQTJbqpZM';

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function runCheck() {
  console.log('🔍 Checking schema and sample data for "service_tasks"...\n');

  try {
    // 1. Check service_tasks schema
    const { data: stData, error: stError } = await supabase
      .from('service_tasks')
      .select('*')
      .limit(5);

    if (stError) {
      console.error('❌ Error fetching service_tasks:', stError);
    } else {
      console.log('✅ Found service_tasks data:');
      if (stData.length > 0) {
        console.table(stData);
        console.log('\nColumn names:', Object.keys(stData[0]).join(', '));
      } else {
        console.log('Table exists but is empty.');
      }
    }

    // 2. Check appointment_task_staff records
    console.log('\n🔍 Checking for records in "appointment_task_staff"...\n');
    const { data: atsData, error: atsError, count } = await supabase
      .from('appointment_task_staff')
      .select('*', { count: 'exact' });

    if (atsError) {
      if (atsError.code === '42P01') {
        console.log('❌ Table "appointment_task_staff" does not exist.');
      } else {
        console.error('❌ Error fetching appointment_task_staff:', atsError);
      }
    } else {
      console.log(`✅ Found ${count || atsData.length} records in appointment_task_staff.`);
      if (atsData.length > 0) {
        console.table(atsData.slice(0, 5));
      }
    }

  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

runCheck();
