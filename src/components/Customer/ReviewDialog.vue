<template>
  <v-dialog v-model="review" width="500">
    <template v-slot:activator="{ on: dialog }">
      <v-tooltip right color="pink">
        <template v-slot:activator="{ on: tooltip }">
          <v-btn color="pink lighten-1" dark v-on="{...tooltip, ...dialog}" small fab>
            <v-icon>mdi-message-draw</v-icon>
          </v-btn>
        </template>
        <span class="ml-1 white--text">Review food</span>
      </v-tooltip>
    </template>
    <v-card class="black">
      <v-container>
        <v-row justify="center" class="headline">
          <div class="ma-2">
            Please give your review for
            <span class="ml-1 font-weight-black">{{restaurant}}</span>
          </div>
        </v-row>
        <v-row justify="center">
          <v-rating
            v-model="stars"
            color="red lighten-1"
            background-color="grey darken-1"
            empty-icon="$ratingFull"
            hover
          ></v-rating>
        </v-row>
        <v-row>
          <v-textarea class="ma-4" outlined color="red lighten-2" v-model="comment"></v-textarea>
        </v-row>
        <v-row justify="center">
          <v-btn color="red lighten-1" @click="submit">Submit</v-btn>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  props: ["restaurant", "oid"],
  data() {
    return {
      review: false,
      comment: "",
      stars: 3
    };
  },
  methods: {
    async submit() {
      try {
        this.review = false;
        const res = await axios.post("/customer/review-food", {
          comment: this.comment,
          stars: this.stars,
          oid: this.oid
        });
        if (res.status == 200) {
          this.$emit("reviewed");
        } else {
          alert("An error has occured");
        }
      } catch (error) {
        alert("An error has occured");
      }
    }
  }
};
</script>