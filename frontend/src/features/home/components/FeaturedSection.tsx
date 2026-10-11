import React from 'react';
import Link from 'next/link';
import { MovieCard } from '@/features/movies/components/MovieCard';
import { SAMPLE_MEDIA } from '@/features/home/data/sampleMedia';

export const FeaturedSection: React.FC = () => {
  return (
    <section
      id="trending"
      style={{
        width: '100%',
        maxWidth: 1280,
        margin: '0 auto',
        padding: '36px 16px 56px',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 20,
          flexWrap: 'wrap',
          gap: 10,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              color: 'var(--accent-light)',
              textTransform: 'uppercase',
              letterSpacing: 2,
              fontWeight: 600,
            }}
          >
            ◈ Verified Cinema Archive
          </div>
          <h2
            className="font-bebas"
            style={{
              fontSize: 'clamp(28px, 5vw, 40px)',
              letterSpacing: 1.5,
              color: 'var(--text)',
              margin: 0,
            }}
          >
            POPULAR RECAPS
          </h2>
        </div>

        <Link
          href="/movies"
          style={{
            background: 'var(--accent-glow)',
            border: '1px solid var(--accent)',
            borderRadius: 8,
            padding: '7px 16px',
            color: 'var(--accent-light)',
            fontSize: 12,
            cursor: 'pointer',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            textDecoration: 'none',
          }}
        >
          Explore All Recaps &amp; Filters →
        </Link>
      </div>

      {/* Responsive Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
          gap: 16,
        }}
      >
        {SAMPLE_MEDIA.map((movie, idx) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            href={`/movies`}
            index={idx}
          />
        ))}
      </div>
    </section>
  );
};
