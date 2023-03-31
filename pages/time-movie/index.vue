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
          @dialog-close="closeDialog"
        ></DialogAddTime>
      </v-main>
      <Footer></Footer>
    </v-app>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
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
export default {
  components: {
    FullCalendar,
    LeftBar,
    Footer,
    DialogAddTime,
  },
  setup() {
    const calendarOptions = reactive({
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
      initialView: "dayGridMonth",
      height: "100%",
      headerToolbar: {
        left: "prev,today,next",
        center: "title",
        right: "dayGridMonth,timeGridDay", // user can switch between the two
      },
      titleFormat: { year: "numeric", month: "numeric", day: "numeric" },
      buttonText: {
        today: "Hôm nay",
        month: "Tháng",
        day: "Ngày",
      },
      buttonIcons: {
        prev: "chevron-left",
        next: "chevron-right",
      },
      events: [
        { title: "event 1", date: "2023-03-01" },
        { title: "event 2", date: "2023-03-02" },
      ],
      dateClick: function (info) {
        clickDate();
      },
    });
    const dialog = ref(false);
    const title = ref("Thêm khung giờ chiếu phim");
    const form = reactive({});
    const isAddItem = ref(true);
    const movies = ref([]);
    function clickDate() {
      openDialog();
    }
    function openDialog() {
      dialog.value = true;
    }
    function closeDialog() {
      dialog.value = false;
    }
    async function getAllMovie() {
      // const res = await getAllMovieApi({deleteFlg: false});
      const res = await getAllMovieApi();
      movies.value = res?.data?.data;
    }
    onBeforeMount(() => {
      getAllMovie();
    });
    return {
      calendarOptions,
      dialog,
      title,
      isAddItem,
      form,
      movies,
      clickDate,
      openDialog,
      closeDialog,
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
