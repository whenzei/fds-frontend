<template>
    <div>
        <h2 style="color: orange; padding: 50px 50px"> FDS Orders Information</h2>
        <v-container fluid>
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
                        <v-select :items="years" label="Year" v-model="selectedYear" v-on:change="fetchOrdersSummary()" outlined ></v-select>
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
    const { getFDSOrdersSummary } = require("../../helpers/manager");
    const _ = require("lodash");
    export default {
        data: function() {
            const thisYear = new Date().getFullYear();
            // const search: " ";
            const fullTimeHeaders = [
                { text: "Month", value: "month" },
                { text: "Order Count", filterable: false, value: "order_count" },
            ];
            const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            return {
                selectedYear: thisYear,
                years: _.range(2018, thisYear + 1),
                fullTimeHeaders,
                headers: fullTimeHeaders,
                ordersInfo: [],
                itemsPerPage: 12,
                months,
                search: '',
            };
        },
        methods: {
            fetchOrdersSummary() {
                getFDSOrdersSummary()
                    .then(
                        salaryInfo => {
                            this.ordersInfo = salaryInfo;
                            let res = this.ordersInfo.filter(i => i.year == this.selectedYear);
                            res.forEach(element => {
                                element.month = this.months[element.month - 1];
                            });
                            this.ordersInfo = res;
                        })
                    .catch(e => {
                        alert(e);
                    });
            }
        },
        created() {
            this.fetchOrdersSummary();
        },
        computed: {
            tableItems() {
                return this.ordersInfo;
            }
        }
    };
</script>

<style>
</style>