<template>
  <div
    class="bg-gradient-to-r from-purple-500 to-pink-500 h-screen flex justify-center items-center flex-col"
  >
    <notifications />
    <v-card class="m-auto text-center" height="70%" width="344px">
      <v-card-title class="text-h5 mx-auto mb-5 mt-5">Đăng ký</v-card-title>
      <v-form
        @submit.prevent="submitForm()"
        class="px-5 flex flex-column justify-center items-center"
      >
        <v-text-field
          class="input-field w-100 mb-4"
          clearable
          label="Họ tên"
          outlined
          append-inner-icon="mdi-account"
          :error-messages="errors.nameUser"
          v-model="nameUser"
        >
        </v-text-field>
        <v-text-field
          class="input-field w-100 mb-4"
          clearable
          label="Số điện thoại"
          outlined
          append-inner-icon="mdi-phone"
          v-model="phone"
          :error-messages="errors.phone"
        >
        </v-text-field>
        <v-text-field
          class="input-field w-100 mb-4"
          clearable
          label="Email"
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
            showPass ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
          "
          class="w-100 relative"
          label="Mật khẩu"
          outlined
          v-model="password"
          :error-messages="errors.password"
        >
        </v-text-field>
        <v-btn class="btn !bg-sky-400 text-white w-9/12 mb-4 mt-4" type="submit"
          >Đăng ký</v-btn
        >
      </v-form>
      <v-label
        class="!text-black underline"
        @click="goToLogin()"
        text="Đăng nhập"
      ></v-label>
    </v-card>
  </div>
</template>

<script>
import { ref } from "vue";
import { register } from "~~/service/user";
import { useNotification } from "@kyvg/vue3-notification";
import { useForm, useField } from "vee-validate";
import { defineRule } from "vee-validate";
import { required, email, min, digits, between } from "@vee-validate/rules";
defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("digits", digits);
defineRule("between", between);
export default {
  setup() {
    definePageMeta({
      layout: false,
    });
    const notification = useNotification();
    const router = useRouter();

    const { handleSubmit, errors } = useForm();

    const { value: email } = useField("email", "required|email");
    const { value: nameUser } = useField("nameUser", "required");
    const { value: password } = useField("password", "required|min:6");
    const { value: phone } = useField("phone", "required|digits:10");

    const submitForm = handleSubmit((values) => {
      submitRegister(values);
    });

    const showPass = ref(false);

    async function submitRegister(values) {
      let response = await register(values);
      if (response?.data?.status === 200) {
        goToLogin();
      } else {
        notification.notify({
          title: "Đăng ký không thành công",
          type: "error",
        });
      }
    }

    function goToLogin() {
      router.push("/login");
    }

    return {
      showPass,
      errors,
      email,
      nameUser,
      phone,
      password,
      submitForm,
      goToLogin,
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
