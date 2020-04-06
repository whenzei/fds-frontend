<template>
  <v-card>
    <CartDialog
      class="pt-3 pr-3"
      align="end"
      :items="cartItems"
      :rid="rid"
      :minSpending="minSpending"
    />
    <v-card-title>
      <v-row>
        <v-col lg="6">
          <span class="display-2 font-weight-black orangeText">{{rname}}</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col lg="6">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
        <v-col lg="6">
          <v-row class="pl-2">
            <v-rating
              v-model="stars"
              color="orange accent"
              background-color="grey"
              empty-icon="$ratingFull"
              hover
              dense
              half-increments
              readonly
            ></v-rating>
            <ReviewsDialog :rid="rid" :rname="rname"/>
          </v-row>
        </v-col>
      </v-row>
    </v-card-title>
    <v-data-table :headers="headers" :items="allItems" :search="search" item-key="fname">
      <template v-slot:item.qty="{ item }">
        <v-row>
          <div max-width="100">
            <v-text-field
              color="orange"
              v-model="item.qty"
              type="number"
              min="1"
              hide-details
              dense
              value="0"
            ></v-text-field>
          </div>
          <v-btn class="mb-2" icon :disabled="item.qty <= 0" @click="addToCart(item)">
            <v-icon class="green--text">mdi-plus-circle</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-table>
    <v-snackbar color="orange darken-4" v-model="snackbar" :timeout="500">Item added to cart.</v-snackbar>
  </v-card>
</template>

<script>
import CartDialog from "./CartDialog";
import ReviewsDialog from "./ReviewsDialog";
import axios from "axios";

export default {
  props: ["menu", "rname", "rid", "minSpending"],
  data: () => ({
    search: "",
    headers: [
      { text: "Item Name", align: "start", value: "fname" },
      { text: "Category", value: "category" },
      { text: "Price ($)", value: "price" },
      { text: "Quantity", value: "qty" }
    ],
    cart: [],
    stars: null,
    snackbar: false
  }),
  computed: {
    allItems() {
      let items = this.menu.map(item => ({
        fname: item.fname,
        category: item.category,
        price: (item.price / 100).toLocaleString("en-SG", {
          style: "currency",
          currency: "SGD"
        }),
        priceInteger: item.price,
        qty: 0
      }));
      return items;
    },
    cartItems() {
      return this.cart;
    }
  },
  methods: {
    addToCart(newItem) {
      this.snackbar = true;
      const existingItem = this.cart.filter(
        item => item.fname === newItem.fname
      )[0];
      if (existingItem) {
        existingItem.qty = existingItem.qty + parseInt(newItem.qty);
      } else {
        this.cart.push({
          fname: newItem.fname,
          priceInteger: newItem.priceInteger,
          qty: parseInt(newItem.qty)
        });
      }
    }
  },
  async created() {
    const res = await axios.get(`customer/restaurant-rating/${this.rid}`);
    this.stars = Number(res.data.stars);
  },
  components: {
    CartDialog,
    ReviewsDialog
  }
};
</script>