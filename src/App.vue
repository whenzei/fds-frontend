<template>
  <v-app>
    <v-app-bar app color="indigo lighten-1" dark>
      <router-link to="/">
        <div class="d-flex align-center">
          <v-icon large class="orange--text text--lighten-3">mdi-bike-fast</v-icon>
          <span class="ml-2 font-weight-medium orange--text text--lighten-3">FDS</span>
        </div>
      </router-link>
    </v-app-bar>

    <v-content>
      <Landing />
    </v-content>
  </v-app>
</template>

<script>
import Landing from "./components/Landing";

export default {
  name: "App",

  components: {
    Landing
  },

  data: () => ({
    //
  }),

  methods: {}
};
</script>

<style>
  a {
    text-decoration: none;
  }
</style>
