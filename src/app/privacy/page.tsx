import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Rajshree Sweets & Snacks',
  description: 'Privacy Policy and customer data protection guidelines for Rajshree Sweets & Snacks (sribhog.in).',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-stone-200 pb-4">
        <h1 className="text-3xl font-black text-stone-900 font-serif">Privacy Policy</h1>
        <p className="text-xs text-stone-500 mt-1">Last Updated: October 2026 • Rajshree Sweets & Snacks (sribhog.in)</p>
      </div>

      <div className="prose prose-stone max-w-none text-sm text-stone-700 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-stone-900">1. Introduction</h2>
          <p>
            Rajshree Sweets & Snacks (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the online shopping website <strong>https://sribhog.in/</strong>. We respect your privacy and are committed to protecting any personal information collected when you order sweets, snacks, or contact our store.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-stone-900">2. Information We Collect</h2>
          <p>We only collect information strictly necessary to fulfill your food orders and provide customer support:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Customer Name & Mobile Phone Number:</strong> To coordinate order preparation, delivery, or store pickup.</li>
            <li><strong>Delivery Address & Pincode:</strong> When you select local delivery within our Jigani service area.</li>
            <li><strong>Email Address:</strong> When voluntarily provided for electronic order receipts.</li>
            <li><strong>UPI Transaction Reference (UTR):</strong> If provided by you to assist manual payment verification against our HDFC SmartHub Vyapar terminal.</li>
          </ul>
          <p className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900">
            <strong>Payment Credential Security:</strong> We never collect, process, or store UPI PINs, net banking passwords, OTPs, or debit/credit card CVVs. Payments are made through your own banking/UPI apps by scanning our official QR code.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-stone-900">3. How We Use Your Information</h2>
          <p>Your details are used solely for:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Processing, preparing, and packaging your food items.</li>
            <li>Communicating order status, delivery progress, or pickup readiness.</li>
            <li>Addressing customer inquiries or fulfilling accounting requirements under Indian tax regulations.</li>
          </ul>
          <p>We do not sell, rent, or trade your personal data to third-party marketing companies.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-stone-900">4. Contact & Data Inquiries</h2>
          <p>For any privacy-related queries, please write to our registered email:</p>
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs">
            <p><strong>Rajshree Sweets & Snacks</strong></p>
            <p>Sri Matha Complex, Shop Nos. 4 & 5, Ground Floor, Anekal Main Road, Madapatna, Vaddarapalya, Haragadde, Jigani, Bengaluru, Karnataka 560105</p>
            <p className="mt-1">Email: <a href="mailto:sribhog2026@gmail.com" className="text-brand-700 underline">sribhog2026@gmail.com</a></p>
            <p>Phone: +91 8050832752</p>
          </div>
        </section>
      </div>
    </div>
  );
}
