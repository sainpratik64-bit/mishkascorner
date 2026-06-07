import { NextResponse } from 'next/server';

import { isFirebaseAdminConfigured } from '@/lib/firebase/admin';
import type { ShippingStatus } from '@/lib/firebase/schema';
import { updateShippingStatusFromWebhook } from '@/lib/orders/service';

export const runtime = 'nodejs';

const STATUS_MAP: Record<string, ShippingStatus> = {
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  'IN TRANSIT': 'shipped',
  PICKED_UP: 'processing',
};

interface ShiprocketWebhookPayload {
  order_id?: string | number;
  awb?: string;
  current_status?: string;
  shipment_status?: string;
}

export async function POST(request: Request) {
  try {
    if (!isFirebaseAdminConfigured()) {
      return NextResponse.json({ error: 'Not configured.' }, { status: 503 });
    }

    const body = (await request.json()) as ShiprocketWebhookPayload;
    const shiprocketOrderId = body.order_id ? String(body.order_id) : null;
    const rawStatus = body.current_status ?? body.shipment_status ?? '';
    const mappedStatus = STATUS_MAP[rawStatus.toUpperCase()];

    if (!shiprocketOrderId || !mappedStatus) {
      return NextResponse.json({ received: true, ignored: true });
    }

    const orderId = await updateShippingStatusFromWebhook(
      shiprocketOrderId,
      mappedStatus,
      body.awb
    );

    return NextResponse.json({
      received: true,
      orderId,
      shippingStatus: mappedStatus,
    });
  } catch (error) {
    console.error('[webhooks/shiprocket]', error);
    return NextResponse.json({ error: 'Webhook processing failed.' }, { status: 500 });
  }
}
