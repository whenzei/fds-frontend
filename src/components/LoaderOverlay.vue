<template>
  <v-overlay :value="load">
    <v-progress-circular color="orange" indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  props: ["load"]
};
</script>