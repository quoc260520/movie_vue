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
          :rules="[rules.required]"
          class="input-field w-100 mb-4"
          clearable
          label="Họ tên"
          outlined
          append-inner-icon="mdi-account"
          v-model="form.nameUser"
        >
        </v-text-field>
        <v-text-field
          :rules="[rules.required]"
          class="input-field w-100 mb-4"
          clearable
          label="Số điện thoại"
          outlined
          append-inner-icon="mdi-phone"
          v-model="form.phone"
        >
        </v-text-field>
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
          :type="showPass ? 'text' : 'password'"
          :append-inner-icon="
            showPass ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
          "
          class="w-100 relative"
          label="Mật khẩu"
          outlined
          v-model="form.password"
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
import { useNotification } from "@kyvg/vue3-notification";
export default {
  setup() {
    definePageMeta({
      layout: false,
    });
    const notification = useNotification();
    const router = useRouter();
    const form = ref({
      email: "",
      password: "",
      phone: "",
      nameUser: "",
    });

    const rules = reactive({
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
      form,
      rules,
      showPass,
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
