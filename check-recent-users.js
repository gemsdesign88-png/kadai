const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjcxMzE1NCwiZXhwIjoyMDc4Mjg5MTU0fQ.GcZT8vuuD_8eOU4pr6X5vYjAnmH81arHOBnQTJbqpZM';

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function checkRecentUsers() {
  console.log('Fetching 10 most recent users...');
  
  const { data, error } = await supabase.auth.admin.listUsers();
  
  if (error) {
    console.error('Error listing users:', error);
    return;
  }
  
  // Sort by created_at descending
  const sortedUsers = data.users.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 10);
  
  console.log('Recent Users:');
  sortedUsers.forEach(u => {
    console.log(`- Email: ${u.email} | Created: ${u.created_at} | Verified: ${u.email_confirmed_at ? 'YES' : 'NO'}`);
  });
}

checkRecentUsers();
