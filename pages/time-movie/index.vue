<template>
  <div>
    <client-only>
      <v-row cols="12" class="max-h-screen">
        <v-col cols="9">
          <FullCalendar :options="calendarOptions" />
        </v-col>
        <v-col cols="3" class="max-h-screen overflow-y-scroll scroll-auto">
          <v-card class="mx-auto mr-2" variant="outlined" height="90vh">
            <v-card-item v-for="n in 1">
              <div>
                <div class="text-overline mb-1">OVERLINE</div>
                <div class="text-h6 mb-1">Headline</div>
                <div class="text-caption">
                  Greyhound divisely hello coldly fonwderfully
                </div>
              </div>
            </v-card-item>
            <v-card-actions>
              <v-btn variant="outlined" color="warning"> Cập nhật </v-btn>
            </v-card-actions>
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
      ></DialogAddTime>
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
import { getAllMovie as getAllMovieApi } from "~~/service/movie.ts";
import { getAllRoom as getAllRoomApi } from "~~/service/room.ts";
import { getAllTime, createTimeMovie } from "~~/service/time-movie.ts";
export default {
  components: {
    FullCalendar,
    DialogAddTime,
  },
  setup() {
    const timeLine = ref([]);
    const dialog = ref(false);
    const title = ref("Thêm khung giờ chiếu phim");
    const form = reactive({
      movieId: "",
      roomIds: [],
      price: "",
      startDate: new Date(),
      endDate: new Date(),
    });
    const isAddItem = ref(true);
    const movies = ref([]);
    const rooms = ref([]);
    const allTimeByMonth = ref([]);
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
        var clickedDate = info.date;
        var now = new Date();
        now.setHours(0, 0, 0, 0);
        if (clickedDate >= now) {
          clickDate(info);
        } else {
          return;
        }
      },
      eventClick: function (info) {
        console.log(info);
      },
    });
    function clickDate(data) {
      form.startDate = new Date(data.date);
      form.endDate = new Date(data.date);
      openDialog();
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
      closeDialog();
      getAllTimeMovie();
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
      clickDate,
      openDialog,
      closeDialog,
      addTime,
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
</style>
