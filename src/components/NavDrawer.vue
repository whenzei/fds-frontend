<template>
  <v-navigation-drawer
    v-show="isLoggedIn && showNavDrawer"
    :color="color"
    :expand-on-hover="expandOnHover"
    :mini-variant="miniVariant"
    absolute
    dark
    app
    clipped
  >
    <v-list dense nav class="py-0">
      <v-list-item two-line :class="miniVariant && 'px-0'">
        <v-list-item-avatar>
          <img :src="require('@/assets/shigeo.jpg')" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{name}}</v-list-item-title>
          <v-list-item-subtitle>{{role}}</v-list-item-subtitle>
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
    expandOnHover: false,
  }),
  computed: {
    ...mapGetters(["showNavDrawer", "name", "isLoggedIn", "role"]),
    items() {
      if (!this.isLoggedIn) return [];
      else if (this.role == "Rider") {
        return [
          { title: "Shifts", icon: "mdi-calendar-clock", linkTo: "/rider/shifts" },
          { title: "Salary", icon: "mdi-cash-usd-outline", linkTo: "/rider/salary" },
          { title: "Dashboard", icon: "mdi-view-dashboard", linkTo: "/rider/dashboard" },
          { title: "About", icon: "mdi-help-box", linkTo: "/rider/about" },
          { title: "Recent", icon: "mdi-history", linkTo: "/rider/recent" },
        ];
      } else return [];
    }
  },
  methods: {}
};
</script>
