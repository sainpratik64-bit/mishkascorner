'use client';

import { useEffect, useState } from 'react';

import { formatPrice } from '@/lib/utils';

interface PincodeCheckerProps {
  pincode: string;
  onServiceabilityChange?: (serviceable: boolean) => void;
}

interface PincodeResult {
  serviceable: boolean;
  estimatedDeliveryDate: string | null;
  shippingCost: number | null;
}

export function PincodeChecker({
  pincode,
  onServiceabilityChange,
}: PincodeCheckerProps) {
  const [result, setResult] = useState<PincodeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!/^[0-9]{6}$/.test(pincode)) {
      setResult(null);
      setError(null);
      onServiceabilityChange?.(false);
      return;
    }

    const controller = new AbortController();

    async function check() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch('/api/shipping/validate-pincode', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pincode }),
          signal: controller.signal,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error ?? 'Pincode check failed.');
        }

        const next: PincodeResult = {
          serviceable: data.serviceable,
          estimatedDeliveryDate: data.estimatedDeliveryDate,
          shippingCost: data.shippingCost,
        };

        setResult(next);
        onServiceabilityChange?.(next.serviceable);
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        setResult(null);
        onServiceabilityChange?.(false);
        setError(
          err instanceof Error ? err.message : 'Could not check pincode.'
        );
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(check, 400);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [pincode, onServiceabilityChange]);

  if (!/^[0-9]{6}$/.test(pincode)) return null;

  if (loading) {
    return (
      <p className="bc-pdp-meta">Checking delivery...</p>
    );
  }

  if (error) {
    return (
      <p className="text-xs text-brand-sale">{error}</p>
    );
  }

  if (!result) return null;

  if (!result.serviceable) {
    return (
      <p className="text-xs text-brand-sale">
        Delivery unavailable for this pincode
      </p>
    );
  }

  return (
    <div className="bc-pdp-meta space-y-1">
      {result.estimatedDeliveryDate && (
        <p>EDD: {result.estimatedDeliveryDate}</p>
      )}
      {result.shippingCost !== null && (
        <p>Shipping from {formatPrice(result.shippingCost)}</p>
      )}
    </div>
  );
}
