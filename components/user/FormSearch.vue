<template>
  <div class="p-4">
    <v-card>
      <v-form @submit.prevent="submitForm()">
        <v-row class="items-center p-4">
          <v-col col="9">
            <v-row>
              <v-col cols="3" sm="3">
                <v-text-field
                  v-model="search.nameUser"
                  label="Họ tên"
                  variant="solo"
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="3" sm="3">
                <v-text-field
                  v-model="search.email"
                  label="Email"
                  variant="solo"
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="3" sm="3">
                <v-text-field
                  v-model="search.phone"
                  label="Số điện thoại"
                  variant="solo"
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="3" sm="3">
                <v-select
                  v-model="search.deleteFlg"
                  :items="status"
                  item-title="title"
                  item-value="value"
                  label="Trạng thái"
                  variant="solo"
                ></v-select>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="3">
            <v-row>
              <v-col class="flex justify-end">
                <v-btn
                  prepend-icon="mdi-magnify"
                  class="btn !bg-sky-400 text-white"
                  type="submit"
                >
                  Tìm kiếm</v-btn
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { ref, reactive } from "vue";

export default {
  setup(props, {emit}) {
    const search = reactive({
      nameUser: "",
      email: "",
      phone: "",
      deleteFlg: "",
    });
    const status = reactive([
      {
        title: "Tất cả",
        value: '',
      },
      {
        title: "Hoạt đông",
        value: false,
      },
      {
        title: "Bị khóa",
        value: true,
      },
    ]);
    function submitForm() {
      emit('search', search)
    }
    return { search, status, submitForm };
  },
};
</script>

<style lang="scss" scoped></style>
