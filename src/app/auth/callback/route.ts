import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  console.log('=== CALLBACK ROUTE HIT ===');
  console.log('URL:', request.url);
  console.log('Code:', code);
  console.log('Next:', next);

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    console.log('=== CALLBACK ROUTE START ===');
    console.log('Code exchange error:', error);
    console.log('Code exchange success:', !!data.user);
    
    if (!error && data.user) {
      // Get user metadata from signup
      const metadata = data.user.user_metadata;
      const userId = data.user.id;
      const userEmail = data.user.email;

      console.log('User ID:', userId);
      console.log('User metadata:', JSON.stringify(metadata));
      console.log('Restaurant name from metadata:', metadata.restaurant_name);

      // Create user profile
      if (metadata.full_name) {
        const { error: profileError } = await supabase
          .from('user_profiles')
          .upsert({
            id: userId,
            email: userEmail,
            full_name: metadata.full_name,
            restaurant_name: metadata.restaurant_name,
            phone: metadata.phone || '',
            onboarding_completed: false,
          }, {
            onConflict: 'id'
          });

        if (profileError) {
          console.error('❌ Profile creation error:', profileError);
        } else {
          console.log('✅ Profile created successfully');
        }
      }

      // Create restaurant if metadata exists and no restaurant yet
      if (metadata.restaurant_name) {
        console.log('Checking for existing restaurant...');
        const { count, error: checkError } = await supabase
          .from('restaurants')
          .select('id', { count: 'exact', head: true })
          .eq('owner_id', userId);

        console.log('Existing restaurant count:', count);
        console.log('Check error:', checkError);

        const hasRestaurant = !checkError && (count ?? 0) > 0;
        if (!hasRestaurant) {
          console.log('Creating new restaurant with name:', metadata.restaurant_name);
          const { data: newRestaurant, error: restaurantError } = await supabase
            .from('restaurants')
            .insert({
              name: metadata.restaurant_name,
              owner_id: userId,
              address: '',
              phone: metadata.phone || '',
            })
            .select();

          if (restaurantError) {
            console.error('❌ Restaurant creation error:', JSON.stringify(restaurantError));
          } else {
            console.log('✅ Restaurant created successfully:', newRestaurant);
          }
        } else {
          console.log('Restaurant already exists');
        }
      } else {
        console.log('❌ No restaurant_name in metadata!');
      }

      console.log('=== CALLBACK ROUTE END ===');
      
      // Redirect to the next page or dashboard
      // Use the origin from the request to handle local vs production
      const redirectUrl = new URL(next, origin);
      
      console.log('Redirecting to:', redirectUrl.toString());
      return NextResponse.redirect(redirectUrl);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect('https://sibos.kadaipos.id/auth/auth-code-error');
}
