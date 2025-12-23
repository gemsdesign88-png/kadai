const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjcxMzE1NCwiZXhwIjoyMDc4Mjg5MTU0fQ.GcZT8vuuD_8eOU4pr6X5vYjAnmH81arHOBnQTJbqpZM';

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function checkUser() {
  const email = 'mindo.minangindonesia@gmail.com';
  console.log(`Checking for email: ${email}`);
  
  const { data, error } = await supabase.auth.admin.listUsers();
  
  if (error) {
    console.error('Error listing users:', error);
    return;
  }
  
  console.log(`Total users in this batch: ${data.users.length}`);
  
  const user = data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (user) {
    console.log('User found!');
    console.log(JSON.stringify(user, null, 2));
  } else {
    console.log('User NOT found in this batch.');
    
    // Check if there are more users
    // listUsers returns { users, nextCursor }
    // But let's just try to get user by email if possible
    // Supabase admin doesn't have a direct "getUserByEmail" but we can use listUsers with pagination
  }
}

checkUser();
