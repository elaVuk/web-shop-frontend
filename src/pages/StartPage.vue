<template>
  <div class="q-pa-md">
    <q-carousel
      v-model="slide"
      swipeable
      animated
      :autoplay="autoplay"
      :control-type="controlType"
      control-color="white"
      infinite
      navigation
      arrows
    >
      <q-carousel-slide
        v-for="(item, index) in sliderItems"
        :key="index"
        :name="String(index + 1)"
        class="carousel-q-slide text-center"
      >
        <div class="carousel-slide-image-container">
          <img :src="item.image" class="carousel-slide-image text-center" @click="navigateToOtherPage(item.pageUrl)"
               alt="slider pics">
          <div class="carousel-q-slide-content ">
            <div class="carousel-slide-text text-center q-pa-md">
              <div class=" js-slider-headline-t text-h4 text-center">
                {{ item.headlinetext }}
              </div>
              <div class="q-mt-xs js-slider-t text-h6 text-center">
                {{ item.slidertext }}
              </div>
            </div>
            <div class="carousel-slide-button">
              <q-btn
                unelevated rounded
                class="slider-btn"
                style="text-transform: none;"
                label="Mehr erfahren"
                :ripple="{ center: true }"
              ></q-btn>
            </div>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>

    <h3 class="text-center text-break-line q-py-lg">Plant your future</h3>

    <div class="row justify-center q-col-gutter-x-md q-col-gutter-y-lg">
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 " v-for="product in bestseller" :key="product.id">
        <q-card
          class="my-card"
          @click="navigateToProduct(product.id)"
        >
          <img :src="getFirstImage(product)" alt="Bestsellers">

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


      <div class=" q-mt-xl equal-columns">
        <div class="row">
          <div class="col first-equal-column">
            <q-img style="border-radius: 50%" src="../assets/teaser.jpg">
              <div class=" absolute-full text-h6 flex flex-center">
                Cherishing Earth: Our Home, Our Heart, Our Tomorrow.
              </div>
            </q-img>
          </div>
          <div class="col second-equal-column">
            <p class="second-ec-p">
              "Amidst the tapestry of life on our planet, lush greenery and vibrant blooms of plants stand as nature's
              masterpiece, nurturing both the Earth and our souls. With each leaf that rustles in the wind, and every
              blossom that reaches for the sun, a harmonious dance unfolds, reminding us of our interconnectedness with
              the delicate balance of our world."
            </p>
            <q-btn outline rounded  class="font-purple second-eq-btn" label="SEE MORE" />
          </div>
        </div>
      </div>


    <q-parallax class="q-mt-xl q-mb-xl" :height="400" :speed="0.5">
      <template v-slot:media>
        <img src="../assets/monstera.jpg" alt="parallax">
      </template>
      <div class="text-white text-h4">Revive your world with the colors of flowers.</div>
    </q-parallax>
  </div>
</template>

<script>
import {ref, onMounted} from 'vue'
import {defineComponent} from 'vue'
import {useRouter} from "vue-router";
import axios from "axios";
import productsData from "app/server/db.json";

export default defineComponent({
  name: 'StartPage',
  setup() {
    const slide = ref(0);
    const autoplay = ref(true);
    const sliderItems = ref([]);
    const controlType = ref('flat');
    const bestseller = ref([]);
    const router = useRouter();

    const getFirstImage = (product) => {
      if (product.image && product.image.length > 0) {
        return product.image;

      } else {
        return "";
      }
    };
    const navigateToOtherPage = (pageUrl) => {
      router.push(pageUrl);
    };
    const fetchData = async () => {
      try {
        const response = await axios.get('../../server/db.json');
        sliderItems.value = response.data.slide;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    onMounted(() => {
      fetchData();
      bestseller.value = productsData.bestseller;

    });

    return {
      parallaxHeight: 2000,
      slide,
      autoplay,
      sliderItems,
      controlType,
      navigateToOtherPage,
      bestseller,
      getFirstImage,
      navigateToProduct(productId) {
        router.push({name: "ProductPage", params: {id: productId}});
      }
    }
  },
  methods: {
    DescriptionLimitFilter: function (value) {
      if (!value) return '';
      if (value.length <= 50) {
        return value;
      } else {
        return value.slice(0, 50) + '...';
      }
    }
  }
})
</script>


<style lang="sass">
.products-col-gutter-mixed
  &__.my-card
    padding: 10px 15px

.parallax-container
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  overflow: hidden
  z-index: -1

  &__img
    width: 100%
    height: 100%
    object-fit: cover

.q-carousel
  height: 750px

.carousel-slide-image-container
  width: 100%
  max-width: 100%
  display: flex
  justify-content: center
  align-items: center
  position: relative

.carousel-slide-image
  height: 680px
  width: 100%

.carousel-q-slide-content
  position: absolute
  top: 40%
  background: rgba(243, 243, 243, 0.2)
  padding: 20px

.carousel-slide-text
  color: white

.text-break-line
  font-family: 'Pacifico', cursive
  font-weight: 500
  letter-spacing: 2px
  color: #6c3483
  background: rgba(108, 52, 131, 0.1)

.second-equal-column
  display: flex
  flex-direction: column
  align-self: center
.second-eq-btn
    max-width: 150px
    min-width: 120px
    align-self: center
.second-ec-p
  text-align: center
  padding: 30px

@media(max-width: 768px)
  .text-h4
    font-size: 1.8rem
    line-height: 1.8rem
  .text-h6
    font-size: 1rem
    line-height: 1.1rem
  .slider-btn
    font-size: 18px
</style>

