<template>
  <v-container>
    <v-row>
      <v-col lg="3">
        <v-card>
          <v-toolbar class="black">
            <v-toolbar-title>Restaurants</v-toolbar-title>
          </v-toolbar>
          <v-list>
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
        <Menu v-if="menu" :menu="menu" :rname="rname" :key="rname" :minSpending="minSpending"/>
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
  }),
  methods: {
    async getMenu(restaurant) {
      const res = await axios.get(`/customer/restaurants/${restaurant.rid}`);
      this.menu = res.data;
      this.rname = restaurant.rname;
      this.minSpending = restaurant.minspending * 100;
    }
  },
  async created() {
    const res = await axios.get("/customer/restaurants");
    this.restaurants = res.data;
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
</style>