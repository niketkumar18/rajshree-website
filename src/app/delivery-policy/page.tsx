import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Delivery & Store Pickup Policy | Rajshree Sweets & Snacks',
  description: 'Fulfilment parameters, local delivery zones, fees, and store pickup guidelines for Rajshree Sweets & Snacks in Jigani.',
};

export default function DeliveryPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-stone-200 pb-4">
        <h1 className="text-3xl font-black text-stone-900 font-serif">Delivery & Pickup Policy</h1>
        <p className="text-xs text-stone-500 mt-1">Rajshree Sweets & Snacks • Jigani, Bengaluru</p>
      </div>

      <div className="prose prose-stone max-w-none text-sm text-stone-700 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-stone-900">1. Service Area & Delivery Radius</h2>
          <p>
            We provide direct local delivery within a <strong>3-kilometer radius</strong> of our retail store in Jigani, Bengaluru. For orders beyond 3 km, deliveries are fulfilled via <strong>Porter, Dunzo, or similar delivery apps</strong> at actual fare.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Direct Service Area (within 3 km):</strong> Jigani Industrial Area, APC Circle, Haragadde, Madapatna, Vaddarapalya, and nearby neighborhoods.</li>
            <li><strong>Beyond 3 km:</strong> Dispatched via Porter or courier app. Customers can also arrange their own pickup.</li>
            <li><strong>Delivery Hours:</strong> Orders received between <strong>9:00 AM and 9:00 PM</strong> are processed for same-day delivery.</li>
            <li><strong>Estimated Delivery Time:</strong> Typical local delivery takes 30 to 60 minutes, depending on the distance and order preparation.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-stone-900">2. Delivery Fees & Free Delivery Threshold</h2>
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2 text-xs">
            <p><strong>Minimum Order for Delivery:</strong> ₹500</p>
            <p><strong>Standard Local Delivery Fee (within 3 km):</strong> ₹50</p>
            <p><strong>Free Delivery:</strong> Applied automatically on all orders of ₹1,000 or above within 3 km!</p>
            <p><strong>Beyond 3 km:</strong> Billed at actual fare via Porter or similar delivery app.</p>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-stone-900">3. Store Pickup (Counter Collection)</h2>
          <p>
            Customers may select <strong>Store Pickup</strong> during checkout to collect their freshly packed sweets directly from our store with <strong>zero delivery charge</strong> and <strong>no minimum order limit</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Pickup Location:</strong> Sri Matha Complex, Shop Nos. 4 & 5, Ground Floor, Anekal Main Road, Madapatna, Vaddarapalya, Haragadde, Jigani, Bengaluru, Karnataka 560105 (Near Vishal Mega Mart).</li>
            <li><strong>Collection Hours:</strong> 9:00 AM to 10:00 PM daily.</li>
            <li><strong>Readiness:</strong> Most pickup orders are packed and ready within 20 to 30 minutes. Please quote your Order Reference upon arrival.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
