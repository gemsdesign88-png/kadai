const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjcxMzE1NCwiZXhwIjoyMDc4Mjg5MTU0fQ.GcZT8vuuD_8eOU4pr6X5vYjAnmH81arHOBnQTJbqpZM';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkProfile() {
  const userId = '409da13b-b63f-42fe-8ed2-9f3bfef4c7d7';
  
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();
    
  if (error) {
    console.log('Profile not found or error:', error.message);
  } else {
    console.log('Profile found:', JSON.stringify(data, null, 2));
  }

  const { data: restaurants, error: restError } = await supabase
    .from('restaurants')
    .select('*')
    .eq('owner_id', userId);

  if (restError) {
    console.log('Error fetching restaurants:', restError.message);
  } else {
    console.log('Restaurants found:', restaurants.length);
    console.log(JSON.stringify(restaurants, null, 2));
  }
}

checkProfile();
