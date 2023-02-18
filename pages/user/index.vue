<template>
  <div>
    <v-app class="v-app">
      <LeftBar></LeftBar>
      <v-main>
        <FormSearch></FormSearch>
        <v-row class="flex justify-end mb-1 mt-2 mr-4">
          <v-btn
            color="success"
            prepend-icon="mdi-account-plus-outline"
            @click="openDialog"
          >
            Thêm
          </v-btn>
        </v-row>
        <Dialog
          :dialog="dialog"
          :title="title"
          :form="form"
          @dialog-close="closeDialog"
        ></Dialog>
        <DialogConfirm
          :dialogConfirm="dialogConfirm"
          :title="title"
          @dialog-confirm-close="closeDialogConfirm"
        ></DialogConfirm>
        <TableUser
          :users="users"
          @row-click="rowClick"
          @delete-user="deleteUser"
          class="p-4 pt-0"
        ></TableUser>
        <v-overlay
          :opacity="1"
          v-model="loading"
          class="flex justify-center items-center"
        >
          <v-progress-circular indeterminate size="48"> </v-progress-circular>
        </v-overlay>
      </v-main>
      <Footer></Footer>
    </v-app>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { getAllUser } from "~~/service/user";
import LeftBar from "~~/components/layout/LeftBar.vue";
import Footer from "~~/components/layout/Footer.vue";
import TableUser from "~~/components/user/TableUser.vue";
import FormSearch from "~~/components/user/FormSearch.vue";
import Dialog from "~~/components/user/Dialog.vue";
import DialogConfirm from "~~/components/user/DialogConfirm.vue";

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
    const tab = ref(null);
    const users = ref([]);
    const loading = ref(true);
    const dialog = ref(false);
    const dialogConfirm = ref(false);
    const title = ref("Thêm người dùng");
    const form = ref({
      nameUser: "",
      email: "",
      phone: "",
      passWord: "",
    });

    async function initData() {
      // const res = await getAllUser();
      // users.value = res?.data?.data;
      loading.value = false;
    }
    function openDialog() {
      title.value = "Thêm người dùng";
      form.value = {};
      dialog.value = true;
    }
    function closeDialog() {
      dialog.value = false;
    }
    function openDialogConfirm() {
      title.value = "Bạn có muốn xóa người dùng này không?";
      dialogConfirm.value = true;
    }
    function closeDialogConfirm() {
      dialogConfirm.value = false;
    }
    function rowClick(id) {
      form.value = {
        form,
        ...id,
      };
      title.value = "Cập nhật người dùng";
      dialog.value = true;
    }
    function deleteUser(id) {
      openDialogConfirm();
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
      openDialog,
      closeDialog,
      rowClick,
      openDialogConfirm,
      closeDialogConfirm,
      deleteUser,
    };
  },
};
</script>

<style lang="scss" scoped></style>
