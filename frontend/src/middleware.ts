import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_COOKIE } from './lib/auth-constants';

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');

  // If already logged in, redirect away from /login and /register
  if (isAuthRoute && token) {
    const redirectParam = request.nextUrl.searchParams.get('redirect');
    const redirectTo = redirectParam && redirectParam !== '/' ? redirectParam : '/movies';
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/register'],
};
