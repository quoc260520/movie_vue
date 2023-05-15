<template>
  <v-row justify="center">
    <v-dialog v-model="dialogVal" persistent width="1024">
      <v-card>
        <v-form @submit.prevent="submitForm()" :validation-schema="form">
          <v-card-title class="!flex justify-center mt-3">
            <span class="text-h5">{{ title }}</span>
            <v-btn
              variant="text"
              class="!absolute top-3 right-0"
              @click="closeDialog"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row class="justify-center">
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Tên mã (*)"
                    required
                    v-model="form.name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Code (*)"
                    required
                    v-model="form.code"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="justify-center">
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Thời gian bắt đầu (*)"
                    required
                    v-model="form.timeStart"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Thời gian kết thúc (*)"
                    required
                    v-model="form.timeEnd"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="justify-center">
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Giảm (*)"
                    required
                    v-model="form.discount"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" variant="flat" @click="closeDialog">
              Hủy
            </v-btn>
            <v-btn
              v-if="isAddItem"
              color="blue"
              variant="flat"
              type="submit"
              @click="saveDialog"
            >
              Thêm
            </v-btn>
            <v-btn
              v-else
              color="blue"
              variant="flat"
              type="submit"
              @click="updateItem"
            >
              Cập nhật
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { computed } from "vue";
import { useForm, useField } from "vee-validate";
import { defineRule } from "vee-validate";
import { required, email, min } from "@vee-validate/rules";
defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
export default {
  name: "Dialog",
  props: {
    dialog: [Boolean],
    title: [String],
    form: [Object, Array],
    isAddItem: [Boolean],
  },
  setup(props, { emit }) {
    const { value: password } = useField("password", "required|min:6");
    const { value: email } = useField("email", "required|email");

    const { handleSubmit, errors } = useForm();

    const submitForm = handleSubmit((values) => {
      alert(JSON.stringify(values));
      // submitLogin(values);
    });
    function closeDialog() {
      emit("dialog-close");
    }
    const dialogVal = computed(() => props.dialog);
    function saveDialog() {
      emit("save-dialog", props.form);
    }
    function updateItem() {
      alert(JSON.stringify(props.form));

      emit("update-item", props.form);
    }
    return {
      dialogVal,
      errors,
      submitForm,
      closeDialog,
      saveDialog,
      updateItem,
    };
  },
};
</script>

<style></style>
