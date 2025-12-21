import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

const FOUNDER_EMAIL = 'gemmyadyendra@gmail.com';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // Verify founder access
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || user.email !== FOUNDER_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { restaurantId, subscription_plan, subscription_status, subscription_ends_at } = body;

    if (!restaurantId) {
      return NextResponse.json({ error: 'Restaurant ID is required' }, { status: 400 });
    }

    // Update restaurant subscription
    const { data, error } = await supabase
      .from('restaurants')
      .update({
        subscription_plan,
        subscription_status,
        subscription_ends_at,
      })
      .eq('id', restaurantId)
      .select()
      .single();

    if (error) {
      console.error('Error updating subscription:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error in update-subscription API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
