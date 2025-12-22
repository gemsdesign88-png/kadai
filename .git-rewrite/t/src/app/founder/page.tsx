export const runtime = 'edge';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import FounderDashboard from '@/components/founder/founder-dashboard';


// Founder email - only this email can access
const FOUNDER_EMAIL = 'gemmyadyendra@gmail.com';

export default async function FounderPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== FOUNDER_EMAIL) {
    redirect('/login');
  }

  // Fetch all necessary data
  const [
    demoRequestsResult,
    usersResult,
    restaurantsResult,
    recentUsersResult,
  ] = await Promise.all([
    supabase
      .from('demo_requests')
      .select('*')
      .order('created_at', { ascending: false }),
    supabase
      .from('user_profiles')
      .select('*')
      .order('created_at', { ascending: false }),
    supabase
      .from('restaurants')
      .select('*')
      .order('created_at', { ascending: false }),
    supabase
      .from('user_profiles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10),
  ]);

  // Log any errors
  if (demoRequestsResult.error) console.error('Demo requests error:', demoRequestsResult.error);
  if (usersResult.error) console.error('Users error:', usersResult.error);
  if (restaurantsResult.error) console.error('Restaurants error:', restaurantsResult.error);
  if (recentUsersResult.error) console.error('Recent users error:', recentUsersResult.error);

  // Log what we got
  console.log('Founder Dashboard Data:', {
    demoRequests: demoRequestsResult.data?.length || 0,
    users: usersResult.data?.length || 0,
    restaurants: restaurantsResult.data?.length || 0,
    recentUsers: recentUsersResult.data?.length || 0,
  });

  // Manually join owner data if needed
  const restaurantsWithOwners = restaurantsResult.data?.map(restaurant => {
    const owner = usersResult.data?.find(u => u.id === restaurant.owner_id);
    return {
      ...restaurant,
      owner: owner ? { full_name: owner.full_name, email: owner.email } : undefined
    };
  }) || [];

  return (
    <FounderDashboard
      demoRequests={demoRequestsResult.data || []}
      users={usersResult.data || []}
      restaurants={restaurantsWithOwners}
      recentUsers={recentUsersResult.data || []}
    />
  );
}
