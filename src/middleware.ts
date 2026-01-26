import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  const search = request.nextUrl.search;

  const isApexOldDomain = host === 'kadaipos.id' || host === 'www.kadaipos.id';
  const isSibosOldDomain = host === 'sibos.kadaipos.id';
  const isSibosNewDomain = host === 'sibos.kadai.id';
  const isAppOldDomain = host === 'app.kadaipos.id';
  const isAppNewDomain = host === 'app.kadai.id';
  const isOrderOldDomain = host === 'order.kadaipos.id';
  const isOrderNewDomain = host === 'order.kadai.id';

  // Permanent redirects: old domains -> new domains
  if (isOrderOldDomain) {
    return NextResponse.redirect(new URL(`https://order.kadai.id${pathname}${search}`), 308);
  }

  if (isSibosOldDomain) {
    return NextResponse.redirect(new URL(`https://sibos.kadai.id${pathname}${search}`), 308);
  }

  if (isAppOldDomain) {
    return NextResponse.redirect(new URL(`https://app.kadai.id${pathname}${search}`), 308);
  }

  if (isApexOldDomain) {
    if (pathname === '/login' || pathname === '/register') {
      return NextResponse.redirect(new URL(`https://app.kadai.id${pathname}${search}`), 308);
    }
    return NextResponse.redirect(new URL(`https://kadai.id${pathname}${search}`), 308);
  }
  
  // Redirect sibos.* and app.* to dashboard
  if (isSibosNewDomain || isAppNewDomain) {
    // If not already on dashboard/login/auth/admin/register routes, redirect to dashboard
    if (pathname === '/' || 
        (!pathname.startsWith('/dashboard') && 
         !pathname.startsWith('/login') && 
         !pathname.startsWith('/admin') &&
         !pathname.startsWith('/auth') &&
         !pathname.startsWith('/register') &&
         !pathname.startsWith('/onboarding') &&
         !pathname.startsWith('/delete-account') &&
         !pathname.startsWith('/_next'))) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    try {
      return await updateSession(request);
    } catch (error) {
      console.error('Middleware updateSession error:', error);
      return NextResponse.next();
    }
  }
  
  // Public routes that don't require authentication
  const publicRoutes = [
    '/delete-account',
    '/order',
    '/privacy',
    '/terms',
    '/cookies',
    '/founder',
    '/about',
    '/contact',
    '/demo',
    '/admin/login',
    '/features',
    '/pricing',
    '/benefits',
    '/business',
    '/careers',
    '/api/demo-request',
    '/register',
  ];
  
  // Check if the path starts with any public route
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  
  // Rewrite order.* requests to /order path
  if (isOrderNewDomain && !pathname.startsWith('/order') && !pathname.startsWith('/_next')) {
    const url = request.nextUrl.clone();
    url.pathname = `/order${pathname}`;
    return NextResponse.rewrite(url);
  }
  
  if (isOrderNewDomain || isPublicRoute) {
    return NextResponse.next();
  }
  
  try {
    return await updateSession(request);
  } catch (error) {
    console.error('Middleware updateSession error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
