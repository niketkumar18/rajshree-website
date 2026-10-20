import React from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';
import { getSettings } from '@/lib/db';
import ContactForm from './ContactForm';

export const metadata = {
  title: 'Contact Us & Store Location | Rajshree Sweets & Snacks',
  description:
    'Contact Rajshree Sweets & Snacks located at Sri Matha Complex, Jigani, Bengaluru. Reach us via phone +91 8050832752 or email sribhog2026@gmail.com.',
};

export default function ContactPage() {
  const settings = getSettings();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="border-b border-amber-100 pb-6 text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-700">Get in Touch</span>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 font-serif mt-1">
          Contact Rajshree Sweets & Snacks
        </h1>
        <p className="text-sm text-stone-500 mt-2">
          We welcome your questions, bulk orders, event catering inquiries, and feedback.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Contact Info & Map Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-stone-900 font-serif">
              Store Information
            </h2>

            <div className="space-y-4 text-xs text-stone-600">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-brand-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-stone-800 text-sm">Shop Address</div>
                  <p className="leading-relaxed text-stone-600 mt-0.5">{settings.address}</p>
                  <p className="text-[11px] text-brand-800 font-medium mt-1">
                    Landmark: Near Vishal Mega Mart / APC Circle
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-brand-700 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-stone-800 text-sm">Operating Hours</div>
                  <p className="text-stone-700 font-medium mt-0.5">{settings.operatingHours}</p>
                  <p className="text-stone-400">Open all 7 days for counter sales & pickups</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-brand-700 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-stone-800 text-sm">Direct Phone</div>
                  <p className="text-stone-800 font-bold mt-0.5">
                    <a href={`tel:${settings.phone}`} className="hover:text-brand-700">
                      {settings.phone}
                    </a>
                  </p>
                  <p className="text-stone-400">Call for immediate availability or delivery status</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-brand-700 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-stone-800 text-sm">Official Email</div>
                  <p className="text-stone-800 font-medium mt-0.5">
                    <a href={`mailto:${settings.email}`} className="hover:text-brand-700 underline">
                      {settings.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://share.google/W79AydkWCxME9Msea"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-stone-900 hover:bg-black text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition"
              >
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-amber-100 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-stone-900 font-serif">
            Send an Inquiry or Bulk Order Request
          </h2>
          <p className="text-xs text-stone-500">
            Fill in your details below and our team will get back to you shortly.
          </p>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
