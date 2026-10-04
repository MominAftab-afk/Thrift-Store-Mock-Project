import { create } from 'zustand';

export const useFilterStore = create((set) => ({
  brand: 'All',
  condition: 'All',
  style: 'All',
  maxPrice: 200,
  query: '',

  setBrand: (brand) => set({ brand }),
  setCondition: (condition) => set({ condition }),
  setStyle: (style) => set({ style }),
  setMaxPrice: (maxPrice) => set({ maxPrice }),
  setQuery: (query) => set({ query }),
  
  resetFilters: () => set({
    brand: 'All',
    condition: 'All',
    style: 'All',
    maxPrice: 200,
    query: '',
  }),
}));
