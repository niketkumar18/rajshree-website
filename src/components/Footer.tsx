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
