<template>
  <div>
    <q-icon v-if="loggedIn" name="logout" @click="logout" class="log-icon" />
    <q-icon v-else name="login" @click="login" class="log-icon" />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginButton',
  props: {
    loggedIn: Boolean
  },
  setup(props) {
    const router = useRouter();

    const logout = () => {
      localStorage.setItem('loggedIn', 'false');
      location.reload();
    };

    const login = () => {
      if (!props.loggedIn) {
        router.push('/login');
      } else {
        localStorage.setItem('loggedIn', 'true');
        location.reload();
      }
    };

    return {
      logout,
      login
    };
  }
};
</script>

<style scoped>
.log-icon {
  font-size: 30px;
}
</style>
