<template>
  <h1 class=" text-red-400">{{ count }}</h1>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(5)

    // expose to template and other options API hooks
    return {
      count
    }
  },

  mounted() {
    console.log(this.count) // 0
  }
}
</script>

<style>

</style>