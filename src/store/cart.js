export default {
  namespaced: true,
  state: {
    cartItems: [],
  },
  mutations: {
    addToCart(state, { product, quantity }) {
      const existingItem = state.cartItems.find(item => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({ product, quantity });
      }
    },

    removeFromCart(state, productId) {
      state.cartItems = state.cartItems.filter(item => item.product.id !== productId);
    },
  },
  actions: {
    addToCart({ commit }, payload) {
      commit('addToCart', payload);
    },
    removeFromCart({ commit }, productId) {
      commit('removeFromCart', productId);
    },
  },
  getters: {
    getCartItemById: (state) => (productId) => {
      return state.cartItems.find(item => item.product.id === productId);
    },
  },
};
