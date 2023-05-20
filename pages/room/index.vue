<template>
  <div>
    <client-only>
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
        @delete-item="deleteRoom"
        @restore-item="restoreRoom"
      ></Table>
      <RoomDialogRoom
        :dialog="dialog"
        :title="title"
        :form="form"
        :isAdd="isAdd"
        @save-dialog="addRoom"
        @update-dialog="updateRoomConfirm"
        @close-dialog="closeDialog"
      ></RoomDialogRoom>
      <DialogConfirm
        :dialogConfirm="dialogConfirm"
        :title="title"
        @dialog-confirm-close="closeDialogConfirm"
        @confirm="confirmToggleCategory"
      ></DialogConfirm>
    </client-only>
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
  deleteRoom as deleteRoomApi,
  unDeleteRoom,
} from "~~/service/room";
import RoomDialogRoom from "~~/components/room/DialogRoom.vue";
import DialogConfirm from "~~/components/dialog/DialogConfirm.vue";
import { useNotification } from "@kyvg/vue3-notification";

export default {
  components: {
    LeftBar,
    Footer,
    Table,
    RoomDialogRoom,
    DialogConfirm,
  },
  setup() {
    const notice = useNotification();
    const isAdd = ref(true);
    const isDelete = ref(true);
    const idRoom = ref(null);
    const rooms = ref([]);
    const totalPage = ref(1);
    const dialog = ref(false);
    const dialogConfirm = ref(false);
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
      form.value = {};
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
    function closeDialogConfirm() {
      dialogConfirm.value = false;
    }
    async function confirmToggleCategory() {
      let res;
      if (isDelete.value) {
        res = await deleteRoomApi(idRoom.value);
      } else {
        res = await unDeleteRoom(idRoom.value);
      }
      if (res?.data?.status == 200) {
        renderMessage(
          "success",
          isDelete.value ? "Khóa phòng thành công" : "Mở khóa phòng thành công"
        );
      } else {
        renderMessage(
          "error",
          isDelete.value
            ? "Khóa phòng không thành công"
            : "Mở khóa phòng không thành công"
        );
      }
      initData();
      closeDialogConfirm();
    }
    function deleteRoom(id) {
      isDelete.value = true;
      idRoom.value = parseInt(id);
      title.value = "Bạn có muốn khóa phòng này?";
      dialogConfirm.value = true;
    }
    function restoreRoom(id) {
      isDelete.value = false;
      idRoom.value = parseInt(id);
      title.value = "Bạn có muốn mở khóa phòng này?";
      dialogConfirm.value = true;
    }
    async function addRoom(data) {
      const dataRoom = await createRoom({
        name: data.name,
        numberChair: parseInt(data.numberChair),
      });
      if (dataRoom?.data?.status == 200) {
        renderMessage("success", "Thêm thành công");
      } else {
        renderMessage("error", "Thêm không thành công");
      }
      initData();
      closeDialog();
    }
    async function updateRoomConfirm(data) {
      const dataUpdate = { ...form.value, ...data };
      const dataRoom = await updateRoomApi({
        id: dataUpdate.id,
        name: dataUpdate.name,
        numberChair: parseInt(dataUpdate.numberChair),
      });
      if (dataRoom?.data?.status == 200) {
        renderMessage("success", "Cập nhật thành công");
      } else {
        renderMessage("error", "Cập nhật không thành công");
      }
      initData();
      closeDialog();
    }
    function renderMessage(type, message) {
      notice.notify({
        title: message,
        type: type,
      });
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
      dialogConfirm,
      changePage,
      getRooms,
      updateRoom,
      closeDialog,
      openDialog,
      openAddDialog,
      addRoom,
      updateRoomConfirm,
      confirmToggleCategory,
      closeDialogConfirm,
      deleteRoom,
      restoreRoom,
    };
  },
};
</script>

<style lang="scss" scoped></style>
