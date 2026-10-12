'use server';

import { apiClient, ApiError } from '@/lib/api-client';
import { setSession, clearSession } from '@/lib/auth';
import { loginSchema, registerSchema, type LoginFormData, type RegisterFormData } from './schemas';
import type { AuthResponse, User } from '@/types/api';

export interface AuthActionResult {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
  user?: User;
}

export async function loginAction(
  input: LoginFormData | FormData
): Promise<AuthActionResult> {
  try {
    const rawData =
      input instanceof FormData
        ? {
            username: input.get('username')?.toString() || '',
            password: input.get('password')?.toString() || '',
          }
        : input;

    const parsed = loginSchema.safeParse(rawData);
    if (!parsed.success) {
      return {
        success: false,
        error: 'Please fix the errors below.',
        fieldErrors: parsed.error.flatten().fieldErrors,
      };
    }

    const response = await apiClient.post<AuthResponse>('api/auth/login/', parsed.data);
    await setSession(response);

    return {
      success: true,
      user: response.user,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message,
      };
    }
    return {
      success: false,
      error: 'An unexpected error occurred during login. Please try again.',
    };
  }
}

export async function registerAction(
  input: RegisterFormData | FormData
): Promise<AuthActionResult> {
  try {
    const rawData =
      input instanceof FormData
        ? {
            username: input.get('username')?.toString() || '',
            email: input.get('email')?.toString() || '',
            password: input.get('password')?.toString() || '',
          }
        : input;

    const parsed = registerSchema.safeParse(rawData);
    if (!parsed.success) {
      return {
        success: false,
        error: 'Please fix the errors below.',
        fieldErrors: parsed.error.flatten().fieldErrors,
      };
    }

    const response = await apiClient.post<AuthResponse>('api/auth/register/', parsed.data);
    await setSession(response);

    return {
      success: true,
      user: response.user,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message,
      };
    }
    return {
      success: false,
      error: 'An unexpected error occurred during registration. Please try again.',
    };
  }
}

export async function logoutAction(): Promise<AuthActionResult> {
  try {
    await clearSession();
    return { success: true };
  } catch {
    return {
      success: false,
      error: 'Failed to sign out. Please try again.',
    };
  }
}
