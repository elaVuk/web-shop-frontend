<template>
  <q-layout view="hhh lpR fff">

    <q-header elevated class="bg-head txt-head" height-hint="98">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          <q-avatar>
            <img src="../assets/logoEV.png">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="center">
        <q-route-tab to="/category" label="Category One" router/>
        <q-route-tab to="/category" label="Category Two" router/>
        <q-route-tab to="/category" label="Category Three" router/>
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {

  },

  setup () {
  }
})
</script>
<style>
.bg-head{
  background-color: #E89E73;
}
.txt-head{
  color: #ffdfcc;
}
.product{
  color: #4b9784;
}
</style>
