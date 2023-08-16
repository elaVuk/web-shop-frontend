<template>
  <q-layout view="hhh lpR fff">
    <q-header class="bg-head txt-head">
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
          aria-label="Open menu"
          @click="drawer = !drawer"
          v-if="isMobile"
        />
        <q-drawer v-model="drawer" show-if-above="false" side="left" bordered content-class="bg-grey-1" class="min-w-0">
          <drawer-links :toolbar-items="toolbarItems" :handle-item-click="handleItemClick"/>
        </q-drawer>
        <q-tabs v-if="!isMobile">
          <q-route-tab to="/home" router>
            <img src="../assets/logoEV.png" style="height: 40px;width:40px;">
          </q-route-tab>
          <q-route-tab class="header-tab" to="/category" label="Indoor Plants" router/>
          <q-route-tab class="header-tab" to="/category" label="Indoor Plants" router/>
          <q-route-tab class="header-tab" to="/category" label="Indoor Plants" router/>
        </q-tabs>
        <q-tabs>
          <login-button :loggedIn="loggedIn" />
          <q-route-tab to="/cart" router><span class="material-icons header-icons">shopping_cart</span></q-route-tab>
        </q-tabs>

      </q-toolbar>
    </q-header>


    <q-page-container>
      <router-view/>
    </q-page-container>

    <q-footer bordered class="bg-foo text-center">
      <q-toolbar>
        <q-toolbar-title>
          <div class="text-overline">Made by Ela 2023</div>
        </q-toolbar-title>
      </q-toolbar>

    </q-footer>

  </q-layout>
</template>

<script>
import {defineComponent, ref, computed, onMounted, onBeforeMount, onBeforeUnmount, watch} from 'vue'
import DrawerLinks from '../components/DrawerLinks.vue'
import LoginButton from '../components/LoginButton.vue';
export default defineComponent({
  name: 'MainLayout',
  components: {DrawerLinks, LoginButton},
  setup() {
    const drawer = ref(false);
    const isMobile = ref(window.innerWidth <= 600);
    const handleItemClick = (item) => {
      console.log('Clicked on:', item.label);
      drawer.value = false;
    };
    const toolbarItems = [
      {label: 'Home', to: '/home', isRouteTab: true},
      {label: 'Indoor Plants', to: '/category', isRouteTab: true},
      {label: 'Indoor Plants', to: '/category', isRouteTab: true},
      {label: 'Indoor Plants', to: '/category', isRouteTab: true},

    ];
    const loggedIn = computed(() => localStorage.getItem('loggedIn') === 'true');

    const updateIsMobile = () => {
      isMobile.value = window.innerWidth <= 600;
    };

    onMounted(() => {
      window.addEventListener('resize', updateIsMobile);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', updateIsMobile);
    });
    watch(loggedIn, (newValue, oldValue) => {
      console.log('loggedIn prop changed. New value:', newValue);
    });
    return {
      drawer,
      toolbarItems,
      isMobile,
      handleItemClick,
      loggedIn
    }
  }
})
</script>

<style scoped>
.q-tabs {
  display: none;
}

@media screen and (min-width: 601px) {
  .q-tabs {
    display: flex;
  }

  .q-btn-icon {
    display: none;
  }
}
</style>
