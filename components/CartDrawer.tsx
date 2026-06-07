'use client';

import Link from 'next/link';
import { useState } from 'react';
import { X } from 'lucide-react';

import { CartLineItem } from '@/components/cart/CartLineItem';
import { CheckoutButton } from '@/components/checkout/CheckoutButton';
import {
  createEmptyShipping,
  ShippingForm,
} from '@/components/shipping/ShippingForm';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  useCartItems,
  useCartItemCount,
  useCartSubtotal,
  useCartTotal,
} from '@/hooks/use-cart';
import { useCartStore } from '@/lib/store/cart-store';
import { formatPrice } from '@/lib/utils';

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isDrawerOpen);
  const setDrawerOpen = useCartStore((s) => s.setDrawerOpen);
  const items = useCartItems();
  const itemCount = useCartItemCount();
  const subtotal = useCartSubtotal();
  const total = useCartTotal();
  const [shipping, setShipping] = useState(createEmptyShipping);
  const [pincodeServiceable, setPincodeServiceable] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setDrawerOpen}>
      <SheetContent
        side="right"
        className="flex w-full flex-col p-0 sm:max-w-[420px]"
        showClose={false}
      >
        <SheetTitle className="sr-only">Cart</SheetTitle>
        <SheetDescription className="sr-only">
          Shopping bag with {itemCount} items
        </SheetDescription>

        <div className="bc-cart-header sticky top-0 z-10 bg-brand-white">
          <span>Cart ({itemCount})</span>
          <button
            type="button"
            aria-label="Close cart"
            onClick={() => setDrawerOpen(false)}
            className="transition-opacity hover:opacity-60"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-[30px] pb-12 text-center">
            <p className="text-base font-medium">
              Your cart is currently empty.
            </p>
            <Link
              href="/collections/new-drops"
              onClick={() => setDrawerOpen(false)}
              className="bc-pdp-btn mt-6 max-w-xs"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-[30px] py-6">
              {items.map((item) => (
                <CartLineItem key={item.cartLineId} item={item} />
              ))}
            </div>

            <div className="border-t border-black/10 px-[30px] py-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="bc-cart-footer-label">Subtotal</span>
                  <span className="bc-price">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between border-t border-black/10 pt-2">
                  <span className="bc-cart-footer-label">Total</span>
                  <span className="bc-price font-semibold">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <p className="bc-pdp-meta mt-3">
                Free shipping above ₹999. EDD shown after pincode entry.
              </p>

              <ShippingForm
                value={shipping}
                onChange={setShipping}
                onServiceabilityChange={setPincodeServiceable}
              />

              <div className="mt-4">
                <CheckoutButton
                  shipping={shipping}
                  pincodeServiceable={pincodeServiceable}
                />
              </div>

              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="bc-text-link mt-4 w-full text-center"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
