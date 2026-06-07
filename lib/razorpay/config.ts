export function getRazorpayKeyId(): string | undefined {
  return process.env.RAZORPAY_KEY_ID;
}

export function getRazorpayKeySecret(): string | undefined {
  return process.env.RAZORPAY_KEY_SECRET;
}

export function getPublicRazorpayKeyId(): string | undefined {
  return process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? process.env.RAZORPAY_KEY_ID;
}

export function isRazorpayConfigured(): boolean {
  return Boolean(getRazorpayKeyId() && getRazorpayKeySecret());
}
