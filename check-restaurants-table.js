const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
// Using the anon key from check-schema.js for reading public info if possible, 
// or I'll just use the service role key from the environment.
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; 

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkRestaurants() {
  console.log('Fetching restaurants...');
  const { data, error } = await supabase
    .from('restaurants')
    .select('id, name, business_type, plan_tier, is_active, owner_id')
    .limit(20);

  if (error) {
    console.error('Error:', error);
  } else {
    console.table(data);
  }
}

checkRestaurants();
