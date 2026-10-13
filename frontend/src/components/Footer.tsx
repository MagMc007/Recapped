import React from 'react';
import Link from 'next/link';
import { RecappedLogo } from './RecappedLogo';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        background: 'var(--bg2)',
        borderTop: '1px solid var(--border)',
        padding: '36px 16px 28px',
        color: 'var(--muted)',
        fontSize: 13,
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginBottom: 32 }}>
          {/* Col 1 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <RecappedLogo size={36} />
              <span className="font-bebas" style={{ fontSize: 24, letterSpacing: 2, color: 'var(--text)' }}>
                RECAPPED
              </span>
            </div>
            <p style={{ lineHeight: 1.6, fontSize: 13 }}>
              Context-first cinema recaps. Replacing clickbait thumbnails with real posters, IMDb scores, and multi-creator selection.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <div style={{ fontSize: 12, color: 'var(--accent-light)', textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700, marginBottom: 12 }}>
              Navigation
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link href="/" style={footerLink}>
                Home
              </Link>
              <Link href="/movies" style={footerLink}>
                All Recaps
              </Link>
              <Link href="/#dilemma" style={footerLink}>
                The Dilemma
              </Link>
              <Link href="/#how-it-works" style={footerLink}>
                How It Works
              </Link>
              <Link href="/#creators" style={footerLink}>
                Recap Creators
              </Link>
            </div>
          </div>

          {/* Col 3 */}
          <div>
            <div style={{ fontSize: 12, color: 'var(--accent-light)', textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700, marginBottom: 12 }}>
              Creators Indexed
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <a href="https://www.youtube.com/@MysteryRecapped" target="_blank" rel="noopener noreferrer" style={footerA}>
                Mystery Recapped ↗
              </a>
              <a href="https://www.youtube.com/@MovieRecaps" target="_blank" rel="noopener noreferrer" style={footerA}>
                Movie Recaps ↗
              </a>
              <a href="https://www.youtube.com/@DanielCCMovie" target="_blank" rel="noopener noreferrer" style={footerA}>
                Daniel CC Movie ↗
              </a>
              <a href="https://www.youtube.com/@FilmRecaps" target="_blank" rel="noopener noreferrer" style={footerA}>
                Film Recaps ↗
              </a>
            </div>
          </div>

          {/* Col 4 */}
          <div>
            <div style={{ fontSize: 12, color: 'var(--accent-light)', textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700, marginBottom: 12 }}>
              Disclaimer
            </div>
            <p style={{ lineHeight: 1.6, fontSize: 12 }}>
              Recapped does not host video files. All videos are streamed directly from YouTube content creators via YouTube's official player. All rights belong to original filmmakers and narrators.
            </p>
          </div>
        </div>

        <div
          style={{
            paddingTop: 24,
            borderTop: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
            fontSize: 12,
          }}
        >
          <div>© 2026 Recapped. Spoilers ahead — watch out and take care.</div>
          <div style={{ color: 'var(--accent)' }}>Designed for Story Lovers</div>
        </div>
      </div>
    </footer>
  );
};

const footerLink: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'var(--muted)',
  textAlign: 'left',
  textDecoration: 'none',
  cursor: 'pointer',
  padding: 0,
  fontSize: 13,
  transition: 'color 0.2s',
};

const footerA: React.CSSProperties = {
  color: 'var(--muted)',
  textDecoration: 'none',
  fontSize: 13,
  transition: 'color 0.2s',
};
