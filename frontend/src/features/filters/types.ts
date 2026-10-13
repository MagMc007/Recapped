export type MediaTypeFilter = 'movies' | 'series';

export interface FilterParams {
  search?: string;
  genre?: string;
  year?: string;
  country?: string;
  type?: MediaTypeFilter;
  page?: number;
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterOptionsData {
  genres: FilterOption[];
  years: FilterOption[];
  countries: FilterOption[];
}
