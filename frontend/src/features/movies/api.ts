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
 * Fetches a single movie by its ID via the list endpoint.
 * The backend detail route uses the movie name, but since we have the full
 * list we can use pagination. For now we fetch from the list and find by id.
 */
export async function getMovieById(id: number): Promise<Movie | null> {
  let page = 1;
  while (true) {
    const data = await apiClient.get<PaginatedResponse<Movie>>(`api/movies/?page=${page}`);
    const found = data.results.find((m) => m.id === id);
    if (found) return found;
    if (!data.next) return null;
    page++;
    if (page > 20) return null;
  }
}
