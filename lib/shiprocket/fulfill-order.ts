import { getProductById } from '@/lib/catalog/get-product';
import {
  getOrderWithItems,
  updateShiprocketDetails,
} from '@/lib/orders/service';
import type { OrderShippingAddress } from '@/lib/orders/types';
import { createShiprocketOrder } from './client';
import { getShiprocketPickupLocation } from './config';
import type { ShiprocketCreateOrderPayload } from './types';

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  return {
    first: parts[0] ?? 'Customer',
    last: parts.slice(1).join(' ') || '.',
  };
}

function estimateWeightKg(itemCount: number) {
  return Math.max(0.5, itemCount * 0.35);
}

export async function fulfillOrderOnShiprocket(orderId: string) {
  const order = await getOrderWithItems(orderId);

  if (!order) {
    throw new Error(`Order ${orderId} not found.`);
  }

  if (order.shiprocketOrderId) {
    return {
      shiprocketOrderId: order.shiprocketOrderId,
      shiprocketAwb: order.shiprocketAwb,
      skipped: true,
    };
  }

  const shipping = order.shipping as OrderShippingAddress | undefined;
  if (!shipping) {
    throw new Error('Shipping address missing on order.');
  }

  const { first, last } = splitName(shipping.fullName);
  const orderItems = order.items.map((item) => {
    const product = getProductById(item.productId);
    return {
      name: product?.title ?? `Product ${item.productId}`,
      sku: item.variantId,
      units: item.quantity,
      selling_price: item.priceAtPurchase,
    };
  });

  const totalUnits = order.items.reduce((sum, i) => sum + i.quantity, 0);
  const payload: ShiprocketCreateOrderPayload = {
    order_id: orderId,
    order_date: new Date().toISOString().slice(0, 10),
    pickup_location: getShiprocketPickupLocation(),
    billing_customer_name: first,
    billing_last_name: last,
    billing_address: shipping.addressLine1,
    billing_address_2: shipping.addressLine2 ?? '',
    billing_city: shipping.city,
    billing_pincode: shipping.pincode,
    billing_state: shipping.state,
    billing_country: 'India',
    billing_email: shipping.email,
    billing_phone: shipping.phone,
    shipping_is_billing: true,
    order_items: orderItems,
    payment_method: 'Prepaid',
    sub_total: order.totalAmount,
    length: 30,
    breadth: 25,
    height: 5,
    weight: estimateWeightKg(totalUnits),
  };

  const response = await createShiprocketOrder(payload);

  await updateShiprocketDetails(orderId, {
    shiprocketOrderId: String(response.order_id),
    shiprocketAwb: response.awb_code ?? null,
    shippingStatus: 'processing',
  });

  return {
    shiprocketOrderId: String(response.order_id),
    shiprocketAwb: response.awb_code ?? null,
    skipped: false,
  };
}
