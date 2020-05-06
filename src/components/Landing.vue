<template>
  <v-container>
    <v-row algin="center" justify="center">
      <v-icon size="200" class="orange--text text--darken-1">mdi-bike-fast</v-icon>
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
      <v-alert
        dense
        outlined
        type="error"
        :value="alert"
        max-width="400"
        align="center"
        transition="fade-transition"
      >Login failed, please try again.</v-alert>
    </v-row>
    <v-row align="center" justify="center">
      <v-col lg="4">
        <v-text-field color="orange" v-model="username" label="Username" outlined @keydown.enter="procLogin"></v-text-field>
        <v-text-field color="orange" v-model="password" label="Password" outlined type="password" @keydown.enter="procLogin"></v-text-field>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-btn
        class="orange darken-1 black--text"
        title
        @click="login"
        :disabled="!username||!password"
        v-if="!loading"
      >Login</v-btn>
      <v-progress-circular
      :size="50"
      color="amber"
      indeterminate v-else>
      </v-progress-circular>
    </v-row>
  </v-container>
</template>

<script>
import qs from "qs";

export default {
  data: () => ({
    username: null,
    password: null,
    alert: false,
    loading: false
  }),
  methods: {
    procLogin() {
      if (this.username && this.password) {
        this.login();
      }
    },
    async login() {
      this.loading = true;
      const payload = {
        method: "post",
        url: "login",
        data: qs.stringify({
          username: this.username,
          password: this.password
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      };
      const res = await this.$store.dispatch("login", payload);
      this.loading = false;
      const v = this;
      switch (res) {
        case "Rider":
          this.$router.push({ name: "RiderOrders" });
          break;
        case "Customer":
          this.$router.push({ name: "Customer" });
          break;
        case "Staff":
          this.$router.push({ name: "Staff" });
          break;
        case "Manager":
          this.$router.push({ name: "Manager" });
          break;
        case 401:
          this.alert = true;
          setTimeout(() => {
            v.alert = false;
          }, 3000);
          break;
        default:
          console.log("An error occured");
      }
    }
  },
  created() {
    if (this.$store.getters.isLoggedIn) {
      this.$router.push(this.$store.getters.role)
    }
  }
};
</script>
