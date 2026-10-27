'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Phone, MapPin, Clock, Menu, X, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { itemCount, subtotal, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-orange-200 shadow-sm">
      {/* Top Auspicious Announcement Bar with Sacred Inscription */}
      <div className="bg-gradient-to-r from-orange-800 via-brand-600 to-amber-600 text-white text-xs py-1.5 px-3 sm:px-4 sm:pl-56">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Sacred Inscription & Location */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Lord Ram Badge: Reverently embedded in top bar without blocking any buttons */}
            <div className="sm:hidden flex items-center gap-1.5 bg-orange-950/40 px-2 py-0.5 rounded-full border border-amber-300/40 shadow-xs">
              <div className="relative w-5 h-5 rounded-full overflow-hidden border border-amber-300 shrink-0">
                <Image
                  src="/images/lord-ram.jpg"
                  alt="Prabhu Shri Ram"
                  fill
                  className="object-cover"
                  sizes="20px"
                />
              </div>
              <span className="font-serif font-bold text-amber-200 text-[11px] tracking-wide">
                ॥ जय श्री राम ॥
              </span>
            </div>

            <span className="font-serif font-bold text-amber-200 tracking-wider text-xs hidden xs:inline-block">
              ॥ श्री गणेशाय नमः ॥
            </span>
            <span className="hidden md:inline-block text-orange-200">|</span>
            <span className="hidden sm:flex items-center gap-1 text-orange-100">
              <MapPin className="w-3.5 h-3.5 text-amber-300" />
              <span>Sri Matha Complex, Jigani, Bengaluru</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="hidden lg:flex items-center gap-1 text-orange-100">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>9:00 AM – 10:00 PM</span>
            </span>
            <a
              href="tel:+918050832752"
              className="flex items-center gap-1 text-amber-200 hover:text-white transition"
            >
              <Phone className="w-3.5 h-3.5 text-amber-300" />
              <span>+91 8050832752</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Official Logo & Brand Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shadow-sm border border-amber-300 group-hover:scale-105 transition duration-300 bg-stone-900">
              <Image
                src="/images/logo.png"
                alt="Rajshree Sweets & Snacks Logo"
                fill
                priority
                className="object-contain p-0.5"
                sizes="(max-width: 640px) 48px, 56px"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-brand-950 font-serif">
                  Rajshree
                </span>
                <span className="text-[11px] font-bold text-white bg-gradient-to-r from-brand-600 to-orange-500 px-2 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
                  Sweets & Snacks
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium hidden sm:block">
                Pure Traditional Mithai, Savory Namkeens & Hot Snacks
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-stone-700">
            <Link href="/" className="hover:text-brand-600 transition py-1">
              Home
            </Link>
            <Link href="/shop?category=SWEETS" className="hover:text-brand-600 transition py-1">
              Sweets
            </Link>
            <Link href="/shop?category=NAMKEEN" className="hover:text-brand-600 transition py-1">
              Namkeen
            </Link>
            <Link href="/shop?category=SNACKS" className="hover:text-brand-600 transition py-1">
              Hot Snacks
            </Link>
            <Link href="/shop" className="hover:text-brand-600 transition py-1">
              All Items (133)
            </Link>
            <Link href="/about" className="hover:text-brand-600 transition py-1">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-brand-600 transition py-1">
              Contact
            </Link>
          </nav>

          {/* Actions: Cart Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-gradient-to-r from-brand-600 to-orange-600 hover:from-brand-700 hover:to-orange-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-md transition active:scale-95"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {itemCount > 0 && (
                <span className="bg-white text-brand-900 text-xs font-black px-1.5 py-0.2 rounded-full min-w-[20px] text-center shadow-xs">
                  {itemCount}
                </span>
              )}
              {subtotal > 0 && (
                <span className="inline font-black border-l border-orange-400 pl-2 text-xs text-amber-200">
                  ₹{subtotal}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-orange-50 border border-stone-200"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-orange-100 bg-white px-4 pt-3 pb-5 space-y-1 shadow-lg">
          <div className="flex items-center gap-2.5 pb-2.5 mb-2 border-b border-orange-100 px-2">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-amber-400 shrink-0 shadow-xs">
              <Image
                src="/images/lord-ram.jpg"
                alt="Prabhu Shri Ram"
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
            <div>
              <div className="text-xs font-serif font-bold text-amber-900 leading-tight">
                ॥ जय श्री राम ॥
              </div>
              <div className="text-[10px] text-orange-700 font-semibold">
                Rajshree Sweets & Snacks
              </div>
            </div>
          </div>
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl font-bold text-stone-800 hover:bg-orange-50 hover:text-brand-600"
          >
            Home
          </Link>
          <Link
            href="/shop?category=SWEETS"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl font-bold text-stone-800 hover:bg-orange-50 hover:text-brand-600"
          >
            Traditional Sweets (Mithai)
          </Link>
          <Link
            href="/shop?category=NAMKEEN"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl font-bold text-stone-800 hover:bg-orange-50 hover:text-brand-600"
          >
            Crispy Namkeen & Savouries
          </Link>
          <Link
            href="/shop?category=SNACKS"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl font-bold text-stone-800 hover:bg-orange-50 hover:text-brand-600"
          >
            Hot Snacks, Samosas & Chaat
          </Link>
          <Link
            href="/shop"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl font-bold text-stone-800 hover:bg-orange-50 hover:text-brand-600"
          >
            Complete 133-Item Menu
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl font-bold text-stone-800 hover:bg-orange-50 hover:text-brand-600"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl font-bold text-stone-800 hover:bg-orange-50 hover:text-brand-600"
          >
            Contact & Location
          </Link>
          <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 px-3">
            <span>Hours: 9 AM – 10 PM</span>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-brand-600 font-bold underline"
            >
              Staff Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
