const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkRestaurants() {
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Error fetching restaurants:', error);
    return;
  }

  console.log('--- Restaurant Schema ---');
  if (data && data.length > 0) {
    console.log(Object.keys(data[0]));
    console.log('Sample row:', data[0]);
  } else {
    console.log('No restaurants found');
  }
}

checkRestaurants();
