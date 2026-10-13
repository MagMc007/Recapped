export type MediaType = 'movie' | 'series';

export interface RecapSource {
  id: string;
  youtubeVideoId: string;
  channelName: string;
  channelAvatar: string;
  channelUrl: string;
  channelSubscribers: string;
  recapTitle: string;
  recapDuration: string;
  recapStyle: 'Cinematic Storytelling' | 'Fast 15-min Deep Dive' | 'Twist & Ending Breakdown' | 'Comedy & Roasting' | 'Plot Recap';
  viewsCount: string;
  uploadDate: string;
  summaryHighlight: string;
}

export interface MediaItem {
  id: string;
  type: MediaType;
  title: string;
  originalTitle?: string;
  tagline: string;
  year: number;
  country: string;
  countryCode: string;
  genres: string[];
  runtime: string;
  director: string;
  cast: string[];
  synopsis: string;
  posterUrl: string;
  backdropUrl: string;
  omdbRating: {
    imdb: string;
    rottenTomatoes: string;
    metacritic: string;
    votes: string;
  };
  communityRating: {
    average: number;
    count: number;
  };
  recapSources: RecapSource[];
  spoilerLevel: 'Full Story Breakdown' | 'Ending Explained' | 'Twist Reveal' | 'Plot Recap';
  contentAdvisory: string[];
  featured?: boolean;
  trending?: boolean;
}

export interface FilterState {
  type: MediaType | 'all';
  genre: string;
  country: string;
  year: string;
  sortBy: 'rating' | 'year' | 'recaps' | 'trending';
  searchQuery: string;
}
