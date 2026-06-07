'use client';

import { useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { Product, ProductVariant } from '@/lib/data/mock-products';
import type { ProductSize } from '@/lib/firebase/schema';
import { useAddToCart } from '@/hooks/use-cart';
import { calcDiscountPercent, cn, formatPrice } from '@/lib/utils';

interface ProductPurchasePanelProps {
  product: Product;
}

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const addToCart = useAddToCart();
  const discount = calcDiscountPercent(product.price, product.compareAtPrice);

  const selectedVariant: ProductVariant | undefined = product.variants.find(
    (v) => v.size === selectedSize
  );
  const canAdd =
    selectedSize !== null && (selectedVariant?.stockQuantity ?? 0) > 0;

  return (
    <div className="lg:sticky lg:top-20 lg:self-start">
      <div className="space-y-5 pt-2 md:pt-0">
        {discount !== null && (
          <span className="bc-badge-sale">Save {discount}%</span>
        )}

        <h1 className="bc-pdp-title">{product.title}</h1>

        <div className="bc-price flex items-baseline gap-2.5">
          {product.compareAtPrice && (
            <span className="bc-price-compare">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
          <span>{formatPrice(product.price)}</span>
        </div>

        {(product.gsm || product.fabric) && (
          <p className="bc-pdp-meta">
            {[product.gsm && `${product.gsm} GSM`, product.fabric, product.isUnisex && 'Unisex']
              .filter(Boolean)
              .join(' · ')}
          </p>
        )}

        <div className="mt-8">
          <p className="bc-filter-heading mb-3">Size</p>
          <div className="flex flex-wrap gap-1.5">
            {product.variants.map((variant) => {
              const outOfStock = variant.stockQuantity <= 0;
              const isSelected = selectedSize === variant.size;

              return (
                <button
                  key={variant.size}
                  type="button"
                  disabled={outOfStock}
                  onClick={() => setSelectedSize(variant.size)}
                  className={cn(
                    'bc-variant-btn',
                    isSelected && 'is-selected'
                  )}
                >
                  {variant.size}
                </button>
              );
            })}
          </div>
          {selectedVariant && selectedVariant.stockQuantity > 0 && (
            <p className="bc-pdp-meta mt-3">
              {selectedVariant.stockQuantity} in stock
            </p>
          )}
        </div>

        <div className="add_to_cart_holder pt-2">
          <button
            type="button"
            className="bc-pdp-btn"
            disabled={!canAdd}
            onClick={() => {
              if (selectedSize) addToCart(product, selectedSize);
            }}
          >
            {canAdd ? 'Add To Cart' : 'Select a Size'}
          </button>
        </div>

        <Accordion type="single" collapsible className="w-full pt-2">
          <AccordionItem value="details">
            <AccordionTrigger>Product Details</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm leading-relaxed text-brand-muted">
                {product.description}
              </p>
              <ul className="bc-pdp-meta mt-4 space-y-1">
                {product.categories.map((cat) => (
                  <li key={cat}>{cat.replace(/-/g, ' ')}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="shipping">
            <AccordionTrigger>Shipping Info</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm leading-relaxed text-brand-muted">
                Free shipping on orders above ₹999. Standard delivery 3–7
                business days across India. Express options available at
                checkout.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                Easy 7-day returns on unworn items with tags attached. Exchange
                available for size swaps within 14 days.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
