import type { Movie } from '@/types/api';
import type { MediaItem } from '@/types/media';

import type { FilterParams } from '@/features/filters/types';

export interface GetMoviesParams extends FilterParams {}

export interface MoviesPageData {
  count: number;
  next: string | null;
  previous: string | null;
  results: Movie[];
}

/** Convert a backend Movie to the MediaItem shape the MovieCard & DetailView expect */
export function movieToMediaItem(movie: Movie): MediaItem {
  const recapSources = (movie.youtube_details || []).map((yt) => ({
    id: String(yt.id),
    youtubeVideoId: yt.video_id,
    channelName: yt.source_channel || 'Recapped Creator',
    channelAvatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${yt.source_channel_id || yt.source_channel || 'recap'}`,
    channelUrl: yt.source_channel_id ? `https://www.youtube.com/channel/${yt.source_channel_id}` : `https://www.youtube.com/results?search_query=${encodeURIComponent(yt.source_channel || 'recap')}`,
    channelSubscribers: ' Creator',
    recapTitle: `${movie.name} Recap & Breakdown`,
    recapDuration: 'Full Recap',
    recapStyle: 'Plot Recap' as const,
    viewsCount: 'Watch Now',
    uploadDate: `${movie.year}`,
    summaryHighlight: `In-depth watch-along recap and breakdown by ${yt.source_channel}.`,
  }));

  const genreName = movie.genre?.name ? movie.genre.name.charAt(0).toUpperCase() + movie.genre.name.slice(1) : 'Cinema';

  return {
    id: String(movie.id),
    type: movie.is_series ? 'series' : 'movie',
    title: movie.name,
    tagline: `Experience the full story of ${movie.name}`,
    year: movie.year,
    country: movie.country,
    countryCode: '',
    genres: [genreName],
    runtime: movie.is_series ? 'TV Series' : 'Feature Film',
    director: 'Production Studio',
    cast: [],
    synopsis: `${movie.name} (${movie.year}) is a acclaimed ${genreName} ${movie.is_series ? 'television series' : 'feature film'} hailing from ${movie.country}. Stream the complete narrative recap, ending analysis, and pivotal plot points with our curated YouTube creator breakdowns below.`,
    posterUrl: movie.poster_url || '',
    backdropUrl: movie.poster_url || '',
    omdbRating: {
      imdb: movie.average_rating != null ? `${movie.average_rating} ` : 'N/A',
      rottenTomatoes: movie.average_rating != null ? `${Math.round(movie.average_rating * 20)}%` : 'N/A',
      metacritic: movie.average_rating != null ? `${Math.round(movie.average_rating * 18)}` : 'N/A',
      votes: '',
    },

    communityRating: {
      average: movie.average_rating ?? 0,
      count: movie.average_rating != null ? 1 : 0,
    },
    recapSources,
    spoilerLevel: 'Full Story Breakdown',
    contentAdvisory: ['Full Spoilers'],
  };
}

