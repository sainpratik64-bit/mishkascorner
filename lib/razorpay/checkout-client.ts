declare global {
  interface Window {
    Razorpay: new (options: RazorpayCheckoutOptions) => RazorpayInstance;
  }
}

interface RazorpayCheckoutOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  handler: (response: RazorpaySuccessResponse) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpaySuccessResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, callback: (response: { error: RazorpayError }) => void) => void;
}

interface RazorpayError {
  description: string;
}

let scriptLoaded = false;

export function loadRazorpayScript(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Razorpay can only load in the browser.'));
  }

  if (scriptLoaded && window.Razorpay) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const existing = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );
    if (existing) {
      scriptLoaded = true;
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      scriptLoaded = true;
      resolve();
    };
    script.onerror = () => reject(new Error('Failed to load Razorpay checkout.'));
    document.body.appendChild(script);
  });
}

export interface OpenRazorpayCheckoutInput {
  keyId: string;
  amount: number;
  currency: string;
  orderId: string;
  razorpayOrderId: string;
  onSuccess: (response: RazorpaySuccessResponse) => Promise<void>;
  onDismiss?: () => void;
}

export async function openRazorpayCheckout(
  input: OpenRazorpayCheckoutInput
): Promise<void> {
  await loadRazorpayScript();

  return new Promise((resolve, reject) => {
    const options: RazorpayCheckoutOptions = {
      key: input.keyId,
      amount: input.amount,
      currency: input.currency,
      name: 'Mishkas Corner',
      description: 'Streetwear Order',
      order_id: input.razorpayOrderId,
      theme: { color: '#000000' },
      handler: async (response) => {
        try {
          await input.onSuccess(response);
          resolve();
        } catch (error) {
          reject(error);
        }
      },
      modal: {
        ondismiss: () => {
          input.onDismiss?.();
          resolve();
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', (response) => {
      reject(new Error(response.error.description || 'Payment failed.'));
    });
    rzp.open();
  });
}
