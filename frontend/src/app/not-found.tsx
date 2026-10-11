import Link from 'next/link';

export default function NotFound() {
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
          fontSize: 'clamp(42px, 8vw, 76px)',
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
        This reel was lost in the cutting room or the movie title does not exist in our library.
        Take care, spoilers might be lurking elsewhere.
      </p>

      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          href="/"
          style={{
            background: 'var(--accent)',
            color: '#fff',
            textDecoration: 'none',
            padding: '10px 22px',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 14,
            boxShadow: '0 0 20px var(--accent-glow)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span>🏠</span> Back to Home
        </Link>

        <Link
          href="/movies"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            textDecoration: 'none',
            padding: '10px 22px',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 14,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span>🎬</span> Browse All Recaps
        </Link>
      </div>
    </div>
  );
}
