import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  try {
    let supabaseResponse = NextResponse.next({
      request,
    });

    // Check if environment variables are available
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Missing Supabase environment variables');
      return supabaseResponse;
    }

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
            supabaseResponse = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Allow /order routes completely (customer ordering pages - no auth needed)
    if (request.nextUrl.pathname.startsWith('/order')) {
      return supabaseResponse;
    }

    // Public routes that don't require authentication
    const publicRoutes = [
      '/',
      '/features',
      '/pricing',
      '/about',
      '/contact',
      '/demo',
      '/login',
      '/register',
      '/auth',
      '/privacy',
      '/terms',
      '/cookies',
      '/benefits',
      '/business',
    ];

    const isPublicRoute = publicRoutes.some(route => 
      request.nextUrl.pathname === route || 
      request.nextUrl.pathname.startsWith(route + '/')
    );

    if (
      !user &&
      !isPublicRoute &&
      !request.nextUrl.pathname.startsWith('/login') &&
      !request.nextUrl.pathname.startsWith('/auth')
    ) {
      // no user, potentially respond by redirecting the user to the login page
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    return supabaseResponse;
  } catch (error) {
    console.error('Middleware error:', error);
    // Return a basic response to avoid 500 errors
    return NextResponse.next({
      request,
    });
  }
}
