const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; 

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkUserRestaurants() {
  const userId = '83eda7f9-550c-4939-984b-35ef7555a028';
  console.log(`Checking restaurants for user ${userId}...`);
  
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('owner_id', userId);

  if (error) {
    console.error('Error:', error);
  } else {
    console.table(data.map(r => ({
      id: r.id,
      name: r.name,
      business_type: r.business_type,
      plan_tier: r.plan_tier,
      is_active: r.is_active,
      sub_status: r.subscription_status,
      ends_at: r.subscription_ends_at
    })));
  }
}

checkUserRestaurants();
