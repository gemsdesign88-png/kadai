import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AdminDashboard from '@/components/admin/admin-dashboard';

// Founder emails - these emails can access the admin dashboard
const ADMIN_EMAILS = ['gemmyadyendra@gmail.com', 'admin@kadaipos.id', 'mamak@kadaipos.id'];

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If not logged in, go to dedicated admin login
  if (!user) {
    redirect('/admin/login');
  }

  // If logged in but NOT an admin, show Access Denied instead of redirecting
  if (!ADMIN_EMAILS.includes(user.email || '')) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m11 3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h1>
          <p className="text-slate-600 mb-8">
            You are logged in as <span className="font-semibold">{user.email}</span>, which does not have admin permissions.
          </p>
          <div className="space-y-3">
            <a 
              href="/dashboard" 
              className="block w-full py-3 px-4 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
            >
              Go to Customer Dashboard
            </a>
            <form action="/auth/signout" method="post">
              <button 
                type="submit"
                className="w-full py-3 px-4 bg-white border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
              >
                Sign Out & Switch Account
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Fetch all necessary data
  const [
    demoRequestsResult,
    contactSubmissionsResult,
    usersResult,
    restaurantsResult,
    recentUsersResult,
  ] = await Promise.all([
    supabase
      .from('demo_requests')
      .select('*')
      .order('created_at', { ascending: false }),
    supabase
      .from('contact_submissions')
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
  if (contactSubmissionsResult.error) console.error('Contact submissions error:', contactSubmissionsResult.error);
  if (usersResult.error) console.error('Users error:', usersResult.error);
  if (restaurantsResult.error) console.error('Restaurants error:', restaurantsResult.error);
  if (recentUsersResult.error) console.error('Recent users error:', recentUsersResult.error);

  // Log what we got
  console.log('Founder Dashboard Data:', {
    demoRequests: demoRequestsResult.data?.length || 0,
    contactSubmissions: contactSubmissionsResult.data?.length || 0,
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
    <AdminDashboard
      demoRequests={demoRequestsResult.data || []}
      contactSubmissions={contactSubmissionsResult.data || []}
      users={usersResult.data || []}
      restaurants={restaurantsWithOwners}
      recentUsers={recentUsersResult.data || []}
    />
  );
}
