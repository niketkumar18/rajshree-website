import React from 'react';
import { getSettings } from '@/lib/db';
import CheckoutClient from './CheckoutClient';

export const dynamic = 'force-dynamic';

export default function CheckoutPage() {
  const settings = getSettings();
  return <CheckoutClient settings={settings} />;
}
