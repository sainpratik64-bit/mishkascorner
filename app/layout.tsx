import type { Metadata } from 'next';

import { CartDrawer } from '@/components/CartDrawer';
import { DynamicTabTitle } from '@/components/DynamicTabTitle';
import { InfiniteTicker } from '@/components/InfiniteTicker';
import { Navbar } from '@/components/Navbar';
import { SupportChat } from '@/components/support/SupportChat';

import './globals.css';

export const metadata: Metadata = {
  title: 'Mishkas Corner | GenZ Unisex Luxury Streetwear',
  description:
    'Bold high-contrast streetwear. Oversized tees, hoodies, and cargo — built unisex.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DynamicTabTitle />
        <InfiniteTicker />
        <Navbar />
        <CartDrawer />
        <SupportChat />
        <main>{children}</main>
      </body>
    </html>
  );
}
