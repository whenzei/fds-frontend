<template>
  <v-container>
    <v-data-table :headers="promoHeaders" :items="promoList" class="elevation-1">
      <template v-slot:top>
        <v-toolbar color="black orange--text text--darken-2" flat>
          <v-toolbar-title color="orange darken-2">Promotions</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-col cols="4" md="3">
            <v-row justify="end">
              <v-btn color="orange darken-2" dark class="mb-2" @click="getPromos">Refresh</v-btn>
            </v-row>
          </v-col>

          <v-dialog v-model="dialog" max-width="700px">
            <template v-slot:activator="{ on }">
              <v-col cols="4" md="2">
                <v-row justify="end">
                  <v-btn
                    color="orange darken-2"
                    dark
                    class="mb-2"
                    @click="resetDates"
                    v-on="on"
                  >New Item</v-btn>
                </v-row>
              </v-col>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-form ref="form" v-model="validForm" lazy-validation>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              required
                              :rules="rules.dates"
                              v-model="computedDateFormatted"
                              label="Choose start and end date"
                              readonly
                              v-on="on"
                              color="orange darken-3"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="rangeDates"
                            color="orange darken-4"
                            no-title
                            range
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.menu.save(rangeDates)">OK</v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          required
                          :rules="rules.points"
                          v-model="editedItem.points"
                          color="orange darken-3"
                          label="Points"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          required
                          :rules="rules.percent"
                          v-model="editedItem.percentoff"
                          color="orange darken-3"
                          label="Percent Off (%)"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          required
                          prefix="$"
                          :rules="rules.minSpend"
                          v-model="editedItem.minspending"
                          color="orange darken-3"
                          label="Minimum Spend (SGD)"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          required
                          :rules="rules.monthsWithNoOrders"
                          v-model="editedItem.monthswithnoorders"
                          color="orange darken-3"
                          label="Months With No Orders"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="orange darken-1" text @click="close">Cancel</v-btn>
                  <v-btn :disabled="!validForm" color="orange darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    rid: null,
    promoList: [],
    dialog: false,
    editedIndex: -1,
    rangeDates: [],
    menu: false,
    dateToday: null,
    validForm: true,
    editedItem: {
      pid: null,
      startdate: null,
      enddate: null,
      points: 0,
      percentoff: 0,
      minspending: 0,
      monthswithnoorders: 0
    },
    defaultItem: {
      pid: null,
      startdate: null,
      enddate: null,
      points: 0,
      percentoff: 0,
      minspending: 0,
      monthswithnoorders: 0
    },
    promoHeaders: [
      { text: "Promo ID", sortable: true, value: "pid" },
      { text: "Start Date", sortable: true, value: "startdate" },
      { text: "End Date", sortable: true, value: "enddate" },
      { text: "Points", sortable: true, value: "points" },
      { text: "Percent Off (%)", sortable: true, value: "percentoff" },
      { text: "Minimum Spend (SGD)", sortable: true, value: "minspending" },
      {
        text: "Months With No Orders",
        sortable: true,
        value: "monthswithnoorders"
      },
      { text: "Actions", value: "actions", sortable: false }
    ],
    rules: {
      points: [
        num => {
          const pattern = /^\d+$/;
          return pattern.test(num) || "Points must be an integer";
        },
        num => num >= 0 || "Points must be a non-negative integer"
      ],
      percent: [
        num => {
          const pattern = /^\d+$/;
          return pattern.test(num) || "Percent off must be an integer";
        },
        num =>
          (num >= 0 && num <= 100) || "Percent off must be between 0 to 100"
      ],
      minSpend: [
        num => {
          const pattern = /^\d{1,6}(\.\d{1,2})?$/;
          return (
            pattern.test(num) ||
            "Minimum spending must be a non-negative value in the form xx.xx e.g. 3.00"
          );
        }
      ],
      monthsWithNoOrders: [
        num => {
          const pattern = /^\d+$/;
          return pattern.test(num) || "Value must be an integer";
        },
        num => num >= 0 || "Value must be a non-negative integer"
      ],
      dates: [
        v => !!v || "Required",
        v => {
          const arr = v.split(" ~ ");
          return (
            new Date(arr[0]) <= new Date(arr[1]) ||
            "Start date must be earlier or equal to end date"
          );
        }
      ]
    }
  }),
  methods: {
    async getPromos() {
      const res = await axios.get(`/staff/promos/${this.rid}`);
      let items = [];
      if (res.status == 200 || res.status == 304) {
        res.data.forEach(item => {
          item.startdate = new Date(item.startdate).toISOString().substr(0, 10);
          item.enddate = new Date(item.enddate).toISOString().substr(0, 10);
          item.minspending = (item.minspending / 100).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }
          );
          items.push(item);
        });
      }
      this.promoList = items;
    },
    resetDates() {
      this.rangeDates = [this.dateToday, this.dateToday];
    },
    async insertIntoDatabase(item) {
      const params = { item: item };
      const res = await axios.post(`/staff/add-promos/`, params);
      if (res.status == 200) {
        return res.data;
        // TODO: create status alert
        //   success = true;
      }
    },
    async updateDatabase(item) {
      const params = { item };
      const res = await axios.post(`/staff/edit-promos/`, params);
      if (res.status == 200) {
        return res.data;
        // TODO: create status alert
        //   success = true;
      }
    },
    async deleteFromDatabase(pid) {
      const params = { data: { pid: pid } };
      const res = await axios.delete(`/staff/delete-promos/`, params);
      if (res.status == 200) {
        return res.data;
        // TODO: create status alert
        //   success = true;
      }
    },
    editItem(item) {
      this.editedIndex = this.promoList
        .map(function(x) {
          return x.pid;
        })
        .indexOf(item.pid);
      this.editedItem = Object.assign({}, item);
      this.rangeDates = [this.editedItem.startdate, this.editedItem.enddate];
      this.dialog = true;
    },

    async deleteItem(item) {
      const index = this.promoList
        .map(function(x) {
          return x.pid;
        })
        .indexOf(item.pid);
      const isConfirmed = confirm(
        "Are you sure you want to delete this promotion?"
      );
      if (isConfirmed) {
        await this.deleteFromDatabase(this.promoList[index].pid);
        this.promoList.splice(index, 1);
      }
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    async save() {
      this.editedItem.startdate = this.rangeDates[0];
      this.editedItem.enddate = this.rangeDates[1];
      this.editedItem.points = parseInt(this.editedItem.points);
      this.editedItem.percentoff = parseInt(this.editedItem.percentoff);
      this.editedItem.monthswithnoorders = parseInt(
        this.editedItem.monthswithnoorders
      );
      if (this.editedIndex > -1) {
        await this.updateDatabase(this.editedItem);
        this.editedItem.minspending = (
          Math.round(this.editedItem.minspending * 100) / 100
        ).toFixed(2);
        Object.assign(this.promoList[this.editedIndex], this.editedItem);
      } else {
        const newPid = await this.insertIntoDatabase(this.editedItem);
        this.editedItem.minspending = (
          Math.round(this.editedItem.minspending * 100) / 100
        ).toFixed(2);
        this.editedItem.pid = newPid;
        this.promoList.push(this.editedItem);
      }
      this.close();
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    computedDateFormatted() {
      return this.rangeDates.join(" ~ ");
    }
  },
  async created() {
    this.rid = this.$store.getters["staff/rid"];
    const date = new Date();
    this.dateToday = date.toISOString().substr(0, 10);
    this.rangeDates = [this.dateToday, this.dateToday];
    this.getPromos();
  }
};
</script>