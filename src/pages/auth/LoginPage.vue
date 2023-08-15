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
import {useQuasar} from 'quasar';
import {defineComponent, ref} from "vue";
import users from "../../../server/db.json";
import {useRouter} from 'vue-router';
export default defineComponent({
  name: 'LoginPage',

  setup() {
    const $q = useQuasar();
    const username = ref(null);
    const password = ref(null);
    const router = useRouter();

    return {
      username,
      password,
      onSubmit () {
        if (!username.value || !password.value) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "You need to fill all fields",
          });
          return;
        }

        const user = users.users;
        const selectedUser = user['username'];
        const selectedPw= user['password'];

        console.log([name.value])
        console.log(user)
        console.log(selectedUser)

        console.log(selectedPw)
        console.log(password.value)

        if (selectedUser && selectedPw === password.value) {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Login successful",
          });
          router.push("/home");
        } else {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "Invalid credentials. Please check your username and password",
          });
        }
      }

    }
  }
})

</script>
