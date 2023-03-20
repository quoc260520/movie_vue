<template>
  <div>
    <v-app class="v-app">
      <LeftBar></LeftBar>
      <v-main>
        <Table :headers="headers" :items="categorys" @delete-item="deleteConfirm"></Table>
        <DialogConfirm
          :dialogConfirm="dialogConfirm"
          :title="title"
          @dialog-confirm-close="closeDialogConfirm"
          @confirm="confirmToggleUser"
        ></DialogConfirm>
      </v-main>
      <Footer></Footer> </v-app
    >Z
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import LeftBar from "~~/components/layout/LeftBar.vue";
import Footer from "~~/components/layout/Footer.vue";
import TableData from "~~/components/table/Table.vue";
import DialogConfirm from "~~/components/dialog/DialogConfirm.vue";
import { getAllCategory } from "~~/service/category.ts";
export default {
  components: {
    LeftBar,
    Footer,
    TableData,
    DialogConfirm,
  },
  setup() {
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
    const title = ref("Thêm danh mục");
    async function initData(data = null) {
      const res = await getAllCategory(data);
      categorys.value = res?.data?.data;
      totalPage.value = res?.data?.page;
      loading.value = false;
    };
    function deleteConfirm() {
      title.value = "Bạn có muốn xóa danh mục này không?";
      dialogConfirm.value = true;
    };
    function closeDialogConfirm() {
      dialogConfirm.value = false;
    }
    onBeforeMount(() => {
      initData();
    });
    return {
      headers,
      categorys,
      totalPage,
      loading,
      dialogConfirm,
      title,
      initData,
      deleteConfirm,
      closeDialogConfirm,
    };
  },
};
</script>

<style lang="scss" scoped></style>
