<template>
  <div
    class="bg-gradient-to-r from-purple-500 to-pink-500 h-screen flex justify-center items-center flex-col"
  >
    <v-card class="m-auto text-center" height="60%" width="344px">
      <v-card-title class="text-h5 mx-auto mb-5 mt-5">Đăng nhập</v-card-title>
      <v-form
        @submit.prevent="submitForm()"
        class="px-5 flex flex-column justify-center items-center"
      >
        <v-text-field
          class="input-field w-100 mb-4"
          clearable
          label="Email"
          type="email"
          outlined
          append-inner-icon="mdi-email"
          v-model="email"
          :error-messages="errors.email"
        >
        </v-text-field>
        <v-text-field
          @click:appendInner="showPass = !showPass"
          :type="showPass ? 'text' : 'password'"
          :append-inner-icon="
            showPass ? 'mdi-eye-outline ' : 'mdi-eye-off-outline'
          "
          class="w-100 relative"
          label="Mật khẩu"
          clearable
          outlined
          v-model="password"
          :error-messages="errors.password"
        >
        </v-text-field>
        <v-btn class="btn !bg-sky-400 text-white w-9/12 mb-4 mt-4" type="submit"
          >Đăng nhập</v-btn
        >
      </v-form>
      <v-label
        class="!text-black underline"
        @click="goToRegister()"
        text="Đăng ký"
      ></v-label>
    </v-card>
    <notifications />
  </div>
</template>

<script>
import { ref } from "vue";
import { login } from "~~/service/user";
import { useNotification } from "@kyvg/vue3-notification";
import { useForm, useField } from "vee-validate";
import { defineRule } from "vee-validate";
import { required, email, min } from "@vee-validate/rules";
defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
export default {
  setup() {
    definePageMeta({
      layout: false,
    });
    const router = useRouter();
    const notification = useNotification();

    const showPass = ref(false);

    const { handleSubmit, errors } = useForm();

    const { value: password } = useField("password", "required|min:6");
    const { value: email } = useField("email", "required|email");

    const submitForm = handleSubmit((values) => {
      submitLogin(values);
    });

    async function submitLogin(values) {
      let response = await login(values);
      if (response?.data?.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        if (response.data.data.role == "ADMIN") {
          location.replace("/user");
        } else {
          location.replace("/");
        }
      } else {
        notification.notify({
          title: "Tài khoản hoặc mật khẩu không chính xác",
          type: "errors",
        });
      }
    }

    function goToRegister() {
      router.push("/register");
    }
    return {
      email,
      password,
      errors,
      showPass,
      submitForm,
      goToRegister,
    };
  },
};
</script>

<style>
.v-field__append-inner .v-icon {
  font-size: 18px;
  color: inherit;
}
</style>
