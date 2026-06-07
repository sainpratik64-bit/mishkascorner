import type { ProductSize } from '@/lib/firebase/schema';
import { SAMPLE_IMAGES } from '@/lib/data/sample-images';

export type ProductCategory =
  | 'oversized-t-shirts'
  | 'hoodies'
  | 'cargo-pants'
  | 'sweatshirts'
  | 'shorts';

export type ProductAudience = 'men' | 'women' | 'unisex';

export interface ProductImage {
  url: string;
  alt: string;
}

export interface ProductVariant {
  size: ProductSize;
  stockQuantity: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  gsm: number | null;
  fabric: string | null;
  isUnisex: boolean;
  audience: ProductAudience[];
  categories: ProductCategory[];
  isNewDrop: boolean;
  createdAt: string;
  primaryImage: string;
  hoverImage: string;
  images: ProductImage[];
  variants: ProductVariant[];
}

/** @deprecated Use Product — kept for ProductCard backward compat */
export type ProductCardData = Pick<
  Product,
  | 'id'
  | 'slug'
  | 'title'
  | 'price'
  | 'compareAtPrice'
  | 'primaryImage'
  | 'hoverImage'
  | 'variants'
>;

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  'oversized-t-shirts': 'Oversized T-Shirts',
  hoodies: 'Hoodies',
  'cargo-pants': 'Cargo Pants',
  sweatshirts: 'Sweatshirts',
  shorts: 'Shorts',
};

export const COLLECTION_LABELS: Record<string, string> = {
  men: 'Men',
  women: 'Women',
  unisex: 'Unisex',
  'new-drops': 'New Drops',
};

export const COLLECTION_DESCRIPTIONS: Partial<Record<string, string>> = {
  women:
    'Own your look with confidence with Mishkas Corner cargos and streetwear for women — the ultimate mix of function and street-style flair. Whether you are going for a laid-back vibe or an edgy city look, these pieces are built for comfort, confidence, and all-day movement. With roomy pockets, durable fabrics, and trend-forward silhouettes, our drops redefine everyday cool.',
  men: 'Bold streetwear drops engineered for movement. From oversized tees to utility cargos — premium GSM cotton, clean finishes, and fits that hit every time. Designed to move with you from coffee runs to night drives.',
  unisex: 'Built for all. Genderless fits, heavyweight fabrics, and statement pieces designed to move with you from coffee runs to night drives.',
  'new-drops':
    'The latest pieces just landed. Scroll, style your way, and let every outfit speak to your vibe.',
};

export const COLLECTION_HERO_IMAGES: Partial<Record<string, string>> = {
  women: SAMPLE_IMAGES.heroes.women,
  men: SAMPLE_IMAGES.heroes.men,
  unisex: SAMPLE_IMAGES.heroes.unisex,
  'new-drops': SAMPLE_IMAGES.heroes.newDrops,
};

export const COLLECTION_BREADCRUMBS: Partial<Record<string, string>> = {
  women: 'Cargo Womens',
  men: 'Mens Collection',
  unisex: 'Unisex',
  'new-drops': 'New Drops',
};

export const COLLECTION_HERO_TITLES: Partial<Record<string, string>> = {
  women: 'Cargo Womens',
  men: 'Mens Streetwear',
  unisex: 'Unisex',
  'new-drops': 'New Drops',
};

export const TICKER_MESSAGES = [
  'FREE SHIPPING ON ORDERS ABOVE ₹999',
  'NEW DROP LIVE — OVERSIZED TEES',
  'USE CODE MISHKA10 FOR 10% OFF',
  'UNISEX STREETWEAR — BUILT FOR ALL',
  '240 GSM HEAVYWEIGHT COTTON',
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'oversized-drop-tee-black',
    title: 'Oversized Drop Tee — Black',
    description:
      '240 GSM heavyweight cotton with a boxy drop-shoulder fit. Pre-shrunk, enzyme-washed for a lived-in feel from day one.',
    price: 1299,
    compareAtPrice: 1599,
    gsm: 240,
    fabric: '100% Cotton',
    isUnisex: true,
    audience: ['men', 'women', 'unisex'],
    categories: ['oversized-t-shirts'],
    isNewDrop: true,
    createdAt: '2026-06-01T00:00:00Z',
    primaryImage: SAMPLE_IMAGES.products.blackTee.primary,
    hoverImage: SAMPLE_IMAGES.products.blackTee.hover,
    images: [
      { url: SAMPLE_IMAGES.products.blackTee.gallery[0], alt: 'Front view' },
      { url: SAMPLE_IMAGES.products.blackTee.gallery[1], alt: 'Styled look' },
      { url: SAMPLE_IMAGES.products.blackTee.gallery[2], alt: 'Fabric detail' },
      { url: SAMPLE_IMAGES.products.blackTee.gallery[3], alt: 'Fit reference' },
    ],
    variants: [
      { size: 'S', stockQuantity: 10 },
      { size: 'M', stockQuantity: 25 },
      { size: 'L', stockQuantity: 18 },
      { size: 'XL', stockQuantity: 12 },
      { size: 'XXL', stockQuantity: 0 },
    ],
  },
  {
    id: '2',
    slug: 'cargo-parachute-pants-olive',
    title: 'Cargo Parachute Pants — Olive',
    description:
      'Relaxed parachute silhouette with articulated knee panels and 8-pocket utility layout. Adjustable drawcord cuffs.',
    price: 2199,
    compareAtPrice: 2799,
    gsm: null,
    fabric: 'Cotton-Nylon Blend',
    isUnisex: true,
    audience: ['men', 'unisex'],
    categories: ['cargo-pants'],
    isNewDrop: true,
    createdAt: '2026-05-28T00:00:00Z',
    primaryImage: SAMPLE_IMAGES.products.cargoOlive.primary,
    hoverImage: SAMPLE_IMAGES.products.cargoOlive.hover,
    images: [
      { url: SAMPLE_IMAGES.products.cargoOlive.gallery[0], alt: 'Front view' },
      { url: SAMPLE_IMAGES.products.cargoOlive.gallery[1], alt: 'Styled look' },
      { url: SAMPLE_IMAGES.products.cargoOlive.gallery[2], alt: 'Side profile' },
    ],
    variants: [
      { size: 'M', stockQuantity: 8 },
      { size: 'L', stockQuantity: 14 },
      { size: 'XL', stockQuantity: 6 },
    ],
  },
  {
    id: '3',
    slug: 'graphic-hoodie-volt',
    title: 'Graphic Hoodie — Volt',
    description:
      '400 GSM French terry with puff-print graphic on chest. Kangaroo pocket, ribbed cuffs, oversized hood.',
    price: 2499,
    compareAtPrice: null,
    gsm: 400,
    fabric: 'French Terry Cotton',
    isUnisex: true,
    audience: ['men', 'women', 'unisex'],
    categories: ['hoodies'],
    isNewDrop: true,
    createdAt: '2026-06-03T00:00:00Z',
    primaryImage: SAMPLE_IMAGES.products.voltHoodie.primary,
    hoverImage: SAMPLE_IMAGES.products.voltHoodie.hover,
    images: [
      { url: SAMPLE_IMAGES.products.voltHoodie.gallery[0], alt: 'Front view' },
      { url: SAMPLE_IMAGES.products.voltHoodie.gallery[1], alt: 'Back view' },
      { url: SAMPLE_IMAGES.products.voltHoodie.gallery[2], alt: 'Styled look' },
    ],
    variants: [
      { size: 'S', stockQuantity: 5 },
      { size: 'M', stockQuantity: 9 },
      { size: 'L', stockQuantity: 7 },
      { size: 'XL', stockQuantity: 3 },
    ],
  },
  {
    id: '4',
    slug: 'box-fit-tee-white',
    title: 'Box Fit Tee — White',
    description:
      'Clean box-fit tee in 220 GSM combed cotton. Reinforced neckline, minimal branding, everyday essential.',
    price: 999,
    compareAtPrice: 1299,
    gsm: 220,
    fabric: '100% Combed Cotton',
    isUnisex: true,
    audience: ['women', 'unisex'],
    categories: ['oversized-t-shirts'],
    isNewDrop: false,
    createdAt: '2026-04-15T00:00:00Z',
    primaryImage: SAMPLE_IMAGES.products.whiteTee.primary,
    hoverImage: SAMPLE_IMAGES.products.whiteTee.hover,
    images: [
      { url: SAMPLE_IMAGES.products.whiteTee.gallery[0], alt: 'Front view' },
      { url: SAMPLE_IMAGES.products.whiteTee.gallery[1], alt: 'Styled look' },
    ],
    variants: [
      { size: 'S', stockQuantity: 20 },
      { size: 'M', stockQuantity: 30 },
      { size: 'L', stockQuantity: 22 },
      { size: 'XL', stockQuantity: 15 },
    ],
  },
  {
    id: '5',
    slug: 'acid-wash-hoodie-charcoal',
    title: 'Acid Wash Hoodie — Charcoal',
    description:
      'Vintage acid-wash treatment on 380 GSM fleece. Distressed hem, raw-edge details, relaxed fit.',
    price: 2799,
    compareAtPrice: 3299,
    gsm: 380,
    fabric: 'Cotton Fleece',
    isUnisex: false,
    audience: ['men'],
    categories: ['hoodies', 'sweatshirts'],
    isNewDrop: false,
    createdAt: '2026-03-20T00:00:00Z',
    primaryImage: SAMPLE_IMAGES.products.charcoalHoodie.primary,
    hoverImage: SAMPLE_IMAGES.products.charcoalHoodie.hover,
    images: [
      { url: SAMPLE_IMAGES.products.charcoalHoodie.gallery[0], alt: 'Front view' },
      { url: SAMPLE_IMAGES.products.charcoalHoodie.gallery[1], alt: 'Back view' },
    ],
    variants: [
      { size: 'M', stockQuantity: 11 },
      { size: 'L', stockQuantity: 9 },
      { size: 'XL', stockQuantity: 4 },
    ],
  },
  {
    id: '6',
    slug: 'utility-cargo-shorts-stone',
    title: 'Utility Cargo Shorts — Stone',
    description:
      'Above-knee cargo shorts with gusseted crotch and D-ring belt loops. Lightweight ripstop for summer drops.',
    price: 1499,
    compareAtPrice: 1899,
    gsm: null,
    fabric: 'Cotton Ripstop',
    isUnisex: false,
    audience: ['women'],
    categories: ['shorts', 'cargo-pants'],
    isNewDrop: true,
    createdAt: '2026-05-30T00:00:00Z',
    primaryImage: SAMPLE_IMAGES.products.cargoShorts.primary,
    hoverImage: SAMPLE_IMAGES.products.cargoShorts.hover,
    images: [
      { url: SAMPLE_IMAGES.products.cargoShorts.gallery[0], alt: 'Front view' },
      { url: SAMPLE_IMAGES.products.cargoShorts.gallery[1], alt: 'Styled look' },
    ],
    variants: [
      { size: 'S', stockQuantity: 7 },
      { size: 'M', stockQuantity: 12 },
      { size: 'L', stockQuantity: 8 },
    ],
  },
  {
    id: '7',
    slug: 'oversized-sweatshirt-cream',
    title: 'Oversized Sweatshirt — Cream',
    description:
      'Loopback sweatshirt in 360 GSM with dropped shoulders. Embroidered logo, ribbed side panels.',
    price: 1899,
    compareAtPrice: null,
    gsm: 360,
    fabric: 'Loopback Cotton',
    isUnisex: true,
    audience: ['women', 'unisex'],
    categories: ['sweatshirts'],
    isNewDrop: false,
    createdAt: '2026-02-10T00:00:00Z',
    primaryImage: SAMPLE_IMAGES.products.creamSweatshirt.primary,
    hoverImage: SAMPLE_IMAGES.products.creamSweatshirt.hover,
    images: [
      { url: SAMPLE_IMAGES.products.creamSweatshirt.gallery[0], alt: 'Front view' },
      { url: SAMPLE_IMAGES.products.creamSweatshirt.gallery[1], alt: 'Styled look' },
    ],
    variants: [
      { size: 'S', stockQuantity: 14 },
      { size: 'M', stockQuantity: 19 },
      { size: 'L', stockQuantity: 16 },
      { size: 'XL', stockQuantity: 0 },
    ],
  },
  {
    id: '8',
    slug: 'stacked-logo-tee-red',
    title: 'Stacked Logo Tee — Red',
    description:
      '250 GSM oversized tee with stacked logo print. Boxy cut, wide sleeves, limited run colorway.',
    price: 1199,
    compareAtPrice: 1499,
    gsm: 250,
    fabric: '100% Cotton',
    isUnisex: false,
    audience: ['men'],
    categories: ['oversized-t-shirts'],
    isNewDrop: true,
    createdAt: '2026-06-05T00:00:00Z',
    primaryImage: SAMPLE_IMAGES.products.redTee.primary,
    hoverImage: SAMPLE_IMAGES.products.redTee.hover,
    images: [
      { url: SAMPLE_IMAGES.products.redTee.gallery[0], alt: 'Front view' },
      { url: SAMPLE_IMAGES.products.redTee.gallery[1], alt: 'Styled look' },
    ],
    variants: [
      { size: 'M', stockQuantity: 22 },
      { size: 'L', stockQuantity: 17 },
      { size: 'XL', stockQuantity: 10 },
      { size: 'XXL', stockQuantity: 5 },
    ],
  },
];
