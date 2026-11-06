import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-8 border-t-4 border-brand-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-stone-800">
          {/* Brand & Official Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-sm border border-amber-400 bg-stone-950">
                <Image
                  src="/images/logo.png"
                  alt="Rajshree Sweets & Snacks Logo"
                  fill
                  className="object-contain p-0.5"
                  sizes="48px"
                />
              </div>
              <div>
                <span className="text-xl font-black text-white font-serif tracking-tight block">
                  Rajshree Sweets
                </span>
                <span className="text-xs text-orange-400 font-bold tracking-wider uppercase font-serif">
                  ॥ जय श्री राम ॥
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Serving Jigani & Bengaluru with authentic, handcrafted Indian sweets, pure desi ghee preparations, savory namkeens, and freshly prepared hot snacks.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-3 py-1.5 rounded-lg w-fit">
              <span className="veg-icon">
                <span className="veg-icon-dot" />
              </span>
              <span>100% Pure Vegetarian Sweet Shop</span>
            </div>

            {/* Social Media Channels */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-orange-400 block mb-2 uppercase tracking-wider">
                Follow Us Online
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="https://www.instagram.com/rajshree_ss26/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Rajshree Sweets on Instagram @rajshree_ss26"
                  className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:opacity-95 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm transition hover:scale-105"
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
                  aria-label="Follow Rajshree Sweets on Facebook"
                  className="flex items-center gap-1.5 bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm transition hover:scale-105"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wider">Catalogue</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/shop?category=SWEETS" className="hover:text-orange-400 transition">
                  Traditional Sweets (Kaju, Mawa, Chena)
                </Link>
              </li>
              <li>
                <Link href="/shop?category=NAMKEEN" className="hover:text-orange-400 transition">
                  Crispy Namkeen & Mathri
                </Link>
              </li>
              <li>
                <Link href="/shop?category=SNACKS" className="hover:text-orange-400 transition">
                  Hot Snacks, Chaat & Samosas
                </Link>
              </li>
              <li>
                <Link href="/shop?category=ACCOMPANIMENTS" className="hover:text-orange-400 transition">
                  Fresh Chutneys & Accompaniments
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-orange-400 transition">
                  Full 133-Item Menu
                </Link>
              </li>
            </ul>
          </div>

          {/* Verified Business Details */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wider">Store & Contact</h3>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <span>
                  Sri Matha Complex, Shop Nos. 4 & 5, Ground Floor, Anekal Main Road, Madapatna, Vaddarapalya, Haragadde, Jigani, Bengaluru – 560105
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-500 shrink-0" />
                <a href="tel:+918050832752" className="hover:text-orange-400 transition">
                  +91 8050832752
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-500 shrink-0" />
                <a href="mailto:sribhog2026@gmail.com" className="hover:text-orange-400 transition">
                  sribhog2026@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-500 shrink-0" />
                <span>9:00 AM – 10:00 PM (Every Day)</span>
              </div>
            </div>
          </div>

          {/* Store Policies & Payment */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wider">Customer Care</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy" className="hover:text-orange-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-orange-400 transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/delivery-policy" className="hover:text-orange-400 transition">
                  Delivery & Pickup Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-orange-400 transition">
                  Refund & Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-stone-500 hover:text-stone-300 transition">
                  Staff Login
                </Link>
              </li>
            </ul>

            <div className="pt-2">
              <span className="text-[11px] text-stone-400 block mb-1">Accepted Payment:</span>
              <span className="inline-block bg-stone-800 text-orange-400 text-[11px] px-2.5 py-1 rounded-md font-bold border border-stone-700">
                Official HDFC SmartHub Vyapar UPI QR
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Rajshree Sweets & Snacks. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="text-orange-400 font-bold">॥ जय श्री राम ॥</span>
            <span>•</span>
            <span>Official store for</span>
            <span className="text-orange-400 font-medium">sribhog.in</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
