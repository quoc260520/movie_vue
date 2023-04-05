<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialogVal" persistent width="1024">
        <v-card>
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
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Tên phòng (*)"
                    :rules="[rules.required, rules.min]"
                    v-model="form.name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    required
                    :rules="[rules.required]"
                    label="Số ghế (*)"
                    v-model="form.numberChair"
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
            <v-btn v-if="isAdd" color="blue" variant="flat" @click="saveDialog">
              Thêm
            </v-btn>
            <v-btn v-else color="blue" variant="flat" @click="updateItem">
              Cập nhật
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { ref, computed } from "vue";
export default {
  name: "DialogRoom",
  props: {
    dialog: Boolean,
    title: {
      type: String,
      default: "Thêm phòng",
    },
    form: [Object, Array],
    isAdd: Boolean,
  },
  setup(props, { emit }) {
    const dialogVal = computed(() => props.dialog);
    const rules = reactive({
      required: (value) => !!value || "Không được bỏ trống.",
      min: (v) => v.length >= 6 || "Ít nhất 6 ký tự",
    });
    function saveDialog() {
      emit("save-dialog", props.form);
    }
    function updateItem() {
      emit("update-dialog", props.form);
    }
    function closeDialog() {
      emit("close-dialog");
    }
    return {
      rules,
      dialogVal,
      closeDialog,
      saveDialog,
      updateItem,
    };
  },
};
</script>

<style></style>
