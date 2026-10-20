import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart, Sparkles, ShoppingBag } from 'lucide-react';
import { getSettings } from '@/lib/db';

export const metadata = {
  title: 'About Us | Rajshree Sweets & Snacks Jigani',
  description:
    'Learn about Rajshree Sweets & Snacks, located at Sri Matha Complex, Jigani, Bengaluru. Dedicated to authentic, pure vegetarian Indian sweets, namkeens, and hot snacks.',
};

export default function AboutPage() {
  const settings = getSettings();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-900 px-3.5 py-1.5 rounded-full text-xs font-bold border border-brand-200">
          <span className="veg-icon">
            <span className="veg-icon-dot" />
          </span>
          <span>100% Pure Vegetarian Sweet Shop</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-900 font-serif">
          About Rajshree Sweets & Snacks
        </h1>
        <p className="text-stone-600 leading-relaxed text-base">
          Serving the neighborhood of Jigani, Haragadde, and Bengaluru with authentic, high-quality traditional sweets, crisp savory namkeens, and freshly cooked hot snacks.
        </p>
      </div>

      {/* Main Story & Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-6 sm:p-10 rounded-3xl border border-amber-100 shadow-sm">
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
            Our Traditional Craft
          </span>
          <h2 className="text-2xl font-black text-stone-900 font-serif">
            Rooted in Authenticity & Traditional Flavors
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Rajshree Sweets & Snacks was founded with a single mission: to bring authentic, uncompromised Indian confectionery and savory snacks to our local community.
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            From classic pure-ghee Kaju Katli and Mawa Pedas to traditional festive Ghevar, Chena sweets, and crispy Mathris, every batch is prepared according to strict purity and hygiene standards in our Jigani store.
          </p>

          <div className="pt-2 grid grid-cols-2 gap-3 text-xs font-semibold text-stone-700">
            <div className="flex items-center gap-2 bg-amber-50 p-2.5 rounded-xl border border-amber-200/50">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Pure Veg</span>
            </div>
            <div className="flex items-center gap-2 bg-amber-50 p-2.5 rounded-xl border border-amber-200/50">
              <Sparkles className="w-4 h-4 text-brand-600" />
              <span>133 Verified Items</span>
            </div>
          </div>
        </div>

        <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-md bg-stone-900 border-2 border-amber-300">
          <Image
            src="/images/logo.png"
            alt="Rajshree Sweets & Snacks Logo"
            fill
            className="object-contain p-6"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent flex items-end p-4">
            <span className="text-xs text-amber-300 font-serif font-bold">
              ॥ जय श्री राम ॥ • Rajshree Sweets & Snacks, Jigani
            </span>
          </div>
        </div>
      </div>

      {/* Verified Store Location Card */}
      <div className="bg-amber-900 text-amber-50 rounded-3xl p-8 shadow-xl space-y-6">
        <div className="border-b border-amber-800 pb-4">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
            Verified Physical Location
          </span>
          <h3 className="text-2xl font-bold font-serif text-white mt-1">
            Rajshree Sweets & Snacks Shop
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-amber-200">
          <div className="space-y-1.5">
            <div className="font-bold text-white flex items-center gap-1.5 text-sm">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Address</span>
            </div>
            <p className="leading-relaxed">{settings.address}</p>
            <p className="text-[11px] text-amber-300">Landmark: Near Vishal Mega Mart / APC Circle</p>
          </div>

          <div className="space-y-1.5">
            <div className="font-bold text-white flex items-center gap-1.5 text-sm">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Operating Hours</span>
            </div>
            <p className="text-sm font-semibold text-white">{settings.operatingHours}</p>
            <p>Open 7 days a week for walk-in shopping and pickup.</p>
          </div>

          <div className="space-y-1.5">
            <div className="font-bold text-white flex items-center gap-1.5 text-sm">
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Contact Us</span>
            </div>
            <p className="text-sm font-semibold text-white">
              <a href={`tel:${settings.phone}`}>{settings.phone}</a>
            </p>
            <p>
              <a href={`mailto:${settings.email}`} className="underline text-amber-300">
                {settings.email}
              </a>
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap gap-4">
          <Link
            href="/shop"
            className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold px-6 py-3 rounded-xl text-xs transition flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Browse Online Catalogue</span>
          </Link>
          <a
            href="https://share.google/W79AydkWCxME9Msea"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-amber-950 hover:bg-black text-white border border-amber-700 px-6 py-3 rounded-xl text-xs font-semibold transition"
          >
            Get Directions on Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
