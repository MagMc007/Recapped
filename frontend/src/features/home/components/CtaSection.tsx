'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/features/auth/hooks/useAuth';

export const CtaSection: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hideAuth = mounted && isAuthenticated;

  return (
    <section
      style={{
        width: '100%',
        borderTop: '1px solid var(--border)',
        background: 'linear-gradient(180deg, var(--bg2) 0%, var(--bg) 100%)',
        padding: '72px 16px 84px',
        position: 'relative',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background glow circle */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 350,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(77,124,254,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div
          style={{
            fontSize: 11,
            color: 'var(--accent-light)',
            textTransform: 'uppercase',
            letterSpacing: 2,
            fontWeight: 700,
            marginBottom: 10,
          }}
        >
          ◈ Start Your Journey
        </div>

        <h2
          className="font-bebas"
          style={{
            fontSize: 'clamp(36px, 7vw, 68px)',
            letterSpacing: 2,
            lineHeight: 1.05,
            color: 'var(--text)',
            marginBottom: 16,
          }}
        >
          READY TO EXPERIENCE CINEMA WITHOUT CLICKBAIT?
        </h2>

        <p
          style={{
            color: 'var(--muted)',
            fontSize: 'clamp(14px, 3vw, 16px)',
            maxWidth: 620,
            margin: '0 auto 36px',
            lineHeight: 1.6,
          }}
        >
          Explore hundreds of curated recaps across all genres, choose your preferred narrator,
          and enjoy the best cinema breakdowns with zero misleading spoilers.
        </p>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/movies"
            style={{
              background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%)',
              color: '#fff',
              textDecoration: 'none',
              padding: '13px 32px',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 700,
              boxShadow: '0 4px 24px var(--accent-glow)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              letterSpacing: 0.5,
            }}
          >
            <span>Explore All Recaps</span>
            <span style={{ fontSize: 16 }}>▶</span>
          </Link>

          {!hideAuth && (
            <Link
              href="/register"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                textDecoration: 'none',
                padding: '13px 28px',
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span>Create Free Account</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};
