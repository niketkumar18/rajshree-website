import React from 'react';
import AdminDashboard from './AdminDashboard';

export const metadata = {
  title: 'Admin Dashboard | Rajshree Sweets & Snacks',
  description: 'Order management, payment verification, and catalogue administration.',
};

export const dynamic = 'force-dynamic';

export default function AdminPage() {
  return <AdminDashboard />;
}
