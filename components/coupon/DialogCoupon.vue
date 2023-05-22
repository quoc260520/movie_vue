<template>
  <v-row justify="center">
    <v-dialog v-model="dialogVal" persistent width="1024">
      <v-card>
        <v-form @submit.prevent="submitForm()">
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
                    v-model="name"
                    :error-messages="errors.name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Code (*)"
                    required
                    v-model="code"
                    :error-messages="errors.code"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="justify-center">
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Giảm (*)"
                    required
                    v-model="discount"
                    :error-messages="errors.discount"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="justify-center">
                <v-col cols="12" sm="6" md="6" class="justify-center">
                  <div class="space-y-2">
                    <div class="flex items-center space-x-2">
                      <label>Thời gian bắt đầu (*)</label>
                    </div>
                    <VDatePicker
                      v-model="timeStart"
                      mode="dateTime"
                      :min-date="Date.now()"
                      is24hr
                    />
                    <div class="ms-3 text-[#b00020] !text-[12px]">
                      {{ errors.timeStart }}
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" sm="6" md="6" class="justify-center">
                  <div class="space-y-2">
                    <div class="flex items-center space-x-2">
                      <label>Thời gian kết thúc (*)</label>
                    </div>
                    <VDatePicker
                      v-model="timeEnd"
                      mode="dateTime"
                      :min-date="Date.now()"
                      is24hr
                    />
                    <div class="ms-3 text-[#b00020] !text-[12px]">
                      {{ errors.timeEnd }}
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" variant="flat" @click="closeDialog">
              Hủy
            </v-btn>
            <v-btn v-if="isAddItem" color="blue" variant="flat" type="submit">
              Thêm
            </v-btn>
            <v-btn v-else color="blue" variant="flat" type="submit">
              Cập nhật
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { reactive, computed } from "vue";
import { useForm, useField } from "vee-validate";
import { defineRule } from "vee-validate";
import { required, email, min, max, numeric, between } from "@vee-validate/rules";
defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);
defineRule("numeric", numeric);
defineRule("between", between);
export default {
  name: "Dialog",
  props: {
    dialog: [Boolean],
    title: [String],
    form: [Object, Array],
    isAddItem: [Boolean],
  },
  setup(props, { emit }) {
    const dialogVal = computed(() => props.dialog);

    const { handleSubmit, errors } = useForm({
      initialValues: props.form,
    });
    function dateAfter(value) {
      const end = new Date(value).getTime();
      const start = new Date(timeStart.value).getTime();
      if (start <= end) {
        return true;
      }
      return "The end date must be after the start date";
    }

    const { value: name } = useField("name", "required");
    const { value: code } = useField("code");
    const { value: timeStart } = useField("timeStart", "required");
    const { value: timeEnd } = useField("timeEnd", dateAfter);
    const { value: discount } = useField("discount", "required|numeric|between:1,100");

    const submitForm = handleSubmit((values) => {
      submitLogin(values);
    });

    function closeDialog() {
      emit("dialog-close");
    }
    function saveDialog(values) {
      emit("save-dialog", values);
    }
    function updateItem(values) {
      emit("update-item", values);
    }
    function submitLogin(values) {
      if (props.isAddItem) {
        saveDialog(values);
      } else {
        updateItem(values);
      }
    }
    return {
      name,
      code,
      timeStart,
      timeEnd,
      discount,
      errors,
      dialogVal,
      handleSubmit,
      closeDialog,
      saveDialog,
      updateItem,
      submitForm,
    };
  },
};
</script>

<style></style>
