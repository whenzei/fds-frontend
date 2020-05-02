<template>
  <v-navigation-drawer
    :value="showNavDrawer"
    :color="color"
    :expand-on-hover="expandOnHover"
    :mini-variant="miniVariant"
    absolute
    dark
    app
    clipped
  >
    <v-list dense nav class="py-0">
      <v-list-item two-line :class="miniVariant && 'px-0'" v-if="isLoggedIn">
        <v-list-item-avatar>
          <img :src="require('@/assets/shigeo.jpg')" />
        </v-list-item-avatar>

        <v-list-item-content :v-if="isLoggedIn">
          <v-list-item-title>{{name}}</v-list-item-title>
          <v-list-item-subtitle>{{role}}</v-list-item-subtitle>
          <v-rating v-if="role === 'Rider'" half-increments x-small readonly :value="rating.value"></v-rating>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item v-for="item in items" :key="item.title" link :to="item.linkTo">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    drawer: true,
    color: "secondary",
    right: true,
    miniVariant: false,
    expandOnHover: false
  }),
  computed: {
    ...mapGetters(["showNavDrawer", "name", "isLoggedIn", "role"]),
    ...mapGetters({ rating: "rider/rating" }),
    items() {
      if (!this.isLoggedIn) return [];
      else if (this.role == "Rider") {
        return [
          { title: "Orders", icon: "mdi-cart", linkTo: "/rider/orders" },
          {
            title: "Schedule",
            icon: "mdi-calendar-clock",
            linkTo: "/rider/schedule"
          },
          {
            title: "Salary",
            icon: "mdi-cash-usd-outline",
            linkTo: "/rider/salary"
          },
          { title: "Summary", icon: "mdi-history", linkTo: "/rider/summary" }
        ];
      } else return [];
    }
  },
  methods: {}
};
</script>
