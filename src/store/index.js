import Vue from 'vue'
import Vuex from 'vuex'
import customer from './modules/customer'
import staff from './modules/staff'
import rider from './modules/rider'
import manager from './modules/manager'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        customer,
        manager,
        rider,
        staff
    },
    strict: debug,
})