import Link from 'next/link';

import { Button } from '@/components/ui/button';

interface SuccessPageProps {
  searchParams: Promise<{
    orderId?: string;
    shiprocketOrderId?: string;
  }>;
}

export default async function CheckoutSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { orderId, shiprocketOrderId } = await searchParams;

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-muted">
        Payment Confirmed
      </p>
      <h1 className="mt-3 font-display text-4xl font-black uppercase md:text-5xl">
        Order Placed
      </h1>
      <p className="mt-4 max-w-md text-sm text-brand-muted">
        Your payment was verified securely. We&apos;re prepping your drop for
        dispatch.
      </p>
      {orderId && (
        <p className="mt-2 text-xs font-bold uppercase tracking-widest">
          Order ID: {orderId}
        </p>
      )}
      {shiprocketOrderId && (
        <p className="mt-1 text-xs font-bold uppercase tracking-widest text-brand-muted">
          Shipment queued: {shiprocketOrderId}
        </p>
      )}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/collections/new-drops">Continue Shopping</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Back Home</Link>
        </Button>
      </div>
    </section>
  );
}
