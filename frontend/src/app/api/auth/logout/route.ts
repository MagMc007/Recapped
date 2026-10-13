import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_COOKIE, REFRESH_COOKIE, USER_COOKIE } from '@/lib/auth-constants';

export async function GET(request: NextRequest) {
  const redirectParam = request.nextUrl.searchParams.get('redirect');
  const loginUrl = new URL('/login', request.url);
  if (redirectParam && redirectParam !== '/login') {
    loginUrl.searchParams.set('redirect', redirectParam);
  }

  const response = NextResponse.redirect(loginUrl);
  response.cookies.delete(AUTH_COOKIE);
  response.cookies.delete(REFRESH_COOKIE);
  response.cookies.delete(USER_COOKIE);

  response.cookies.set(AUTH_COOKIE, '', { path: '/', maxAge: 0 });
  response.cookies.set(REFRESH_COOKIE, '', { path: '/', maxAge: 0 });
  response.cookies.set(USER_COOKIE, '', { path: '/', maxAge: 0 });

  return response;
}

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(AUTH_COOKIE);
  response.cookies.delete(REFRESH_COOKIE);
  response.cookies.delete(USER_COOKIE);

  response.cookies.set(AUTH_COOKIE, '', { path: '/', maxAge: 0 });
  response.cookies.set(REFRESH_COOKIE, '', { path: '/', maxAge: 0 });
  response.cookies.set(USER_COOKIE, '', { path: '/', maxAge: 0 });

  return response;
}
