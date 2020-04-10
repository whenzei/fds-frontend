<template>
  <v-container>
    <v-data-table :headers="foodHeaders" :items="foodList" class="elevation-1">
      <template v-slot:top>
        <v-toolbar color="black orange--text text--darken-2" flat>
          <v-card>
            <v-toolbar-title color="orange darken-2">Restaurant Menu</v-toolbar-title>
          </v-card>
          <v-card-text>
            (Min. spending: {{ getCurrMinSpend }})
            <v-dialog v-model="minSpendDialog" max-width="550px">
              <template v-slot:activator="{ on }">
                <v-btn color="orange darken-2" fab x-small dark v-on="on">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="justify-center">
                  <span class="headline-2">Minimum Spending for Restaurant (SGD)</span>
                </v-card-title>
                <v-card-text class="text-center">Current minimum spending: {{ getCurrMinSpend }}</v-card-text>
                <v-form
                  onsubmit="return false;"
                  v-model="validFormMinSpend"
                  lazy-validation
                >
                  <v-card-text>
                    <v-row justify="center" align="start">
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          required
                          prefix="S$"
                          :rules="rules.minSpend"
                          v-model="minSpend"
                          color="orange darken-3"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions class="justify-center">
                    <v-spacer></v-spacer>
                    <v-btn color="orange darken-1" text @click="closeMinSpend">Cancel</v-btn>
                    <v-btn
                      :disabled="!validFormMinSpend"
                      color="orange darken-1"
                      text
                      @click="saveMinSpend"
                    >Save</v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-dialog>
          </v-card-text>

          <v-col cols="3" md="3">
            <v-row justify="end">
              <v-btn color="orange darken-2" dark class="mb-2" @click="getFoodList">Refresh</v-btn>
            </v-row>
          </v-col>

          <v-dialog v-model="itemDialog" max-width="700px">
            <template v-slot:activator="{ on }">
              <v-col cols="4" md="2">
                <v-row justify="end">
                  <v-btn color="orange darken-2" dark class="mb-2" v-on="on">New Item</v-btn>
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
                        <v-text-field
                          required
                          :rules="rules.fname"
                          counter="100"
                          v-model="editedItem.fname"
                          color="orange darken-3"
                          label="Name of Food Item"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          required
                          prefix="S$"
                          :rules="rules.price"
                          v-model="editedItem.price"
                          color="orange darken-3"
                          label="Price (SGD)"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          required
                          v-model="editedItem.category"
                          :rules="rules.categories"
                          :items="categories"
                          color="orange darken-3"
                          label="Category"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          required
                          :rules="rules.dailyLimit"
                          v-model="editedItem.dailylimit"
                          color="orange darken-3"
                          label="Daily Limit"
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
    <v-snackbar color="success" v-model="successAdd" :timeout="1200">Item is added.</v-snackbar>
    <v-snackbar color="success" v-model="successEdit" :timeout="1200">Item is updated.</v-snackbar>
    <v-snackbar color="success" v-model="successDelete" :timeout="1200">Item is deleted.</v-snackbar>
    <v-snackbar color="success" v-model="successMinSpend" :timeout="1200">Minimum spending updated.</v-snackbar>
    <v-snackbar color="error" v-model="error" :timeout="1200">Oops! An error occurred.</v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    rid: null,
    foodList: [],
    categories: [],
    validFormMinSpend: false,
    minSpendDialog: false,
    currMinSpend: null,
    minSpend: 0,
    validForm: true,
    menu: false,
    itemDialog: false,
    successAdd: false,
    successEdit: false,
    successDelete: false,
    successMinSpend: false,
    error: false,
    editedIndex: -1,
    editedItem: {
      fname: "",
      price: null,
      category: null,
      dailylimit: null,
      numorders: 0
    },
    defaultItem: {
      fname: "",
      price: null,
      category: null,
      dailylimit: null,
      numorders: 0
    },
    foodHeaders: [
      { text: "Name", sortable: true, value: "fname" },
      { text: "Price (SGD)", sortable: true, value: "price" },
      { text: "Category", sortable: true, value: "category" },
      { text: "Daily Limit", sortable: true, value: "dailylimit" },
      { text: "Number of Orders", sortable: true, value: "numorders" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    rules: {
      minSpend: [
        num => {
          const pattern = /^\d{1,6}(\.\d{1,2})?$/;
          return (
            pattern.test(num) ||
            "Min. spending must be in the form xx.xx e.g. 3.00"
          );
        },
        num => num > 0 || "Min. spending must be a positive value"
      ],
      fname: [
        v => v.length > 0 || "Name of food item is required",
        v =>
          (v && v.length <= 100) ||
          "Name of food item must not be more than 100 characters"
      ],
      price: [
        num => {
          const pattern = /^\d{1,6}(\.\d{1,2})?$/;
          return (
            pattern.test(num) || "Price must be in the form xx.xx e.g. 3.00"
          );
        },
        num => num > 0 || "Price must be a positive value"
      ],
      categories: [v => v != null || "Category is required"],
      dailyLimit: [
        num => {
          const pattern = /^\d+$/;
          return pattern.test(num) || "Daily limit must be an integer";
        },
        num => num > 0 || "Daily limit must be a positive integer"
      ]
    }
  }),
  methods: {
    async getFoodList() {
      const res = await axios.get(`/staff/food/${this.rid}`);
      let items = [];
      if (res.status == 200) {
        res.data.forEach(item => {
          item.price = (item.price / 100).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
          items.push(item);
        });
        this.foodList = items;
      }
    },
    async getCategories() {
      const res = await axios.get("/staff/cuisine/");
      if (res.status == 200) {
        let items = [];
        res.data.forEach(item => {
          items.push(item.unnest);
        });
        this.categories = items;
      }
    },
    async insertIntoDatabase(item) {
      const params = { item: item };
      const res = await axios.post(`/staff/add-food-item/`, params);
      if (res.status == 200) {
        this.successAdd = true;
        return res.data;
      } else {
        this.fail = true;
      }
    },
    async updateDatabase(fname, item) {
      const params = { fname: fname, item: item };
      const res = await axios.post(`/staff/edit-food-item/`, params);
      if (res.status == 200) {
        this.successEdit = true;
        return res.data;
      } else {
        this.fail = true;
      }
    },
    async deleteFromDatabase(fname) {
      const params = { data: { fname: fname } };
      const res = await axios.delete(`/staff/delete-food-item/`, params);
      if (res.status == 200) {
        this.successDelete = true;
        return res.data;
      } else {
        this.fail = true;
      }
    },
    editItem(item) {
      this.editedIndex = this.foodList
        .map(function(x) {
          return x.fname;
        })
        .indexOf(item.fname);
      this.editedItem = Object.assign({}, item);
      this.itemDialog = true;
    },
    async deleteItem(item) {
      const index = this.foodList
        .map(function(x) {
          return x.fname;
        })
        .indexOf(item.fname);
      const isConfirmed = confirm(
        "Are you sure you want to delete this food item?"
      );
      if (isConfirmed) {
        await this.deleteFromDatabase(this.foodList[index].fname);
        this.foodList.splice(index, 1);
      }
    },
    close() {
      this.itemDialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    async save() {
      this.editedItem.dailylimit = parseInt(this.editedItem.dailylimit);
      if (this.editedIndex > -1) {
        await this.updateDatabase(
          this.foodList[this.editedIndex].fname,
          this.editedItem
        );
        this.editedItem.price = (
          Math.round(this.editedItem.price * 100) / 100
        ).toFixed(2);
        Object.assign(this.foodList[this.editedIndex], this.editedItem);
      } else {
        await this.insertIntoDatabase(this.editedItem);
        this.editedItem.minspending = (
          Math.round(this.editedItem.price * 100) / 100
        ).toFixed(2);
        this.foodList.push(this.editedItem);
      }
      this.close();
    },
    async getMinSpend() {
      const res = await axios.get(`/staff/min-spending/${this.rid}`);
      this.currMinSpend = res.data.minspending;
      this.minSpend = this.currMinSpend;
    },
    closeMinSpend() {
      this.minSpendDialog = false;
    },
    async updateMinSpend() {
      const params = { minspending: this.minSpend };
      const res = await axios.post(`/staff/update-minspending`, params);
      if (res.status == 200) {
        this.successMinSpend = true;
        return true;
      }
      this.error = true;
      return false;
    },
    async saveMinSpend() {
      const isSuccess = this.updateMinSpend();
      if (isSuccess) {
        this.minSpend = (Math.round(this.minSpend * 100) / 100).toFixed(2);
        this.currMinSpend = this.minSpend;
      }
      this.closeMinSpend();
    }
  },
  watch: {
    itemDialog(val) {
      val || this.close();
    },
    minSpendDialog(val) {
      val || this.closeMinSpend();
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    getCurrMinSpend() {
      return (Math.round(this.currMinSpend * 100) / 100).toLocaleString(
        "en-SG",
        {
          style: "currency",
          currency: "SGD"
        }
      );
    }
  },
  async created() {
    this.rid = this.$store.getters["staff/rid"];
    this.getFoodList();
    this.getCategories();
    this.getMinSpend();
  }
};
</script>