'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Sparkles, Gift, Store, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface Slide {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  highlightPrice?: string;
  subtitle: string;
  image: string;
  alt: string;
  imageFit?: 'contain' | 'cover';
  perks: string[];
  ctaLabel: string;
  ctaHref: string;
  isWhatsApp?: boolean;
}

const slides: Slide[] = [
  {
    id: 'hamper-pack',
    badge: '🪔 Limited Festive Edition',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    title: 'Handcrafted Celebration Gift Hampers',
    highlightPrice: '₹900/-',
    subtitle: 'Lavishly packed with premium chocolates, Swiss truffles, refreshing beverages & festive treats wrapped in decorative red net presentation baskets.',
    image: '/images/festive/hamper-basket.jpg',
    alt: 'Diwali Festive Gift Hamper Basket - Rajshree Sweets Jigani',
    imageFit: 'cover',
    perks: ['Perfect for Family & Friends', 'Custom Hampers on Pre-order', 'Available for Store Pickup & Delivery'],
    ctaLabel: 'Order Hamper on WhatsApp',
    ctaHref: 'https://wa.me/918050832752?text=Hello%20Rajshree%20Sweets%2C%20I%20would%20like%20to%20order%20the%20Festive%20Gift%20Hamper%20(Rs%20900)%20seen%20on%20sribhog.in',
    isWhatsApp: true,
  },
  {
    id: 'store-display',
    badge: '📍 Jigani Retail Store Exclusive',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    title: 'Fresh Daily Mithai, Hot Samosas & Chaat',
    highlightPrice: 'Fresh Daily',
    subtitle: 'Step into our physical store at Sri Matha Complex, Jigani. Savor freshly fried samosas, crispy kachoris, and authentic desi ghee sweets prepared every morning.',
    image: '/images/festive/store-counter.jpg',
    alt: 'Fresh Sweets and Snacks Counter Display at Rajshree Sweets Jigani',
    imageFit: 'cover',
    perks: ['100% Pure Vegetarian & Desi Ghee', 'Hygienic Counter Display', 'Direct Counter Pickup 9 AM – 10 PM'],
    ctaLabel: 'Visit Store / Get Directions',
    ctaHref: '/contact',
    isWhatsApp: false,
  },
  {
    id: 'luxury-boxes',
    badge: '🎁 Corporate & Festive Gifting',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-400/40',
    title: 'Golden Jar Sets & Luxury Sweet Boxes',
    highlightPrice: 'Bulk Gifting',
    subtitle: 'Make a grand impression with our royal golden canister sets and assorted luxury mithai gift boxes. Tailor-made packaging for corporate clients and family events.',
    image: '/images/festive/festive-boxes.jpg',
    alt: 'Luxury Golden Jar Gifting Sets and Assorted Mithai Boxes',
    imageFit: 'cover',
    perks: ['Special Corporate Bulk Rates', 'Custom Box Branding Options', 'Direct Invoicing Available'],
    ctaLabel: 'Inquire for Bulk Gifting',
    ctaHref: 'https://wa.me/918050832752?text=Hello%20Rajshree%20Sweets%2C%20I%20would%20like%20to%20inquire%20about%20Corporate%20%2F%20Bulk%20Festive%20Gift%20Boxes',
    isWhatsApp: true,
  },
  {
    id: 'gift-pack-basket',
    badge: '✨ In-Store Special',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    title: 'Festive Treat Baskets & Sweet Platters',
    highlightPrice: 'From ₹900',
    subtitle: 'Prepared with festive cheer for Diwali, Bhai Dooj & family celebrations. Pair with our 133-item catalogue of traditional sweets & savories.',
    image: '/images/festive/gift-pack-hamper.jpg',
    alt: 'Festive Gift Basket with Sweets and Treats at Rajshree Sweets',
    imageFit: 'cover',
    perks: ['Flat 15% OFF Sweets with code DIWALI15', 'Store Pickup at Jigani', 'Fast Delivery within 3 km & Porter'],
    ctaLabel: 'Explore Sweets Catalogue',
    ctaHref: '/shop?category=SWEETS',
    isWhatsApp: false,
  },
];

export default function FestiveSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (isPaused) return;
    timeoutRef.current = setTimeout(nextSlide, 5000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, isPaused]);

  const activeSlide = slides[current];

  return (
    <section
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
      aria-label="Festive Hampers and Store Showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Outer Card with Rich Gold/Amber Border & Deep Ambient Background */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950 border-2 border-amber-400/50 shadow-2xl">
        {/* Subtle Decorative Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 min-h-[460px] sm:min-h-[500px] items-center">
          {/* Left Column: Image with Subtle Frame & Golden Ribbon */}
          <div className="lg:col-span-6 p-4 sm:p-8 flex items-center justify-center">
            <div className="relative w-full max-w-lg aspect-4/3 sm:aspect-16/11 rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-300/40 bg-stone-900 group">
              <img
                src={activeSlide.image}
                alt={activeSlide.alt}
                key={activeSlide.id}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Price / Highlight Tag in Top Corner */}
              {activeSlide.highlightPrice && (
                <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-black text-xs sm:text-sm px-3.5 py-1.5 rounded-xl shadow-lg border border-amber-200/50 flex items-center gap-1.5 backdrop-blur-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  <span>{activeSlide.highlightPrice}</span>
                </div>
              )}

              {/* Bottom Subtle Gradient for Image Polish */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-stone-950/90 to-transparent flex items-end p-3">
                <span className="text-[11px] font-medium text-stone-300 flex items-center gap-1">
                  <Store className="w-3.5 h-3.5 text-amber-400" />
                  <span>Actual Store Display • Sri Matha Complex, Jigani</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Marketing Copy & CTAs */}
          <div className="lg:col-span-6 p-6 sm:p-8 lg:pl-4 flex flex-col justify-between space-y-5 text-white">
            <div className="space-y-3.5">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-xs">
                <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-extrabold ${activeSlide.badgeColor}`}>
                  {activeSlide.badge}
                </span>
                <span className="text-amber-200/80 text-[11px] font-medium hidden sm:inline">
                  Slide {current + 1} of {slides.length}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif text-amber-100 tracking-tight leading-tight">
                {activeSlide.title}
              </h3>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xl">
                {activeSlide.subtitle}
              </p>

              {/* Bullet Highlights */}
              <ul className="space-y-1.5 pt-1">
                {activeSlide.perks.map((perk, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-amber-100 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs & Navigation Controls */}
            <div className="pt-2 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                {activeSlide.isWhatsApp ? (
                  <a
                    href={activeSlide.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg shadow-emerald-900/30 transition active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{activeSlide.ctaLabel}</span>
                  </a>
                ) : (
                  <Link
                    href={activeSlide.ctaHref}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-stone-950 font-black text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg shadow-amber-900/30 transition active:scale-95"
                  >
                    <span>{activeSlide.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}

                <Link
                  href="/shop?category=SWEETS"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-200 hover:text-white font-bold px-3 py-2 rounded-xl transition border border-amber-400/30 hover:border-amber-400/60"
                >
                  <Gift className="w-3.5 h-3.5 text-amber-400" />
                  <span>Use Code DIWALI15 (15% OFF)</span>
                </Link>
              </div>

              {/* Slider Controls Bar */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-800">
                {/* Dots */}
                <div className="flex items-center gap-2">
                  {slides.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => setCurrent(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                        current === idx
                          ? 'w-8 bg-amber-400 shadow-sm'
                          : 'w-2 bg-stone-700 hover:bg-stone-500'
                      }`}
                    />
                  ))}
                </div>

                {/* Arrows */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={prevSlide}
                    aria-label="Previous Slide"
                    className="p-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-amber-200 transition border border-stone-700 hover:border-amber-400/50 cursor-pointer active:scale-90"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    aria-label="Next Slide"
                    className="p-2 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-amber-200 transition border border-stone-700 hover:border-amber-400/50 cursor-pointer active:scale-90"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
