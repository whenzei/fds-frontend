<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{on}">
      <div
        class="ml-2 mt-1 subtitle-1 review"
        v-on="on"
      >({{reviews!=null && reviewsLength > 0 ? reviewsLength: 'No '}} reviews)</div>
    </template>
    <v-card class="grey darken-4">
      <v-card-title class="display-1 orangeText">Reviews for {{rname}}</v-card-title>
      <v-card-text>
        <v-list class="grey darken-3">
          <v-list-item three-line v-for="(review, index) in reviews" :key="index">
            <v-list-item-content>
              <v-list-item-title>
                <v-rating
                  v-model="review.stars"
                  color="orange accent"
                  background-color="grey darken-1"
                  empty-icon="$ratingFull"
                  hover
                  dense
                  small
                  readonly
                ></v-rating>
              </v-list-item-title>
              <v-list-item-subtitle>{{review.date}}</v-list-item-subtitle>
              <v-list-item-subtitle class="mt-2">"{{review.comment}}"</v-list-item-subtitle>
              <v-divider class="mt-2"></v-divider>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  props: ["rid", "rname"],
  data() {
    return {
      dialog: false,
      reviewsLength: 0,
      reviews: null
    };
  },
  async created() {
    const res = await axios(`/customer/restaurant-reviews/${this.rid}`);
    let reviews = res.data;
    this.reviewsLength = reviews.length
    if (reviews.length > 50) {
      this.reviews = reviews.slice(0, 50);
    } else {
      this.reviews = reviews;
    }
  }
};
</script>
<style scoped>
.review:hover {
  color: orange;
}
.review {
  cursor: pointer;
}
</style>