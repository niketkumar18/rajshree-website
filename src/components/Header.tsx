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
            <span className="hidden sm:inline-block text-orange-300/60">|</span>
            <div className="hidden sm:flex items-center gap-2.5">
              <a
                href="https://www.instagram.com/rajshree_ss26/"
                target="_blank"
                rel="noopener noreferrer"
                title="Follow Rajshree Sweets on Instagram"
                aria-label="Instagram @rajshree_ss26"
                className="text-amber-200 hover:text-white transition hover:scale-110"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61590946588661"
                target="_blank"
                rel="noopener noreferrer"
                title="Follow Rajshree Sweets on Facebook"
                aria-label="Facebook Page"
                className="text-amber-200 hover:text-white transition hover:scale-110"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
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

      {/* Festive & Diwali Offer Ribbon */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-brand-700 text-white text-xs py-1.5 px-3 sm:px-4 text-center font-bold shadow-xs border-t border-amber-300/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          <span className="text-amber-200">🪔 Festive Celebration Offer:</span>
          <span>Flat <strong>15% OFF</strong> on Sweets (Min order ₹2,000)!</span>
          <span className="hidden xs:inline">Use Code:</span>
          <span className="bg-white text-brand-950 font-mono font-black px-2 py-0.5 rounded shadow-xs tracking-wider text-[11px]">
            DIWALI15
          </span>
          <span className="text-amber-200 text-[11px] font-normal">| Valid till 10th Nov 2026</span>
          <Link href="/shop?category=SWEETS" className="underline hover:text-amber-200 text-[11px] font-bold ml-1">
            Order Sweets →
          </Link>
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
          <div className="pt-3 border-t border-stone-100 px-3">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-2">
              Follow Us Online
            </span>
            <div className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/rajshree_ss26/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-2xs"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61590946588661"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-[#1877F2] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-2xs"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook</span>
              </a>
            </div>
          </div>
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
