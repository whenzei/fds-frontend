<template>
    <div>
        <h2 style="color: orange; padding: 50px 50px"> Rider and Staff data</h2>
        <v-container fluid>
            <div style="width: 90%; margin: 0 auto">

                <v-row align="center">
                    <div style="width: 50em; display: inline-block">
                        <v-col cols="12" sm="6">
                            <v-text-field
                                    v-model="search"
                                    v-on:change="check"
                                    append-icon="mdi-magnify"
                                    label="Search"
                                    single-line
                                    hide-details
                            ></v-text-field>
                        </v-col>
                    </div>
                    <div style="display: inline-block">
                        <v-col class="d-flex" cols="12" sm="6">
                            <v-select :items="roles" label="Year" v-model="selectedRole" v-on:change="fetchAllStaffRiderList()" outlined ></v-select>
                        </v-col>
                    </div>
                </v-row>
                <v-data-table
                        :headers="headers"
                        :items="tableItems"
                        :items-per-page="itemsPerPage"
                        :search="search"
                >
                    <template v-slot:item.actions="{ item }">
                        <v-icon small color="red" @click="deleteUser(item)">mdi-delete</v-icon>
                    </template>
                </v-data-table>
            </div>
        </v-container>
    </div>
</template>

<script>
    const { getAllStaffRider, deleteUser } = require("../../helpers/manager");
    export default {
        data: function() {
            const currRole = "All";
            const headers = [
                { text: "User Id", value: "uid" },
                { text: "Name", filterable: true, value: "name" },
                {text: "Role", value: "role"},
                {text:"Actions", value: "actions", filterable: false}

            ];
            return {
                selectedRole: currRole,
                roles: ["Rider", "Staff", "All"],
                headers: headers,
                userList: [],
                itemsPerPage: 12,
                search: '',
            };
        },
        methods: {
            fetchAllStaffRiderList() {
                getAllStaffRider()
                    .then(
                        userInfo => {
                            this.userList = userInfo;
                            if(this.selectedRole == "All") {
                                return this.userList;
                            } else {
                                let res = this.userList.filter(i => i.role == this.selectedRole);
                                this.userList = res;
                            }
                        })
                    .catch(e => {
                        alert(e);
                    });
            },
            deleteUser(item) {
                const index = this.userList
                    .map(function(x) {
                        return x.uid;
                    })
                    .indexOf(item.uid);
                const isConfirmed = confirm(
                    "Are you sure you want to delete " + item.name + "?"
                );
                if (isConfirmed) {
                    deleteUser(item);
                    this.userList.splice(index, 1);
                }
            }
        },
        created() {
            this.fetchAllStaffRiderList();
        },
        computed: {
            tableItems() {
                return this.userList;
            }
        }
    };
</script>

<style>
</style>