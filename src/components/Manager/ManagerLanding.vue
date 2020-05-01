<template>
    <div class="page">
        <div class="split left">
            <div class="profile">
                <v-card
                        class="mx-auto"
                        max-width="434"
                        tile
                >
                    <v-img
                            height="100%"
                            src="data:image/jpeg;base64,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"
                    >
                        <v-row
                                align="end"
                                class="fill-height"
                        >
                            <v-col
                                    align-self="start"
                                    class="pa-0"
                                    cols="12"
                            >
                                <v-avatar
                                        class="profile"
                                        color="grey"
                                        size="164"
                                        tile
                                >
                                    <v-img src="https://i0.wp.com/w.media/wp-content/uploads/2018/01/placeholderhead.jpg"></v-img>
                                </v-avatar>
                            </v-col>
                            <v-col class="py-0">
                                <v-list-item
                                        color="rgba(0, 0, 0, .4)"
                                        dark
                                >
                                    <v-list-item-content>
                                        <v-list-item-title class="title">{{name}}</v-list-item-title>
                                        <v-list-item-subtitle>{{username}} </v-list-item-subtitle>
                                        <v-list-item-subtitle class="subtitle-2">{{role}}</v-list-item-subtitle>

                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                        </v-row>
                    </v-img>
                </v-card>
            </div>
        </div>
        <div class="split right">
            <v-card
                    class="mx-auto card-tile"
                    max-width="344"
                    shape
                    elevation=12

            >

                <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Signup User</v-list-item-title>
                        <v-list-item-subtitle>Add staff or rider</v-list-item-subtitle>
                    </v-list-item-content>

                </v-list-item>

                <v-card-actions>
                    <router-link to="/manager/signup">
                        <v-btn text>Add user</v-btn>
                    </router-link>
                </v-card-actions>
            </v-card>

            <v-card
                    class="mx-auto card-tile"
                    max-width="344"
                    shape
                    elevation=12

            >

                <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Customer Orders Summary</v-list-item-title>
                        <v-list-item-subtitle>Details about customer and their orders</v-list-item-subtitle>
                    </v-list-item-content>

                </v-list-item>

                <v-card-actions>
                    <router-link to="/manager/orders/customer-order-summary">
                        <v-btn text>View Summary</v-btn>
                    </router-link>
                </v-card-actions>
            </v-card>

            <v-card
                    class="mx-auto card-tile"
                    max-width="344"
                    shape
                    elevation=12
            >
                <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Order Summary</v-list-item-title>
                        <v-list-item-subtitle>Details about all the orders placed on FDS</v-list-item-subtitle>
                    </v-list-item-content>

                </v-list-item>

                <v-card-actions>
                    <router-link to="/manager/orders/fds-orders-summary">
                        <v-btn text>View Summary</v-btn>
                    </router-link>
                </v-card-actions>
            </v-card>

            <v-card
                    class="mx-auto card-tile"
                    max-width="344"
                    shape
                    elevation=12

            >

                <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Most popular areas</v-list-item-title>
                        <v-list-item-subtitle>Details about hourly orders from different areas <up></up></v-list-item-subtitle>
                    </v-list-item-content>

                </v-list-item>

                <v-card-actions>
                    <router-link to="/manager/orders/area-hourly-orders">
                        <v-btn text>View Summary</v-btn>
                    </router-link>
                </v-card-actions>
            </v-card>

            <v-card
                    class="mx-auto card-tile"
                    max-width="344"
                    shape
                    elevation=12

            >

                <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">User Signup statistics</v-list-item-title>
                        <v-list-item-subtitle>Details about monthly user sign ups <up></up></v-list-item-subtitle>
                    </v-list-item-content>

                </v-list-item>

                <v-card-actions>
                    <router-link to="/manager/user-signup-summary">
                        <v-btn text>View Summary</v-btn>
                    </router-link>
                </v-card-actions>
            </v-card>


            <v-card
                    class="mx-auto card-tile"
                    max-width="344"
                    shape
                    elevation=12

            >

                <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Sales Summary</v-list-item-title>
                        <v-list-item-subtitle>Details about FDS sales</v-list-item-subtitle>
                    </v-list-item-content>

                </v-list-item>

                <v-card-actions>
                    <router-link to="/manager/orders/fds-sales-summary">
                        <v-btn text>View Summary</v-btn>
                    </router-link>
                </v-card-actions>
            </v-card>

            <v-card
                    class="mx-auto card-tile"
                    max-width="344"
                    shape
                    elevation=12

            >

                <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Rider Delivery Summary</v-list-item-title>
                        <v-list-item-subtitle>Details about the deliveries done by riders</v-list-item-subtitle>
                    </v-list-item-content>

                </v-list-item>

                <v-card-actions>
                    <router-link to="/manager/rider/delivery-summary">
                        <v-btn text>View Summary</v-btn>
                    </router-link>
                </v-card-actions>
            </v-card>

            <v-card
                    class="mx-auto card-tile"
                    max-width="344px"
                    shape
                    elevation=12

            >

                <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Rider Salary Summary</v-list-item-title>
                        <v-list-item-subtitle>Displays sales summary</v-list-item-subtitle>
                    </v-list-item-content>

                </v-list-item>

                <v-card-actions>
                    <router-link to="/manager/rider/salary-summary">
                        <v-btn text>View summary</v-btn>
                    </router-link>
                </v-card-actions>
            </v-card>

            <v-card
                    class="mx-auto card-tile"
                    max-width="344px"
                    shape
                    elevation=12

            >

                <v-list-item three-line>
                    <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Rider Rating Summary</v-list-item-title>
                        <v-list-item-subtitle>Displays Rider's ratings</v-list-item-subtitle>
                    </v-list-item-content>

                </v-list-item>

                <v-card-actions>
                    <router-link to="/manager/rider/rating-summary">
                        <v-btn text>View summary</v-btn>
                    </router-link>
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            name: null,
            role: null,
            username:null,
        }),
        created() {
            this.name = this.$store.getters.name;
            this.role = this.$store.getters.role;
            this.username = this.$store.getters.username;
        }
    };
</script>

<style scoped>
    .split {
        height: 100%;
        position: fixed;
        z-index: 1;
        overflow-x: hidden;
    }

    .left {
        left: 0;
        width: 25%;
        background-color: #150e0e;
    }

    .right {
        right: 0;
        width: 75%;
        background-color: #0e0c0e;
        padding-bottom: 100px;
    }

    .card-tile {
        display: inline-block;
        margin-top: 2em;
        margin-left: 5em !important;
        width:344px;
        align-content: center;
        border-radius: 15px !important;

    }

    .page {
        height: 100%;
        width: 100%;
    }
</style>