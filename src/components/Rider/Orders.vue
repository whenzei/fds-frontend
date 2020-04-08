<template>
  <v-container fluid>
    <div class="d-flex justify-center">
      <v-switch
        inset
        v-model="availableOrdersViewable"
        :label="workStatus"
        color="orange"
        value="red"
        hide-details
      ></v-switch>
    </div>
    <AvailableOrders v-if="availableOrdersViewable" />
  </v-container>
</template>

<script>
import AvailableOrders from "./AvailableOrders";
export default {
  data: () => ({}),
  computed: {
    workStatus: function() {
      if (this.availableOrdersViewable) {
        return "On";
      }
      return "Off";
    },
    availableOrdersViewable: {
      get: function() {
        return this.$store.getters["rider/availableOrdersViewable"];
      },
      set: function(viewable) {
        this.$store.commit("rider/setAvailableOrdersViewable", viewable);
      }
    }
  },
  components: { AvailableOrders }
};
</script>

<style>
</style>