'use client';

import { useCheckout } from '@/hooks/use-checkout';
import type { OrderShippingAddress } from '@/lib/orders/types';
import { isShippingComplete } from '@/components/shipping/ShippingForm';

interface CheckoutButtonProps {
  shipping: OrderShippingAddress;
  pincodeServiceable: boolean;
}

export function CheckoutButton({
  shipping,
  pincodeServiceable,
}: CheckoutButtonProps) {
  const { checkout, isLoading, error } = useCheckout();
  const canCheckout =
    isShippingComplete(shipping) && pincodeServiceable && !isLoading;

  return (
    <div>
      <button
        type="button"
        className="bc-pdp-btn"
        onClick={() => checkout(shipping)}
        disabled={!canCheckout}
      >
        {isLoading ? 'Processing...' : 'Checkout'}
      </button>
      {!isShippingComplete(shipping) && (
        <p className="bc-pdp-meta mt-2 text-center">
          Enter shipping details to continue
        </p>
      )}
      {isShippingComplete(shipping) && !pincodeServiceable && (
        <p className="mt-2 text-center text-xs text-brand-sale">
          Delivery unavailable for this pincode
        </p>
      )}
      {error && (
        <p className="mt-2 text-center text-xs text-brand-sale">{error}</p>
      )}
    </div>
  );
}
