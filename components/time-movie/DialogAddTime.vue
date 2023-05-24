<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialogVal" persistent width="620">
        <v-form @submit.prevent="submitForm()">
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
                <v-row class="justify-center">
                  <v-col cols="6" sm="6">
                    <v-select
                      v-model="movieId"
                      :items="moviesData"
                      :error-messages="errors.movieId"
                      item-title="nameMovie"
                      item-value="id"
                      label="Tên phim (*)"
                      required
                      @update:modelValue="changeMovie"
                    ></v-select>
                  </v-col>
                  <v-col cols="3" sm="3">
                    <v-text-field
                      disabled
                      label="Thời gian"
                      v-model="time"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="justify-center">
                  <v-col cols="9" sm="9">
                    <v-select
                      v-model="roomIds"
                      :error-messages="errors.roomIds"
                      :items="rooms"
                      item-title="name"
                      item-value="id"
                      label="Phòng (*)"
                      chips
                      :multiple="isAddItem"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row class="justify-center">
                  <v-col cols="9" sm="9">
                    <v-text-field
                      label="Giá vé (*)"
                      v-model="price"
                      :error-messages="errors.price"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="justify-center flex-row">
                  <v-col cols="4" sm="4" class="justify-center">
                    <div class="space-y-2">
                      <div class="flex items-center space-x-2">
                        <label> Thời gian bắt đầu </label>
                      </div>
                      <VDatePicker v-model="startDate" mode="time" is24hr />
                      <div class="text-[#b00020] !text-[12px]">
                        {{ errors.startDate }}
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="4" sm="4" class="justify-center">
                    <div class="space-y-2">
                      <div class="flex items-center space-x-2">
                        <label> Thời gian kết thúc </label>
                      </div>
                      <VDatePicker v-model="endDate" mode="time" is24hr />
                      <div class="text-[#b00020] !text-[12px]">
                        {{ errors.endDate }}
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
              <v-btn type="submit" v-if="isAddItem" color="blue" variant="flat">
                Thêm
              </v-btn>
              <v-btn v-else type="submit" color="blue" variant="flat">
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
import { useForm, useField } from "vee-validate";
import { defineRule } from "vee-validate";
import { required, min, max, numeric } from "@vee-validate/rules";
defineRule("required", required);
defineRule("min", min);
defineRule("max", max);
defineRule("numeric", numeric);
export default {
  name: "DialogAddTime",
  props: {
    dialog: Boolean,
    title: String,
    isAddItem: Boolean,
    form: [Object, Array],
    movies: [Object, Array],
    rooms: [Object, Array],
  },
  setup(props, { emit }) {
    const moviesData = ref({});
    const time = ref(0);

    function closeDialog() {
      emit("dialog-close");
    }
    const dialogVal = computed(() => props.dialog);
    function saveDialog(values) {
      emit("save-dialog", values);
    }
    function updateItem(values) {
      emit("update-item", { ...values, id: props.form.id });
    }
    function dateAfter(value) {
      const end = new Date(value).getTime();
      const start = new Date(startDate.value).getTime();
      if (start > end) {
        return "The end time must be after the start time";
      }
      if (movieId.value) {
        const movie = props.movies.find((movie) => movie.id === movieId.value);
        if (movie && end - start < movie.timeMovie * 60 * 1000) {
          return "Movie show time is not enough";
        }
      }
      return true;
    }
    const { handleSubmit, errors, resetForm, setFieldValue } = useForm({
      initialValues: props.form,
    });
    const { value: movieId } = useField("movieId", "required");
    const { value: roomIds } = useField("roomIds", "required");
    const { value: price } = useField("price", "required");
    const { value: startDate } = useField("startDate", "required");
    const { value: endDate } = useField("endDate", dateAfter);
    const submitForm = handleSubmit((values) => {
      if (props.isAddItem) {
        saveDialog(values);
      } else {
        updateItem(values);
      }
    });
    function changeMovie(id) {
      const movie = props.movies.find((movie) => movie.id === id);
      time.value = movie.timeMovie;
    }
    watch(
      () => props.form,
      (newVal, prev) => {
        resetForm();
        if (!props.isAddItem) {
          setFieldValue("movieId", newVal.movieId);
          setFieldValue("roomIds", newVal.roomIds);
          setFieldValue("price", newVal.price);
        }
        setFieldValue("startDate", newVal.startDate);
        setFieldValue("endDate", newVal.endDate);
      }
    );
    watch(
      () => props.movies,
      (newVal) => {
        moviesData.value = newVal;
      }
    );
    return {
      dialogVal,
      moviesData,
      errors,
      movieId,
      roomIds,
      price,
      startDate,
      endDate,
      time,
      changeMovie,
      handleSubmit,
      submitForm,
      closeDialog,
      saveDialog,
      updateItem,
    };
  },
};
</script>

<style></style>
