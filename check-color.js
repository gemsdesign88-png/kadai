import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

(async () => {
  console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log('SUPABASE_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET');

  // Get the restaurant for TABLE-3-4WQH6OW4
  const { data: tableData, error: tableError } = await supabase
    .from('tables')
    .select('restaurant_id')
    .eq('barcode', 'TABLE-3-4WQH6OW4')
    .single();

  console.log('Table data:', tableData);
  console.log('Table error:', tableError);

  if (tableData) {
    const { data: restaurant, error: restError } = await supabase
      .from('restaurants')
      .select('id, name, primary_color, owner_id')
      .eq('id', tableData.restaurant_id)
      .single();

    console.log('Restaurant:', restaurant);
    console.log('Rest error:', restError);

    if (restaurant) {
      console.log('Restaurant primary_color:', restaurant.primary_color);

      if (restaurant.owner_id) {
        const { data: ownerProfile, error: ownerError } = await supabase
          .from('user_profiles')
          .select('primary_color')
          .eq('id', restaurant.owner_id)
          .maybeSingle();

        console.log('Owner profile primary_color:', ownerProfile?.primary_color);
        console.log('Owner error:', ownerError);
      }
    }
  }
})();