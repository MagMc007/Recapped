import Link from 'next/link';
import { FilmStrip } from '@/components/FilmStrip';

export default function Home() {
  return (
    <div style={{ paddingTop: 64, minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
      <FilmStrip />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '60px 20px',
        }}
      >
        <div
          style={{
            fontSize: 12,
            color: 'var(--accent-light)',
            textTransform: 'uppercase',
            letterSpacing: 2.5,
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          ◈ Context-First Cinema Recaps
        </div>
        <h1
          className="font-bebas"
          style={{
            fontSize: 'clamp(44px, 8vw, 84px)',
            letterSpacing: 3,
            lineHeight: 1,
            marginBottom: 18,
            color: 'var(--text)',
          }}
        >
          SPOILERS AHEAD, WATCH OUT
        </h1>
        <p
          style={{
            maxWidth: 580,
            color: 'var(--muted)',
            fontSize: 16,
            lineHeight: 1.6,
            marginBottom: 32,
          }}
        >
          Replacing clickbait thumbnails with real posters, verified IMDb metadata,
          and multi-creator recaps from top YouTube storytellers.
        </p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link
            href="/movies"
            style={{
              background: 'var(--accent)',
              color: '#fff',
              textDecoration: 'none',
              padding: '12px 28px',
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 14,
              boxShadow: '0 0 24px var(--accent-glow)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span>🎬</span> Explore All Recaps
          </Link>
        </div>
      </div>
    </div>
  );
}
