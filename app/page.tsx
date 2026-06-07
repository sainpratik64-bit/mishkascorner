import { HeroBanner } from '@/components/HeroBanner';
import { ProductCard } from '@/components/ProductCard';
import { MOCK_PRODUCTS } from '@/lib/data/mock-products';

export default function HomePage() {
  return (
    <>
      <HeroBanner />

      <section className="border-b border-black/10 px-[15px] py-8 md:px-[50px] md:py-10">
        <div className="mx-auto max-w-bonkers">
          <div className="mb-6 text-left md:mb-8">
            <p className="bc-sort-label mb-2 text-brand-muted">Just Dropped</p>
            <h2 className="font-semibold normal-case">New Arrivals</h2>
          </div>

          <div className="grid grid-cols-2 gap-x-5 md:grid-cols-3 md:gap-x-[30px] lg:grid-cols-4">
            {MOCK_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
