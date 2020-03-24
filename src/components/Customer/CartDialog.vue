<template>
  <div>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{on}">
        <v-btn dark v-on="on" depressed x-large>
          <v-icon class="orange--text" medium>mdi-cart</v-icon>
          <span>{{totalPriceString}}</span>
        </v-btn>
      </template>
      <v-card>
        <v-card-title
          class="display-1 orangeText"
          v-if="items === undefined || items.length == 0"
        >Cart is empty</v-card-title>
        <v-card-title class="display-1 orangeText" v-else>Cart</v-card-title>
        <v-divider></v-divider>
        <v-container style="height: 300px">
          <v-row v-for="(item,index) in items" :key="item.fname">
            <v-col lg="6">{{index+1}}) {{item.fname}}</v-col>
            <v-col lg="1">
              <v-icon @click="minus(item)">mdi-minus-circle</v-icon>
            </v-col>
            <v-col lg="3">
              <div class="text-center">{{item.qty}}</div>
            </v-col>
            <v-col lg="1">
              <v-icon @click="plus(item)">mdi-plus-circle</v-icon>
            </v-col>
            <v-col lg="1" algin="end">
              <v-icon @click="remove(item)" class="red--text" small>mdi-delete</v-icon>
            </v-col>
          </v-row>
        </v-container>
        <v-container>
          <v-row>
            <v-col lg="12">
              <v-card flat>
                <v-card-title class="display-1 orangeText">Checkout Details</v-card-title>
              </v-card>
              <v-divider></v-divider>
            </v-col>
            <v-col></v-col>
            <v-col lg="12">
              <v-autocomplete
                v-model="selectedAddress"
                :search-input.sync="addressSearch"
                color="orange"
                dense
                filled
                hide-details
                hide-no-data
                disable-lookup
                label="Enter Address"
                solo-inverted
                :items="possibleAddresses"
              ></v-autocomplete>
            </v-col>
            <v-col lg="6">
              <v-text-field color="orange" v-model="unit" dense filled label="Enter Unit#"></v-text-field>
            </v-col>
            <v-col lg="6">
              <v-text-field color="orange" v-model="postalCode" label="Postal Code" disabled></v-text-field>
            </v-col>
            <v-col lg="6">
              <v-select
                v-model="promo"
                :items="['promo1']"
                label="Apply promotions?"
                outlined
                dense
                color="orange"
              ></v-select>
            </v-col>
            <v-col lg="6">
              <v-checkbox color="orange" label="Use points to wave delivery fee?"></v-checkbox>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["items", "rid"],
  data: () => ({
    dialog: false,
    unit: null,
    promo: null,
    possibleAddresses: [],
    selectedAddress: null,
    addressSearch: null,
    postalCode: null,
    postalMap: {},
  }),
  computed: {
    totalPriceString() {
      return (this.totalPriceInteger / 100).toLocaleString("en-SG", {
        style: "currency",
        currency: "SGD"
      });
    },
    totalPriceInteger() {
      return this.items
        .map(item => item.priceInteger * item.qty)
        .reduce((a, b) => a + b, 0);
    }
  },
  watch: {
    addressSearch (val) {
      val && val !== this.selectedAddress && this.getAddresses(val);
    },
    selectedAddress(val) {
      this.postalCode = (this.postalMap)[val];
    }
  },
  methods: {
    plus(item) {
      item.qty += 1;
    },
    minus(item) {
      if (item.qty === 1) {
        return;
      }
      item.qty -= 1;
    },
    remove(itemToRemove) {
      this.items.splice(
        this.items.findIndex(item => item.fname === itemToRemove.fname),
        1
      );
    },
    async getAddresses(searchStr) {
      const res = await axios.get("/customer/addresses", {
        params: { search: searchStr }
      });
      if (res.status == 200) {
        this.possibleAddresses = (res.data).map(item => item.address);
        let tempMap = {};
        (res.data).forEach(item => {
          tempMap[item.address] = item.postal;
        });
        this.postalMap = tempMap;
      } else {
        this.possibleAddresses = [];
      }
    }
  }
};
</script>