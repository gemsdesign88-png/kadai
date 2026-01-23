import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  if (host === 'order.kadaipos.id') {
    const pathname = request.nextUrl.pathname;
    const search = request.nextUrl.search;
    return NextResponse.redirect(new URL(`https://order.kadai.id${pathname}${search}`), 308);
  }

  if (host === 'order.kadai.id' || request.nextUrl.pathname.startsWith('/order')) {
    return NextResponse.next();
  }
  return await updateSession(request);
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
