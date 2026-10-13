'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState, useTransition } from 'react';
import type { MediaTypeFilter } from './types';

export function useMovieFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Read current filters from URL
  const currentSearch = searchParams.get('search') || '';
  const currentGenre = searchParams.get('genre') || '';
  const currentYear = searchParams.get('year') || '';
  const currentCountry = searchParams.get('country') || '';
  const currentType = (searchParams.get('type') as MediaTypeFilter) || 'movies';

  // Local state for debounced search input
  const [searchValue, setSearchValue] = useState(currentSearch);

  // Sync search input state if URL param changes externally (e.g. back button)
  useEffect(() => {
    setSearchValue(currentSearch);
  }, [currentSearch]);

  // Navigate with new search params
  const updateParams = useCallback(
    (mutator: (params: URLSearchParams) => void) => {
      const nextParams = new URLSearchParams(searchParams.toString());
      mutator(nextParams);
      // Reset page to 1 whenever any filter changes
      nextParams.delete('page');

      startTransition(() => {
        const query = nextParams.toString();
        router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
      });
    },
    [router, pathname, searchParams]
  );

  // Debounced search effect
  useEffect(() => {
    if (searchValue === currentSearch) return;

    const timer = setTimeout(() => {
      updateParams((params) => {
        if (searchValue.trim()) {
          params.set('search', searchValue.trim());
        } else {
          params.delete('search');
        }
      });
    }, 350);

    return () => clearTimeout(timer);
  }, [searchValue, currentSearch, updateParams]);

  const setFilter = useCallback(
    (key: 'genre' | 'year' | 'country', value: string) => {
      updateParams((params) => {
        if (value && value !== 'all') {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
    },
    [updateParams]
  );

  const setType = useCallback(
    (type: MediaTypeFilter) => {
      updateParams((params) => {
        if (type === 'series') {
          params.set('type', 'series');
        } else {
          params.delete('type'); // default is movies
        }
      });
    },
    [updateParams]
  );

  const removeFilter = useCallback(
    (key: 'search' | 'genre' | 'year' | 'country' | 'type') => {
      if (key === 'search') {
        setSearchValue('');
      }
      updateParams((params) => {
        params.delete(key);
      });
    },
    [updateParams]
  );

  const clearAllFilters = useCallback(() => {
    setSearchValue('');
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  }, [router, pathname]);

  const activeCount = [
    Boolean(currentSearch),
    Boolean(currentGenre),
    Boolean(currentYear),
    Boolean(currentCountry),
    currentType === 'series',
  ].filter(Boolean).length;

  return {
    isPending,
    search: searchValue,
    setSearch: setSearchValue,
    currentGenre,
    currentYear,
    currentCountry,
    currentType,
    setFilter,
    setType,
    removeFilter,
    clearAllFilters,
    activeCount,
  };
}
