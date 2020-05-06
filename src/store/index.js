import Vue from 'vue'
import Vuex from 'vuex'
import customer from './modules/customer'
import staff from './modules/staff'
import rider from './modules/rider'
import manager from './modules/manager'
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const getDefaultState = () => {
    return {
        name: null,
        username:null,
        role: null,
        token: null,
        isLoggedIn: false,
        showNavDrawer: false,
    }
}

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        name: null,
        role: null,
        username:null,
        token: null,
        isLoggedIn: false,
        showNavDrawer: false,
    },
    getters: {
        name(state) {
            return state.name;
        },
        role(state) {
            return state.role;
        },
        isLoggedIn(state) {
            return state.isLoggedIn;
        },
        token(state) {
            return state.token;
        },
        showNavDrawer(state) {
            return state.showNavDrawer
        },
        username(state) {
            return state.username;
        }
    },
    mutations: {
        setData(state, data) {
            state.name = data.user.name;
            state.token = data.token;
            state.role = data.user.role;
            state.isLoggedIn = true;
            state.username=data.user.username;
        },
        resetData(state) {
            Object.assign(state, getDefaultState());
        },
        toggleNavDrawer(state) {
            state.showNavDrawer = !state.showNavDrawer;
        },
    },
    actions: {
        async login({ commit }, payload) {
            try {
                const res = await axios(payload);
                if (res.status == 200 || res.status == 202) {
                    commit('setData', res.data);
                    if (res.data.user.role == "Rider") {
                        this.dispatch('rider/fetchRiderType');
                        this.dispatch("rider/fetchRating");
                    } else if (res.data.user.role == "Staff") {
                        await this.dispatch('staff/fetchRestaurantInfo');
                    }
                    return res.data.user.role;
                }
            } catch (error) {
                return 401;
            }
        },
        async logout({ commit }) {
            commit('staff/resetData');
            commit('resetData');
            commit('rider/resetState')
        }
    },
    modules: {
        customer,
        manager,
        rider,
        staff
    },
    strict: debug,
})