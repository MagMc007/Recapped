'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { User as UserIcon, Lock, Loader2 } from 'lucide-react';
import { RecappedLogo } from '@/components/RecappedLogo';
import { loginAction } from '../actions';
import { useAuth } from '../hooks/useAuth';

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';
  const { setUser } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setFieldErrors({});

    startTransition(async () => {
      const result = await loginAction({ username, password });
      if (!result.success) {
        if (result.error) setErrorMessage(result.error);
        if (result.fieldErrors) setFieldErrors(result.fieldErrors);
        return;
      }

      if (result.user) {
        setUser(result.user);
      }
      router.push(redirectTo);
      router.refresh();
    });
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 420,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: '32px 24px',
        margin: '30px 10px',
        boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
        color: 'var(--text)',
      }}
    >
      {/* Brand header */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
          <RecappedLogo size={52} />
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-bebas, "Bebas Neue", sans-serif)',
            fontSize: 32,
            letterSpacing: 1.5,
            margin: 0,
            color: 'var(--text)',
          }}
        >
          WELCOME TO RECAPPED
        </h1>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6 }}>
          Sign in to access your profile, watchlists, and rating history.
        </p>
      </div>

      {/* Tab Switcher */}
      <div
        style={{
          display: 'flex',
          borderRadius: 8,
          background: 'var(--bg2)',
          padding: 4,
          border: '1px solid var(--border)',
          marginBottom: 20,
        }}
      >
        <span
          style={{
            flex: 1,
            textAlign: 'center',
            padding: '8px',
            fontSize: 12,
            fontWeight: 600,
            borderRadius: 6,
            background: 'var(--accent)',
            color: '#fff',
            cursor: 'default',
          }}
        >
          Sign In
        </span>
        <Link
          href={`/register${redirectTo !== '/' ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`}
          style={{
            flex: 1,
            textAlign: 'center',
            padding: '8px',
            fontSize: 12,
            fontWeight: 600,
            borderRadius: 6,
            color: 'var(--muted)',
            textDecoration: 'none',
            transition: 'all 0.2s',
          }}
        >
          Create Account
        </Link>
      </div>

      {/* Global Error Banner */}
      {errorMessage && (
        <div
          role="alert"
          style={{
            padding: '10px 14px',
            borderRadius: 8,
            background: 'rgba(255,80,80,0.12)',
            border: '1px solid rgba(255,80,80,0.3)',
            color: '#ff8080',
            fontSize: 13,
            marginBottom: 16,
          }}
        >
          {errorMessage}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label
            htmlFor="username"
            style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', display: 'block', marginBottom: 6 }}
          >
            Username
          </label>
          <div style={{ position: 'relative' }}>
            <UserIcon
              style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 16,
                height: 16,
                color: 'var(--muted)',
                pointerEvents: 'none',
              }}
            />
            <input
              id="username"
              name="username"
              type="text"
              required
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="cinema_lover"
              style={{
                width: '100%',
                background: 'var(--bg2)',
                border: fieldErrors.username ? '1px solid #ff8080' : '1px solid var(--border)',
                borderRadius: 8,
                padding: '10px 14px 10px 38px',
                color: 'var(--text)',
                fontSize: 14,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
          {fieldErrors.username && (
            <p style={{ color: '#ff8080', fontSize: 12, marginTop: 4 }}>{fieldErrors.username[0]}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', display: 'block', marginBottom: 6 }}
          >
            Password
          </label>
          <div style={{ position: 'relative' }}>
            <Lock
              style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 16,
                height: 16,
                color: 'var(--muted)',
                pointerEvents: 'none',
              }}
            />
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%',
                background: 'var(--bg2)',
                border: fieldErrors.password ? '1px solid #ff8080' : '1px solid var(--border)',
                borderRadius: 8,
                padding: '10px 14px 10px 38px',
                color: 'var(--text)',
                fontSize: 14,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
          {fieldErrors.password && (
            <p style={{ color: '#ff8080', fontSize: 12, marginTop: 4 }}>{fieldErrors.password[0]}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          style={{
            marginTop: 6,
            padding: '12px',
            borderRadius: 8,
            background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%)',
            border: 'none',
            color: '#fff',
            fontSize: 14,
            fontWeight: 700,
            cursor: isPending ? 'not-allowed' : 'pointer',
            opacity: isPending ? 0.75 : 1,
            boxShadow: '0 0 16px var(--accent-glow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transition: 'opacity 0.2s',
          }}
        >
          {isPending && <Loader2 className="animate-spin" style={{ width: 16, height: 16 }} />}
          {isPending ? 'Signing In...' : 'Sign In to Recapped'}
        </button>
      </form>

      {/* Footer Info */}
      <div style={{ marginTop: 20, textAlign: 'center', fontSize: 13, color: 'var(--muted)' }}>
        Don&apos;t have an account?{' '}
        <Link
          href={`/register${redirectTo !== '/' ? `?redirect=${encodeURIComponent(redirectTo)}` : ''}`}
          style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}
        >
          Create one now
        </Link>
      </div>
    </div>
  );
};
