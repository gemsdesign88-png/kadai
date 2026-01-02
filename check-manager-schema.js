const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjcxMzE1NCwiZXhwIjoyMDc4Mjg5MTU0fQ.GcZT8vuuD_8eOU4pr6X5vYjAnmH81arHOBnQTJbqpZM';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkManagerSchema() {
  console.log('Checking restaurants table structure...');
  const { data: restoData, error: restoError } = await supabase
    .from('restaurants')
    .select('*')
    .limit(1);

  if (restoError) {
    console.error('Restaurants Error:', restoError);
  } else if (restoData.length > 0) {
    console.log('Restaurants Columns:', Object.keys(restoData[0]));
    console.log('Sample Restaurant:', JSON.stringify(restoData[0], null, 2));
  } else {
    console.log('Restaurants table is empty or no access');
  }

  console.log('\nChecking restaurant_staff table structure...');
  const { data: staffData, error: staffError } = await supabase
    .from('restaurant_staff')
    .select('*')
    .limit(5);

  if (staffError) {
    console.error('Restaurant Staff Error:', staffError);
  } else if (staffData.length > 0) {
    console.log('Restaurant Staff Columns:', Object.keys(staffData[0]));
    console.log('Sample Staff Records:', JSON.stringify(staffData, null, 2));
  } else {
    console.log('Restaurant Staff table is empty');
  }
}

checkManagerSchema();
