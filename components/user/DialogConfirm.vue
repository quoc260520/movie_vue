<template>
  <div class="text-center">
    <v-btn
      color="primary"
      @click="dialog = true"
    >
      Open Dialog
    </v-btn>

    <v-dialog
      v-model="dialogVal"
      width="auto"
    >
      <v-card>
        <v-card-text>
          {{title}}
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
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
      emit("dialog-close");
    }
    const dialogVal = computed(() => props.dialogConfirm);
    return {
      dialogVal,
      closeDialog,
    };
  },
};
</script>

<style>
</style>
