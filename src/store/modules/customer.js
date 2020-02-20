export default {
    namespaced: true,
    state: {
        hi: "hi"
    },
    getters: {
        sayHi: state => {
            return state.hi;
        }
    },
    mutations: {
    },
    actions: {
    }
}