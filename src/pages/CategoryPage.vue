<template>
  <div class="row">
    <div class="q-pa-md" style="max-width: 350px">
      <q-list bordered separator>
        <q-item
          v-for="product in products"
          :key="product.id"
          clickable
          v-ripple
        >
          <q-item-section>{{ product.name }}</q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="q-pa-md row items-start q-gutter-md" style="width: 80%">
      <q-card
        v-for="product in products"
        :key="product.id"
        class="my-card"
      >
        <img :src="product.image">

        <q-card-section>
          <div class="text-h6">{{ product.name }}</div>
          <div class="text-subtitle2">{{ product.category }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ product.description }}
          <q-badge outline color="orange" :label="product.category" />
          <div class="price text-subtitle2 text-red-8">from {{ product.price }}$</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import {defineComponent,onMounted, ref} from "vue";
import productsData from "../../server/db.json";

export default defineComponent({
  name: 'CategoryPage',
  setup() {
    const products = ref([]);
    onMounted(() => {
      products.value = productsData.products;
    });
    return {
       products
    }
  }
})
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
