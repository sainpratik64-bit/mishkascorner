import { CatalogView } from '@/components/catalog/CatalogView';
import { getAllProducts } from '@/lib/catalog/get-product';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim();

  return {
    title: query
      ? `Search: ${query} | Mishkas Corner`
      : 'Search | Mishkas Corner',
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? '';

  return (
    <CatalogView
      products={getAllProducts()}
      title={query ? `Results for "${query}"` : 'Search'}
      initialSearchQuery={query}
      layout="search"
    />
  );
}
