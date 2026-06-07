import { NextResponse } from 'next/server';

import { validateCartItems } from '@/lib/checkout/validate-cart';
import { isFirebaseAdminConfigured } from '@/lib/firebase/admin';
import { createPendingOrder } from '@/lib/orders/service';
import { isRazorpayConfigured } from '@/lib/razorpay/config';
import { getRazorpay } from '@/lib/razorpay/server';
import type { ProductSize } from '@/lib/firebase/schema';
import type { OrderShippingAddress } from '@/lib/orders/types';

export const runtime = 'nodejs';

interface CreateOrderBody {
  items: Array<{
    productId: string;
    size: ProductSize;
    quantity: number;
  }>;
  userId?: string;
  shipping?: OrderShippingAddress;
}

function validateShipping(
  shipping?: OrderShippingAddress
): { ok: true; data: OrderShippingAddress } | { ok: false; error: string } {
  if (!shipping) {
    return { ok: false, error: 'Shipping address is required.' };
  }

  if (
    !shipping.fullName?.trim() ||
    !shipping.phone?.trim() ||
    !shipping.email?.trim() ||
    !shipping.addressLine1?.trim() ||
    !shipping.city?.trim() ||
    !shipping.state?.trim() ||
    !shipping.pincode?.trim()
  ) {
    return { ok: false, error: 'Complete shipping address is required.' };
  }

  if (!/^[0-9]{10}$/.test(shipping.phone.trim())) {
    return { ok: false, error: 'Phone must be a 10-digit Indian mobile number.' };
  }

  if (!/^[0-9]{6}$/.test(shipping.pincode.trim())) {
    return { ok: false, error: 'Pincode must be 6 digits.' };
  }

  return {
    ok: true,
    data: {
      fullName: shipping.fullName.trim(),
      phone: shipping.phone.trim(),
      email: shipping.email.trim(),
      addressLine1: shipping.addressLine1.trim(),
      addressLine2: shipping.addressLine2?.trim() || null,
      city: shipping.city.trim(),
      state: shipping.state.trim(),
      pincode: shipping.pincode.trim(),
    },
  };
}

export async function POST(request: Request) {
  try {
    if (!isRazorpayConfigured()) {
      return NextResponse.json(
        { error: 'Razorpay is not configured on the server.' },
        { status: 503 }
      );
    }

    if (!isFirebaseAdminConfigured()) {
      return NextResponse.json(
        { error: 'Firebase Admin is not configured on the server.' },
        { status: 503 }
      );
    }

    const body = (await request.json()) as CreateOrderBody;
    const validation = validateCartItems(body.items ?? []);

    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const shippingValidation = validateShipping(body.shipping);
    if (!shippingValidation.ok) {
      return NextResponse.json({ error: shippingValidation.error }, { status: 400 });
    }

    const { items, totalAmount } = validation.data;
    const amountInPaise = Math.round(totalAmount * 100);

    if (amountInPaise < 100) {
      return NextResponse.json(
        { error: 'Order amount must be at least ₹1.' },
        { status: 400 }
      );
    }

    const razorpay = getRazorpay();
    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: `mc_${Date.now()}`,
      notes: {
        source: 'mishkascorner',
      },
    });

    const { orderId } = await createPendingOrder({
      userId: body.userId ?? 'guest',
      items,
      totalAmount,
      razorpayOrderId: razorpayOrder.id,
      shipping: shippingValidation.data,
    });

    return NextResponse.json({
      orderId,
      razorpayOrderId: razorpayOrder.id,
      amount: amountInPaise,
      currency: 'INR',
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('[checkout/create-order]', error);
    return NextResponse.json(
      { error: 'Failed to create checkout order.' },
      { status: 500 }
    );
  }
}
