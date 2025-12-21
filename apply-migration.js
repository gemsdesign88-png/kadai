const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjcxMzE1NCwiZXhwIjoyMDc4Mjg5MTU0fQ.GcZT8vuuD_8eOU4pr6X5vYjAnmH81arHOBnQTJbqpZM';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
  const sqlPath = path.join(__dirname, 'add-stock-columns-to-ingredients.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  console.log('Running migration...');
  
  // We use a trick to run SQL via RPC if exec_sql exists, 
  // otherwise we might need to use a different approach.
  // Since I don't know if exec_sql exists, I'll try it.
  const { data, error } = await supabase.rpc('exec_sql', { sql: sql });

  if (error) {
    if (error.message.includes('function "exec_sql" does not exist')) {
      console.error('Error: exec_sql function does not exist. Please run the SQL manually in Supabase Dashboard.');
      console.log('\nSQL to run:\n');
      console.log(sql);
    } else {
      console.error('Migration error:', error);
    }
  } else {
    console.log('Migration completed successfully');
  }
}

runMigration();
