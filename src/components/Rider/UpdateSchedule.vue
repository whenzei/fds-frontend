<template>
  <v-container>
    <v-card>
      <v-card-title>Year: {{year}}</v-card-title>
      <v-card-title>Month: {{months[month - 1]}}</v-card-title>
      <v-card-title>Shifts:</v-card-title>
      <v-list>
        <v-list-item
          v-for="shift in shifts"
          :key="shift.shiftId"
        >Shift {{shift.shiftId}}: {{shift.info}}</v-list-item>
        <v-spacer></v-spacer>
      </v-list>
    </v-card>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-select
        v-model="firstDay"
        :items="firstDays"
        :rules="[v => !!v || 'Start day is required']"
        label="1st Day of Month to start working"
        required
      ></v-select>

      <v-select
        v-model="firstDayShiftId"
        :items="shifts"
        :rules="[v => !!v || 'Shift number is required']"
        label="1st day shift"
        item-text="shiftId"
        required
      ></v-select>

      <v-select
        v-model="secondDayShiftId"
        :items="shifts"
        :rules="[v => !!v || 'Shift number is required']"
        label="2nd day shift"
        item-text="shiftId"
        required
      ></v-select>

      <v-select
        v-model="thirdDayShiftId"
        :items="shifts"
        :rules="[v => !!v || 'Shift number is required']"
        label="3rd day shift"
        item-text="shiftId"
        required
      ></v-select>

      <v-select
        v-model="fourthDayShiftId"
        :items="shifts"
        :rules="[v => !!v || 'Shift number is required']"
        label="4th day shift"
        item-text="shiftId"
        required
      ></v-select>

      <v-select
        v-model="fifthDayShiftId"
        :items="shifts"
        :rules="[v => !!v || 'Shift number is required']"
        label="5th day shift"
        item-text="shiftId"
        required
      ></v-select>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="applySchedule">Apply</v-btn>

      <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>
    </v-form>
  </v-container>
</template>
<script>
import { postScheduleUpdate  } from "../../helpers/rider";

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
      firstDay: 1,
      firstDayShiftId: 1,
      secondDayShiftId: 1,
      thirdDayShiftId: 1,
      fourthDayShiftId: 1,
      fifthDayShiftId: 1,
      firstDays: [1, 2, 3, 4],
      shifts: [
        { shiftId: 1, info: "1pm-5pm" },
        { shiftId: 2, info: "1pm-5pm" },
        { shiftId: 3, info: "1pm-5pm" },
        { shiftId: 4, info: "1pm-5pm" }
      ]
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
        startDayOfMonth: this.firstDay,
        firstDayShiftId: this.firstDayShiftId,
        secondDayShiftId: this.secondDayShiftId,
        thirdDayShiftId: this.thirdDayShiftId,
        fourthDayShiftId: this.fourthDayShiftId,
        fifthDayShiftId: this.fifthDayShiftId
      };
      postScheduleUpdate(payLoad)
        .then(() => {
          alert("Updated");
        })
        .catch(err => alert(err));
    }
  }
};
</script>

<style>
</style>