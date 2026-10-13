import React from 'react';

const SkeletonCard: React.FC<{ delay: number }> = ({ delay }) => (
  <div
    style={{
      borderRadius: 12,
      overflow: 'hidden',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      aspectRatio: '2/3',
      animation: `pulse 1.6s ease-in-out ${delay}s infinite`,
    }}
  >
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, var(--bg2) 0%, var(--surface) 50%, var(--bg2) 100%)',
        backgroundSize: '200% 200%',
        animation: `shimmer 1.6s ease-in-out ${delay}s infinite`,
      }}
    />
  </div>
);

export default function MoviesLoading() {
  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Film strip placeholder */}
      <div
        style={{
          height: 40,
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 16px 80px' }}>
        {/* Header skeleton */}
        <div style={{ marginBottom: 32 }}>
          <div
            style={{
              width: 120,
              height: 12,
              borderRadius: 6,
              background: 'var(--surface)',
              marginBottom: 12,
              animation: 'pulse 1.6s ease-in-out infinite',
            }}
          />
          <div
            style={{
              width: 240,
              height: 48,
              borderRadius: 8,
              background: 'var(--surface)',
              marginBottom: 8,
              animation: 'pulse 1.6s ease-in-out 0.1s infinite',
            }}
          />
          <div
            style={{
              width: 160,
              height: 14,
              borderRadius: 6,
              background: 'var(--surface)',
              animation: 'pulse 1.6s ease-in-out 0.2s infinite',
            }}
          />
        </div>

        {/* Grid skeleton — 10 cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: 20,
          }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <SkeletonCard key={i} delay={i * 0.06} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
