export interface ShiprocketAuthResponse {
  token: string;
}

export interface ShiprocketCourierOption {
  courierCompanyId: number;
  courierName: string;
  rate: number;
  estimatedDeliveryDays: string;
  etd: string;
  cod: number;
}

export interface ServiceabilityResult {
  serviceable: boolean;
  pickupPincode: string;
  deliveryPincode: string;
  weightKg: number;
  cheapestRate: number | null;
  estimatedDeliveryDate: string | null;
  couriers: ShiprocketCourierOption[];
}

export interface ShiprocketCreateOrderPayload {
  order_id: string;
  order_date: string;
  pickup_location: string;
  billing_customer_name: string;
  billing_last_name: string;
  billing_address: string;
  billing_address_2: string;
  billing_city: string;
  billing_pincode: string;
  billing_state: string;
  billing_country: string;
  billing_email: string;
  billing_phone: string;
  shipping_is_billing: boolean;
  order_items: Array<{
    name: string;
    sku: string;
    units: number;
    selling_price: number;
  }>;
  payment_method: 'Prepaid' | 'COD';
  sub_total: number;
  length: number;
  breadth: number;
  height: number;
  weight: number;
}

export interface ShiprocketCreateOrderResponse {
  order_id: number;
  shipment_id?: number;
  awb_code?: string;
  status?: string;
}
