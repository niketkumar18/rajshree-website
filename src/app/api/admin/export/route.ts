import { NextRequest, NextResponse } from 'next/server';
import { getAllOrders, getProducts, getSettings } from '@/lib/db';
import { checkRequestAdminAuth } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  if (!checkRequestAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') || 'orders';

  if (type === 'products') {
    const products = getProducts();
    return new NextResponse(JSON.stringify(products, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="rajshree-products-export.json"',
      },
    });
  }

  // Default: Orders export
  const orders = getAllOrders(1000);
  return new NextResponse(JSON.stringify(orders, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="rajshree-orders-export.json"',
    },
  });
}
