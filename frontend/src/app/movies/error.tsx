'use client';

import React from 'react';
import Link from 'next/link';

interface MoviesErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MoviesError({ error, reset }: MoviesErrorProps) {
  return (
    <div
      style={{
        paddingTop: 64,
        minHeight: '100vh',
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          maxWidth: 480,
          width: '100%',
          margin: '0 auto',
          padding: '48px 24px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 56, marginBottom: 16 }}>⚠️</div>

        <div
          className="font-bebas"
          style={{
            fontSize: 32,
            letterSpacing: 2,
            color: 'var(--text)',
            marginBottom: 8,
          }}
        >
          Something went wrong
        </div>

        <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 28, lineHeight: 1.6 }}>
          {error.message || 'Failed to load movies. Please try again.'}
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={reset}
            style={{
              background: 'var(--accent)',
              border: 'none',
              borderRadius: 8,
              padding: '10px 24px',
              color: '#fff',
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
              transition: 'opacity 0.2s',
            }}
          >
            Try Again
          </button>

          <Link
            href="/"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '10px 24px',
              color: 'var(--text)',
              fontWeight: 600,
              fontSize: 14,
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
