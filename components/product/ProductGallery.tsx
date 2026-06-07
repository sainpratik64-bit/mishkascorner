'use client';

import Image from 'next/image';
import { useState } from 'react';

import type { ProductImage } from '@/lib/data/mock-products';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: ProductImage[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/5] overflow-hidden bg-brand-gray">
        <Image
          src={images[activeIndex].url}
          alt={images[activeIndex].alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 lg:hidden">
          {images.map((image, index) => (
            <button
              key={image.url}
              type="button"
              aria-label={`View ${image.alt}`}
              onClick={() => setActiveIndex(index)}
              className={cn(
                'relative aspect-square overflow-hidden bg-brand-gray ring-1 ring-transparent transition-all',
                activeIndex === index
                  ? 'ring-black/40'
                  : 'opacity-70 hover:opacity-100'
              )}
            >
              <Image
                src={image.url}
                alt={`${title} — ${image.alt}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <div className="hidden space-y-3 lg:block">
        {images.slice(1).map((image) => (
          <div
            key={image.url}
            className="relative aspect-[4/5] overflow-hidden bg-brand-gray"
          >
            <Image
              src={image.url}
              alt={`${title} — ${image.alt}`}
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
