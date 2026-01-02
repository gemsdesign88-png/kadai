import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import DashboardLayoutClient from '@/components/dashboard-layout';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Get user's restaurants
  const { data: restaurants } = await supabase
    .from('restaurants')
    .select('*')
    .eq('owner_id', user.id);

  // If no restaurants, redirect to onboarding
  if (!restaurants || restaurants.length === 0) {
    redirect('/onboarding');
  }

  return (
    <DashboardLayoutClient 
      user={user} 
      profile={profile} 
      restaurants={restaurants || []}
    >
      {children}
    </DashboardLayoutClient>
  );
}

