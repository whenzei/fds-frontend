const axios = require('axios')

const postScheduleUpdate = async function (payload) {
    return await axios.post("/rider/update-schedule", payload)
}

module.exports = {
    postScheduleUpdate
}