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
              @click="getMenu(restaurant.rid, restaurant.rname)"
              v-for="restaurant in restaurants"
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
        <Menu v-if="menu" :menu="menu" :rname="rname" :rid="rid" :key="rid"/>
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
    rid: null,
  }),
  methods: {
    async getMenu(rid, rname) {
      const res = await axios.get(
        `/customer/restaurants/${rid}`,
        this.tokenConfig()
      );
      this.menu = res.data;
      this.rname = rname;
      this.rid = rid;
    },
    tokenConfig() {
      return {
        headers: { Authorization: `bearer ${this.$store.getters.token}` }
      };
    }
  },
  async created() {
    const res = await axios.get("/customer/restaurants", this.tokenConfig());
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