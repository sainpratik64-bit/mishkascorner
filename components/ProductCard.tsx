'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import type { Product } from '@/lib/data/mock-products';
import type { ProductSize } from '@/lib/firebase/schema';
import { useAddToCart } from '@/hooks/use-cart';
import { calcDiscountPercent, cn, formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [sizesOpen, setSizesOpen] = useState(false);
  const addToCart = useAddToCart();
  const discount = calcDiscountPercent(product.price, product.compareAtPrice);

  const handleAdd = (size: ProductSize) => {
    addToCart(product, size);
    setSizesOpen(false);
  };

  return (
    <article className="group relative mb-5 flex w-full flex-col md:mb-[30px]">
      <div className="relative mb-[15px] overflow-hidden bg-brand-gray md:mb-5">
        <Link
          href={`/product/${product.slug}`}
          className="relative block aspect-[4/5]"
        >
          <Image
            src={product.primaryImage}
            alt={product.title}
            fill
            sizes="(max-width: 767px) 50vw, (max-width: 1067px) 33vw, 25vw"
            className="object-cover transition-opacity duration-300 group-hover:opacity-0"
          />
          <Image
            src={product.hoverImage}
            alt={`${product.title} alternate view`}
            fill
            sizes="(max-width: 767px) 50vw, (max-width: 1067px) 33vw, 25vw"
            className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </Link>

        {discount !== null && (
          <span className="bc-badge-sale absolute left-2 top-2 z-10 md:left-4 md:top-4">
            Save {discount}%
          </span>
        )}

        {sizesOpen && (
          <div className="absolute bottom-0 left-0 right-0 z-20 flex translate-y-0 items-center justify-center bg-white/90 p-2 md:hidden">
            <div className="grid w-full grid-flow-col auto-cols-fr gap-1">
              {product.variants.map((variant) => {
                const outOfStock = variant.stockQuantity <= 0;
                return (
                  <button
                    key={variant.size}
                    type="button"
                    disabled={outOfStock}
                    onClick={() => handleAdd(variant.size)}
                    className={cn(
                      'flex h-[30px] min-w-[30px] items-center justify-center border border-black/20 text-xs',
                      outOfStock && 'cursor-not-allowed opacity-40 line-through'
                    )}
                  >
                    {variant.size}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 z-20 hidden translate-y-full items-center justify-center bg-white/90 p-2 transition-transform duration-250 group-hover:translate-y-0 md:flex">
          <div className="grid w-full grid-flow-col auto-cols-fr gap-1">
            {product.variants.map((variant) => {
              const outOfStock = variant.stockQuantity <= 0;
              return (
                <button
                  key={variant.size}
                  type="button"
                  disabled={outOfStock}
                  onClick={() => handleAdd(variant.size)}
                  className={cn(
                    'flex h-[30px] min-w-[30px] items-center justify-center border border-black/20 text-xs hover:border-black',
                    outOfStock && 'cursor-not-allowed opacity-40 line-through'
                  )}
                >
                  {variant.size}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col leading-none">
        <Link href={`/product/${product.slug}`}>
          <h3 className="bc-product-title mb-[5px] line-clamp-2 text-left">
            {product.title}
          </h3>
        </Link>

        <div className="bc-price flex items-baseline gap-2.5">
          {product.compareAtPrice && (
            <span className="bc-price-compare">{formatPrice(product.compareAtPrice)}</span>
          )}
          <span>{formatPrice(product.price)}</span>
        </div>

        <div className="mt-auto pt-[15px]">
          <button
            type="button"
            className="bc-btn-add-to-cart"
            onClick={() => setSizesOpen((prev) => !prev)}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </article>
  );
}
