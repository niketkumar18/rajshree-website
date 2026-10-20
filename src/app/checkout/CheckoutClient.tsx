'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Truck,
  Store,
  ShieldCheck,
  QrCode,
  ArrowRight,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle2,
  Phone,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { StoreSettings } from '@/lib/types';

interface CheckoutClientProps {
  settings: StoreSettings;
}

export default function CheckoutClient({ settings }: CheckoutClientProps) {
  const router = useRouter();
  const { cart, subtotal, clearCart } = useCart();

  const [fulfilmentType, setFulfilmentType] = useState<'DELIVERY' | 'PICKUP'>('DELIVERY');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('560105');
  const [notes, setNotes] = useState('');
  const [paymentUtr, setPaymentUtr] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Calculations
  const isDelivery = fulfilmentType === 'DELIVERY';
  const deliveryFee = isDelivery
    ? subtotal >= settings.freeDeliveryAbove
      ? 0
      : settings.deliveryFee
    : 0;

  const totalAmount = subtotal + deliveryFee;
  const isMinOrderMet = !isDelivery || subtotal >= settings.minOrderValue;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (cart.length === 0) {
      setErrorMessage('Your cart is empty. Please add items before checking out.');
      return;
    }

    if (!customerName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!customerPhone.trim() || customerPhone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    if (isDelivery) {
      if (!isMinOrderMet) {
        setErrorMessage(
          `Minimum order for local delivery is ₹${settings.minOrderValue}. Your current subtotal is ₹${subtotal}. Please add more items or choose Store Pickup.`
        );
        return;
      }
      if (!address.trim() || address.trim().length < 5) {
        setErrorMessage('Please enter your complete delivery address (street, building, floor).');
        return;
      }
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerPhone,
          customerEmail,
          fulfilmentType,
          address,
          landmark,
          pincode,
          notes,
          paymentUtr,
          items: cart,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to place order');
      }

      // Cache created order in sessionStorage for resilient confirmation page rendering
      if (typeof window !== 'undefined' && data?.order?.orderRef) {
        try {
          sessionStorage.setItem(`order_${data.order.orderRef}`, JSON.stringify(data.order));
        } catch (e) {
          console.warn('Could not cache order in sessionStorage:', e);
        }
      }

      // Order created successfully
      clearCart();
      router.push(`/order-confirmation?ref=${data.order.orderRef}`);
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while placing your order. Please try again.');
      setSubmitting(false);
    }
  };

  const upiDeepLink = `upi://pay?pa=${encodeURIComponent(
    settings.upiId
  )}&pn=${encodeURIComponent(settings.upiMerchantName)}&am=${totalAmount}&cu=INR`;

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-brand-600">
          <Store className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-stone-900">Your Cart is Empty</h1>
        <p className="text-sm text-stone-500">
          Add some delicious sweets, crispy namkeen, or fresh snacks from our catalogue to proceed.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-brand-700 hover:bg-brand-800 text-white font-bold px-6 py-3 rounded-xl transition"
        >
          Browse Catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-700">Checkout</span>
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">
          Review & Complete Your Order
        </h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Order directly from Rajshree Sweets & Snacks shop with verified UPI payment.
        </p>
      </div>

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-start gap-2">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Fulfilment & Customer Information */}
        <div className="lg:col-span-7 space-y-6">
          {/* Fulfilment Selector */}
          <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
              <span>1. Choose Fulfilment Method</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFulfilmentType('DELIVERY')}
                className={`p-4 rounded-xl border text-left flex items-start gap-3 transition ${
                  isDelivery
                    ? 'border-brand-600 bg-amber-50/70 ring-2 ring-brand-500/20'
                    : 'border-stone-200 hover:bg-stone-50'
                }`}
              >
                <Truck className={`w-5 h-5 shrink-0 mt-0.5 ${isDelivery ? 'text-brand-700' : 'text-stone-400'}`} />
                <div>
                  <div className="font-bold text-sm text-stone-900">Local Delivery</div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    Within 8 km of Jigani store
                  </div>
                  <div className="text-[11px] font-semibold text-brand-800 mt-1">
                    Fee: ₹{settings.deliveryFee} (Free above ₹{settings.freeDeliveryAbove})
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFulfilmentType('PICKUP')}
                className={`p-4 rounded-xl border text-left flex items-start gap-3 transition ${
                  !isDelivery
                    ? 'border-brand-600 bg-amber-50/70 ring-2 ring-brand-500/20'
                    : 'border-stone-200 hover:bg-stone-50'
                }`}
              >
                <Store className={`w-5 h-5 shrink-0 mt-0.5 ${!isDelivery ? 'text-brand-700' : 'text-stone-400'}`} />
                <div>
                  <div className="font-bold text-sm text-stone-900">Store Pickup</div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    Sri Matha Complex, Jigani
                  </div>
                  <div className="text-[11px] font-semibold text-emerald-700 mt-1">
                    Free • Ready in 30-45 mins
                  </div>
                </div>
              </button>
            </div>

            {/* If Pickup is chosen, show shop address details */}
            {!isDelivery && (
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1">
                <div className="font-bold text-stone-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-600" />
                  <span>Pickup Location:</span>
                </div>
                <p className="pl-5 leading-relaxed">{settings.address}</p>
                <p className="pl-5 text-stone-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Shop Hours: {settings.operatingHours}</span>
                </p>
              </div>
            )}
          </div>

          {/* Customer Details */}
          <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              2. Customer Contact
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Mobile Number (10 digits) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-500">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="9876543210"
                    className="w-full pl-11 pr-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Email Address (Optional, for order receipt)
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            {/* Address fields for Local Delivery */}
            {isDelivery && (
              <div className="pt-2 border-t border-stone-100 space-y-4">
                <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  Delivery Address in Jigani / Vicinity
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    House/Flat No, Building, Street Name <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required={isDelivery}
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Flat 302, Sri Krishna Residency, APC Circle Road, Jigani"
                    className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Nearby Landmark
                    </label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="Near Vishal Mega Mart, etc."
                      className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required={isDelivery}
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="560105"
                      className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Special Instructions or Packaging Notes
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Separate gift packaging, extra green chutney, ring bell twice"
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* UPI Payment Instructions with Exact Verified QR Image */}
          <div className="bg-white p-5 rounded-2xl border-2 border-brand-500 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                <QrCode className="w-4 h-4 text-brand-600" />
                <span>3. Scan & Pay via Official UPI QR</span>
              </h2>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                0% Gateway Fee
              </span>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Scan our official <strong>HDFC SmartHub Vyapar QR</strong> using Google Pay, PhonePe, Paytm, BHIM, or any UPI banking app.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 bg-amber-50/50 p-4 rounded-xl border border-amber-200/60">
              {/* Exact Untouched QR Image */}
              <div className="relative w-44 h-64 sm:w-48 sm:h-72 rounded-xl overflow-hidden bg-white shadow-md border border-stone-200 shrink-0">
                <Image
                  src="/images/hdfc-upi-qr.jpg"
                  alt="Official Rajshree Sweets and Snacks HDFC UPI QR"
                  fill
                  className="object-contain"
                  sizes="200px"
                  priority
                />
              </div>

              {/* QR Details & Direct App Button */}
              <div className="space-y-3 text-xs flex-1 w-full text-center sm:text-left">
                <div>
                  <span className="text-stone-400 block font-medium">Merchant Name:</span>
                  <strong className="text-stone-900 text-sm">{settings.upiMerchantName}</strong>
                </div>

                <div>
                  <span className="text-stone-400 block font-medium">Verified UPI ID (VPA):</span>
                  <code className="bg-white px-2 py-1 rounded border border-stone-200 font-mono text-brand-900 font-bold text-xs select-all">
                    {settings.upiId}
                  </code>
                </div>

                <div className="bg-white p-3 rounded-lg border border-amber-200 inline-block w-full">
                  <span className="text-stone-500 block text-[11px]">Exact Amount to Pay:</span>
                  <span className="text-2xl font-black text-stone-900">₹{totalAmount}</span>
                </div>

                {/* Mobile Deep Link */}
                <a
                  href={upiDeepLink}
                  className="inline-flex sm:hidden items-center justify-center gap-2 w-full bg-brand-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-xs"
                >
                  <span>Open UPI App on Phone</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <p className="text-[11px] text-stone-400">
                  Accepted on all UPI apps: GPay, PhonePe, Paytm, BHIM, Mobikwik, WhatsApp Pay.
                </p>
              </div>
            </div>

            {/* Optional UTR input */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                UPI Reference / UTR Number (Optional, 12 digits)
              </label>
              <input
                type="text"
                maxLength={16}
                value={paymentUtr}
                onChange={(e) => setPaymentUtr(e.target.value)}
                placeholder="e.g. 428901234567 (from your UPI app payment receipt)"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-brand-500"
              />
              <p className="text-[11px] text-stone-500 mt-1">
                You can enter this now or provide it to staff later. Your order is submitted as <strong>Pending Payment</strong>, and our staff will verify the incoming amount with our shop HDFC terminal.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-amber-100 shadow-md space-y-5 sticky top-20">
          <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider pb-3 border-b border-stone-100">
            Order Summary ({cart.length} items)
          </h2>

          {/* Items breakdown */}
          <div className="max-h-60 overflow-y-auto space-y-3 pr-1 text-xs">
            {cart.map((item) => (
              <div key={`${item.productId}-${item.variantLabel}`} className="flex justify-between items-start gap-2">
                <div>
                  <div className="font-semibold text-stone-800">{item.name}</div>
                  <div className="text-stone-500">
                    {item.variantLabel} × {item.quantity}
                  </div>
                </div>
                <div className="font-bold text-stone-900 shrink-0">
                  ₹{item.totalPrice}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing calculations */}
          <div className="pt-3 border-t border-stone-100 space-y-2 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Items Subtotal</span>
              <span className="font-semibold text-stone-800">₹{subtotal}</span>
            </div>

            <div className="flex justify-between text-stone-600">
              <span>Fulfilment ({isDelivery ? 'Local Delivery' : 'Store Pickup'})</span>
              <span className="font-semibold text-stone-800">
                {deliveryFee === 0 ? (
                  <span className="text-emerald-700 font-bold">FREE</span>
                ) : (
                  `₹${deliveryFee}`
                )}
              </span>
            </div>

            <div className="pt-2 border-t border-stone-200 flex justify-between text-base">
              <span className="font-bold text-stone-900">Total Payable</span>
              <span className="font-black text-brand-900 text-xl">₹{totalAmount}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting || (isDelivery && !isMinOrderMet)}
            className={`w-full py-4 px-6 rounded-xl font-bold text-base shadow-lg transition active:scale-98 flex items-center justify-center gap-2 ${
              submitting || (isDelivery && !isMinOrderMet)
                ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-brand-600 to-orange-600 hover:from-brand-700 hover:to-orange-700 text-white shadow-orange-500/25'
            }`}
          >
            {submitting ? (
              <span>Placing Order...</span>
            ) : (
              <>
                <span>Submit Order (₹{totalAmount})</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Trust points */}
          <div className="pt-2 border-t border-stone-100 space-y-1.5 text-[11px] text-stone-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct shop fulfillment: Freshly prepared & packed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-brand-600" />
              <span>Staff contact: +91 8050832752</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
