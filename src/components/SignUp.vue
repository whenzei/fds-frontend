<template>
  <div>
    <v-dialog v-model="dialog" max-width="500">
      <template v-slot:activator="{on}">
        <v-btn dark v-on="on" outlined color="orange">Sign Up</v-btn>
      </template>
      <v-card min-height="400">
        <v-card-title class="justify-center display-1 orangeText">Customer Sign Up</v-card-title>
        <v-container>
          <v-row class="justify-center">
            <v-col lg="8">
              <v-text-field label="Name" color="orange" outlined v-model="name"></v-text-field>
            </v-col>
            <v-col lg="8">
              <v-text-field label="Username" color="orange" outlined v-model="username"></v-text-field>
            </v-col>
            <v-col lg="8">
              <v-text-field label="Password" color="orange" outlined v-model="password"></v-text-field>
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
            >Registration failed, please try again.</v-alert>
          </v-row>
          <v-row class="justify-center">
            <v-btn color="orange darken-3" :disabled="!isReady()" @click="submit">Submit</v-btn>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="successSnack" :timeout="3000" color="orange darken-3" center bottom>Sign Up Success</v-snackbar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    name: "",
    username: "",
    password: "",
    alert: false,
    dialog: false,
    successSnack: false
  }),
  methods: {
    reset() {
      this.name = "";
      this.username = "";
      this.password = "";
      this.alert = false;
      this.dialog = false;
    },
    isReady() {
      return (
        this.name.length > 0 &&
        this.username.length > 0 &&
        this.password.length > 0
      );
    },
    async submit() {
      const customer = {
        name: this.name,
        username: this.username,
        password: this.password
      };
      try {
        const res = await axios.post("/customer-signup", customer);
        if (res.status != 200) {
          this.alert = true;
          const v = this;
          setTimeout(() => {
            v.alert = false;
          }, 3000);
        } else {
          this.reset();
          this.successSnack = true;
        }
      } catch (error) {
        this.alert = true;
        const v = this;
        setTimeout(() => {
          v.alert = false;
        }, 3000);
      }
    }
  }
};
</script>