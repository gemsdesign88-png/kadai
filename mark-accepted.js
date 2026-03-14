const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function markSubmissionsAccepted() {
  const email = 'gemmyadyendra@gmail.com';
  
  console.log(`Marking submissions as accepted for email ${email}...`);
  
  const { data, error } = await supabase
    .from('contact_submissions')
    .update({ 
      status: 'accepted',
      metadata: { 
        activation_processed: true, 
        processed_at: new Date().toISOString(),
        manual_fix: true 
      }
    })
    .eq('email', email)
    .eq('status', 'pending');

  if (error) {
    console.error('Error updating submissions:', error);
  } else {
    console.log('Submissions marked as accepted successfully.');
  }
}

markSubmissionsAccepted();
