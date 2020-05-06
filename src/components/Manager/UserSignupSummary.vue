<template>
    <div>
        <h2 style="color: orange; padding: 50px 50px"> Customer Sign ups Information</h2>
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
                        <v-select :items="years" label="Year" v-model="selectedYear" v-on:change="fetchUserSignupSummary()" outlined ></v-select>
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
    const { getUserSignUpSummary } = require("../../helpers/manager");
    const _ = require("lodash");
    export default {
        data: function() {
            const thisYear = new Date().getFullYear();
            const headers = [
                { text: "Month", value: "month" },
                { text: "Number of sign ups", filterable: false, value: "signups" },
            ];
            const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            return {
                selectedYear: thisYear,
                years: _.range(2018, thisYear + 1),
                headers: headers,
                signupInfo: [],
                itemsPerPage: 12,
                months,
                search: '',
            };
        },
        methods: {
            fetchUserSignupSummary() {
                getUserSignUpSummary()
                    .then(
                        salaryInfo => {
                            this.signupInfo = salaryInfo;
                            let res = this.signupInfo.filter(i => i.year == this.selectedYear);
                            res.forEach(element => {
                                element.month = this.months[element.month - 1];
                            });
                            this.signupInfo = res;
                        })
                    .catch(e => {
                        alert(e);
                    });
            }
        },
        created() {
            this.fetchUserSignupSummary();
        },
        computed: {
            tableItems() {

                return this.signupInfo;
            }
        }
    };
</script>

<style>
</style>