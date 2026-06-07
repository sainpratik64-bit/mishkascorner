'use client';

import { useState } from 'react';

import { PincodeChecker } from '@/components/shipping/PincodeChecker';
import { Input } from '@/components/ui/input';
import type { OrderShippingAddress } from '@/lib/orders/types';

const EMPTY_SHIPPING: OrderShippingAddress = {
  fullName: '',
  phone: '',
  email: '',
  addressLine1: '',
  addressLine2: null,
  city: '',
  state: '',
  pincode: '',
};

interface ShippingFormProps {
  value: OrderShippingAddress;
  onChange: (value: OrderShippingAddress) => void;
  onServiceabilityChange?: (serviceable: boolean) => void;
}

export function ShippingForm({
  value,
  onChange,
  onServiceabilityChange,
}: ShippingFormProps) {
  const [pincodeServiceable, setPincodeServiceable] = useState(false);

  const update = (patch: Partial<OrderShippingAddress>) => {
    onChange({ ...value, ...patch });
  };

  const handleServiceability = (serviceable: boolean) => {
    setPincodeServiceable(serviceable);
    onServiceabilityChange?.(serviceable);
  };

  return (
    <div className="mt-4 space-y-3 border-t border-black/10 pt-4">
      <p className="bc-filter-heading">Shipping Details</p>

      <Input
        placeholder="Full Name"
        value={value.fullName}
        onChange={(e) => update({ fullName: e.target.value })}
        className="h-10 text-sm"
      />
      <div className="grid grid-cols-2 gap-2">
        <Input
          placeholder="Phone"
          value={value.phone}
          onChange={(e) => update({ phone: e.target.value })}
          className="h-10 text-sm"
        />
        <Input
          placeholder="Email"
          type="email"
          value={value.email}
          onChange={(e) => update({ email: e.target.value })}
          className="h-10 text-sm"
        />
      </div>
      <Input
        placeholder="Address Line 1"
        value={value.addressLine1}
        onChange={(e) => update({ addressLine1: e.target.value })}
        className="h-10 text-sm"
      />
      <Input
        placeholder="Address Line 2 (optional)"
        value={value.addressLine2 ?? ''}
        onChange={(e) => update({ addressLine2: e.target.value || null })}
        className="h-10 text-sm"
      />
      <div className="grid grid-cols-2 gap-2">
        <Input
          placeholder="City"
          value={value.city}
          onChange={(e) => update({ city: e.target.value })}
          className="h-10 text-sm"
        />
        <Input
          placeholder="State"
          value={value.state}
          onChange={(e) => update({ state: e.target.value })}
          className="h-10 text-sm"
        />
      </div>
      <Input
        placeholder="Pincode"
        value={value.pincode}
        onChange={(e) => update({ pincode: e.target.value })}
        className="h-10 text-sm"
        maxLength={6}
      />
      <PincodeChecker
        pincode={value.pincode}
        onServiceabilityChange={handleServiceability}
      />
      {!pincodeServiceable && value.pincode.length === 6 && (
        <p className="sr-only">Pincode not yet serviceable</p>
      )}
    </div>
  );
}

export function createEmptyShipping(): OrderShippingAddress {
  return { ...EMPTY_SHIPPING };
}

export function isShippingComplete(shipping: OrderShippingAddress): boolean {
  return Boolean(
    shipping.fullName.trim() &&
      /^[0-9]{10}$/.test(shipping.phone.trim()) &&
      shipping.email.trim() &&
      shipping.addressLine1.trim() &&
      shipping.city.trim() &&
      shipping.state.trim() &&
      /^[0-9]{6}$/.test(shipping.pincode.trim())
  );
}
