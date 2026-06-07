import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductPurchasePanel } from '@/components/product/ProductPurchasePanel';
import {
  getAllProductSlugs,
  getProductBySlug,
} from '@/lib/catalog/get-product';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.title} | Mishkas Corner`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <section className="px-[15px] py-8 md:px-[50px] md:py-10">
      <div className="mx-auto max-w-bonkers">
        <Link
          href="/collections/new-drops"
          className="bc-text-link mb-6 inline-flex items-center gap-1 no-underline hover:opacity-60"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Back
        </Link>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-[clamp(30px,4.5%,60px)]">
          <ProductGallery images={product.images} title={product.title} />
          <ProductPurchasePanel product={product} />
        </div>
      </div>
    </section>
  );
}
