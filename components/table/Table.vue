<template>
  <div class="p-4">
    <v-data-table
      :headers="headersVal"
      :items="items"
      class="elevation-1 border-2"
      loading
      loading-text="Loading... Please wait"
    >
      <template v-slot:item.action="{ item }">
        <v-chip
          color="orange"
          class="mr-[4px]"
          @click="rowClick(item.raw)"
          :disabled="item.raw.deleteFlg"
        >
          <v-icon icon="mdi-square-edit-outline"></v-icon>
          <v-tooltip activator="parent" location="top">Cập nhật</v-tooltip>
        </v-chip>
        <v-chip
          v-if="!item.raw.deleteFlg"
          color="red"
          @click="deleteItem(item.raw.id)"
        >
          <v-icon icon="mdi-delete-alert"></v-icon>
          <v-tooltip activator="parent" location="top">Xóa</v-tooltip>
        </v-chip>
        <v-chip
          v-else
          color="success"
          @click="restoreItem(item.raw.id)"
        >
          <v-icon icon="mdi-delete-restore"></v-icon>
          <v-tooltip activator="parent" location="top">Khôi phục</v-tooltip>
        </v-chip>
      </template>
    </v-data-table>
    <div class="flex justify-end">
      <v-pagination
        v-model="page"
        :length="totalPage"
        @update:modelValue="updatePage()"
        rounded="circle"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { ref, reactive,computed } from "vue";
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    headers: {
      type: [Array, Object],
      default: () => [],
    },
    totalPage: [Number],
  },
  setup(props, { emit }) {

    const page = ref(1);
    const itemsPerPage = ref(5);
    const headersVal = computed(() => props.headers);

    function rowClick(data) {
      emit("row-click", data);
    }

    function deleteItem(id) {
      emit("delete-item", id);
    }

    function restoreItem(id) {
      emit("restore-item", id);
    }

    function updatePage() {
      emit("update-page", page.value);
    }

    return {
      page,
      itemsPerPage,
      headersVal,
      rowClick,
      deleteItem,
      restoreItem,
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
