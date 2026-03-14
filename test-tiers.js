const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; 

const supabase = createClient(supabaseUrl, supabaseKey);

async function getPlanTierConstraint() {
  const { data, error } = await supabase.rpc('get_table_constraints', { t_name: 'restaurants' });
  // If RPC doesn't exist, I'll try raw query if I can.
  // Actually, I can just try to update with common values until one works.
  
  const valuesToTest = ['toko', 'starter', 'growth', 'pro', 'premium', 'business', 'enterprise'];
  for (const v of valuesToTest) {
    const { error: testError } = await supabase
      .from('restaurants')
      .update({ plan_tier: v })
      .eq('id', '22c53524-f55c-4d55-a068-fa2d1c0f05c4');
    
    if (testError && testError.code === '23514') {
      console.log(`Value '${v}' is NOT allowed.`);
    } else if (testError) {
      console.log(`Value '${v}' failed with other error: ${testError.message}`);
    } else {
      console.log(`Value '${v}' IS ALLOWED!`);
    }
  }
}

getPlanTierConstraint();
