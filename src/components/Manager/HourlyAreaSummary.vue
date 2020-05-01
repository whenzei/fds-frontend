<template>
    <div>
        <h2 style="color: orange; padding: 50px 50px"> Most popular areas</h2>
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
    export default {
        data: function() {
            const header = [
                { text: "Area Postal Code", value: "postalcode" },
                { text: "Number of Orders", value: "count" },
                { text: "Hour of the Day", value: "hour" },
            ];
            return {
                headers: header,
                areaOrdersInfo: [],
                itemsPerPage: 12,
                search: '',
            };
        },
        methods: {
            fetchAreaOrderSummary() {
                getHourlyAreaOrdersSummary()
                    .then(
                        salaryInfo => {
                            this.areaOrdersInfo = salaryInfo;
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