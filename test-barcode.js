const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3MTMxNTQsImV4cCI6MjA3ODI4OTE1NH0.TL7-xrvu1FHwawVaW3XhTztPO37v45Uq9v-kQKFRev0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testQuery() {
  console.log('Testing query for barcode column...');
  const { data, error } = await supabase
    .from('ingredients')
    .select('barcode')
    .limit(1);

  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('Success! Barcode column exists.');
  }
}

testQuery();
