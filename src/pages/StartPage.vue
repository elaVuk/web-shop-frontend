<template>
  <div class="q-pa-md">
    <q-carousel
      v-model="slide"
      transition-prev="scale"
      transition-next="scale"
      swipeable
      animated
      control-color="white"
      navigation
      padding
      arrows
      height="300px"
      class="bg-primary text-white shadow-1 rounded-borders"
    >
      <template v-slot:navigation-icon="{ active, btnProps, onClick }">
        <q-btn v-if="active" size="lg" icon="home" color="yellow" flat round dense @click="onClick"/>
        <q-btn v-else size="sm" :icon="btnProps.icon" color="white" flat round dense @click="onClick"/>
      </template>

      <q-carousel-slide name="style" class="column no-wrap flex-center">
        <q-icon name="style" size="56px"/>
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="tv" class="column no-wrap flex-center">
        <q-icon name="live_tv" size="56px"/>
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="layers" class="column no-wrap flex-center">
        <q-icon name="layers" size="56px"/>
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="map" class="column no-wrap flex-center">
        <q-icon name="terrain" size="56px"/>
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
    </q-carousel>
    <div class="parallax-container">
      <q-parallax :height="parallaxHeight" :speed="0.5">
        <template v-slot:media>
          <img src="../assets/8291510.jpg" :style="{ height: parallaxHeight + 'px' }">
        </template>
      </q-parallax>
    </div>
    <div class="q-mt-xl products-col-gutter-mixed">
      <div class="row q-col-gutter-x-xs q-col-gutter-y-lg">
        <div class="col-6" v-for="n in 4" :key="`none-${n}`">
          <q-card class="my-card">
            <img src="https://cdn.quasar.dev/img/mountains.jpg">
            <q-card-section>
              <div class="text-h6">Our Changing Planet</div>
              <div class="text-subtitle2">by John Doe</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              {{ lorem }}
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <q-parallax class="q-mt-xl" :height="200" :speed="0.5">
      <template v-slot:media>
        <img src="https://cdn.quasar.dev/img/parallax1.jpg">
      </template>

      <h1 class="text-white">Docks</h1>
    </q-parallax>
  </div>
</template>

<script>
import {ref} from 'vue'
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'StartPage',
  setup() {
    return {
      parallaxHeight: 2000 ,
      slide: ref('style'),
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.'
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
</style>

