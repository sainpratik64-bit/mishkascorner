import type { Product, ProductAudience } from '@/lib/data/mock-products';
import type { CatalogFilters } from './types';

export type CollectionSlug = 'men' | 'women' | 'unisex' | 'new-drops';

export function filterByCollection(
  products: Product[],
  collection: CollectionSlug
): Product[] {
  switch (collection) {
    case 'men':
      return products.filter(
        (p) => p.audience.includes('men') || p.audience.includes('unisex')
      );
    case 'women':
      return products.filter(
        (p) => p.audience.includes('women') || p.audience.includes('unisex')
      );
    case 'unisex':
      return products.filter((p) => p.isUnisex);
    case 'new-drops':
      return products.filter((p) => p.isNewDrop);
    default:
      return products;
  }
}

export function filterProducts(
  products: Product[],
  filters: CatalogFilters
): Product[] {
  let result = [...products];

  if (filters.searchQuery.trim()) {
    const query = filters.searchQuery.trim().toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.fabric?.toLowerCase().includes(query)
    );
  }

  if (filters.categories.length > 0) {
    result = result.filter((p) =>
      filters.categories.some((cat) => p.categories.includes(cat))
    );
  }

  switch (filters.sort) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
    default:
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
  }

  return result;
}

export function getAvailableCategories(products: Product[]) {
  const categories = new Set<Product['categories'][number]>();
  products.forEach((p) => p.categories.forEach((c) => categories.add(c)));
  return Array.from(categories);
}

export function isValidCollection(slug: string): slug is CollectionSlug {
  return ['men', 'women', 'unisex', 'new-drops'].includes(slug);
}

export function collectionToAudience(collection: CollectionSlug): ProductAudience | null {
  if (collection === 'new-drops') return null;
  return collection;
}
