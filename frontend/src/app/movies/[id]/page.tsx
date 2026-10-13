import React from 'react';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getMovieById } from '@/features/movies/api';
import { movieToMediaItem } from '@/features/movies/types';
import { MovieDetailView } from '@/features/movies/components/MovieDetailView';
import { getSession } from '@/lib/auth';
import { ApiError } from '@/lib/api-client';

interface MovieDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: MovieDetailPageProps): Promise<Metadata> {
  const session = await getSession();
  if (!session) {
    return {
      title: 'Movie Detail | Recapped',
    };
  }

  const { id } = await params;
  const numId = parseInt(id, 10);
  if (isNaN(numId)) {
    return {
      title: 'Movie Not Found | Recapped',
    };
  }

  try {
    const movie = await getMovieById(numId);
    if (!movie) {
      return {
        title: 'Movie Not Found | Recapped',
      };
    }

    const title = `${movie.name} (${movie.year}) Recap | Recapped`;
    const description = `Watch complete story breakdowns, ending explanations, and full recaps for ${movie.name} (${movie.year}) on Recapped.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: movie.poster_url ? [{ url: movie.poster_url }] : [],
      },
    };
  } catch {
    return {
      title: 'Movie Detail | Recapped',
    };
  }
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const { id } = await params;
  const session = await getSession();

  if (!session) {
    redirect(`/api/auth/logout?redirect=/movies/${id}`);
  }

  const numId = parseInt(id, 10);
  if (isNaN(numId)) {
    notFound();
  }

  let movie = null;
  try {
    movie = await getMovieById(numId);
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      redirect(`/api/auth/logout?redirect=/movies/${id}`);
    }
    throw error;
  }

  if (!movie) {
    notFound();
  }

  const mediaItem = movieToMediaItem(movie);

  return <MovieDetailView movie={mediaItem} />;
}
