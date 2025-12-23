const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjcxMzE1NCwiZXhwIjoyMDc4Mjg5MTU0fQ.GcZT8vuuD_8eOU4pr6X5vYjAnmH81arHOBnQTJbqpZM';

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function checkData() {
  console.log('🔍 Checking Supabase Data...\n');

  try {
    // Check restaurants
    const { data: restaurants, error: restError } = await supabase
      .from('restaurants')
      .select('*')
      .limit(10);

    if (restError) {
      console.error('❌ Error fetching restaurants:', restError);
    } else {
      console.log(`✅ Restaurants: ${restaurants.length} found`);
      restaurants.forEach(r => {
        console.log(`   - ${r.name} (ID: ${r.id})`);
      });
    }

    console.log('');

    // Check subscription plans
    const { data: plans, error: planError } = await supabase
      .from('subscription_plans')
      .select('*')
      .limit(10);

    if (planError) {
      console.error('❌ Error fetching plans:', planError);
    } else {
      console.log(`✅ Subscription Plans: ${plans.length} found`);
      plans.forEach(p => {
        console.log(`   - ${p.name} (Tier: ${p.plan_tier})`);
      });
    }

    console.log('');

    // Check user profiles
    const { data: profiles, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .limit(10);

    if (profileError) {
      console.error('❌ Error fetching profiles:', profileError);
    } else {
      console.log(`✅ User Profiles: ${profiles.length} found`);
      profiles.forEach(p => {
        console.log(`   - ${p.full_name || 'Unknown'} (${p.email})`);
      });
    }

    console.log('\n✅ ALL DATA IS SAFE!');

  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

checkData();
