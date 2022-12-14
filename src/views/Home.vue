<template>
  <Pokemon />
</template>
<script>

import Pokemon from "../components/Pokemon.vue";
export default {
  components: {
    Pokemon
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