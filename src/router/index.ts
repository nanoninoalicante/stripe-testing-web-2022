import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/subscription',
      name: 'subscription',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SubscriptionView.vue')
    },
    {
      path: '/standard',
      name: 'standard',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/StandardPaymentView.vue')
    },
    {
      path: '/charge-customer',
      name: 'charge-customer',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ChargeACustomersDefaultPaymentView.vue')
    },
    {
      path: '/hold',
      name: 'hold',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/HoldPaymentView.vue')
    },
    {
      path: '/hold/payment',
      name: 'hold-payment',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/HoldPaymentProcessView.vue')
    },
    {
      path: '/hold/confirm',
      name: 'hold-confirm',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ConfirmHoldIntentView.vue')
    },
    {
      path: '/hold/confirm/:intent',
      name: 'hold-confirm-with-intent',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ConfirmHoldIntentView.vue')
    },
    {
      path: '/standard/payment',
      name: 'standard-payment',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PaymentView.vue')
    },
    {
      path: '/subscription/payment',
      name: 'subscription-payment',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SubPaymentView.vue')
    }
  ]
})

export default router
