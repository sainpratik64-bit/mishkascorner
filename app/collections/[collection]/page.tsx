import { notFound } from 'next/navigation';

import { CatalogView } from '@/components/catalog/CatalogView';
import {
  COLLECTION_BREADCRUMBS,
  COLLECTION_DESCRIPTIONS,
  COLLECTION_HERO_IMAGES,
  COLLECTION_HERO_TITLES,
  COLLECTION_LABELS,
} from '@/lib/data/mock-products';
import {
  filterByCollection,
  isValidCollection,
} from '@/lib/catalog/filter-products';
import { getAllProducts } from '@/lib/catalog/get-product';

interface CollectionPageProps {
  params: Promise<{ collection: string }>;
}

export function generateStaticParams() {
  return [
    { collection: 'men' },
    { collection: 'women' },
    { collection: 'unisex' },
    { collection: 'new-drops' },
  ];
}

export async function generateMetadata({ params }: CollectionPageProps) {
  const { collection } = await params;
  if (!isValidCollection(collection)) return {};

  return {
    title: `${COLLECTION_LABELS[collection]} | Mishkas Corner`,
    description: `Shop ${COLLECTION_LABELS[collection]} streetwear at Mishkas Corner.`,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { collection } = await params;

  if (!isValidCollection(collection)) {
    notFound();
  }

  const products = filterByCollection(getAllProducts(), collection);

  return (
    <CatalogView
      products={products}
      title={COLLECTION_LABELS[collection]}
      description={COLLECTION_DESCRIPTIONS[collection]}
      layout="collection"
      heroImage={COLLECTION_HERO_IMAGES[collection]}
      breadcrumbLabel={COLLECTION_BREADCRUMBS[collection]}
      heroTitle={COLLECTION_HERO_TITLES[collection]}
    />
  );
}
