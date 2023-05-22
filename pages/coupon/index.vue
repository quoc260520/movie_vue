<template>
  <div>
    <client-only>
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
        :totalPage="totalPage"
        @delete-item="deleteConfirm"
        @restore-item="restoreConfirm"
        @row-click="rowClick"
        @update-page="updatePage"
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
        :isAddItem="isAddItem"
        @dialog-close="closeDialog"
        @save-dialog="addCoupon"
      ></DialogCoupon>
    </client-only>
  </div>
</template>

<script>
import Table from "~~/components/table/Table.vue";
import DialogConfirm from "~~/components/dialog/DialogConfirm.vue";
import DialogCoupon from "~~/components/coupon/DialogCoupon.vue";
import moment from "moment";
import { useNotification } from "@kyvg/vue3-notification";
import {
  getAllCoupon as getAllCouponApi,
  createCoupon,
  deleteCoupon,
  unDeleteCoupon
} from "~~/service/coupon.ts";
export default {
  components: {
    DialogConfirm,
    Table,
    DialogCoupon,
  },
  setup() {
    const notification = useNotification();
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
      timeStart: new Date(),
      timeEnd: new Date(),
      code: "",
      discount: "",
    });
    const coupons = ref([]);
    const dialogConfirm = ref(false);
    const dialog = ref(false);
    const title = ref("Thêm mã giảm giá");
    const isAddItem = ref(true);
    const isDelete = ref(true);
    const idCoupon = ref(0);
    const currentPage = ref(1);
    const totalPage = ref(1);

    function deleteConfirm(id) {
      idCoupon.value = id;
      isDelete.value = true;
      dialogConfirm.value = true;
      title.value = "Bạn có muốn xóa mã giảm giá này không?"
    }
    function restoreConfirm(id) {
      idCoupon.value = id;
      isDelete.value = false;
      dialogConfirm.value = true;
      title.value = "Bạn có muốn hoàn tác mã giảm giá này không?"
    }
    function rowClick() {}
    function closeDialogConfirm() {
      dialogConfirm.value = false;
    }
    async function confirmToggleCoupon() {
      if(isDelete.value) {
        await deleteCoupon(idCoupon.value)
      } else {
        await unDeleteCoupon(idCoupon.value)
      }
      getAllCoupon();
      closeDialogConfirm();
    }
    function openDialog() {
      title.value = "Thêm mã giảm giá";
      isAddItem.value = true;
      dialog.value = true;
    }
    function closeDialog() {
      dialog.value = false;
    }
    function optionGet(skip = 1, take = 10) {
      return {
        skip: (skip - 1) * take,
        take: take,
      };
    }
    async function addCoupon(data) {
      const res = await createCoupon({
        name: (data.name).toUpperCase(),
        timeStart: moment(data.timeStart).toISOString(),
        timeEnd: moment(data.timeEnd).toISOString(),
        discount: parseInt(data.discount),
      });
      if (res?.data?.status == 200) {
        renderMessage("success", "Thêm mã giảm giá thành công");
        getAllCoupon();
      } else {
        renderMessage("error", "Thêm mã giảm giá không thành công");
      }
      closeDialog();
    }
    async function getAllCoupon(option = {}) {
      const res = await getAllCouponApi(option);
      coupons.value = res?.data?.data;
      totalPage.value = res?.data?.page;
    }
    async function updatePage(page) {
      currentPage.value = page;
      getAllCoupon(optionGet(page));
    }
    function renderMessage(type, message) {
      notification.notify({
        title: message,
        type: type,
      });
    }
    onMounted(() => {
      getAllCoupon(optionGet());
    });
    return {
      headers,
      coupons,
      dialogConfirm,
      title,
      dialog,
      form,
      isAddItem,
      totalPage,
      openDialog,
      deleteConfirm,
      restoreConfirm,
      rowClick,
      closeDialogConfirm,
      confirmToggleCoupon,
      closeDialog,
      addCoupon,
      getAllCoupon,
      updatePage,
    };
  },
};
</script>

<style lang="scss" scoped></style>
