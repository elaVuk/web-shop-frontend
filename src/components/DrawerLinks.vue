<template>
  <q-list>
    <q-item clickable v-for="(item, index) in toolbarItems" :key="index" @click="handleItemClick(item)">
      <q-item-section>
        <router-link :to="item.to" v-if="item.isRouteTab">
          <img v-if="item.icon" :src="item.icon" style="height: 40px;width:40px;">
          <span v-else>{{ item.label }}</span>
        </router-link>
        <q-item-label v-else>
          <span>{{ item.label }}</span>
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  props: {
    toolbarItems: Array,
    handleItemClick: Function,
  },
};
</script>
