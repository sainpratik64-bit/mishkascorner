import { FieldValue } from 'firebase-admin/firestore';

import { getAdminFirestore } from '@/lib/firebase/admin';
import { COLLECTIONS } from '@/lib/firebase/schema';
import type { ProductSize, ShippingStatus } from '@/lib/firebase/schema';
import type { OrderShippingAddress } from './types';

export interface CheckoutLineItem {
  productId: string;
  size: ProductSize;
  quantity: number;
  price: number;
}

export interface CreatePendingOrderInput {
  userId: string;
  items: CheckoutLineItem[];
  totalAmount: number;
  razorpayOrderId: string;
  shipping?: OrderShippingAddress;
}

export interface OrderLineItem {
  variantId: string;
  productId: string;
  quantity: number;
  priceAtPurchase: number;
}

export interface OrderRecord {
  id: string;
  userId: string;
  totalAmount: number;
  paymentStatus: string;
  shippingStatus: string;
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;
  shiprocketOrderId: string | null;
  shiprocketAwb: string | null;
  shipping?: OrderShippingAddress;
  items: OrderLineItem[];
}

export async function createPendingOrder(input: CreatePendingOrderInput) {
  const db = getAdminFirestore();
  const orderRef = db.collection(COLLECTIONS.orders).doc();
  const now = FieldValue.serverTimestamp();

  await orderRef.set({
    userId: input.userId,
    totalAmount: input.totalAmount,
    paymentStatus: 'pending',
    shippingStatus: 'pending',
    razorpayOrderId: input.razorpayOrderId,
    razorpayPaymentId: null,
    shiprocketOrderId: null,
    shiprocketAwb: null,
    shipping: input.shipping ?? null,
    createdAt: now,
    updatedAt: now,
  });

  const batch = db.batch();

  for (const item of input.items) {
    const itemRef = orderRef.collection(COLLECTIONS.items).doc();
    batch.set(itemRef, {
      variantId: `${item.productId}-${item.size}`,
      productId: item.productId,
      quantity: item.quantity,
      priceAtPurchase: item.price,
      createdAt: now,
    });
  }

  await batch.commit();

  return { orderId: orderRef.id };
}

export async function getOrderByRazorpayOrderId(razorpayOrderId: string) {
  const db = getAdminFirestore();
  const snapshot = await db
    .collection(COLLECTIONS.orders)
    .where('razorpayOrderId', '==', razorpayOrderId)
    .limit(1)
    .get();

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data(),
  } as {
    id: string;
    paymentStatus: string;
    razorpayOrderId: string;
    totalAmount: number;
    shiprocketOrderId?: string | null;
    shiprocketAwb?: string | null;
  };
}

export async function getOrderWithItems(orderId: string): Promise<OrderRecord | null> {
  const db = getAdminFirestore();
  const orderRef = db.collection(COLLECTIONS.orders).doc(orderId);
  const orderSnap = await orderRef.get();

  if (!orderSnap.exists) return null;

  const itemsSnap = await orderRef.collection(COLLECTIONS.items).get();
  const data = orderSnap.data()!;

  return {
    id: orderSnap.id,
    userId: data.userId,
    totalAmount: data.totalAmount,
    paymentStatus: data.paymentStatus,
    shippingStatus: data.shippingStatus,
    razorpayOrderId: data.razorpayOrderId ?? null,
    razorpayPaymentId: data.razorpayPaymentId ?? null,
    shiprocketOrderId: data.shiprocketOrderId ?? null,
    shiprocketAwb: data.shiprocketAwb ?? null,
    shipping: data.shipping as OrderShippingAddress | undefined,
    items: itemsSnap.docs.map((doc) => doc.data() as OrderLineItem),
  };
}

export async function markOrderPaid(
  orderId: string,
  razorpayPaymentId: string
) {
  const db = getAdminFirestore();
  const orderRef = db.collection(COLLECTIONS.orders).doc(orderId);

  await orderRef.update({
    paymentStatus: 'paid',
    razorpayPaymentId,
    updatedAt: FieldValue.serverTimestamp(),
  });
}

export async function markOrderFailed(orderId: string) {
  const db = getAdminFirestore();
  const orderRef = db.collection(COLLECTIONS.orders).doc(orderId);

  await orderRef.update({
    paymentStatus: 'failed',
    updatedAt: FieldValue.serverTimestamp(),
  });
}

export async function updateShiprocketDetails(
  orderId: string,
  details: {
    shiprocketOrderId: string;
    shiprocketAwb: string | null;
    shippingStatus: ShippingStatus;
  }
) {
  const db = getAdminFirestore();
  const orderRef = db.collection(COLLECTIONS.orders).doc(orderId);

  await orderRef.update({
    shiprocketOrderId: details.shiprocketOrderId,
    shiprocketAwb: details.shiprocketAwb,
    shippingStatus: details.shippingStatus,
    updatedAt: FieldValue.serverTimestamp(),
  });
}

export async function updateShippingStatusFromWebhook(
  shiprocketOrderId: string,
  status: ShippingStatus,
  awb?: string | null
) {
  const db = getAdminFirestore();
  const snapshot = await db
    .collection(COLLECTIONS.orders)
    .where('shiprocketOrderId', '==', shiprocketOrderId)
    .limit(1)
    .get();

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  const updates: Record<string, unknown> = {
    shippingStatus: status,
    updatedAt: FieldValue.serverTimestamp(),
  };

  if (awb) updates.shiprocketAwb = awb;

  await doc.ref.update(updates);
  return doc.id;
}
