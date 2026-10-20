import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProductBySlug, getProducts } from '@/lib/db';
import ProductDetailClient from './ProductDetailClient';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | Rajshree Sweets & Snacks',
    };
  }

  return {
    title: `${product.name} | Rajshree Sweets & Snacks Jigani`,
    description: `Order fresh ${product.name} (₹${product.price}/${product.unit.toLowerCase()}) online from Rajshree Sweets & Snacks in Jigani, Bengaluru. Traditional recipe, 100% pure veg.`,
    openGraph: {
      title: `${product.name} - Rajshree Sweets & Snacks`,
      description: `Fresh ${product.name} available for delivery and pickup.`,
      images: product.image ? [{ url: product.image }] : [],
    },
  };
}

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getProducts({ category: product.category })
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return <ProductDetailClient product={product} relatedProducts={related} />;
}
