const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  const { data, error } = await supabase.rpc('get_table_columns', { table_name: 'prep_batches' });
  if (error) {
    console.log('Error calling RPC:', error.message);
    // Fallback if RPC doesn't exist
    const { data: sample, error: sampleError } = await supabase.from('prep_batches').select('*').limit(1);
    if (sampleError) console.error('Error fetching sample:', sampleError.message);
    else console.log('Sample row columns:', Object.keys(sample[0] || {}));
  } else {
    console.log('Columns for prep_batches:', data.map(c => c.column_name));
  }
}

checkSchema();
