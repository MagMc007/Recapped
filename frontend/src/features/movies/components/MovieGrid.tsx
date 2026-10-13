import React from 'react';
import { MovieCard } from './MovieCard';
import { movieToMediaItem } from '../types';
import type { Movie } from '@/types/api';

interface MovieGridProps {
  movies: Movie[];
}

const EmptyState: React.FC = () => (
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
      No movies found
    </div>
    <div style={{ fontSize: 14, color: 'var(--muted)' }}>
      There are no movies to display right now. Check back later.
    </div>
  </div>
);

export const MovieGrid: React.FC<MovieGridProps> = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return <EmptyState />;
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
