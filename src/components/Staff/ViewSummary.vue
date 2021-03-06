<template>
  <v-container>
    <v-row>
      <v-toolbar color="black orange--text text--darken-2 font-weight-black" dark>
        <v-toolbar-title>Staff Workspace</v-toolbar-title>
      </v-toolbar>
      <v-tabs vertical color="orange darken-2" left>
        <v-tab @click="getListOfOrders">View Orders</v-tab>
        <v-tab @click="getOrderStatistics">Monthly Breakdown</v-tab>
        <v-tab>Food Items Summary</v-tab>
        <v-tab @click="getPromoStatistics">Promotion Summary</v-tab>
        <v-tab-item>
          <v-data-table
            :headers="orderHeaders"
            :items="getAllOrders"
            :expanded.sync="expanded"
            :search="searchOrders"
            item-key="oid"
            show-expand
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>All Orders</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="searchOrders"
                  append-icon="mdi-magnify"
                  color="orange darken-2"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
                <template v-slot:extension>
                  <v-row justify="start">
                    <v-col md="auto">Filter by:</v-col>
                    <v-col sm="3" md="auto">
                      <v-checkbox
                        v-model="filterList"
                        label="Delivered"
                        color="green darken-2"
                        value="Delivered"
                      ></v-checkbox>
                    </v-col>
                    <v-col sm="3" md="auto">
                      <v-checkbox
                        v-model="filterList"
                        label="Delivery in Progress"
                        color="yellow darken-2"
                        value="Delivery in Progress"
                      ></v-checkbox>
                    </v-col>
                    <v-col sm="3" md="auto">
                      <v-checkbox
                        v-model="filterList"
                        label="Awaiting Pick Up"
                        color="blue darken-2"
                        value="Awaiting Pick Up"
                      ></v-checkbox>
                    </v-col>
                    <v-col sm="3" md="auto">
                      <v-checkbox
                        v-model="filterList"
                        label="Not Assigned"
                        color="grey darken-2"
                        value="Not Assigned"
                      ></v-checkbox>
                    </v-col>
                    <v-col sm="3" md="auto">
                      <v-checkbox
                        v-model="filterList"
                        label="Error"
                        color="red darken-2"
                        value="Error"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </template>
              </v-toolbar>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">{{ item.itemsOrdered }}</td>
            </template>
            <template v-slot:item.status="{ item }">
              <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
            </template>
          </v-data-table>
        </v-tab-item>
        <v-tab-item>
          <v-toolbar flat>
            <v-toolbar-title>Monthly Breakdown</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-row justify="end">
              <v-col lg="4">
                <v-select
                  class="mt-8"
                  v-model="selectedYearForSummary"
                  color="orange darken-2"
                  item-color="orange darken-2"
                  :items="yearList"
                  label="Select year"
                ></v-select>
              </v-col>
            </v-row>
          </v-toolbar>
          <v-col>
            <v-data-table :headers="orderStatsHeaders" :items="getOrderStatsItems"></v-data-table>
          </v-col>
        </v-tab-item>
        <v-tab-item>
          <v-toolbar flat>
            <v-toolbar-title>Food Summary</v-toolbar-title>
            <template v-slot:extension>
              <v-row justify="start">
                <v-col cols="3" class="mt-4">
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
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="chosenDate"
                      type="month"
                      class="mt-4"
                      :min="minDate"
                      :max="maxDate"
                      color="orange darken-3"
                      @input="getFoodCount(chosenDate); menu = false;"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="2" class="mt-4">
                  <v-select
                    v-model="limit"
                    :items="limitOptions"
                    max-width="190px"
                    color="orange darken-2"
                    item-color="orange darken-3"
                    label="Limit number of results"
                    @change="getFoodCount(chosenDate)"
                  ></v-select>
                </v-col>
                <v-col class="mt-4">
                  <v-radio-group
                    v-model="toGetMostPopularFoodItems"
                    label="Sort by"
                    :mandatory="true"
                    row
                    @change="getFoodCount(chosenDate)"
                  >
                    <v-radio label="Most popular" color="orange darken-3" value="true"></v-radio>
                    <v-radio label="Least popular" color="orange darken-3" value="false"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </template>
          </v-toolbar>
          <v-col>
            <v-data-table :headers="foodHeaders" :items="getFoodItems" hide-default-footer></v-data-table>
          </v-col>
        </v-tab-item>
        <v-tab-item>
          <v-toolbar flat>
            <v-toolbar-title>Promotion Summary</v-toolbar-title>
          </v-toolbar>
          <v-col>
            <v-data-table :headers="promoHeaders" :items="getPromoItems"></v-data-table>
          </v-col>
        </v-tab-item>
      </v-tabs>
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
    limit: 5,
    expanded: [],
    toGetMostPopularFoodItems: null,
    orderList: [],
    filteredOrderList: [],
    orderStats: [],
    promoStats: [],
    yearList: [],
    selectedYearForSummary: "All",
    searchOrders: '',
    limitOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    mlist: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    ColorEnum: {
      Delivered: "green darken-2",
      InProgress: "yellow darken-2",
      PickUp: "blue darken-2",
      NotAssigned: "grey darken-2",
      Error: "red darken-2"
    },
    rid: null,
    menu: false,
    singleExpand: false,
    filterList: [
      "Delivered",
      "Delivery in Progress",
      "Awaiting Pick Up",
      "Not Assigned",
      "Error"
    ],
    foodList: [],
    orderHeaders: [
      { text: "Order ID", sortable: true, value: "oid" },
      { text: "Status", sortable: true, value: "status" },
      {
        text: "Customer Name",
        sortable: true,
        value: "cname"
      },
      {
        text: "Order Time",
        sortable: true,
        value: "orderTime"
      },
      {
        text: "Delivered Time",
        sortable: true,
        value: "deliveredTime"
      },
      {
        text: "Total Price (SGD)",
        sortable: true,
        value: "totalPrice"
      },
      {
        text: "Promo ID",
        sortable: true,
        value: "pid"
      },
      {
        text: "Rider Name",
        sortable: true,
        value: "ridername"
      },
      { text: "", value: "data-table-expand", filterable: false }
    ],
    foodHeaders: [
      { text: "Food Items", sortable: true, value: "fname" },
      { text: "Number of Orders", sortable: true, value: "numOrders" }
    ],
    orderStatsHeaders: [
      { text: "Month", sortable: true, value: "mth" },
      { text: "Year", sortable: true, value: "yr" },
      {
        text: "Number of Completed Orders",
        sortable: true,
        value: "numOrders"
      },
      { text: "Total Cost (SGD)", sortable: true, value: "cost" }
    ],
    promoHeaders: [
      { text: "Promo ID", value: "pid" },
      { text: "Duration (days)", sortable: true, value: "duration" },
      { text: "Total Number of Orders", sortable: true, value: "numOrders" },
      { text: "Average Number of Orders", sortable: true, value: "avgOrders" }
    ]
  }),
  methods: {
    async getRid() {
      const res = await axios.get(`/staff/get-rid/`);
      return res.data.rid;
    },
    async getListOfOrders() {
      const res = await axios.get(`/staff/get-orders/${this.rid}`);
      this.orderList = res.data;
    },
    async getOrderStatistics() {
      const res = await axios.get(`/staff/order-summary/${this.rid}`);
      this.orderStats = res.data;
    },
    async getFoodCount(chosenDate) {
      const dateSplit = chosenDate.split("-");
      const chosenYr = dateSplit[0];
      const chosenMth = dateSplit[1];
      const res = await axios.get(
        `/staff/food-count?rid=${this.rid}&mth=${chosenMth}&yr=${chosenYr}&isDesc=${this.toGetMostPopularFoodItems}&limit=${this.limit}`
      );
      this.foodList = res.data;
    },
    async getPromoStatistics() {
      const res = await axios.get(`/staff/promo-summary/${this.rid}`);
      this.promoStats = res.data;
    },
    async getMinMaxDate() {
      const res = await axios.get(`/staff/min-max-date/`);
      const minDateArr = res.data.mindate.split("-");
      const maxDateArr = res.data.maxdate.split("-");
      return [
        minDateArr[0] + "-" + minDateArr[1],
        maxDateArr[0] + "-" + maxDateArr[1]
      ];
    },
    getColor(status) {
      if (status === "Delivered") {
        return this.ColorEnum.Delivered;
      } else if (status === "Delivery in Progress") {
        return this.ColorEnum.InProgress;
      } else if (status === "Awaiting Pick Up") {
        return this.ColorEnum.PickUp;
      } else if (status === "Not Assigned") {
        return this.ColorEnum.NotAssigned;
      }
      return this.ColorEnum.Error;
    }
  },
  computed: {
    getAllOrders() {
      let items = this.orderList.map(item => ({
        oid: item.oid,
        status: item.status,
        ridername: item.ridername,
        pid: item.pid,
        cname: item.cname,
        totalPrice: (item.finalprice / 100).toLocaleString("en-SG", {
          style: "currency",
          currency: "SGD"
        }),
        orderTime: new Date(item.ordertime).toLocaleString("en-SG", {
          hour12: false
        }),
        deliveredTime: item.deliveredtime
          ? new Date(item.deliveredtime).toLocaleString("en-SG")
          : null,
        itemsOrdered: item.itemsordered
      }));

      return items.filter(item => {
        return this.filterList.includes(item.status);
      });
    },
    getOrderStatsItems() {
      let items = this.orderStats.map(item => ({
        numOrders: item.numorders,
        cost: (item.totalcost / 100).toLocaleString("en-SG", {
          style: "currency",
          currency: "SGD"
        }),
        mth: this.mlist[item.mth - 1],
        yr: item.yr
      }));

      if (this.selectedYearForSummary == "All") {
        return items;
      }
      return items.filter(item => {
        return item.yr == this.selectedYearForSummary;
      });
    },
    getFoodItems() {
      let items = this.foodList.map(item => ({
        fname: item.fname,
        numOrders: item.totalqty
      }));
      return items;
    },
    getPromoItems() {
      let items = this.promoStats.map(item => ({
        pid: item.pid,
        numOrders: item.numorders,
        duration: item.duration,
        avgOrders: +(item.numorders / item.duration).toFixed(2)
      }));
      return items;
    }
  },
  async created() {
    this.rid = this.$store.getters["staff/rid"];
    [this.minDate, this.maxDate] = await this.getMinMaxDate();
    let yearList = [];
    for (
      var i = parseInt(this.minDate.substring(0, 5));
      i <= parseInt(this.maxDate.substring(0, 5));
      i++
    ) {
      yearList.push(i);
    }
    yearList.push("All");
    this.yearList = yearList;

    const today = new Date();
    this.chosenDate = today.getFullYear() + "-" + today.getMonth();
    await this.getListOfOrders();
  }
};
</script>
<style scoped>
* {
  color: #fb8c00;
}
</style>
<style scoped>
.v-radio-group input {
  font-size: 1.1em;
}
</style>
<style scoped>
.v-chip {
  font-size: 0.9em;
}
</style>