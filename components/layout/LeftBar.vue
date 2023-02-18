<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
  >
    <v-list-item
      prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
      title="John Leider"
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
      { title: "Home", icon: "mdi-home-city", to: "home" },
      { title: "My Account", icon: "mdi-account", to: "home" },
      { title: "Users", icon: "mdi-account-group-outline", to: "home" },
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
