import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;
  
  // Redirect kadaipos.id login/register to sibos.kadaipos.id
  if (host === 'kadaipos.id' && (pathname === '/login' || pathname === '/register')) {
    const targetUrl = new URL(`https://sibos.kadaipos.id${pathname}`);
    return NextResponse.redirect(targetUrl);
  }
  
  // Redirect sibos.kadaipos.id to dashboard
  if (host.includes('sibos.kadaipos.id')) {
    // If not already on dashboard/login/auth/register routes, redirect to dashboard
    if (pathname === '/' || 
        (!pathname.startsWith('/dashboard') && 
         !pathname.startsWith('/login') && 
         !pathname.startsWith('/auth') &&
         !pathname.startsWith('/register') &&
         !pathname.startsWith('/onboarding') &&
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
    '/order',
    '/privacy',
    '/terms',
    '/cookies',
    '/api/demo-request',
    '/register',
  ];
  
  // Check if the path starts with any public route
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  
  // Rewrite order.kadaipos.id requests to /order path
  if (host === 'order.kadaipos.id' && !pathname.startsWith('/order') && !pathname.startsWith('/_next')) {
    const url = request.nextUrl.clone();
    url.pathname = `/order${pathname}`;
    return NextResponse.rewrite(url);
  }
  
  if (host === 'order.kadaipos.id' || isPublicRoute) {
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
