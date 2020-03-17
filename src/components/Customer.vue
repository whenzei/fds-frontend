<template>
  <v-container>
    <h1>Customer</h1>
    <h2>Hi {{name}}</h2>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    name: null
  }),
  created() {
    this.name = this.$store.getters["customer/name"];
  }
};
</script>