<template>
  <div>
    <client-only>
      <v-row cols="12" class="max-h-screen">
        <v-col cols="9">
          <FullCalendar :options="calendarOptions" />
        </v-col>
        <v-col cols="3" class="max-h-screen overflow-y-scroll scroll-auto">
          <v-card
            class="mx-auto mr-2 !overflow-y-scroll"
            variant="outlined"
            height="90vh"
          >
            <v-card-item
              v-for="time in timeOfDate"
              :key="time.id"
              class="border border-solid border-cyan-500 m-2"
            >
              <div class="text-red-600">
                <span class="text-gray-900 text-lg">Phòng: </span
                >{{ time.roomShowtime.name }}
              </div>
              <div class="text-red-600">
                <span class="text-gray-900 text-lg">Tên phim: </span
                >{{ time.movieShowtime.nameMovie }}
              </div>
              <div class="text-red-600">
                <span class="text-gray-900 text-lg">Giá vé: </span>
                {{
                  new Intl.NumberFormat("EUR", {
                    maximumSignificantDigits: 3,
                  }).format(time.price)
                }}
                vnd
              </div>
              <div class="flex flex-col">
                <div class="text-gray-900 text-lg">Thời gian</div>
                <div>
                  <v-timeline direction="horizontal" side="end">
                    <v-timeline-item dot-color="green" size="x-small">
                      {{ new Date(time.timeStart).toLocaleString() }}
                    </v-timeline-item>
                    <v-timeline-item dot-color="green" size="x-small">
                      {{ new Date(time.timeEnd).toLocaleString() }}
                    </v-timeline-item>
                  </v-timeline>
                </div>
              </div>
              <div class="float-right">
                <v-btn
                  variant="outlined"
                  color="warning"
                  class="mr-2"
                  @click="gotoUpdate(time)"
                  ><v-icon icon="mdi-open-in-new"></v-icon
                ></v-btn>
                <v-btn
                  variant="outlined"
                  color="error"
                  @click="confirmDelete(time.id)"
                  ><v-icon icon="mdi-delete-empty"></v-icon
                ></v-btn>
              </div>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
      <DialogAddTime
        :dialog="dialog"
        :form="form"
        :title="title"
        :isAddItem="isAddItem"
        :movies="movies"
        :rooms="rooms"
        @dialog-close="closeDialog"
        @save-dialog="addTime"
        @update-item="updateItem"
      ></DialogAddTime>
      <DialogConfirm
        :dialogConfirm="dialogConfirm"
        :title="title"
        @dialog-confirm-close="closeDialogConfirm"
        @confirm="deleteTimeMovie"
      ></DialogConfirm>
      <div v-show="popupDialog" class="popup flex flex-col">
        <div
          class="absolute right-[10px] cursor-pointer"
          @click="popupDialog = false"
        >
          <v-icon size="x-small">mdi-close</v-icon>
        </div>
        <div class="mt-[15px]">
          <v-btn variant="text" size="small" @click="openAddTime"
            >Thêm khung giờ</v-btn
          >
        </div>
        <div>
          <v-btn variant="text" size="small" @click="openUpdateTime"
            >Cập nhật khung giờ</v-btn
          >
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import moment from "moment";
import "@fullcalendar/core";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import DialogAddTime from "~~/components/time-movie/DialogAddTime.vue";
import DialogConfirm from "~~/components/dialog/DialogConfirm.vue";
import { getAllMovie as getAllMovieApi } from "~~/service/movie.ts";
import { getAllRoom as getAllRoomApi } from "~~/service/room.ts";
import {
  getAllTime,
  createTimeMovie,
  updateTimeMovie as updateTimeMovieApi,
  deleteTimeMovie as deleteTimeMovieApi,
} from "~~/service/time-movie.ts";
import { useNotification } from "@kyvg/vue3-notification";
export default {
  components: {
    FullCalendar,
    DialogAddTime,
    DialogConfirm,
  },
  setup() {
    const notification = useNotification();
    const timeLine = ref([]);
    const dialog = ref(false);
    const title = ref("Thêm khung giờ chiếu phim");
    const form = ref({
      movieId: "",
      roomIds: [],
      price: "",
      startDate: "",
      endDate: "",
    });
    const dialogConfirm = ref(false);
    const popupDialog = ref(false);
    const infoDateClick = ref({});
    const timeOfDate = ref({});
    const isAddItem = ref(true);
    const movies = ref([]);
    const rooms = ref([]);
    const allTimeByMonth = ref([]);
    const idTimeDelete = ref("");
    const calendarOptions = reactive({
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
      initialView: "dayGridMonth",
      height: "100%",
      headerToolbar: {
        left: "prev,today,next",
        center: "title",
        right: "dayGridMonth,timeGridDay", // user can switch between the two
      },
      titleFormat: {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      },
      buttonText: {
        today: "Hôm nay",
        month: "Tháng",
        day: "Ngày",
      },
      buttonIcons: {
        prev: "chevron-left",
        next: "chevron-right",
      },
      events: timeLine.value,
      dateClick: function (info) {
        infoDateClick.value = info;
        showPopup(info.jsEvent.clientX, info.jsEvent.clientY);
        popupDialog.value = true;
      },
      eventClick: function (info) {
        console.log(info);
      },
    });
    function clickDate(data) {
      form.value = {
        ...form.value,
        startDate: new Date(data.date),
        endDate: new Date(data.date),
      };
      openDialog();
    }

    function showPopup(x, y) {
      const popup = document.querySelector(".popup");
      popup.style.left = x + "px";
      popup.style.top = y + "px";
    }
    function openDialog() {
      dialog.value = true;
    }

    function closeDialog() {
      dialog.value = false;
    }
    async function addTime(data) {
      const res = await createTimeMovie({
        idMovie: parseInt(data.movieId),
        idRoom: data.roomIds,
        price: parseInt(data.price),
        timeStart: moment(data.startDate).toISOString(),
        timeEnd: moment(data.endDate).toISOString(),
      });
      if (res?.data?.status == 200) {
        renderMessage("success", "Thêm khung giờ thành công");
        closeDialog();
        getAllTimeMovie();
      } else {
        renderMessage("error", "Thêm khung giờ không thành công");
      }
    }
    function openAddTime() {
      popupDialog.value = false;
      var clickedDate = infoDateClick.value.date;
      var now = new Date();
      now.setHours(0, 0, 0, 0);
      if (clickedDate >= now) {
        isAddItem.value = true;
        clickDate(infoDateClick.value);
      } else {
        return;
      }
    }
    async function openUpdateTime() {
      const res = await getAllTime({
        timeStart: moment(infoDateClick.value.date).toISOString(),
      });
      timeOfDate.value = res?.data?.data;
      popupDialog.value = false;
    }
    async function getAllMovie() {
      const res = await getAllMovieApi({ deleteFlg: false });
      movies.value = res?.data?.data;
    }

    async function getAllRoom() {
      const res = await getAllRoomApi({
        deleteFlg: false,
      });
      rooms.value = res?.data?.data;
    }

    async function deleteTimeMovie() {
      closeDialogConfirm();
      const res = await deleteTimeMovieApi(idTimeDelete.value);
      if (res?.data?.status == 200) {
        renderMessage("success", "Xóa khung giờ thành công");
        openUpdateTime();
        getAllTimeMovie();
      } else {
        renderMessage("error", "Xóa khung giờ không thành công");
      }
    }

    async function getAllTimeMovie() {
      const res = await getAllTime();
      allTimeByMonth.value = res?.data?.data;
      timeLine.value = allTimeByMonth.value.map((time) => ({
        id: time.id,
        title: time.roomShowtime.name,
        start: time.timeStart,
        end: time.timeEnd,
      }));
      calendarOptions.events = timeLine.value;
    }
    function gotoUpdate(time) {
      isAddItem.value = false;
      form.value = {
        id: time.id,
        movieId: time.id,
        roomIds: [time.idRoom],
        price: time.price,
        startDate: new Date(time.timeStart),
        endDate: new Date(time.timeEnd),
      };
      title.value = "Cập nhật khung giờ";
      openDialog();
    }
    function closeDialogConfirm() {
      dialogConfirm.value = false;
    }
    function confirmDelete(id) {
      idTimeDelete.value = id;
      dialogConfirm.value = true;
      title.value = "Bạn có chắc chắn xóa khung giờ này không";
    }
    function renderMessage(type, message) {
      notification.notify({
        title: message,
        type: type,
      });
    }
    async function updateItem(data) {
      const res = await updateTimeMovieApi(data);
      if (res?.data?.status == 200) {
        renderMessage("success", "Cập nhật khung giờ thành công");
        openUpdateTime();
        getAllTimeMovie();
      } else {
        renderMessage("error", "Cập nhật khung giờ không thành công");
      }
    }

    onBeforeMount(() => {
      getAllMovie();
      getAllRoom();
      getAllTimeMovie();
    });
    return {
      calendarOptions,
      dialog,
      title,
      isAddItem,
      form,
      movies,
      rooms,
      popupDialog,
      timeOfDate,
      dialogConfirm,
      clickDate,
      openDialog,
      closeDialog,
      addTime,
      openAddTime,
      openUpdateTime,
      deleteTimeMovie,
      closeDialogConfirm,
      confirmDelete,
      gotoUpdate,
      updateItem,
    };
  },
};
</script>

<style lang="scss" scoped>
:deep() {
  .fc {
    .fc-button {
      .fc-icon {
        vertical-align: initial !important;
      }
    }
  }
}
.popup {
  position: absolute;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 99;
}
</style>
