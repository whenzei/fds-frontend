<template>
  <v-container fluid>
    <v-select :items="years" label="Year" v-model="selectedYear" v-on:change="fetchSalaryInfo"></v-select>
    <v-data-table
      :headers="headers"
      :items="tableItems"
      class="elevation-1"
    >
      <template v-slot:item.baseSalary="{ item }">
        <span>{{formatCurrency(item.baseSalary)}}</span>
      </template>
      <template v-slot:item.commission="{ item }">
        <span>{{formatCurrency(item.commission)}}</span>
      </template>
      <template v-slot:item.totalSalary="{ item }">
        <span>{{formatCurrency(item.totalSalary)}}</span>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
const { getSalaryInfo } = require("../../helpers/rider");
const { formatCurrency } = require("../../helpers/format");
const _ = require("lodash");
export default {
  data: function() {
    const thisYear = new Date().getFullYear();
    const fullTimeHeaders = [
      { text: "Month Number", value: "monthNumber" },
      { text: "Month", value: "month" },
      { text: "Base Salary (SGD)", value: "baseSalary" },
      { text: "Commission (SGD)", value: "commission" },
      { text: "Total Salary (SGD)", value: "totalSalary" },
      { text: "Start Date", value: "startDate" },
      { text: "End Date", value: "endDate" },
      { text: "Payout Date", value: "payOutDate" }
    ];
    const partTimeHeaders = [
      { text: "Week Number", value: "weekNumber" },
      { text: "Base Salary (SGD)", value: "baseSalary" },
      { text: "Commission (SGD)", value: "commission" },
      { text: "Total Salary (SGD)", value: "totalSalary" },
      { text: "Start Date", value: "startDate" },
      { text: "End Date", value: "endDate" },
      { text: "Payout Date", value: "payOutDate" }
    ];
    return {
      selectedYear: thisYear,
      years: _.range(2018, thisYear + 1),
      partTimeHeaders,
      fullTimeHeaders,
      headers: fullTimeHeaders,
      salaryInfo: {},
    };
  },
  methods: {
    formatCurrency,
    fetchSalaryInfo() {
      getSalaryInfo(this.selectedYear)
        .then(salaryInfo => {
          this.salaryInfo = salaryInfo;
          if ("months" in salaryInfo) {
            this.headers = this.fullTimeHeaders;
          } else {
            this.headers = this.partTimeHeaders;
          }
        })
        .catch(e => {
          alert(e);
        });
    }
  },
  created() {
    this.fetchSalaryInfo();
  },
  computed: {
    tableItems() {
      if ("months" in this.salaryInfo) {
        return this.salaryInfo.months;
      }
      return this.salaryInfo.weeks;
    }
  }
};
</script>

<style>
</style>