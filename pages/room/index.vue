<template>
  <div>
    <v-app class="v-app">
      <LeftBar></LeftBar>
      <v-main>
        <Table></Table>
      </v-main>
      <Footer></Footer>
    </v-app>
  </div>
</template>

<script>
import LeftBar from "~~/components/layout/LeftBar.vue";
import Footer from "~~/components/layout/Footer.vue";
import Table from "~~/components/table/Table.vue";

export default {
  components: {
    LeftBar,
    Footer,
    Table,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
