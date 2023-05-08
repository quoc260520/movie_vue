<template>
  <div>
    <v-app class="v-app">
      <LeftBar></LeftBar>
      <v-main>
        <FormSearch @search="searchUser"></FormSearch>
        <!-- <div>
          <v-row class="flex justify-end mb-1 mt-2 mr-4">
            <v-btn
              color="success"
              prepend-icon="mdi-account-plus-outline"
              @click="openDialog"
            >
              Thêm
            </v-btn>
          </v-row>
        </div> -->
        <!--
        <Dialog
          :dialog="dialog"
          :isAddUser="isAddUser"
          :title="title"
          :form="form"
          @dialog-close="closeDialog"
          @save-dialog="saveDialog"
          @update-dialog="updateUserApi"
        ></Dialog>
        <DialogConfirm
          :dialogConfirm="dialogConfirm"
          :title="title"
          @dialog-confirm-close="closeDialogConfirm"
          @confirm="confirmToggleUser"
        ></DialogConfirm>
        <TableUser
          :users="users"
          :totalPage="totalPage"
          @row-click="rowClick"
          @delete-user="deleteUserConfirm"
          @restore-delete-user="restoreDeleteUser"
          @update-page="updatePage"
          class="p-4 pt-0"
        ></TableUser>
        <v-overlay
          :opacity="1"
          v-model="loading"
          class="flex justify-center items-center"
        >
          <v-progress-circular indeterminate size="48"> </v-progress-circular>
        </v-overlay> -->
      </v-main>
      <Footer></Footer>
    </v-app>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import {
  getAllUser,
  register,
  deleteUser,
  unDeleteUser,
  updateUser,
} from "~~/service/user";
import LeftBar from "~~/components/layout/LeftBar.vue";
import Footer from "~~/components/layout/Footer.vue";
import TableUser from "~~/components/user/TableUser.vue";
import FormSearch from "~~/components/user/FormSearch.vue";
import Dialog from "~~/components/user/Dialog.vue";
import DialogConfirm from "~~/components/user/DialogConfirm.vue";
import { useNotification } from "@kyvg/vue3-notification";
import { TYPE_CONFIRM } from "~~/constants";
export default {
  components: {
    LeftBar,
    Footer,
    TableUser,
    FormSearch,
    Dialog,
    DialogConfirm,
  },
  setup() {
    const notification = useNotification();
    const tab = ref(null);
    const users = ref([]);
    const loading = ref(true);
    const dialog = ref(false);
    const dialogConfirm = ref(false);
    const title = ref("Thêm người dùng");
    const isAddUser = ref(true);
    const form = ref({
      nameUser: "",
      email: "",
      phone: "",
      password: "",
      role: "",
    });
    const formSearch = ref({
      nameUser: "",
      email: "",
      phone: "",
      deleteFlg: "",
    });
    const idDelete = ref(null);
    const typeConfirm = ref(null);
    const totalPage = ref(1);

    function renderMessage(type, message) {
      notification.notify({
        title: message,
        type: type,
      });
    }
    async function initData(data = null) {
      const res = await getAllUser(data);
      users.value = res?.data?.data;
      totalPage.value = res?.data?.page;
      loading.value = false;
    }

    function openDialog() {
      title.value = "Thêm người dùng";
      isAddUser.value = true;
      form.value = {};
      dialog.value = true;
    }

    function closeDialog() {
      dialog.value = false;
    }

    function openDialogConfirm() {
      title.value = "Bạn có muốn xóa người dùng này không?";
      typeConfirm.value = TYPE_CONFIRM.DELETE;
      dialogConfirm.value = true;
    }

    function closeDialogConfirm() {
      dialogConfirm.value = false;
    }

    function rowClick(data) {
      form.value = {
        form,
        ...data,
      };
      title.value = "Cập nhật người dùng";
      isAddUser.value = false;
      dialog.value = true;
    }

    function deleteUserConfirm(id) {
      idDelete.value = id;
      openDialogConfirm();
    }

    function confirmToggleUser() {
      if (typeConfirm.value === TYPE_CONFIRM.DELETE) {
        confirmDelete();
      } else if (typeConfirm.value === TYPE_CONFIRM.RESTORE) {
        restoreUser();
      }
    }

    async function confirmDelete() {
      const response = await deleteUser(idDelete.value);
      if (!response?.data?.message) {
        renderMessage("success", "Xóa tài khoản thành công");
        initData();
      } else {
        renderMessage("error", "Xóa tài khoản không thành công");
      }
      closeDialogConfirm();
    }
    async function saveDialog(data) {
      const response = await register(data);
      if (response?.data?.status === 200) {
        renderMessage("success", "Thêm tài khoản thành công");
        initData();
      } else {
        renderMessage("error", "Thêm tài khoản không thành công");
      }
      closeDialog();
    }
    async function updateUserApi(data) {
      const response = await updateUser({
        id: data.id,
        nameUser: data.nameUser,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: data.role,
      });
      if (response?.data?.status === 200) {
        renderMessage("success", "Cập nhật tài khoản thành công");
        initData();
      } else {
        renderMessage("error", "Cập nhật tài khoản không thành công");
      }
      closeDialog();
    }
    async function restoreUser() {
      const response = await unDeleteUser(idDelete.value);
      if (!response?.data?.message) {
        renderMessage("success", "Khôi phục tài khoản thành công");
        initData();
      } else {
        renderMessage("error", "Khôi phục tài khoản không thành công");
      }
      closeDialogConfirm();
    }

    function restoreDeleteUser(id) {
      idDelete.value = id;
      title.value = "Bạn có muốn khôi phục tài khoản này không?";
      typeConfirm.value = TYPE_CONFIRM.RESTORE;
      dialogConfirm.value = true;
    }
    function updatePage(page = 1) {
      const params = {
        ...formSearch.value,
        skip: page * 10 - 10,
      };
      initData(params);
    }
    function searchUser(data) {
      formSearch.value = { ...formSearch.value, ...data };
      updatePage();
    }
    onBeforeMount(() => {
      initData();
    });
    return {
      tab,
      users,
      loading,
      dialog,
      title,
      form,
      dialogConfirm,
      idDelete,
      isAddUser,
      totalPage,
      formSearch,
      openDialog,
      closeDialog,
      rowClick,
      openDialogConfirm,
      closeDialogConfirm,
      deleteUserConfirm,
      saveDialog,
      confirmDelete,
      restoreDeleteUser,
      confirmToggleUser,
      restoreUser,
      updateUserApi,
      renderMessage,
      updatePage,
      searchUser,
    };
  },
};
</script>

<style lang="scss" scoped></style>
