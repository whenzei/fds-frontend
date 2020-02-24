<template>
    <v-container>
        <v-toolbar class="transparent" align="center" justify="center">
            <v-col>
                <v-btn @click="addPromotion" class="grey darken-3"> Add promotion </v-btn>
            </v-col>

            <v-col>
                <v-btn @click="updateRestStaff" class="grey darken-3"> Add/delete restaurant and staff </v-btn>
            </v-col>

            <v-col>
                <v-btn @click="addDeleteRider" class="grey darken-3"> Add/Delete rider </v-btn>
            </v-col>

            <v-col>
                <v-btn @click="viewSummary" class="grey darken-3"> View summary </v-btn>
            </v-col>
        </v-toolbar>

            <v-container>
                <div v-show="showSummary"><ViewSummary /></div>
                <div v-show="showPromo"><AddPromotion /></div>
                
            </v-container>
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
    data: () => ({
        showSummary: false,
        showPromo: false
    }),
    methods: {
        addPromotion() {
            this.showPromo = true;
            this.showSummary = false;
        },
        updateRestStaff() {
            // this.showSummary = "Update restaurant and staff";
        },
        addDeleteRider() {
            // this.showSummary = "Add/delete rider";
        },
        viewSummary() {
            this.showSummary = true;
            this.showPromo = false;
        },
    }
    
}
</script>