import axios from 'axios';

export default {
    namespaced: true,
    state: {
        rid: null,
        rname: ''
    },
    getters: {
        rid(state) {
            return state.rid;
        },
        restaurantName(state) {
            return state.rname;
        }
    },
    mutations: {
        setRid(state, data) {
            state.rid = data.rid;
        },
        setRestaurantName(state, data) {
            state.rname = data.rname;
        },
        resetData(state) {
            state.rid = null;
            state.rname = null;
        }
    },
    actions: {
        async fetchRestaurantInfo({ commit }) {
            try {
                const res = await axios.get('/staff/get-restaurant-info/');
                if (res.status == 200 || res.status == 304) {
                    commit('setRid', res.data);
                    commit('setRestaurantName', res.data);
                }
            } catch (error) {
                return 404;
            }
        },
    }
}