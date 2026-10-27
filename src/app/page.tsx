import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Clock, Phone, Sparkles, ShieldCheck, ShoppingBag } from 'lucide-react';
import { getProducts, getSettings } from '@/lib/db';
import ProductCard from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const settings = getSettings();
  const featuredProducts = getProducts({ featuredOnly: true }).slice(0, 8);
  const totalProducts = getProducts().length;

  const categories = [
    {
      id: 'SWEETS',
      title: 'Traditional Mithai',
      desc: 'Kaju Katli, Mawa Peda, Chena Sweets, Motichur & Ghee Ladoos',
      image: '/images/products/kaju-katli.jpg',
      count: '98 items',
      href: '/shop?category=SWEETS',
    },
    {
      id: 'NAMKEEN',
      title: 'Crispy Namkeen',
      desc: 'Bhakarwadi, Mathri, Chakli, Dalmoth, Sev & Spiced Mixtures',
      image: '/images/products/bhakarwadi.jpg',
      count: '24 items',
      href: '/shop?category=NAMKEEN',
    },
    {
      id: 'SNACKS',
      title: 'Hot Snacks & Chaat',
      desc: 'Fresh Samosas, Chola Bhatura, Pav Bhaji, Kachoris & Dahi Bhalla',
      image: '/images/products/samosa.jpg',
      count: '9 items',
      href: '/shop?category=SNACKS',
    },
    {
      id: 'ACCOMPANIMENTS',
      title: 'Chutneys & Sides',
      desc: 'Signature Sweet Red Chutney & Tangy Green Mint Chutney',
      image: '/images/products/green-chatni.jpg',
      count: '2 items',
      href: '/shop?category=ACCOMPANIMENTS',
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-100/80 via-orange-50/40 to-white pt-8 pb-14 sm:pt-14 sm:pb-20 border-b-2 border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-brand-900 px-4 py-1.5 rounded-full text-xs font-bold border border-orange-300 shadow-2xs">
                <span className="veg-icon">
                  <span className="veg-icon-dot" />
                </span>
                <span>Authentic Sweet Shop in Jigani, Bengaluru • 100% Pure Veg</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight font-serif leading-tight">
                Pure Traditional Indian Sweets & Crunchy Namkeens
              </h1>

              <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed">
                Welcome to <strong>Rajshree Sweets & Snacks</strong>. Browse our verified catalogue of 133 handcrafted mithai, authentic namkeens, and freshly cooked hot snacks. Direct local delivery & counter pickup in Jigani with instant HDFC UPI QR payment.
              </p>

              {/* Fulfilment highlight badges */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start text-xs font-bold text-stone-700">
                <div className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-orange-200 shadow-2xs">
                  <Clock className="w-4 h-4 text-brand-600" />
                  <span>Open Daily: 9 AM – 10 PM</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-orange-200 shadow-2xs">
                  <MapPin className="w-4 h-4 text-brand-600" />
                  <span>Delivery within 3 km & Porter</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-orange-200 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Direct UPI QR (0% Fee)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-3.5 justify-center lg:justify-start">
                <Link
                  href="/shop"
                  className="bg-gradient-to-r from-brand-600 to-orange-600 hover:from-brand-700 hover:to-orange-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-orange-500/20 transition flex items-center gap-2 hover:gap-3"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Explore Catalogue ({totalProducts} Items)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="bg-white hover:bg-orange-50 text-stone-800 font-bold px-5 py-3.5 rounded-xl border-2 border-orange-200 shadow-xs transition"
                >
                  Store Pickup & Location
                </Link>
              </div>
            </div>

            {/* Right Column: Visual Showcase with Official Logo & Product Showcase */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative mx-auto max-w-sm aspect-square w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-300 bg-stone-900 group">
                <Image
                  src="/images/logo.png"
                  alt="Rajshree Sweets & Snacks Logo"
                  fill
                  priority
                  className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-5">
                  <div className="text-white space-y-0.5">
                    <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider font-serif">
                      ॥ जय श्री राम ॥
                    </span>
                    <h3 className="text-lg font-bold font-serif">Rajshree Sweets & Snacks</h3>
                    <p className="text-[11px] text-stone-300">
                      Sri Matha Complex, Jigani • 100% Pure Vegetarian
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Explore by Category</span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">Our Specialities</h2>
          </div>
          <Link href="/shop" className="text-brand-600 font-bold text-sm hover:text-brand-700 flex items-center gap-1">
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={c.href}
              className="group bg-white rounded-2xl border-2 border-orange-100 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col hover:border-brand-500"
            >
              <div className="relative aspect-16/10 w-full bg-orange-50 overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <span className="absolute top-2.5 right-2.5 bg-stone-900/80 backdrop-blur-xs text-amber-300 text-[11px] font-bold px-2 py-0.5 rounded-md">
                  {c.count}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-stone-900 group-hover:text-brand-600 transition text-lg font-serif">
                    {c.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-2">{c.desc}</p>
                </div>
                <div className="mt-3 flex items-center text-xs font-bold text-brand-600 gap-1">
                  <span>Shop category</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Products Carousel / Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Customer Favorites</span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">Featured Delicacies</h2>
          </div>
          <Link href="/shop" className="text-brand-600 font-bold text-sm hover:text-brand-700 flex items-center gap-1">
            <span>Browse Full Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Verified Store Information & Pickup Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-orange-900 via-brand-900 to-stone-900 text-amber-50 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden border-2 border-orange-700/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="bg-orange-800 text-amber-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Visit Our Physical Store
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-serif text-white">
                Fresh Sweets Ready for Pickup in Jigani
              </h2>
              <div className="space-y-2 text-sm text-orange-200">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <span>{settings.address}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Operating Hours: {settings.operatingHours}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Store Phone: {settings.phone}</span>
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/shop"
                className="w-full bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-stone-950 font-bold py-3.5 px-6 rounded-xl text-center shadow-md transition"
              >
                Order for Store Pickup
              </Link>
              <a
                href="https://share.google/W79AydkWCxME9Msea"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-stone-950/80 hover:bg-black text-white border border-orange-700/60 font-semibold py-3 px-6 rounded-xl text-center text-sm transition"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
