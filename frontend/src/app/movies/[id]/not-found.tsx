import React from 'react';
import Link from 'next/link';

export default function MovieDetailNotFound() {
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
        background: 'var(--bg)',
      }}
    >
      <div
        style={{
          fontSize: 64,
          marginBottom: 12,
          filter: 'drop-shadow(0 0 24px var(--accent-glow))',
        }}
      >
        🎬
      </div>

      <div
        style={{
          fontSize: 12,
          color: 'var(--accent-light)',
          textTransform: 'uppercase',
          letterSpacing: 2.5,
          fontWeight: 700,
          marginBottom: 8,
        }}
      >
        ◈ 404 Error
      </div>

      <h1
        className="font-bebas"
        style={{
          fontSize: 'clamp(40px, 8vw, 68px)',
          letterSpacing: 2,
          lineHeight: 1,
          marginBottom: 16,
          color: 'var(--text)',
        }}
      >
        RECAP NOT FOUND
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
        The movie or series recap you are looking for does not exist in our library, or may have been relocated.
      </p>

      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          href="/movies"
          style={{
            background: 'var(--accent)',
            color: '#fff',
            textDecoration: 'none',
            padding: '10px 24px',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 14,
            boxShadow: '0 0 20px var(--accent-glow)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span>←</span> Back to All Recaps
        </Link>
      </div>
    </div>
  );
}
