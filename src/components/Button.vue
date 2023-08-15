{
<template>
  <q-btn
    v-bind="$attrs"
    :class="BtnClass"
    @click="$emit('click')"
  >
    {{ label }}
    <slot></slot>
  </q-btn>
</template>

<script>
import {QBtn} from 'quasar';

export default {
  name: 'ProductButton',
  components: {
    QBtn
  },
  props: {
    label: {
      type: String,
      required: true
    },
    BtnClass: String,
  }
};
</script>

<style scoped>
q-btn {
  width: 200px;

}
</style>
}
