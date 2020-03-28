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
              solo-inverted
              hide-details
              :items="sortableHeaders"
              prepend-inner-icon="mdi-magnify"
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
                    class="align-end"
                    :class="{ 'blue--text': sortBy === key }"
                  >{{ item[key] }}</v-list-item-content>
                </v-list-item>
              </v-list>
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
export default {
  data() {
    return {
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
        "Final Price"
      ],
      sortableHeaders: [
        "Distance To Restaurant",
        "Distance to Customer",
        "Final Price"
      ],
      items: [
        {
          Restaurant: "Bagnonald",
          "Restaurant Address": "Jalan Bahar",
          "Distance To Restaurant": 10,
          "Customer Address": "Choa Chu Kang",
          "Distance to Customer": 100,
          "Payment Method": "Cash",
          "Final Price": 1000
        },
        {
          Restaurant: "WaCnonald",
          "Restaurant Address": "Jalan Besar",
          "Distance To Restaurant": 100,
          "Customer Address": "Yio Chu Kang",
          "Distance to Customer": 1000,
          "Payment Method": "Credit",
          "Final Price": 5000
        },
        {
          Restaurant: "Donald Telur",
          "Restaurant Address": "Jalan Bakar",
          "Distance To Restaurant": 1110,
          "Customer Address": "Lim Chu Kang",
          "Distance to Customer": 99,
          "Payment Method": "Cash",
          "Final Price": 123
        },
        {
          Restaurant: "Caff C",
          "Restaurant Address": "Jalan Baba",
          "Distance To Restaurant": 9999,
          "Customer Address": "Phua Chu Kang",
          "Distance to Customer": 919,
          "Payment Method": "Credit",
          "Final Price": 1231
        }
      ]
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
    }
  }
};
</script>

<style>
</style>