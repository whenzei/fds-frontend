<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{on}">
        <v-btn dark v-on="on" depressed x-large>
          <v-icon class="orange--text" medium>mdi-cart</v-icon>
          <span>{{totalPriceString}}</span>
        </v-btn>
      </template>
      <v-card>
        <v-card-title v-if="items === undefined || items.length == 0">Cart is empty</v-card-title>
        <v-card-title class="display-1" v-else>Cart</v-card-title>
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
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["items", "rid"],
  data: () => ({
    dialog: false
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
    }
  }
};
</script>