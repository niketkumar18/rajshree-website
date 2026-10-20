import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Refund & Cancellation Policy | Rajshree Sweets & Snacks',
  description: 'Policies regarding order cancellations, replacements, and refunds for food and sweet items.',
};

export default function RefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-stone-200 pb-4">
        <h1 className="text-3xl font-black text-stone-900 font-serif">Refund & Cancellation Policy</h1>
        <p className="text-xs text-stone-500 mt-1">Rajshree Sweets & Snacks • Jigani, Bengaluru</p>
      </div>

      <div className="prose prose-stone max-w-none text-sm text-stone-700 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-stone-900">1. Nature of Perishable Food Items</h2>
          <p>
            Due to the perishable nature of fresh traditional Indian sweets, milk products, and cooked hot snacks, items once dispatched or collected cannot be returned for restock.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-stone-900">2. Order Cancellations</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Before Kitchen Preparation:</strong> You may cancel your order by calling our shop (+91 8050832752) within 10 minutes of order placement. If payment was verified, a full refund will be processed back to your original source UPI account.</li>
            <li><strong>After Dispatch or Boxing:</strong> Once custom packaging or hot food frying has commenced, cancellation cannot be accepted.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-stone-900">3. Damaged, Missing, or Incorrect Items</h2>
          <p>
            In the rare event that an item is damaged in transit, missing from the parcel, or incorrect:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Please contact us within <strong>2 hours of delivery</strong> with a photo of the received parcel.</li>
            <li>We will promptly dispatch a replacement or issue an immediate UPI refund for the affected item.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-stone-900">4. Processing of Refunds</h2>
          <p>
            Approved refunds are credited directly to your paying UPI ID or bank account within 24–48 business hours. For assistance, reach us at <a href="mailto:sribhog2026@gmail.com" className="text-brand-700 underline">sribhog2026@gmail.com</a> or call <strong>+91 8050832752</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
