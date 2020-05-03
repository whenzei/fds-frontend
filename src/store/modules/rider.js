const axios = require('axios')

const getDefaultState = () => {
    return {
        availableOrdersViewable: false,
        timeSlots: [],
        riderType: null,
        rating: {
            value: 0,
            count: 0
        }
    }
}

import { getRating } from "../../helpers/rider"
export default {
    namespaced: true,
    state: getDefaultState(),
    getters: {
        timeSlots(state) {
            return state.timeSlots
        },
        riderType(state) {
            return state.riderType
        },
        availableOrdersViewable(state) {
            return state.availableOrdersViewable
        },
        rating(state) {
            return state.rating
        }
    },
    mutations: {
        setTimeSlots(state, timeSlots) {
            state.timeSlots = timeSlots
        },
        setRiderType(state, riderType) {
            state.riderType = riderType
        },
        resetState(state) {
            Object.assign(state, getDefaultState())
        },
        setAvailableOrdersViewable(state, viewable) {
            state.availableOrdersViewable = viewable
        },
        setRating(state, value, count) {
            state.rating = {
                value: parseFloat(value), count
            }
        }
    },
    actions: {
        async fetchTimeSlots({ commit }, { startYear, startMonth, endYear, endMonth }) {
            let timeSlots = (await axios.get(`rider/schedule/${startYear}/${startMonth}`)).data
            if (startYear != endYear || startMonth != endMonth) {
                let endTimeSlots = (await axios.get(`rider/schedule/${endYear}/${endMonth}`)).data
                timeSlots = timeSlots.concat(endTimeSlots)
            }
            commit('setTimeSlots', timeSlots)
        },
        async fetchRiderType({ commit }) {
            let riderType = (await axios.get(`rider/rider-type`)).data
            commit('setRiderType', riderType)
        },
        async fetchRating({ commit }) {
            let { value, count } = await getRating();
            commit('setRating', value, count)
        }
    }
}