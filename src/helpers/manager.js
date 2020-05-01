const axios = require('axios')
const getSalarySummary = async function () {
    try {
        const { data } = await axios.get(`/manager/rider/salary-summary/`)
        return data
    }
    catch (e) {
        throw e.response.data
    }
}

const getRiderDeliverySummary = async function () {
    try {
        const { data } = await axios.get(`/manager/rider/order-summary/`)
        return data
    }
    catch (e) {
        throw e.response.data
    }
}


const getRiderRatingSummary = async function () {
    try {
        const { data } = await axios.get(`/manager/rider/rating-summary/`);
        return data
    }
    catch (e) {
        throw e.response.data
    }
}

const getCustomerOrderSummary = async function () {
    try {
        const { data } = await axios.get(`/manager/orders/customer-order-summary/`);
        return data
    }
    catch (e) {
        throw e.response.data
    }
}

const getRestaurantSalesSummary = async function () {
    try {
        const { data } = await axios.get(`/manager/orders/sales-summary/`);
        return data
    }
    catch (e) {
        throw e.response.data
    }
}

const getFDSOrdersSummary = async function () {
    try {
        const { data } = await axios.get(`/manager/orders/orders-summary/`);
        return data
    }
    catch (e) {
        throw e.response.data
    }
};

const signupUser = async function (name, username, Role, rid, password) {
    const user = {
        name:name,
        username:username,
        password:password,
        role: Role,
        rid:rid
    };

    try {
        return (await axios.post(`/signupBusiness/`, {user})).data;
    }
    catch (e) {
        window.alert("User could not be added. Check username or restaurant id")
        throw e.response.data
    }

}


module.exports = {
     getSalarySummary, getRiderDeliverySummary, getRiderRatingSummary, getCustomerOrderSummary, getRestaurantSalesSummary, getFDSOrdersSummary,
    signupUser
}