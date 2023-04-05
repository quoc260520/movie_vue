<template>
  <div>
    <v-app class="v-app">
      <LeftBar></LeftBar>
      <v-main>
        <v-row class="flex justify-end mt-2 mr-4">
          <v-btn color="success" prepend-icon="mdi-plus" @click="openAddDialog">
            Thêm phòng
          </v-btn>
        </v-row>
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
          :isAdd="isAdd"
          @save-dialog="addRoom"
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
import {
  getAllRoom,
  createRoom,
  updateRoom as updateRoomApi,
} from "~~/service/room";
import RoomDialogRoom from "~~/components/room/DialogRoom.vue";
export default {
  components: {
    LeftBar,
    Footer,
    Table,
    RoomDialogRoom,
  },
  setup() {
    const isAdd = ref(true);
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
    function openAddDialog() {
      isAdd.value = true;
      title.value = "Thêm phòng";
      openDialog();

    }
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
      isAdd.value = false;
      openDialog();
    }
    function closeDialog() {
      dialog.value = false;
    }
    async function addRoom(data) {
      const dataRoom = await createRoom({
          name: data.name,
          numberChair: parseInt(data.numberChair)
      });
      initData();
      closeDialog();
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
      isAdd,
      changePage,
      getRooms,
      updateRoom,
      closeDialog,
      openDialog,
      openAddDialog,
      addRoom
    };
  },
};
</script>

<style lang="scss" scoped></style>
