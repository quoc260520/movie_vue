<template>
  <div>
    <v-app class="v-app">
      <LeftBar></LeftBar>
      <v-main>
        <DialogConfirm></DialogConfirm>
      </v-main>
      <Footer></Footer>
    </v-app>
    <notifications />
  </div>
</template>

<script>
import LeftBar from "~~/components/layout/LeftBar.vue";
import Footer from "~~/components/layout/Footer.vue";
import DialogConfirm from "~~/components/dialog/DialogConfirm";
export default {
  components: {
    LeftBar,
    Footer,
    DialogConfirm,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
