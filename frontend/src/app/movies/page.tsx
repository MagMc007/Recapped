import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getMovies } from '@/features/movies/api';
import { MovieGrid } from '@/features/movies/components/MovieGrid';
import { MoviesPagination } from '@/features/movies/components/MoviesPagination';
import { getSession } from '@/lib/auth';
import { FilmStrip } from '@/components/FilmStrip';

export const metadata: Metadata = {
  title: 'Browse Movies & Series | Recapped',
  description:
    'Browse all recapped movies and series. Find the perfect watch-along recap for any film.',
};

interface MoviesPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  // Require auth — redirect to login if no session
  const session = await getSession();
  if (!session) {
    redirect('/login?redirect=/movies');
  }

  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || '1', 10) || 1);

  const data = await getMovies({ page });

  const PAGE_SIZE = data.results.length || 10;

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', background: 'var(--bg)' }}>
      <FilmStrip />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 16px 80px' }}>
        {/* Page header */}
        <div
          className="fade-up"
          style={{
            marginBottom: 32,
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
                fontSize: 'clamp(36px, 8vw, 64px)',
                letterSpacing: 2,
                lineHeight: 1,
                margin: 0,
              }}
            >
              ALL RECAPS
            </h1>
            <p style={{ color: 'var(--muted)', marginTop: 6, fontSize: 13 }}>
              {data.count} title{data.count !== 1 ? 's' : ''} available
            </p>
          </div>
        </div>

        {/* Movie grid */}
        <MovieGrid movies={data.results} />

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
