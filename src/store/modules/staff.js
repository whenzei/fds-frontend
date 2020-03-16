export default {
    namespaced: true,
    state: {
        name: null
    },
    getters: {
        name (state) {
            return state.name;
        }
    },
    mutations: {
        setData(state, data) {
            state.name = data.name;
        }
    },
    actions: {
        setData({commit}, data) {
            commit('setData', data);
        }
    }
}