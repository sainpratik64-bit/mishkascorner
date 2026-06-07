'use client';

import { ChevronDown, SlidersHorizontal } from 'lucide-react';

import type { CatalogFilters, SortOption } from '@/lib/catalog/types';
import { cn } from '@/lib/utils';

interface FacetsBarProps {
  filters: CatalogFilters;
  resultCount: number;
  onFilterOpen: () => void;
  onSortChange: (sort: SortOption) => void;
  activeFilterCount: number;
}

export function FacetsBar({
  filters,
  resultCount,
  onFilterOpen,
  onSortChange,
  activeFilterCount,
}: FacetsBarProps) {
  return (
    <div className="border-y border-black/10 bg-brand-white">
      <div className="mx-auto flex max-w-bonkers items-center justify-between px-[15px] py-4 md:px-[50px]">
        <button
          type="button"
          className="bc-facets-bar inline-flex items-center"
          onClick={onFilterOpen}
        >
          <SlidersHorizontal className="mr-2.5 h-3.5 w-3.5" />
          Filter and sort
          {activeFilterCount > 0 && (
            <span className="ml-1.5 text-brand-muted">({activeFilterCount})</span>
          )}
        </button>

        <div className="flex items-center gap-6">
          <div className="relative">
            <select
              aria-label="Sort products"
              value={filters.sort}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className={cn(
                'bc-sort-label cursor-pointer appearance-none bg-transparent pr-6 uppercase',
                'border-0 focus:outline-none focus:ring-0'
              )}
            >
              <option value="newest">Featured</option>
              <option value="price-asc">Price, low to high</option>
              <option value="price-desc">Price, high to low</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2" />
          </div>

          <span className="bc-sort-label hidden text-brand-muted sm:inline">
            {resultCount} products
          </span>
        </div>
      </div>
    </div>
  );
}
