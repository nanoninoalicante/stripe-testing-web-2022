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
const stripe = Stripe(
  "pk_test_51J18RHDDF4yhC66hWTwc5VDTXvaFb6rDsZre0vI8JlX49yHahnkKwmRgvONk8OD7BlpJzuewwTL7ww8581FB7G3Y00TZ2X7ezB"
);
const checkPayment = () => {
  console.log("stripe response: ", route.query);
  alertsStore.setAlert(`payment succeeded - ${route.query?.payment_intent}`);
  stripe
    .retrievePaymentIntent(route.query?.payment_intent_client_secret)
    .then(function (result) {
      console.log("stripe retrieve payment: ", result);
      alertsStore.setAlert(`stripe approved payment response: ${result.paymentIntent?.status}`);
      stripeResponse.res = result;
    });
  // router.push({ path: "/", query: {} });
}
onMounted(() => {
  console.log("route: ", route.query);
  if (route.query.redirect_status === "succeeded") {
    checkPayment();
  }
});
</script>

<template>
  <main class="w-full px-8 py-4">
    <div class="w-full flex flex-col space-y-8">
      <RouterLink to="/standard" class="p-4 bg-lime-400 text-gray-700 hover:bg-gray-200 rounded-2xl text-center">
        Standard Payment</RouterLink>
      <RouterLink to="/subscription" class="p-4 bg-cyan-400 text-gray-700 hover:bg-gray-200 rounded-2xl text-center">
        Subscription</RouterLink>
    </div>
    <div v-if="route.query && route.query?.status" class="py-8">res:
      <pre class="text-xs">{{ route.query }}</pre>
    </div>
    <div v-if="stripeResponse && stripeResponse.res" class="py-8">stripe response:
      <pre class="text-xs">{{ stripeResponse.res?.paymentIntent }}</pre>
    </div>
  </main>
</template>
