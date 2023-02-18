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
          :rules="[rules.required, rules.emailRules]"
          class="input-field w-100 mb-4"
          clearable
          label="Email"
          outlined
          append-inner-icon="mdi-email"
          v-model="form.email"
        >
        </v-text-field>
        <v-text-field
          @click:appendInner="showPass = !showPass"
          :rules="[rules.required, rules.min]"
          :type="showPass ? 'text' : 'passWord'"
          :append-inner-icon="
            showPass ? 'mdi-eye-outline ' : 'mdi-eye-off-outline'
          "
          class="w-100 relative"
          label="Mật khẩu"
          clearable
          outlined
          v-model="form.passWord"
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
  </div>
</template>
<script>
import { ref, reactive } from "vue";
import { getAllUser, getUser, login } from "~~/service/user";

export default {
  setup() {
    const router = useRouter();
    let form = ref({
      email: "",
      passWord: "",
    });

    let snackbar = ref(false);
    let message = ref(null);
    const timeout = ref(2000);

    let rules = reactive({
      required: (value) => !!value || "Không được bỏ trống.",
      min: (v) => v.length >= 6 || "Mật khẩu ít nhất 6 ký tự",
      emailRules: (email) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
        "Không đúng định dạng email",
    });

    const showPass = ref(false);

    let errors = ref(null);

    async function submitForm() {
      let response = await login(form.value);
      if (response?.data?.status === 200) {
        location.replace("/user");
      } else {
        message.value = "Tài khoản hoặc mật khẩu không chính xác";
        snackbar.value = true;
      }
    }

    async function getUsers() {
      const data = await getAllUser();
    }

    function goToRegister() {
      router.push("/register");
    }
    return {
      form,
      errors,
      rules,
      showPass,
      timeout,
      snackbar,
      message,
      submitForm,
      getUsers,
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
