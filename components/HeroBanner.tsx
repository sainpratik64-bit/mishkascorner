import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { SAMPLE_IMAGES } from '@/lib/data/sample-images';

export function HeroBanner() {
  return (
    <section className="relative min-h-[70vh] w-full border-b-2 border-brand-black md:min-h-[85vh]">
      <Image
        src={SAMPLE_IMAGES.heroes.home}
        alt="Latest streetwear drop"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-white/80">
          SS26 Collection
        </p>
        <h1 className="mt-2 max-w-2xl font-display text-4xl font-black uppercase leading-none text-brand-white md:text-6xl lg:text-7xl">
          Bold Fits.
          <br />
          Zero Compromise.
        </h1>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/collections/new-drops">Shop The Drop</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-brand-white text-brand-white hover:bg-brand-white hover:text-brand-black"
          >
            <Link href="/collections/unisex">Explore Unisex</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
