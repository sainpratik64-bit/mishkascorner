import { NextResponse } from 'next/server';

import { isShiprocketConfigured } from '@/lib/shiprocket/config';
import { getServiceabilityForPincode } from '@/lib/shiprocket/serviceability';

export const runtime = 'nodejs';

interface ValidatePincodeBody {
  pincode: string;
  weightKg?: number;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ValidatePincodeBody;
    const pincode = body.pincode?.trim();

    if (!pincode || !/^[0-9]{6}$/.test(pincode)) {
      return NextResponse.json(
        { error: 'A valid 6-digit pincode is required.' },
        { status: 400 }
      );
    }

    if (!isShiprocketConfigured()) {
      return NextResponse.json({
        serviceable: true,
        pincode,
        estimatedDeliveryDate: null,
        shippingCost: null,
        devMode: true,
        couriers: [],
      });
    }

    const result = await getServiceabilityForPincode({
      pickupPincode: process.env.SHIPROCKET_PICKUP_PINCODE ?? '110001',
      deliveryPincode: pincode,
      weightKg: body.weightKg,
    });

    return NextResponse.json({
      serviceable: result.serviceable,
      pincode: result.deliveryPincode,
      estimatedDeliveryDate: result.estimatedDeliveryDate,
      shippingCost: result.cheapestRate,
      couriers: result.couriers.map((c) => ({
        name: c.courierName,
        rate: c.rate,
        etd: c.etd,
        estimatedDays: c.estimatedDeliveryDays,
      })),
    });
  } catch (error) {
    console.error('[shipping/validate-pincode]', error);
    return NextResponse.json(
      { error: 'Could not validate pincode serviceability.' },
      { status: 500 }
    );
  }
}
