import Razorpay from 'razorpay';

import { getRazorpayKeyId, getRazorpayKeySecret } from './config';

let razorpayInstance: Razorpay | null = null;

export function getRazorpay(): Razorpay {
  const keyId = getRazorpayKeyId();
  const keySecret = getRazorpayKeySecret();

  if (!keyId || !keySecret) {
    throw new Error('Razorpay credentials are not configured.');
  }

  if (!razorpayInstance) {
    razorpayInstance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  }

  return razorpayInstance;
}
