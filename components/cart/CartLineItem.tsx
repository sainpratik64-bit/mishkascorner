'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useCartStore } from '@/lib/store/cart-store';
import type { CartItem } from '@/lib/store/cart-store';
import { formatPrice } from '@/lib/utils';

interface CartLineItemProps {
  item: CartItem;
}

export function CartLineItem({ item }: CartLineItemProps) {
  const removeItem = useCartStore((s) => s.removeItem);
  const setQuantity = useCartStore((s) => s.setQuantity);

  const lineTotal = item.price * item.quantity;
  const atMax = item.quantity >= item.maxQuantity;

  return (
    <div className="product-cart-item mb-5 flex w-full max-w-[400px] items-start">
      <Link
        href={`/product/${item.slug}`}
        className="relative mr-[15px] h-[75px] w-[75px] shrink-0 overflow-hidden bg-brand-gray md:mr-[25px] md:h-24 md:w-24"
      >
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          sizes="96px"
          className="object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/product/${item.slug}`}
              className="bc-product-title line-clamp-2 hover:opacity-70"
            >
              {item.title}
            </Link>
            <p className="bc-cart-item-meta">Size {item.size}</p>
          </div>
          <button
            type="button"
            aria-label={`Remove ${item.title}`}
            onClick={() => removeItem(item.cartLineId)}
            className="bc-text-link shrink-0"
          >
            Remove
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center border border-black/20">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQuantity(item.cartLineId, item.quantity - 1)}
              className="flex h-8 w-8 items-center justify-center text-sm hover:bg-brand-gray"
            >
              −
            </button>
            <span className="flex h-8 w-8 items-center justify-center border-x border-black/20 text-xs font-medium">
              {item.quantity}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              disabled={atMax}
              onClick={() => setQuantity(item.cartLineId, item.quantity + 1)}
              className="flex h-8 w-8 items-center justify-center text-sm hover:bg-brand-gray disabled:cursor-not-allowed disabled:opacity-40"
            >
              +
            </button>
          </div>
          <span className="bc-price ml-auto pl-4 text-right">
            {formatPrice(lineTotal)}
          </span>
        </div>
      </div>
    </div>
  );
}
