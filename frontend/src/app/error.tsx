'use client';

import React, { useEffect } from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: '75vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '80px 20px',
      }}
    >
      <div
        style={{
          fontSize: 64,
          marginBottom: 12,
          filter: 'drop-shadow(0 0 24px rgba(239, 68, 68, 0.4))',
        }}
      >
        ⚠️
      </div>

      <div
        style={{
          fontSize: 12,
          color: '#ef4444',
          textTransform: 'uppercase',
          letterSpacing: 2.5,
          fontWeight: 700,
          marginBottom: 8,
        }}
      >
        ◈ Playback Interrupted
      </div>

      <h1
        className="font-bebas"
        style={{
          fontSize: 'clamp(40px, 7vw, 70px)',
          letterSpacing: 2,
          lineHeight: 1,
          marginBottom: 16,
          color: 'var(--text)',
        }}
      >
        SOMETHING WENT WRONG
      </h1>

      <p
        style={{
          maxWidth: 480,
          color: 'var(--muted)',
          fontSize: 15,
          lineHeight: 1.6,
          marginBottom: 32,
        }}
      >
        {error.message || 'An unexpected error occurred while loading this page.'}
      </p>

      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={() => reset()}
          style={{
            background: 'var(--accent)',
            color: '#fff',
            border: 'none',
            padding: '10px 22px',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 14,
            cursor: 'pointer',
            boxShadow: '0 0 20px var(--accent-glow)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
          type="button"
        >
          <span>↻</span> Try Again
        </button>

        <button
          onClick={() => (window.location.href = '/')}
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            padding: '10px 22px',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 14,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
          type="button"
        >
          <span>🏠</span> Return Home
        </button>
      </div>
    </div>
  );
}
