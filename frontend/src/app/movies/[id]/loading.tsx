import React from 'react';

export default function MovieDetailLoading() {
  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Sub-nav skeleton */}
      <div
        style={{
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg2)',
          padding: '12px 16px',
        }}
      >
        <div
          style={{
            maxWidth: 1080,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              width: 100,
              height: 28,
              borderRadius: 6,
              background: 'var(--surface)',
              animation: 'pulse 1.6s ease-in-out infinite',
            }}
          />
          <div
            style={{
              width: 220,
              height: 24,
              borderRadius: 6,
              background: 'var(--surface)',
              animation: 'pulse 1.6s ease-in-out 0.1s infinite',
            }}
          />
          <div
            style={{
              width: 80,
              height: 28,
              borderRadius: 6,
              background: 'var(--surface)',
              animation: 'pulse 1.6s ease-in-out 0.2s infinite',
            }}
          />
        </div>
      </div>

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '16px 16px 80px' }}>
        {/* Video Player Skeleton (16:9) */}
        <div
          style={{
            maxWidth: '980px',
            margin: '0 auto 16px',
            borderRadius: 12,
            overflow: 'hidden',
            border: '1px solid var(--border)',
            background: 'var(--bg2)',
            position: 'relative',
            paddingBottom: '56.25%',
            height: 0,
            boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, var(--bg2) 0%, var(--surface) 50%, var(--bg2) 100%)',
              backgroundSize: '200% 200%',
              animation: 'shimmer 1.8s ease-in-out infinite',
            }}
          />
        </div>

        {/* Creator Strip Skeleton */}
        <div
          style={{
            maxWidth: '980px',
            margin: '0 auto 16px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'var(--bg3)',
              animation: 'pulse 1.6s ease-in-out infinite',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div
              style={{
                width: 140,
                height: 14,
                borderRadius: 4,
                background: 'var(--bg3)',
                animation: 'pulse 1.6s ease-in-out 0.1s infinite',
              }}
            />
            <div
              style={{
                width: 220,
                height: 10,
                borderRadius: 4,
                background: 'var(--bg3)',
                animation: 'pulse 1.6s ease-in-out 0.2s infinite',
              }}
            />
          </div>
        </div>

        {/* Context Deck Skeleton */}
        <div
          style={{
            maxWidth: '980px',
            margin: '0 auto',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: '20px',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 160px) minmax(0, 1fr)',
            gap: 24,
          }}
        >
          {/* Poster Skeleton */}
          <div
            style={{
              borderRadius: 10,
              aspectRatio: '2/3',
              background: 'var(--bg2)',
              border: '1px solid var(--border)',
              animation: 'pulse 1.6s ease-in-out infinite',
            }}
          />

          {/* Details Skeleton */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div
              style={{
                width: '60%',
                height: 36,
                borderRadius: 6,
                background: 'var(--bg2)',
                animation: 'pulse 1.6s ease-in-out 0.1s infinite',
              }}
            />
            <div
              style={{
                width: '40%',
                height: 16,
                borderRadius: 4,
                background: 'var(--bg2)',
                animation: 'pulse 1.6s ease-in-out 0.2s infinite',
              }}
            />
            <div
              style={{
                width: '100%',
                height: 60,
                borderRadius: 8,
                background: 'var(--bg2)',
                animation: 'pulse 1.6s ease-in-out 0.3s infinite',
              }}
            />
            <div
              style={{
                width: '100%',
                height: 80,
                borderRadius: 8,
                background: 'var(--bg2)',
                animation: 'pulse 1.6s ease-in-out 0.4s infinite',
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
