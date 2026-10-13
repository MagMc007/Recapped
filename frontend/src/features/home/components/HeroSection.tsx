'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { RecappedLogo } from '@/components/RecappedLogo';
import { useAuth } from '@/features/auth/hooks/useAuth';

interface HeroSectionProps {
  onOpenAuth?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAuth }) => {
  const { isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hideAuth = mounted && isAuthenticated;
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '28px 16px 44px',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Cinematic ambient background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 70% 60% at 50% 35%, rgba(77,124,254,0.16) 0%, rgba(42,79,199,0.06) 40%, transparent 70%)',
          }}
        />
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${i * 17 + 2}%`,
              width: 1,
              background: 'var(--border)',
              opacity: 0.35,
            }}
          />
        ))}
      </div>

      {/* Scanline sweep effect */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: 2,
            background: 'linear-gradient(to bottom, transparent, rgba(77,124,254,0.12), transparent)',
            animation: 'scanline 8s linear infinite',
          }}
        />
      </div>

      {/* Hero Content Box */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        {/* Logo with drop-in & halo animation */}
        <div className="fade-in" style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
          <div className="block sm:hidden">
            <RecappedLogo size={150} heroMode={true} />
          </div>
          <div className="hidden sm:block">
            <RecappedLogo size={150} heroMode={true} />
          </div>
        </div>

        {/* Title */}
        <div className="fade-up delay-1" style={{ overflow: 'hidden', marginBottom: 6 }}>
          <h1
            className="font-bebas"
            style={{
              fontSize: 'clamp(26px, 5.5vw, 60px)',
              letterSpacing: 'clamp(2.5px, 0.8vw, 5px)',
              lineHeight: 1.1,
              background: 'linear-gradient(135deg, var(--accent-light) 0%, var(--accent) 50%, var(--accent2) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'flicker 7s ease-in-out infinite',
              margin: 0,
              textAlign: 'center',
            }}
          >
            <div>SPOILERS AHEAD</div>
            <div>WATCH OUT AND TAKE CARE</div>
          </h1>
        </div>

        {/* Decorative divider */}
        <div
          className="fade-up delay-3"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            maxWidth: 280,
            margin: '0 auto 32px',
          }}
        >
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, var(--accent))' }} />
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: 'var(--accent)',
              boxShadow: '0 0 10px var(--accent)',
            }}
          />
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left, transparent, var(--accent))' }} />
        </div>

        {/* Hero CTAs */}
        <div
          className="fade-up delay-4"
          style={{
            display: 'flex',
            gap: 14,
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: 40,
          }}
        >
          <Link href="/movies" style={heroAccentBtn}>
            <span>Watch Recaps</span>
            <span style={{ fontSize: 16 }}>▶</span>
          </Link>

          {!hideAuth && (
            onOpenAuth ? (
              <button type="button" style={heroGhostBtn} onClick={onOpenAuth}>
                <span>Sign In / Register</span>
              </button>
            ) : (
              <Link href="/login" style={heroGhostBtn}>
                <span>Sign In / Register</span>
              </Link>
            )
          )}
        </div>

        {/* Hero Stats */}
        <div
          className="fade-up delay-5"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: 10,
            maxWidth: 550,
            margin: '0 auto',
          }}
        >
          {[
            ['500+', 'Recaps Curated'],
            ['20+', 'Global Origins'],
            ['100%', 'Spoilers']
          ].map(([n, l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div
                className="font-bebas"
                style={{
                  fontSize: 'clamp(28px, 6vw, 36px)',
                  color: 'var(--accent-light)',
                  letterSpacing: 1.5,
                }}
              >
                {n}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: 'var(--muted)',
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                  fontWeight: 600,
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const heroAccentBtn: React.CSSProperties = {
  background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%)',
  color: '#fff',
  border: 'none',
  padding: '13px 28px',
  borderRadius: 10,
  fontSize: 14,
  fontWeight: 700,
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  textDecoration: 'none',
  boxShadow: '0 4px 24px var(--accent-glow)',
  letterSpacing: 0.5,
  transition: 'transform 0.2s, box-shadow 0.2s',
};

const heroGhostBtn: React.CSSProperties = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  color: 'var(--text)',
  padding: '13px 26px',
  borderRadius: 10,
  fontSize: 14,
  fontWeight: 600,
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  textDecoration: 'none',
  transition: 'border-color 0.2s, background 0.2s',
};
