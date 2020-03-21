import axios from 'axios';
import store from '../store'

const setUpInterceptors = function() {
    axios.interceptors.request.use(function (config) {
        const token = store.getters.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, function (err) {
        return Promise.reject(err);
    });
}

export {
    setUpInterceptors
}