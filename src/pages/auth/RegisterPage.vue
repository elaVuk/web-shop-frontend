<template>
  <div class="row form-container">
    <div class="col-md-6 col-xs-12 col-sm-12 justify-center items-center flex ">
      <div class="form-background q-pa-xl">
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
        >
          <q-input
            filled
            v-model="name"
            label="Your Name and Surname"
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || 'Please type your password',
              val => val.length >= 6 || 'Password must be at least 6 characters long'
            ]"
          />
          <q-input
            filled
            type="email"
            v-model="email"
            label="Your E-Mail"
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || 'Please type your password',
              val => val.length >= 6 || 'Password must be at least 6 characters long'
            ]"
          />
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

          <div class="q-mt-xl text-center">
            <div class="q-mb-md">You have an account?</div>
            <q-btn class="full-width font-purple" outline rounded to="/login">Login Here</q-btn>
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import axios from 'axios';

export default defineComponent({
  name: 'RegisterPage',
  setup() {
    const $q = useQuasar();
    const name = ref(null);
    const email = ref(null);
    const username = ref(null);
    const password = ref(null);
    const router = useRouter();

    const onSubmit = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        const existingUser = response.data.find(user => user.username === username.value || user.email === email.value);

        if (existingUser) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "Username or email already exists",
          });
          return;
        }

        const newUser = {
          id: response.data.length + 1,
          name: name.value,
          username: username.value,
          email: email.value,
          password: password.value,
        };

        await axios.post('http://localhost:3000/users', newUser);

        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Registration successful",
        });

        router.push("/login");
      } catch (error) {
        console.error(error);

        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "An error occurred while registering",
        });
      }
    };

    return {
      name,
      email,
      username,
      password,
      onSubmit,
    };
  },
});
</script>

