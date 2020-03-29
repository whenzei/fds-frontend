<template>
  <v-container fluid>
    <v-select :items="years" label="Year" v-model="selectedYear"></v-select>
    <v-data-table
      :headers="headers"
      :items="salaryInfo[selectedYear]"
      :items-per-page="itemsPerPage"
      hide-default-footer
      class="elevation-1"
    ></v-data-table>
  </v-container>
</template>

<script>
export default {
  data: function() {
    return {
      selectedYear: "",
      years: [2012, 2013],
      headers: [
        { text: "Month Number", value: "monthNumber" },
        { text: "Month", value: "month" },
        { text: "Salary (SGD)", value: "salary" }
      ],
      salaryInfo: {
        2012: [
          {
            monthNumber: 1,
            month: "Jan",
            salary: 5000 / 100
          },
          {
            monthNumber: 3,
            month: "Mar",
            salary: 700 / 100
          }
        ],
        2013: [
          {
            monthNumber: 2,
            month: "Feb",
            salary: 5000 / 100
          },
          {
            monthNumber: 10,
            month: "Oct",
            salary: 700 / 100
          }
        ]
      },
      itemsPerPage: 12
    };
  }
};
</script>

<style>
</style>