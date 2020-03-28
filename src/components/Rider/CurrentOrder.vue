<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="orange" dark flat>
                <v-toolbar-title>Delivery to {{cUsername}}</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text></v-card-text>
              <v-list>
                <v-list-item>
                  Restaurant:
                  <v-spacer />
                  {{rname}}
                </v-list-item>
                <v-list-item>
                  Restaurant Address:
                  <v-spacer />
                  {{rAddress}}
                </v-list-item>
                <v-list-item>
                  Distance To Restaurant:
                  <v-spacer />
                  {{rDist}}
                </v-list-item>
                <v-list-item>
                  Customer Address:
                  <v-spacer />
                  {{cAddress}}
                </v-list-item>
                <v-list-item>
                  Distance To Customer:
                  <v-spacer />
                  {{cDist}}
                </v-list-item>
              </v-list>
              <v-card-actions>
                <v-spacer />
                <v-btn color="orange">Pick Up Food</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: function() {
    return {
      rname: "Mumbo Landfood",
      rAddress: "Jalan Bahar",
      rDist: 5000,
      cAddress: "Clementi Street 51",
      cDist: 2000,
      paymentMethod: "Credit",
      finalPrice: 30000,
      deliveryFee: 2000,
      cUsername: "zhow"
    };
  },
  props: {
    source: String
  }
};
</script>