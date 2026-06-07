import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import type { ProductSize } from '@/lib/firebase/schema';

export interface CartItem {
  cartLineId: string;
  productId: string;
  slug: string;
  title: string;
  size: ProductSize;
  price: number;
  imageUrl: string;
  quantity: number;
  maxQuantity: number;
}

export interface AddToCartInput {
  productId: string;
  slug: string;
  title: string;
  price: number;
  size: ProductSize;
  imageUrl: string;
  maxQuantity: number;
}

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  addItem: (input: AddToCartInput) => void;
  removeItem: (cartLineId: string) => void;
  setQuantity: (cartLineId: string, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  setDrawerOpen: (open: boolean) => void;
}

function buildLineId(productId: string, size: ProductSize) {
  return `${productId}-${size}`;
}

function calcItemCount(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

function calcSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,

      addItem: (input) => {
        const cartLineId = buildLineId(input.productId, input.size);
        const existing = get().items.find((i) => i.cartLineId === cartLineId);

        if (existing) {
          const nextQty = Math.min(existing.quantity + 1, input.maxQuantity);
          if (nextQty === existing.quantity) return;

          set({
            items: get().items.map((item) =>
              item.cartLineId === cartLineId
                ? { ...item, quantity: nextQty, maxQuantity: input.maxQuantity }
                : item
            ),
            isDrawerOpen: true,
          });
          return;
        }

        set({
          items: [
            ...get().items,
            {
              cartLineId,
              productId: input.productId,
              slug: input.slug,
              title: input.title,
              size: input.size,
              price: input.price,
              imageUrl: input.imageUrl,
              quantity: 1,
              maxQuantity: input.maxQuantity,
            },
          ],
          isDrawerOpen: true,
        });
      },

      removeItem: (cartLineId) => {
        set({ items: get().items.filter((i) => i.cartLineId !== cartLineId) });
      },

      setQuantity: (cartLineId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(cartLineId);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.cartLineId === cartLineId
              ? {
                  ...item,
                  quantity: Math.min(quantity, item.maxQuantity),
                }
              : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      setDrawerOpen: (open) => set({ isDrawerOpen: open }),
    }),
    {
      name: 'mishkascorner-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export function selectCartItems(state: CartState) {
  return state.items;
}

export function selectCartItemCount(state: CartState) {
  return calcItemCount(state.items);
}

export function selectCartSubtotal(state: CartState) {
  return calcSubtotal(state.items);
}

export function selectCartTotal(state: CartState) {
  return calcSubtotal(state.items);
}
