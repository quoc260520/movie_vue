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
            <v-row class="justify-center">
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Tên danh mục (*)"
                  :rules="[rules.min, rules.required]"
                  required
                  v-model="form.name"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" variant="flat" @click="closeDialog"> Hủy </v-btn>
          <v-btn v-if="isAddItem" color="blue" variant="flat" @click="saveDialog"> Thêm </v-btn>
          <v-btn v-else color="blue" variant="flat" @click="updateItem"> Cập nhật </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { ref, reactive, computed } from "vue";
export default {
  name: "Dialog",
  props: {
    dialog: [Boolean],
    title: [String],
    form: [Object, Array],
    isAddItem: [Boolean],
  },
  setup(props, { emit }) {
    const rules = reactive({
      required: (value) => !!value || "Không được bỏ trống.",
      min: (v) => v.length >= 6 || "Tên danh mục ít nhất 6 ký tự",
    });
    function closeDialog() {
      emit("dialog-close");
    }
    const dialogVal = computed(() => props.dialog);
    function saveDialog() {
      emit("save-dialog", props.form);
    }
    function updateItem() {
      emit("update-item", props.form);
    }
    return {
      dialogVal,
      rules,
      closeDialog,
      saveDialog,
      updateItem
    };
  },
};
</script>

<style></style>
