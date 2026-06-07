import {
  getShiprocketBaseUrl,
  getShiprocketEmail,
  getShiprocketPassword,
  isShiprocketConfigured,
} from './config';
import type {
  ShiprocketAuthResponse,
  ShiprocketCreateOrderPayload,
  ShiprocketCreateOrderResponse,
} from './types';

let cachedToken: string | null = null;

async function authenticate(): Promise<string> {
  if (!isShiprocketConfigured()) {
    throw new Error('Shiprocket credentials are not configured.');
  }

  const response = await fetch(`${getShiprocketBaseUrl()}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: getShiprocketEmail(),
      password: getShiprocketPassword(),
    }),
  });

  if (!response.ok) {
    throw new Error('Shiprocket authentication failed.');
  }

  const data = (await response.json()) as ShiprocketAuthResponse;
  cachedToken = data.token;
  return data.token;
}

async function getToken(): Promise<string> {
  if (cachedToken) return cachedToken;
  return authenticate();
}

async function shiprocketFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const token = await getToken();
  const url = `${getShiprocketBaseUrl()}${path}`;

  const response = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...init?.headers,
    },
  });

  if (response.status === 401) {
    cachedToken = null;
    const freshToken = await authenticate();
    const retry = await fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${freshToken}`,
        ...init?.headers,
      },
    });

    if (!retry.ok) {
      const err = await retry.text();
      throw new Error(`Shiprocket API error: ${err}`);
    }

    return retry.json() as Promise<T>;
  }

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Shiprocket API error: ${err}`);
  }

  return response.json() as Promise<T>;
}

export async function checkServiceability(params: {
  pickupPincode: string;
  deliveryPincode: string;
  weightKg: number;
  cod?: boolean;
}) {
  const query = new URLSearchParams({
    pickup_postcode: params.pickupPincode,
    delivery_postcode: params.deliveryPincode,
    cod: params.cod ? '1' : '0',
    weight: String(params.weightKg),
  });

  return shiprocketFetch<Record<string, unknown>>(
    `/courier/serviceability/?${query.toString()}`
  );
}

export async function createShiprocketOrder(
  payload: ShiprocketCreateOrderPayload
) {
  return shiprocketFetch<ShiprocketCreateOrderResponse>(
    '/orders/create/adhoc',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    }
  );
}
