const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; 

const supabase = createClient(supabaseUrl, supabaseKey);

async function activateAllPreppo() {
  const userId = '83eda7f9-550c-4939-984b-35ef7555a028';
  console.log(`Activating all Preppo stores for user ${userId}...`);
  
  const { data, error } = await supabase
    .from('restaurants')
    .update({ 
      is_active: true,
      plan_tier: 'pro',
      subscription_status: 'active',
      is_trial: false,
      subscription_ends_at: new Date(Date.now() + 32 * 24 * 60 * 60 * 1000).toISOString()
    })
    .eq('owner_id', userId)
    .eq('business_type', 'preppo')
    .select('name');

  if (error) {
    console.error('Update Error:', error);
  } else {
    console.log('Successfully activated:', data.map(r => r.name));
  }
}

activateAllPreppo();
