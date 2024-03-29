import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/subscription-payment-link",
            name: "subscription-payment-link",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/SubPaymentLink.vue"),
        },
        {
            path: "/one-time-payment-link",
            name: "one-time-payment-link",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/OneTimePaymentLink.vue"),
        },
        {
            path: "/subscription",
            name: "subscription",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/SubscriptionView.vue"),
        },
        {
            path: "/standard",
            name: "standard",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/StandardPaymentView.vue"),
        },
        {
            path: "/standard/payment",
            name: "standard-payment",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/PaymentView.vue"),
        },
        {
            path: "/standard-on-behalf-of",
            name: "standard-on-behalf-of",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import("../views/OnBehalfOfConnectedPaymentView.vue"),
        },
        {
            path: "/standard-on-behalf-of/payment",
            name: "standard-on-behalf-of-payment",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import("../views/OnBehalfOfConnectedPaymentProcess.vue"),
        },
        {
            path: "/charge-customer",
            name: "charge-customer",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import("../views/ChargeACustomersDefaultPaymentView.vue"),
        },
        {
            path: "/connect-onboard",
            name: "connect-onboard",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/ConnectOnboardingView.vue"),
        },
        {
            path: "/hold",
            name: "hold",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/HoldPaymentView.vue"),
        },
        {
            path: "/hold/payment",
            name: "hold-payment",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/HoldPaymentProcessView.vue"),
        },
        {
            path: "/hold/confirm",
            name: "hold-confirm",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/ConfirmHoldIntentView.vue"),
        },
        {
            path: "/hold/confirm/:intent",
            name: "hold-confirm-with-intent",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/ConfirmHoldIntentView.vue"),
        },
        {
            path: "/subscription/payment",
            name: "subscription-payment",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/SubPaymentView.vue"),
        },
        {
            path: "/standard-with-client-secret",
            name: "standard-payment-with-client-secret",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/PaymentViewWithClientSecret.vue"),
        },
    ],
});

export default router;
