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
        <v-chip
          color="orange"
          class="mr-[4px]"
          @click="rowClick(item.columns)"
          :disabled="item.columns.deleteFlg"
        >
          <v-icon icon="mdi-human-edit"></v-icon>
          <v-tooltip activator="parent" location="top">Cập nhật</v-tooltip>
        </v-chip>
        <v-chip
          v-if="!item.columns.deleteFlg"
          color="red"
          @click="deleteUser(item.columns.id)"
        >
          <v-icon icon="mdi-delete-alert"></v-icon>
          <v-tooltip activator="parent" location="top">Xóa</v-tooltip>
        </v-chip>
        <v-chip
          v-else
          color="success"
          @click="restoreDeleteUser(item.columns.id)"
        >
          <v-icon icon="mdi-delete-restore"></v-icon>
          <v-tooltip activator="parent" location="top">Khôi phục</v-tooltip>
        </v-chip>
      </template>
    </v-data-table>
    <div class="flex justify-end">
      <v-pagination v-model="page" :length="totalPage" @update:modelValue="updatePage()" rounded="circle"></v-pagination>
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
    totalPage: [Number]
  },
  setup(props, { emit }) {
    console.log(props.totalPage);
    const page = ref(1);
    const itemsPerPage = ref(5);
    const headers = ref([
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

    function restoreDeleteUser(id) {
      emit("restore-delete-user", id);
    }
    function updatePage() {
        emit('update-page', page.value);
    }

    return {
      page,
      itemsPerPage,
      headers,
      getColor,
      rowClick,
      deleteUser,
      restoreDeleteUser,
      updatePage,
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
