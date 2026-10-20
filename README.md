# Rajshree Sweets & Snacks — E-Commerce Web Application
**Official Website for:** [https://sribhog.in/](https://sribhog.in/)  
**Store Location:** Sri Matha Complex, Shop Nos. 4 & 5, Ground Floor, Anekal Main Road, Madapatna, Vaddarapalya, Haragadde, Jigani, Bengaluru, Karnataka 560105  
**Phone:** +91 8050832752 | **Email:** [sribhog2026@gmail.com](mailto:sribhog2026@gmail.com)  
**Operating Hours:** 9:00 AM – 10:00 PM (Daily)

---

## 1. Overview & Architecture

This application is a production-grade, full-stack e-commerce web application engineered specifically for **Rajshree Sweets & Snacks**. It provides a fast, mobile-first shopping experience with zero recurring payment gateway fees, instant UPI QR checkout, and an integrated staff administration dashboard.

### Key Highlights:
- **100% Faithful Catalogue (133 items):** Sourced directly from the official store PDF catalogue across 4 categories: *Sweets (98)*, *Namkeen (24)*, *Accompaniments (2)*, and *Hot Snacks (9)*.
- **Untouched HDFC SmartHub Vyapar QR:** Uses the exact verified QR code image without alteration (`vyapar.171295050225@hdfcbank`, Merchant: RAJSHREE SWEETS AND SNACKS, Terminal: 36798691).
- **Flexible Weight & Quantity Pricing:** Proportional, server-validated pricing for sweets sold by weight (250g, 500g, 1 kg) and items sold per piece or per plate.
- **Fulfilment Options:** Local delivery within Jigani (8 km radius, ₹50 fee, min order ₹500, free above ₹1,000) and Counter Store Pickup.
- **Zero Payment Gateway Commissions:** Direct customer-to-merchant UPI payments incur 0% gateway deductions.
- **Protected Staff Dashboard:** Order processing, manual UPI payment verification with UTR recording, live stock/price toggling, and data export.
- **Zero-Recurring-Cost Infrastructure:** Can be hosted 100% free on Vercel Hobby tier connected to the GoDaddy custom domain `sribhog.in`.

---

## 2. Technology Stack

- **Framework:** Next.js 15 (App Router, React 19, TypeScript)
- **Styling:** Tailwind CSS (Custom Indian confectionery warm amber, saffron, and pure vegetarian emerald badges)
- **Database & Persistence:** Node.js native SQLite (`node:sqlite`) with automatic schema migration and seed initialization
- **Icons:** Lucide React
- **Authentication:** Cryptographic HMAC signed session cookies with scrypt password hashing
- **Testing:** Comprehensive automated end-to-end test suite (`test-e2e.mjs`)

---

## 3. Directory Structure

```text
rajshree-sweets/
├── public/
│   ├── docs/
│   │   └── rajshree-catalogue.pdf   # Source catalogue PDF
│   └── images/
│       └── hdfc-upi-qr.jpg          # Authentic HDFC SmartHub UPI QR
├── src/
│   ├── app/
│   │   ├── admin/                   # Secure staff admin dashboard
│   │   ├── api/
│   │   │   ├── admin/               # Protected admin API endpoints (auth, orders, products, settings, export)
│   │   │   ├── contact/             # Honeypot-protected contact form API
│   │   │   └── orders/              # Server-side price-validated order submission
│   │   ├── about/                   # Grounded About Us page
│   │   ├── checkout/                # Checkout with HDFC UPI QR display & fulfilment selection
│   │   ├── contact/                 # Contact & store location page
│   │   ├── delivery-policy/         # Compliant delivery & pickup terms
│   │   ├── order-confirmation/      # Order receipt with reference & 1-click WhatsApp link
│   │   ├── privacy/                 # Indian e-commerce compliant Privacy Policy
│   │   ├── product/[slug]/          # Dynamic product detail page with pack weight selectors
│   │   ├── refund-policy/           # Compliant refund & cancellation policy
│   │   ├── shop/                    # Filterable 133-item catalogue with real-time search
│   │   ├── terms/                   # Terms and Conditions
│   │   ├── globals.css              # Custom styling & veg badge indicators
│   │   ├── layout.tsx               # Root layout with CartProvider, Header, Footer
│   │   └── page.tsx                 # Appetizing storefront homepage
│   ├── components/
│   │   ├── CartDrawer.tsx           # Slide-over cart with free delivery progress
│   │   ├── Footer.tsx               # Verified business footer with policies & contacts
│   │   ├── Header.tsx               # Sticky navbar with mobile menu & cart trigger
│   │   └── ProductCard.tsx          # Card with weight selector & instant add-to-cart
│   ├── context/
│   │   └── CartContext.tsx          # LocalStorage-backed cart state
│   ├── data/
│   │   ├── seed-products.json       # Parsed source catalogue seed (133 products)
│   │   └── rajshree.db              # SQLite persistent database (auto-created)
│   └── lib/
│       ├── auth.ts                  # Admin session verification & HMAC utilities
│       ├── db.ts                    # SQLite database queries & seed loader
│       └── types.ts                 # Full TypeScript definitions
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── test-e2e.mjs                     # Automated test suite (30/30 tests)
```

---

## 4. Local Setup & Running

### Prerequisites
- Node.js 20+ (Node.js 22 or 26 recommended for built-in `node:sqlite`)
- npm 10+

### Installation & Execution
```bash
# 1. Navigate to the project directory
cd rajshree-sweets

# 2. Install dependencies (if not already installed)
npm install

# 3. Run the automated test suite
node --experimental-strip-types test-e2e.mjs

# 4. Build for production
npm run build

# 5. Start the production server
npm start
# Server will run on http://localhost:3000
```

---

## 5. Staff Admin Dashboard

- **URL:** `http://localhost:3000/admin` (or `https://sribhog.in/admin`)
- **Default Username:** `admin`
- **Default Password:** `rajshree-admin-2026`
*(Password can be updated directly in the database or via environment variable).*

### Capabilities:
1. **Orders Management:** Real-time list of all incoming orders with customer contacts, delivery addresses, item breakdowns, and current status.
2. **UPI Payment Verification:** One-click modal to verify payment against your shop HDFC SmartHub Vyapar terminal, record the bank UTR reference, and transition the order to `Confirmed`.
3. **Product Catalogue Management:** Toggle any product In Stock / Out of Stock instantly, edit prices directly inline, or add new seasonal sweets.
4. **Fulfilment & Store Settings:** Configure operating hours, delivery radius, delivery fee, minimum order value, and free delivery threshold.
5. **Data Backups & Export:** One-click JSON export of all orders and products.

---

## 6. Deployment Guide for GoDaddy Domain `sribhog.in`

### Step 1: Check What You Own on GoDaddy
1. Log into your [GoDaddy Account](https://account.godaddy.com/).
2. Go to **My Products**.
3. Check the sections:
   - If you see **Domains** with `sribhog.in`, you have **Domain Registration**.
   - If you also see **Web Hosting** (cPanel / Linux Hosting / WordPress Hosting), you have a hosting plan included.
   - If you **only have Domain Registration**, use the recommended **Zero-Cost Deployment (Vercel)** below.

---

### Step 2: Recommended Zero-Cost Deployment (Vercel)
Vercel is the creator of Next.js and offers a 100% free Hobby tier with global CDN, automatic HTTPS SSL certificates, and zero server maintenance fees.

1. Create a free account at [vercel.com](https://vercel.com).
2. Install the Vercel CLI locally or push this repository to GitHub/GitLab.
   ```bash
   npm i -g vercel
   cd rajshree-sweets
   vercel
   ```
3. Set the production environment variables in the Vercel project dashboard:
   - `ADMIN_SESSION_SECRET`: A long random secret string (e.g. `rajshree-super-secret-key-36798691`)
   - `NODE_ENV`: `production`
4. Deploy to production:
   ```bash
   vercel --prod
   ```

---

### Step 3: Connect `sribhog.in` and `www.sribhog.in` on GoDaddy DNS

> [!CAUTION]
> **Protect Existing Email Delivery:** Before making DNS modifications, inspect your GoDaddy DNS records. **DO NOT** delete or modify any existing `MX`, `SPF`, `DKIM`, or `DMARC` records (such as Google Workspace or GoDaddy email). Only update the web records (`A` and `CNAME`) specified below.

In your **GoDaddy DNS Management** for `sribhog.in`:

1. **Root Domain (`sribhog.in`):**
   - Type: `A`
   - Name: `@`
   - Value: `76.76.21.21` (Vercel Anycast IP)
   - TTL: `1/2 Hour` (or Default)

2. **Subdomain (`www.sribhog.in`):**
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`
   - TTL: `1/2 Hour`

3. **In Vercel Domain Settings:**
   - Add `sribhog.in`
   - Add `www.sribhog.in` (redirects automatically to `https://sribhog.in`)

Vercel will verify DNS within 5 to 15 minutes and automatically issue a free Let's Encrypt SSL/TLS certificate for `https://sribhog.in/`.

---

## 7. Backup and Recovery Procedures

### Automatic Data Backups
- The database is stored at `src/data/rajshree.db`.
- All source products are safely preserved in `src/data/seed-products.json`.
- Staff can download an instant offline backup at any time from `/admin` under the **Data Export & Backups** tab (`/api/admin/export?type=orders` and `/api/admin/export?type=products`).

### Disaster Recovery
If the server or container is recreated:
- The application will automatically re-create the schema and populate all 133 source items from `seed-products.json`.
- To restore customer order history, simply place the backed-up `rajshree.db` into `src/data/` or import from the JSON export.
