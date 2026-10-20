'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  CheckCircle2,
  Clock,
  Phone,
  MapPin,
  MessageCircle,
  FileText,
  ShoppingBag,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { Order, StoreSettings } from '@/lib/types';

interface OrderConfirmationClientProps {
  order: Order | null;
  settings: StoreSettings;
  orderRef: string;
}

export default function OrderConfirmationClient({
  order: initialOrder,
  settings,
  orderRef,
}: OrderConfirmationClientProps) {
  const [order, setOrder] = React.useState<Order | null>(initialOrder);

  React.useEffect(() => {
    if (!order && orderRef && typeof window !== 'undefined') {
      try {
        const cached = sessionStorage.getItem(`order_${orderRef}`);
        if (cached) {
          setOrder(JSON.parse(cached));
        }
      } catch (e) {
        console.warn('Failed to restore order from sessionStorage:', e);
      }
    }
  }, [order, orderRef]);

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-brand-600">
          <FileText className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-stone-900">Order Not Found</h1>
        <p className="text-sm text-stone-500">
          We could not find an order matching reference: <strong>{orderRef}</strong>
        </p>
        <Link
          href="/shop"
          className="inline-block bg-brand-700 text-white font-bold px-6 py-2.5 rounded-xl"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const isDelivery = order.fulfilmentType === 'DELIVERY';

  // WhatsApp quick notification message
  const waText = encodeURIComponent(
    `Hello Rajshree Sweets & Snacks,\nI placed Order *${order.orderRef}* for ₹${order.totalAmount}.\nName: ${order.customerName}\nPhone: ${order.customerPhone}\nFulfilment: ${order.fulfilmentType}\n${
      order.paymentUtr ? `UPI UTR: ${order.paymentUtr}\n` : ''
    }Please confirm once verified!`
  );
  const waUrl = `https://wa.me/918050832752?text=${waText}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Success Banner */}
      <div className="bg-white rounded-3xl border border-amber-100 shadow-md p-6 sm:p-8 text-center space-y-4">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-bold text-brand-700 uppercase tracking-wider">
            Order Submitted Successfully
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif mt-1">
            Thank you, {order.customerName}!
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-lg mx-auto">
            Your order has been recorded. Below is your unique order reference.
          </p>
        </div>

        {/* Order Reference Card */}
        <div className="inline-block bg-amber-50 border-2 border-brand-500 rounded-2xl p-4 px-8 text-center">
          <div className="text-xs text-stone-500 font-semibold uppercase tracking-wider">
            Your Order Reference
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-brand-950 mt-1 select-all">
            {order.orderRef}
          </div>
        </div>

        {/* Status Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Order Status: {order.status}</span>
          </span>

          <span
            className={`text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
              order.paymentStatus === 'VERIFIED'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>
              Payment:{' '}
              {order.paymentStatus === 'VERIFIED'
                ? 'Verified by Shop'
                : 'Pending Manual Verification'}
            </span>
          </span>
        </div>
      </div>

      {/* WhatsApp Quick Update Action */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-bold text-emerald-950 text-base flex items-center gap-2 justify-center sm:justify-start">
            <MessageCircle className="w-5 h-5 text-emerald-600" />
            <span>Notify Shop on WhatsApp</span>
          </h3>
          <p className="text-xs text-emerald-800">
            Send your order reference & payment screenshot directly to our store WhatsApp for faster verification and dispatch.
          </p>
        </div>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl text-xs sm:text-sm shadow-md transition whitespace-nowrap flex items-center gap-2 active:scale-95"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat with Store Staff</span>
        </a>
      </div>

      {/* Order Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fulfilment Details */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-xs space-y-3">
          <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wider">
            Fulfilment: {isDelivery ? 'Local Delivery' : 'Store Pickup'}
          </h3>

          <div className="text-xs text-stone-600 space-y-2">
            <div>
              <span className="text-stone-400 block font-medium">Customer:</span>
              <strong className="text-stone-800 text-sm">{order.customerName}</strong>
            </div>

            <div>
              <span className="text-stone-400 block font-medium">Contact Phone:</span>
              <span className="text-stone-800 font-medium">+91 {order.customerPhone}</span>
            </div>

            {order.customerEmail && (
              <div>
                <span className="text-stone-400 block font-medium">Email:</span>
                <span className="text-stone-800">{order.customerEmail}</span>
              </div>
            )}

            {isDelivery ? (
              <div>
                <span className="text-stone-400 block font-medium">Delivery Address:</span>
                <p className="text-stone-800 leading-relaxed font-medium">
                  {order.address}
                  {order.landmark && ` (Landmark: ${order.landmark})`}
                  {order.pincode && ` - ${order.pincode}`}
                </p>
              </div>
            ) : (
              <div>
                <span className="text-stone-400 block font-medium">Pickup Store:</span>
                <p className="text-stone-800 leading-relaxed font-medium">
                  {settings.address}
                </p>
                <p className="text-stone-500 mt-0.5">Hours: {settings.operatingHours}</p>
              </div>
            )}

            {order.notes && (
              <div>
                <span className="text-stone-400 block font-medium">Notes:</span>
                <p className="text-stone-700 italic">"{order.notes}"</p>
              </div>
            )}
          </div>
        </div>

        {/* Order Items Breakdown */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-xs space-y-4">
          <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wider">
            Items Ordered
          </h3>

          <div className="space-y-2.5 text-xs max-h-56 overflow-y-auto pr-1">
            {order.items?.map((it, idx) => (
              <div key={idx} className="flex justify-between items-start gap-2 border-b border-stone-100 pb-2">
                <div>
                  <div className="font-bold text-stone-800">{it.productName}</div>
                  <div className="text-stone-500">
                    {it.variantLabel} × {it.quantity}
                  </div>
                </div>
                <div className="font-bold text-stone-900">₹{it.itemTotal}</div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-stone-200 space-y-1.5 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal</span>
              <span className="font-medium">₹{order.subtotal}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Delivery Fee</span>
              <span className="font-medium">
                {order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}
              </span>
            </div>
            <div className="flex justify-between text-sm font-black text-stone-900 pt-1 border-t border-stone-100">
              <span>Total Amount</span>
              <span className="text-brand-900 text-lg">₹{order.totalAmount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Store Support Card */}
      <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 text-center space-y-3">
        <h4 className="font-bold text-sm text-stone-800">Need help with your order?</h4>
        <p className="text-xs text-stone-500 max-w-md mx-auto">
          Contact our store staff directly. Please quote your reference <strong>{order.orderRef}</strong>.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold">
          <a
            href="tel:+918050832752"
            className="flex items-center gap-1 text-brand-700 hover:underline"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>+91 8050832752</span>
          </a>
          <span className="text-stone-300">•</span>
          <a
            href="mailto:sribhog2026@gmail.com"
            className="text-brand-700 hover:underline"
          >
            sribhog2026@gmail.com
          </a>
        </div>
      </div>

      <div className="text-center pt-2">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-brand-700 font-bold hover:text-brand-800 text-sm"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping at Rajshree Sweets</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
