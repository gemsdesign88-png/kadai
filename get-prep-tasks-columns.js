
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjcxMzE1NCwiZXhwIjoyMDc4Mjg5MTU0fQ.GcZT8vuuD_8eOU4pr6X5vYjAnmH81arHOBnQTJbqpZM';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const sql = `
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'prep_tasks' 
AND table_schema = 'public';
`;

async function getColumns() {
  console.log('Fetching columns for prep_tasks...');
  const { data, error } = await supabase.rpc('exec_sql', { sql });

  if (error) {
    console.error('Error fetching columns:', error);
  } else {
    console.log('Columns in prep_tasks:');
    console.table(data);
  }
}

getColumns();
