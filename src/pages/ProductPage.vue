<template>
  <q-page>
      <div class="row flex-center q-mt-lg justify-center">
        <div class="col-md-7 col-xs-12">
          <div class="q-pa-md">
            <q-carousel
              swipeable
              animated
              v-model="slide"
              thumbnails
              infinite
            >
              <q-carousel-slide v-for="(image, index) in selectedProductImages" :key="index" :name="index"
                                :img-src="image"/>
            </q-carousel>
          </div>

        </div>
        <div class="col-md-5 col-xs-12 q-gutter-md q-pa-xl-xl">
          <div class="flex q-ma-xl q-gutter-md center">
            <div class="title text-h6">
              {{ selectedProduct.name }}
            </div>
            <div class="price  font-purple text-h4">{{ selectedProduct.price }} $</div>
            <div class="product review">

            </div>
            <div class="product-description text-body2"> {{ selectedProduct.description }}</div>
            <div>
              <div class="flex items-center">
                <div class="delivery clearfix">{{ selectedProduct.delivery }}</div>
                <div>
                  <span @click="icon = true" class="material-icons info-icon fs-30">info</span>
                  <q-dialog v-model="icon">
                    <q-card>
                      <q-card-section class="row items-center q-pb-none">
                        <div class="text-h6">Delivery Info</div>
                        <q-space/>
                        <q-btn icon="close" flat round dense v-close-popup/>
                      </q-card-section>

                      <q-card-section>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate
                        voluptas
                        eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut,
                        natus
                        minima, porro labore.
                      </q-card-section>
                    </q-card>
                  </q-dialog>
                </div>
              </div>

              <div>
                <q-btn class=" product-button q-mt-sm bg-purple-btn  text-capitalize q-pl-lg q-pr-lg" rounded
                       label="Add to Cart" @click="addToCart"></q-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
  </q-page>
</template>

<script>
import {ref, onMounted, computed} from 'vue';
import axios from 'axios';
import {useRoute} from "vue-router";
import {useStore} from "vuex";

export default {
  setup() {
    const slide = ref(0);
    const icon = ref(false);
    const productImages = ref([]);
    const selectedProduct = ref({});
    const route = useRoute();
    const productId = computed(() => {
      return parseInt(route.params.id);
    });
    const store = useStore();

    async function fetchProductImages() {
      try {
        const response = await axios.get('../../server/db.json');
        const products = response.data.products;
        const product = products.find(prod => prod.id === productId.value);

        if (product) {
          selectedProduct.value = product;
          productImages.value = product.image;
        }
      } catch (error) {
        console.error('Error fetching product images:', error);
      }
    }

    onMounted(() => {
      fetchProductImages(route.params.id);
    });

    const selectedProductImages = computed(() => {
      return selectedProduct.value.image || [];
    });

    const addToCart = () => {
      store.dispatch('cart/addToCart', {product: selectedProduct.value, quantity: 1});
    };

    return {
      slide,
      productImages,
      selectedProduct,
      selectedProductImages,
      addToCart,
      icon

    };
  }
};
</script>
<style scoped>
.q-carousel {
  height: 500px;
}
</style>
