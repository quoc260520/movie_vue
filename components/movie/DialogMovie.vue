<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialogVal" persistent width="1024">
        <v-form @submit.prevent>
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
                      label="Tên phim (*)"
                      :rules="[rules.required, rules.min]"
                      v-model="form.nameMovie"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      required
                      :rules="[rules.required]"
                      label="Tác giả (*)"
                      v-model="form.author"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      type="number"
                      label="Thời gian (*)"
                      :rules="[rules.maxTime, rules.minTime]"
                      v-model="form.timeMovie"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="form.categoryId"
                      clearable
                      :items="selectVal"
                      item-title="text"
                      item-value="value"
                      :rules="[rules.required]"
                      label="Thể loại (*)"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-textarea
                      clearable
                      label="Mô tả"
                      required
                      v-model="form.description"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-input type="hidden" v-model="form.thumbnail"></v-input>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <v-file-input
                      multiple
                      label="Hình ảnh"
                      @change="uploadFile"
                      ref="fileImages"
                      show-size
                    ></v-file-input>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="2"
                    sm="2"
                    v-for="(url, index) in form.thumbnail"
                    :key="index"
                  >
                    <v-img
                      :width="300"
                      aspect-ratio="1/1"
                      cover
                      :src="url"
                    ></v-img>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                type="submit"
                color="error"
                variant="flat"
                @click="closeDialog"
              >
                Hủy
              </v-btn>
              <v-btn
                v-if="isAddMovie"
                color="blue"
                variant="flat"
                @click="saveDialog"
              >
                Thêm
              </v-btn>
              <v-btn
                v-else
                type="submit"
                color="blue"
                variant="flat"
                @click="updateUser"
              >
                Cập nhật
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { ref, computed } from "vue";
export default {
  name: "Dialog",
  props: {
    dialog: [Boolean],
    title: {
      type: String,
      default: "Thêm phim",
    },
    form: [Object, Array],
    isAddMovie: [Boolean],
    categorys: [Array, Object],
  },
  setup(props, { emit }) {
    const fileImages = ref(null);
    function closeDialog() {
      emit("close-dialog");
    }
    const selectVal = ref([]);
    const dialogVal = computed(() => props.dialog);
    const rules = reactive({
      required: (value) => !!value || "Không được bỏ trống.",
      min: (v) => v.length >= 6 || "Ít nhất 6 ký tự",
      maxTime: (v) => v <= 1000 || "Số giờ quá lớn",
      minTime: (v) => v > 0 || "Số giờ không hợp lệ",
    });
    function uploadFile() {
      props.form.fileImages = fileImages.value.files;
    }
    function saveDialog() {
      emit("save-dialog", props.form);
    }
    function updateUser() {
      emit("update-dialog", props.form);
    }
    watch(
      () => props.categorys,
      (newVal) => {
        selectVal.value = newVal.map((category) => {
          return { text: category.name, value: category.id };
        });
      }
    );
    return {
      rules,
      dialogVal,
      selectVal,
      fileImages,
      closeDialog,
      saveDialog,
      updateUser,
      uploadFile,
    };
  },
};
</script>

<style></style>
