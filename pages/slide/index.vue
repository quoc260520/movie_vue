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
              Thêm
            </v-btn>
          </v-row>
          <Table
            :headers="headers"
            :items="slides"
            @delete-item="deleteConfirm"
            @row-click="rowClick"
          ></Table>
          <DialogConfirm
            :dialogConfirm="dialogConfirm"
            :title="title"
            @dialog-confirm-close="closeDialogConfirm"
            @confirm="confirmDeleteSlide"
          ></DialogConfirm>
          <DialogSlide
            :is-add-item="isAddItem"
            :title="title"
            :dialog="dialog"
            :form="form"
            @dialog-close="dialogClose"
            @update-item="updateSlide"
            @save-dialog="addSldie"
          ></DialogSlide>
        </v-main>
      </client-only>
      <Footer></Footer>
    </v-app>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import LeftBar from "~~/components/layout/LeftBar.vue";
import Footer from "~~/components/layout/Footer.vue";
import Table from "~~/components/table/Table.vue";
import DialogConfirm from "~~/components/dialog/DialogConfirm.vue";
import DialogSlide from "~~/components/slide/DialogSlide.vue";
import {
  getSlide,
  createSlide,
  updateSlide as updateSlideApi,
  deleteSlide,
} from "~~/service/slide.ts";
import { useNotification } from "@kyvg/vue3-notification";
import { uploadMultiImage } from "~~/service/upload-file";
export default {
  components: {
    LeftBar,
    Footer,
    Table,
    DialogConfirm,
    DialogSlide,
  },
  setup() {
    const notification = useNotification();
    const headers = reactive([
      {
        title: "STT",
        key: "id",
      },
      {
        title: "Ảnh",
        key: "image",
        width: "20%",
      },
      {
        title: "Link",
        key: "link",
      },
      {
        title: "Thao tác",
        key: "action",
        sortable: false,
      },
    ]);
    const slides = ref([]);
    const totalPage = ref(1);
    const loading = ref(true);
    const dialogConfirm = ref(false);
    const dialog = ref(false);
    const title = ref("Thêm slide");
    const isAddItem = ref(true);
    const idSlide = ref(null);
    const form = ref({
      link: "",
      image: "",
      fileImage: "",
    });
    async function initData(data = null) {
      const res = await getSlide(data);
      slides.value = res?.data?.data;
      totalPage.value = res?.data?.page;
      loading.value = false;
    }
    function deleteConfirm(id) {
      title.value = "Bạn có muốn xóa slide này không?";
      idSlide.value = id;
      dialogConfirm.value = true;
    }
    function closeDialogConfirm() {
      dialogConfirm.value = false;
    }
    function rowClick(data) {
      title.value = "Cập nhật slide";
      form.value = { ...form, ...data };
      console.log(form.value);
      isAddItem.value = false;
      dialog.value = true;
    }

    async function updateSlide() {
      const res = await updateSlideApi({
        id: form.value.id,
        link: form.value.link,
      });
      if (res?.data?.status === 200) {
        renderMessage("success", "Cập nhật thành công");
        initData();
      } else {
        renderMessage("error", "Cập nhật không thành công");
      }
      dialogClose();
    }
    async function addSldie(data) {
      const formData = new FormData();
      formData.append("file", data.fileImage[0]);
      const thump = await uploadMultiImage(formData);
      const res = await createSlide({
        link: data.link,
        image: thump?.data?.data?.[0].url,
        deleteFlg: false,
      });
      if (res?.data?.status === 200) {
        renderMessage("success", "Thêm thành công");
        initData();
      } else {
        renderMessage("error", "Thêm không thành công");
      }
      dialogClose();
    }
    async function confirmDeleteSlide() {
      closeDialogConfirm();
      const res = await deleteSlide(idSlide.value);
      if (res?.data?.status === 200) {
        renderMessage("success", "Xóa thành công");
      } else {
        renderMessage("error", "Xóa không thành công");
      }
      dialogClose();
      initData();
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
      (title.value = "Thêm slide"), (form.value = {});
      isAddItem.value = true;
      dialog.value = true;
    }

    onBeforeMount(() => {
      initData();
    });
    return {
      headers,
      slides,
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
      confirmDeleteSlide,
      renderMessage,
      rowClick,
      dialogClose,
      updateSlide,
      openDialog,
      addSldie,
    };
  },
};
</script>

<style lang="scss" scoped></style>
