<template>
  <v-container fluid>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar dark color="secondary" class="mb-1">
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              outlined
              hide-details
              :items="sortableHeaders"
              prepend-inner-icon="mdi-sort"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="sortDesc" mandatory>
              <v-btn large depressed color="orange" :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn large depressed color="orange" :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col v-for="item in props.items" :key="item.name" cols="12" sm="6" md="4" lg="3">
            <v-card>
              <v-card-title class="subheading font-weight-bold">{{ item["Restaurant"] }}</v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item v-for="(key, index) in filteredKeys" :key="index">
                  <v-list-item-content :class="{ 'blue--text': sortBy === key }">{{ key }}:</v-list-item-content>
                  <v-list-item-content
                    v-if="key in formattedHeaders"
                    class="align-end"
                    :class="{ 'blue--text': sortBy === key }"
                  >{{ formattedHeaders[key](item[key]) }}</v-list-item-content>
                  <v-list-item-content
                    v-else
                    class="align-end"
                    :class="{ 'blue--text': sortBy === key }"
                  >{{ item[key] }}</v-list-item-content>
                </v-list-item>
                <v-list-item class="d-flex justify-center">
                  <v-btn @click="selectOrder(item.oid)" color="orange" dark large>Select</v-btn>
                </v-list-item>
              </v-list>
              <v-row></v-row>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn dark text color="orange" class="ml-2" v-on="on">
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span class="mr-4 grey--text">Page {{ page }} of {{ numberOfPages }}</span>
          <v-btn fab dark color="orange" class="mr-1" @click="formerPage">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab dark color="orange" class="ml-1" @click="nextPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import {
  postOrderSelection,
  getAvailableOrders,
  getCurrentOrder
} from "../../helpers/rider";
import _ from "lodash"
import { formatCurrency, formatDistance } from "../../helpers/format";

export default {
  data() {
    return {
      lng: 0,
      lat: 0,
      itemsPerPageArray: [20, 50, 100],
      search: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 20,
      sortBy: "name",
      headers: [
        "Restaurant",
        "Restaurant Address",
        "Distance To Restaurant",
        "Customer Address",
        "Distance to Customer",
        "Payment Method",
        "Total Price"
      ],
      sortableHeaders: [
        "Restaurant",
        "Distance To Restaurant",
        "Distance to Customer",
        "Total Price"
      ],
      formattedHeaders: {
        "Distance To Restaurant": formatDistance,
        "Distance to Customer": formatDistance,
        "Total Price": formatCurrency
      },
      items: []
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.headers.filter(key => key !== `Restaurant`);
    }
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    selectOrder(oid) {
      postOrderSelection(oid)
        .then(() => {
          this.$router.push({ name: "RiderCurrentOrder" });
        })
        .catch(e => {
          alert(e);
        });
    }
  },
  async created() {
    try {
      const coords = await this.$getLocation();
      this.lng = coords.lng;
      this.lat = coords.lat;
    } catch (e) {
      console.log(e);
      // No location access so use default position
      this.lng = 103.851959;
      this.lat = 1.29027;
    }
    getCurrentOrder(this.lng, this.lat).then(order => {
      console.log(order)
      if (!_.isEmpty(order)) {
        this.$router.push({ name: "RiderCurrentOrder" });
      } else {
        getAvailableOrders(this.lng, this.lat).then(
          availableOrders => (this.items = availableOrders)
        );
      }
    });
  }
};
</script>

<style>
</style>