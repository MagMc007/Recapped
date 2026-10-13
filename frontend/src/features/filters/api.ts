import type { FilterOptionsData } from './types';

export const CANONICAL_GENRES = [
  { value: 'action', label: 'Action' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'comedy', label: 'Comedy' },
  { value: 'crime', label: 'Crime' },
  { value: 'drama', label: 'Drama' },
  { value: 'horror', label: 'Horror' },
  { value: 'mystery', label: 'Mystery' },
  { value: 'romance', label: 'Romance' },
  { value: 'sci-fi', label: 'Sci-Fi' },
  { value: 'slasher', label: 'Slasher' },
  { value: 'war', label: 'War' },
  { value: 'western', label: 'Western' },
];

export const POPULAR_YEARS = [
  { value: '2025', label: '2025' },
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' },
  { value: '2020', label: '2020' },
  { value: '2019', label: '2019' },
  { value: '2016', label: '2016' },
  { value: '2011', label: '2011' },
  { value: '2008', label: '2008' },
  { value: '2000', label: '2000' },
  { value: '1999', label: '1999' },
  { value: '1994', label: '1994' },
  { value: '1980', label: '1980' },
];

export const POPULAR_COUNTRIES = [
  { value: 'United States', label: 'United States' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'Japan', label: 'Japan' },
  { value: 'South Korea', label: 'South Korea' },
  { value: 'Canada', label: 'Canada' },
  { value: 'France', label: 'France' },
  { value: 'Germany', label: 'Germany' },
  { value: 'Spain', label: 'Spain' },
  { value: 'Australia', label: 'Australia' },
];

/**
 * Returns options for the filter bar.
 * Fetched/provided server-side to pass down to client FilterBar.
 */
export async function getFilterOptions(): Promise<FilterOptionsData> {
  return {
    genres: CANONICAL_GENRES,
    years: POPULAR_YEARS,
    countries: POPULAR_COUNTRIES,
  };
}
