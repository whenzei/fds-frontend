const axios = require('axios')
const RiderTypes = {
    fullTime: "Full Timer",
    partTime: "Part Timer"
}


const postScheduleUpdate = async function (payload) {
    return await axios.post("/rider/update-schedule", payload)
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
    postScheduleUpdate, getShifts, getStartDaysOfMonth, RiderTypes
}