'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown, Heart, Search, User } from 'lucide-react';

import { CartButton } from '@/components/CartButton';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'WOMEN', href: '/collections/women' },
  { label: 'MEN', href: '/collections/men' },
  { label: 'UNISEX', href: '/collections/unisex' },
] as const;

const MOBILE_LINKS = [
  ...NAV_LINKS,
  { label: 'NEW DROPS', href: '/collections/new-drops' },
] as const;

interface NavbarProps {
  wishlistCount?: number;
}

export function Navbar({ wishlistCount = 0 }: NavbarProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const submitSearch = () => {
    const query = searchQuery.trim();
    if (!query) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setSearchQuery('');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-brand-white">
      <div className="mx-auto grid h-14 max-w-bonkers grid-cols-[1fr_auto_1fr] items-center gap-2 px-[15px] md:h-[72px] md:px-[50px]">
        <nav className="hidden items-center gap-5 min-[1068px]:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-1 text-bc-nav font-semibold uppercase transition-opacity hover:opacity-60"
            >
              {link.label}
              <ChevronDown className="h-3 w-3" />
            </Link>
          ))}
        </nav>

        <div className="min-[1068px]:hidden" />

        <Link
          href="/"
          className="justify-self-center text-center text-sm font-bold uppercase tracking-[0.15em] md:text-base"
        >
          MISHKAS
          <br className="md:hidden" />
          <span className="hidden md:inline"> </span>
          CORNER
        </Link>

        <div className="flex items-center justify-end gap-2 md:gap-3">
          <div className="relative hidden md:block">
            <Input
              placeholder="Search..."
              className="h-9 w-44 rounded-full border border-black/20 pr-9 text-sm normal-case lg:w-52"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') submitSearch();
              }}
            />
            <button
              type="button"
              aria-label="Search"
              onClick={submitSearch}
              className="absolute right-2.5 top-1/2 -translate-y-1/2"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            aria-label="Search"
            onClick={() => router.push('/search')}
            className="flex h-9 w-9 items-center justify-center md:hidden"
          >
            <Search className="h-4 w-4" />
          </button>

          <Link
            href="/account"
            aria-label="Account"
            className="hidden h-9 w-9 items-center justify-center transition-opacity hover:opacity-60 sm:flex"
          >
            <User className="h-4 w-4" />
          </Link>

          <Link
            href="/wishlist"
            aria-label={`Wishlist, ${wishlistCount} items`}
            className="relative flex h-9 w-9 items-center justify-center transition-opacity hover:opacity-60"
          >
            <Heart className="h-4 w-4" />
            {wishlistCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-black px-1 text-[10px] font-semibold text-brand-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          <CartButton />
        </div>
      </div>

      <nav className="flex items-center justify-center gap-5 overflow-x-auto border-t border-black/10 px-4 py-2.5 min-[1068px]:hidden">
        {MOBILE_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn('shrink-0 text-bc-nav font-semibold uppercase')}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
