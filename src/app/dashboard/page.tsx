import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import type { SupabaseClient, User } from '@supabase/supabase-js';
import DashboardClient from './dashboard-client';

async function ensureUserProfile(supabase: SupabaseClient, user: User) {
  const { full_name, restaurant_name, phone } = user.user_metadata || {};
  if (!full_name) return;

  const { error } = await supabase
    .from('user_profiles')
    .upsert(
      {
        id: user.id,
        email: user.email,
        full_name,
        restaurant_name: restaurant_name || null,
        phone: phone || '',
        onboarding_completed: false,
      },
      { onConflict: 'id' }
    );

  if (error) {
    console.error('ensureUserProfile error', error);
  }
}

async function ensureRestaurant(supabase: SupabaseClient, user: User) {
  const { restaurant_name, phone } = user.user_metadata || {};
  if (!restaurant_name) return null;

  const { data: existing, error: fetchError } = await supabase
    .from('restaurants')
    .select('*')
    .eq('owner_id', user.id)
    .maybeSingle();

  if (fetchError) {
    console.error('ensureRestaurant fetch error', fetchError);
    return null;
  }

  if (existing) {
    return existing;
  }

  const { data: created, error } = await supabase
    .from('restaurants')
    .insert({
      name: restaurant_name,
      owner_id: user.id,
      address: '',
      phone: phone || '',
    })
    .select('*')
    .single();

  if (error) {
    console.error('ensureRestaurant insert error', error);
    return null;
  }

  return created;
}

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Get user's restaurants
  let { data: restaurants } = await supabase
    .from('restaurants')
    .select('*')
    .eq('owner_id', user.id);

  if (!restaurants || restaurants.length === 0) {
    await ensureUserProfile(supabase, user);
    const createdRestaurant = await ensureRestaurant(supabase, user);
    if (createdRestaurant) {
      restaurants = [createdRestaurant];
    }
  }

  return (
    <DashboardClient 
      restaurants={restaurants || []} 
    />
  );
}
