<template>
  <div>
    <v-app class="v-app">
      <LeftBar></LeftBar>
      <v-main>
        <FullCalendar :options="calendarOptions" />
      </v-main>
      <Footer></Footer>
    </v-app>
  </div>
</template>

<script>
import { reactive } from "vue";
import "@fullcalendar/core";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import LeftBar from "~~/components/layout/LeftBar.vue";
import Footer from "~~/components/layout/Footer.vue";
export default {
  components: {
    FullCalendar,
    LeftBar,
    Footer,
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
        
      },
    });
    return { calendarOptions };
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
