'use client';

import React from 'react';
import type { FilterOptionsData } from '../types';
import { useMovieFilters } from '../useMovieFilters';

interface FiltersBarProps {
  options: FilterOptionsData;
}

export const FiltersBar: React.FC<FiltersBarProps> = ({ options }) => {
  const {
    isPending,
    search,
    setSearch,
    currentGenre,
    currentYear,
    currentCountry,
    currentType,
    setFilter,
    setType,
    removeFilter,
    clearAllFilters,
    activeCount,
  } = useMovieFilters();

  const selectStyle: React.CSSProperties = {
    background: 'var(--bg2)',
    border: '1px solid var(--border)',
    borderRadius: 8,
    padding: '8px 12px',
    color: 'var(--text)',
    fontSize: 13,
    outline: 'none',
    cursor: 'pointer',
    transition: 'border-color 0.2s ease, background 0.2s ease',
  };

  return (
    <div
      className="p-3.5 sm:p-5 mb-7 rounded-xl relative overflow-hidden"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.25)',
      }}
    >
      {/* Pending shimmer indicator */}
      {isPending && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: 'linear-gradient(90deg, transparent, var(--accent), var(--accent-light), transparent)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.2s infinite linear',
          }}
        />
      )}

      {/* Row 1: Type Segmented Control + Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-3.5 sm:mb-4">
        {/* Type Toggle: Movies / Series */}
        <div
          className="flex w-full sm:w-auto"
          style={{
            background: 'var(--bg2)',
            borderRadius: 8,
            padding: 3,
            border: '1px solid var(--border)',
          }}
        >
          <button
            type="button"
            onClick={() => setType('movies')}
            className="flex-1 sm:flex-initial justify-center"
            style={{
              padding: '6px 16px',
              borderRadius: 6,
              border: 'none',
              background: currentType === 'movies' ? 'var(--accent)' : 'transparent',
              color: currentType === 'movies' ? '#ffffff' : 'var(--muted)',
              fontSize: 13,
              fontWeight: currentType === 'movies' ? 600 : 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span>🎬</span> Movies
          </button>
          <button
            type="button"
            onClick={() => setType('series')}
            className="flex-1 sm:flex-initial justify-center"
            style={{
              padding: '6px 16px',
              borderRadius: 6,
              border: 'none',
              background: currentType === 'series' ? 'var(--accent)' : 'transparent',
              color: currentType === 'series' ? '#ffffff' : 'var(--muted)',
              fontSize: 13,
              fontWeight: currentType === 'series' ? 600 : 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span>📺</span> Series
          </button>
        </div>

        {/* Search input with icons */}
        <div className="relative w-full sm:flex-1 sm:max-w-[420px]">
          <span
            style={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--muted)',
              fontSize: 15,
              pointerEvents: 'none',
            }}
          >
            ⌕
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search titles, keywords..."
            style={{
              width: '100%',
              background: 'var(--bg2)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '9px 36px 9px 34px',
              color: 'var(--text)',
              fontSize: 13,
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s ease',
            }}
          />
          {search && (
            <button
              type="button"
              onClick={() => removeFilter('search')}
              title="Clear search"
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: 'var(--muted)',
                cursor: 'pointer',
                fontSize: 14,
                padding: '2px 6px',
                borderRadius: 4,
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Row 2: Filter Selectors (Genre, Year, Country) + Clear Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-2.5 sm:gap-3">
        <div className="grid grid-cols-1 sm:flex sm:items-center sm:flex-wrap gap-2.5 sm:gap-3 flex-1">
          {/* Genre Select */}
          <div className="flex items-center gap-2 flex-1 sm:flex-initial">
            <label htmlFor="filter-genre" className="text-xs text-[var(--muted)] shrink-0 w-14 sm:w-auto">
              Genre:
            </label>
            <select
              id="filter-genre"
              value={currentGenre}
              onChange={(e) => setFilter('genre', e.target.value)}
              className="w-full sm:w-auto sm:min-w-[130px]"
              style={selectStyle}
            >
              <option value="">All Genres</option>
              {options.genres.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
            </select>
          </div>

          {/* Year Select */}
          <div className="flex items-center gap-2 flex-1 sm:flex-initial">
            <label htmlFor="filter-year" className="text-xs text-[var(--muted)] shrink-0 w-14 sm:w-auto">
              Year:
            </label>
            <select
              id="filter-year"
              value={currentYear}
              onChange={(e) => setFilter('year', e.target.value)}
              className="w-full sm:w-auto sm:min-w-[120px]"
              style={selectStyle}
            >
              <option value="">All Years</option>
              {options.years.map((y) => (
                <option key={y.value} value={y.value}>
                  {y.label}
                </option>
              ))}
            </select>
          </div>

          {/* Country Select */}
          <div className="flex items-center gap-2 flex-1 sm:flex-initial">
            <label htmlFor="filter-country" className="text-xs text-[var(--muted)] shrink-0 w-14 sm:w-auto">
              Country:
            </label>
            <select
              id="filter-country"
              value={currentCountry}
              onChange={(e) => setFilter('country', e.target.value)}
              className="w-full sm:w-auto sm:min-w-[130px]"
              style={selectStyle}
            >
              <option value="">All Countries</option>
              {options.countries.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clear All Button */}
        {activeCount > 0 && (
          <button
            type="button"
            onClick={clearAllFilters}
            className="w-full sm:w-auto sm:ml-auto justify-center"
            style={{
              background: 'rgba(255, 77, 77, 0.12)',
              border: '1px solid rgba(255, 77, 77, 0.3)',
              color: '#ff6b6b',
              borderRadius: 8,
              padding: '7px 14px',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.2s ease',
            }}
          >
            <span>✕</span> Clear Filters ({activeCount})
          </button>
        )}
      </div>

      {/* Row 3: Active Filter Chips */}
      {activeCount > 0 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 8,
            marginTop: 14,
            paddingTop: 12,
            borderTop: '1px solid var(--border)',
          }}
        >
          <span style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1 }}>
            Active:
          </span>

          {currentType === 'series' && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(77, 124, 254, 0.15)',
                border: '1px solid var(--accent)',
                color: 'var(--accent-light)',
                borderRadius: 20,
                padding: '3px 10px',
                fontSize: 12,
              }}
            >
              Type: Series
              <button
                type="button"
                onClick={() => setType('movies')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  padding: 0,
                  fontSize: 12,
                }}
              >
                ✕
              </button>
            </span>
          )}

          {search && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(77, 124, 254, 0.15)',
                border: '1px solid var(--accent)',
                color: 'var(--accent-light)',
                borderRadius: 20,
                padding: '3px 10px',
                fontSize: 12,
              }}
            >
              Search: &quot;{search}&quot;
              <button
                type="button"
                onClick={() => removeFilter('search')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  padding: 0,
                  fontSize: 12,
                }}
              >
                ✕
              </button>
            </span>
          )}

          {currentGenre && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(77, 124, 254, 0.15)',
                border: '1px solid var(--accent)',
                color: 'var(--accent-light)',
                borderRadius: 20,
                padding: '3px 10px',
                fontSize: 12,
              }}
            >
              Genre: {currentGenre}
              <button
                type="button"
                onClick={() => removeFilter('genre')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  padding: 0,
                  fontSize: 12,
                }}
              >
                ✕
              </button>
            </span>
          )}

          {currentYear && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(77, 124, 254, 0.15)',
                border: '1px solid var(--accent)',
                color: 'var(--accent-light)',
                borderRadius: 20,
                padding: '3px 10px',
                fontSize: 12,
              }}
            >
              Year: {currentYear}
              <button
                type="button"
                onClick={() => removeFilter('year')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  padding: 0,
                  fontSize: 12,
                }}
              >
                ✕
              </button>
            </span>
          )}

          {currentCountry && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(77, 124, 254, 0.15)',
                border: '1px solid var(--accent)',
                color: 'var(--accent-light)',
                borderRadius: 20,
                padding: '3px 10px',
                fontSize: 12,
              }}
            >
              Country: {currentCountry}
              <button
                type="button"
                onClick={() => removeFilter('country')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  padding: 0,
                  fontSize: 12,
                }}
              >
                ✕
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};
