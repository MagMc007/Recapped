import { Suspense } from 'react';
import type { Metadata } from 'next';
import { LoginForm } from '@/features/auth/components/LoginForm';

export const metadata: Metadata = {
  title: 'Sign In | Recapped',
  description: 'Sign in to access your profile, watchlists, and movie recap ratings on Recapped.',
};

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            height: 480,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--muted)',
            fontSize: 14,
          }}
        >
          Loading...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
