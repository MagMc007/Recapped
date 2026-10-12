import { Suspense } from 'react';
import type { Metadata } from 'next';
import { RegisterForm } from '@/features/auth/components/RegisterForm';

export const metadata: Metadata = {
  title: 'Create Account | Recapped',
  description: 'Join Recapped to discover, rate, and discuss curated movie and series recaps.',
};

export default function RegisterPage() {
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
      <RegisterForm />
    </Suspense>
  );
}
