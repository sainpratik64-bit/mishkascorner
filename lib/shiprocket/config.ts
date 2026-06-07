const SHIPROCKET_BASE_URL = 'https://apiv2.shiprocket.in/v1/external';

export function getShiprocketBaseUrl(): string {
  return SHIPROCKET_BASE_URL;
}

export function getShiprocketEmail(): string | undefined {
  return process.env.SHIPROCKET_EMAIL;
}

export function getShiprocketPassword(): string | undefined {
  return process.env.SHIPROCKET_PASSWORD;
}

export function getShiprocketPickupPincode(): string {
  return process.env.SHIPROCKET_PICKUP_PINCODE ?? '110001';
}

export function getShiprocketPickupLocation(): string {
  return process.env.SHIPROCKET_PICKUP_LOCATION ?? 'Primary';
}

export function isShiprocketConfigured(): boolean {
  return Boolean(getShiprocketEmail() && getShiprocketPassword());
}
