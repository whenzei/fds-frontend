<template>
  <v-container>
    <v-row>
      <v-col lg="3">
        <v-card>
          <v-toolbar class="black">
            <v-toolbar-title>Restaurants</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn class="black" @click="getRestaurants" small>
              <v-icon class="orange--text">mdi-refresh</v-icon>
            </v-btn>
            <v-btn :class="isSearch ? 'gray':'black'" @click="isSearch = (!isSearch)" small>
              <v-icon class="orange--text">mdi-magnify</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card flat v-if="isSearch" class="grey darken-4">
            <div class="ml-4 mt-4 white--text">Filter by food name or restaurant name</div>
            <v-row class="justify-center ml-3">
              <v-col lg="8">
                <v-text-field color="orange" v-model="search" outlined></v-text-field>
              </v-col>
              <v-col lg="4">
                <v-btn
                  color="orange darken-2"
                  @click="filterSearch"
                  :disabled="!search"
                  x-small
                >Apply</v-btn>
              </v-col>
            </v-row>
            <v-divider></v-divider>
          </v-card>
          <v-list style="max-height: 800px" class="overflow-y-auto">
            <v-list-item
              @click="getMenu(restaurant)"
              v-for="restaurant in restaurants"
              :restaurant="restaurant"
              :key="restaurant.rid"
            >
              <v-list-item-content>
                <v-list-item-title v-text="restaurant.rname"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col lg="9">
        <Menu
          v-if="menu"
          :menu="menu"
          :rname="rname"
          :key="rname"
          :minSpending="minSpending"
          :rid="rid"
        />
        <v-card v-else>
          <v-card-title>
            <v-icon>mdi-arrow-left-bold</v-icon>
            <span class="white--text">Start browsing restaurants to order.</span>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
import Menu from "./Menu";

export default {
  data: () => ({
    restaurants: [],
    menu: null,
    rname: "",
    minSpending: null,
    rid: null,
    isSearch: false,
    search: ""
  }),
  methods: {
    async getMenu(restaurant) {
      const res = await axios.get(`/customer/restaurants/${restaurant.rid}`);
      if (res.status == 200) {
        this.menu = res.data;
        this.rname = restaurant.rname;
        this.minSpending = restaurant.minspending;
        this.rid = restaurant.rid;
      }
    },
    async getRestaurants() {
      const res = await axios.get("/customer/restaurants");
      if (res.status == 200) {
        this.restaurants = res.data;
      }
    },
    async filterSearch() {
      const res = await axios.get(
        `/customer/restaurants/search=${this.search}`
      );
      if (res.status == 200) {
        this.restaurants = res.data;
      }
    }
  },
  async created() {
    this.getRestaurants();
  },
  components: {
    Menu
  }
};
</script>
<style scoped>
* {
  color: #fb8c00;
}
.selected {
  background-color: gray;
}
</style>