<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
  >
    <v-list-item
      prepend-avatar="data:image/jpeg;base64,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"
      title="Quoc TV"
      nav
    >
      <template v-slot:append>
        <v-btn
          variant="text"
          icon="mdi-chevron-left"
          @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        v-for="(item, ix) in items"
        :key="ix"
        :prepend-icon="item.icon"
        :title="item.title"
        :value="item.title"
        @click="changeRoute(item.to)"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { ref, reactive } from "vue";
export default {
  setup() {
    let route = useRouter();
    const items = ref([
      { title: "Home", icon: "mdi-home-city", to: "dashboard" },
      { title: "My Account", icon: "mdi-account", to: "/" },
      { title: "Users", icon: "mdi-account-group-outline", to: "user" },
      { title: "Movies", icon: "mdi-movie-open-outline", to: "user" },
      { title: "Categorys", icon: "mdi-list-box-outline", to: "category" },
      { title: "Slides", icon: "mdi-play-box-outline", to: "user" },
      { title: "Time movies", icon: "mdi-clock-time-eight-outline", to: "user" },
    ]);
    let drawer = ref(true);
    let rail = ref(true);

    function changeRoute(href) {
      route.push(href);
    }
    return { items, drawer, rail, changeRoute };
  },
};
</script>

<style lang="scss" scoped></style>
