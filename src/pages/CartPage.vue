<template>
  <div class="cart-container ">
    <h1 class="cart-heading">Shopping Cart</h1>
    <div class="cart-items">
      <div class="cart-item" v-for="item in cartItems" :key="item.product.id">
        <div class="cart-product">
          <img :src="item.product.image[0]" alt="Product" class="cart-product-image" />
          <div class="cart-product-details">
            <span class="cart-product-title">{{ item.product.name }}</span>
            <span class="cart-product-price">{{ item.product.price }} $</span>
            <span class="cart-product-quantity">Quantity: {{ item.quantity }}</span>
            <span class="cart-product-subtotal">Subtotal: {{ calculateSubtotal(item) }} $</span>
            <button @click="removeFromCart(item.product.id)" class="remove-btn">Remove</button>
          </div>
        </div>
      </div>
      <div class="cart-total text-right">
        <span class="cart-total-text ">Total: {{ calculateTotal }} $</span>
      </div>
    </div>

  </div>
  <div class="cart-center-content">
    <q-btn class="bg-purple-btn"  rounded to="/checkout">checkout</q-btn>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'CartPage',
  setup() {
    const store = useStore();

    const cartItems = computed(() => {
      return store.state.cart.cartItems;
    });

    const calculateSubtotal = (cartItem) => {
      return cartItem.product.price * cartItem.quantity;
    };

    const calculateTotal = computed(() => {
      return cartItems.value.reduce((total, item) => total + calculateSubtotal(item), 0);
    });
    const removeFromCart = (productId) => {
      store.dispatch('cart/removeFromCart', productId);
    };

    return {
      cartItems,
      calculateSubtotal,
      calculateTotal,
      removeFromCart
    };
  }
};
</script>

<style scoped>
.cart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.cart-heading {
  font-size: 24px;
  margin-bottom: 20px;
}

.cart-items {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  max-width: 600px;
}

.cart-item {
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 15px;
  display: flex;
  align-items: center;
}

.cart-product {
  display: flex;
  align-items: center;
}

.cart-product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 15px;
}

.cart-product-details {
  display: flex;
  flex-direction: column;
}

.cart-product-title {
  font-size: 18px;
  font-weight: bold;
}

.cart-product-price {
  font-size: 16px;
}

.cart-product-quantity {
  font-size: 14px;
  color: #222;
}

.cart-product-subtotal {
  font-size: 16px;
  font-weight: bold;
  color: #222;
  margin-top: 10px;
}
.cart-center-content{
  display: flex;
  justify-content: center;
}
.remove-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  width: 150px;
}
</style>
