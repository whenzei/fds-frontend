<template>
  <v-container>
    <CurrentSchedule />
    <br />
    <v-row align="center" justify="center">
      <v-btn v-if="isFullTimer" to="/rider/update-ft-schedule">Update next month's schedule</v-btn>
      <v-card justify="center" v-else-if="isPartTimer" color="secondary">
        <v-card-title>Update Weekly Schedule</v-card-title>
        <v-card-actions class="justify-center">
          <input type="week" name="week" ref="workWeek" required />
          <v-spacer />
          <v-btn @click="routeToUpdateSchedule">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { RiderTypes } from "../../helpers/rider";
import CurrentSchedule from "./CurrentSchedule";
import moment from "moment";
export default {
  components: {
    CurrentSchedule
  },
  created: function() {
    this.$store.dispatch("rider/fetchRiderType");
  },
  mounted: function() {
    const minDate = moment(new Date()).add(1, "week");
    const maxDate = moment(new Date()).add(4, "week");
    this.$refs.workWeek.value = `${minDate.isoWeekYear()}-W${minDate.isoWeek()}`;
    this.$refs.workWeek.min = `${minDate.isoWeekYear()}-W${minDate.isoWeek()}`;
    this.$refs.workWeek.max = `${maxDate.isoWeekYear()}-W${maxDate.isoWeek()}`;
  },
  computed: {
    isFullTimer: function() {
      return this.$store.getters["rider/riderType"] == RiderTypes.fullTime;
    },
    isPartTimer: function() {
      return this.$store.getters["rider/riderType"] == RiderTypes.partTime;
    }
  },
  methods: {
    routeToUpdateSchedule: function() {
      const val = this.$refs.workWeek.value.split("-");
      const year = parseInt(val[0]),
        week = parseInt(val[1].substring(1));
      this.$router.push({ name: 'RiderUpdatePTSchedule', params: { year, week } })
    }
  }
};
</script>

<style>
</style>