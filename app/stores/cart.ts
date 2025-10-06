import { defineStore } from "pinia";
import type { Cat } from "~/types/cat";

interface CartItem {
  cat: Cat;
  quantity: number;
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as CartItem[],
  }),

  getters: {
    totalPrice: (state) =>
      state.items.reduce((sum, i) => sum + i.cat.price * i.quantity, 0),
    totalCount: (state) => state.items.reduce((sum, i) => sum + i.quantity, 0),
  },

  actions: {
    addToCart(cat: Cat, quantity: number) {
      const existing = this.items.find((i) => i.cat.id === cat.id);
      if (existing) existing.quantity += quantity;
      else this.items.push({ cat, quantity });
    },
    removeFromCart(id: number) {
      this.items = this.items.filter((i) => i.cat.id !== id);
    },
    clearCart() {
      this.items = [];
    },
  },
});
