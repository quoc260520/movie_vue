<template>
  <div>
    <v-app class="v-app">
      <LeftBar></LeftBar>
      <client-only>
        <v-main>
          <v-row class="flex justify-end mt-2 mr-4">
            <v-btn
              color="success"
              prepend-icon="mdi-plus-circle"
              @click="openDialog"
            >
              Thêm mã giảm giá
            </v-btn>
          </v-row>
          <Table
            :headers="headers"
            :items="coupons"
            @delete-item="deleteConfirm"
            @restore-item="restoreConfirm"
            @row-click="rowClick"
          ></Table>
          <DialogConfirm
            :dialogConfirm="dialogConfirm"
            :title="title"
            @dialog-confirm-close="closeDialogConfirm"
            @confirm="confirmToggleCoupon"
          ></DialogConfirm>
          <DialogCoupon
            :title="title"
            :dialog="dialog"
            :form="form"
            @dialog-close="closeDialog"
          ></DialogCoupon>
        </v-main>
      </client-only>
      <Footer></Footer>
    </v-app>
    <notifications />
  </div>
</template>

<script>
import LeftBar from "~~/components/layout/LeftBar.vue";
import Footer from "~~/components/layout/Footer.vue";
import Table from "~~/components/table/Table.vue";
import DialogConfirm from "~~/components/dialog/DialogConfirm.vue";
import DialogCoupon from "~~/components/coupon/DialogCoupon.vue";
export default {
  components: {
    LeftBar,
    Footer,
    DialogConfirm,
    Table,
    DialogCoupon,
  },
  setup() {
    const headers = reactive([
      {
        title: "Tên mã",
        key: "name",
        width: "15%",
        align: "center",
      },
      {
        title: "Thời gian bắt đầu",
        key: "timeStart",
        width: "15%",
      },
      {
        title: "Thời gian kết thúc",
        key: "timeEnd",
        width: "15%",
      },
      {
        title: "Mã code",
        key: "code",
        width: "15%",
      },
      {
        title: "Giảm",
        key: "discount",
        width: "15%",
      },
      ,
      {
        title: "Trạng thái",
        key: "deleteFlg",
        width: "15%",
      },
      {
        title: "Thao tác",
        key: "action",
        sortable: false,
        width: "10%",
      },
    ]);
    const form = ref({
      id: "",
      name: "",
      timeStart: "",
      timeEnd: "",
      code: "",
      discount: "",
    });
    const coupons = ref([]);
    const dialogConfirm = ref(false);
    const dialog = ref(false);
    const title = "Thêm mã giảm giá";
    function deleteConfirm() {}
    function restoreConfirm() {}
    function rowClick() {}
    function closeDialogConfirm() {}
    function confirmToggleCoupon() {}
    function openDialog() {
      dialog.value = true;
    }
    function closeDialog() {
      dialog.value = false;
    }
    return {
      headers,
      coupons,
      dialogConfirm,
      title,
      dialog,
      form,
      openDialog,
      deleteConfirm,
      restoreConfirm,
      rowClick,
      closeDialogConfirm,
      confirmToggleCoupon,
      closeDialog,
    };
  },
};
</script>

<style lang="scss" scoped></style>
