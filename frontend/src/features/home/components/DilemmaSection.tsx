import React from 'react';

export const DilemmaSection: React.FC = () => {
  return (
    <section
      id="dilemma"
      style={{
        width: '100%',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg2)',
        padding: '64px 16px 72px',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
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
            WHY YOUTUBE BROKE MOVIE RECAPS
          </h2>
          <p
            style={{
              color: 'var(--muted)',
              fontSize: 'clamp(14px, 3vw, 16px)',
              maxWidth: 680,
              margin: '12px auto 0',
              lineHeight: 1.5,
            }}
          >
            Story lovers waste 30 minutes clicking sensationalist clickbait titles and hallucinated AI thumbnails,
            without ever knowing the actual film title, release year, or official rating.
          </p>
        </div>

        {/* 3 Core Problem Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 18,
            marginBottom: 36,
          }}
        >
          {/* Problem 01 */}
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                className="font-bebas"
                style={{
                  fontSize: 28,
                  color: 'var(--accent)',
                  letterSpacing: 2,
                  marginBottom: 6,
                }}
              >
                01. CLICKBAIT & FAKE AI THUMBNAILS
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
                Sensationalist Titles Hide Real Cinema
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.6 }}>
                Videos are disguised as <em>&ldquo;A Greedy Man Visits A Strange Hotel and Regrets It Forever&rdquo;</em> alongside
                glowing AI-generated monsters that don&apos;t exist in any frame of the film. Creators deliberately omit
                the movie title, year, and director to exploit YouTube search algorithms.
              </p>
            </div>

            <div
              style={{
                marginTop: 16,
                padding: '8px 12px',
                background: 'var(--bg2)',
                borderRadius: 8,
                border: '1px solid rgba(255,80,80,0.2)',
                fontSize: 12,
                color: '#ff8585',
              }}
            >
              ❌ Result: 25 minutes lost on reppeling recaps you never meant to watch.
            </div>
          </div>

          {/* Problem 02 */}
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                className="font-bebas"
                style={{
                  fontSize: 28,
                  color: 'var(--accent)',
                  letterSpacing: 2,
                  marginBottom: 6,
                }}
              >
                02. COMMENT SECTION SPOILER MINES
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
                Hunting For The Name Ruins The Climax
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.6 }}>
                When viewers scroll down to YouTube comments to ask <em>&ldquo;What movie is this?&rdquo;</em>, the top reply
                inevitably spoils the entire third-act twist: <em>&ldquo;Movie is The Mist and he kills his son right before the military arrives.&rdquo;</em>
              </p>
            </div>

            <div
              style={{
                marginTop: 16,
                padding: '8px 12px',
                background: 'var(--bg2)',
                borderRadius: 8,
                border: '1px solid rgba(255,80,80,0.2)',
                fontSize: 12,
                color: '#ff8585',
              }}
            >
              ❌ Result: The climax is ruined before you can decide to watch the original.
            </div>
          </div>

          {/* Problem 03 */}
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                className="font-bebas"
                style={{
                  fontSize: 28,
                  color: 'var(--accent)',
                  letterSpacing: 2,
                  marginBottom: 6,
                }}
              >
                03. NARRATOR LOCK-IN & ZERO CONTEXT
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
                No Ratings, Pacing Choice, or Metadata
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.6 }}>
                You are trapped with whatever monotone automated voice the algorithm picks. You can&apos;t see whether the film
                is an acclaimed 8.6 IMDb masterpiece or a 2.1 flop, and you have no way to switch between an 8-min quick summary
                or a 22-min deep dive.
              </p>
            </div>

            <div
              style={{
                marginTop: 16,
                padding: '8px 12px',
                background: 'var(--bg2)',
                borderRadius: 8,
                border: '1px solid rgba(255,80,80,0.2)',
                fontSize: 12,
                color: '#ff8585',
              }}
            >
              ❌ Result: Fragmented experience with zero quality filter or creator control.
            </div>
          </div>
        </div>

        {/* Side-by-Side Reality Check Box */}
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 14,
            padding: '24px 20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
          }}
        >
          {/* YouTube Side */}
          <div
            style={{
              background: 'rgba(255,50,50,0.06)',
              border: '1px solid rgba(255,80,80,0.2)',
              borderRadius: 10,
              padding: 16,
            }}
          >
            <div style={{ color: '#ff6b6b', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 }}>
              YouTube Search Reality
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, color: 'var(--muted)', fontSize: 12 }}>
              <li>❌ Title: &ldquo;A Boy Travels Into The Ocean And Everyone Dies (RECAP)&rdquo;</li>
              <li>❌ Thumbnail: Fake AI glowing submarine with giant monster</li>
              <li>❌ Metadata: Year unknown, Director unknown, Origin unknown</li>
              <li>❌ Quality: Might be a 2.5 IMDb direct-to-video flop</li>
              <li>❌ Sources: Locked to one random channel</li>
            </ul>
          </div>

          {/* Recapped Side */}
          <div
            style={{
              background: 'rgba(77,124,254,0.08)',
              border: '1px solid var(--accent)',
              borderRadius: 10,
              padding: 16,
            }}
          >
            <div style={{ color: 'var(--accent-light)', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 }}>
              The Recapped Solution
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, color: 'var(--text)', fontSize: 12 }}>
              <li>✓ Title: Parasite (2019) · Directed by Bong Joon-ho</li>
              <li>✓ Poster: Official Theatrical Release Artwork</li>
              <li>✓ Metadata: South Korea · 132 min · 8.6 IMDb · 99% Rotten Tomatoes</li>
              <li>✓ Quality: Certified masterworks upfront before committing watch time</li>
              <li>✓ Sources: Toggle between 3 different  recap narrators</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
