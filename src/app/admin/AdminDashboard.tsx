'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  ShieldCheck,
  ShoppingBag,
  Clock,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  Package,
  Settings,
  Download,
  LogOut,
  Edit,
  Plus,
  Trash2,
  MessageCircle,
  Check,
  X,
  RefreshCw,
  Mail,
} from 'lucide-react';
import { Order, Product, StoreSettings, OrderStatus, PaymentStatus, CategoryType, UnitType } from '@/lib/types';

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Dashboard Data State
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'settings' | 'export'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [loadingData, setLoadingData] = useState(false);

  // Filters & Search
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('ALL');
  const [prodSearch, setProdSearch] = useState('');
  const [prodCatFilter, setProdCatFilter] = useState('ALL');

  // Payment Verification Modal State
  const [verifyingOrder, setVerifyingOrder] = useState<Order | null>(null);
  const [utrInput, setUtrInput] = useState('');

  // Edit / Add Product Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [prodFormData, setProdFormData] = useState<{
    name: string;
    category: CategoryType;
    unit: UnitType;
    price: number;
    image: string;
    description: string;
    inStock: boolean;
    featured: boolean;
  }>({
    name: '',
    category: 'SWEETS',
    unit: 'KG',
    price: 0,
    image: '',
    description: '',
    inStock: true,
    featured: false,
  });

  // Settings Save State
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [settingsNotice, setSettingsNotice] = useState('');

  // Email Test Diagnostic State
  const [testingEmail, setTestingEmail] = useState(false);
  const [emailTestStatus, setEmailTestStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleSendTestEmail = async () => {
    setTestingEmail(true);
    setEmailTestStatus(null);
    try {
      const res = await fetch('/api/admin/test-email', { method: 'POST' });
      const data = await res.json();
      setEmailTestStatus(data);
    } catch (err: any) {
      setEmailTestStatus({ success: false, message: err.message || 'Network request failed' });
    } finally {
      setTestingEmail(false);
    }
  };

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/auth');
      const data = await res.json();
      setAuthenticated(data.authenticated);
      if (data.authenticated) {
        loadAllData();
      }
    } catch {
      setAuthenticated(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      setAuthenticated(true);
      loadAllData();
    } catch (err: any) {
      setLoginError(err.message || 'Invalid login credentials');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    setAuthenticated(false);
    setPassword('');
  };

  const loadAllData = async () => {
    setLoadingData(true);
    try {
      const [ordRes, prodRes, setRes] = await Promise.all([
        fetch('/api/admin/orders'),
        fetch('/api/admin/products'),
        fetch('/api/admin/settings'),
      ]);

      if (ordRes.ok) {
        const d = await ordRes.json();
        setOrders(d.orders || []);
      }
      if (prodRes.ok) {
        const d = await prodRes.json();
        let prods: Product[] = d.products || [];
        try {
          const raw = localStorage.getItem('rajshree_prod_overrides');
          if (raw) {
            const ov = JSON.parse(raw);
            prods = prods.map(p => ov[p.id] ? { ...p, ...ov[p.id] } : p);
          }
        } catch (e) {}
        setProducts(prods);
      }
      if (setRes.ok) {
        const d = await setRes.json();
        setSettings(d.settings);
      }
    } catch (e) {
      console.error('Failed to load admin data', e);
    } finally {
      setLoadingData(false);
    }
  };

  // Order Actions
  const handleUpdateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      if (res.ok) {
        const d = await res.json();
        setOrders(prev => prev.map(o => (o.id === orderId ? d.order : o)));
      }
    } catch (e) {
      alert('Failed to update status');
    }
  };

  const handleConfirmPaymentVerification = async () => {
    if (!verifyingOrder) return;
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: verifyingOrder.id,
          status: 'Confirmed',
          paymentStatus: 'VERIFIED',
          paymentUtr: utrInput.trim() || verifyingOrder.paymentUtr || 'VERIFIED_ON_TERMINAL',
        }),
      });

      if (res.ok) {
        const d = await res.json();
        setOrders(prev => prev.map(o => (o.id === verifyingOrder.id ? d.order : o)));
        setVerifyingOrder(null);
        setUtrInput('');
      }
    } catch (e) {
      alert('Failed to record payment verification');
    }
  };

  // Product Actions
  const handleToggleStock = async (product: Product) => {
    try {
      const res = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: product.id, updates: { inStock: !product.inStock } }),
      });
      if (res.ok) {
        setProducts(prev =>
          prev.map(p => (p.id === product.id ? { ...p, inStock: !product.inStock } : p))
        );
      }
    } catch (e) {
      alert('Error updating stock');
    }
  };

  const handleQuickPriceChange = async (product: Product, newPrice: number) => {
    if (isNaN(newPrice) || newPrice <= 0) return;
    try {
      const res = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: product.id, updates: { price: newPrice } }),
      });
      if (res.ok) {
        setProducts(prev =>
          prev.map(p => (p.id === product.id ? { ...p, price: newPrice } : p))
        );
      }
    } catch (e) {
      alert('Error updating price');
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        // Edit existing
        const res = await fetch('/api/admin/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingProduct.id, updates: prodFormData }),
        });
        if (res.ok) {
          const updated: Product = {
            ...editingProduct,
            ...prodFormData,
            category: prodFormData.category as CategoryType,
            unit: prodFormData.unit as UnitType,
          };
          setProducts(prev => prev.map(p => p.id === editingProduct.id ? updated : p));
          try {
            const raw = localStorage.getItem('rajshree_prod_overrides') || '{}';
            const ov = JSON.parse(raw);
            ov[editingProduct.id] = prodFormData;
            localStorage.setItem('rajshree_prod_overrides', JSON.stringify(ov));
          } catch (e) {}
          setEditingProduct(null);
          loadAllData();
        }
      } else {
        // Add new
        const res = await fetch('/api/admin/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(prodFormData),
        });
        if (res.ok) {
          setIsAddingProduct(false);
          loadAllData();
        }
      }
    } catch (e) {
      alert('Failed to save product');
    }
  };

  // Settings Actions
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSettingsSaving(true);
    setSettingsNotice('');

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSettingsNotice('Store settings saved successfully!');
        setTimeout(() => setSettingsNotice(''), 3000);
      }
    } catch (e) {
      alert('Failed to save settings');
    } finally {
      setSettingsSaving(false);
    }
  };

  // KPI Calculations
  const totalRevenue = orders
    .filter(o => o.paymentStatus === 'VERIFIED')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const pendingVerificationCount = orders.filter(o => o.paymentStatus === 'PENDING').length;
  const inStockProductsCount = products.filter(p => p.inStock).length;

  // Filtered Orders
  const filteredOrders = orders.filter(o => {
    if (orderStatusFilter !== 'ALL' && o.status !== orderStatusFilter) return false;
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      const matchRef = o.orderRef.toLowerCase().includes(q);
      const matchName = o.customerName.toLowerCase().includes(q);
      const matchPhone = o.customerPhone.includes(q);
      if (!matchRef && !matchName && !matchPhone) return false;
    }
    return true;
  });

  // Filtered Products
  const filteredProducts = products.filter(p => {
    if (prodCatFilter !== 'ALL' && p.category !== prodCatFilter) return false;
    if (prodSearch.trim()) {
      const q = prodSearch.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !String(p.slNo).includes(q)) return false;
    }
    return true;
  });

  // Loading Screen
  if (authenticated === null) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-stone-500">
        <RefreshCw className="w-6 h-6 animate-spin text-brand-600" />
      </div>
    );
  }

  // Login View
  if (!authenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl border border-amber-100 shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-gradient-to-br from-brand-600 to-amber-700 rounded-full flex items-center justify-center text-white mx-auto shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-stone-900 font-serif">Staff Admin Portal</h1>
            <p className="text-xs text-stone-500">Rajshree Sweets & Snacks • Secure Shop Access</p>
          </div>

          {loginError && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-brand-700 hover:bg-brand-800 text-white font-bold py-3 px-4 rounded-xl text-sm shadow-md transition disabled:bg-stone-300"
            >
              {loginLoading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>

          <div className="text-center pt-2">
            <span className="text-[11px] text-stone-400">
              Default password configured in environment setup.
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Dashboard
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-amber-100 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-700 text-white flex items-center justify-center font-black">
            RS
          </div>
          <div>
            <h1 className="text-xl font-black text-stone-900 font-serif">Store Operations & Admin</h1>
            <p className="text-xs text-stone-500">Rajshree Sweets & Snacks • Jigani Store</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadAllData}
            disabled={loadingData}
            className="p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loadingData ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3.5 py-2 rounded-xl transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-2xs space-y-1">
          <div className="text-xs font-semibold text-stone-500 flex items-center gap-1.5">
            <ShoppingBag className="w-3.5 h-3.5 text-brand-600" />
            <span>Total Orders</span>
          </div>
          <div className="text-2xl font-black text-stone-900">{orders.length}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-2xs space-y-1">
          <div className="text-xs font-semibold text-stone-500 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verified Revenue</span>
          </div>
          <div className="text-2xl font-black text-emerald-700">₹{totalRevenue}</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-2xs space-y-1">
          <div className="text-xs font-semibold text-stone-500 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Pending UPI Check</span>
          </div>
          <div className="text-2xl font-black text-amber-700 flex items-center gap-2">
            <span>{pendingVerificationCount}</span>
            {pendingVerificationCount > 0 && (
              <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                Action Req.
              </span>
            )}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-2xs space-y-1">
          <div className="text-xs font-semibold text-stone-500 flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5 text-brand-600" />
            <span>Catalogue Items</span>
          </div>
          <div className="text-2xl font-black text-stone-900">
            {inStockProductsCount} / {products.length}
          </div>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-bold border-b-2 whitespace-nowrap transition ${
            activeTab === 'orders'
              ? 'border-brand-700 text-brand-700'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Orders ({orders.length})</span>
          {pendingVerificationCount > 0 && (
            <span className="bg-amber-500 text-white text-[10px] px-1.5 py-0.2 rounded-full">
              {pendingVerificationCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-bold border-b-2 whitespace-nowrap transition ${
            activeTab === 'products'
              ? 'border-brand-700 text-brand-700'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Product Catalogue ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-bold border-b-2 whitespace-nowrap transition ${
            activeTab === 'settings'
              ? 'border-brand-700 text-brand-700'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Store Settings & Fulfilment</span>
        </button>

        <button
          onClick={() => setActiveTab('export')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-bold border-b-2 whitespace-nowrap transition ${
            activeTab === 'export'
              ? 'border-brand-700 text-brand-700'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>Data Export & Backups</span>
        </button>
      </div>

      {/* TAB 1: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-white p-4 rounded-2xl border border-stone-200">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={orderSearch}
                onChange={e => setOrderSearch(e.target.value)}
                placeholder="Search by Ref, Name, or Phone..."
                className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 font-semibold">Status:</span>
              <select
                value={orderStatusFilter}
                onChange={e => setOrderStatusFilter(e.target.value)}
                className="bg-stone-50 border border-stone-200 text-xs font-semibold rounded-xl px-3 py-2 text-stone-800"
              >
                <option value="ALL">All Statuses</option>
                <option value="Pending Payment">Pending Payment</option>
                <option value="Payment Review">Payment Review</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Preparing">Preparing</option>
                <option value="Ready for Pickup">Ready for Pickup</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
            {filteredOrders.length === 0 ? (
              <div className="p-12 text-center text-stone-400 text-sm">
                No orders found matching your search.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 text-stone-600 font-bold border-b border-stone-200 uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="p-3.5">Ref & Date</th>
                      <th className="p-3.5">Customer</th>
                      <th className="p-3.5">Fulfilment</th>
                      <th className="p-3.5">Total Amount</th>
                      <th className="p-3.5">Payment</th>
                      <th className="p-3.5">Order Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredOrders.map(order => {
                      const isPending = order.paymentStatus === 'PENDING';
                      const waLink = `https://wa.me/91${order.customerPhone.replace(
                        /\D/g,
                        ''
                      )}?text=${encodeURIComponent(
                        `Hello ${order.customerName}, regarding your Rajshree Sweets order ${order.orderRef}: `
                      )}`;

                      return (
                        <tr key={order.id} className="hover:bg-amber-50/40 transition">
                          <td className="p-3.5">
                            <div className="font-mono font-bold text-brand-900">{order.orderRef}</div>
                            <div className="text-[10px] text-stone-400">
                              {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </div>
                          </td>

                          <td className="p-3.5">
                            <div className="font-bold text-stone-800">{order.customerName}</div>
                            <div className="flex items-center gap-1.5 text-stone-500">
                              <span>+91 {order.customerPhone}</span>
                              <a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-600 hover:text-emerald-700"
                                title="Chat on WhatsApp"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </td>

                          <td className="p-3.5">
                            <span
                              className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                                order.fulfilmentType === 'DELIVERY'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-purple-100 text-purple-800'
                              }`}
                            >
                              {order.fulfilmentType}
                            </span>
                            {order.address && (
                              <p className="text-[11px] text-stone-500 max-w-xs truncate mt-0.5">
                                {order.address}
                              </p>
                            )}
                          </td>

                          <td className="p-3.5">
                            <div className="font-black text-stone-900 text-sm">
                              ₹{order.totalAmount}
                            </div>
                            <div className="text-[10px] text-stone-400">
                              {order.items?.length || 0} items
                            </div>
                          </td>

                          <td className="p-3.5">
                            {order.paymentStatus === 'VERIFIED' ? (
                              <div>
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>Verified</span>
                                </span>
                                {order.paymentUtr && (
                                  <div className="text-[10px] text-stone-400 mt-0.5 font-mono">
                                    UTR: {order.paymentUtr}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div>
                                <span className="inline-block text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                                  Pending Verification
                                </span>
                                {order.paymentUtr && (
                                  <div className="text-[10px] text-stone-600 font-mono mt-0.5">
                                    Cust UTR: {order.paymentUtr}
                                  </div>
                                )}
                              </div>
                            )}
                          </td>

                          <td className="p-3.5">
                            <select
                              value={order.status}
                              onChange={e =>
                                handleUpdateOrderStatus(order.id, e.target.value as OrderStatus)
                              }
                              className="bg-stone-50 border border-stone-200 rounded-lg text-xs font-semibold py-1 px-2 text-stone-800"
                            >
                              <option value="Pending Payment">Pending Payment</option>
                              <option value="Payment Review">Payment Review</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Preparing">Preparing</option>
                              <option value="Ready for Pickup">Ready for Pickup</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>

                          <td className="p-3.5 text-right space-x-2">
                            {isPending && (
                              <button
                                onClick={() => {
                                  setVerifyingOrder(order);
                                  setUtrInput(order.paymentUtr || '');
                                }}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2.5 py-1 rounded-lg text-[11px] shadow-2xs"
                              >
                                Verify Payment
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS CATALOGUE MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-white p-4 rounded-2xl border border-stone-200">
            <div className="flex flex-1 items-center gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  value={prodSearch}
                  onChange={e => setProdSearch(e.target.value)}
                  placeholder="Search products by name or SL #..."
                  className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:bg-white"
                />
              </div>

              <select
                value={prodCatFilter}
                onChange={e => setProdCatFilter(e.target.value)}
                className="bg-stone-50 border border-stone-200 text-xs font-semibold rounded-xl px-3 py-2 text-stone-800"
              >
                <option value="ALL">All Categories</option>
                <option value="SWEETS">Sweets</option>
                <option value="NAMKEEN">Namkeen</option>
                <option value="SNACKS">Snacks</option>
                <option value="ACCOMPANIMENTS">Accompaniments</option>
              </select>
            </div>

            <button
              onClick={() => {
                setEditingProduct(null);
                setProdFormData({
                  name: '',
                  category: 'SWEETS',
                  unit: 'KG',
                  price: 500,
                  image: '',
                  description: '',
                  inStock: true,
                  featured: false,
                });
                setIsAddingProduct(true);
              }}
              className="bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Products List Table */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto max-h-[600px]">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 text-stone-600 font-bold border-b border-stone-200 uppercase tracking-wider text-[11px] sticky top-0 z-10">
                  <tr>
                    <th className="p-3 w-12 text-center">SL</th>
                    <th className="p-3 w-14">Image</th>
                    <th className="p-3">Product Name</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Unit</th>
                    <th className="p-3">Price (₹)</th>
                    <th className="p-3">Stock Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredProducts.map(p => (
                    <tr key={p.id} className="hover:bg-amber-50/40">
                      <td className="p-3 font-mono text-stone-400 text-center">#{p.slNo}</td>

                      <td className="p-2.5">
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-amber-200 bg-orange-50 shrink-0 shadow-2xs">
                          <img
                            src={p.image || '/images/sweets-platter.jpg'}
                            alt={p.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/sweets-platter.jpg';
                            }}
                          />
                        </div>
                      </td>

                      <td className="p-3 font-bold text-stone-900">
                        <div className="flex items-center gap-1.5">
                          <span className="veg-icon shrink-0">
                            <span className="veg-icon-dot" />
                          </span>
                          <span>{p.name}</span>
                          {p.featured && (
                            <span className="text-[10px] bg-brand-100 text-brand-800 font-bold px-1.5 py-0.2 rounded">
                              Popular
                            </span>
                          )}
                        </div>
                        {p.description && (
                          <div className="text-[10px] text-stone-400 font-normal line-clamp-1 max-w-xs mt-0.5">
                            {p.description}
                          </div>
                        )}
                      </td>

                      <td className="p-3 font-semibold text-stone-600">{p.category}</td>

                      <td className="p-3 text-stone-500 font-mono">{p.unit}</td>

                      <td className="p-3">
                        <div className="flex items-center gap-1 font-bold text-stone-900">
                          <span>₹</span>
                          <input
                            type="number"
                            defaultValue={p.price}
                            onBlur={e => handleQuickPriceChange(p, Number(e.target.value))}
                            className="w-16 px-1.5 py-0.5 bg-stone-50 border border-stone-200 rounded font-bold text-xs"
                          />
                        </div>
                      </td>

                      <td className="p-3">
                        <button
                          onClick={() => handleToggleStock(p)}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition ${
                            p.inStock
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        >
                          {p.inStock ? 'In Stock' : 'Out of Stock'}
                        </button>
                      </td>

                      <td className="p-3 text-right">
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setProdFormData({
                              name: p.name,
                              category: p.category,
                              unit: p.unit,
                              price: p.price,
                              image: p.image || '',
                              description: p.description || '',
                              inStock: p.inStock,
                              featured: p.featured || false,
                            });
                          }}
                          className="p-1.5 text-stone-500 hover:text-brand-700 rounded-lg hover:bg-stone-100"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: STORE SETTINGS & FULFILMENT */}
      {activeTab === 'settings' && settings && (
        <form onSubmit={handleSaveSettings} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-6 max-w-3xl">
          <div className="border-b border-stone-100 pb-3">
            <h2 className="text-base font-bold text-stone-900">Store & Delivery Parameters</h2>
            <p className="text-xs text-stone-500">Configure operating hours, local delivery fees, and minimum values.</p>
          </div>

          {settingsNotice && (
            <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 p-3 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{settingsNotice}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Operating Hours</label>
              <input
                type="text"
                value={settings.operatingHours}
                onChange={e => setSettings({ ...settings, operatingHours: e.target.value })}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Delivery Radius (km)</label>
              <input
                type="number"
                value={settings.deliveryRadiusKm}
                onChange={e => setSettings({ ...settings, deliveryRadiusKm: Number(e.target.value) })}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Delivery Charge (₹)</label>
              <input
                type="number"
                value={settings.deliveryFee}
                onChange={e => setSettings({ ...settings, deliveryFee: Number(e.target.value) })}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Min Order for Delivery (₹)</label>
              <input
                type="number"
                value={settings.minOrderValue}
                onChange={e => setSettings({ ...settings, minOrderValue: Number(e.target.value) })}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Free Delivery Above (₹)</label>
              <input
                type="number"
                value={settings.freeDeliveryAbove}
                onChange={e => setSettings({ ...settings, freeDeliveryAbove: Number(e.target.value) })}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Store Phone Number</label>
              <input
                type="text"
                value={settings.phone}
                onChange={e => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-stone-700 mb-1">Verified UPI ID (VPA)</label>
              <input
                type="text"
                value={settings.upiId}
                onChange={e => setSettings({ ...settings, upiId: e.target.value })}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl font-mono text-xs"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-stone-700 mb-1">Shop Address</label>
              <textarea
                rows={2}
                value={settings.address}
                onChange={e => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl"
              />
            </div>
          </div>

          {/* Email Notification Diagnostic & Test */}
          <div className="border-t border-stone-200 pt-5 mt-4">
            <h3 className="text-sm font-bold text-stone-900 mb-1 flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-600" />
              <span>Email Order Notifications</span>
            </h3>
            <p className="text-xs text-stone-500 mb-3">
              Order confirmations and receipts are dispatched to <strong>sribhog2026@gmail.com</strong> whenever customers place orders.
            </p>

            {emailTestStatus && (
              <div className={`p-3 rounded-xl text-xs mb-3 border ${
                emailTestStatus.success ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'
              }`}>
                {emailTestStatus.message}
              </div>
            )}

            <button
              type="button"
              disabled={testingEmail}
              onClick={handleSendTestEmail}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-xl text-xs transition shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{testingEmail ? 'Sending Test Email...' : 'Send Test Email to sribhog2026@gmail.com'}</span>
            </button>
          </div>

          <button
            type="submit"
            disabled={settingsSaving}
            className="bg-brand-700 hover:bg-brand-800 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition shadow-xs"
          >
            {settingsSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </form>
      )}

      {/* TAB 4: DATA EXPORT & BACKUPS */}
      {activeTab === 'export' && (
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-6 max-w-2xl">
          <div className="border-b border-stone-100 pb-3">
            <h2 className="text-base font-bold text-stone-900">Data Backups & Export</h2>
            <p className="text-xs text-stone-500">Download complete data archives of your store for bookkeeping and offline backup.</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl border border-stone-200">
              <div>
                <h4 className="font-bold text-sm text-stone-900">Export All Orders</h4>
                <p className="text-xs text-stone-500">Includes customer contacts, items, amounts, UTR, and timestamps.</p>
              </div>
              <a
                href="/api/admin/export?type=orders"
                download
                className="bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Export JSON</span>
              </a>
            </div>

            <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl border border-stone-200">
              <div>
                <h4 className="font-bold text-sm text-stone-900">Export Product Catalogue</h4>
                <p className="text-xs text-stone-500">Complete 133-item catalogue with current prices and stock states.</p>
              </div>
              <a
                href="/api/admin/export?type=products"
                download
                className="bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Export JSON</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Payment Verification Modal */}
      {verifyingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-amber-200">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-stone-900 font-serif">Verify UPI Payment</h3>
              <button onClick={() => setVerifyingOrder(null)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-xs space-y-1">
              <div>
                <span className="text-stone-500">Order Ref:</span>{' '}
                <strong className="font-mono text-stone-900">{verifyingOrder.orderRef}</strong>
              </div>
              <div>
                <span className="text-stone-500">Customer:</span>{' '}
                <strong>{verifyingOrder.customerName}</strong> (+91 {verifyingOrder.customerPhone})
              </div>
              <div>
                <span className="text-stone-500">Payable Amount:</span>{' '}
                <strong className="text-sm text-brand-950 font-bold">₹{verifyingOrder.totalAmount}</strong>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Enter Verified Bank UTR / Terminal Reference:
              </label>
              <input
                type="text"
                value={utrInput}
                onChange={e => setUtrInput(e.target.value)}
                placeholder="e.g. 428901234567"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-mono focus:bg-white"
              />
              <p className="text-[11px] text-stone-400 mt-1">
                Check your HDFC SmartHub Vyapar app or SMS alert before marking as verified.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setVerifyingOrder(null)}
                className="flex-1 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPaymentVerification}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md"
              >
                Confirm Verified
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit / Add Product Modal */}
      {(editingProduct || isAddingProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-stone-900 font-serif">
                {editingProduct ? `Edit ${editingProduct.name}` : 'Add New Product'}
              </h3>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsAddingProduct(false);
                }}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={prodFormData.name}
                  onChange={e => setProdFormData({ ...prodFormData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Category</label>
                  <select
                    value={prodFormData.category}
                    onChange={e => setProdFormData({ ...prodFormData, category: e.target.value as CategoryType })}
                    className="w-full px-2 py-2 bg-stone-50 border border-stone-200 rounded-xl font-medium"
                  >
                    <option value="SWEETS">SWEETS</option>
                    <option value="NAMKEEN">NAMKEEN</option>
                    <option value="SNACKS">SNACKS</option>
                    <option value="ACCOMPANIMENTS">ACCOMPANIMENTS</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Unit</label>
                  <select
                    value={prodFormData.unit}
                    onChange={e => setProdFormData({ ...prodFormData, unit: e.target.value as UnitType })}
                    className="w-full px-2 py-2 bg-stone-50 border border-stone-200 rounded-xl font-medium"
                  >
                    <option value="KG">KG</option>
                    <option value="PCS">PCS</option>
                    <option value="PLATE">PLATE</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={prodFormData.price}
                    onChange={e => setProdFormData({ ...prodFormData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Product Image URL or Path</label>
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-orange-200 bg-orange-50 shrink-0 shadow-xs">
                    <img
                      src={prodFormData.image || '/images/sweets-platter.jpg'}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/sweets-platter.jpg';
                      }}
                    />
                  </div>
                  <input
                    type="text"
                    value={prodFormData.image}
                    onChange={e => setProdFormData({ ...prodFormData, image: e.target.value.trim() })}
                    placeholder="/images/sweets-platter.jpg or https://..."
                    className="flex-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-mono text-[11px]"
                  />
                </div>
                <div className="flex gap-2 mt-1.5">
                  <button
                    type="button"
                    onClick={() => setProdFormData({ ...prodFormData, image: '/images/sweets-platter.jpg' })}
                    className="text-[10px] bg-orange-100 hover:bg-orange-200 text-brand-900 px-2 py-0.5 rounded font-semibold transition"
                  >
                    Use Sweet Platter
                  </button>
                  <button
                    type="button"
                    onClick={() => setProdFormData({ ...prodFormData, image: '/images/logo.png' })}
                    className="text-[10px] bg-stone-100 hover:bg-stone-200 text-stone-700 px-2 py-0.5 rounded font-semibold transition"
                  >
                    Use Store Logo
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={prodFormData.description}
                  onChange={e => setProdFormData({ ...prodFormData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>

              <div className="flex gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodFormData.inStock}
                    onChange={e => setProdFormData({ ...prodFormData, inStock: e.target.checked })}
                    className="rounded text-brand-600"
                  />
                  <span>In Stock</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodFormData.featured}
                    onChange={e => setProdFormData({ ...prodFormData, featured: e.target.checked })}
                    className="rounded text-brand-600"
                  />
                  <span>Popular (Featured on Home)</span>
                </label>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    setIsAddingProduct(false);
                  }}
                  className="flex-1 py-2.5 rounded-xl border border-stone-200 font-semibold text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold shadow-md"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
