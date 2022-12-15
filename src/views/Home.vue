<template>
  <PokeDex />
</template>
<script>

import PokeDex from "../components/PokeDex.vue";
export default {
  components: {
    PokeDex
  },
  name: 'Home',
  data() {

    return {
      data: null
    }
  },
}
</script>
<style>

</style>