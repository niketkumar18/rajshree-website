import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import LordRamCorner from '@/components/LordRamCorner';

export const metadata: Metadata = {
  metadataBase: new URL('https://sribhog.in'),
  title: 'Rajshree Sweets & Snacks | Authentic Mithai, Namkeen & Chaat in Jigani, Bengaluru',
  description:
    'Order fresh Indian sweets (Kaju Katli, Rasmalai, Gulab Jamun), crispy namkeens, and hot snacks online from Rajshree Sweets & Snacks, Jigani. Local delivery & store pickup available with direct UPI payment.',
  keywords: [
    'Rajshree Sweets',
    'Rajshree Sweets & Snacks',
    'sribhog',
    'sribhog.in',
    'sweets Jigani',
    'mithai Bangalore',
    'Kaju Katli',
    'Rasmalai',
    'Samosa Jigani',
    'Indian sweets online',
    'Jigani sweet shop',
  ],
  authors: [{ name: 'Rajshree Sweets & Snacks' }],
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    title: 'Rajshree Sweets & Snacks | Order Pure Sweets & Snacks Online',
    description:
      'Freshly prepared traditional Indian sweets, savory namkeens, and street food favorites in Jigani, Bengaluru.',
    url: 'https://sribhog.in',
    siteName: 'Rajshree Sweets & Snacks',
    images: [{ url: '/images/logo.png' }],
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased selection:bg-orange-200 selection:text-orange-950">
        <CartProvider>
          <LordRamCorner />
          <Header />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
