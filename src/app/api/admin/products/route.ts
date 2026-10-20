import { NextRequest, NextResponse } from 'next/server';
import { getProducts, updateProduct, createProduct, deleteProduct } from '@/lib/db';
import { checkRequestAdminAuth } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  if (!checkRequestAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
  }

  const products = getProducts();
  return NextResponse.json({ products });
}

export async function POST(req: NextRequest) {
  if (!checkRequestAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, category, unit, price, image, description, inStock, featured } = body;

    if (!name || !category || !unit || price === undefined) {
      return NextResponse.json({ error: 'Missing required product fields' }, { status: 400 });
    }

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const newProd = createProduct({
      name: name.trim(),
      slug,
      category,
      unit,
      price: Number(price),
      image: image || undefined,
      description: description || undefined,
      inStock: inStock !== undefined ? Boolean(inStock) : true,
      featured: featured !== undefined ? Boolean(featured) : false,
    });

    return NextResponse.json({ success: true, product: newProd });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error creating product' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!checkRequestAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, updates } = body;

    if (!id || !updates) {
      return NextResponse.json({ error: 'Missing product id or updates' }, { status: 400 });
    }

    const success = updateProduct(id, updates);
    return NextResponse.json({ success });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error updating product' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!checkRequestAdminAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing product id' }, { status: 400 });
  }

  const success = deleteProduct(id);
  return NextResponse.json({ success });
}
