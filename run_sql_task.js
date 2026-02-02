const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjcxMzE1NCwiZXhwIjoyMDc4Mjg5MTU0fQ.GcZT8vuuD_8eOU4pr6X5vYjAnmH81arHOBnQTJbqpZM';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runSqlFile(fileName) {
  const sqlPath = path.join(__dirname, fileName);
  const sql = fs.readFileSync(sqlPath, 'utf8');

  console.log(`Running SQL from ${fileName}...`);
  
  const { data, error } = await supabase.rpc('exec_sql', { sql: sql });

  if (error) {
    console.error('SQL error:', error);
    return false;
  } else {
    console.log('SQL completed successfully');
    return true;
  }
}

async function main() {
    const success = await runSqlFile('create_appointment_task_staff.sql');
    if (success) {
        console.log('Verifying table existence...');
        const { data, error } = await supabase.rpc('exec_sql', { sql: "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'appointment_task_staff');" });
        if (data !== undefined) {
            console.log('Verification result:', data);
        } else if (error) {
            console.log('Verification failed:', error.message);
        }
    }
}

main();
