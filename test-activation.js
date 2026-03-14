const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; 

const supabase = createClient(supabaseUrl, supabaseKey);

async function testActivation() {
  const restaurantId = '22c53524-f55c-4d55-a068-fa2d1c0f05c4';
  console.log(`Manually activating restaurant ${restaurantId}...`);
  
  const { data, error } = await supabase
    .from('restaurants')
    .update({ 
      is_active: true,
      plan_tier: 'pro',
      subscription_status: 'active'
    })
    .eq('id', restaurantId)
    .select();

  if (error) {
    console.error('Update Error:', error);
  } else {
    console.log('Update Success:', data);
  }
}

testActivation();
