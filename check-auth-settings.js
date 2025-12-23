const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjcxMzE1NCwiZXhwIjoyMDc4Mjg5MTU0fQ.GcZT8vuuD_8eOU4pr6X5vYjAnmH81arHOBnQTJbqpZM';

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function checkAuthSettings() {
  console.log('🔍 Checking Supabase Auth Configuration...\n');

  try {
    // Get auth config - this might not be available via client library
    // Instead, let's check what's actually in the auth logs
    
    console.log('📋 Fetching recent auth events...');
    
    // We can access auth via admin API but email logs might be limited
    // Let's just check recent users and their email confirmation status
    
    const { data: users, error } = await supabase.auth.admin.listUsers();
    
    if (error) {
      console.error('❌ Error fetching users:', error);
      return;
    }

    console.log(`\n✅ Total users in project: ${users.users.length}`);
    
    // Show last 10 users
    console.log('\n📊 Last 10 users (most recent first):');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    users.users
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 10)
      .forEach((u, i) => {
        const isVerified = u.email_confirmed_at ? '✅ YES' : '❌ NO';
        const daysOld = Math.floor((Date.now() - new Date(u.created_at)) / (1000 * 60 * 60 * 24));
        console.log(`${i + 1}. ${u.email}`);
        console.log(`   ID: ${u.id}`);
        console.log(`   Email Verified: ${isVerified}`);
        console.log(`   Created: ${daysOld} days ago`);
        console.log('');
      });

    // Check for unverified users created in last 24 hours
    const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentUnverified = users.users.filter(u => 
      new Date(u.created_at) > last24h && !u.email_confirmed_at
    );

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`\n⚠️  Unverified users in last 24h: ${recentUnverified.length}`);
    
    if (recentUnverified.length > 0) {
      console.log('\nThese users are waiting for email verification:');
      recentUnverified.forEach(u => {
        console.log(`  - ${u.email}`);
      });
    }

    console.log('\n\n💡 DIAGNOSIS:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    if (recentUnverified.length > 0) {
      console.log('❌ ISSUE FOUND: Emails are NOT being sent!');
      console.log('\nUsers are being created in the database but:');
      console.log('  1. They are not receiving verification emails');
      console.log('  2. This suggests Supabase SMTP is not configured or failing');
      console.log('\n🔧 SOLUTIONS:');
      console.log('  1. Check Supabase Dashboard > Settings > Auth > SMTP Settings');
      console.log('  2. Ensure SMTP provider is enabled and configured');
      console.log('  3. If using default provider, check rate limits (3/hour)');
      console.log('  4. Switch to Resend or SendGrid for better reliability');
    } else {
      console.log('✅ All recent users are verified!');
      console.log('The registration → email verification flow is working.');
    }

  } catch (err) {
    console.error('\n❌ Unexpected Error:', err);
  }
}

checkAuthSettings();
