
import { createStore } from "vuex";
import cartModule from './cart';
export default createStore({
  state: {
    cart: []
  },
  modules: {
    cart: cartModule,
  },
});
