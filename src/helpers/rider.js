const axios = require('axios')
const RiderTypes = {
    fullTime: "Full Timer",
    partTime: "Part Timer"
}
const orderStatuses = {
    toRest: "Moving to restaurant",
    waiting: "Waiting for order",
    toCust: "Moving to customer"
}

const postFTScheduleUpdate = async function (payload) {
    try {
        return await axios.post("/rider/update-ft-schedule", payload)
    }
    catch (e) {
        throw e.response.data
    }
}

const postPTScheduleUpdate = async function (year, week, dailySchedules) {

    try {
        return await axios.post("/rider/update-pt-schedule", {
            year, week, dailySchedules
        })
    }
    catch (e) {
        throw e.response.data
    }
}

const getShifts = async function () {
    const res = await axios.get("/rider/shifts")
    return res.data
}

const getStartDaysOfMonth = async function (year, month) {
    const res = await axios.get(`/rider/startDaysOfMonths/${year}/${month}`)
    return res.data
}

const getAvailableOrders = async function (lng, lat) {
    const res = await axios.get(`/rider/available-orders/${lng}/${lat}`)
    return res.data
}

const getCurrentOrder = async function (lng, lat) {
    const res = await axios.get(`rider/current-order/${lng}/${lat}`)
    return res.data
}

const postOrderSelection = async function (oid) {
    try {
        return await axios.post("/rider/select-order", { oid })
    }
    catch (e) {
        throw e.response.data
    }
}

const postOrderStatusUpdate = async function (oid, currStatus) {
    try {
        return await axios.post("/rider/update-order-status", {
            oid,
            currStatus
        })
    }
    catch (e) {
        throw e.response.data
    }
}

const getSalaryInfo = async function (year) {
    try {
        const { data } = await axios.get(`/rider/salary/${year}`)
        return data
    }
    catch (e) {
        throw e.response.data
    }
}

const getSummaryInfo = async function (year) {
    try {
        const { data } = await axios.get(`/rider/summary/${year}`)
        return data
    }
    catch (e) {
        console.log(e)
        throw e.response.data
    }
}

const getRating = async function () {
    try {
        const { data } = await axios.get(`/rider/rating`)
        return data
    }
    catch (e) {
        throw e.response.data
    }
}

const postClearPTSchedule = async function (year, week) {
    try {
        return await axios.post("/rider/clear-pt-schedule", {
            year,
            week
        })
    }
    catch (e) {
        throw e.response.data
    }
}

const postClearFTSchedule = async function (year, month) {
    try {
        return await axios.post("/rider/clear-ft-schedule", {
            year,
            month
        })
    }
    catch (e) {
        console.log(e.response.data)
        throw e.response.data
    }
}

module.exports = {
    postPTScheduleUpdate, postFTScheduleUpdate, getShifts, getStartDaysOfMonth, RiderTypes, getAvailableOrders, getCurrentOrder, postOrderSelection, postOrderStatusUpdate, orderStatuses,
    getSalaryInfo, getRating, getSummaryInfo, postClearPTSchedule, postClearFTSchedule
}