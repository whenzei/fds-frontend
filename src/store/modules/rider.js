
function getEventName(start, end) {
    let temp1 = start.split(" ")[1]
    let temp2 = end.split(" ")[1]
    return temp1 + " - " + temp2;
}
const axios = require('axios')
export default {
    namespaced: true,
    state: {
        timeSlots: []
    },
    getters: {
        timeSlots(state) {
            return state.timeSlots
        }
    },
    mutations: {
        setTimeSlots(state, timeSlots) {
            state.timeSlots = timeSlots
        }
    },
    actions: {
        async fetchTimeSlots({ commit }) {
            let timeSlots = (await axios.get('rider/schedule')).data
            timeSlots = timeSlots.map(x => ({...x, name: getEventName(x.start, x.end)}))
            commit('setTimeSlots', timeSlots)
        }
    }
}