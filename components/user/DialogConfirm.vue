<template>
  <div class="text-center">
    <v-dialog v-model="dialogVal" width="auto">
      <v-card>
        <v-card-text>
          {{ title }}
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="error" variant="flat" @click="closeDialog"> Hủy </v-btn>
          <v-btn color="success" variant="flat" @click="confirm"> OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ref, computed } from "vue";
export default {
  name: "DialogConfirm",
  props: {
    dialogConfirm: [Boolean],
    title: [String],
  },
  setup(props, { emit }) {
    function closeDialog() {
      emit("dialog-confirm-close");
    }
    function confirm() {
      emit("confirm");
    }
    const dialogVal = computed(() => props.dialogConfirm);
    return {
      dialogVal,
      closeDialog,
      confirm,
    };
  },
};
</script>

<style></style>
