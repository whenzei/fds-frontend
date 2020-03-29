<template>
  <v-container fluid>
    <div class="d-flex justify-center">
      <v-switch inset v-model="onDuty" :label="workStatus" color="orange" value="red" hide-details></v-switch>
    </div>
    <AvailableOrders v-if="onDuty" />
  </v-container>
</template>

<script>
import AvailableOrders from "./AvailableOrders";
export default {
  data: () => ({
    onDuty: false
  }),
  computed: {
    workStatus: function() {
      if (this.onDuty) {
        return "On";
      }
      return "Off";
    }
  },
  components: { AvailableOrders }
};
</script>

<style>
</style>