<template>
  <v-container>
    <v-card>
      <v-card-title class="orangeText black display-1">
        <v-row class="pa-2">Orders Summary</v-row>
        <v-spacer></v-spacer>
        <v-row justify="end">
          <v-btn fab class="mr-4" @click="refresh">
            <v-icon color="orange">mdi-refresh</v-icon>
          </v-btn>
        </v-row>
      </v-card-title>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="orders"
      :sort-by="['delivered', 'deliverTime']"
      :sort-desc="[false, true]"
      :expanded.sync="ordersExpanded"
      multi-sort
      single-expand
      show-expand
      class="elevation-1"
      item-key="oid"
    >
      <template v-slot:item.delivered="{ item }">
        <v-row justify="center">
          <v-icon v-if="item.delivered" class="green--text" large>mdi-check-circle</v-icon>
          <v-icon v-else class="orange--text" large>mdi-moped</v-icon>
        </v-row>
      </template>
      <template v-slot:item.priceStr="{ item }">
        <v-chip color="yellow darken-3 black--text">{{ item.priceStr }}</v-chip>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length" class="grey darken-4">
          <v-row justify="center">
            <v-col lg="3">
              <v-card class="headline grey darken-4" flat>
                <v-card-title>Delivery Address</v-card-title>
                <v-card-text>
                  {{item.address}}
                  <br />
                  {{item.postal + ' #' + item.unit}}
                </v-card-text>
              </v-card>
            </v-col>
            <v-col lg="3">
              <v-card class="headline grey darken-4" flat>
                <v-card-title>Checkout Details</v-card-title>
                <v-card-text>
                  Promotion:
                  <span
                    class="orangeText"
                  >{{item.pid == null ? '-' : item.pid + " " + item.points + item.discount}}</span>
                  <br />Others:
                  <span class="orangeText">{{item.waived}}</span>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col lg="3">
              <v-list class="grey darken-3">
                <v-list-item v-for="food in item.foodList" :key="food">
                  <v-list-item-content v-text="food"></v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col lg="1">
              <v-row justify="end">
                <ReviewDialog
                  v-if="item.deliverTime != null && !(item.reviewed)"
                  :restaurant="item.restaurant"
                  :oid="item.oid"
                  @reviewed="refreshAfterReview"
                  :key="item.oid"
                />
              </v-row>
              <v-row justify="end" class="mt-2">
                <RateDialog
                  v-if="item.deliverTime!=null && !(item.rated)"
                  :oid="item.oid"
                  @rated="refreshAfterRate"
                  :key="item.oid"
                />
              </v-row>
            </v-col>
          </v-row>
        </td>
      </template>
    </v-data-table>
    <v-snackbar v-model="reviewSnack" :timeout="2000" color="red lighten-1" bottom left>Food review submitted</v-snackbar>
    <v-snackbar v-model="ratingSnack" :timeout="2000" color="teal" bottom left>Rider rating submitted</v-snackbar>
  </v-container>
</template>
<script>
import axios from "axios";
import ReviewDialog from "./ReviewDialog";
import RateDialog from "./RateDialog";

export default {
  data() {
    return {
      headers: [
        {
          text: "Status",
          align: "center",
          value: "delivered"
        },
        {
          text: "Order ID#",
          value: "oid",
          align: "center"
        },
        {
          text: "Order Date",
          align: "center",
          value: "orderTime"
        },
        {
          text: "Deliver Date",
          align: "center",
          value: "deliverTime"
        },
        {
          text: "Restaurant",
          align: "center",
          value: "restaurant"
        },
        { text: "Total Price($)", value: "priceStr", sortable: false },
        { text: "", value: "data-table-expand" }
      ],
      orders: [],
      ordersExpanded: [],
      rate: false,
      reviewSnack: false,
      ratingSnack: false
    };
  },
  methods: {
    async populateOrders() {
      const res = await axios.get("/customer/orders");
      this.orders = res.data.map(item => ({
        priceStr: (item.payableprice / 100).toLocaleString("en-SG", {
          style: "currency",
          currency: "SGD"
        }),
        price: item.payableprice,
        oid: item.oid,
        orderTime: item.ordertime,
        deliverTime: item.delivertime,
        address: item.streetname,
        unit: item.unit,
        postal: item.postalcode,
        delivered: item.delivertime != null ? true : false,
        points: item.points == 0 ? "" : "[" + item.points + " points]",
        discount: item.discount == 0 ? "" : "[" + item.discount + "% OFF]",
        pid: item.pid,
        foodList: item.foodlist.split(","),
        waived: item.waived ? "Delivery fee waived with 300 points" : "-",
        restaurant: item.rname,
        reviewed: item.reviewed,
        rated: item.rated
      }));
    },
    async refresh() {
      await this.populateOrders();
    },
    async refreshAfterReview() {
      this.reviewSnack = true;
      await this.refresh();
    },
    async refreshAfterRate() {
      this.ratingSnack = true;
      await this.refresh();
    }
  },
  async created() {
    await this.populateOrders();
  },
  components: {
    ReviewDialog,
    RateDialog
  }
};
</script>