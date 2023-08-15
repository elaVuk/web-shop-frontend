<template>
  <div class="row">
    <div class="q-pa-md col-3 q-hide-sm">
      <q-list bordered separator>
        <q-item
          v-for="product in products"
          :key="product.id"
          clickable
          v-ripple
          @click="navigateToProduct(product.id)"
        >
          <q-item-section>{{ product.name }}</q-item-section>
          <q-item-section avatar>
            <span class="material-icons icon-flower">filter_vintage</span>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="col-9">
      <div class="q-pa-md row  q-gutter-md">
        <q-card
          v-for="product in products"
          :key="product.id"
          class="my-card"
          @click="navigateToProduct(product.id)"
        >
          <img :src="getFirstImage(product)">

          <q-card-section>
            <div class="text-h6">{{ product.name }}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            {{ DescriptionLimitFilter(product.description) }}
            <div class="q-gutter-xs q-pt-xs">
              <q-badge class="bg-badge" :label="product.category"/>
              <div class="price text-h6">from {{ product.price }}$</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, onMounted, ref} from "vue";
import productsData from "../../server/db.json";
import {useRouter} from "vue-router";

export default defineComponent({
  name: 'CategoryPage',
  setup() {
    const products = ref([]);

    const router = useRouter();
    const getFirstImage = (product) => {
      if (product.image && product.image.length > 0) {
        return product.image[0];

      } else {
        return "";
      }
    };
    onMounted(() => {
      products.value = productsData.products;
    });
    return {
      products,
      getFirstImage,
      navigateToProduct(productId) {
        router.push({name: "ProductPage", params: {id: productId}});
      }
    }
  },
  methods: {
    DescriptionLimitFilter: function (value) {
      if (!value) return '';
      if (value.length <= 150) {
        return value;
      } else {
        return value.slice(0, 150) + '...';
      }
    }
  }
})
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px

  &:hover
    background-color: rgba(243, 243, 243, 0.5)

</style>
