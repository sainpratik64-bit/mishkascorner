'use client';

import { X } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  CATEGORY_LABELS,
  type ProductCategory,
} from '@/lib/data/mock-products';
import type { CatalogFilters, SortOption } from '@/lib/catalog/types';
import { cn } from '@/lib/utils';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Featured' },
  { value: 'price-asc', label: 'Price, low to high' },
  { value: 'price-desc', label: 'Price, high to low' },
];

interface FilterPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: CatalogFilters;
  availableCategories: ProductCategory[];
  onFiltersChange: (filters: CatalogFilters) => void;
  resultCount: number;
}

export function FilterPanel({
  open,
  onOpenChange,
  filters,
  availableCategories,
  onFiltersChange,
  resultCount,
}: FilterPanelProps) {
  const toggleCategory = (category: ProductCategory) => {
    const next = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onFiltersChange({ ...filters, categories: next });
  };

  const setSort = (sort: SortOption) => {
    onFiltersChange({ ...filters, sort });
  };

  const clearFilters = () => {
    onFiltersChange({ ...filters, categories: [], sort: 'newest' });
  };

  const hasActiveFilters =
    filters.categories.length > 0 || filters.sort !== 'newest';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-full max-w-md p-0 sm:max-w-[400px]"
        showClose={false}
      >
        <SheetTitle className="sr-only">Filter and sort</SheetTitle>
        <SheetDescription className="sr-only">
          Filter and sort {resultCount} products
        </SheetDescription>

        <div className="bc-cart-header">
          <span>Filter and sort {resultCount} products</span>
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6 overflow-y-auto px-[30px] py-6">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="bc-text-link"
            >
              Clear all
            </button>
          )}

          <div>
            <h3 className="bc-filter-heading mb-3">Sort by</h3>
            <div className="space-y-2">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => setSort(option.value)}
                  className={cn(
                    'block w-full py-1.5 text-left text-sm',
                    filters.sort === option.value
                      ? 'font-semibold'
                      : 'text-brand-muted hover:text-brand-black'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="bc-filter-heading mb-3">Category</h3>
            <div className="space-y-3">
              {availableCategories.map((category) => (
                <label
                  key={category}
                  className="flex cursor-pointer items-center gap-3 text-sm"
                >
                  <Checkbox
                    checked={filters.categories.includes(category)}
                    onCheckedChange={() => toggleCategory(category)}
                  />
                  <span>{CATEGORY_LABELS[category]}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="bc-pdp-btn"
            onClick={() => onOpenChange(false)}
          >
            Apply
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
