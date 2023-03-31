<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialogVal" persistent width="620">
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
                <v-col cols="9" sm="9">
                  <v-select
                    v-model="form.movieId"
                    :items="moviesData"
                    item-title="nameMovie"
                    item-value="id"
                    :rules="[rules.required]"
                    label="Tên phim (*)"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row class="justify-center flex-row">
                <v-col cols="4" sm="4" class="justify-center">
                  <div class="space-y-2">
                    <div class="flex items-center space-x-2">
                      <label> Thời gian bắt đầu </label>
                    </div>
                    <VDatePicker
                      v-model="date"
                      mode="time"
                      :timezone="timezone"
                      :rules="rulesTime"
                      is24hr
                    />
                  </div>
                </v-col>
                <v-col cols="4" sm="4" class="justify-center">
                  <div class="space-y-2">
                    <div class="flex items-center space-x-2">
                      <label> Thời gian kết thúc </label>
                    </div>
                    <VDatePicker
                      v-model="date"
                      mode="time"
                      :timezone="timezone"
                      :rules="rulesTime"
                      is24hr
                    />
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
            <v-btn
              v-if="isAddItem"
              color="blue"
              variant="flat"
              @click="saveDialog"
            >
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
import { ref, reactive, computed } from "vue";
export default {
  name: "DialogSlide",
  props: {
    dialog: [Boolean],
    title: [String],
    form: [Object, Array],
    isAddItem: [Boolean],
    movies: [Object, Array],
  },
  setup(props, { emit }) {
    const rules = reactive({
      required: (value) => !!value || "Không được bỏ trống.",
    });
    const fileImage = ref(null);
    const moviesData = ref({});
    const date = ref(new Date());
    const rulesTime = ref({
      minutes: { interval: 5 },
    });
    function uploadFile() {
      props.form.fileImage = fileImage.value.files;
    }
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
    watch(
      () => props.movies,
      (newVal) => {
        moviesData.value = newVal;
      }
    );
    return {
      dialogVal,
      rules,
      fileImage,
      moviesData,
      date,
      rulesTime,
      closeDialog,
      saveDialog,
      updateItem,
      uploadFile,
    };
  },
};
</script>

<style></style>
