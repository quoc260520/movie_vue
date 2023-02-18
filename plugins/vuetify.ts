import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { fa } from "vuetify/iconsets/fa";
import { aliases, mdi } from "vuetify/lib/iconsets/mdi";
import { mdiAccount } from "@mdi/js";
import { VDataTable } from "vuetify/labs/VDataTable";
import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: {
      VDataTable,
      ...components,
    },
    directives,
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: {
        mdi,
        fa,
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
