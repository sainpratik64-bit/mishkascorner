import { getProductById } from '@/lib/catalog/get-product';
import type { ProductSize } from '@/lib/firebase/schema';

export interface CartCheckoutItem {
  productId: string;
  size: ProductSize;
  quantity: number;
}

export interface ValidatedCheckoutItem {
  productId: string;
  size: ProductSize;
  quantity: number;
  price: number;
  title: string;
}

export interface ValidatedCart {
  items: ValidatedCheckoutItem[];
  totalAmount: number;
}

export function validateCartItems(
  items: CartCheckoutItem[]
): { ok: true; data: ValidatedCart } | { ok: false; error: string } {
  if (!items.length) {
    return { ok: false, error: 'Cart is empty.' };
  }

  const validated: ValidatedCheckoutItem[] = [];
  let totalAmount = 0;

  for (const item of items) {
    if (!item.productId || !item.size || item.quantity < 1) {
      return { ok: false, error: 'Invalid cart item.' };
    }

    const product = getProductById(item.productId);
    if (!product) {
      return { ok: false, error: `Product not found: ${item.productId}` };
    }

    const variant = product.variants.find((v) => v.size === item.size);
    if (!variant) {
      return { ok: false, error: `Size ${item.size} unavailable for ${product.title}.` };
    }

    if (item.quantity > variant.stockQuantity) {
      return {
        ok: false,
        error: `Only ${variant.stockQuantity} left for ${product.title} (${item.size}).`,
      };
    }

    const lineTotal = product.price * item.quantity;
    totalAmount += lineTotal;

    validated.push({
      productId: product.id,
      size: item.size,
      quantity: item.quantity,
      price: product.price,
      title: product.title,
    });
  }

  return {
    ok: true,
    data: { items: validated, totalAmount },
  };
}
