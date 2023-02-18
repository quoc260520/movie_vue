<template>
  <div
    class="bg-gradient-to-r from-purple-500 to-pink-500 h-screen flex justify-center items-center flex-col"
  >
    <v-card class="m-auto text-center" height="70%" width="344px">
      <v-card-title class="text-h5 mx-auto mb-5 mt-5">Đăng ký</v-card-title>
      <v-form
        @submit.prevent="submitForm()"
        class="px-5 flex flex-column justify-center items-center"
      >
        <v-text-field
          :rules="[rules.required]"
          class="input-field w-100 mb-4"
          clearable
          label="Họ tên"
          outlined
          append-inner-icon="fa-regular fa-user"
          v-model="form.nameUser"
        >
        </v-text-field>
        <v-text-field
          :rules="[rules.required]"
          class="input-field w-100 mb-4"
          clearable
          label="Số điện thoại"
          outlined
          append-inner-icon="fa-solid fa-phone"
          v-model="form.phone"
        >
        </v-text-field>
        <v-text-field
          :rules="[rules.required, rules.emailRules]"
          class="input-field w-100 mb-4"
          clearable
          label="Email"
          outlined
          append-inner-icon="fa-regular fa-envelope"
          v-model="form.email"
        >
        </v-text-field>
        <v-text-field
          @click:appendInner="showPass = !showPass"
          :rules="[rules.required, rules.min]"
          :type="showPass ? 'text' : 'passWord'"
          :append-inner-icon="
            showPass ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'
          "
          class="w-100 relative"
          label="Mật khẩu"
          clearable
          outlined
          v-model="form.passWord"
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
import { ref, reactive } from "vue";
import { register } from "~~/service/user";

export default {
  setup() {
    const router = useRouter();
    let form = ref({
      email: "",
      passWord: "",
      phone: "",
      nameUser: "",
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

    async function submitForm() {
      let response = await register(form.value);
      if (response?.data?.status === 200) {
        goToLogin();
      } else {
        snackbar.value = true;
        message.value = "Đăng ký không thành công";
      }
    }

    function goToLogin() {
      router.push("/login");
    }

    return {
      form,
      rules,
      showPass,
      timeout,
      snackbar,
      message,
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
