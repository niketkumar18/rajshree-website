import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DatabaseSync } from 'node:sqlite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const SEED_FILE = path.join(ROOT, 'src', 'data', 'seed-products.json');
const DB_FILE = path.join(ROOT, 'src', 'data', 'rajshree.db');
const IMAGES_DIR = path.join(ROOT, 'public', 'images', 'products');

async function downloadImage(url, destPath) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      },
      redirect: 'follow',
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(destPath, buffer);
    return { success: true, bytes: buffer.length };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export async function processOverrides(overridesData) {
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }

  const rawSeed = fs.readFileSync(SEED_FILE, 'utf-8');
  const products = JSON.parse(rawSeed);

  const productMap = new Map();
  for (const p of products) {
    productMap.set(p.id, p);
  }

  let downloadedCount = 0;
  let failedCount = 0;
  let updatedCount = 0;

  const entries = Object.entries(overridesData);
  console.log(`\n📦 Processing ${entries.length} product overrides...`);

  for (const [prodId, data] of entries) {
    const p = productMap.get(prodId);
    if (!p) {
      console.warn(`⚠️ Product ID ${prodId} not found in catalogue, skipping`);
      continue;
    }

    let modified = false;

    // Check if image is an external URL
    if (data.image && typeof data.image === 'string' && data.image.startsWith('http')) {
      const slug = p.slug || p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const filename = `${slug}.jpg`;
      const targetPath = path.join(IMAGES_DIR, filename);

      console.log(`⬇️ Downloading image for [${p.name}] from: ${data.image.substring(0, 70)}...`);
      const result = await downloadImage(data.image, targetPath);

      if (result.success) {
        console.log(`   ✅ Saved to /images/products/${filename} (${(result.bytes / 1024).toFixed(1)} KB)`);
        p.image = `/images/products/${filename}`;
        modified = true;
        downloadedCount++;
      } else {
        console.error(`   ❌ Failed to download for [${p.name}]: ${result.error}`);
        // Keep the URL as fallback if download failed
        p.image = data.image;
        modified = true;
        failedCount++;
      }
    } else if (data.image && typeof data.image === 'string' && data.image.trim()) {
      p.image = data.image.trim();
      modified = true;
    }

    // Apply any price/stock/detail updates
    if (data.price !== undefined && !isNaN(Number(data.price))) {
      p.price = Number(data.price);
      modified = true;
    }
    if (data.inStock !== undefined) {
      p.inStock = Boolean(data.inStock);
      modified = true;
    }
    if (data.description !== undefined) {
      p.description = data.description;
      modified = true;
    }
    if (data.unit) {
      p.unit = data.unit;
      modified = true;
    }
    if (data.category) {
      p.category = data.category;
      modified = true;
    }

    if (modified) {
      updatedCount++;
    }
  }

  // Save back to seed-products.json
  fs.writeFileSync(SEED_FILE, JSON.stringify(products, null, 2) + '\n');
  console.log(`\n💾 Saved updated seed-products.json (${products.length} products)`);

  // Update SQLite database if exists
  if (fs.existsSync(DB_FILE)) {
    try {
      const db = new DatabaseSync(DB_FILE);
      const updateStmt = db.prepare(`
        UPDATE products
        SET price = ?, in_stock = ?, image = ?, description = ?, unit = ?, category = ?
        WHERE id = ?
      `);

      for (const p of products) {
        updateStmt.run(
          p.price,
          p.inStock ? 1 : 0,
          p.image || null,
          p.description || null,
          p.unit,
          p.category,
          p.id
        );
      }
      console.log(`💾 Synchronized src/data/rajshree.db SQLite database.`);
    } catch (dbErr) {
      console.warn(`Could not update SQLite DB: ${dbErr.message}`);
    }
  }

  console.log(`\n🎉 Summary:`);
  console.log(`   • Products updated: ${updatedCount}`);
  console.log(`   • Images downloaded locally: ${downloadedCount}`);
  console.log(`   • Images failed: ${failedCount}`);

  return { updatedCount, downloadedCount, failedCount };
}

// CLI runner if executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const arg = process.argv[2];
  if (!arg) {
    console.log('Usage: node scripts/sync-images.mjs <path-to-overrides.json>');
    process.exit(1);
  }

  const raw = fs.readFileSync(arg, 'utf-8');
  const data = JSON.parse(raw);
  processOverrides(data).then(() => {
    console.log('Done!');
  });
}
