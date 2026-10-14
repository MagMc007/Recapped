'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

interface MoviesPaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize?: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export const MoviesPagination: React.FC<MoviesPaginationProps> = ({
  currentPage,
  totalCount,
  pageSize = 10,
  hasNext,
  hasPrevious,
}) => {
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(totalCount / pageSize);

  function buildPageUrl(page: number): string {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    return `/movies?${params.toString()}`;
  }

  if (totalPages <= 1) return null;

  // Compute visible page numbers (window of 5 around current page)
  const pages: (number | '...')[] = [];
  const delta = 2;
  const left = Math.max(2, currentPage - delta);
  const right = Math.min(totalPages - 1, currentPage + delta);

  pages.push(1);
  if (left > 2) pages.push('...');
  for (let p = left; p <= right; p++) pages.push(p);
  if (right < totalPages - 1) pages.push('...');
  if (totalPages > 1) pages.push(totalPages);

  const btnBase: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 36,
    height: 36,
    borderRadius: 8,
    border: '1px solid var(--border)',
    background: 'var(--surface)',
    color: 'var(--text)',
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.18s ease',
    padding: '0 10px',
  };

  const activeBtn: React.CSSProperties = {
    ...btnBase,
    background: 'var(--accent)',
    border: '1px solid var(--accent)',
    color: '#fff',
    fontWeight: 700,
    boxShadow: '0 0 12px var(--accent-glow)',
  };

  const disabledBtn: React.CSSProperties = {
    ...btnBase,
    opacity: 0.35,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-12">
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
        {/* Previous */}
        {hasPrevious ? (
          <Link href={buildPageUrl(currentPage - 1)} style={btnBase} className="px-2 sm:px-2.5 h-8 sm:h-9 min-w-[32px] sm:min-w-[36px] text-xs sm:text-sm">
            ← Prev
          </Link>
        ) : (
          <span style={disabledBtn} className="px-2 sm:px-2.5 h-8 sm:h-9 min-w-[32px] sm:min-w-[36px] text-xs sm:text-sm">
            ← Prev
          </span>
        )}

        {/* Page numbers */}
        {pages.map((p, i) =>
          p === '...' ? (
            <span
              key={`ellipsis-${i}`}
              style={{ ...btnBase, cursor: 'default', pointerEvents: 'none', background: 'transparent', border: 'none' }}
              className="h-8 sm:h-9 min-w-[24px] sm:min-w-[30px] text-xs sm:text-sm"
            >
              …
            </span>
          ) : (
            <Link
              key={p}
              href={buildPageUrl(p as number)}
              style={p === currentPage ? activeBtn : btnBase}
              className="px-2 sm:px-2.5 h-8 sm:h-9 min-w-[32px] sm:min-w-[36px] text-xs sm:text-sm"
            >
              {p}
            </Link>
          )
        )}

        {/* Next */}
        {hasNext ? (
          <Link href={buildPageUrl(currentPage + 1)} style={btnBase} className="px-2 sm:px-2.5 h-8 sm:h-9 min-w-[32px] sm:min-w-[36px] text-xs sm:text-sm">
            Next →
          </Link>
        ) : (
          <span style={disabledBtn} className="px-2 sm:px-2.5 h-8 sm:h-9 min-w-[32px] sm:min-w-[36px] text-xs sm:text-sm">
            Next →
          </span>
        )}
      </div>

      {/* Count label */}
      <span className="text-xs text-[var(--muted)] whitespace-nowrap">
        Page {currentPage} of {totalPages} &middot; {totalCount} titles
      </span>
    </div>
  );
};
