<template>
  <v-app-bar app clipped-left color="black" dark>
        <v-app-bar-nav-icon @click.stop="toggleNavDrawer" />

    <router-link to="/">
      <div class="d-flex align-center">
        <v-icon large class="orange--text text--darken-1">mdi-bike-fast</v-icon>
        <span class="ml-2 orangeText">FDS</span>
      </div>
    </router-link>
    <router-link to="/customer/browse">
      <v-btn class="ml-10 orange--text text--darken-1" outlined>Browse</v-btn>
    </router-link>
    <router-link to="/customer/orders">
      <v-btn class="ml-5 orange--text text--darken-1" outlined>Orders</v-btn>
    </router-link>
    <v-spacer></v-spacer>
    <v-btn outlined color="orange" @click="logout">Logout</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({}),
  computed: {},
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/");
    },
    toggleNavDrawer() {
      this.$store.commit('toggleNavDrawer')
    }
  }
};
</script>
