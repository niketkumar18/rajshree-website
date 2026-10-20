import React, { Suspense } from 'react';
import { getProducts } from '@/lib/db';
import ShopClient from './ShopClient';

export const dynamic = 'force-dynamic';

export default function ShopPage() {
  const products = getProducts();

  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-12 text-center text-stone-500">Loading catalogue...</div>}>
      <ShopClient initialProducts={products} />
    </Suspense>
  );
}
