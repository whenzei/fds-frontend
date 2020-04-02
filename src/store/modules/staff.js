import axios from 'axios';

export default {
    namespaced: true,
    state: {
        rid: null
    },
    getters: {
        rid(state) {
            return state.rid;
        }
    },
    mutations: {
        setRid(state, data) {
            state.rid = data.rid;
        }
    },
    actions: {
        async fetchRid({ commit }) {
            try {
                const res = await axios.get('/staff/get-rid/');
                if (res.status == 200 || res.status == 304) {
                    commit('setRid', res.data);
                }
            } catch (error) {
                return 404;
            }
        },
    }
}