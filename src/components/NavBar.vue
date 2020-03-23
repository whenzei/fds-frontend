<template>
  <v-app-bar app color="black" dark clipped-left>
    <v-app-bar-nav-icon @click.stop="toggleNavDrawer" />
    <router-link to="/">
      <div class="d-flex align-center">
        <v-icon large class="orange--text text--darken-1">mdi-bike-fast</v-icon>
        <span class="ml-2 orangeText">FDS</span>
      </div>
    </router-link>
    <v-spacer></v-spacer>
    <v-btn outlined color="orange" @click="signup">signup</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
  }),
  computed: {
    checkLoginStatus() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    signup() {
      this.$router.push('/');
    },
    toggleNavDrawer() {
      this.$store.commit('toggleNavDrawer')
    }
  }
};
</script>
