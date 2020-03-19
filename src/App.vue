<template>
  <v-app>
    <CustomerNavBar v-if="role === 'Customer'"/>
    <ManagerNavBar v-else-if="role === 'Manager'"/>
    <RiderNavBar v-else-if="role === 'Rider'"/>
    <StaffNavBar v-else-if="role === 'Staff'"/>
    <NavBar v-else/>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";
import ManagerNavBar from "./components/Manager/NavBar";
import RiderNavBar from "./components/Rider/NavBar";
import StaffNavBar from "./components/Staff/NavBar";
import CustomerNavBar from "./components/Customer/NavBar";

export default {
  name: "App",

  components: {
    NavBar,
    RiderNavBar,
    CustomerNavBar,
    StaffNavBar,
    ManagerNavBar
  },

  data: () => ({
    //
  }),

  computed: {
    role() {
      return this.$store.getters.role;
    }
  }
};
</script>

<style>
  a {
    text-decoration: none;
  }
  .orangeText {
    color: #FB8c00;
  }

  .fix {
    position: relative;
  }
</style>
