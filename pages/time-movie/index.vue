<template>
  <div>
    <v-app class="v-app">
      <LeftBar></LeftBar>
      <v-main>
        <FullCalendar :options="calendarOptions" />
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
      </v-main>
      <Footer></Footer>
    </v-app>
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
import LeftBar from "~~/components/layout/LeftBar.vue";
import Footer from "~~/components/layout/Footer.vue";
import DialogAddTime from "~~/components/time-movie/DialogAddTime.vue";
import { getAllMovie as getAllMovieApi } from "~~/service/movie.ts";
import { getAllRoom as getAllRoomApi } from "~~/service/room.ts";
import { getAllTime, createTimeMovie } from "~~/service/time-movie.ts";
export default {
  components: {
    FullCalendar,
    LeftBar,
    Footer,
    DialogAddTime,
  },
  setup() {
    const timeLine = ref([]);
    const dialog = ref(false);
    const title = ref("Thêm khung giờ chiếu phim");
    const form = reactive({
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
        clickDate(info);
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
        idRoom: parseInt(data.roomIds),
        price: parseInt(data.price),
        timeStart: moment().toISOString(),
        timeEnd: moment(),
      });
      closeDialog();
    }
    async function getAllMovie() {
      // const res = await getAllMovieApi({deleteFlg: false});
      const res = await getAllMovieApi();
      movies.value = res?.data?.data;
    }

    async function getAllRoom() {
      const res = await getAllRoomApi({
        deleteFlg: false,
      });
      // const res = await getAllRoomApi();
      rooms.value = res?.data?.data;
    }

    async function getAllTimeMovie() {
      const res = await getAllTime();
      allTimeByMonth.value = res?.data?.data;
      timeLine.value = allTimeByMonth.value.map((time) => ({
        id: time.id,
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
