<template>
  <v-app>
    <NavDrawer />
    <CustomerNavBar v-if="role === 'Customer'" />
    <ManagerNavBar v-else-if="role === 'Manager'" />
    <StaffNavBar v-else-if="role === 'Staff'" />
    <NavBar v-else />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";
import ManagerNavBar from "./components/Manager/NavBar";
import StaffNavBar from "./components/Staff/NavBar";
import CustomerNavBar from "./components/Customer/NavBar";
import NavDrawer from "./components/NavDrawer";

export default {
  name: "App",

  components: {
    NavBar,
    CustomerNavBar,
    StaffNavBar,
    ManagerNavBar,
    NavDrawer
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
  color: #fb8c00;
}

.fix {
  position: relative;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
