import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions | Rajshree Sweets & Snacks',
  description: 'Terms of service and purchasing conditions for Rajshree Sweets & Snacks.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-stone-200 pb-4">
        <h1 className="text-3xl font-black text-stone-900 font-serif">Terms & Conditions</h1>
        <p className="text-xs text-stone-500 mt-1">Last Updated: October 2026 • Rajshree Sweets & Snacks (sribhog.in)</p>
      </div>

      <div className="prose prose-stone max-w-none text-sm text-stone-700 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-stone-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or ordering through <strong>https://sribhog.in/</strong>, you agree to these Terms and Conditions. If you disagree with any part of these terms, please contact our physical retail store directly.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-stone-900">2. Products, Pricing & Availability</h2>
          <p>
            All products listed on this website are freshly prepared traditional sweets, savories, and hot snacks. Prices are listed in <strong>Indian Rupees (INR)</strong> and reflect the official shop catalogue.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>We reserve the right to modify prices or discontinue items based on daily kitchen preparation and raw material availability.</li>
            <li>In the event an ordered item becomes unavailable before fulfillment, our staff will contact you to offer an authentic substitution or a refund.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-stone-900">3. Orders & Payment Verification</h2>
          <p>
            Orders placed on our website are initially categorized as <strong>Pending Payment</strong> or <strong>Payment Review</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Payment is processed using our official HDFC SmartHub Vyapar UPI QR code.</li>
            <li>Submission of an order or entering a transaction reference does not automatically confirm payment. Confirmation occurs only when store staff verify receipt of funds on our shop terminal.</li>
            <li>Unpaid or unverified orders may be canceled if customer contact cannot be established.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-stone-900">4. Governing Law</h2>
          <p>
            These terms are governed by the laws of Karnataka, India. Any disputes shall be subject to the exclusive jurisdiction of the competent courts in Bengaluru, Karnataka.
          </p>
        </section>
      </div>
    </div>
  );
}
