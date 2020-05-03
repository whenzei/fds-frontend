<template>
  <v-container fluid>
    <v-select :items="years" label="Year" v-model="selectedYear" v-on:change="fetchSummaryInfo"></v-select>
    <v-data-table
      :headers="headers"
      :items="summaryInfo"
      :items-per-page="itemsPerPage"
      hide-default-footer
      class="elevation-1"
    ></v-data-table>
  </v-container>
</template>

<script>
const { getSummaryInfo } = require("../../helpers/rider");
const _ = require("lodash");
export default {
  data: function() {
    const thisYear = new Date().getFullYear();
    const headers = [
      { text: "Month", value: "month" },
      { text: "Average rating", value: "avgrating" },
      { text: "Highest rating", value: "maxrating" },
      { text: "Lowest rating", value: "minrating" },
      { text: "Number of ratings", value: "ratingcount" },
      { text: "Number of orders", value: "ordercount" }
    ];
    return {
      selectedYear: thisYear,
      years: _.range(2018, thisYear + 1),
      headers,
      summaryInfo: [],
      itemsPerPage: 12
    };
  },
  methods: {
    fetchSummaryInfo() {
      getSummaryInfo(this.selectedYear)
        .then(summaryInfo => {
          this.summaryInfo = summaryInfo;
        })
        .catch(e => {
          alert(e);
        });
    }
  },
  created() {
    this.fetchSummaryInfo();
  }
};
</script>

<style>
</style>