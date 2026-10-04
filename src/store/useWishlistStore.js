import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      savedIds: [],

      toggleWishlist: (shoeId) => {
        const { savedIds } = get();
        if (savedIds.includes(shoeId)) {
          set({ savedIds: savedIds.filter(id => id !== shoeId) });
        } else {
          set({ savedIds: [...savedIds, shoeId] });
        }
      },

      isInWishlist: (shoeId) => {
        return get().savedIds.includes(shoeId);
      },

      clearWishlist: () => set({ savedIds: [] }),
    }),
    {
      name: 'resole_wishlist_store',
    }
  )
);
