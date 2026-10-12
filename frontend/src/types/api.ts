export interface User {
  id: number;
  username: string;
  email?: string;
}

export interface AuthResponse {
  user: User;
  refresh: string;
  access_token: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface YoutubeDetail {
  id: number;
  source_channel: string;
  source_channel_id: string;
  video_id: string;
}

export interface Movie {
  id: number;
  name: string;
  country: string;
  year: number;
  genre: Genre;
  is_movie: boolean;
  is_series: boolean;
  poster_url: string;
  youtube_details: YoutubeDetail[];
  average_rating: number | null;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Review {
  id: number;
  user: {
    id: number;
    username: string;
    email?: string;
  };
  movie: string;
  score: number;
}

export interface RatePayload {
  score: number;
}

export interface ApiErrorResponse {
  message?: string;
  detail?: string;
  [key: string]: unknown;
}
