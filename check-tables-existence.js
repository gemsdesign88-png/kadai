const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjcxMzE1NCwiZXhwIjoyMDc4Mjg5MTU0fQ.GcZT8vuuD_8eOU4pr6X5vYjAnmH81arHOBnQTJbqpZM';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkTables() {
  const tables = ['staff', 'restaurant_staff', 'service_tasks', 'appointment_task_staff', 'appointments'];
  
  for (const table of tables) {
    console.log(`Checking table: ${table}`);
    const { data, error } = await supabase.from(table).select('*').limit(1);
    
    if (error) {
      if (error.code === 'PGRST116' || error.message.includes('not found') || error.message.includes('does not exist')) {
        console.log(`Result: Table "${table}" does NOT exist or is not in schema.`);
      } else {
        console.log(`Result: Table "${table}" found (but error occurred: ${error.message})`);
        if (data) console.log(`Columns for ${table}:`, Object.keys(data[0] || {}));
      }
    } else {
      console.log(`Result: Table "${table}" exists.`);
      if (data && data.length > 0) {
        console.log(`Columns for ${table}:`, Object.keys(data[0]));
      } else {
        // Try to get one row with all columns even if empty? 
        // PostgREST doesn't easily show columns for empty tables without rows.
        console.log(`Columns for ${table}: (table is empty, can't infer columns easily)`);
      }
    }
  }
}

checkTables();
