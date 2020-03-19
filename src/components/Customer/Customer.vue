<template>
  <v-container>
    <v-card min-height="500">
      <v-card-title>Hi {{name}}</v-card-title>
    </v-card>
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