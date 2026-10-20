import React from 'react';
import { getOrderByRef, getSettings } from '@/lib/db';
import OrderConfirmationClient from './OrderConfirmationClient';

export const dynamic = 'force-dynamic';

interface OrderConfirmationPageProps {
  searchParams: Promise<{ ref?: string }>;
}

export default async function OrderConfirmationPage({ searchParams }: OrderConfirmationPageProps) {
  const { ref } = await searchParams;
  const order = ref ? getOrderByRef(ref) : null;
  const settings = getSettings();

  return <OrderConfirmationClient order={order} settings={settings} orderRef={ref || ''} />;
}
