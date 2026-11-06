'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Phone,
  MapPin,
  Clock,
  Truck,
  Gift,
  HelpCircle,
  ExternalLink,
  ShoppingBag,
  RotateCcw,
} from 'lucide-react';
import seedProductsRaw from '@/data/seed-products.json';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  action?: {
    type: 'link' | 'whatsapp';
    label: string;
    url: string;
  };
  productCards?: {
    name: string;
    price: number;
    unit: string;
    category: string;
    slug: string;
  }[];
  timestamp: string;
}

const QUICK_CHIPS = [
  { label: '🪔 15% Festive Offer', query: 'What is the festive offer?' },
  { label: '🛵 Delivery Charges & Radius', query: 'What are the delivery charges and area?' },
  { label: '📸 Instagram & Facebook', query: 'Where can I find your Instagram and Facebook pages?' },
  { label: '🍬 Kaju Katli Price', query: 'What is the price of Kaju Katli?' },
  { label: '🎁 Gift Hampers (₹900)', query: 'Tell me about the Diwali gift hampers' },
  { label: '📍 Store Location & Hours', query: 'Where is your shop and what are your timings?' },
  { label: '💬 Chat on WhatsApp', query: 'I want to talk to shop staff' },
];

export default function SweetShopBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnreadNotice, setHasUnreadNotice] = useState(true);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: '॥ जय श्री राम ॥ 🙏 Namaste! Welcome to Rajshree Sweets & Snacks, Jigani. How can I help you today? Ask me about our 133 pure ghee sweets, hot snacks, festive gift hampers, or local delivery.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnreadNotice(false);
    }
  }, [messages, isOpen]);

  // Answer generation engine based on store knowledge
  const generateBotReply = (userQuery: string): Message => {
    const q = userQuery.toLowerCase().trim();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Festive & Diwali Offer / Coupon
    if (
      q.includes('offer') ||
      q.includes('diwali') ||
      q.includes('discount') ||
      q.includes('coupon') ||
      q.includes('promo') ||
      q.includes('15%')
    ) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: '🪔 Festive Celebration Offer: Get FLAT 15% OFF on all Sweets on minimum orders of ₹2,000!\n\n• Promo Code: DIWALI15\n• Valid Till: 10th November 2026\n• Apply at checkout to save instantly on Kaju Katli, Mawa Pedas, Ghee Ladoos & more!',
        action: {
          type: 'link',
          label: 'Order Sweets (Code: DIWALI15)',
          url: '/shop?category=SWEETS',
        },
        timestamp: time,
      };
    }

    // 2. Gift Hampers / Corporate Gifting
    if (
      q.includes('hamper') ||
      q.includes('gift') ||
      q.includes('corporate') ||
      q.includes('bulk') ||
      q.includes('900') ||
      q.includes('pack')
    ) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: '🎁 Handcrafted Celebration Gift Hampers are available at our Jigani store starting from ₹900/-!\n\n• Includes premium chocolates (Dairy Milk, Swiss truffles), confections, fruit beverages & decorative red net basket.\n• We also offer royal golden jar sets and custom sweet boxes for family & corporate gifting.',
        action: {
          type: 'whatsapp',
          label: 'Order Gift Hamper on WhatsApp',
          url: 'https://wa.me/918050832752?text=Hello%20Rajshree%20Sweets%2C%20I%20want%20to%20order%20the%20Festive%20Gift%20Hamper%20(Rs%20900)',
        },
        timestamp: time,
      };
    }

    // 2b. Social Media Channels (Instagram & Facebook)
    if (
      q.includes('instagram') ||
      q.includes('insta') ||
      q.includes('facebook') ||
      q.includes('fb') ||
      q.includes('social') ||
      q.includes('page') ||
      q.includes('follow')
    ) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: '📱 Connect with Rajshree Sweets & Snacks online:\n\n• Instagram: @rajshree_ss26\n• Facebook: Rajshree Sweets & Snacks\n\nFollow us for daily fresh mithai prep videos, festive gift hampers, and exclusive celebration offers!',
        action: {
          type: 'link',
          label: 'Visit Instagram (@rajshree_ss26)',
          url: 'https://www.instagram.com/rajshree_ss26/',
        },
        timestamp: time,
      };
    }

    // 3. Delivery charges, distance, Porter
    if (
      q.includes('delivery') ||
      q.includes('deliver') ||
      q.includes('shipping') ||
      q.includes('charge') ||
      q.includes('porter') ||
      q.includes('radius') ||
      q.includes('km')
    ) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: '🛵 Delivery Policy for Rajshree Sweets:\n\n• Service Radius: Within 3 km of our Jigani store.\n• Standard Delivery Fee: ₹50\n• Free Delivery: Automatically applied on all orders of ₹1,000 or above!\n• Beyond 3 km: Dispatched via Porter, Dunzo or courier app at actuals.\n• Store Pickup: Always 100% FREE with 0 waiting at the counter.',
        action: {
          type: 'link',
          label: 'View Detailed Delivery Policy',
          url: '/delivery-policy',
        },
        timestamp: time,
      };
    }

    // 4. Store Timings / Hours
    if (
      q.includes('time') ||
      q.includes('timing') ||
      q.includes('hours') ||
      q.includes('open') ||
      q.includes('close')
    ) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: '⏰ Rajshree Sweets & Snacks Operating Hours:\n\n• Daily: 9:00 AM – 10:00 PM (Monday through Sunday)\n• Fresh morning batches of samosas, kachoris & jalebis start from 9:00 AM!',
        action: {
          type: 'link',
          label: 'Contact & Store Info',
          url: '/contact',
        },
        timestamp: time,
      };
    }

    // 5. Store Address / Location / Directions
    if (
      q.includes('address') ||
      q.includes('location') ||
      q.includes('where') ||
      q.includes('landmark') ||
      q.includes('shop') ||
      q.includes('store') ||
      q.includes('direction')
    ) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: '📍 Store Address:\nSri Matha Complex, Shop Nos. 4 & 5, Ground Floor, Anekal Main Road, Madapatna, Vaddarapalya, Haragadde, Jigani, Bengaluru, Karnataka 560105.\n\n(Landmark: Near Vishal Mega Mart, Jigani)',
        action: {
          type: 'link',
          label: 'Get Google Maps Location & Call',
          url: '/contact',
        },
        timestamp: time,
      };
    }

    // 6. Payment Modes / UPI
    if (
      q.includes('payment') ||
      q.includes('pay') ||
      q.includes('upi') ||
      q.includes('qr') ||
      q.includes('cod') ||
      q.includes('gpay') ||
      q.includes('phonepe')
    ) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: '💳 Payment Options:\n\n• Direct HDFC SmartHub Vyapar UPI QR on checkout (0% transaction fee).\n• Works with Google Pay, PhonePe, Paytm, BHIM, Mobikwik & WhatsApp Pay.\n• Cash on counter pickup is also welcome.',
        action: {
          type: 'link',
          label: 'Start Order & Checkout',
          url: '/shop',
        },
        timestamp: time,
      };
    }

    // 7. Track Order
    if (q.includes('track') || q.includes('order status') || q.includes('ref')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: '📦 To check your order status, please quote your unique Order Reference (e.g. ORD-1712...) to our store team. We will verify your order & delivery progress instantly!',
        action: {
          type: 'whatsapp',
          label: 'Track Order with Staff on WhatsApp',
          url: `https://wa.me/918050832752?text=Hello%20Rajshree%20Sweets%2C%20I%20want%20to%20check%20the%20status%20of%20my%20order`,
        },
        timestamp: time,
      };
    }

    // 8. Human / WhatsApp staff contact
    if (
      q.includes('staff') ||
      q.includes('human') ||
      q.includes('whatsapp') ||
      q.includes('call') ||
      q.includes('phone') ||
      q.includes('contact') ||
      q.includes('person')
    ) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: '💬 You can reach our Jigani store staff directly on WhatsApp (+91 8050832752) or call us during business hours (9 AM – 10 PM)!',
        action: {
          type: 'whatsapp',
          label: 'Open WhatsApp Chat with Shop',
          url: 'https://wa.me/918050832752?text=Hello%20Rajshree%20Sweets%2C%20I%20have%20an%20inquiry%20regarding%20an%20order',
        },
        timestamp: time,
      };
    }

    // 9. Specific Product Searches in 133-item catalogue
    const matched = (seedProductsRaw as any[]).filter((p) => {
      const pName = p.name.toLowerCase();
      const pCat = p.category.toLowerCase();
      const pSlug = (p.slug || '').toLowerCase();
      return (
        q.includes(pName) ||
        pName.includes(q) ||
        q.includes(pSlug.replace(/-/g, ' ')) ||
        (q.includes('samosa') && pSlug.includes('samosa')) ||
        (q.includes('katli') && pSlug.includes('katli')) ||
        (q.includes('ladoo') && (pSlug.includes('laddu') || pSlug.includes('ladoo'))) ||
        (q.includes('laddu') && (pSlug.includes('laddu') || pSlug.includes('ladoo'))) ||
        (q.includes('peda') && pSlug.includes('peda')) ||
        (q.includes('barfi') && pSlug.includes('barfi')) ||
        (q.includes('kachori') && pSlug.includes('kachori')) ||
        (q.includes('jamun') && pSlug.includes('jamun')) ||
        (q.includes('namkeen') && pCat === 'namkeen') ||
        (q.includes('chaat') && pCat === 'snacks')
      );
    }).slice(0, 4);

    if (matched.length > 0) {
      const cards = matched.map((p) => ({
        name: p.name,
        price: p.price,
        unit: p.unit,
        category: p.category,
        slug: p.slug,
      }));

      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `Here are matching items from our authentic sweets & snacks menu:`,
        productCards: cards,
        action: {
          type: 'link',
          label: 'Browse Complete 133-Item Menu',
          url: '/shop',
        },
        timestamp: time,
      };
    }

    // Default Fallback
    return {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: `Thank you for your question! I can help you with:\n\n• Price of any sweet, namkeen or snack (e.g. "Kaju Katli price")\n• Festive 15% discount (Code: DIWALI15)\n• Local delivery radius & fees in Jigani\n• Store timings & pickup location\n\nWould you like to speak directly with our store counter on WhatsApp?`,
      action: {
        type: 'whatsapp',
        label: 'Chat with Shop on WhatsApp',
        url: `https://wa.me/918050832752?text=${encodeURIComponent(`Hello Rajshree Sweets, I was on your website and had a question: "${userQuery}"`)}`,
      },
      timestamp: time,
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: time,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate instant natural typing delay
    setTimeout(() => {
      const reply = generateBotReply(query);
      setMessages((prev) => [...prev, reply]);
    }, 350);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
        {/* Unread teaser bubble on initial visit */}
        {hasUnreadNotice && !isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="mb-2.5 max-w-xs bg-white text-stone-900 text-xs py-2 px-3.5 rounded-2xl shadow-xl border border-amber-300 flex items-center gap-2 cursor-pointer animate-bounce hover:scale-105 transition"
          >
            <span className="text-base">🪔</span>
            <div>
              <p className="font-bold text-brand-900 leading-tight">Need help ordering sweets?</p>
              <p className="text-[10px] text-stone-500">Ask about 15% offer, delivery & prices</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setHasUnreadNotice(false);
              }}
              className="text-stone-400 hover:text-stone-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Main Floating Bubble Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Sweet Shop Assistant"
          className="relative group bg-gradient-to-r from-brand-600 via-orange-600 to-amber-600 hover:from-brand-700 hover:to-orange-700 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center border-2 border-amber-300 transition-all duration-300 hover:scale-105 cursor-pointer active:scale-95"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6 text-white" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border border-white" />
              </span>
            </>
          )}
        </button>
      </div>

      {/* Floating Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-22 right-4 sm:right-6 z-40 w-[92vw] max-w-sm sm:max-w-md h-[550px] max-h-[80vh] bg-white rounded-3xl shadow-2xl border-2 border-amber-300 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-800 via-brand-600 to-amber-600 text-white p-3.5 px-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-full overflow-hidden bg-stone-900 border border-amber-300 shrink-0">
                <img
                  src="/images/logo.png"
                  alt="Rajshree Sweets Assistant"
                  className="w-full h-full object-contain p-0.5"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm font-serif">Rajshree Assistant</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[10px] text-amber-200">
                  ॥ जय श्री राम ॥ • Online • Sri Matha Complex, Jigani
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <a
                href="https://wa.me/918050832752?text=Hello%20Rajshree%20Sweets"
                target="_blank"
                rel="noopener noreferrer"
                title="Chat on WhatsApp"
                className="p-1.5 rounded-lg text-amber-200 hover:text-white hover:bg-white/10 transition"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-amber-200 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick FAQ Chips Strip */}
          <div className="bg-amber-50/80 border-b border-amber-200/60 p-2 overflow-x-auto flex gap-1.5 scrollbar-none text-[11px]">
            {QUICK_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(chip.query)}
                className="shrink-0 bg-white hover:bg-orange-100 text-stone-800 hover:text-brand-900 font-semibold px-2.5 py-1 rounded-full border border-amber-200 shadow-2xs transition active:scale-95"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50/50 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 shadow-xs ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-brand-600 to-orange-600 text-white rounded-br-xs'
                      : 'bg-white text-stone-800 border border-amber-200/70 rounded-bl-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>

                  {/* Product Preview Cards if matched */}
                  {m.productCards && m.productCards.length > 0 && (
                    <div className="mt-2.5 space-y-1.5">
                      {m.productCards.map((p, idx) => (
                        <Link
                          key={idx}
                          href={`/product/${p.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between p-2 rounded-xl bg-orange-50 hover:bg-orange-100/80 border border-orange-200 text-stone-900 transition"
                        >
                          <div>
                            <span className="font-bold text-[11px] block">{p.name}</span>
                            <span className="text-[10px] text-stone-500">{p.category}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-extrabold text-brand-900 text-xs block">
                              ₹{p.price}
                            </span>
                            <span className="text-[10px] text-stone-400">per {p.unit}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Call to action button */}
                  {m.action && (
                    <div className="mt-2.5 pt-2 border-t border-stone-100">
                      {m.action.type === 'whatsapp' ? (
                        <a
                          href={m.action.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-[11px] shadow-xs transition"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{m.action.label}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ) : m.action.url.startsWith('http') ? (
                        <a
                          href={m.action.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-brand-700 hover:bg-brand-800 text-white font-bold px-3 py-1.5 rounded-lg text-[11px] shadow-xs transition"
                        >
                          <span>{m.action.label}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ) : (
                        <Link
                          href={m.action.url}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1 bg-brand-700 hover:bg-brand-800 text-white font-bold px-3 py-1.5 rounded-lg text-[11px] shadow-xs transition"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>{m.action.label}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-stone-400 mt-0.5 px-1">{m.timestamp}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-amber-200/80 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about sweets, prices, delivery..."
              className="flex-1 px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-500 font-medium"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="bg-brand-700 hover:bg-brand-800 disabled:bg-stone-200 text-white disabled:text-stone-400 p-2 rounded-xl transition shadow-xs cursor-pointer disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
