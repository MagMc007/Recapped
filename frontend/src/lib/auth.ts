import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { User, AuthResponse } from '@/types/api';

export const AUTH_COOKIE = 'recapped_token';
export const REFRESH_COOKIE = 'recapped_refresh';
export const USER_COOKIE = 'recapped_user';

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export interface Session {
  user: User;
  token: string;
}

export async function getSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE)?.value;
    const userJson = cookieStore.get(USER_COOKIE)?.value;

    if (!token || !userJson) {
      return null;
    }

    const user = JSON.parse(userJson) as User;
    return { user, token };
  } catch {
    return null;
  }
}

export async function setSession(authData: AuthResponse): Promise<void> {
  const cookieStore = await cookies();
  const isProduction = process.env.NODE_ENV === 'production';

  cookieStore.set(AUTH_COOKIE, authData.access_token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: COOKIE_MAX_AGE,
  });

  if (authData.refresh) {
    cookieStore.set(REFRESH_COOKIE, authData.refresh, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: COOKIE_MAX_AGE,
    });
  }

  cookieStore.set(USER_COOKIE, JSON.stringify(authData.user), {
    httpOnly: false,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.delete(AUTH_COOKIE);
  cookieStore.delete(REFRESH_COOKIE);
  cookieStore.delete(USER_COOKIE);
}

export async function requireAuth(redirectTo = '/login'): Promise<Session> {
  const session = await getSession();
  if (!session) {
    redirect(redirectTo);
  }
  return session;
}
