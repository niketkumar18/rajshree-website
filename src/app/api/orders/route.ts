import { NextRequest, NextResponse } from 'next/server';
import { getProductById, getSettings, createOrder } from '@/lib/db';
import { sendOrderNotificationEmail } from '@/lib/email';
import { FulfilmentType } from '@/lib/types';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName,
      customerPhone,
      customerEmail,
      fulfilmentType,
      address,
      landmark,
      pincode,
      notes,
      items,
      paymentUtr,
    } = body;

    // Validate required fields
    if (!customerName || !customerPhone || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required customer details or empty cart' },
        { status: 400 }
      );
    }

    if (!['DELIVERY', 'PICKUP'].includes(fulfilmentType)) {
      return NextResponse.json(
        { error: 'Invalid fulfilment type' },
        { status: 400 }
      );
    }

    const settings = getSettings();

    // Server-side price calculation and item validation
    let serverSubtotal = 0;
    const validatedItems = [];

    for (const item of items) {
      const product = getProductById(item.productId);
      if (!product) {
        return NextResponse.json(
          { error: `Product not found: ${item.name || item.productId}` },
          { status: 400 }
        );
      }

      if (!product.inStock) {
        return NextResponse.json(
          { error: `Item "${product.name}" is currently out of stock` },
          { status: 400 }
        );
      }

      // Calculate unit price from database product price and variant factor
      const variantFactor = Number(item.variantFactor) || 1.0;
      const unitPrice = Math.round(product.price * variantFactor);
      const qty = Math.max(1, Math.floor(Number(item.quantity) || 1));
      const itemTotal = unitPrice * qty;

      serverSubtotal += itemTotal;
      validatedItems.push({
        productId: product.id,
        productName: product.name,
        variantLabel: item.variantLabel || `${qty}`,
        unitPrice,
        quantity: qty,
        itemTotal,
      });
    }

    // Delivery & Minimum Order Validation
    let deliveryFee = 0;
    if (fulfilmentType === 'DELIVERY') {
      if (serverSubtotal < settings.minOrderValue) {
        return NextResponse.json(
          {
            error: `Minimum order value for local delivery is ₹${settings.minOrderValue}. Your subtotal is ₹${serverSubtotal}. You may choose Store Pickup or add more items.`,
          },
          { status: 400 }
        );
      }

      // Check free delivery threshold
      if (serverSubtotal < settings.freeDeliveryAbove) {
        deliveryFee = settings.deliveryFee;
      } else {
        deliveryFee = 0;
      }

      if (!address || address.trim().length < 5) {
        return NextResponse.json(
          { error: 'Please provide a complete delivery address.' },
          { status: 400 }
        );
      }
    }

    const totalAmount = serverSubtotal + deliveryFee;

    // Create order with initial status Pending Payment
    const newOrder = createOrder(
      {
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail ? customerEmail.trim() : '',
        fulfilmentType: fulfilmentType as FulfilmentType,
        address: address ? address.trim() : '',
        landmark: landmark ? landmark.trim() : '',
        pincode: pincode ? pincode.trim() : '',
        notes: notes ? notes.trim() : '',
        subtotal: serverSubtotal,
        deliveryFee,
        totalAmount,
        status: 'Pending Payment',
        paymentStatus: 'PENDING',
        paymentUtr: paymentUtr ? paymentUtr.trim() : '',
      },
      validatedItems
    );

    // Send order notification email to sribhog2026@gmail.com
    let emailStatus = null;
    try {
      emailStatus = await sendOrderNotificationEmail(newOrder, validatedItems);
      console.log('Order notification email dispatch result:', emailStatus);
    } catch (emailErr: any) {
      console.error('Email dispatch error (non-blocking):', emailErr?.message || emailErr);
    }

    return NextResponse.json({
      success: true,
      order: newOrder,
      emailStatus,
    });
  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error while creating order' },
      { status: 500 }
    );
  }
}
