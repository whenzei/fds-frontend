
function formatDate(a, withTime) {
    return withTime
        ? `${a.getFullYear()}-${a.getMonth() +
        1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
        : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`;
}

function getEventName(start, end) {
    let temp1 = start.getHours()
    temp1 = (temp1 > 9 ? "" : "0") + temp1 + "00hr"
    let temp2 = end.getHours()
    temp2 = (temp2 > 9 ? "" : "0") + temp2 + "00hr"
    return temp1 + " - " + temp2;
}
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
        fetchTimeSlots({ commit }) {
            const colors = [
                "blue",
                "indigo",
                "deep-purple",
                "cyan",
                "green",
                "orange",
                "grey darken-1"
            ]
            const first = new Date();
            const second = new Date();
            second.setTime(first.getTime() + 1000 * 60 * 60 * 8)
            const timeSlots = [
                {
                    name: getEventName(first, second),
                    start: formatDate(first, true),
                    color: colors[0],
                    end: formatDate(second, true),
                }
            ];
            commit('setTimeSlots', timeSlots)
        }
    }
}