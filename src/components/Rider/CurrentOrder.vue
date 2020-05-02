<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar :color="layoutColor" dark flat>
            <v-toolbar-title>Delivery to {{order.cUsername}}</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text></v-card-text>
          <v-list>
            <v-list-item>
              Restaurant:
              <v-spacer />
              {{order.Restaurant}}
            </v-list-item>
            <v-list-item>
              Restaurant Address:
              <v-spacer />
              {{order['Restaurant Address']}}
            </v-list-item>
            <v-list-item>
              Distance To Restaurant:
              <v-spacer />
              {{formatDistance(order['Distance To Restaurant'])}}
            </v-list-item>
            <v-list-item>
              Customer Address:
              <v-spacer />
              {{order['Customer Address']}}
            </v-list-item>
            <v-list-item>
              Distance To Customer:
              <v-spacer />
              {{formatDistance(order['Distance to Customer'])}}
            </v-list-item>
            <v-list-item>
              Total Price:
              <v-spacer />
              {{formatCurrency(order['Total Price'])}}
            </v-list-item>
            <v-list-item>
              Status:
              <v-spacer />
              {{order.status}}
            </v-list-item>
            <v-list-item>
              Ordered Items:
              <v-spacer />
              <v-list dense>
                <v-list-item v-for="(f, i) in order.orderedItems" :key="i">
                  <span class="qty">x {{f.qty}}</span>
                  <span class="fname">{{f.fname}}</span>
                </v-list-item>
              </v-list>
            </v-list-item>
          </v-list>
          <v-card-actions>
            <v-spacer />
            <v-btn :color="layoutColor" @click="updateOrderStatus">{{action}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  orderStatuses,
  getCurrentOrder,
  postOrderStatusUpdate
} from "../../helpers/rider";
import { formatCurrency, formatDistance } from "../../helpers/format";
import _ from "lodash"
export default {
  data: function() {
    return {
      order: {}
    };
  },
  props: {
    source: String
  },
  methods: {
    updateOrderStatus() {
      postOrderStatusUpdate(this.order.oid, this.order.status)
        .then(() => {
          if (this.order.status === orderStatuses.toCust) {
            this.$router.push({ name: "RiderOrders" });
          } else {
            this.fetchOrder();
          }
        })
        .catch(e => {
          alert(e);
        });
    },
    formatCurrency,
    formatDistance,
    async fetchOrder() {
      try {
        const coords = await this.$getLocation();
        this.lng = coords.lng;
        this.lat = coords.lat;
      } catch (e) {
        console.log(e);
        // No location access so use default position
        this.lng = 103.851959;
        this.lat = 1.29027;
      }
      getCurrentOrder(this.lng, this.lat).then(order => {
        if (_.isEmpty(order)) {
          this.$router.push({ name: "RiderOrders" });
        } else {
          this.order = order;
        }
      });
    }
  },
  computed: {
    action() {
      if (this.order.status === orderStatuses.toRest) {
        return "Arrive at Restaurant";
      } else if (this.order.status === orderStatuses.waiting) {
        return "Depart from Restaurant";
      } else if (this.order.status === orderStatuses.toCust) {
        return "Complete Delivery";
      } else {
        return "";
      }
    },
    layoutColor() {
      if (this.order.status === orderStatuses.toRest) {
        return "error";
      } else if (this.order.status === orderStatuses.waiting) {
        return "warning";
      } else if (this.order.status === orderStatuses.toCust) {
        return "success";
      } else {
        return "error";
      }
    }
  },
  async created() {
    await this.fetchOrder();
  }
};
</script>

<style scoped>
span.qty {
  display: inline-block;
  margin: 4px;
  color: red;
  font-weight: 900;
}
span.fname {
  display: inline-block;
  margin: 4px;
}
</style>