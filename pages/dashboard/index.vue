<template>
<div>
    <v-app class="v-app">
        <LeftBar></LeftBar>
        <v-main>
        </v-main>
        <Footer></Footer>
    </v-app>
</div>
</template>

  
<script>
import {
    ref,
    reactive
} from "vue";
import LeftBar from "~~/components/layout/LeftBar.vue";
import Footer from "~~/components/layout/Footer.vue";

export default {
    components: {
        LeftBar,
        Footer,
    },
    setup() {},
};
</script>

  
<style lang="scss" scoped></style>
