'use client';

import React from 'react';
import Image from 'next/image';

export default function LordRamCorner() {
  return (
    <div className="hidden sm:flex fixed top-2 right-4 sm:top-2.5 sm:right-4 z-50 pointer-events-auto">
      <div className="group relative flex items-center gap-2 bg-gradient-to-r from-orange-700 via-orange-600 to-amber-600 text-white pl-2 pr-3 py-1.5 rounded-full shadow-lg border-2 border-amber-300 sacred-aura hover:scale-105 transition-all duration-300 cursor-default">
        {/* Divine Portrait with Gold Halo Ring */}
        <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-amber-200 shadow-md shrink-0 bg-orange-950">
          <Image
            src="/images/lord-ram.jpg"
            alt="Prabhu Shri Ram"
            fill
            className="object-cover"
            priority
            sizes="44px"
          />
        </div>

        {/* Auspicious Inscription */}
        <div className="flex flex-col text-left leading-tight">
          <span className="text-[12px] sm:text-sm font-extrabold text-amber-200 tracking-wide font-serif drop-shadow-xs">
            ॥ जय श्री राम ॥
          </span>
          <span className="text-[9px] sm:text-[10px] text-orange-100 font-medium tracking-tight hidden xs:inline">
            सियावर रामचंद्र की जय
          </span>
        </div>

        {/* Hover Tooltip / Divine Blessing */}
        <div className="absolute right-0 top-full mt-2 w-52 p-3 bg-stone-900/95 backdrop-blur-md text-amber-100 text-xs rounded-xl shadow-2xl border border-amber-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none text-center space-y-1">
          <div className="font-bold text-amber-300 font-serif">प्रभु श्री राम की कृपा</div>
          <div className="text-[11px] text-stone-300">
            Dedicated to pure, authentic Indian sweets and savories with divine blessings.
          </div>
        </div>
      </div>
    </div>
  );
}
