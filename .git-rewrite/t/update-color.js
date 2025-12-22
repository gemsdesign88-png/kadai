import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

(async () => {
  console.log('Adding primary_color column to restaurants table...');
  
  // Add the column
  const { error: alterError } = await supabase.rpc('exec_sql', {
    sql: 'ALTER TABLE restaurants ADD COLUMN IF NOT EXISTS primary_color TEXT;'
  });

  if (alterError) {
    console.log('Alter error:', alterError);
    // Try direct query
    const { error: directError } = await supabase
      .from('restaurants')
      .select('primary_color')
      .limit(1);
    
    if (directError && directError.message.includes('does not exist')) {
      console.log('Column does not exist, please add it manually in Supabase dashboard');
      return;
    }
  }

  console.log('Column added successfully');

  // Set the primary color for the restaurant
  const { data, error } = await supabase
    .from('restaurants')
    .update({ primary_color: '#3B82F6' })
    .eq('id', '3af205f4-aa37-4ec8-878f-eb6399dcfcea')
    .select();

  console.log('Update result:', data);
  console.log('Error:', error);
})();