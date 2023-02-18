<template>
  <div class="p-4">
    <v-card>
      <v-form @submit.prevent="submitForm()">
        <v-container>
          <v-row class="items-center">
            <v-col cols="4" sm="2">
              <v-text-field
                v-model="search.nameUser"
                label="Tên"
                variant="solo"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="4" sm="2">
              <v-text-field
                v-model="search.email"
                label="Email"
                variant="solo"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="4" sm="2">
              <v-text-field
                v-model="search.phone"
                label="Số điện thoại"
                variant="solo"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="4" sm="2">
              <v-select
                v-model="search.deleteFlg"
                :items="status"
                label="Trạng thái"
                variant="solo"
              ></v-select>
            </v-col>
            <v-col cols="4" sm="2">
              <v-btn
                prepend-icon="mdi-magnify"
                class="btn !bg-sky-400 text-white"
                type="submit"
              >
                Search</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { ref, reactive } from "vue";

export default {
  setup() {
    let search = reactive({
      nameUser: "",
      email: "",
      phone: "",
      deleteFlag: "",
    });
    let status = reactive([
      {
        title: "Tất cả",
        key: 0,
      },
      {
        title: "Hoạt đông",
        key: 1,
      },
      {
        title: "Bị khóa",
        key: 2,
      },
    ]);
    function submitForm() {}
    return { search, status, submitForm };
  },
};
</script>

<style lang="scss" scoped></style>
