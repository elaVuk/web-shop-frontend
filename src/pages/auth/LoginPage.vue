<template>
  <div class="row form-container">
    <div class="col-4 col-md-6 col-xs-12 col-sm-12 justify-center items-center flex ">
      <div class="form-background q-pa-xl">
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
        >
          <q-input
            filled
            v-model="username"
            label="Your username *"
            hint="Username"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type your username']"
          />

          <q-input
            filled
            type="password"
            v-model="password"
            label="Your Password *"
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || 'Please type your password',
              val => val.length >= 6 || 'Password must be at least 6 characters long'
            ]"

          />
          <div class="q-mt-xl">
            <q-btn label="Submit" rounded type="submit" class="full-width bg-purple-btn"/>
          </div>

          <div class=" q-mt-xl text-center">
            <div class="q-mb-md">Dont't have an account?</div>
            <q-btn class="full-width font-purple" outline rounded to="/register"> Register Here</q-btn>
          </div>


        </q-form>
      </div>
    </div>
  </div>
</template>
<script>
import { useQuasar } from 'quasar';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'LoginPage',

  setup() {
    const $q = useQuasar();
    const username = ref(null);
    const password = ref(null);
    const router = useRouter();

    const onSubmit = async () => {
      if (!username.value || !password.value) {
        $q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to fill all fields',
        });
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const users = await response.json();
        const foundUser = users.find(user => user.username === username.value);

        if (foundUser && foundUser.password === password.value) {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Login successful',
          });
          localStorage.setItem('loggedIn', 'true');
          console.log('User successfully logged in. loggedIn prop:', localStorage.getItem('loggedIn'));

          router.push('/home');
        } else {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Invalid credentials. Please check your username and password',
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    return {
      username,
      password,
      onSubmit,
    };
  },
});
</script>

