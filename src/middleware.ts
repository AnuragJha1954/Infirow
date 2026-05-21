import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only protect the /admin/waitlist route
  if (request.nextUrl.pathname.startsWith('/admin/waitlist')) {
    const sessionCookie = request.cookies.get('admin_auth');
    
    // If there is no valid cookie, redirect to the login page
    if (!sessionCookie || sessionCookie.value !== 'authenticated') {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/waitlist/:path*'],
};
