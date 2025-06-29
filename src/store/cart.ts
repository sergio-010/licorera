import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  stock: number;
  quantity: number;
}

interface CartState {
  items: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addToCart: (product) =>
    set((state) => {
      const existing = state.items.find((p) => p.id === product.id);
      if (existing) {
        if (existing.quantity < existing.stock) {
          return {
            items: state.items.map((p) =>
              p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
            ),
          };
        }
        return state;
      }
      return { items: [...state.items, { ...product, quantity: 1 }] };
    }),
  removeFromCart: (id) => set((state) => ({ items: state.items.filter((p) => p.id !== id) })),
  clearCart: () => set({ items: [] }),
}));
