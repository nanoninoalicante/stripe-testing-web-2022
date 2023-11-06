<script setup>
import { useAlertsStore } from "@/stores/alerts";
import { onMounted, watch, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useGeneralStore } from "../stores/general";
const general = useGeneralStore();
const route = useRoute();
const router = useRouter();
const alertsStore = useAlertsStore();
let stripeResponse = reactive({ res: null });

const STRIPE_PK = import.meta.env.VITE_STRIPE_PK;
const STRIPE_RETURN_URL = import.meta.env.VITE_STRIPE_RETURN_URL;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const stripe = Stripe(STRIPE_PK);
const checkPayment = () => {
    console.log("stripe response: ", route.query);
    alertsStore.setAlert(
        `payment succeeded - ${
            route.query?.payment_intent ||
            route.query?.payment_intent_client_secret
        }`,
    );
    stripe
        .retrievePaymentIntent(route.query?.payment_intent_client_secret)
        .then(function (result) {
            console.log("stripe retrieve payment: ", result);
            alertsStore.setAlert(
                `stripe approved payment response: ${result.paymentIntent?.status}`,
            );
            stripeResponse.res = result;
        });
    // router.push({ path: "/", query: {} });
};
const checkSessionPayment = () => {
    alertsStore.setAlert(`payment succeeded - ${route.query?.session_id}`);
};
onMounted(() => {
    console.log("route: ", route.query);
    if (route.query.redirect_status === "succeeded") {
        checkPayment();
    }
    if (route.query.success && route.query.session_id) {
        checkSessionPayment();
    }
});
</script>

<template>
    <main class="w-full px-8 py-4">
        <div class="w-full flex flex-col space-y-8">
            <RouterLink
                to="/subscription-payment-link"
                class="p-4 bg-lime-400 text-gray-700 hover:bg-gray-200 rounded-2xl text-center"
            >
                Subscription Payment Link</RouterLink
            >
            <RouterLink
                to="/one-time-payment-link"
                class="p-4 bg-lime-400 text-gray-700 hover:bg-gray-200 rounded-2xl text-center"
            >
                One-Time Payment Link</RouterLink
            >
            <RouterLink
                to="/standard"
                class="p-4 bg-lime-400 text-gray-700 hover:bg-gray-200 rounded-2xl text-center"
            >
                Standard Payment</RouterLink
            >
            <RouterLink
                to="/standard-on-behalf-of"
                class="p-4 bg-lime-400 text-gray-700 hover:bg-gray-200 rounded-2xl text-center"
            >
                Standard On Behalf Of</RouterLink
            >
            <RouterLink
                to="/subscription"
                class="p-4 bg-cyan-400 text-gray-700 hover:bg-gray-200 rounded-2xl text-center"
            >
                Subscription</RouterLink
            >
            <RouterLink
                to="/hold"
                class="p-4 bg-purple-400 text-gray-700 hover:bg-gray-200 rounded-2xl text-center"
            >
                Hold Payment</RouterLink
            >
            <RouterLink
                to="/charge-customer"
                class="p-4 bg-blue-400 text-gray-700 hover:bg-gray-200 rounded-2xl text-center"
            >
                Charge a Customer</RouterLink
            >
            <RouterLink
                to="/connect-onboard"
                class="p-4 bg-blue-400 text-gray-700 hover:bg-gray-200 rounded-2xl text-center"
            >
                Onboard a Connect User</RouterLink
            >
            <RouterLink
                to="/standard-with-client-secret"
                class="p-4 bg-blue-400 text-gray-700 hover:bg-gray-200 rounded-2xl text-center"
            >
                Standard Payment with Client Secret</RouterLink
            >
        </div>
        <div v-if="route.query && route.query?.status" class="py-8">
            res:
            <pre class="text-xs">{{ route.query }}</pre>
        </div>
        <div v-if="stripeResponse && stripeResponse.res" class="py-8">
            stripe response:
            <pre class="text-xs">{{ stripeResponse.res?.paymentIntent }}</pre>
        </div>
    </main>
</template>
