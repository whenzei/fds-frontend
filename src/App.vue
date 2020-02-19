<template>
  <v-app>
    <NavBar/>

    <v-content>
      <Landing/>
    </v-content>
  </v-app>
</template>

<script>
import Landing from "./components/Landing";
import NavBar from "./components/NavBar";

export default {
  name: "App",

  components: {
    Landing,
    NavBar
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
