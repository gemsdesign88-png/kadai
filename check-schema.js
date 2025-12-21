
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3MTMxNTQsImV4cCI6MjA3ODI4OTE1NH0.TL7-xrvu1FHwawVaW3XhTztPO37v45Uq9v-kQKFRev0';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  console.log('Checking ingredients table...');
  const { data: ingData, error: ingError } = await supabase
    .from('ingredients')
    .select('*')
    .limit(1);

  if (ingError) {
    console.error('Ingredients Error:', ingError);
  } else {
    console.log('Ingredients Columns:', Object.keys(ingData[0] || {}));
  }

  console.log('\nChecking stock_items table...');
  const { data: stockData, error: stockError } = await supabase
    .from('stock_items')
    .select('*')
    .limit(1);

  if (stockError) {
    console.error('Stock Items Error:', stockError);
  } else {
    console.log('Stock Items Columns:', Object.keys(stockData[0] || {}));
  }
}

checkSchema();
