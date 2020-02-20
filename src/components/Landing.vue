<template>
  <v-container>
    <v-row algin="center" justify="center">
      <v-icon size="250" class="orange--text text--lighten-1">mdi-bike-fast</v-icon>
    </v-row>
    <v-row align="center" justify="center">
      <v-col lg="12">
        <div class="text-center display-2">
          Welcome To
          <span class="font-weight-black orange--text text--darken-1">MEALHUB</span>
        </div>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col lg="4">
        <v-text-field color="orange" v-model="username" label="Username" outlined></v-text-field>
        <v-text-field color="orange" v-model="password" label="Password" outlined type="password"></v-text-field>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-btn class="orange darken-2" title>Login</v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Landing",
  data: () => ({
    username: null,
    password: null
  }),
  created() {
    console.log(this.$store.getters["customer/sayHi"]);
  }
};
</script>
