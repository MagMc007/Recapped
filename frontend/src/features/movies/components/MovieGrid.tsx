import React from 'react';
import { MovieCard } from './MovieCard';
import { movieToMediaItem } from '../types';
import type { Movie } from '@/types/api';

interface MovieGridProps {
  movies: Movie[];
  hasFilters?: boolean;
}

const EmptyState: React.FC<{ hasFilters?: boolean }> = ({ hasFilters }) => (
  <div
    style={{
      textAlign: 'center',
      padding: '80px 16px',
      color: 'var(--muted)',
    }}
  >
    <div style={{ fontSize: 52, marginBottom: 16 }}>🎬</div>
    <div
      className="font-bebas"
      style={{ fontSize: 28, letterSpacing: 2, color: 'var(--text)', marginBottom: 8 }}
    >
      No recaps found
    </div>
    <div style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 16 }}>
      {hasFilters
        ? 'No titles match your selected filters. Try adjusting or clearing your filters.'
        : 'There are no titles to display right now. Check back later.'}
    </div>
    {hasFilters && (
      <a
        href="/movies"
        style={{
          display: 'inline-block',
          background: 'var(--accent)',
          color: '#ffffff',
          borderRadius: 8,
          padding: '8px 18px',
          fontSize: 13,
          fontWeight: 600,
          textDecoration: 'none',
          transition: 'opacity 0.2s',
        }}
      >
        Clear All Filters
      </a>
    )}
  </div>
);

export const MovieGrid: React.FC<MovieGridProps> = ({ movies, hasFilters }) => {
  if (!movies || movies.length === 0) {
    return <EmptyState hasFilters={hasFilters} />;
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: 20,
      }}
    >
      {movies.map((movie, idx) => (
        <MovieCard
          key={movie.id}
          movie={movieToMediaItem(movie)}
          index={idx}
          href={`/movies/${movie.id}`}
        />
      ))}
    </div>
  );
};
