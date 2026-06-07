import { MOCK_PRODUCTS, type Product } from '@/lib/data/mock-products';

export function getAllProducts(): Product[] {
  return MOCK_PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.id === id);
}

export function getAllProductSlugs(): string[] {
  return MOCK_PRODUCTS.map((p) => p.slug);
}

export function searchProducts(query: string): Product[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return MOCK_PRODUCTS;

  return MOCK_PRODUCTS.filter(
    (p) =>
      p.title.toLowerCase().includes(normalized) ||
      p.description.toLowerCase().includes(normalized) ||
      p.categories.some((c) => c.includes(normalized.replace(/\s+/g, '-')))
  );
}
