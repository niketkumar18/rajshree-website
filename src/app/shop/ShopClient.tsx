'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react';
import { Product, CategoryType } from '@/lib/types';
import ProductCard from '@/components/ProductCard';

interface ShopClientProps {
  initialProducts: Product[];
}

export default function ShopClient({ initialProducts }: ShopClientProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || 'ALL';

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name-asc'>('default');
  const [inStockOnly, setInStockOnly] = useState(false);

  const categories = [
    { id: 'ALL', label: 'All Items (133)' },
    { id: 'SWEETS', label: 'Sweets (98)' },
    { id: 'NAMKEEN', label: 'Namkeen (24)' },
    { id: 'SNACKS', label: 'Hot Snacks (9)' },
    { id: 'ACCOMPANIMENTS', label: 'Chutneys (2)' },
  ];

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Category filter
      if (selectedCategory !== 'ALL' && product.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        if (!matchesName && !matchesCat) return false;
      }
      // In stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      return a.slNo - b.slNo;
    });
  }, [initialProducts, selectedCategory, searchQuery, inStockOnly, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="border-b border-amber-100 pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-700">Online Store</span>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 font-serif mt-1">
          Complete Product Catalogue
        </h1>
        <p className="text-sm text-stone-500 mt-1 max-w-2xl">
          Verified source prices from Rajshree Sweets & Snacks shop catalogue. All products are 100% vegetarian and prepared with authentic recipes.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center bg-white p-4 rounded-2xl border border-amber-100 shadow-2xs">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sweets, namkeen, samosas..."
            className="w-full pl-10 pr-9 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500 focus:bg-white transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort & In-stock toggle */}
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer bg-stone-50 px-3 py-2 rounded-xl border border-stone-200 hover:bg-stone-100 transition">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="rounded text-brand-600 focus:ring-brand-500"
            />
            <span>In Stock Only</span>
          </label>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-stone-400" />
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="text-xs font-semibold bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:ring-2 focus:ring-brand-500"
            >
              <option value="default">Sort: Catalogue Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition shadow-2xs ${
              selectedCategory === c.id
                ? 'bg-gradient-to-r from-brand-600 to-orange-600 text-white shadow-md'
                : 'bg-white text-stone-700 border-2 border-orange-100 hover:bg-orange-50 hover:border-brand-300'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Active Results Summary */}
      <div className="flex justify-between items-center text-xs text-stone-500">
        <span>
          Showing <strong>{filteredProducts.length}</strong> of {initialProducts.length} products
          {selectedCategory !== 'ALL' && ` in ${selectedCategory}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </span>
        {(selectedCategory !== 'ALL' || searchQuery || inStockOnly) && (
          <button
            onClick={() => {
              setSelectedCategory('ALL');
              setSearchQuery('');
              setInStockOnly(false);
            }}
            className="text-brand-700 font-semibold hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-stone-200/80 p-8 space-y-3">
          <p className="text-stone-700 font-bold text-lg">No products found matching your criteria</p>
          <p className="text-xs text-stone-400">Try modifying your search or choosing another category</p>
          <button
            onClick={() => {
              setSelectedCategory('ALL');
              setSearchQuery('');
              setInStockOnly(false);
            }}
            className="bg-brand-700 text-white text-xs font-bold px-4 py-2 rounded-lg"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
