import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '@/components/Landing'
import Customer from '@/components/Customer'
import Rider from '@/components/Rider'
import Staff from '@/components/Staff'
import Manager from '@/components/Manager'
import ErrorLanding from '@/components/ErrorLanding'
import store from '../store'

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/err',
            name: 'ErrorLanding',
            component: ErrorLanding,
        },
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
            beforeEnter: (to, from, next) => {
                if (store.getters.role != 'Manager') {
                    router.push({ name: 'ErrorLanding' })
                }
                else { next() }
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'Landing' && !store.getters.isLoggedIn) router.push({ name: 'Landing' })
    else { next() }
})
export default router