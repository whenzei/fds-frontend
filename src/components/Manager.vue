<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col lg="11 ">
        <v-toolbar color="black orange--text text--darken-2 font-weight-black" dark>
          <v-toolbar-title>Manager Workspace</v-toolbar-title>
        </v-toolbar>
        <v-tabs vertical color="orange darken-2" left>
          <v-tab>Add/delete restaurant and staff</v-tab>
          <v-tab>Add/Delete rider</v-tab>
          <v-tab>Add Promotion</v-tab>
          <v-tab>View Summary</v-tab>
          <v-tab-item>
            <v-card-text>Tab 1</v-card-text>
          </v-tab-item>
          <v-tab-item>
            <v-card-text>Tab 2</v-card-text>
          </v-tab-item>
          <v-tab-item>
            <AddPromotion />
          </v-tab-item>
          <v-tab-item>
            <ViewSummary />
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ViewSummary from "./Manager/ViewSummary";
import AddPromotion from "./Manager/AddPromotion";

export default {
  components: {
    ViewSummary,
    AddPromotion
  },
  data: () => ({})
};
</script>