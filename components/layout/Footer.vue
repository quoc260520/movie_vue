<template>
  <div>
    <v-footer
      class="bg-indigo-lighten-1 text-center d-flex flex-column max-h-[100px]"
    >
      <div>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          :icon="icon"
          variant="text"
        ></v-btn>
      </div>
      <v-divider></v-divider>

      <div>{{ new Date().getFullYear() }} — <strong>416 Movie</strong></div>
    </v-footer>
  </div>
</template>

<script>
import { ref, reactive } from "vue";

export default {
  setup() {
    const icons = reactive([
      "mdi-facebook",
      "mdi-twitter",
      "mdi-linkedin",
      "mdi-instagram",
    ]);
    return { icons };
  },
};
</script>
