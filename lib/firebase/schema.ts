import type { Timestamp } from 'firebase/firestore';

// =============================================================================
// Mishkas Corner — Firestore Schema Types
// =============================================================================
// Collection layout (Firebase replaces Supabase PostgreSQL tables):
//
//   profiles/{userId}
//     └── addresses/{addressId}
//
//   products/{productId}
//     ├── variants/{variantId}    ← product_variants
//     └── images/{imageId}        ← product_images
//
//   orders/{orderId}
//     └── items/{itemId}          ← order_items
// =============================================================================

export type AddressType = 'home' | 'work';
export type ProductStatus = 'draft' | 'active';
export type ProductSize = 'S' | 'M' | 'L' | 'XL' | 'XXL';
export type PaymentStatus = 'pending' | 'paid' | 'failed';
export type ShippingStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

/** profiles — extends Firebase Auth user */
export interface Profile {
  phoneNumber: string | null;
  fullName: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/** addresses — nested under profiles/{userId}/addresses */
export interface Address {
  isDefault: boolean;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  pincode: string;
  type: AddressType;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/**
 * products — top-level catalog.
 * Slug uniqueness is enforced at write time (query-before-create transaction).
 * Alternative: use `slug` as the document ID for native uniqueness.
 */
export interface Product {
  title: string;
  slug: string;
  description: string | null;
  price: number;
  compareAtPrice: number | null;
  gsm: number | null;
  fabric: string | null;
  isUnisex: boolean;
  status: ProductStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/** products/{productId}/variants — size/SKU inventory */
export interface ProductVariant {
  size: ProductSize;
  sku: string;
  stockQuantity: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/** products/{productId}/images — ordered media gallery */
export interface ProductImage {
  imageUrl: string;
  altText: string | null;
  displayOrder: number;
  createdAt: Timestamp;
}

/** orders — checkout records */
export interface Order {
  userId: string;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  shippingStatus: ShippingStatus;
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;
  shiprocketOrderId: string | null;
  shiprocketAwb: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/** orders/{orderId}/items — immutable line items */
export interface OrderItem {
  variantId: string;
  productId: string;
  quantity: number;
  priceAtPurchase: number;
  createdAt: Timestamp;
}

/** Firestore collection path constants */
export const COLLECTIONS = {
  profiles: 'profiles',
  addresses: 'addresses',
  products: 'products',
  variants: 'variants',
  images: 'images',
  orders: 'orders',
  items: 'items',
} as const;
