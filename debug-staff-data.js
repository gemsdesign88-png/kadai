const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjcxMzE1NCwiZXhwIjoyMDc4Mjg5MTU0fQ.GcZT8vuuD_8eOU4pr6X5vYjAnmH81arHOBnQTJbqpZM';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function debugStaff() {
  console.log('--- Checking restaurant_staff ---');
  const { data: staff, error: staffError } = await supabase
    .from('restaurant_staff')
    .select('*')
    .limit(5);
    
  if (staffError) {
    console.error('Error fetching staff:', staffError);
  } else {
    console.log('Staff records:', JSON.stringify(staff, null, 2));
    
    if (staff.length > 0) {
      const userIds = staff.map(s => s.user_id).filter(Boolean);
      console.log('\n--- Checking user_profiles for these IDs ---');
      const { data: profiles, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .in('id', userIds);
        
      if (profileError) {
        console.error('Error fetching profiles:', profileError);
      } else {
        console.log('Profiles found:', JSON.stringify(profiles, null, 2));
      }
    }
  }
}

debugStaff();
