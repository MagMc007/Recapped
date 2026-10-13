import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_COOKIE, REFRESH_COOKIE, USER_COOKIE } from './lib/auth-constants';

function isJwtExpired(token: string): boolean {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const parsed = JSON.parse(jsonPayload);
    if (typeof parsed.exp === 'number') {
      return Date.now() >= parsed.exp * 1000;
    }
    return false;
  } catch {
    return true;
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  const user = request.cookies.get(USER_COOKIE)?.value;
  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');

  if (isAuthRoute) {
    // If the user has a redirect parameter (e.g. sent here because /movies failed auth),
    // NEVER redirect away from login/register — that causes an infinite loop!
    const hasRedirectParam = request.nextUrl.searchParams.has('redirect');
    if (hasRedirectParam) {
      return NextResponse.next();
    }

    // If token exists, check if it's expired or if user cookie is missing
    if (token) {
      if (!user || isJwtExpired(token)) {
        // Expired or invalid session — clear cookies and let user access login/register
        const response = NextResponse.next();
        response.cookies.delete(AUTH_COOKIE);
        response.cookies.delete(REFRESH_COOKIE);
        response.cookies.delete(USER_COOKIE);
        response.cookies.set(AUTH_COOKIE, '', { path: '/', maxAge: 0 });
        response.cookies.set(REFRESH_COOKIE, '', { path: '/', maxAge: 0 });
        response.cookies.set(USER_COOKIE, '', { path: '/', maxAge: 0 });
        return response;
      }

      // Valid active session with no redirect param — redirect to /movies
      return NextResponse.redirect(new URL('/movies', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/register'],
};
