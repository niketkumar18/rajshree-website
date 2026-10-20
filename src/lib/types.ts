export type CategoryType = 'SWEETS' | 'NAMKEEN' | 'ACCOMPANIMENTS' | 'SNACKS';
export type UnitType = 'KG' | 'PCS' | 'PLATE';

export interface Product {
  id: string;
  slNo: number;
  name: string;
  slug: string;
  category: CategoryType;
  unit: UnitType;
  price: number; // Base price in INR (per KG, per PCS, or per PLATE)
  image?: string;
  description?: string;
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  category: CategoryType;
  unit: UnitType;
  variantLabel: string; // e.g. "500g", "1 kg", "2 Pcs", "1 Plate"
  variantFactor: number; // e.g. 0.25, 0.5, 1.0
  quantity: number; // quantity of this variant pack
  unitPrice: number; // price for 1 unit of this variant (e.g. 500g = base * 0.5)
  totalPrice: number; // unitPrice * quantity
  image?: string;
}

export type FulfilmentType = 'DELIVERY' | 'PICKUP';

export type OrderStatus =
  | 'Pending Payment'
  | 'Payment Review'
  | 'Confirmed'
  | 'Preparing'
  | 'Ready for Pickup'
  | 'Out for Delivery'
  | 'Completed'
  | 'Cancelled';

export type PaymentStatus = 'PENDING' | 'VERIFIED' | 'FAILED';

export interface OrderItem {
  id?: string;
  productId: string;
  productName: string;
  variantLabel: string;
  unitPrice: number;
  quantity: number;
  itemTotal: number;
}

export interface Order {
  id: string;
  orderRef: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  fulfilmentType: FulfilmentType;
  address?: string;
  landmark?: string;
  pincode?: string;
  notes?: string;
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentUtr?: string;
  paymentVerifiedAt?: string;
  createdAt: string;
  updatedAt: string;
  items?: OrderItem[];
}

export interface StoreSettings {
  storeName: string;
  phone: string;
  email: string;
  address: string;
  operatingHours: string;
  deliveryRadiusKm: number;
  deliveryFee: number;
  minOrderValue: number;
  freeDeliveryAbove: number;
  upiId: string;
  upiMerchantName: string;
  isStoreOpen: boolean;
}
