import Vue from 'vue'
import Vuex from 'vuex'
import customer from './modules/customer'
import staff from './modules/staff'
import rider from './modules/rider'
import manager from './modules/manager'
import axios from "axios";

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const getDefaultState = () => {
    return {
        name: null,
        role: null,
        token: null,
        isLoggedIn: false
    }
}

export default new Vuex.Store({
    state: getDefaultState,
    getters: {
        name(state) {
            return state.name;
        },
        role(state) {
            return state.role;
        },
        isLoggedIn(state) {
            return state.isLoggedIn;
        }
    },
    mutations: {
        setData(state, data) {
            state.name = data.user.name;
            state.token = data.token;
            state.role = data.user.role;
            state.isLoggedIn = true;
        },
        resetData(state) {
            Object.assign(state, getDefaultState());
        }
    },
    actions: {
        async login({ commit }, payload) {
            try {
                const res = await axios(payload);
                if (res.status == 200 || res.status == 202) {
                    commit('setData', res.data);
                    return res.data.user.role;
                }
            } catch (error) {
                return 401;
            }
        },
        async logout({commit}) {
            commit('resetData');
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