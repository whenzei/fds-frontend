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
            <v-list-item-content>Day {{dailySchedule.day + 1}}: {{start.clone().add(dailySchedule.day, 'day').format('LL')}}</v-list-item-content>
            <v-row v-for="(slot, i) in dailySchedule.slots" :key="i">
              {{formatSlot(slot.startTime, slot.endTime)}}
              <v-btn @click="deleteSlot(dailySchedule.day, i)" icon color="red">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-row>
            <v-row>
              <v-autocomplete
                :items="allowedStartTimes"
                v-model="dailySchedule.selectStart"
                label="Start time"
              ></v-autocomplete>
              <v-autocomplete
                :items="allowedEndTimes"
                v-model="dailySchedule.selectEnd"
                label="End time"
              ></v-autocomplete>
              <v-btn
                @click="addSlot(dailySchedule.day, dailySchedule.selectStart, dailySchedule.selectEnd)"
                class="mx-2"
                fab
                dark
                color="orange"
              >
                <v-icon dark>mdi-plus</v-icon>
              </v-btn>
            </v-row>
          </v-list-item-group>
        </v-list-item>
      </v-list>
      <v-btn color="orange" class="mr-4" @click="updateSchedule">Update</v-btn>
      <v-btn color="red" class="mr-4" @click="clearSchedule">Clear schedule</v-btn>
    </v-form>
  </v-container>
</template>
<script>
import moment from "moment";
import { postPTScheduleUpdate, postClearPTSchedule } from "../../helpers/rider";
export default {
  props: ["year", "week"],
  data: function() {
    const nextMonthDate = new Date();
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    const start = moment(`${this.year}-W${this.week}-1`);
    const end = moment(`${this.year}-W${this.week}-7`);
    return {
      allowedStartTimes: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
      allowedEndTimes: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
      month: nextMonthDate.getMonth() + 1,
      start,
      end,
      valid: true,
      dailySchedules: [
        {
          day: 0,
          selectStart: 10,
          selectEnd: 11,
          slots: [
            {
              startTime: 10,
              endTime: 11
            }
          ]
        },
        {
          day: 1,
          selectStart: 10,
          selectEnd: 13,
          slots: []
        },
        {
          day: 2,
          selectStart: 10,
          selectEnd: 13,
          slots: []
        },
        {
          day: 3,
          selectStart: 10,
          selectEnd: 13,
          slots: []
        },
        {
          day: 4,
          selectStart: 10,
          selectEnd: 13,
          slots: []
        },
        {
          day: 5,
          selectStart: 10,
          selectEnd: 13,
          slots: []
        },
        {
          day: 6,
          selectStart: 10,
          selectEnd: 13,
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
    addSlot(day, startTime, endTime) {
      if (startTime >= endTime)
        return alert("Start time must be before End time");
      this.dailySchedules[day].slots.push({
        startTime,
        endTime
      });
    },
    deleteSlot(day, i) {
      this.dailySchedules[day].slots.splice(i, 1);
    },
    formatSlot(start, end) {
      const interval =
        (start > 9 ? "" : "0") +
        start +
        "00hr - " +
        (end > 9 ? "" : "0") +
        end +
        "00hr";
      return interval;
    },
    updateSchedule() {
      const totalHours = this.dailySchedules
        .map(x => x.slots)
        .flat()
        .map(y => y.endTime - y.startTime)
        .reduce((a, b) => a + b);
      if (totalHours < 10) {
        return alert("Need to work at least 10 hours in a week");
      } else if (totalHours > 48) {
        return alert("Weekly work hours cannot exceed 48");
      }
      postPTScheduleUpdate(this.year, this.week, this.dailySchedules)
        .then(() => {
          alert("Updated");
          this.$router.push("/rider/schedule");
        })
        .catch(e => {
          alert(e);
        });
    },
    clearSchedule() {
      postClearPTSchedule(this.year, this.week)
        .then(() => {
          alert("Schedule cleared");
          this.$router.push("/rider/schedule");
        })
        .catch(e => {
          alert(e);
        });
    }
  }
};
</script>

<style>
</style>