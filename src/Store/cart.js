import { defineStore } from "pinia";

const CART_KEY = "shopping_cart";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: JSON.parse(localStorage.getItem(CART_KEY) || "[]"),
  }),
  getters: {
    totalQuantity: (state) =>
      state.items.reduce((total, item) => total + item.count, 0),
    totalPrice: (state) =>
      state.items.reduce((total, item) => total + item.price * item.count, 0),
    quantityOf: (state) => (id) =>
      state.items.find((item) => item.id === id)?.count || 0,
  },
  actions: {
    persist() {
      localStorage.setItem(CART_KEY, JSON.stringify(this.items));
    },
    add(dish) {
      const item = this.items.find((entry) => entry.id === dish.id);
      if (item) {
        item.count += 1;
      } else {
        this.items.push({
          id: dish.id,
          name: dish.name,
          description: dish.description,
          price: dish.price,
          emoji: dish.emoji,
          count: 1,
        });
      }
      this.persist();
    },
    decrease(id) {
      const item = this.items.find((entry) => entry.id === id);
      if (!item) return;

      if (item.count > 1) {
        item.count -= 1;
      } else {
        this.remove(id);
        return;
      }
      this.persist();
    },
    remove(id) {
      this.items = this.items.filter((item) => item.id !== id);
      this.persist();
    },
    clear() {
      this.items = [];
      this.persist();
    },
  },
});
