import { NextResponse } from 'next/server';

import { isFirebaseAdminConfigured } from '@/lib/firebase/admin';
import {
  getOrderByRazorpayOrderId,
  markOrderFailed,
  markOrderPaid,
} from '@/lib/orders/service';
import { isShiprocketConfigured } from '@/lib/shiprocket/config';
import { fulfillOrderOnShiprocket } from '@/lib/shiprocket/fulfill-order';
import { isRazorpayConfigured } from '@/lib/razorpay/config';
import {
  verifyRazorpaySignature,
  type RazorpayPaymentPayload,
} from '@/lib/razorpay/verify-signature';

export const runtime = 'nodejs';

interface VerifyPaymentBody extends RazorpayPaymentPayload {
  orderId?: string;
}

export async function POST(request: Request) {
  try {
    if (!isRazorpayConfigured() || !isFirebaseAdminConfigured()) {
      return NextResponse.json(
        { error: 'Payment verification is not configured.' },
        { status: 503 }
      );
    }

    const body = (await request.json()) as VerifyPaymentBody;

    if (
      !body.razorpay_order_id ||
      !body.razorpay_payment_id ||
      !body.razorpay_signature
    ) {
      return NextResponse.json(
        { error: 'Missing Razorpay payment fields.' },
        { status: 400 }
      );
    }

    const isValid = verifyRazorpaySignature({
      razorpay_order_id: body.razorpay_order_id,
      razorpay_payment_id: body.razorpay_payment_id,
      razorpay_signature: body.razorpay_signature,
    });

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid payment signature.' },
        { status: 400 }
      );
    }

    const order = await getOrderByRazorpayOrderId(body.razorpay_order_id);

    if (!order) {
      return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
    }

    if (body.orderId && body.orderId !== order.id) {
      return NextResponse.json(
        { error: 'Order ID mismatch.' },
        { status: 400 }
      );
    }

    if (order.paymentStatus === 'paid') {
      return NextResponse.json({
        success: true,
        orderId: order.id,
        shiprocketOrderId: order.shiprocketOrderId ?? null,
        message: 'Payment already verified.',
      });
    }

    if (order.paymentStatus !== 'pending') {
      await markOrderFailed(order.id);
      return NextResponse.json(
        { error: 'Order is not in a payable state.' },
        { status: 409 }
      );
    }

    await markOrderPaid(order.id, body.razorpay_payment_id);

    let shiprocketOrderId: string | null = null;
    let shiprocketAwb: string | null = null;

    if (isShiprocketConfigured()) {
      try {
        const fulfillment = await fulfillOrderOnShiprocket(order.id);
        shiprocketOrderId = fulfillment.shiprocketOrderId;
        shiprocketAwb = fulfillment.shiprocketAwb;
      } catch (shiprocketError) {
        console.error('[checkout/verify-payment] Shiprocket fulfillment failed:', shiprocketError);
      }
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      paymentStatus: 'paid',
      shiprocketOrderId,
      shiprocketAwb,
    });
  } catch (error) {
    console.error('[checkout/verify-payment]', error);
    return NextResponse.json(
      { error: 'Payment verification failed.' },
      { status: 500 }
    );
  }
}
