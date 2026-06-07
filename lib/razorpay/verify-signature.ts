import { createHmac, timingSafeEqual } from 'crypto';

import { getRazorpayKeySecret } from './config';

export interface RazorpayPaymentPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export function verifyRazorpaySignature(
  payload: RazorpayPaymentPayload
): boolean {
  const secret = getRazorpayKeySecret();
  if (!secret) return false;

  const body = `${payload.razorpay_order_id}|${payload.razorpay_payment_id}`;
  const expected = createHmac('sha256', secret).update(body).digest('hex');

  try {
    return timingSafeEqual(
      Buffer.from(expected, 'utf8'),
      Buffer.from(payload.razorpay_signature, 'utf8')
    );
  } catch {
    return false;
  }
}
