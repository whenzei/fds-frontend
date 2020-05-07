<template>
  <v-container>
    <v-card>
      <v-card-title>Year: {{year}}</v-card-title>
      <v-card-title>Month: {{months[month - 1]}}</v-card-title>
      <v-card-title>Shifts:</v-card-title>
      <v-list>
        <v-list-item v-for="shift in shifts" :key="shift.shiftId">{{formatShift(shift)}}</v-list-item>
        <v-spacer></v-spacer>
      </v-list>
    </v-card>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-select
        v-model="startDayOfMonth"
        :items="startDaysOfMonth"
        :rules="[v => !!v || 'Start day is required']"
        label="1st Day of Month to start working"
        required
      ></v-select>

      <v-select
        v-model="firstDayShiftId"
        :items="shifts"
        :rules="[v => !!v || 'Shift number is required']"
        label="1st day shift"
        item-text="shiftid"
        required
      ></v-select>

      <v-select
        v-model="secondDayShiftId"
        :items="shifts"
        :rules="[v => !!v || 'Shift number is required']"
        label="2nd day shift"
        item-text="shiftid"
        required
      ></v-select>

      <v-select
        v-model="thirdDayShiftId"
        :items="shifts"
        :rules="[v => !!v || 'Shift number is required']"
        label="3rd day shift"
        item-text="shiftid"
        required
      ></v-select>

      <v-select
        v-model="fourthDayShiftId"
        :items="shifts"
        :rules="[v => !!v || 'Shift number is required']"
        label="4th day shift"
        item-text="shiftid"
        required
      ></v-select>

      <v-select
        v-model="fifthDayShiftId"
        :items="shifts"
        :rules="[v => !!v || 'Shift number is required']"
        label="5th day shift"
        item-text="shiftid"
        required
      ></v-select>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="applySchedule">Apply</v-btn>

      <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>

      <v-btn color="red" class="mr-4" @click="clearSchedule">Clear Schedule</v-btn>
    </v-form>
  </v-container>
</template>
<script>
import {
  postFTScheduleUpdate,
  getShifts,
  getStartDaysOfMonth,
  postClearFTSchedule
} from "../../helpers/rider";

export default {
  data: () => {
    const nextMonthDate = new Date();
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    return {
      year: nextMonthDate.getFullYear(),
      month: nextMonthDate.getMonth() + 1,
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
      valid: true,
      startDayOfMonth: 1,
      firstDayShiftId: 1,
      secondDayShiftId: 1,
      thirdDayShiftId: 1,
      fourthDayShiftId: 1,
      fifthDayShiftId: 1,
      startDaysOfMonth: [1, 2, 3, 4],
      shifts: []
    };
  },
  methods: {
    clearSchedule() {
      postClearFTSchedule(this.year, this.month)
        .then(() => {
          alert("Schedule cleared");
          this.$router.push("/rider/schedule");
        })
        .catch(e => {
          alert(e);
        });
    },
    formatShift(shift) {
      const s1 = shift.starttime1,
        s2 = shift.starttime2,
        e1 = shift.endtime1,
        e2 = shift.endtime2;
      const interval1 =
        (s1 > 9 ? "" : "0") +
        s1 +
        "00hr - " +
        (e1 > 9 ? "" : "0") +
        e1 +
        "00hr";
      const interval2 =
        (s2 > 9 ? "" : "0") +
        s2 +
        "00hr - " +
        (e2 > 9 ? "" : "0") +
        e2 +
        "00hr";
      return `
      Shift ${shift.shiftid}: ${interval1} | ${interval2} 
      `;
    },
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
      postFTScheduleUpdate(payLoad)
        .then(() => {
          alert("Updated");
          this.$router.push("/rider/schedule");
        })
        .catch(err => alert(err));
    }
  },
  created: async function() {
    this.shifts = await getShifts();
    this.startDaysOfMonth = await getStartDaysOfMonth(this.year, this.month);
  }
};
</script>

<style>
</style>