const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjcxMzE1NCwiZXhwIjoyMDc4Mjg5MTU0fQ.GcZT8vuuD_8eOU4pr6X5vYjAnmH81arHOBnQTJbqpZM';

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function checkServiceTasks() {
  console.log('🔍 Checking for service_tasks table...\n');

  try {
    // Check if table exists and get columns using RPC if available, or just try to select
    // A better way to check schema is using a query via the SQL API if available, 
    // but the JS client doesn't directly expose information_schema easily without RPC.
    // We can try to fetch one row and see if it fails.
    
    const { data: columns, error: colError } = await supabase
      .rpc('get_table_columns', { table_name: 'service_tasks' });

    if (colError) {
      // If RPC fails, try a direct select to see if table exists
      console.log('RPC get_table_columns not available or failed. Trying direct select...');
      const { data, error } = await supabase
        .from('service_tasks')
        .select('*')
        .limit(1);

      if (error) {
        if (error.code === '42P01') {
          console.log('❌ table "service_tasks" does not exist.');
        } else {
          console.error('❌ Error checking service_tasks table:', error);
        }
        return;
      }
      
      console.log('✅ table "service_tasks" exists.');
      // Since we don't have columns, we can infer some from the data if any
      if (data && data.length > 0) {
        console.log('Table columns (inferred from first row):', Object.keys(data[0]).join(', '));
      } else {
        console.log('Table exists but is empty. Cannot infer columns.');
      }
    } else {
      console.log('✅ table "service_tasks" exists.');
      console.log('Columns:', columns);
    }

    // Get some rows for a recent service
    // We'll first find a service ID that has tasks
    const { data: recentTasks, error: taskError } = await supabase
      .from('service_tasks')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (taskError) {
      console.error('❌ Error fetching recent tasks:', taskError);
    } else if (recentTasks && recentTasks.length > 0) {
      console.log(`\n📋 Recent Service Tasks (${recentTasks.length} found):`);
      console.table(recentTasks);
    } else {
      console.log('\n📭 No rows found in service_tasks table.');
    }

  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

checkServiceTasks();
