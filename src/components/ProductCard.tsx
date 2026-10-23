'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Check, ShoppingBag } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [selectedKgVariant, setSelectedKgVariant] = useState<{ label: string; factor: number }>({
    label: '500g',
    factor: 0.5,
  });
  const [added, setAdded] = useState(false);

  const isKg = product.unit === 'KG';
  const isPcs = product.unit === 'PCS';
  const isPlate = product.unit === 'PLATE';

  const currentVariantLabel = isKg
    ? selectedKgVariant.label
    : isPcs
    ? '1 Pc'
    : '1 Plate';

  const currentVariantFactor = isKg ? selectedKgVariant.factor : 1.0;
  const currentPrice = Math.round(product.price * currentVariantFactor);

  const [imageSrc, setImageSrc] = useState(product.image || `/images/products/${product.slug}.jpg`);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('rajshree_prod_overrides');
      if (raw) {
        const ov = JSON.parse(raw);
        if (ov[product.id]?.image) {
          setImageSrc(ov[product.id].image);
          return;
        }
      }
    } catch (e) {}
    setImageSrc(product.image || `/images/products/${product.slug}.jpg`);
  }, [product.id, product.image, product.slug]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.inStock) return;

    addToCart({ ...product, image: imageSrc }, currentVariantLabel, currentVariantFactor, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="group bg-white rounded-2xl border-2 border-orange-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:border-brand-500">
      {/* Product Image & Badges */}
      <Link href={`/product/${product.slug}`} className="relative aspect-4/3 w-full bg-orange-50 overflow-hidden block">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          unoptimized={typeof imageSrc === 'string' && imageSrc.startsWith('http')}
          onError={() => setImageSrc('/images/sweets-platter.jpg')}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Veg icon & Category badge */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-white/95 backdrop-blur-xs px-2 py-1 rounded-lg shadow-xs">
          <span className="veg-icon">
            <span className="veg-icon-dot" />
          </span>
          <span className="text-[10px] font-bold text-stone-800 tracking-wider">
            {product.category}
          </span>
        </div>

        {/* Stock status badge if out of stock */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center">
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}

        {product.featured && (
          <span className="absolute top-2.5 right-2.5 bg-brand-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-md shadow-xs uppercase tracking-wider">
            Popular
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-bold text-stone-900 group-hover:text-brand-600 transition line-clamp-1 text-base">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-stone-500 mt-1 line-clamp-2">
            {product.description || `Freshly prepared ${product.name} from Rajshree Sweets & Snacks.`}
          </p>
        </div>

        {/* Weight Selector for KG products */}
        {isKg && product.inStock && (
          <div className="space-y-1">
            <div className="text-[11px] font-semibold text-stone-500 flex justify-between">
              <span>Select Pack:</span>
              <span className="text-brand-700 font-bold">₹{product.price}/kg</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { label: '250g', factor: 0.25 },
                { label: '500g', factor: 0.5 },
                { label: '1 kg', factor: 1.0 },
              ].map((v) => (
                <button
                  key={v.label}
                  type="button"
                  onClick={() => setSelectedKgVariant(v)}
                  className={`text-xs py-1 px-1 rounded-lg border font-bold transition ${
                    selectedKgVariant.label === v.label
                      ? 'bg-orange-100 border-brand-600 text-brand-900 shadow-xs'
                      : 'border-stone-200 text-stone-600 hover:bg-orange-50'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Non-KG info */}
        {!isKg && (
          <div className="text-xs text-stone-500">
            <span>Price: </span>
            <span className="font-bold text-stone-800">
              ₹{product.price} / {product.unit.toLowerCase()}
            </span>
          </div>
        )}

        {/* Price & Add to Cart Action */}
        <div className="pt-2 border-t border-orange-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-[11px] text-stone-400 font-semibold">{currentVariantLabel}</div>
            <div className="text-lg font-black text-stone-900">
              ₹{currentPrice}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-xs active:scale-95 ${
              !product.inStock
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                : added
                ? 'bg-emerald-600 text-white'
                : 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-500/20'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
