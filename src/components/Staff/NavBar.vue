<template>
  <v-app-bar app color="black" dark>
    <router-link to="/">
      <div class="d-flex align-center">
        <v-icon large class="orange--text text--darken-1">mdi-bike-fast</v-icon>
        <span class="ml-2 orangeText">FDS</span>
      </div>
    </router-link>
    <router-link to="/staff/manage-menu">
      <v-btn class="ml-10 orange--text text--darken-1" outlined>Manage Menu</v-btn>
    </router-link>
    <router-link to="/staff/manage-promo">
      <v-btn class="ml-10 orange--text text--darken-1" outlined>Manage Promotions</v-btn>
    </router-link>
    <router-link to="/staff/view-summary">
      <v-btn class="ml-10 orange--text text--darken-1" outlined>View Summary</v-btn>
    </router-link>
    <v-spacer></v-spacer>
    <v-card-text class=text-end>{{ staffName }} ({{ rname }})</v-card-text>
    <v-btn outlined color="orange" @click="logout">Logout</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    rname: null,
    staffName: null
  }),
  computed: {},
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/");
    }
  },
  created() {
    console.log(this.$store.getters["staff/restaurantName"])
    this.rname = this.$store.getters["staff/restaurantName"];
    this.staffName = this.$store.getters.name;
  }
};
</script>
