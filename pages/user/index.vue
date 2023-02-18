<template>
<div>
  <v-app class="v-app">
    <LeftBar></LeftBar>
    <v-main>
      <FormSearch></FormSearch>
      <v-container>
        <v-row class="flex justify-end mb-1 mr-1">
          <v-btn
            color="success"
            prepend-icon="mdi-account-plus-outline"
            @click="openDialog"
          >
            Thêm
          </v-btn>
        </v-row>
        <Dialog :dialog="dialog" :title="title" :form="form" @dialog-close="closeDialog"></Dialog>
        <TableUser :users="users" @row-click="rowClick"></TableUser>
      </v-container>
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
export default {
  components: {
    LeftBar,
    Footer,
    TableUser,
    FormSearch,
    Dialog,
  },
  setup() {
    const tab = ref(null);
    const users = ref([]);
    const loading = ref(true);
    const dialog = ref(false);
    const title = ref('Thêm người dùng');
    const form = ref({
      nameUser: '',
      email:'',
      phone: '',
      passWord: '',
    });

    async function initData() {
      // const res = await getAllUser();
      // users.value = res?.data?.data;
      loading.value = false;
    }
    function openDialog() {
      form.value = {}
      dialog.value = true;
    }
    function closeDialog() {
      dialog.value = false;
    }
    function rowClick(id) {
      form.value = {
        form,
        ...id
      };
      title.value = "Cập nhật người dùng";
      dialog.value = true;
    }
    onBeforeMount(() => {
      initData();
    });
    return { tab, users, loading, dialog,title,form, openDialog, closeDialog,rowClick };
  },
};
</script>

<style lang="scss" scoped></style>
