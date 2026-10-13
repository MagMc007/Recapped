import type { Movie } from '@/types/api';
import type { MediaItem } from '@/types/media';

export interface GetMoviesParams {
  page?: number;
}

export interface MoviesPageData {
  count: number;
  next: string | null;
  previous: string | null;
  results: Movie[];
}

/** Convert a backend Movie to the MediaItem shape the MovieCard expects */
export function movieToMediaItem(movie: Movie): MediaItem {
  return {
    id: String(movie.id),
    type: movie.is_series ? 'series' : 'movie',
    title: movie.name,
    tagline: '',
    year: movie.year,
    country: movie.country,
    countryCode: '',
    genres: [movie.genre.name],
    runtime: '',
    director: '',
    cast: [],
    synopsis: '',
    posterUrl: movie.poster_url,
    backdropUrl: movie.poster_url,
    omdbRating: {
      imdb: movie.average_rating != null ? String(movie.average_rating) : 'N/A',
      rottenTomatoes: 'N/A',
      metacritic: 'N/A',
      votes: 'N/A',
    },
    communityRating: {
      average: movie.average_rating ?? 0,
      count: 0,
    },
    recapSources: movie.youtube_details.map((yt) => ({
      id: String(yt.id),
      youtubeVideoId: yt.video_id,
      channelName: yt.source_channel,
      channelAvatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${yt.source_channel_id}`,
      channelUrl: `https://www.youtube.com/channel/${yt.source_channel_id}`,
      channelSubscribers: '',
      recapTitle: `${movie.name} Recap`,
      recapDuration: '',
      recapStyle: 'Plot Recap',
      viewsCount: '',
      uploadDate: '',
      summaryHighlight: '',
    })),
    spoilerLevel: 'Plot Recap',
    contentAdvisory: [],
  };
}
