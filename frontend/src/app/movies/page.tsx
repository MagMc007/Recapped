import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getMovies } from '@/features/movies/api';
import { MovieGrid } from '@/features/movies/components/MovieGrid';
import { MoviesPagination } from '@/features/movies/components/MoviesPagination';
import { FiltersBar } from '@/features/filters/components/FiltersBar';
import { getFilterOptions } from '@/features/filters/api';
import type { MediaTypeFilter } from '@/features/filters/types';
import { getSession } from '@/lib/auth';
import { ApiError } from '@/lib/api-client';
import { FilmStrip } from '@/components/FilmStrip';

export const metadata: Metadata = {
  title: 'Browse Movies & Series | Recapped',
  description:
    'Browse all recapped movies and series. Find the perfect watch-along recap for any film.',
};

interface MoviesPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    genre?: string;
    year?: string;
    country?: string;
    type?: string;
  }>;
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  // Require auth — redirect to login if no session
  const session = await getSession();
  if (!session) {
    redirect('/api/auth/logout?redirect=/movies');
  }

  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || '1', 10) || 1);
  const search = params.search?.trim() || undefined;
  const genre = params.genre?.trim() || undefined;
  const year = params.year?.trim() || undefined;
  const country = params.country?.trim() || undefined;
  const type = (params.type === 'series' ? 'series' : 'movies') as MediaTypeFilter;

  let data;
  let filterOptions;

  try {
    [data, filterOptions] = await Promise.all([
      getMovies({ page, search, genre, year, country, type }),
      getFilterOptions(),
    ]);
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      // IMPORTANT: clearSession() cannot be called during a Server Component render —
      // Next.js only allows cookie mutation in Server Actions and Route Handlers.
      // Redirect to the logout route handler which safely clears cookies then sends
      // the user to /login.
      redirect('/api/auth/logout?redirect=/movies');
    }
    throw error;
  }

  const PAGE_SIZE = 18;
  const hasActiveFilters = Boolean(search || genre || year || country || params.type === 'series');

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', background: 'var(--bg)' }}>
      <FilmStrip />

      <div className="max-w-[1280px] mx-auto px-3.5 sm:px-4 md:px-6 py-5 sm:py-8 pb-16 sm:pb-20">
        {/* Page header */}
        <div
          className="fade-up"
          style={{
            marginBottom: 20,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
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
                marginBottom: 4,
              }}
            >
              ◈ Browse Collection
            </div>
            <h1
              className="font-bebas"
              style={{
                fontSize: 'clamp(28px, 7vw, 56px)',
                letterSpacing: 1.5,
                lineHeight: 1,
                margin: 0,
              }}
            >
              {type === 'series' ? 'ALL SERIES RECAPS' : 'ALL MOVIE RECAPS'}
            </h1>
            <p style={{ color: 'var(--muted)', marginTop: 6, fontSize: 13 }}>
              {data.count} title{data.count !== 1 ? 's' : ''} available
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <Suspense fallback={null}>
          <FiltersBar options={filterOptions} />
        </Suspense>

        {/* Movie grid */}
        <MovieGrid movies={data.results} hasFilters={hasActiveFilters} />

        {/* Pagination */}
        <Suspense>
          <MoviesPagination
            currentPage={page}
            totalCount={data.count}
            pageSize={PAGE_SIZE}
            hasNext={!!data.next}
            hasPrevious={!!data.previous}
          />
        </Suspense>
      </div>
    </div>
  );
}
