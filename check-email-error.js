const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjcxMzE1NCwiZXhwIjoyMDc4Mjg5MTU0fQ.GcZT8vuuD_8eOU4pr6X5vYjAnmH81arHOBnQTJbqpZM';

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function checkEmailError() {
  console.log('🔍 Checking for recent email sending errors...\n');

  try {
    // Get recent users to see which ones failed email verification
    const { data: users, error } = await supabase.auth.admin.listUsers();
    
    if (error) {
      console.error('❌ Error fetching users:', error);
      return;
    }

    // Get last 5 users
    const recentUsers = users.users
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5);

    console.log('📧 Recent Registration Attempts:\n');
    recentUsers.forEach((u, i) => {
      const status = u.email_confirmed_at ? '✅ Verified' : '❌ Waiting for Email';
      const createdTime = new Date(u.created_at).toLocaleTimeString();
      console.log(`${i + 1}. ${u.email}`);
      console.log(`   Status: ${status}`);
      console.log(`   Created: ${createdTime}\n`);
    });

    console.log('\n💡 DIAGNOSIS:\n');
    console.log('If you see "❌ Waiting for Email" with recent timestamps,');
    console.log('it means Supabase is failing to send confirmation emails.\n');
    
    console.log('🔧 POSSIBLE CAUSES:\n');
    console.log('1. SMTP Credentials Invalid');
    console.log('   - Check SMTP Host, Port, Username, Password in Supabase');
    console.log('   - For Resend: Password should be API key (re_xxxxx)\n');
    
    console.log('2. Domain Not Verified in Resend');
    console.log('   - If using kadaipos.id email, domain must be verified');
    console.log('   - For testing, use: noreply@resend.dev\n');
    
    console.log('3. SMTP Port Wrong');
    console.log('   - Use 587 (STARTTLS) for most providers');
    console.log('   - Or 465 (TLS) for some\n');

    console.log('4. "From" Email Address Invalid');
    console.log('   - Must be a verified domain\n');

  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

checkEmailError();
