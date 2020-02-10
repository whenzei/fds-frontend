<template>
  <v-container>
    <v-row algin="center" justify="center">
      <v-icon size="300" class="orange--text text--lighten-1 pa-5 mt-3">mdi-bike-fast</v-icon>
    </v-row>
    <v-row align="center" justify="center">
      <v-col lg="12">
        <v-card flat>
          <v-card-text class="text-center display-2">
            Welcome To
            <span class="font-weight-black orange--text text--darken-2">FDS</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col lg="4">
        <v-select outlined :items="users" label="Select User Type" color="orange"></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Landing",

  data: () => ({
    users: ["Customer", "Rider", "Restaurant Staff", "FDS Manager"]
  })
};
</script>
