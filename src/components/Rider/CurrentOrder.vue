<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar :color="statuses[statusIdx].color" dark flat>
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
            <v-btn
              :color="statuses[statusIdx].color"
              @click="handleButtonClick"
            >{{statuses[statusIdx].statusText}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
      cUsername: "zhow",
      statuses: [
        { statusText: "Arrive at Restaurant", color: "error" },
        { statusText: "Depart from Restaurant", color: "warning" },
        { statusText: "Complete Delivery", color: "success" }
      ],
      statusIdx: 0
    };
  },
  props: {
    source: String
  },
  methods: {
    handleButtonClick() {
      if (this.statusIdx < this.statuses.length - 1) this.statusIdx += 1;
    }
  }
};
</script>