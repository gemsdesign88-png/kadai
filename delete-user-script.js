const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjcxMzE1NCwiZXhwIjoyMDc4Mjg5MTU0fQ.GcZT8vuuD_8eOU4pr6X5vYjAnmH81arHOBnQTJbqpZM';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function deleteUser() {
  const email = 'mindo.minangindonesia@gmail.com';
  console.log(`Deleting user: ${email}`);
  
  const { data: users, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    console.error('Error listing users:', listError);
    return;
  }
  
  const user = users.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (user) {
    // Delete from public tables first
    await supabase.from('subscriptions').delete().match({ restaurant_id: user.id }); // This might fail if restaurant_id is not user_id
    // Better to just delete by owner_id in restaurants
    const { data: rests } = await supabase.from('restaurants').select('id').eq('owner_id', user.id);
    if (rests) {
      for (const r of rests) {
        await supabase.from('subscriptions').delete().eq('restaurant_id', r.id);
      }
    }
    await supabase.from('restaurants').delete().eq('owner_id', user.id);
    await supabase.from('user_profiles').delete().eq('id', user.id);
    
    const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id);
    if (deleteError) {
      console.error('Error deleting user:', deleteError);
    } else {
      console.log('User deleted successfully!');
    }
  } else {
    console.log('User not found.');
  }
}

deleteUser();
