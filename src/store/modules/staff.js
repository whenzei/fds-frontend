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
        async rid({ commit }, payload) {
            try {
                const res = await axios(payload);
                if (res.status == 200 || res.status == 304) {
                    commit('setRid', res.data);
                }
            } catch (error) {
                return 404;
            }
        },
    }
}