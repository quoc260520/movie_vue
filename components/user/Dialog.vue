<template>
  <v-row justify="center">
    <v-dialog v-model="dialogVal" persistent width="1024">
      <v-card>
        <v-card-title class="!flex justify-center mt-3">
          <span class="text-h5">{{ title }}</span>
          <v-btn variant="text" class="!absolute top-3 right-0" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Họ tên*"
                  :rules="[rules.required]"
                  required
                  v-model="form.nameUser"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  required
                  :rules="[rules.required, rules.emailRules]"
                  label="Email*"
                  v-model="form.email"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Số điện thoại*"
                  required
                  :rules="[rules.required, rules.phoneRule]"
                  v-model="form.phone"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Mật khẩu*"
                  :rules="[rules.required, rules.min]"
                  v-model="form.password"
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
          <v-btn v-if="isAddUser" color="blue" variant="flat" @click="saveDialog"> Thêm </v-btn>
          <v-btn v-else color="blue" variant="flat" @click="updateUser"> Cập nhật </v-btn>
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
    isAddUser: [Boolean],
  },
  setup(props, { emit }) {
    function closeDialog() {
      emit("dialog-close");
    }
    const dialogVal = computed(() => props.dialog);
    const rules = reactive({
            required: (value) => !!value || "Không được bỏ trống.",
            min: (v) => v.length >= 6 || "Mật khẩu ít nhất 6 ký tự",
            emailRules: (email) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
                "Không đúng định dạng email",
            phoneRule: (phone) => /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(phone) || "Không đúng định dạng số điện thoại"
        });
    function saveDialog() {
      emit("save-dialog", props.form);
    }
    function updateUser() {
      emit("update-dialog", props.form);
    }
    return {
      rules,
      dialogVal,
      closeDialog,
      saveDialog,
      updateUser
    };
  },
};
</script>

<style></style>
