const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjcxMzE1NCwiZXhwIjoyMDc4Mjg5MTU0fQ.GcZT8vuuD_8eOU4pr6X5vYjAnmH81arHOBnQTJbqpZM';

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function testSignUp() {
  console.log('Testing Supabase Auth Email Flow...\n');

  const testEmail = `test-${Date.now()}@example.com`;
  const testPassword = 'TestPassword123!';

  try {
    console.log('1. Attempting signUp with:', testEmail);
    
    const { data, error } = await supabase.auth.admin.createUser({
      email: testEmail,
      password: testPassword,
      email_confirm: true,
      user_metadata: {
        full_name: 'Test User',
      },
    });

    if (error) {
      console.error('\n❌ SignUp Error:', {
        message: error.message,
        status: error.status,
        name: error.name
      });
      return;
    }

    console.log('\n✅ SignUp Success!');
    console.log('User ID:', data.user?.id);
    console.log('Email:', data.user?.email);
    console.log('Email Confirmed:', data.user?.email_confirmed_at);
    console.log('Session:', data.session ? 'YES (Auto-login)' : 'NO (Email verification required)');

    // Now try to get the verification token
    console.log('\n2. Checking auth logs in Supabase...');
    console.log('Check your Supabase Dashboard > Auth > Logs to see if the email was sent');
    
    // List all users to see our new one
    const { data: users, error: usersError } = await supabase.auth.admin.listUsers();
    
    if (usersError) {
      console.error('Error listing users:', usersError);
      return;
    }

    const newUser = users.users.find(u => u.email === testEmail);
    if (newUser) {
      console.log('\n✅ User created in auth.users:');
      console.log('  ID:', newUser.id);
      console.log('  Email:', newUser.email);
      console.log('  Email Confirmed:', newUser.email_confirmed_at ? 'YES' : 'NO');
      console.log('  Created At:', newUser.created_at);
    }

  } catch (err) {
    console.error('\n❌ Unexpected Error:', err);
  }
}

testSignUp();
