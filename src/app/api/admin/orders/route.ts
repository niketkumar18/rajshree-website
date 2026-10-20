import { NextRequest, NextResponse } from 'next/server';
import { getAllOrders, updateOrderStatus, getOrderById } from '@/lib/db';
import { checkRequestAdminAuth } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  if (!checkRequestAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
  }

  const orders = getAllOrders(200);
  return NextResponse.json({ orders });
}

export async function PUT(req: NextRequest) {
  if (!checkRequestAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { orderId, status, paymentStatus, paymentUtr } = body;

    if (!orderId || !status) {
      return NextResponse.json({ error: 'Missing orderId or status' }, { status: 400 });
    }

    const updated = updateOrderStatus(orderId, status, paymentStatus, paymentUtr);
    if (!updated) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, order: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
