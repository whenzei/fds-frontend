<template>
    <div>
        <h2 style="color: orange; padding: 50px 50px"> FDS Sales Information</h2>
        <v-container fluid>
            <div style="width: 90%; margin: 0 auto">
            <v-row align="center">
                <div style="width: 50em; display: inline-block">
                    <v-col cols="12" sm="6">
                        <v-text-field
                                v-model="search"
                                v-on:change="check"
                                append-icon="mdi-magnify"
                                label="Search"
                                single-line
                                hide-details
                        ></v-text-field>
                    </v-col>
                </div>
                <div style="display: inline-block">
                    <v-col class="d-flex" cols="12" sm="6">
                        <v-select :items="years" label="Year" v-model="selectedYear" v-on:change="fetchSalesSummary()" outlined ></v-select>
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
            </div>
        </v-container>
    </div>
</template>

<script>
    const { getRestaurantSalesSummary } = require("../../helpers/manager");
    const _ = require("lodash");
    export default {
        data: function() {
            const thisYear = new Date().getFullYear();
            const header = [
                { text: "Month", value: "month" },
                { text: "Total Sales (S$)", filterable: false, value: "monthly_sales" },
            ];
            const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            return {
                selectedYear: thisYear,
                years: _.range(2018, thisYear + 1),
                headers: header,
                salesInfo: [],
                itemsPerPage: 12,
                months,
                search: '',
            };
        },
        methods: {
            fetchSalesSummary() {
                getRestaurantSalesSummary()
                    .then(
                        salaryInfo => {
                            this.salesInfo = salaryInfo;
                            let res = this.salesInfo.filter(i => i.year == this.selectedYear);
                            res.forEach(element => {
                                element.month = this.months[element.month - 1];
                                element.monthly_sales = parseInt(element.monthly_sales).toLocaleString("en-SG")
                            });
                            this.salesInfo = res;
                        })
                    .catch(e => {
                        alert(e);
                    });
            }
        },
        created() {
            this.fetchSalesSummary();
        },
        computed: {
            tableItems() {
                return this.salesInfo;
            }
        }
    };
</script>

<style>
</style>