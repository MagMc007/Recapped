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
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        marginTop: 48,
        flexWrap: 'wrap',
      }}
    >
      {/* Previous */}
      {hasPrevious ? (
        <Link href={buildPageUrl(currentPage - 1)} style={btnBase}>
          ← Prev
        </Link>
      ) : (
        <span style={disabledBtn}>← Prev</span>
      )}

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === '...' ? (
          <span
            key={`ellipsis-${i}`}
            style={{ ...btnBase, cursor: 'default', pointerEvents: 'none', background: 'transparent', border: 'none' }}
          >
            …
          </span>
        ) : (
          <Link
            key={p}
            href={buildPageUrl(p as number)}
            style={p === currentPage ? activeBtn : btnBase}
          >
            {p}
          </Link>
        )
      )}

      {/* Next */}
      {hasNext ? (
        <Link href={buildPageUrl(currentPage + 1)} style={btnBase}>
          Next →
        </Link>
      ) : (
        <span style={disabledBtn}>Next →</span>
      )}

      {/* Count label */}
      <span style={{ fontSize: 12, color: 'var(--muted)', marginLeft: 8 }}>
        Page {currentPage} of {totalPages} &middot; {totalCount} titles
      </span>
    </div>
  );
};
