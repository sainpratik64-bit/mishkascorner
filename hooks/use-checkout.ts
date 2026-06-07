'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import type { OrderShippingAddress } from '@/lib/orders/types';
import { useCartStore } from '@/lib/store/cart-store';
import { openRazorpayCheckout } from '@/lib/razorpay/checkout-client';

interface CreateOrderResponse {
  orderId: string;
  razorpayOrderId: string;
  amount: number;
  currency: string;
  keyId: string;
}

export function useCheckout() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const closeDrawer = useCartStore((s) => s.closeDrawer);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkout = useCallback(async (shipping: OrderShippingAddress) => {
    if (!items.length) return;

    setIsLoading(true);
    setError(null);

    try {
      const createRes = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            size: item.size,
            quantity: item.quantity,
          })),
          shipping,
        }),
      });

      const createData = await createRes.json();

      if (!createRes.ok) {
        throw new Error(createData.error ?? 'Could not start checkout.');
      }

      const order = createData as CreateOrderResponse;

      await openRazorpayCheckout({
        keyId: order.keyId,
        amount: order.amount,
        currency: order.currency,
        orderId: order.orderId,
        razorpayOrderId: order.razorpayOrderId,
        onSuccess: async (response) => {
          const verifyRes = await fetch('/api/checkout/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId: order.orderId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();

          if (!verifyRes.ok) {
            throw new Error(verifyData.error ?? 'Payment verification failed.');
          }

          clearCart();
          closeDrawer();
          const params = new URLSearchParams({ orderId: order.orderId });
          if (verifyData.shiprocketOrderId) {
            params.set('shiprocketOrderId', verifyData.shiprocketOrderId);
          }
          router.push(`/checkout/success?${params.toString()}`);
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed.');
    } finally {
      setIsLoading(false);
    }
  }, [items, clearCart, closeDrawer, router]);

  return { checkout, isLoading, error };
}
