import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      fulfillmentType: 'delivery', // 'delivery' | 'pickup'

      addToCart: (shoe, selectedSize) => {
        const { items } = get();
        // Since thrifted shoes are unique 1-of-1 items, check if already in cart
        const existing = items.find(i => i.shoe.id === shoe.id);
        if (!existing) {
          set({ items: [...items, { shoe, selectedSize, addedAt: new Date().toISOString() }] });
        }
      },

      removeFromCart: (shoeId) => {
        set({ items: get().items.filter(i => i.shoe.id !== shoeId) });
      },

      clearCart: () => set({ items: [] }),

      setFulfillmentType: (type) => set({ fulfillmentType: type }),

      // Selectors
      getTotalPrice: () => {
        return get().items.reduce((acc, curr) => acc + curr.shoe.pricing.thriftPrice, 0);
      },

      getTotalSavings: () => {
        return get().items.reduce((acc, curr) => {
          const savings = curr.shoe.pricing.originalRetail - curr.shoe.pricing.thriftPrice;
          return acc + Math.max(0, savings);
        }, 0);
      },

      getItemCount: () => get().items.length,
    }),
    {
      name: 'resole_cart_store',
    }
  )
);
