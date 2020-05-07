import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '@/components/Landing'
import Customer from '@/components/Customer/Customer'
import CustomerBrowse from '@/components/Customer/Browse'
import CustomerOrders from '@/components/Customer/Orders'
import Rider from '@/components/Rider/Rider'
import ViewSummary from '@/components/Staff/ViewSummary'
import ManagePromotion from '@/components/Staff/ManagePromotion'
import ManageMenu from '@/components/Staff/ManageMenu'
import RiderSalary from '@/components/Rider/Salary'
import RiderOrders from '@/components/Rider/Orders'
import RiderCurrentOrder from '@/components/Rider/CurrentOrder'
import RiderUpdatePTSchedule from '@/components/Rider/UpdatePTSchedule'
import RiderUpdateFTSchedule from '@/components/Rider/UpdateFTSchedule'
import RiderSchedule from '@/components/Rider/Schedule'
import RiderSummary from '@/components/Rider/Summary'
import ErrorLanding from '@/components/ErrorLanding'
import store from '../store'
import Signup from '@/components/Manager/Signup'
import ManagerLanding from "../components/Manager/ManagerLanding";
import RiderDeliverySummary from "../components/Manager/RiderDeliverySummary";
import RiderRatingSummary from "../components/Manager/RiderRatingSummary";
import CustomerOrderSummary from "../components/Manager/CustomerOrderSummary";
import FDSSalesSummary from "../components/Manager/FDSSalesSummary";
import FDSOrderSummary from "../components/Manager/FDSOrderSummary";
import UserSignupSummary from "../components/Manager/UserSignupSummary";
import HourlyAreaSummary from "../components/Manager/HourlyAreaSummary";
import RiderSalarySummary from '@/components/Manager/RiderSalarySummary'
import ManageUser from "../components/Manager/ManageUser";
import ManageGlobalPromo from "../components/Manager/ManageGlobalPromo";


Vue.use(VueRouter);

const navGuard = function (to, from, next, role) {
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
            path: '/customer/orders',
            component: CustomerOrders,
            beforeEnter: (to, from, next) => navGuard(to, from, next, 'Customer')
        },
        {
            path: '/staff/manage-menu',
            name: 'Staff',
            component: ManageMenu,
            beforeEnter: (to, from, next) => navGuard(to, from, next, 'Staff')
        },
        {
            path: '/staff/view-summary',
            component: ViewSummary,
            beforeEnter: (to, from, next) => navGuard(to, from, next, 'Staff')
        },
        {
            path: '/staff/manage-promo',
            component: ManagePromotion,
            beforeEnter: (to, from, next) => navGuard(to, from, next, 'Staff')
        },
        {
            path: '/rider',
            name: 'Rider',
            component: Rider,
            beforeEnter: (to, from, next) => navGuard(to, from, next, 'Rider')
        },
        {
            path: '/rider/salary',
            name: 'RiderSalary',
            component: RiderSalary,
            beforeEnter: (to, from, next) => navGuard(to, from, next, 'Rider')
        },
        {
            path: '/rider/orders',
            name: 'RiderOrders',
            component: RiderOrders,
            beforeEnter: (to, from, next) => navGuard(to, from, next, 'Rider')
        },

        {
            path: '/rider/curr',
            name: 'RiderCurrentOrder',
            component: RiderCurrentOrder,
            beforeEnter: (to, from, next) => navGuard(to, from, next, 'Rider')
        },
        {
            path: '/rider/schedule',
            name: 'RiderSchedule',
            component: RiderSchedule,
            beforeEnter: (to, from, next) => navGuard(to, from, next, 'Rider')
        },
        {
            path: '/rider/update-ft-schedule',
            name: 'RiderUpdateFTSchedule',
            component: RiderUpdateFTSchedule,
            beforeEnter: (to, from, next) => navGuard(to, from, next, 'Rider')
        },
        {
            path: '/rider/summary',
            name: 'RiderSummary',
            component: RiderSummary,
            beforeEnter: (to, from, next) => navGuard(to, from, next, 'Rider')
        },
        {
            path: '/rider/update-pt-schedule/:year/:week',
            name: 'RiderUpdatePTSchedule',
            component: RiderUpdatePTSchedule,
            props: true,
            beforeEnter: (to, from, next) => navGuard(to, from, next, 'Rider')
        },
        {
            path: '/manager',
            name: 'Manager',
            component: ManagerLanding,
            beforeEnter: (to, from, next) => navGuard(to, from, next, 'Manager')
        },
        {
            path: '/manager/signup',
            component: Signup,
            beforeEnter: (to, from, next) => navGuard(to, from, next, 'Manager')
        },
        {
            path:'/manager/rider/salary-summary',
            component: RiderSalarySummary,
            beforeEnter: (to, from, next) => navGuard(to, from, next, 'Manager')
        },
        {
            path:'/manager/rider/delivery-summary',
            component: RiderDeliverySummary,
            beforeEnter: (to, from, next) => navGuard(to, from, next, 'Manager')
        },
        {
            path:'/manager/rider/rating-summary',
            component: RiderRatingSummary,
            beforeEnter: (to, from, next) => navGuard(to, from, next, 'Manager')
        },
        {
            path:'/manager/orders/customer-order-summary',
            component: CustomerOrderSummary,
            beforeEnter: (to, from, next) => navGuard(to, from, next, 'Manager')
        },
        {
            path:'/manager/orders/fds-sales-summary',
            component: FDSSalesSummary,
            beforeEnter: (to, from, next) => navGuard(to, from, next, 'Manager')
        },
        {
            path:'/manager/orders/fds-orders-summary',
            component: FDSOrderSummary,
            beforeEnter: (to, from, next) => navGuard(to, from, next, 'Manager')
        },
        {
            path:'/manager/user-signup-summary',
            component: UserSignupSummary,
            beforeEnter: (to, from, next) => navGuard(to, from, next, 'Manager')
        },
        {
            path:'/manager/orders/area-hourly-orders',
            component: HourlyAreaSummary,
            beforeEnter: (to, from, next) => navGuard(to, from, next, 'Manager')
        },
        {
            path:'/manager/manage-global-promotions',
            component: ManageGlobalPromo,
            beforeEnter: (to, from, next) => navGuard(to, from, next, 'Manager')
        },
        {
            path:'/manager/all-staff-rider',
            component: ManageUser,
            beforeEnter: (to, from, next) => navGuard(to, from, next, 'Manager')
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'Landing' && !store.getters.isLoggedIn) router.push({ name: 'Landing' })
    else { next() }
})
export default router