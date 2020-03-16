import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '@/components/Landing'
import Customer from '@/components/Customer'
import Rider from '@/components/Rider'
import Staff from '@/components/Staff'
import Manager from '@/components/Manager'

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Landing',
            component: Landing,
        },
        {
            path: '/customer',
            name: 'Customer',
            component: Customer,
        },
        {
            path: '/staff',
            name: 'Staff',
            component: Staff,
        },
        {
            path: '/rider',
            name: 'Rider',
            component: Rider,
        },
        {
            path: '/manager',
            name: 'Manager',
            component: Manager,
        }
    ]
})