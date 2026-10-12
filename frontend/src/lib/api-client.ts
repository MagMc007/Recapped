import { env } from './env';
import type { ApiErrorResponse } from '../types/api';

export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  token?: string;
}

function extractErrorMessage(data: unknown, fallbackStatusText: string): string {
  if (!data || typeof data !== 'object') {
    return fallbackStatusText || 'Request failed';
  }

  const err = data as ApiErrorResponse;
  if (typeof err.message === 'string' && err.message.trim().length > 0) {
    return err.message;
  }
  if (typeof err.detail === 'string' && err.detail.trim().length > 0) {
    return err.detail;
  }
  if (typeof (err as Record<string, unknown>).error === 'string') {
    return (err as Record<string, unknown>).error as string;
  }

  // Handle Django REST framework field error dictionaries, e.g. { username: ["This field is required."] }
  const fieldKeys = Object.keys(err);
  for (const key of fieldKeys) {
    const val = (err as Record<string, unknown>)[key];
    if (Array.isArray(val) && val.length > 0 && typeof val[0] === 'string') {
      return `${key}: ${val[0]}`;
    }
    if (typeof val === 'string') {
      return `${key}: ${val}`;
    }
  }

  return fallbackStatusText || 'Request failed';
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { body, token, headers = {}, ...restOptions } = options;

  const normalizedBase = env.NEXT_PUBLIC_API_URL.replace(/\/+$/, '');
  const normalizedEndpoint = endpoint.startsWith('http')
    ? endpoint
    : `${normalizedBase}/${endpoint.replace(/^\/+/, '')}`;

  const requestHeaders = new Headers(headers as HeadersInit);
  if (!requestHeaders.has('Accept')) {
    requestHeaders.set('Accept', 'application/json');
  }

  // Resolve authorization token
  let authToken = token;
  if (!authToken && typeof window === 'undefined') {
    try {
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      const sessionCookie = cookieStore.get('recapped_token')?.value;
      if (sessionCookie) {
        authToken = sessionCookie;
      }
    } catch {
      // In server contexts without cookies() scope, continue without auto token
    }
  }

  if (authToken && !requestHeaders.has('Authorization')) {
    requestHeaders.set('Authorization', `Bearer ${authToken}`);
  }

  let serializedBody: BodyInit | undefined;
  if (body !== undefined && body !== null) {
    if (
      typeof body === 'string' ||
      body instanceof FormData ||
      body instanceof URLSearchParams ||
      body instanceof Blob
    ) {
      serializedBody = body as BodyInit;
    } else {
      if (!requestHeaders.has('Content-Type')) {
        requestHeaders.set('Content-Type', 'application/json');
      }
      serializedBody = JSON.stringify(body);
    }
  }

  const response = await fetch(normalizedEndpoint, {
    ...restOptions,
    headers: requestHeaders,
    body: serializedBody,
  });

  // Handle 204 No Content
  if (response.status === 204) {
    return {} as T;
  }

  const contentType = response.headers.get('content-type') || '';
  let responseData: unknown = null;

  if (contentType.includes('application/json')) {
    try {
      responseData = await response.json();
    } catch {
      responseData = null;
    }
  } else {
    try {
      responseData = await response.text();
    } catch {
      responseData = null;
    }
  }

  if (!response.ok) {
    if (response.status === 401 && typeof window !== 'undefined') {
      document.cookie = 'recapped_token=; path=/; max-age=0';
      document.cookie = 'recapped_user=; path=/; max-age=0';
    }
    const message = extractErrorMessage(responseData, response.statusText);
    throw new ApiError(message, response.status, responseData);
  }

  return responseData as T;
}

apiClient.get = <T>(endpoint: string, options?: RequestOptions) =>
  apiClient<T>(endpoint, { ...options, method: 'GET' });

apiClient.post = <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
  apiClient<T>(endpoint, { ...options, method: 'POST', body });

apiClient.put = <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
  apiClient<T>(endpoint, { ...options, method: 'PUT', body });

apiClient.delete = <T>(endpoint: string, options?: RequestOptions) =>
  apiClient<T>(endpoint, { ...options, method: 'DELETE' });
