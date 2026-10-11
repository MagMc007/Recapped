'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MediaItem } from '@/types/media';

interface MovieCardProps {
  movie: MediaItem;
  onClick?: (movie: MediaItem) => void;
  index?: number;
  href?: string;
}

export const RatingBadge: React.FC<{ rating: string | number; animate?: boolean }> = ({
  rating,
  animate = false,
}) => (
  <div
    style={{
      background: 'rgba(0,0,0,0.75)',
      backdropFilter: 'blur(8px)',
      border: '1px solid var(--gold)',
      borderRadius: 6,
      padding: '3px 8px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      animation: animate ? 'ratingPop 0.4s cubic-bezier(0.34,1.56,0.64,1) both' : 'none',
      animationDelay: animate ? '0.3s' : '0',
    }}
  >
    <span style={{ color: 'var(--gold)', fontSize: 11 }}>★</span>
    <span
      className="font-bebas"
      style={{ fontSize: 14, color: 'var(--gold)', letterSpacing: 1 }}
    >
      {rating}
    </span>
  </div>
);

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onClick,
  index = 0,
  href,
}) => {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const cardContent = (
    <div
      onClick={() => onClick?.(movie)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fade-up"
      style={{
        animationDelay: `${index * 0.05}s`,
        cursor: 'pointer',
        borderRadius: 12,
        overflow: 'hidden',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        position: 'relative',
        aspectRatio: '2/3',
        transform: hovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s',
        boxShadow: hovered
          ? '0 24px 48px rgba(0,0,0,0.6), 0 0 0 1px var(--accent)'
          : '0 4px 16px rgba(0,0,0,0.3)',
      }}
    >
      {/* Poster Image */}
      {!imgError ? (
        <img
          src={movie.posterUrl}
          alt={movie.title}
          onError={() => setImgError(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            filter: hovered ? 'brightness(0.55)' : 'brightness(0.85)',
            transition: 'filter 0.35s ease',
          }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
            background: 'linear-gradient(135deg, var(--bg2) 0%, var(--surface) 100%)',
            textAlign: 'center',
          }}
        >
          <div className="font-bebas" style={{ fontSize: 24, letterSpacing: 2, color: 'var(--text)' }}>
            {movie.title}
          </div>
          <div style={{ fontSize: 12, color: 'var(--accent)', marginTop: 4 }}>
            {movie.year} · {movie.country}
          </div>
        </div>
      )}

      {/* Rating badge top-left */}
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 2 }}>
        <RatingBadge rating={movie.omdbRating?.imdb || 'N/A'} animate={hovered} />
      </div>

      {/* Type badge top-right */}
      <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 2 }}>
        <span
          style={{
            background: movie.type === 'series' ? 'var(--accent2)' : 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 4,
            padding: '2px 7px',
            fontSize: 10,
            color: '#fff',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          {movie.type === 'series' ? '📺 Series' : '🎬 Film'}
        </span>
      </div>

      {/* Bottom info */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 100%)',
          padding: '32px 14px 14px',
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: 'var(--accent-light)',
            textTransform: 'uppercase',
            letterSpacing: 2,
            fontWeight: 600,
            marginBottom: 4,
          }}
        >
          {movie.year} · {movie.genres?.[0] || 'Movie'}
        </div>
        <div
          className="font-bebas"
          style={{
            fontSize: 22,
            letterSpacing: 1.5,
            color: '#fff',
            lineHeight: 1.1,
          }}
        >
          {movie.title}
        </div>
      </div>

      {/* Hover overlay with play button */}
      {hovered && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            animation: 'fadeIn 0.2s ease',
            zIndex: 3,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 24px var(--accent-glow)',
            }}
          >
            <span style={{ fontSize: 20, color: '#fff', marginLeft: 3 }}>▶</span>
          </div>
          <span style={{ color: '#fff', fontSize: 13, fontWeight: 600, letterSpacing: 0.5 }}>
            Watch Recap
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: 'none', display: 'block' }}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};
