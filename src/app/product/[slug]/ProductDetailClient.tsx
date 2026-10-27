'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Minus, Check, ShoppingBag, ShieldCheck, MapPin, Truck } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const router = useRouter();
  const { addToCart, setIsCartOpen } = useCart();

  const isKg = product.unit === 'KG';
  const isPcs = product.unit === 'PCS';
  const isPlate = product.unit === 'PLATE';

  const [selectedKgVariant, setSelectedKgVariant] = useState<{ label: string; factor: number }>({
    label: '1 kg',
    factor: 1.0,
  });
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [detailImage, setDetailImage] = useState(product.image || `/images/products/${product.slug}.jpg`);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('rajshree_prod_overrides');
      if (raw) {
        const ov = JSON.parse(raw);
        if (ov[product.id]?.image) {
          setDetailImage(ov[product.id].image);
          return;
        }
      }
    } catch (e) {}
    setDetailImage(product.image || `/images/products/${product.slug}.jpg`);
  }, [product.id, product.image, product.slug]);

  const currentVariantLabel = isKg
    ? selectedKgVariant.label
    : isPcs
    ? '1 Pc'
    : '1 Plate';

  const currentVariantFactor = isKg ? selectedKgVariant.factor : 1.0;
  const unitPrice = Math.round(product.price * currentVariantFactor);
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart({ ...product, image: detailImage }, currentVariantLabel, currentVariantFactor, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handleBuyNow = () => {
    if (!product.inStock) return;
    addToCart({ ...product, image: detailImage }, currentVariantLabel, currentVariantFactor, quantity);
    router.push('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-stone-500">
        <Link href="/" className="hover:text-brand-700">
          Home
        </Link>
        <span>/</span>
        <Link href={`/shop?category=${product.category}`} className="hover:text-brand-700">
          {product.category}
        </Link>
        <span>/</span>
        <span className="font-semibold text-stone-800">{product.name}</span>
      </nav>

      {/* Main Product Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white p-6 sm:p-8 rounded-3xl border border-amber-100 shadow-sm">
        {/* Left: Product Image */}
        <div className="lg:col-span-6">
          <div className="relative aspect-4/3 sm:aspect-square w-full rounded-2xl overflow-hidden bg-amber-50 border border-amber-200/50 shadow-inner">
            {detailImage ? (
              <img
                src={detailImage}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={() => setDetailImage('/images/sweets-platter.jpg')}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-brand-100 text-brand-900 font-bold text-4xl">
                RS
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg shadow-sm">
              <span className="veg-icon">
                <span className="veg-icon-dot" />
              </span>
              <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                100% Pure Vegetarian
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-stone-900/80 backdrop-blur-xs text-stone-300 text-[11px] p-2.5 rounded-xl">
              Representative photography. Every batch is freshly prepared at Rajshree Sweets & Snacks shop in Jigani.
            </div>
          </div>
        </div>

        {/* Right: Product Details & Controls */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="inline-block bg-amber-100 text-brand-900 text-xs font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider">
              {product.category} • SL #{product.slNo}
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-stone-900 font-serif">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-3xl font-black text-stone-900">
                ₹{unitPrice}
              </span>
              <span className="text-sm text-stone-500 font-medium">
                per {currentVariantLabel}
              </span>
              {isKg && (
                <span className="text-xs text-brand-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  (MRP: ₹{product.price}/kg)
                </span>
              )}
            </div>

            <p className="text-sm text-stone-600 leading-relaxed pt-2">
              {product.description ||
                `Enjoy the rich taste and authentic preparation of ${product.name}, made according to traditional confectionery standards at Rajshree Sweets & Snacks.`}
            </p>
          </div>

          {/* Weight / Pack Options for KG items */}
          {isKg && (
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                Select Pack Weight:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: '250g', factor: 0.25 },
                  { label: '500g', factor: 0.5 },
                  { label: '1 kg', factor: 1.0 },
                ].map((v) => (
                  <button
                    key={v.label}
                    type="button"
                    onClick={() => setSelectedKgVariant(v)}
                    className={`py-3 px-3 rounded-xl border text-center font-bold text-sm transition ${
                      selectedKgVariant.label === v.label
                        ? 'border-brand-600 bg-amber-50 text-brand-950 ring-2 ring-brand-500/20'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <div>{v.label}</div>
                    <div className="text-xs font-normal text-stone-500 mt-0.5">
                      ₹{Math.round(product.price * v.factor)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector & Item Total */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-stone-100">
            <div className="space-y-1">
              <span className="text-xs font-bold text-stone-700">Quantity:</span>
              <div className="flex items-center border border-stone-300 rounded-xl bg-white overflow-hidden shadow-xs">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2 text-stone-600 hover:bg-stone-100 transition"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-bold text-sm text-stone-900">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-2 text-stone-600 hover:bg-stone-100 transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-stone-400 font-medium">Total Amount</div>
              <div className="text-2xl font-black text-stone-900">₹{totalPrice}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition active:scale-98 ${
                !product.inStock
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  : added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-brand-700 hover:bg-brand-800 text-white'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              disabled={!product.inStock}
              className="w-full bg-amber-500 hover:bg-amber-600 text-brand-950 font-bold py-3.5 px-4 rounded-xl text-sm shadow-md transition active:scale-98"
            >
              Buy Now (Checkout)
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="pt-4 border-t border-stone-100 space-y-2 text-xs text-stone-600">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-brand-600 shrink-0" />
              <span>Local delivery within 8 km of Jigani store (Min order: ₹500, delivery fee: ₹50)</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
              <span>Same-day store pickup at Sri Matha Complex, Jigani</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Direct UPI QR scan & pay with 0% extra payment gateway charges</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-stone-900 font-serif">
            More {product.category} Delights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
