const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjcxMzE1NCwiZXhwIjoyMDc4Mjg5MTU0fQ.GcZT8vuuD_8eOU4pr6X5vYjAnmH81arHOBnQTJbqpZM';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runQueries() {
  const tablesToCheck = ['staff', 'restaurant_staff', 'service_tasks', 'appointment_task_staff'];
  
  console.log('Checking table existence...');
  for (const table of tablesToCheck) {
    const { data: exists, error } = await supabase.rpc('table_exists', { table_name: table });
    if (error) {
      console.error(`Error checking ${table}:`, error.message);
    } else {
      console.log(`Table ${table} exists: ${exists}`);
    }
  }

  console.log('\nChecking columns for appointment_task_staff...');
  const { data, error } = await supabase.from('appointment_task_staff').select('*').limit(1);
  if (error) {
    console.error('Error fetching appointment_task_staff:', error.message);
  } else if (data && data.length > 0) {
    console.log('Found row in appointment_task_staff. Columns:', Object.keys(data[0]));
  } else if (data) {
    console.log('No rows found in appointment_task_staff, but table exists.');
    // To get columns even without rows, we can try to inspect the definition via JS if possible
    // or just assume we can't see them this way.
  }
}

runQueries();
