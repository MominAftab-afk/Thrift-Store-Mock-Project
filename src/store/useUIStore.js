import { create } from 'zustand';

export const useUIStore = create((set) => ({
  isCartDrawerOpen: false,
  isVisualSearchModalOpen: false,
  isShoeFinderQuizOpen: false,
  isDropAlertModalOpen: false,
  activeAlertBrand: null,

  openCart: () => set({ isCartDrawerOpen: true }),
  closeCart: () => set({ isCartDrawerOpen: false }),
  toggleCart: () => set((state) => ({ isCartDrawerOpen: !state.isCartDrawerOpen })),

  openVisualSearch: () => set({ isVisualSearchModalOpen: true }),
  closeVisualSearch: () => set({ isVisualSearchModalOpen: false }),

  openQuiz: () => set({ isShoeFinderQuizOpen: true }),
  closeQuiz: () => set({ isShoeFinderQuizOpen: false }),

  openDropAlert: (brand = null) => set({ isDropAlertModalOpen: true, activeAlertBrand: brand }),
  closeDropAlert: () => set({ isDropAlertModalOpen: false, activeAlertBrand: null }),
}));
