import Image from 'next/image';
import Link from 'next/link';

interface CollectionHeroProps {
  title: string;
  breadcrumbLabel: string;
  imageUrl: string;
}

export function CollectionHero({
  title,
  breadcrumbLabel,
  imageUrl,
}: CollectionHeroProps) {
  return (
    <section className="relative flex min-h-[270px] items-center justify-center text-white md:min-h-[350px]">
      <Image
        src={imageUrl}
        alt={title}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/45" />

      <nav
        aria-label="Breadcrumb"
        className="absolute left-[15px] top-5 z-10 text-xs tracking-wide md:left-[50px] md:top-8"
      >
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/collections/new-drops" className="hover:underline">
              Shop
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium">{breadcrumbLabel}</li>
        </ol>
      </nav>

      <div className="relative z-10 px-6 text-center">
        <h1 className="text-3xl font-semibold uppercase tracking-wide md:text-5xl lg:text-6xl">
          {title}
        </h1>
      </div>
    </section>
  );
}
