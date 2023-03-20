<template>
  <div>
    <v-app class="v-app">
      <LeftBar></LeftBar>
      <v-main>
        <v-row class="flex justify-end mt-2 mr-4">
          <v-btn
            color="success"
            prepend-icon="mdi-plus-circle"
            @click="openDialog"
          >
            Thêm
          </v-btn>
        </v-row>
        <Table
          :headers="headers"
          :items="categorys"
          @delete-item="deleteConfirm"
          @restore-item="restoreConfirm"
          @row-click="rowClick"
        ></Table>
        <DialogConfirm
          :dialogConfirm="dialogConfirm"
          :title="title"
          @dialog-confirm-close="closeDialogConfirm"
          @confirm="confirmToggleCategory"
        ></DialogConfirm>
        <DialogCategory
          :is-add-item="isAddItem"
          :title="title"
          :dialog="dialog"
          :form="form"
          @dialog-close="dialogClose"
          @update-item="updateCategory"
          @save-dialog="addCategory"
        ></DialogCategory>
      </v-main>
      <Footer></Footer> 
    </v-app
    >
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import LeftBar from "~~/components/layout/LeftBar.vue";
import Footer from "~~/components/layout/Footer.vue";
import Table from "~~/components/table/Table.vue";
import DialogConfirm from "~~/components/dialog/DialogConfirm.vue";
import DialogCategory from "~~/components/category/DialogCategory.vue";
import {
  getAllCategory,
  deleteCategory,
  unDeleteCategory,
  updateCategory as updateCategoryApi,
  createCategory as addCategoryApi,
} from "~~/service/category.ts";
import { useNotification } from "@kyvg/vue3-notification";
export default {
  components: {
    LeftBar,
    Footer,
    Table,
    DialogConfirm,
    DialogCategory,
  },
  setup() {
    const notification = useNotification();
    const headers = reactive([
      {
        title: "STT",
        key: "id",
      },
      {
        title: "Danh mục",
        key: "name",
      },
      {
        title: "Thao tác",
        key: "action",
      },
    ]);
    const categorys = ref([]);
    const totalPage = ref(1);
    const loading = ref(true);
    const dialogConfirm = ref(false);
    const dialog = ref(false);
    const title = ref("Thêm danh mục");
    const isAddItem = ref(true);
    const idCategory = ref(null);
    const isDelete = ref(true);
    const form = ref({
      name: "",
    });
    async function initData(data = null) {
      const res = await getAllCategory(data);
      categorys.value = res?.data?.data;
      totalPage.value = res?.data?.page;
      loading.value = false;
    }
    function deleteConfirm(id) {
      title.value = "Bạn có muốn xóa danh mục này không?";
      isDelete.value = true;
      idCategory.value = id;
      dialogConfirm.value = true;
    }
    function restoreConfirm(id) {
      title.value = "Bạn có muốn khôi phục danh mục này không?";
      isDelete.value = false;
      idCategory.value = id;
      dialogConfirm.value = true;
    }
    function closeDialogConfirm() {
      dialogConfirm.value = false;
    }
    function rowClick(data) {
      title.value = "Cập nhật danh mục";
      form.value = { ...form, ...data };
      isAddItem.value = false;
      dialog.value = true;
    }
    async function confirmToggleCategory() {
      closeDialogConfirm();
      if (isDelete.value) {
        const res = await deleteCategory(idCategory.value);
        if (res?.data?.status === 200) {
          renderMessage("success", "Xóa thành công");
        } else {
          renderMessage("error", "Xóa không thành công");
        }
      } else {
        const res = await unDeleteCategory(idCategory.value);
        if (res?.data?.status === 200) {
          renderMessage("success", "Khôi phục thành công");
        } else {
          renderMessage("error", "Khôi phục không thành công");
        }
        dialogClose();
      }
      initData();
    }
    async function updateCategory() {
      const res = await updateCategoryApi({
        id: form.value.id,
        name: form.value.name,
      });
      if (res?.data?.status === 200) {
        renderMessage("success", "Cập nhật thành công");
        initData();
      } else {
        renderMessage("error", "Cập nhật không thành công");
      }
      dialogClose();
    }
    async function addCategory() {
      const res = await addCategoryApi({
        name: form.value.name,
      });
      if (res?.data?.status === 200) {
        renderMessage("success", "Thêm thành công");
        initData();
      } else {
        renderMessage("error", "Thêm không thành công");
      }
      dialogClose();
    }
    function renderMessage(type, message) {
      notification.notify({
        title: message,
        type: type,
      });
    }
    function dialogClose() {
      dialog.value = false;
    }
    function openDialog() {
      (title.value = "Thêm danh mục"), (form.value = {});
      isAddItem.value = true;
      dialog.value = true;
    }

    onBeforeMount(() => {
      initData();
    });
    return {
      headers,
      categorys,
      totalPage,
      loading,
      dialog,
      dialogConfirm,
      title,
      isAddItem,
      form,
      initData,
      deleteConfirm,
      closeDialogConfirm,
      confirmToggleCategory,
      restoreConfirm,
      renderMessage,
      rowClick,
      dialogClose,
      updateCategory,
      openDialog,
      addCategory,
    };
  },
};
</script>

<style lang="scss" scoped></style>
