const axios = require('axios')
const RiderTypes = {
    fullTime: "Full Timer",
    partTime: "Part Timer"
}


const postFTScheduleUpdate = async function (payload) {
    return await axios.post("/rider/update-ft-schedule", payload)
}

const postPTScheduleUpdate = async function (year, week, dailySchedules) {
    return await axios.post("/rider/update-pt-schedule", {
        year, week, dailySchedules
    })
}

const getShifts = async function () {
    const res = await axios.get("/rider/shifts")
    return res.data
}

const getStartDaysOfMonth = async function (year, month) {
    const res = await axios.get(`/rider/startDaysOfMonths/${year}/${month}`)
    return res.data
}

module.exports = {
    postPTScheduleUpdate, postFTScheduleUpdate, getShifts, getStartDaysOfMonth, RiderTypes
}