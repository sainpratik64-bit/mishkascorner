import { checkServiceability } from './client';
import type { ServiceabilityResult, ShiprocketCourierOption } from './types';

interface RawCourierCompany {
  courier_company_id?: number;
  courier_name?: string;
  rate?: number;
  estimated_delivery_days?: string;
  etd?: string;
  cod?: number;
}

function parseCouriers(data: Record<string, unknown>): ShiprocketCourierOption[] {
  const companies =
    (data.data as { available_courier_companies?: RawCourierCompany[] } | undefined)
      ?.available_courier_companies ?? [];

  return companies
    .filter((c) => typeof c.rate === 'number')
    .map((c) => ({
      courierCompanyId: c.courier_company_id ?? 0,
      courierName: c.courier_name ?? 'Unknown',
      rate: c.rate ?? 0,
      estimatedDeliveryDays: c.estimated_delivery_days ?? '',
      etd: c.etd ?? '',
      cod: c.cod ?? 0,
    }))
    .sort((a, b) => a.rate - b.rate);
}

export async function getServiceabilityForPincode(params: {
  pickupPincode: string;
  deliveryPincode: string;
  weightKg?: number;
}): Promise<ServiceabilityResult> {
  const weightKg = params.weightKg ?? 0.5;

  const raw = await checkServiceability({
    pickupPincode: params.pickupPincode,
    deliveryPincode: params.deliveryPincode,
    weightKg,
    cod: false,
  });

  const couriers = parseCouriers(raw);
  const cheapest = couriers[0] ?? null;

  return {
    serviceable: couriers.length > 0,
    pickupPincode: params.pickupPincode,
    deliveryPincode: params.deliveryPincode,
    weightKg,
    cheapestRate: cheapest?.rate ?? null,
    estimatedDeliveryDate: cheapest?.etd ?? null,
    couriers,
  };
}
