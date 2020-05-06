<template>
    <div>
        <h2 style="color: orange; padding: 50px 50px"> Rider Delivery Information</h2>
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
                        <v-select :items="years" label="Year" v-model="selectedYear" v-on:change="fetchDeliveryInfo()" outlined ></v-select>
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
    const { getRiderDeliverySummary } = require("../../helpers/manager");
    const _ = require("lodash");
    export default {
        data: function() {
            const thisYear = new Date().getFullYear();
            const header = [
                { text: "Rider Id", value: "riderid" },
                { text: "Name", value: "name" },
                { text: "Month", value: "month" },
                { text: "Average Delivery Time (min)", filterable: false, value: "average_mins" },
                { text: "Total Orders Delivered", value: "total_orders_delivered", filterable: false },
            ];
            const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            return {
                selectedYear: thisYear,
                years: _.range(2018, thisYear + 1),
                headers: header,
                deliveryInfo: [],
                itemsPerPage: 12,
                months,
                search: '',
            };
        },
        methods: {
            fetchDeliveryInfo() {
                getRiderDeliverySummary()
                    .then(
                        salaryInfo => {
                            this.deliveryInfo = salaryInfo;
                            let res = this.deliveryInfo.filter(i => i.year == this.selectedYear);
                            res.forEach(element => {
                                element.month = this.months[element.month - 1];
                            });
                            this.deliveryInfo = res;
                        })
                    .catch(e => {
                        alert(e);
                    });
            }
        },
        created() {
            this.fetchDeliveryInfo();
        },
        computed: {
            tableItems() {
                return this.deliveryInfo;
            }
        }
    };
</script>

<style>
</style>