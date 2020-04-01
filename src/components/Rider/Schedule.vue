<template>
  <v-container>
    <CurrentSchedule />
    <br/>
    <v-row align="center" justify="center">
      <v-btn to="/rider/update-schedule">Update next month's schedule</v-btn>
    </v-row>
  </v-container>
</template>

<script>
import CurrentSchedule from "./CurrentSchedule";
export default {
  components: {
    CurrentSchedule
  }
};
</script>

<style>
</style>