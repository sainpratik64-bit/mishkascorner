import { COLLECTIONS } from './schema';

/** Typed Firestore path builders — keeps collection references consistent. */
export const paths = {
  profile: (userId: string) =>
    `${COLLECTIONS.profiles}/${userId}` as const,

  addresses: (userId: string) =>
    `${COLLECTIONS.profiles}/${userId}/${COLLECTIONS.addresses}` as const,

  address: (userId: string, addressId: string) =>
    `${COLLECTIONS.profiles}/${userId}/${COLLECTIONS.addresses}/${addressId}` as const,

  products: () => COLLECTIONS.products,

  product: (productId: string) =>
    `${COLLECTIONS.products}/${productId}` as const,

  productBySlug: () => COLLECTIONS.products,

  variants: (productId: string) =>
    `${COLLECTIONS.products}/${productId}/${COLLECTIONS.variants}` as const,

  variant: (productId: string, variantId: string) =>
    `${COLLECTIONS.products}/${productId}/${COLLECTIONS.variants}/${variantId}` as const,

  images: (productId: string) =>
    `${COLLECTIONS.products}/${productId}/${COLLECTIONS.images}` as const,

  image: (productId: string, imageId: string) =>
    `${COLLECTIONS.products}/${productId}/${COLLECTIONS.images}/${imageId}` as const,

  orders: () => COLLECTIONS.orders,

  order: (orderId: string) =>
    `${COLLECTIONS.orders}/${orderId}` as const,

  orderItems: (orderId: string) =>
    `${COLLECTIONS.orders}/${orderId}/${COLLECTIONS.items}` as const,

  orderItem: (orderId: string, itemId: string) =>
    `${COLLECTIONS.orders}/${orderId}/${COLLECTIONS.items}/${itemId}` as const,
};
