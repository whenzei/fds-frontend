<template>
    <div>
        <h2 style="color: orange; padding: 50px 50px"> Most popular areas</h2>
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
                <div style="display: inline-block; width: 28em">
                    <v-col class="d-flex" cols="12" sm="6">
                        <v-select :items="years" label="Year" v-model="selectedYear" v-on:change="fetchAreaOrderSummary()" outlined ></v-select>
                        <v-select :items="months" style="padding-left: 20px;" label="Month" v-model="selectedMonth" v-on:change="fetchAreaOrderSummary()" outlined ></v-select>

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
    const { getHourlyAreaOrdersSummary } = require("../../helpers/manager");
    const _ = require("lodash");
    export default {
        data: function() {
            const thisYear = new Date().getFullYear();
            const header = [
                { text: "Area Postal Code", value: "postalcode" },
                { text: "Number of Orders", value: "count" },
                { text: "Hour of the Day", value: "hour" },
                { text: "Month", value: "month" },

            ];
            const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];

            return {
                selectedYear: thisYear,
                selectedMonth: months[0],
                years: _.range(2018, thisYear + 1),
                headers: header,
                areaOrdersInfo: [],
                itemsPerPage: 12,
                search: '',
                months,
            };
        },
        methods: {
            fetchAreaOrderSummary() {
                getHourlyAreaOrdersSummary()
                    .then(
                        salaryInfo => {
                            this.areaOrdersInfo = salaryInfo;
                            let res = this.areaOrdersInfo;
                            res.forEach(element => {
                                element.month = this.months[element.month - 1];
                            });
                            res = res.filter(i => i.year == this.selectedYear && i.month == this.selectedMonth)
                            this.areaOrdersInfo = res;
                        })
                    .catch(e => {
                        alert(e);
                    });
            }
        },
        created() {
            this.fetchAreaOrderSummary();
        },
        computed: {
            tableItems() {
                return this.areaOrdersInfo;
            }
        }
    };
</script>

<style>
</style>