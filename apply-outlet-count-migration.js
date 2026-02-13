const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjcxMzE1NCwiZXhwIjoyMDc4Mjg5MTU0fQ.GcZT8vuuD_8eOU4pr6X5vYjAnmH81arHOBnQTJbqpZM';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
  const sqlString = `
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'user_profiles' 
        AND column_name = 'outlet_count'
    ) THEN
        ALTER TABLE user_profiles ADD COLUMN outlet_count INTEGER DEFAULT 1;
    END IF;
END $$;
  `;

  console.log('Running migration: Adding outlet_count to user_profiles...');
  
  const { data, error } = await supabase.rpc('exec_sql', { sql: sqlString });

  if (error) {
    console.error('Migration error:', error);
  } else {
    console.log('Migration completed successfully');
  }
}

runMigration();
