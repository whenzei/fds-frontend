<template>
  <v-dialog v-model="rate" width="500">
    <template v-slot:activator="{ on: dialog }">
      <v-tooltip right color="teal">
        <template v-slot:activator="{ on: tooltip }">
          <v-btn color="teal" dark v-on="{...tooltip, ...dialog}" small fab>
            <v-icon>mdi-star-face</v-icon>
          </v-btn>
        </template>
        <span class="ml-1 white--text">Rate rider</span>
      </v-tooltip>
    </template>
    <v-card class="black">
      <v-container>
        <v-row justify="center" class="headline">
          <div class="ma-2">Please give your rating for Rider</div>
        </v-row>
        <v-row justify="center">
          <v-rating
            v-model="stars"
            color="teal lighten-1"
            background-color="grey darken-1"
            empty-icon="$ratingFull"
            hover
          ></v-rating>
        </v-row>
        <v-row justify="center">
          <v-btn color="teal" @click="submit">Submit</v-btn>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  props: ['oid'],
  data() {
    return {
      rate: false,
      stars: 3
    };
  },
  methods: {
    async submit() {
      this.rate = false;
      try {
        await axios.post("/customer/rate-rider", {
          stars: this.stars,
          oid: this.oid
        });
      } catch (error) {
        return;
      }
      this.$emit("rated");
    }
  }
};
</script>