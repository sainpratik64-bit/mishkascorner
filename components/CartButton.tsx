'use client';

import { ShoppingBag } from 'lucide-react';

import { useCartItemCount } from '@/hooks/use-cart';
import { useCartStore } from '@/lib/store/cart-store';

export function CartButton() {
  const itemCount = useCartItemCount();
  const openDrawer = useCartStore((s) => s.openDrawer);

  return (
    <button
      type="button"
      aria-label={`Shopping bag, ${itemCount} items`}
      onClick={openDrawer}
      className="relative flex h-9 w-9 items-center justify-center transition-opacity hover:opacity-60"
    >
      <ShoppingBag className="h-4 w-4" />
      {itemCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center bg-brand-black px-1 text-[10px] font-semibold text-brand-white">
          {itemCount}
        </span>
      )}
    </button>
  );
}
