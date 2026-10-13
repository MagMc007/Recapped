import React from 'react';
import Link from 'next/link';

const CREATORS_LIST = [
  {
    name: 'Mystery Recapped',
    avatar: '/mysteryrecapped.png',
    subscribers: '3.4M subs',
    style: 'Cinematic Storytelling',
    url: 'https://www.youtube.com/@MysteryRecapped',
    desc: 'Atmospheric pacing & voiceover breakdowns of Korean, Spanish, and Hollywood psychological thrillers.',
    badges: ['Parasite', 'Oldboy', 'Shutter Island'],
  },
  {
    name: 'Movie Recaps',
    avatar: '/movierecaps.png',
    subscribers: '2.9M subs',
    style: 'Fast 15-Min Breakdown',
    url: 'https://www.youtube.com/@MovieRecaps',
    desc: 'Crisp plot summaries with clear ending explanations, timelines, and sci-fi character arcs.',
    badges: ['Dark', 'Severance', 'Spirited Away'],
  },
  {
    name: 'Daniel CC Movie',
    avatar: '/danielCC.png',
    subscribers: '2.5M subs',
    style: 'Emotional Narrative',
    url: 'https://www.youtube.com/@DanielCCMovie',
    desc: 'Deep focus on human tragedy, existential dilemmas, and cosmic drama in world cinema.',
    badges: ['Interstellar', 'Incendies', 'Monster'],
  },
  {
    name: 'Film Recaps',
    avatar: '/filmrecaps.png',
    subscribers: '1.9M subs',
    style: 'Horror and Fear',
    url: 'https://www.youtube.com/@FilmRecapsHere',
    desc: 'Chilling, atmospheric breakdowns of psychological horror, survival dread, and paranormal mysteries.',
    badges: ['The Shining', 'The Exit 8', 'What We Hide'],
  },
];

export const CreatorsSection: React.FC = () => {
  return (
    <section
      id="creators"
      style={{
        width: '100%',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg2)',
        padding: '64px 16px 80px',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div
            style={{
              fontSize: 11,
              color: 'var(--accent-light)',
              textTransform: 'uppercase',
              letterSpacing: 2,
              fontWeight: 600,
              marginBottom: 6,
            }}
          >
            ◈ The Storytelling Ecosystem
          </div>
          <h2
            className="font-bebas"
            style={{
              fontSize: 'clamp(32px, 7vw, 64px)',
              letterSpacing: 2,
              lineHeight: 1,
              color: 'var(--text)',
              margin: 0,
            }}
          >
            CURATED RECAP CREATORS
          </h2>
          <p
            style={{
              color: 'var(--muted)',
              fontSize: 'clamp(14px, 3vw, 16px)',
              maxWidth: 640,
              margin: '10px auto 0',
              lineHeight: 1.5,
            }}
          >
            Recapped credits and embeds  YouTube narrators. Discover the creators behind the voices and pick your storytelling style.
          </p>
        </div>

        {/* 4-creator cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 14,
            marginBottom: 28,
          }}
        >
          {CREATORS_LIST.map((creator) => (
            <div
              key={creator.name}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: '16px 18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 12,
                transition: 'border-color 0.2s ease',
              }}
            >
              <div>
                {/* Avatar + Channel Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: '50%',
                      border: '2px solid var(--accent)',
                      flexShrink: 0,
                      objectFit: 'cover',
                    }}
                  />
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: 'var(--text)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {creator.name}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--accent-light)', fontWeight: 600 }}>
                      {creator.subscribers}
                    </div>
                  </div>
                </div>

                {/* Style Badge */}
                <div style={{ marginBottom: 6 }}>
                  <span
                    style={{
                      fontSize: 10,
                      background: 'var(--accent-glow)',
                      color: 'var(--accent-light)',
                      border: '1px solid var(--accent)',
                      borderRadius: 4,
                      padding: '2px 6px',
                      fontWeight: 600,
                    }}
                  >
                    {creator.style}
                  </span>
                </div>

                <p style={{ color: 'var(--muted)', fontSize: 12, lineHeight: 1.45, margin: 0 }}>
                  {creator.desc}
                </p>
              </div>

              {/* Footer link to YouTube */}
              <div
                style={{
                  paddingTop: 10,
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: 10, color: 'var(--muted)' }}>
                  {creator.badges.slice(0, 2).join(' · ')}
                </span>
                <a
                  href={creator.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--accent)',
                    fontSize: 11,
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  YouTube ↗
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer & Bottom CTA */}
        <div
          style={{
            background: 'var(--bg3)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            fontSize: 12,
            color: 'var(--muted)',
          }}
        >
          <span>
            All video recaps stream via official YouTube embeds and remain property of their creators.
          </span>

          <Link
            href="/movies"
            style={{
              background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%)',
              border: 'none',
              borderRadius: 8,
              padding: '8px 18px',
              color: '#fff',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 0 16px var(--accent-glow)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            Start Watching Recaps →
          </Link>
        </div>
      </div>
    </section>
  );
};
