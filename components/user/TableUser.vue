<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="users"
      class="elevation-1 border-2"
      loading
      loading-text="Loading... Please wait"
    >
      <template v-slot:item.id="{ item }">
        {{ item.columns.id }}
      </template>
      <template v-slot:item.role="{ item }">
        {{ item.columns.role == "USER" ? "Người dùng" : "Quản trị viên" }}
      </template>
      <template v-slot:item.deleteFlg="{ item }">
        <v-chip :color="getColor(item.deleteFlg)">
          {{ item.columns.deleteFlg ? "Bị khóa" : "Hoạt động" }}
        </v-chip>
      </template>
      <template v-slot:item.action="{ item }">
        <v-chip color="orange" class="mr-[4px]" @click="rowClick(item.columns)">
          <v-icon icon="mdi-human-edit"></v-icon>
          <v-tooltip activator="parent" location="top">Cập nhật</v-tooltip>
        </v-chip>
        <v-chip color="red" @click="deleteUser(item.columns.id)">
          <v-icon icon="mdi-delete-alert"></v-icon>
          <v-tooltip activator="parent" location="top">Xóa</v-tooltip>
        </v-chip>
      </template>
    </v-data-table>
    <div class="flex justify-end">
      <v-pagination v-model="page" :length="4" rounded="circle"></v-pagination>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
export default {
  props: {
    users: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    let options = ref({
      pageCount: 1,
    });
    let page = ref(1);
    let itemsPerPage = ref(5);
    let headers = ref([
      {
        align: "start",
        key: "name",
        sortable: true,
      },
      {
        title: "STT",
        key: "id",
        class: "text-red-700",
      },
      {
        title: "Họ tên",
        key: "nameUser",
        class: "text-red-700",
        class: "success--text title",
      },
      {
        title: "Email",
        key: "email",
      },
      {
        title: "Số điện thoại",
        key: "phone",
      },
      {
        title: "Quyền",
        key: "role",
      },
      {
        title: "Trạng thái",
        key: "deleteFlg",
      },
      {
        title: "Thao tác",
        key: "action",
      },
    ]);

    function getColor(flag) {
      return flag ? "red" : "green";
    }

    function rowClick(data) {
      emit("row-click", data);
    }

    function deleteUser(id) {
      emit("delete-user", id);
    }
    const users = ref([
      {
        nameUser: "Trịnh Văn Quốc",
        email: "vanquoc26520@gmail.com",
        phone: "0354140072",
        deleteFlg: 0,
        role: "ADMIN",
        id: "1",
      },
      {
        nameUser: "Phạm Huy Hiệp",
        email: "huyhiep4520@gmail.com",
        phone: "0354140072",
        deleteFlg: 0,
        role: "USER",
        id: "2",
      },
      {
        nameUser: "Nguyễn Long Hải",
        email: "laugth10@gmail.com",
        phone: "0354140072",
        deleteFlg: 0,
        role: "ADMIN",
        id: "3",
      },
    ]);

    return {
      users,
      options,
      page,
      itemsPerPage,
      headers,
      getColor,
      rowClick,
      deleteUser,
    };
  },
};
</script>

<style lang="scss" scoped>
:deep() {
  .v-data-table-footer {
    display: none;
  }
}
</style>
