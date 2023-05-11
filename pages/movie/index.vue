<template>
  <div>
    <v-app class="v-app">
      <LeftBar></LeftBar>
      <client-only>
        <v-main>
          <v-row class="flex justify-end mt-2 mr-4">
            <v-btn
              color="success"
              prepend-icon="mdi-movie-open-plus"
              @click="openDialog"
            >
              Thêm phim
            </v-btn>
          </v-row>
          <Table
            :headers="headers"
            :items="movies"
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
          <DialogMovie
            :dialog="dialog"
            :title="title"
            :form="form"
            :isAddMovie="isAddMovie"
            :categorys="categorys"
            @close-dialog="closeDialog"
            @save-dialog="createMovie"
            @update-dialog="updateMovie"
          ></DialogMovie>
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
import DialogMovie from "~~/components/movie/DialogMovie.vue";
import { useNotification } from "@kyvg/vue3-notification";
import {
  getAllMovie,
  deleteMovie,
  unDeleteMovie,
  updateMovie as updateMovieApi,
  createMovie as createMovieApi,
} from "~~/service/movie.ts";
import { uploadMultiImage } from "~~/service/upload-file";
import { getAllCategory } from "~~/service/category";
export default {
  components: {
    LeftBar,
    Footer,
    Table,
    DialogConfirm,
    DialogMovie,
  },
  setup() {
    const notification = useNotification();
    const headers = reactive([
      {
        title: "Tên phim",
        key: "nameMovie",
        width: "15%",
        align: "center",
      },
      {
        title: "Thời lượng (phút)",
        key: "timeMovie",
        width: "15%",
      },
      {
        title: "Tác giả",
        key: "author",
        width: "10%",
      },
      {
        title: "Danh mục",
        key: "movieCategory.name",
        width: "15%",
      },
      {
        title: "Mô tả",
        key: "description",
        sortable: false,
        width: "35%",
      },
      {
        title: "Thao tác",
        key: "action",
        sortable: false,
        width: "10%",
      },
    ]);
    const movies = ref([]);
    const totalPage = ref(1);
    const loading = ref(true);
    const dialogConfirm = ref(false);
    const dialog = ref(false);
    const title = ref("Bạn có muốn xóa phim này?");
    const idMovie = ref(null);
    const idDelete = ref(false);
    const categorys = ref([]);
    const isAddMovie = ref(false);
    const form = ref({
      author: "",
      description: "",
      categoryId: "",
      nameMovie: "",
      timeMovie: "",
      thumbnail: "",
      fileImages: "",
    });
    async function initData(data = null) {
      const res = await getAllMovie(data);
      movies.value = res?.data?.data;
      totalPage.value = res?.data?.page;
      loading.value = false;
    }
    function closeDialogConfirm() {
      dialogConfirm.value = false;
    }
    function deleteConfirm(id) {
      idDelete.value = true;
      title.value = "Bạn có muốn xóa phim này?";
      idMovie.value = id;
      dialogConfirm.value = true;
    }
    function restoreConfirm(id) {
      idDelete.value = false;
      title.value = "Bạn có muốn khôi phục phim này?";
      idMovie.value = id;
      dialogConfirm.value = true;
    }
    function rowClick(data) {
      form.value = { ...form.value, ...data };
      isAddMovie.value = false;
      title.value = "Cập nhật phim";
      dialog.value = true;
    }
    function openDialog() {
      isAddMovie.value = true;
      title.value = "Thêm phim";
      form.value = {};
      dialog.value = true;
    }
    function closeDialog() {
      dialog.value = false;
    }
    async function createMovie(data) {
      try {
        const formData = new FormData();
        for (let i = 0; i < data.fileImages.length; i++) {
          formData.append("file", data.fileImages[i]);
        }
        const thumps = await uploadMultiImage(formData);
        data.thumbnail = thumps?.data?.data.map((thump) => thump.url);
        const dataCreate = {
          nameMovie: data.nameMovie,
          description: data.description,
          author: data.author,
          timeMovie: parseInt(data.timeMovie),
          categoryId: data.categoryId,
          thumbnail: data.thumbnail,
        };
        const res = await createMovieApi(dataCreate);
        if (res?.data?.status === 200) {
          renderMessage("success", "Thêm thành công");
          initData();
        } else {
          renderMessage("error", "Thêm không thành công");
        }
        closeDialog();
        initData();
      } catch (e) {
        renderMessage("error", "Đã có lỗi xảy ra");
      }
    }
    async function updateMovie(dataItem) {
      const data = { ...form.value, ...dataItem };
      const dataUpdate = {
        id: data.id,
        nameMovie: data.nameMovie,
        description: data.description,
        author: data.author,
        timeMovie: parseInt(data.timeMovie),
        categoryId: data.categoryId,
        thumbnail: data.thumbnail,
      };
      const res = await updateMovieApi(dataUpdate);
      if (res?.data?.status === 200) {
        renderMessage("success", "Cập nhật thành công");
        initData();
      } else {
        renderMessage("error", "Cập nhật không thành công");
      }
      closeDialog();
      initData();
    }

    async function confirmToggleCategory() {
      let res;
      if (idDelete.value) {
        res = await deleteMovie(idMovie.value);
      } else {
        res = await unDeleteMovie(idMovie.value);
      }
      if (res?.data?.status === 200) {
        renderMessage("success", "Thành công");
        initData();
      } else {
        renderMessage("error", "Có lỗi xảy ra");
      }
      closeDialogConfirm();
      initData();
    }
    async function getCategory() {
      const res = await getAllCategory();
      categorys.value = res?.data?.data;
    }
    function renderMessage(type, message) {
      notification.notify({
        title: message,
        type: type,
      });
    }
    onBeforeMount(() => {
      initData();
      getCategory();
    });
    return {
      headers,
      movies,
      dialogConfirm,
      dialog,
      totalPage,
      loading,
      title,
      idMovie,
      isAddMovie,
      form,
      categorys,
      closeDialogConfirm,
      deleteConfirm,
      confirmToggleCategory,
      restoreConfirm,
      rowClick,
      openDialog,
      closeDialog,
      createMovie,
      updateMovie,
      renderMessage,
    };
  },
};
</script>

<style lang="scss" scoped></style>
