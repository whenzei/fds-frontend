<template>
    <v-container>
        <h2 style="color: orange; padding: 50px 50px"> Manage Restaurants</h2>
        <v-data-table :headers="restaurantHeaders" :items="restList" class="elevation-1">
            <template v-slot:top>
                <v-toolbar color="black orange--text text--darken-2" flat>
                    <v-toolbar-title color="orange darken-2">Restaurant</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-col cols="4" md="1">
                        <v-row justify="end">
                            <v-btn color="orange darken-2" dark class="mb-2" @click="getRestaurants" >
                                <v-icon>mdi-refresh</v-icon>
                            </v-btn>
                        </v-row>
                    </v-col>

                    <v-dialog v-model="dialog" max-width="700px">
                        <template v-slot:activator="{ on }">
                            <v-col cols="4" md="1">
                                <v-row justify="end">
                                    <v-btn
                                            color="orange darken-2"
                                            dark
                                            class="mb-2"
                                            v-on="on"
                                    >
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
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
                                                        v-model="editedItem.rname"
                                                        color="orange darken-3"
                                                        label="Restaurant Name"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                        required
                                                        prefix="S$"
                                                        :rules="rules.minSpend"
                                                        v-model="editedItem.minspending"
                                                        color="orange darken-3"
                                                        label="Minimum Spend (SGD)"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                        v-if="editedIndex == -1"
                                                        required
                                                        v-model="editedItem.addrid"
                                                        color="orange darken-3"
                                                        label="Address Id"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="orange darken-1" text @click="close">Cancel</v-btn>
                                    <v-btn :disabled="!validForm" color="orange darken-1" text @click="save()">Save</v-btn>
                                </v-card-actions>
                            </v-form>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" color="yellow" @click="editItem(item)">mdi-pencil</v-icon>
                <v-icon small color="red" @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
        </v-data-table>
        <v-snackbar color="success" v-model="successAdd" :timeout="1200">Restaurant is added.</v-snackbar>
        <v-snackbar color="success" v-model="successEdit" :timeout="1200">Restaurant is updated.</v-snackbar>
        <v-snackbar color="success" v-model="successDelete" :timeout="1200">Restaurant is deleted.</v-snackbar>
        <v-snackbar color="error" v-model="error" :timeout="1200">Oops! An error occurred.</v-snackbar>
    </v-container>
</template>

<script>
    import axios from "axios";
    export default {
        data: () => ({
            rid: null,
            restList: [],
            dialog: false,
            editedIndex: -1,
            menu: false,
            successAdd: false,
            successEdit: false,
            successDelete: false,
            error: false,
            validForm: true,
            editedItem: {
                rid: null,
                rname: null,
                minspending: null,
                addrid: null
            },
            defaultItem: {
                rid: null,
                rname: null,
                minspending: null,
                addrid: null
            },
            restaurantHeaders: [
                { text: "Restaurant ID", sortable: true, value: "rid" },
                { text: "Name", sortable: true, value: "rname" },
                { text: "Minimum Spending", sortable: true, value: "minspending" },
                { text: "Address", sortable: true, value: "streetname"},
                { text: "Postal Code", sortable: true, value: "postalcode"},

                { text: "Actions", value: "actions", sortable: false }
            ],
            rules: {
                minSpend: [
                    num => {
                        const pattern = /^\d{1,6}(\.\d{1,2})?$/;
                        return (
                            pattern.test(num) ||
                            "Minimum spending must be a non-negative value in the form xx.xx e.g. 3.00"
                        );
                    }
                ]
            }
        }),
        methods: {
            async getRestaurants() {
                const res = await axios.get(`/manager/get-restaurants/`);
                if (res.status == 200 || res.status == 304) {
                    res.data.forEach(item => {
                        item.minspending = (item.minspending / 100).toLocaleString(
                            undefined,
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }
                        );
                    })
                    this.restList = res.data;
                }
            },
            async insertIntoDatabase(item) {
                const params = { restaurant: item };
                const res = await axios.post(`/manager/add-restaurant/`, params);
                if (res.status == 200) {
                    this.successAdd = true;
                    return res.data;
                } else {
                    this.error = true;
                }
            },
            async updateDatabase(item) {
                const params = { restaurant:item };
                const res = await axios.post(`/manager/update-restaurant/`, params);
                if (res.status == 200) {
                    this.successEdit = true;
                    return res.data;
                } else {
                    this.error = true;
                }
            },
            async deleteFromDatabase(rid) {
                const res = await axios.post('/manager/delete-restaurant/'+ rid);
                if (res.status == 200) {
                    this.successDelete = true;
                    return res.data;
                } else {
                    this.error = true;
                }
            },
            editItem(item) {
                this.editedIndex = this.restList
                    .map(function(x) {
                        return x.pid;
                    })
                    .indexOf(item.pid);
                this.editedItem = Object.assign({}, item);
                this.dialog = true;
            },

            async deleteItem(item) {
                const index = this.restList
                    .map(function(x) {
                        return x.rid;
                    })
                    .indexOf(item.rid);
                const isConfirmed = confirm(
                    "Are you sure you want to delete this restaurant?"
                );
                if (isConfirmed) {
                    await this.deleteFromDatabase(item.rid);
                    this.restList.splice(index, 1);
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
                if (this.editedIndex > -1) {
                    await this.updateDatabase(this.editedItem);
                    this.editedItem.minspending = (
                        Math.round(this.editedItem.minspending * 100) / 100
                    ).toFixed(2);
                } else {
                    const newPid = await this.insertIntoDatabase(this.editedItem);
                    this.editedItem.rid = newPid;
                    this.restList.push(this.editedItem);
                }
                this.getRestaurants();
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
            }
        },
        async created() {
            this.getRestaurants();
        }
    };
</script>