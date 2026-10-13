import { apiClient } from '@/lib/api-client';
import type { PaginatedResponse, Movie } from '@/types/api';
import type { GetMoviesParams, MoviesPageData } from './types';

/**
 * Fetches a paginated list of movies from the backend.
 * Runs on the server; the api-client picks up the JWT from the cookie automatically.
 */
export async function getMovies(params: GetMoviesParams = {}): Promise<MoviesPageData> {
  const { page = 1 } = params;

  const url = `api/movies/?page=${page}`;
  const data = await apiClient.get<PaginatedResponse<Movie>>(url);
  return data;
}

/**
 * Fetches a single movie by its ID via the list endpoint.
 * The backend detail route uses the movie name, but since we have the full
 * list we can use pagination. For now we fetch from the list and find by id.
 */
export async function getMovieById(id: number): Promise<Movie | null> {
  // Fetch all pages until we find the movie (simple approach for now)
  let page = 1;
  while (true) {
    const data = await apiClient.get<PaginatedResponse<Movie>>(`api/movies/?page=${page}`);
    const found = data.results.find((m) => m.id === id);
    if (found) return found;
    if (!data.next) return null;
    page++;
    // Safety cap
    if (page > 20) return null;
  }
}
