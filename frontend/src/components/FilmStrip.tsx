import React from 'react';

const GENRES = [
  'DRAMA',
  'ACTION',
  'THRILLER',
  'COMEDY',
  'HORROR',
  'SCI-FI',
  'ROMANCE',
  'MYSTERY',
  'ANIMATION',
  'PSYCHOLOGICAL',
  'CRIME',
  'DOCUMENTARY',
];

export const FilmStrip: React.FC<{ className?: string }> = ({ className = '' }) => {
  const doubled = [...GENRES, ...GENRES];

  return (
    <div
      className={`overflow-hidden border-t border-b border-[var(--border)] py-2.5 bg-[var(--bg2)] relative select-none ${className}`}
      style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}
    >
      <div
        className="flex gap-12 w-max"
        style={{ animation: 'filmRoll 24s linear infinite' }}
      >
        {doubled.map((genre, idx) => (
          <span
            key={idx}
            className="flex items-center gap-4 whitespace-nowrap text-xs text-[var(--muted)]"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: '3px',
              fontSize: '13px',
              color: 'var(--muted)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0 inline-block"
              style={{ background: 'var(--accent)' }}
            />
            {genre}
          </span>
        ))}
      </div>
    </div>
  );
};
