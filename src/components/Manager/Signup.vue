<template>
    <div>
    <div style="width:50%; position:absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
        <h2 style="color: orange; padding: 50px 50px; text-align: center"> Sign up Page</h2>

        <v-container cols="12" sm="6">
    <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            width="200"

    >
        <v-text-field
                color="orange"
                v-model="name"
                :counter="20"
                :rules="nameRules"
                label="Name"
                required

        ></v-text-field>

        <v-text-field
                color="orange"
                v-model="username"
                label="Username"
                required
        ></v-text-field>

        <v-select
                color="orange"
                v-model="currRole"
                :items="items"
                :rules="[v => !!v || 'Select a role']"
                label="Role"
                v-on:change="checkRole"
                required
        ></v-select>
        <v-text-field color="orange" v-model="rid" label="Restaurant ID" v-if="isStaff"></v-text-field>
        <v-text-field color="orange" v-model="password" label="Password" type="password"></v-text-field>

        <div style="align-content: center; ">
        <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="validate"
        >
            Sign Up
        </v-btn>

        <v-btn
                color="error"
                class="mr-4"
                @click="reset"
        >
            Reset Form
        </v-btn>
        </div>
    </v-form>
    </v-container>
    </div>
    </div>
</template>

<script>
    const { signupUser } = require("../../helpers/manager");
    export default {
        data: () => ({
            valid: true,
            name: '',
            username: '',
            password: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 20) || 'Name must be less than 20 characters',
            ],
            items: [
                'Rider',
                'Staff',
            ],
            currRole: null,
            checkbox: false,
            isStaff:false,
            rid: null,
        }),

        methods: {
            async validate () {
                let res = await signupUser(this.name, this.username, this.currRole, this.rid, this.password)
                window.alert(res);
                    this.$refs.form.reset()
            },
            reset () {
                this.$refs.form.reset()
            },
            checkRole() {
                this.isStaff = this.currRole == 'Staff'
                return this.isStaff
            }
        },
    }
</script>