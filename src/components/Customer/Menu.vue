<template>
  <v-card>
    <v-card-title>
      <span class="display-1 font-weight-black orangeText">{{rname}}</span>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="allItems" :search="search">
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
          <v-btn class="mb-2" icon :disabled="item.qty <= 0">
            <v-icon class="green--text">mdi-plus-circle</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: ["menu", "rname"],
  data: () => ({
    search: "",
    headers: [
      { text: "Item Name", align: "start", value: "fname" },
      { text: "Category", value: "category" },
      { text: "Price ($)", value: "price" },
      { text: "Quantity", value: "qty" }
    ]
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
        qty: 0
      }));
      return items;
    }
  }
};
</script>