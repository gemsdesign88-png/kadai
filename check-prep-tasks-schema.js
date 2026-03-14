
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3MTMxNTQsImV4cCI6MjA3ODI4OTE1NH0.TL7-xrvu1FHwawVaW3XhTztPO37v45Uq9v-kQKFRev0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  console.log('Checking prep_tasks table...');
  const { data, error } = await supabase
    .from('prep_tasks')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Prep Tasks Error:', error);
  } else {
    console.log('Prep Tasks Columns:', Object.keys(data[0] || {}));
  }
}

checkSchema();
