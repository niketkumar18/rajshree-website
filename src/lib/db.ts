import { DatabaseSync } from 'node:sqlite';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import type { Product, Order, OrderItem, StoreSettings, CategoryType } from './types';
import seedProductsRaw from '@/data/seed-products.json';

const isServerless =
  process.env.VERCEL === '1' ||
  Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME) ||
  Boolean(process.env.LAMBDA_TASK_ROOT);

// On Vercel / serverless environments, write only to /tmp
const DB_DIR = isServerless ? '/tmp' : path.join(process.cwd(), 'src', 'data');
const DB_FILE = path.join(DB_DIR, 'rajshree.db');
const BUNDLED_DB = path.join(process.cwd(), 'src', 'data', 'rajshree.db');

// In-memory store for instant lookup and serverless resiliency
const orderMemoryStore = new Map<string, Order>();

// Ensure directory exists for local development
if (!isServerless && !fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

let dbInstance: DatabaseSync | null = null;

export function getDb(): DatabaseSync {
  if (!dbInstance) {
    if (isServerless) {
      try {
        if (!fs.existsSync(DB_FILE) && fs.existsSync(BUNDLED_DB)) {
          fs.copyFileSync(BUNDLED_DB, DB_FILE);
        }
      } catch (err) {
        console.warn('Could not copy bundled DB to /tmp, will initialize freshly:', err);
      }
    }

    try {
      dbInstance = new DatabaseSync(DB_FILE);
      initDb(dbInstance);
    } catch (err) {
      console.warn('Failed to open file DB, falling back to in-memory SQLite:', err);
      try {
        dbInstance = new DatabaseSync(':memory:');
        initDb(dbInstance);
      } catch (memErr) {
        console.error('Fatal: Failed to init in-memory DB:', memErr);
        throw memErr;
      }
    }
  }
  return dbInstance;
}

function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

function initDb(db: DatabaseSync) {
  // Schema creation
  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      sl_no INTEGER,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      category TEXT NOT NULL,
      unit TEXT NOT NULL,
      price REAL NOT NULL,
      image TEXT,
      description TEXT,
      in_stock INTEGER DEFAULT 1,
      featured INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      order_ref TEXT UNIQUE NOT NULL,
      customer_name TEXT NOT NULL,
      customer_phone TEXT NOT NULL,
      customer_email TEXT,
      fulfilment_type TEXT NOT NULL,
      address TEXT,
      landmark TEXT,
      pincode TEXT,
      notes TEXT,
      subtotal REAL NOT NULL,
      delivery_fee REAL NOT NULL,
      total_amount REAL NOT NULL,
      status TEXT NOT NULL,
      payment_status TEXT NOT NULL,
      payment_utr TEXT,
      payment_verified_at TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id TEXT PRIMARY KEY,
      order_id TEXT NOT NULL,
      product_id TEXT NOT NULL,
      product_name TEXT NOT NULL,
      variant_label TEXT NOT NULL,
      unit_price REAL NOT NULL,
      quantity REAL NOT NULL,
      item_total REAL NOT NULL,
      FOREIGN KEY(order_id) REFERENCES orders(id)
    );

    CREATE TABLE IF NOT EXISTS admin_users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      salt TEXT NOT NULL,
      role TEXT DEFAULT 'admin',
      created_at TEXT NOT NULL
    );
  `);

  // Default Settings
  const existingSettings = db.prepare('SELECT COUNT(*) as count FROM settings').get() as { count: number };
  if (existingSettings.count === 0) {
    const defaults: Record<string, string> = {
      storeName: 'Rajshree Sweets & Snacks',
      phone: '+91 8050832752',
      email: 'sribhog2026@gmail.com',
      address: 'Sri Matha Complex, Shop Nos. 4 & 5, Ground Floor, Anekal Main Road, Madapatna, Vaddarapalya, Haragadde, Jigani, Bengaluru, Karnataka 560105',
      operatingHours: '9:00 AM – 10:00 PM (Daily)',
      deliveryRadiusKm: '8',
      deliveryFee: '50',
      minOrderValue: '500',
      freeDeliveryAbove: '1000',
      upiId: 'vyapar.171295050225@hdfcbank',
      upiMerchantName: 'RAJSHREE SWEETS AND SNACKS',
      isStoreOpen: 'true',
    };
    const insertSetting = db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)');
    for (const [key, value] of Object.entries(defaults)) {
      insertSetting.run(key, value);
    }
  }

  // Default Admin User (admin / rajshree-admin-2026)
  const existingAdmin = db.prepare('SELECT COUNT(*) as count FROM admin_users').get() as { count: number };
  if (existingAdmin.count === 0) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = hashPassword('rajshree-admin-2026', salt);
    db.prepare('INSERT INTO admin_users (id, username, password_hash, salt, role, created_at) VALUES (?, ?, ?, ?, ?, ?)')
      .run('admin-1', 'admin', hash, salt, 'admin', new Date().toISOString());
  }

  // Seed Products if table is empty
  const existingProducts = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };
  if (existingProducts.count === 0) {
    seedProductsData(db);
  }
}

// Curated high quality authentic imagery mapping for popular Indian sweets & snacks
const POPULAR_IMAGES: Record<string, string> = {
  'kaju-katli': 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
  'gulab-jamun': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
  'kala-jamun': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
  'dry-jamun': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
  'rasgulla': 'https://images.unsplash.com/photo-1605197148560-eb0df046bc25?auto=format&fit=crop&w=600&q=80',
  'rajbhog': 'https://images.unsplash.com/photo-1605197148560-eb0df046bc25?auto=format&fit=crop&w=600&q=80',
  'rasmalai': 'https://images.unsplash.com/photo-1605197148560-eb0df046bc25?auto=format&fit=crop&w=600&q=80',
  'motichur-laddu': 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
  'besan-laddu': 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
  'boondi-laddu': 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
  'mysore-pak': 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
  'milk-cake': 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
  'samosa': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
  'mini-samosa': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
  'dhokla': 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80',
  'pav-bhaji': 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80',
  'chola-bhatura': 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
  'poori-sabzi': 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
  'dahi-bhalla': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
  'dal-kachori': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
  'onion-kachori': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
  'bhakarwadi': 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80',
  'chakli': 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80',
  'gajar-ka-halwa': 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
  'ghevar': 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
};

const CATEGORY_DEFAULT_IMAGES: Record<CategoryType, string> = {
  SWEETS: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
  NAMKEEN: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80',
  SNACKS: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
  ACCOMPANIMENTS: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
};

function seedProductsData(db: DatabaseSync) {
  const items = seedProductsRaw as any[];
  if (!items || !Array.isArray(items) || items.length === 0) {
    console.warn('seedProductsRaw is empty, skipping product seed');
    return;
  }

  const insert = db.prepare(`
    INSERT INTO products (id, sl_no, name, slug, category, unit, price, image, description, in_stock, featured)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const featuredSlNos = [1, 11, 14, 22, 62, 71, 76, 87, 89, 102, 104, 109, 127, 129, 134];

  for (const item of items) {
    const slug = item.slug;
    const cat = item.category as CategoryType;
    const image = `/images/products/${slug}.jpg`;
    const isFeatured = featuredSlNos.includes(item.slNo) ? 1 : 0;
    const desc = `${item.name} freshly prepared using authentic traditional recipes and premium ingredients at Rajshree Sweets & Snacks.`;

    insert.run(
      item.id,
      item.slNo,
      item.name,
      slug,
      item.category,
      item.unit,
      item.price,
      image,
      desc,
      1,
      isFeatured
    );
  }
}

// Helper query functions
export function getProducts(options: { category?: string; search?: string; inStockOnly?: boolean; featuredOnly?: boolean } = {}): Product[] {
  const db = getDb();
  let query = 'SELECT * FROM products WHERE 1=1';
  const params: any[] = [];

  if (options.category && options.category !== 'ALL') {
    query += ' AND category = ?';
    params.push(options.category);
  }

  if (options.search) {
    query += ' AND name LIKE ?';
    params.push(`%${options.search}%`);
  }

  if (options.inStockOnly) {
    query += ' AND in_stock = 1';
  }

  if (options.featuredOnly) {
    query += ' AND featured = 1';
  }

  query += ' ORDER BY sl_no ASC';

  const rows = db.prepare(query).all(...params) as any[];
  return rows.map(r => ({
    id: r.id,
    slNo: r.sl_no,
    name: r.name,
    slug: r.slug,
    category: r.category,
    unit: r.unit,
    price: r.price,
    image: r.image,
    description: r.description,
    inStock: Boolean(r.in_stock),
    featured: Boolean(r.featured),
  }));
}

export function getProductBySlug(slug: string): Product | null {
  const db = getDb();
  const r = db.prepare('SELECT * FROM products WHERE slug = ?').get(slug) as any;
  if (!r) return null;
  return {
    id: r.id,
    slNo: r.sl_no,
    name: r.name,
    slug: r.slug,
    category: r.category,
    unit: r.unit,
    price: r.price,
    image: r.image,
    description: r.description,
    inStock: Boolean(r.in_stock),
    featured: Boolean(r.featured),
  };
}

export function getProductById(id: string): Product | null {
  const db = getDb();
  const r = db.prepare('SELECT * FROM products WHERE id = ?').get(id) as any;
  if (!r) return null;
  return {
    id: r.id,
    slNo: r.sl_no,
    name: r.name,
    slug: r.slug,
    category: r.category,
    unit: r.unit,
    price: r.price,
    image: r.image,
    description: r.description,
    inStock: Boolean(r.in_stock),
    featured: Boolean(r.featured),
  };
}

export function updateProduct(id: string, updates: Partial<Product>): boolean {
  const db = getDb();
  const fields: string[] = [];
  const params: any[] = [];

  if (updates.name !== undefined) { fields.push('name = ?'); params.push(updates.name); }
  if (updates.price !== undefined) { fields.push('price = ?'); params.push(updates.price); }
  if (updates.category !== undefined) { fields.push('category = ?'); params.push(updates.category); }
  if (updates.unit !== undefined) { fields.push('unit = ?'); params.push(updates.unit); }
  if (updates.image !== undefined) { fields.push('image = ?'); params.push(updates.image); }
  if (updates.description !== undefined) { fields.push('description = ?'); params.push(updates.description); }
  if (updates.inStock !== undefined) { fields.push('in_stock = ?'); params.push(updates.inStock ? 1 : 0); }
  if (updates.featured !== undefined) { fields.push('featured = ?'); params.push(updates.featured ? 1 : 0); }

  if (fields.length === 0) return false;

  params.push(id);
  const result = db.prepare(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`).run(...params);
  return result.changes > 0;
}

export function createProduct(product: Omit<Product, 'id' | 'slNo'> & { slNo?: number }): Product {
  const db = getDb();
  const id = `prod-${Date.now()}`;
  const maxSl = (db.prepare('SELECT MAX(sl_no) as maxSl FROM products').get() as any)?.maxSl || 135;
  const slNo = product.slNo || maxSl + 1;

  db.prepare(`
    INSERT INTO products (id, sl_no, name, slug, category, unit, price, image, description, in_stock, featured)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    slNo,
    product.name,
    product.slug,
    product.category,
    product.unit,
    product.price,
    product.image || CATEGORY_DEFAULT_IMAGES[product.category],
    product.description || `${product.name} at Rajshree Sweets & Snacks`,
    product.inStock ? 1 : 0,
    product.featured ? 1 : 0
  );

  return getProductById(id)!;
}

export function deleteProduct(id: string): boolean {
  const db = getDb();
  const res = db.prepare('DELETE FROM products WHERE id = ?').run(id);
  return res.changes > 0;
}

// Order Management
export function createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'orderRef'>, items: OrderItem[]): Order {
  const id = `ord-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randSuffix = Math.floor(1000 + Math.random() * 9000);
  const orderRef = `RSS-${dateStr}-${randSuffix}`;
  const now = new Date().toISOString();

  const createdOrder: Order = {
    id,
    orderRef,
    customerName: order.customerName,
    customerPhone: order.customerPhone,
    customerEmail: order.customerEmail || '',
    fulfilmentType: order.fulfilmentType,
    address: order.address || '',
    landmark: order.landmark || '',
    pincode: order.pincode || '',
    notes: order.notes || '',
    subtotal: order.subtotal,
    deliveryFee: order.deliveryFee,
    totalAmount: order.totalAmount,
    status: order.status,
    paymentStatus: order.paymentStatus,
    paymentUtr: order.paymentUtr || '',
    paymentVerifiedAt: order.paymentVerifiedAt || '',
    createdAt: now,
    updatedAt: now,
    items: items.map((it, idx) => ({
      id: it.id || `item-${Date.now()}-${idx}`,
      productId: it.productId,
      productName: it.productName,
      variantLabel: it.variantLabel,
      unitPrice: it.unitPrice,
      quantity: it.quantity,
      itemTotal: it.itemTotal,
    })),
  };

  // Cache in server memory for instant lookup and serverless resilience
  orderMemoryStore.set(id, createdOrder);
  orderMemoryStore.set(orderRef, createdOrder);

  // Attempt database persistence (gracefully non-fatal if database is read-only)
  try {
    const db = getDb();
    db.prepare(`
      INSERT INTO orders (
        id, order_ref, customer_name, customer_phone, customer_email,
        fulfilment_type, address, landmark, pincode, notes,
        subtotal, delivery_fee, total_amount, status, payment_status,
        payment_utr, payment_verified_at, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      orderRef,
      order.customerName,
      order.customerPhone,
      order.customerEmail || '',
      order.fulfilmentType,
      order.address || '',
      order.landmark || '',
      order.pincode || '',
      order.notes || '',
      order.subtotal,
      order.deliveryFee,
      order.totalAmount,
      order.status,
      order.paymentStatus,
      order.paymentUtr || '',
      order.paymentVerifiedAt || '',
      now,
      now
    );

    const insertItem = db.prepare(`
      INSERT INTO order_items (id, order_id, product_id, product_name, variant_label, unit_price, quantity, item_total)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const item of createdOrder.items || []) {
      const itemId = item.id || `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      insertItem.run(
        itemId,
        id,
        item.productId,
        item.productName,
        item.variantLabel,
        item.unitPrice,
        item.quantity,
        item.itemTotal
      );
    }
  } catch (err: any) {
    console.warn('SQLite order insert warning (preserved in server memory):', err?.message || err);
  }

  return createdOrder;
}

export function getOrderById(id: string): Order | null {
  if (orderMemoryStore.has(id)) {
    return orderMemoryStore.get(id)!;
  }

  try {
    const db = getDb();
    const r = db.prepare('SELECT * FROM orders WHERE id = ?').get(id) as any;
    if (!r) return null;
    const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(id) as any[];

    return {
      id: r.id,
      orderRef: r.order_ref,
      customerName: r.customer_name,
      customerPhone: r.customer_phone,
      customerEmail: r.customer_email,
      fulfilmentType: r.fulfilment_type,
      address: r.address,
      landmark: r.landmark,
      pincode: r.pincode,
      notes: r.notes,
      subtotal: r.subtotal,
      deliveryFee: r.delivery_fee,
      totalAmount: r.total_amount,
      status: r.status,
      paymentStatus: r.payment_status,
      paymentUtr: r.payment_utr,
      paymentVerifiedAt: r.payment_verified_at,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
      items: items.map(it => ({
        id: it.id,
        productId: it.product_id,
        productName: it.product_name,
        variantLabel: it.variant_label,
        unitPrice: it.unit_price,
        quantity: it.quantity,
        itemTotal: it.item_total,
      })),
    };
  } catch (e) {
    return null;
  }
}

export function getOrderByRef(orderRef: string): Order | null {
  if (orderMemoryStore.has(orderRef)) {
    return orderMemoryStore.get(orderRef)!;
  }

  try {
    const db = getDb();
    const r = db.prepare('SELECT * FROM orders WHERE order_ref = ?').get(orderRef) as any;
    if (!r) return null;
    return getOrderById(r.id);
  } catch (e) {
    return null;
  }
}

export function getAllOrders(limit = 100): Order[] {
  const map = new Map<string, Order>();

  // Add memory orders first
  for (const o of orderMemoryStore.values()) {
    map.set(o.id, o);
  }

  try {
    const db = getDb();
    const rows = db.prepare('SELECT * FROM orders ORDER BY created_at DESC LIMIT ?').all(limit) as any[];
    for (const r of rows) {
      if (!map.has(r.id)) {
        const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(r.id) as any[];
        map.set(r.id, {
          id: r.id,
          orderRef: r.order_ref,
          customerName: r.customer_name,
          customerPhone: r.customer_phone,
          customerEmail: r.customer_email,
          fulfilmentType: r.fulfilment_type,
          address: r.address,
          landmark: r.landmark,
          pincode: r.pincode,
          notes: r.notes,
          subtotal: r.subtotal,
          deliveryFee: r.delivery_fee,
          totalAmount: r.total_amount,
          status: r.status,
          paymentStatus: r.payment_status,
          paymentUtr: r.payment_utr,
          paymentVerifiedAt: r.payment_verified_at,
          createdAt: r.created_at,
          updatedAt: r.updated_at,
          items: items.map(it => ({
            id: it.id,
            productId: it.product_id,
            productName: it.product_name,
            variantLabel: it.variant_label,
            unitPrice: it.unit_price,
            quantity: it.quantity,
            itemTotal: it.item_total,
          })),
        });
      }
    }
  } catch (e) {
    console.warn('getAllOrders DB query warning:', e);
  }

  const list = Array.from(map.values());
  list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return list.slice(0, limit);
}

export function updateOrderStatus(
  orderId: string,
  status: string,
  paymentStatus?: string,
  paymentUtr?: string
): Order | null {
  const now = new Date().toISOString();

  // Update in memory cache
  const cached = orderMemoryStore.get(orderId);
  if (cached) {
    cached.status = status as any;
    cached.updatedAt = now;
    if (paymentStatus) {
      cached.paymentStatus = paymentStatus as any;
      if (paymentStatus === 'VERIFIED') cached.paymentVerifiedAt = now;
    }
    if (paymentUtr !== undefined) cached.paymentUtr = paymentUtr;
    orderMemoryStore.set(orderId, cached);
    if (cached.orderRef) orderMemoryStore.set(cached.orderRef, cached);
  }

  try {
    const db = getDb();
    const fields = ['status = ?', 'updated_at = ?'];
    const params: any[] = [status, now];

    if (paymentStatus) {
      fields.push('payment_status = ?');
      params.push(paymentStatus);
      if (paymentStatus === 'VERIFIED') {
        fields.push('payment_verified_at = ?');
        params.push(now);
      }
    }

    if (paymentUtr !== undefined) {
      fields.push('payment_utr = ?');
      params.push(paymentUtr);
    }

    params.push(orderId);
    db.prepare(`UPDATE orders SET ${fields.join(', ')} WHERE id = ?`).run(...params);
    return getOrderById(orderId);
  } catch (e) {
    console.warn('updateOrderStatus DB update warning:', e);
    return cached || null;
  }
}

// Store Settings
export function getSettings(): StoreSettings {
  const db = getDb();
  const rows = db.prepare('SELECT key, value FROM settings').all() as { key: string; value: string }[];
  const map = new Map<string, string>();
  for (const r of rows) map.set(r.key, r.value);

  return {
    storeName: map.get('storeName') || 'Rajshree Sweets & Snacks',
    phone: map.get('phone') || '+91 8050832752',
    email: map.get('email') || 'sribhog2026@gmail.com',
    address: map.get('address') || 'Sri Matha Complex, Shop Nos. 4 & 5, Ground Floor, Anekal Main Road, Madapatna, Vaddarapalya, Haragadde, Jigani, Bengaluru, Karnataka 560105',
    operatingHours: map.get('operatingHours') || '9:00 AM – 10:00 PM (Daily)',
    deliveryRadiusKm: Number(map.get('deliveryRadiusKm')) || 8,
    deliveryFee: Number(map.get('deliveryFee')) || 50,
    minOrderValue: Number(map.get('minOrderValue')) || 500,
    freeDeliveryAbove: Number(map.get('freeDeliveryAbove')) || 1000,
    upiId: map.get('upiId') || 'vyapar.171295050225@hdfcbank',
    upiMerchantName: map.get('upiMerchantName') || 'RAJSHREE SWEETS AND SNACKS',
    isStoreOpen: map.get('isStoreOpen') === 'true',
  };
}

export function updateSettings(newSettings: Partial<StoreSettings>): StoreSettings {
  const db = getDb();
  const stmt = db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)');
  for (const [key, val] of Object.entries(newSettings)) {
    stmt.run(key, String(val));
  }
  return getSettings();
}

// Authentication
export function verifyAdminCredentials(username: string, pass: string): boolean {
  const db = getDb();
  const user = db.prepare('SELECT * FROM admin_users WHERE username = ?').get(username) as any;
  if (!user) return false;
  const computedHash = hashPassword(pass, user.salt);
  return crypto.timingSafeEqual(Buffer.from(computedHash), Buffer.from(user.password_hash));
}

export function updateAdminPassword(username: string, newPass: string): boolean {
  const db = getDb();
  const user = db.prepare('SELECT * FROM admin_users WHERE username = ?').get(username) as any;
  if (!user) return false;
  const newSalt = crypto.randomBytes(16).toString('hex');
  const newHash = hashPassword(newPass, newSalt);
  db.prepare('UPDATE admin_users SET password_hash = ?, salt = ? WHERE username = ?').run(newHash, newSalt, username);
  return true;
}

// Summary Statistics for Admin
export function getStats() {
  const db = getDb();
  const totalOrders = (db.prepare('SELECT COUNT(*) as c FROM orders').get() as any).c;
  const totalRevenue = (db.prepare('SELECT SUM(total_amount) as s FROM orders WHERE payment_status = "VERIFIED"').get() as any).s || 0;
  const pendingVerification = (db.prepare('SELECT COUNT(*) as c FROM orders WHERE payment_status = "PENDING"').get() as any).c;
  const outForDelivery = (db.prepare('SELECT COUNT(*) as c FROM orders WHERE status = "Out for Delivery"').get() as any).c;
  const totalProducts = (db.prepare('SELECT COUNT(*) as c FROM products').get() as any).c;

  return {
    totalOrders,
    totalRevenue,
    pendingVerification,
    outForDelivery,
    totalProducts,
  };
}
