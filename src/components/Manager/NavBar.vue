<template>
  <v-app-bar app color="black" dark>
    <router-link to="/">
      <div class="d-flex align-center">
        <v-icon large class="orange--text text--darken-1">mdi-bike-fast</v-icon>
        <span class="ml-2 orangeText">FDS</span>
      </div>
    </router-link>
    <v-spacer></v-spacer>
    <v-btn outlined color="orange" @click="logout">Logout</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
  }),
  computed: {
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout');
      this.$router.push('/');
    }
  }
};
</script>
