<template>
  <div>
    <v-app class="v-app">
      <LeftBar></LeftBar>
      <v-main>
        <Table
          :headers="headers"
          :items="rooms"
          :totalPage="totalPage"
          @updatePage="changePage"
          @row-click="updateRoom"
        ></Table>
        <RoomDialogRoom
          :dialog="dialog"
          :title="title"
          :form="form"
          @close-dialog="closeDialog"
        ></RoomDialogRoom>
      </v-main>
      <Footer></Footer>
    </v-app>
  </div>
</template>

<script>
import LeftBar from "~~/components/layout/LeftBar.vue";
import Footer from "~~/components/layout/Footer.vue";
import Table from "~~/components/table/Table.vue";
import { ref, reactive } from "vue";
import { getAllRoom, createRoom, updateRoom as updateRoomApi } from "~~/service/room";
import RoomDialogRoom from "~~/components/room/DialogRoom.vue";
export default {
  components: {
    LeftBar,
    Footer,
    Table,
    RoomDialogRoom,
  },
  setup() {
    const rooms = ref([]);
    const totalPage = ref(1);
    const dialog = ref(false);
    const title = ref();
    const form = ref({
      name: "",
      numberChair: "",
    });
    const headers = reactive([
      {
        title: "Phòng",
        key: "name",
      },
      {
        title: "Số ghế",
        key: "numberChair",
      },
      ,
      {
        title: "Trạng thái",
        key: "deleteFlg",
      },
      {
        title: "Thao tác",
        key: "action",
        sortable: false,
        width: "10%",
      },
    ]);
    function openDialog() {
      dialog.value = true;
    }
    function initData() {
      getRooms();
    }
    async function getRooms(data = {}) {
      const dataRoom = await getAllRoom(data);
      rooms.value = dataRoom?.data?.data;
      totalPage.value = dataRoom?.data?.page;
    }
    async function changePage(page) {
      getRooms({ take: (page - 1) * 10 });
    }
    function updateRoom(data) {
      form.value = { ...form.value, ...data };
      title.value = "Cập nhật phòng";
      openDialog();
    }
    function closeDialog() {
      dialog.value = false;
    }
    onBeforeMount(() => {
      initData();
    });
    return {
      headers,
      rooms,
      totalPage,
      dialog,
      form,
      title,
      changePage,
      getRooms,
      updateRoom,
      closeDialog,
    };
  },
};
</script>

<style lang="scss" scoped></style>
