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

          {/* Social Media Channels */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 p-6 rounded-3xl border border-amber-200/80 shadow-sm space-y-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700">Official Social Media</span>
              <h3 className="text-base font-bold text-stone-900 font-serif mt-0.5">
                Follow & Connect With Us
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Stay updated on fresh daily preparations, festive hampers, and celebration offers.
              </p>
            </div>

            <div className="space-y-2.5 pt-1">
              <a
                href="https://www.instagram.com/rajshree_ss26/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-stone-50 border border-pink-200 shadow-2xs group transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900 group-hover:text-pink-600 transition">
                      Instagram
                    </div>
                    <div className="text-[11px] text-stone-500">@rajshree_ss26</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-pink-600 bg-pink-50 px-2.5 py-1 rounded-lg">
                  Follow →
                </span>
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61590946588661"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-stone-50 border border-blue-200 shadow-2xs group transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#1877F2] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900 group-hover:text-[#1877F2] transition">
                      Facebook
                    </div>
                    <div className="text-[11px] text-stone-500">Rajshree Sweets & Snacks</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#1877F2] bg-blue-50 px-2.5 py-1 rounded-lg">
                  Like & Visit →
                </span>
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
