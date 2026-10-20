'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product } from '@/lib/types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, variantLabel: string, variantFactor: number, quantity?: number) => void;
  updateQuantity: (productId: string, variantLabel: string, quantity: number) => void;
  removeFromCart: (productId: string, variantLabel: string) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'rss_cart_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    }
    setIsInitialized(true);
  }, []);

  // Save to local storage on cart change
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      } catch (e) {
        console.error('Failed to save cart to storage', e);
      }
    }
  }, [cart, isInitialized]);

  const addToCart = (product: Product, variantLabel: string, variantFactor: number, quantity = 1) => {
    const unitPrice = Math.round(product.price * variantFactor);
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.productId === product.id && item.variantLabel === variantLabel
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: newQty * unitPrice,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          productId: product.id,
          name: product.name,
          slug: product.slug,
          category: product.category,
          unit: product.unit,
          variantLabel,
          variantFactor,
          quantity,
          unitPrice,
          totalPrice: unitPrice * quantity,
          image: product.image,
        };
        return [...prev, newItem];
      }
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, variantLabel: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantLabel);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (item.productId === productId && item.variantLabel === variantLabel) {
          return {
            ...item,
            quantity,
            totalPrice: item.unitPrice * quantity,
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string, variantLabel: string) => {
    setCart(prev => prev.filter(item => !(item.productId === productId && item.variantLabel === variantLabel)));
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        itemCount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
