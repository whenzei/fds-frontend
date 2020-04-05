<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="7">
        <v-card min-height="300">
          <v-card-title class="justify-center orangeText">Welcome {{name}}</v-card-title>
          <v-divider></v-divider>
          <v-row>
            <v-col lg="12">
              <v-container flat>
                <v-card flat>
                  <v-card-title>Account Details</v-card-title>
                  <v-row>
                    <v-col lg="4">
                      <v-text-field
                        outlined
                        label="Points"
                        v-model="points"
                        color="orange"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col lg="6">
                      <v-text-field
                        v-if="creditCard !== null"
                        outlined
                        label="Credit Card"
                        v-model="creditCard"
                        color="orange"
                        disabled
                      ></v-text-field>
                      <v-text-field
                        v-else
                        outlined
                        label="Credit Card"
                        v-model="creditCardInput"
                        counter
                        maxlength="16"
                      ></v-text-field>
                    </v-col>
                    <v-col lg="2">
                      <v-btn
                        small
                        v-if="creditCard === null"
                        color="green darken-3"
                        @click="addCreditCard"
                      >Add</v-btn>
                      <v-btn v-else color="red darken-2" small @click="removeCreditCard">Remove</v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </v-container>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    name: null,
    creditCard: null,
    points: null,
    creditCardInput: null,
    rules: {
      counter: value => value.length <= 20
    }
  }),
  async created() {
    const res = await axios.get("customer/account");
    if (res.status === 200) {
      const data = res.data[0];
      this.name = data.name;
      this.creditCard = data.creditcard;
      this.points = data.points;
    }
  },
  methods: {
    async addCreditCard() {
      const res = await axios.post("customer/add-cc", {
        creditCard: this.creditCardInput
      });
      if (res.status == 200) {
        this.$router.push("/");
      }
    },
    async removeCreditCard() {
      const res = await axios.post("customer/remove-cc");
      if (res.status == 200) {
        this.$router.push("/");
      }
    }
  }
};
</script>