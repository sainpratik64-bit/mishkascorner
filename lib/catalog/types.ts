import type { ProductCategory } from '@/lib/data/mock-products';

export type SortOption = 'newest' | 'price-asc' | 'price-desc';

export interface CatalogFilters {
  categories: ProductCategory[];
  sort: SortOption;
  searchQuery: string;
}

export const DEFAULT_FILTERS: CatalogFilters = {
  categories: [],
  sort: 'newest',
  searchQuery: '',
};
