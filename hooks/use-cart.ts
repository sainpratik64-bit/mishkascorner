'use client';

import { useEffect, useState } from 'react';

import type { Product } from '@/lib/data/mock-products';
import type { ProductSize } from '@/lib/firebase/schema';
import {
  useCartStore,
  selectCartItemCount,
  selectCartItems,
  selectCartSubtotal,
  selectCartTotal,
  type AddToCartInput,
} from '@/lib/store/cart-store';

export function useCartItemCount() {
  const count = useCartStore(selectCartItemCount);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted ? count : 0;
}

export function useCartItems() {
  return useCartStore(selectCartItems);
}

export function useCartSubtotal() {
  return useCartStore(selectCartSubtotal);
}

export function useCartTotal() {
  return useCartStore(selectCartTotal);
}

export function useAddToCart() {
  const addItem = useCartStore((s) => s.addItem);

  return (product: Product, size: ProductSize) => {
    const variant = product.variants.find((v) => v.size === size);
    if (!variant || variant.stockQuantity <= 0) return;

    const input: AddToCartInput = {
      productId: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      size,
      imageUrl: product.primaryImage,
      maxQuantity: variant.stockQuantity,
    };

    addItem(input);
  };
}
