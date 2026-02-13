const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const resendApiKey = process.env.RESEND_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
const resend = new Resend(resendApiKey);

async function testEmail() {
  console.log('Testing Resend Email...');
  console.log('API Key available:', !!resendApiKey);
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'Kadai <no-reply@kadaipos.id>',
      to: 'gemmyadyendra@gmail.com',
      subject: 'Resend Debug Test',
      html: '<p>If you see this, Resend is working with the kadaipos.id domain.</p>'
    });
    
    if (error) {
      console.error('Resend Error:', error);
    } else {
      console.log('Email sent successfully:', data);
    }
  } catch (err) {
    console.error('Fetch Error:', err);
  }
}

testEmail();
