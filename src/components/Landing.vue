<template>
  <v-container>
    <v-row algin="center" justify="center">
      <v-icon size="250" class="orange--text text--darken-1">mdi-bike-fast</v-icon>
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
      <v-btn class="orange darken-1 black--text" title @click="login">Login</v-btn>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  data: () => ({
    username: null,
    password: null
  }),
  methods: {
    async login() {
      const loginURL = process.env.VUE_APP_BACKEND_URL + "/login";
      let res;
      try {
        res = await axios({
          method: "post",
          url: loginURL,
          data: qs.stringify({
            username: this.username,
            password: this.password
          }),
          headers: {
            "content-type": "application/x-www-form-urlencoded;charset=utf-8"
          }
        });
      } catch (error) {
        console.log(error);
        return;
      }
      switch (res.data.role) {
        case "Rider":
          this.loadAndRouteRider(res.data);
          break;
        case "Customer":
          this.loadAndRouteCustomer(res.data);
          break;
        case "Staf":
          this.loadAndRouteStaff(res.data);
          break;
        case "Manager":
          this.loadAndRouteManager(res.data);
          break;
        default:
          break;
      }
    },
    loadAndRouteCustomer(data) {
      this.$store.dispatch('customer/setData', data);
      this.$router.push({ name: "Customer" });
    },
    loadAndRouteRider(data) {
      this.$store.dispatch('rider/setData', data);
      this.$router.push({ name: "Rider" });
    },
    loadAndRouteManager(data) {
      this.$store.dispatch('manager/setData', data);
      this.$router.push({ name: "Manager" });
    },
    loadAndRouteStaff(data) {
      this.$store.dispatch('staff/setData', data);
      this.$router.push({ name: "Staff" });
    }
  }
};
</script>
