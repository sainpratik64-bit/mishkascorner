import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function ProductNotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-4xl font-black uppercase">Not Found</h1>
      <p className="mt-3 max-w-md text-sm text-brand-muted">
        This drop doesn&apos;t exist or has been pulled from the rack.
      </p>
      <Button asChild className="mt-6">
        <Link href="/collections/new-drops">Browse New Drops</Link>
      </Button>
    </section>
  );
}
