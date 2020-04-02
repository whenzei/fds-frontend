<template>
  <v-container>
    <v-card>
      <v-card-title>Start: {{start.format('LL')}}</v-card-title>
      <v-card-title>End: {{end.format('LL')}}</v-card-title>
    </v-card>
    <v-form ref="form" v-model="valid" lazy-validation>
    </v-form>
  </v-container>
</template>
<script>
import { postScheduleUpdate } from "../../helpers/rider";
import moment from "moment";
export default {
  props: ["year", "week"],
  data: function() {
    const nextMonthDate = new Date();
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    const start = moment(`${this.year}-W${this.week}-1`)
    const end = moment(`${this.year}-W${this.week}-7`)
    return {
      month: nextMonthDate.getMonth() + 1,
      start,
      end,
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      valid: true
    };
  },
  methods: {
    validate() {
      return this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    applySchedule() {
      if (!this.validate()) {
        return;
      }
      const payLoad = {
        year: this.year,
        month: this.month,
        startDayOfMonth: this.startDayOfMonth,
        firstDayShiftId: this.firstDayShiftId,
        secondDayShiftId: this.secondDayShiftId,
        thirdDayShiftId: this.thirdDayShiftId,
        fourthDayShiftId: this.fourthDayShiftId,
        fifthDayShiftId: this.fifthDayShiftId
      };
      postScheduleUpdate(payLoad)
        .then(() => {
          alert("Updated");
          this.$router.push("/rider/schedule");
        })
        .catch(err => alert(err));
    }
  },
  created: async function() {}
};
</script>

<style>
</style>