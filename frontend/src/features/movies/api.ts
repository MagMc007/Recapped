import { apiClient, ApiError } from '@/lib/api-client';
import type { PaginatedResponse, Movie } from '@/types/api';
import type { GetMoviesParams, MoviesPageData } from './types';

const EMPTY_PAGE_DATA: MoviesPageData = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};

/**
 * Fetches a paginated list of movies or series from the backend,
 * supporting search, genre, year, and country filters.
 * Runs on the server; the api-client picks up the JWT from the cookie automatically.
 */
export async function getMovies(params: GetMoviesParams = {}): Promise<MoviesPageData> {
  const { page = 1, search, genre, year, country, type = 'movies' } = params;

  const entity = type === 'series' ? 'series' : 'movies';
  let endpoint = `api/${entity}/?page=${page}`;

  if (search && search.trim()) {
    endpoint = `api/${entity}/search/?q=${encodeURIComponent(search.trim())}&page=${page}`;
  } else if (genre && genre.trim()) {
    endpoint = `api/${entity}/filter/genre/?g=${encodeURIComponent(genre.trim())}&page=${page}`;
  } else if (year && year.trim()) {
    endpoint = `api/${entity}/filter/year/?y=${encodeURIComponent(year.trim())}&page=${page}`;
  } else if (country && country.trim()) {
    endpoint = `api/${entity}/filter/country/?c=${encodeURIComponent(country.trim())}&page=${page}`;
  }

  try {
    const data = await apiClient.get<PaginatedResponse<Movie>>(endpoint);
    return data;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      // Backend returns 404 with a message when no records match the filter
      return EMPTY_PAGE_DATA;
    }
    throw error;
  }
}

/**
 * Filter helpers for specific use cases
 */
export async function getMoviesBySearch(q: string, page = 1, type: 'movies' | 'series' = 'movies') {
  return getMovies({ search: q, page, type });
}

export async function getMoviesByGenre(g: string, page = 1, type: 'movies' | 'series' = 'movies') {
  return getMovies({ genre: g, page, type });
}

export async function getMoviesByYear(y: string, page = 1, type: 'movies' | 'series' = 'movies') {
  return getMovies({ year: y, page, type });
}

export async function getMoviesByCountry(c: string, page = 1, type: 'movies' | 'series' = 'movies') {
  return getMovies({ country: c, page, type });
}

export async function getSeriesMovies(page = 1) {
  return getMovies({ page, type: 'series' });
}

/**
 * Fetches a single movie or series by its ID.
 * First checks movies list; if not found, checks series list.
 */
export async function getMovieById(id: number): Promise<Movie | null> {
  // First search in movies
  try {
    let page = 1;
    while (page <= 20) {
      const data = await apiClient.get<PaginatedResponse<Movie>>(`api/movies/?page=${page}`);
      const found = data.results.find((m) => m.id === id);
      if (found) return found;
      if (!data.next) break;
      page++;
    }
  } catch (error) {
    if (!(error instanceof ApiError && error.status === 404)) {
      throw error;
    }
  }

  // Fallback search in series
  try {
    let page = 1;
    while (page <= 20) {
      const data = await apiClient.get<PaginatedResponse<Movie>>(`api/series/?page=${page}`);
      const found = data.results.find((m) => m.id === id);
      if (found) return found;
      if (!data.next) break;
      page++;
    }
  } catch (error) {
    if (!(error instanceof ApiError && error.status === 404)) {
      throw error;
    }
  }

  return null;
}

/**
 * Submit a 1-5 star user rating for a movie or series.
 */
export async function rateMovie(
  name: string,
  score: number,
  isSeries = false
): Promise<{ success: boolean; score: number }> {
  const entity = isSeries ? 'series' : 'movies';
  const endpoint = `api/reviews/${entity}/${encodeURIComponent(name)}/ratings/`;
  await apiClient.post(endpoint, { score });
  return { success: true, score };
}

