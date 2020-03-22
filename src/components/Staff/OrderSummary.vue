<template>
  <v-container>
    <v-row>
      <v-col lg="3">
        <v-toolbar color="black orange--text text--darken-2 font-weight-black" dark>
            <v-toolbar-title>Staff Workspace</v-toolbar-title>
            </v-toolbar>
            <v-tabs vertical color="orange darken-2" left>
            <v-tab @click="getOrderStatistics">Monthly Breakdown</v-tab>
            <v-tab>Top 5 Food Items</v-tab>
            <v-tab-item v-show="showTable">
                <v-data-table
                :headers="headers"
                :items="getOrderItems">
                </v-data-table>
            </v-tab-item>
            <v-tab-item>
              <v-list>
                <v-row>
                  <v-col cols="15" sm="6" md="4">
                    <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-right="20"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                    >
                    <template v-slot:activator="{ on }">
                    <v-text-field
                        v-model="chosenDate"
                        color="orange darken-2"
                        label="Choose month and year"
                        prepend-icon="mdi-event"
                        readonly
                        v-on="on"
                    ></v-text-field>
                    </template>
                    <v-date-picker v-model="chosenDate"
                      type="month"
                      class="mt-4"
                      min="2004-01"
                      max="2020-12"
                      color="orange darken-3"
                      @input="getTop5Food(chosenDate); menu = false;"></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row>
                    <v-simple-table v-show="showHeader">
                        <template v-slot:default>
                        <thead>
                            <tr>
                            <th class="text-left">Item Name</th>
                            <th class="text-left">Number of Orders</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="food in foodList" :key="food.fname">
                            <td>{{ food.fname }}</td>
                            <td>{{ food.totalqty }}</td>
                            </tr>
                        </tbody>
                        </template>
                    </v-simple-table>
                </v-row>
              </v-list>
            </v-tab-item>
            </v-tabs>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";

export default {
  data: () => ({
    minDate: "",
    maxDate: "",
    chosenDate: "",
    showHeader: false,
    showTable: false,
    orderStats: [],
    mlist: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
    rid: null,
    menu: false,
    foodList: [],
    headers: [
        { text: 'Month', sortable: true, value: "mth" },
        { text: 'Year', sortable: true, value: "yr" },
        { text: 'Number of Completed Orders', sortable: true, value: "numOrders" },
        { text: 'Total Cost (SGD)', sortable: true, value: "cost" }
    ],
  }),
  methods: {
    async getRid() {
      const res = await axios.get(
        `/staff/get-rid/`
      );
      return res.data.rid;
    },
    async getOrderStatistics() {
      this.showTable = true;
      const res = await axios.get(
        `/staff/order-summary/${this.rid}`
      );
      this.orderStats = res.data;
    },
    async getTop5Food(chosenDate) {
        this.showHeader = true;
        const dateSplit = chosenDate.split('-')
        const chosenYr = dateSplit[0];
        const chosenMth = dateSplit[1];
        const res = await axios.get(
            `/staff/top-food?rid=${this.rid}&mth=${chosenMth}&yr=${chosenYr}`
        );
        this.foodList = res.data;
    },
    async getMinMaxDate() {
        const res = await axios.get(
            `/staff/min-max-date/`
        );
        const minDateArr = res.data.mindate.split('-');
        const maxDateArr = res.data.maxdate.split('-');
        return [minDateArr[0] + '-' + minDateArr[1], maxDateArr[0] + '-' + maxDateArr[1]];
    },
  },
  computed: {
      getOrderItems() {
          let items = this.orderStats.map(item => ({
              numOrders: item.numorders,
              cost: (item.totalcost / 100).toLocaleString("en-SG", {
                style: "currency",
                currency: "SGD"
              }),
              mth: this.mlist[item.mth - 1],
              yr: item.yr
          }));
          return items;
      },
  },
  async created() {
    this.rid = await this.getRid();
    [this.minDate, this.maxDate] = await this.getMinMaxDate();
    
    const today = new Date();
    this.chosenDate = today.getFullYear() + '-' + today.getMonth();
  }
  
};
</script>
<style scoped>
* {
  color: #fb8c00;
}
</style>