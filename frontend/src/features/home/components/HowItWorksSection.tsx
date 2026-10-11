import React from 'react';

export const HowItWorksSection: React.FC = () => {
  return (
    <section
      id="how-it-works"
      style={{
        width: '100%',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg)',
        padding: '64px 16px 72px',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
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
            ◈ The Solution Architecture
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
            HOW RECAPPED WORKS
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
            We take fragmented video recaps on YouTube and map them directly to official theatrical archives,
            verified ratings, and multi-creator players.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 16,
            marginBottom: 36,
          }}
        >
          {/* Pillar 1 */}
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: 24,
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                background: 'var(--accent-glow)',
                border: '1px solid var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                marginBottom: 14,
              }}
            >
              🎨
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>
              Official Theatrical Posters
            </h3>
            <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.6 }}>
              No sensationalist arrows or AI faces. Every recap is matched with verified high-definition promotional
              posters and official festival selections.
            </p>
          </div>

          {/* Pillar 2 */}
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: 24,
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                background: 'var(--accent-glow)',
                border: '1px solid var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                marginBottom: 14,
              }}
            >
              📊
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>
              Verified OMDb &amp; IMDb Context
            </h3>
            <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.6 }}>
              Check real audience and critic ratings, Rotten Tomatoes percentages, release years, directors, and principal
              cast before committing watch time.
            </p>
          </div>

          {/* Pillar 3 */}
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: 24,
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                background: 'var(--accent-glow)',
                border: '1px solid var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                marginBottom: 14,
              }}
            >
              🔀
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>
              Multi-Source Recap Engine
            </h3>
            <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.6 }}>
              Multiple channels cover the same title. Switch between creators directly within the player (14 min summary
              vs. 28 min deep dive).
            </p>
          </div>

          {/* Pillar 4 */}
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: 24,
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                background: 'var(--accent-glow)',
                border: '1px solid var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                marginBottom: 14,
              }}
            >
              ⭐
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>
              Community Ratings (1–5 Stars)
            </h3>
            <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.6 }}>
              Rate recaps and movies with a clean 1–5 star rating system to guide other cinema lovers toward the most
              gripping stories and skilled narrators.
            </p>
          </div>
        </div>

        {/* 3-Step Flow */}
        <div
          style={{
            background: 'var(--bg2)',
            border: '1px solid var(--border)',
            borderRadius: 14,
            padding: '28px 20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 16,
          }}
        >
          <div style={{ padding: 16, background: 'var(--surface)', borderRadius: 10, border: '1px solid var(--border)' }}>
            <div className="font-bebas" style={{ fontSize: 20, color: 'var(--accent)', marginBottom: 6 }}>
              DISCOVER
            </div>
            <p style={{ color: 'var(--muted)', fontSize: 12, lineHeight: 1.5, margin: 0 }}>
              Filter movies or series by genre, country, year, or minimum IMDb rating. Search by director or film name.
            </p>
          </div>

          <div style={{ padding: 16, background: 'var(--surface)', borderRadius: 10, border: '1px solid var(--border)' }}>
            <div className="font-bebas" style={{ fontSize: 20, color: 'var(--accent)', marginBottom: 6 }}>
              CHOOSE NARRATOR
            </div>
            <p style={{ color: 'var(--muted)', fontSize: 12, lineHeight: 1.5, margin: 0 }}>
              Select whether you want a quick 15-minute plot recap or a detailed 25-minute twist breakdown from verified creators.
            </p>
          </div>

          <div style={{ padding: 16, background: 'var(--surface)', borderRadius: 10, border: '1px solid var(--border)' }}>
            <div className="font-bebas" style={{ fontSize: 20, color: 'var(--accent)', marginBottom: 6 }}>
                WATCH &amp; RATE
            </div>
            <p style={{ color: 'var(--muted)', fontSize: 12, lineHeight: 1.5, margin: 0 }}>
              Stream in HD with theater mode. Give your 1–5 star rating to help curate the best recaps for story lovers worldwide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
