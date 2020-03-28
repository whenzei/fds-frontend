import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '@/components/Landing'
import Customer from '@/components/Customer/Customer'
import CustomerBrowse from '@/components/Customer/Browse'
import Rider from '@/components/Rider/Rider'
import Staff from '@/components/Staff/Staff'
import ViewSummary from '@/components/Staff/ViewSummary'
import AddPromotion from '@/components/Staff/AddPromotion'
import Manager from '@/components/Manager/Manager'
import ErrorLanding from '@/components/ErrorLanding'
import store from '../store'

Vue.use(VueRouter);

const navGuard = function(to, from, next, role) {
    if (store.getters.role != role) {
        router.push({ name: 'ErrorLanding' })
    }
    else { next() }
}

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
            beforeEnter: (to, from, next) => navGuard(to, from, next, 'Customer')
        },
        {
            path: '/customer/browse',
            component: CustomerBrowse,
            beforeEnter: (to, from, next) => navGuard(to, from, next, 'Customer')
        },
        {
            path: '/staff',
            name: 'Staff',
            component: Staff,
            beforeEnter: (to, from, next) => navGuard(to, from, next, 'Staff')
        },
        {
            path: '/staff/view-summary',
            component: ViewSummary,
            beforeEnter: (to, from, next) => navGuard(to, from, next, 'Staff')
        },
        {
            path: '/staff/add-promo',
            component: AddPromotion,
            beforeEnter: (to, from, next) => navGuard(to, from, next, 'Staff')
        },
        {
            path: '/rider',
            name: 'Rider',
            component: Rider,
            beforeEnter: (to, from, next) => navGuard(to, from, next, 'Rider')
        },
        {
            path: '/manager',
            name: 'Manager',
            component: Manager,
            beforeEnter: (to, from, next) => navGuard(to, from, next, 'Manager')
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'Landing' && !store.getters.isLoggedIn) router.push({ name: 'Landing' })
    else { next() }
})
export default router