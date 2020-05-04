<template>
    <div>
    <h2 style="color: orange; padding: 50px 50px"> Rider Salary Information</h2>
    <v-container fluid>
        <v-row align="center">
            <div style="width: 50em; display: inline-block">
            <v-col cols="12" sm="6">
                    <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                    ></v-text-field>
            </v-col>
            </div>
            <div style="display: inline-block">
        <v-col class="d-flex" cols="12" sm="6">
        <v-select :items="years" label="Year" v-model="selectedYear" v-on:change="fetchSalaryInfo()" outlined ></v-select>
        </v-col>
            </div>
        </v-row>
        <v-data-table
                :headers="headers"
                :items="tableItems"
                :items-per-page="itemsPerPage"
                :search="search"
        >
        </v-data-table>
    </v-container>
    </div>
</template>

<script>
    const { getSalarySummary } = require("../../helpers/manager");
    const _ = require("lodash");
    export default {
        data: function() {
            const thisYear = new Date().getFullYear();
            const header = [
                { text: "Rider Id", value: "uid" },
                { text: "Name", value: "name" },
                { text: "Month", value: "month" },
                { text: "Total Salary (S$)", filterable: false, value: "totalsalary" },
                { text: "Total hours", value: "totalhours", filterable: false },
            ];
            const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            return {
                selectedYear: thisYear,
                years: _.range(2018, thisYear + 1),
                headers: header,
                salaryInfo: [],
                itemsPerPage: 12,
                months,
                search: '',
            };
        },
        methods: {
            fetchSalaryInfo() {
                getSalarySummary()
                    .then(
                        salaryInfo => {
                            this.salaryInfo = salaryInfo;
                            let res = this.salaryInfo.filter(i => i.year == this.selectedYear);
                            res.forEach(element => {
                                element.month = this.months[element.month - 1];
                                element.totalsalary = parseInt(element.totalsalary).toLocaleString("en-SG");
                            });
                            this.salaryInfo = res;
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
                return this.salaryInfo;
            }
        }
    };
</script>

<style>
</style>