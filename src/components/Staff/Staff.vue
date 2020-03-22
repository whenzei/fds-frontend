<template>
  <v-container>
    <h1>Hi {{name}}</h1>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    name: null
  }),
  created() {
    this.name = this.$store.getters.name;
  }
};
</script>