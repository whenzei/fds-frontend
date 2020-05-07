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
        <v-container class="grey darken-4" v-if="items !== undefined && items.length !== 0">
          <v-row v-for="(item,index) in items" :key="item.fname">
            <v-col lg="6">{{index+1}}) {{item.fname}} ({{priceInStr(item.priceInteger)}})</v-col>
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
          <v-row justify="end">
            <v-col class="headline" lg="4">
              <b>Total:</b>
              {{totalPriceString}}
            </v-col>
          </v-row>
        <div class="red--text text--lighten-2">Minimum spending of {{resMinSpendingStr}}</div>
        </v-container>
        <v-container v-if="items !== null && items.length > 0">
          <v-row>
            <v-col lg="12">
              <v-card flat>
                <v-card-title class="display-1 orangeText">Checkout Details</v-card-title>
              </v-card>
              <v-divider></v-divider>
            </v-col>
            <v-col lg="12">
              <v-radio-group row v-model="isRecent">
                <v-radio label="Enter New Address" :value="false"></v-radio>
                <v-radio label="Choose Recent Address" :value="true"></v-radio>
              </v-radio-group>
            </v-col>
            <template v-if="!isRecent">
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
                <v-text-field
                  color="orange"
                  v-model="unit"
                  dense
                  filled
                  label="Enter Unit#"
                  maxlength="10"
                ></v-text-field>
              </v-col>
              <v-col lg="6">
                <v-text-field color="orange" v-model="postalCode" label="Postal Code" disabled></v-text-field>
              </v-col>
            </template>
            <v-col lg="12" v-else>
              <v-radio-group v-model="selectedRecent">
                <v-radio
                  v-for="recentAddress in recentAddresses"
                  :label="recentAddress.address + ' ' + recentAddress.postal + ' #' + recentAddress.unit"
                  :key="recentAddress.postal"
                  :value="recentAddress"
                ></v-radio>
              </v-radio-group>
            </v-col>
            <v-col lg="12">
              <v-select
                v-model="promo"
                :items="promos"
                label="Apply promotions?"
                outlined
                dense
                color="orange"
              ></v-select>
            </v-col>
            <v-col lg="6">
              <v-checkbox
                v-model="waive"
                color="orange"
                label="Use points to wave delivery fee?"
                v-if="points >= 300"
              ></v-checkbox>
            </v-col>
            <v-col lg="6">
              Payment Method
              <v-divider></v-divider>
              <v-radio-group v-model="isCod">
                <v-radio label="Cash on delivery" :value="true"></v-radio>
                <v-radio v-if="hasCredit" label="Credit card" :value="false"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions class="justify-center">
          <v-btn
            color="green darken-3"
            v-if="items !== null && items.length > 0 && !submitted"
            :disabled="isNotReady"
            @click="checkout"
          >Checkout</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <LoaderOverlay :load="submitted" />
    <v-snackbar v-model="successSnack" :timeout="3000" color="green" top>Order submitted</v-snackbar>
    <v-snackbar v-model="failSnack" :timeout="3000" color="red" top>An error has occured</v-snackbar>
  </div>
</template>

<script>
import axios from "axios";
import LoaderOverlay from "../LoaderOverlay";

export default {
  props: ["items", "rid", "minSpending"],
  data: () => ({
    submitted: false,
    successSnack: false,
    failSnack: false,
    dialog: false,
    isRecent: false,
    unit: null,
    promo: null,
    points: null,
    hasCredit: false,
    isCod: true,
    possibleAddresses: [],
    selectedAddress: null,
    addressSearch: null,
    postalCode: null,
    recentAddresses: [],
    selectedRecent: null,
    postalMap: {},
    promos: [],
    promosMap: {},
    waive: false
  }),
  computed: {
    totalPriceString() {
      return this.priceInStr(this.totalPriceInteger);
    },
    totalPriceInteger() {
      return this.items
        .map(item => item.priceInteger * item.qty)
        .reduce((a, b) => a + b, 0);
    },
    isNotReady() {
      if (this.totalPriceInteger < this.minSpending) {
        return true;
      }
      if (
        this.promo != null &&
        this.totalPriceInteger < this.promosMap[this.promo].minSpending
      ) {
        return true;
      }
      if (this.isRecent) {
        return this.selectedRecent == null;
      } else {
        return (
          this.selectedAddress == null ||
          this.postalCode == null ||
          this.unit == null
        );
      }
    },
    resMinSpendingStr() {
      return (this.minSpending / 100).toLocaleString("en-SG", {
          style: "currency",
          currency: "SGD"
        })
    }
  },
  watch: {
    addressSearch(val) {
      val && val !== this.selectedAddress && this.getAddresses(val);
    },
    selectedAddress(val) {
      this.postalCode = this.postalMap[val];
    }
  },
  methods: {
    priceInStr(price) {
      return (price / 100).toLocaleString("en-SG", {
        style: "currency",
        currency: "SGD"
      });
    },
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
        this.possibleAddresses = res.data.map(item => item.address);
        let tempMap = {};
        res.data.forEach(item => {
          tempMap[item.address] = item.postal;
        });
        this.postalMap = tempMap;
      } else {
        this.possibleAddresses = [];
      }
    },
    async populateAccountInfo() {
      const res = await axios.get("/customer/account");
      if (res.status == 200) {
        this.points = res.data[0].points;
        this.hasCredit = res.data[0].creditcard != null ? true : false;
      }
    },
    async populateRecentAddresses() {
      const res = await axios.get("/customer/frequents");
      if (res.status == 200) {
        this.recentAddresses = res.data;
      }
    },
    async populatePromos() {
      const res = await axios.get(`/customer/promos/${this.rid}`);
      if (res.status == 200) {
        this.promos.push("None");
        this.promosMap["None"] = {
          minSpending: 0,
          pid: null
        };
        res.data.forEach(item => {
          let promoStr = `Promo ${item.pid}: `;
          promoStr += item.percentoff > 0 ? `[${item.percentoff}% OFF]` : "";
          promoStr += item.points > 0 ? `[${item.points} points]` : "";
          let minSpendingStr = this.convertToPriceStr(item.minspending);
          promoStr +=
            item.minspending > 0 ? `  (Min ${minSpendingStr} spent)` : "";
          this.promosMap[promoStr] = {
            minSpending: item.minspending,
            pid: item.pid
          };
          this.promos.push(promoStr);
        });
      }
    },
    async checkout() {
      this.submitted = true;
      this.dialog = false;
      let orderDetails = this.preprocessOrder();
      try {
        const res = await axios.post("/customer/checkout", orderDetails);
        await this.wait(1000);
        this.submitted = false;
        if (res.status == 200) {
          this.successSnack = true;
          await this.wait(1000);
          this.$router.push("/customer/orders");
        } else {
          await this.wait(1000);
          this.failSnack = true;
        }
      } catch (error) {
          await this.wait(1000);
          this.submitted = false;
          this.failSnack = true;
      }
    },
    preprocessOrder() {
      let order = {
        rid: this.rid,
        items: this.items,
        waiveFee: this.waive,
        isCod: this.isCod
      };
      if (this.isRecent) {
        order.addrInfo = this.selectedRecent;
      } else {
        order.addrInfo = {
          address: this.selectedAddress,
          unit: this.unit,
          postal: parseInt(this.postalCode)
        };
      }
      if (this.promo !== null) {
        order.pid = this.promosMap[this.promo].pid;
      } else {
        order.pid = null;
      }
      return order;
    },
    convertToPriceStr(num) {
      return (num / 100).toLocaleString("en-SG", {
        style: "currency",
        currency: "SGD"
      });
    },
    async wait(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  },
  async created() {
    this.populateRecentAddresses();
    this.populateAccountInfo();
    this.populatePromos();
  },
  components: {
    LoaderOverlay
  }
};
</script>