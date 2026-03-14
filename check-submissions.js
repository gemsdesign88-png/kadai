const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; 

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSubmissions() {
  console.log('Fetching recent contact_submissions...');
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('id, name, email, status, message, metadata, created_at')
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error('Error:', error);
  } else {
    // console.table(data);
    data.forEach(sub => {
       console.log(`ID: ${sub.id} | Name: ${sub.name} | Status: ${sub.status}`);
       console.log(`Message: ${sub.message}`);
       console.log(`Metadata:`, JSON.stringify(sub.metadata, null, 2));
       console.log('---');
    });
  }
}

checkSubmissions();
