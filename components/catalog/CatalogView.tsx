'use client';

import { useMemo, useState } from 'react';

import { CollectionDescription } from '@/components/catalog/CollectionDescription';
import { CollectionHero } from '@/components/catalog/CollectionHero';
import { FacetsBar } from '@/components/catalog/FacetsBar';
import { FilterPanel } from '@/components/catalog/FilterPanel';
import { ProductCard } from '@/components/ProductCard';
import type { Product } from '@/lib/data/mock-products';
import {
  filterProducts,
  getAvailableCategories,
} from '@/lib/catalog/filter-products';
import { DEFAULT_FILTERS, type CatalogFilters } from '@/lib/catalog/types';

interface CatalogViewProps {
  products: Product[];
  title: string;
  description?: string;
  initialSearchQuery?: string;
  layout?: 'collection' | 'search';
  heroImage?: string;
  breadcrumbLabel?: string;
  heroTitle?: string;
}

export function CatalogView({
  products,
  title,
  description,
  initialSearchQuery = '',
  layout = 'search',
  heroImage,
  breadcrumbLabel,
  heroTitle,
}: CatalogViewProps) {
  const [filters, setFilters] = useState<CatalogFilters>({
    ...DEFAULT_FILTERS,
    searchQuery: initialSearchQuery,
  });
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  const availableCategories = useMemo(
    () => getAvailableCategories(products),
    [products]
  );

  const filteredProducts = useMemo(
    () => filterProducts(products, filters),
    [products, filters]
  );

  const activeFilterCount = filters.categories.length;

  const isCollectionLayout = layout === 'collection' && heroImage;

  return (
    <>
      {isCollectionLayout && (
        <CollectionHero
          title={(heroTitle ?? title).toUpperCase()}
          breadcrumbLabel={breadcrumbLabel ?? title}
          imageUrl={heroImage}
        />
      )}

      {description && isCollectionLayout && (
        <CollectionDescription description={description} />
      )}

      <FacetsBar
        filters={filters}
        resultCount={filteredProducts.length}
        onFilterOpen={() => setFilterPanelOpen(true)}
        onSortChange={(sort) => setFilters((f) => ({ ...f, sort }))}
        activeFilterCount={activeFilterCount}
      />

      <FilterPanel
        open={filterPanelOpen}
        onOpenChange={setFilterPanelOpen}
        filters={filters}
        availableCategories={availableCategories}
        onFiltersChange={setFilters}
        resultCount={filteredProducts.length}
      />

      <section className={isCollectionLayout ? '' : 'px-[15px] py-8 md:px-[50px]'}>
        <div className="mx-auto max-w-bonkers">
          {!isCollectionLayout && (
            <header className="mb-8 text-left">
              <h1 className="font-semibold normal-case">{title}</h1>
              {description && (
                <p className="bc-collection-desc mt-4 max-w-3xl">{description}</p>
              )}
            </header>
          )}

          <div className="px-[15px] py-8 md:px-[50px]">
            {filteredProducts.length === 0 ? (
              <div className="flex min-h-[40vh] flex-col items-center justify-center p-12 text-center">
                <p className="text-xl font-semibold">No matches found</p>
                <p className="bc-collection-desc mt-2 max-w-sm">
                  Try adjusting your filters or search for something else.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-2 gap-y-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
