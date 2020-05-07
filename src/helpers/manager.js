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
        return (await axios.post(`/signupBusiness/`, {user}));
    }
    catch (e) {
        return e.response;
    }

};

const getUserSignUpSummary = async function () {
    try {
        const { data } = await axios.get(`/manager/customer-signup-summary/`);
        return data
    }
    catch (e) {
        throw e.response.data
    }
};

const getHourlyAreaOrdersSummary = async function () {
    try {
        const {data} = await axios.get(`/manager/orders/area-order-summary/`);
        return data
    } catch (e) {
        throw e.response.data;
    }
};

const getAllStaffRider = async function () {
    try {
        const {data} = await axios.get(`/manager/all-staff-rider/`);
        return data
    } catch (e) {
        throw e.response.data;
    }
};

const deleteUser = async function (user) {
    const body = {
        name:user.name,
        uid:user.uid,
        role: user.role,
    };
    try {
        return (await axios.post(`/manager/delete-user`, body));
    }
    catch (e) {
        return e.response;
    }

};


module.exports = {
     getSalarySummary, getRiderDeliverySummary, getRiderRatingSummary, getCustomerOrderSummary, getRestaurantSalesSummary, getFDSOrdersSummary,
    signupUser, getUserSignUpSummary, getHourlyAreaOrdersSummary, getAllStaffRider, deleteUser
}