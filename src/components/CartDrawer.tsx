'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, subtotal } = useCart();
  const MIN_ORDER = 500;
  const FREE_DELIVERY_THRESHOLD = 1000;

  if (!isCartOpen) return null;

  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const isMinOrderMet = subtotal >= MIN_ORDER;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-amber-100 flex items-center justify-between bg-amber-50/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-700" />
              <h2 className="font-bold text-lg text-stone-900">Your Shopping Cart</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Bar */}
          <div className="bg-amber-100/60 px-4 py-2 text-xs text-amber-900 flex items-center justify-between">
            {remainingForFreeDelivery > 0 ? (
              <span>
                Add <strong className="text-brand-800">₹{remainingForFreeDelivery}</strong> more for <strong>Free Local Delivery</strong>!
              </span>
            ) : (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Congratulations! You unlocked Free Local Delivery.
              </span>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-brand-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-stone-600 font-medium">Your cart is currently empty</p>
                <p className="text-xs text-stone-400 max-w-xs mx-auto">
                  Explore our pure ghee sweets, crispy namkeens, and freshly made hot snacks.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 inline-block bg-brand-700 hover:bg-brand-800 text-white text-xs font-semibold px-4 py-2 rounded-lg"
                >
                  Browse Catalogue
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.productId}-${item.variantLabel}`}
                  className="flex gap-3 bg-stone-50/80 p-3 rounded-xl border border-stone-200/60"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-amber-100/50 flex-shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-brand-800 font-bold">
                        RS
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-semibold text-sm text-stone-900 truncate">{item.name}</h4>
                      <button
                        onClick={() => removeFromCart(item.productId, item.variantLabel)}
                        className="text-stone-400 hover:text-red-600 p-0.5"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-medium text-brand-700 bg-amber-100 px-1.5 py-0.2 rounded">
                        {item.variantLabel}
                      </span>
                      <span className="text-xs text-stone-500">₹{item.unitPrice} each</span>
                    </div>

                    <div className="flex items-center justify-between mt-2.5">
                      <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden shadow-xs">
                        <button
                          onClick={() => updateQuantity(item.productId, item.variantLabel, item.quantity - 1)}
                          className="px-2 py-1 text-stone-600 hover:bg-stone-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-stone-800">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.variantLabel, item.quantity + 1)}
                          className="px-2 py-1 text-stone-600 hover:bg-stone-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-bold text-sm text-stone-900">
                        ₹{item.totalPrice}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-amber-100 bg-white space-y-3">
              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-stone-900">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-xs text-stone-500">
                  <span>Fulfilment & Delivery</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              {!isMinOrderMet && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 text-xs text-amber-800">
                  Minimum delivery order value is <strong>₹{MIN_ORDER}</strong>. Add ₹{MIN_ORDER - subtotal} more to proceed with delivery (Store pickup is always available).
                </div>
              )}

              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full bg-brand-700 hover:bg-brand-800 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <p className="text-[11px] text-center text-stone-400">
                Direct UPI QR Payment • 0% Transaction Fees • Freshly Prepared Daily
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
