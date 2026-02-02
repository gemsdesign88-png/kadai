const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjcxMzE1NCwiZXhwIjoyMDc4Mjg5MTU0fQ.GcZT8vuuD_8eOU4pr6X5vYjAnmH81arHOBnQTJbqpZM';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runSql() {
  const sql = `
CREATE TABLE IF NOT EXISTS appointment_task_staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID REFERENCES appointments(id) ON DELETE CASCADE,
    service_task_id UUID REFERENCES service_tasks(id) ON DELETE CASCADE,
    staff_id UUID REFERENCES staff(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE appointment_task_staff ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN 
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'appointment_task_staff' AND policyname = 'Allow authenticated users full access'
    ) THEN
        CREATE POLICY "Allow authenticated users full access" ON appointment_task_staff
        FOR ALL TO authenticated USING (true) WITH CHECK (true);
    END IF;
END $$;
`;

  console.log('Running SQL to create appointment_task_staff...');
  const { data, error } = await supabase.rpc('exec_sql', { sql: sql });

  if (error) {
    console.error('Error executing SQL:', error);
    process.exit(1);
  } else {
    console.log('SQL executed successfully');
  }
}

runSql();
