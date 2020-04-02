<template>
  <v-container>
    <v-card>
      <v-card-title>Start: {{start.format('LL')}}</v-card-title>
      <v-card-title>End: {{end.format('LL')}}</v-card-title>
    </v-card>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-list>
        <v-list-item v-for="dailySchedule in dailySchedules" :key="dailySchedule.day">
          <v-list-item-group>
            <v-list-item-content>{{start.clone().add(dailySchedule.day, 'day').format('LL')}}</v-list-item-content>
            <v-list-item v-for="(slot, i) in dailySchedule.slots" :key="i" dense>
              {{slot.startTime}} - {{slot.endTime}}
            </v-list-item>
            <v-btn @click="addSlot(dailySchedule.day)" class="mx-2" fab dark color="orange">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </v-list-item-group>
        </v-list-item>
      </v-list>
    </v-form>
  </v-container>
</template>
<script>
import moment from "moment";
export default {
  props: ["year", "week"],
  data: function() {
    const nextMonthDate = new Date();
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    const start = moment(`${this.year}-W${this.week}-1`);
    const end = moment(`${this.year}-W${this.week}-7`);
    return {
      month: nextMonthDate.getMonth() + 1,
      start,
      end,
      valid: true,
      dailySchedules: [
        {
          day: 0,
          slots: [
            {
              startTime: 10,
              endTime: 22
            }
          ]
        },
        {
          day: 1,
          slots: []
        }
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
    addSlot(day) {
      console.log(day);
    }
  },
  created: async function() {}
};
</script>

<style>
</style>