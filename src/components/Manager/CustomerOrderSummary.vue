<template>
    <div>
        <h2 style="color: orange; padding: 50px 50px"> Customer Order Information</h2>
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
                        <v-select :items="years" label="Year" v-model="selectedYear" v-on:change="fetchCustomerOrderSummary()" outlined ></v-select>
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
    const { getCustomerOrderSummary } = require("../../helpers/manager");
    const _ = require("lodash");
    export default {
        data: function() {
            const thisYear = new Date().getFullYear();
            const headers = [
                { text: "Customer Id", value: "customerid" },
                { text: "Name", value: "name" },
                { text: "Month", value: "month" },
                { text: "Number of orders", filterable: false, value: "order_count" },
                { text: "Total Amount Spent", value: "totalprice", filterable: false },
            ];
            const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            return {
                selectedYear: thisYear,
                years: _.range(2018, thisYear + 1),
                headers: headers,
                orderInfo: [],
                itemsPerPage: 12,
                months,
                search: '',
            };
        },
        methods: {
            fetchCustomerOrderSummary() {
                getCustomerOrderSummary()
                    .then(
                        salaryInfo => {
                            this.orderInfo = salaryInfo;
                            let res = this.orderInfo.filter(i => i.year == this.selectedYear);
                            res.forEach(element => {
                                element.month = this.months[element.month - 1];
                                element.totalprice = parseInt(element.totalprice).toLocaleString("en-SG");
                            });
                            this.orderInfo = res;
                        })
                    .catch(e => {
                        alert(e);
                    });
            }
        },
        created() {
            this.fetchCustomerOrderSummary();
        },
        computed: {
            tableItems() {
                return this.orderInfo;
            }
        }
    };
</script>

<style>
</style>