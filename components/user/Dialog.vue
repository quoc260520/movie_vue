<template>
  <v-row justify="center">
    <v-dialog v-model="dialogVal" persistent width="1024">
      <v-card>
        <v-card-title class="!flex justify-center mt-3">
          <span class="text-h5">{{ title }}</span>
          <v-btn variant="text !absolute top-3 right-0" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Họ tên*"
                  required
                  v-model="form.nameUser"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  required
                  label="Email*"
                  v-model="form.email"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Số điện thoại*"
                  required
                  v-model="form.phone"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Mật khẩu*"
                  v-model="form.passWord"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="form.role"
                  clearable
                  :items="['ADMIN', 'USER']"
                  label="Quyền"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" variant="flat" @click="closeDialog"> Hủy </v-btn>
          <v-btn color="blue" variant="flat" @click="saveDialog"> Thêm </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { ref, computed } from "vue";
export default {
  name: "Dialog",
  props: {
    dialog: [Boolean],
    title: [String],
    form: [Object, Array],
  },
  setup(props, { emit }) {
    function closeDialog() {
      emit("dialog-close");
    }
    const dialogVal = computed(() => props.dialog);

    function saveDialog() {
      emit("save-dialog");
      console.log(props.form);
    }
    return {
      dialogVal,
      closeDialog,
      saveDialog,
    };
  },
};
</script>

<style></style>
