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
        selectedYear:'',
      years: [2012, 2013],
      headers: [
        { text: "Month", value: "month" },
        { text: "Salary (SGD)", value: "salary" }
      ],
      salaryInfo: {
        2012: [
          {
            month: "Jan",
            salary: 5000 / 100
          },
          {
            month: "March",
            salary: 700 / 100
          }
        ],
        2013: [
          {
            month: "Feb",
            salary: 5000 / 100
          },
          {
            month: "Oct",
            salary: 700 / 100
          }
        ],
      },
      itemsPerPage: 12
    };
  },
  created: function() {}
};
</script>

<style>
</style>