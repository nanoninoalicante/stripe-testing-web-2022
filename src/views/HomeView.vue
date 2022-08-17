<script setup>
import { useAlertsStore } from "@/stores/alerts";
import { onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useGeneralStore } from "../stores/general";
const general = useGeneralStore();
const route = useRoute();
const router = useRouter();
const alertsStore = useAlertsStore();
const response = reactive({})
const checkPayment = () => {
    console.log("stripe response: ", route.query);
    alertsStore.setAlert(`payment succeeded - ${route.query?.payment_intent}`);
    // stripe
    //   .retrievePaymentIntent(route.query)
    //   .then(function(result) {
    //     console.log("stripe retrieve payment: ", result);
    //   });
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
    <div class="flex flex-col space-y-8">
      <RouterLink
        to="/standard"
        class="p-4 bg-lime-400 text-gray-700 hover:bg-gray-200 rounded-2xl text-center"
        >Standard Payment</RouterLink
      >
      <RouterLink
        to="/subscription"
        class="p-4 bg-cyan-400 text-gray-700 hover:bg-gray-200 rounded-2xl text-center"
        >Subscription</RouterLink
      >
    </div>
    <!-- <div>res: <pre>{{response}}</pre></div> -->
  </main>
</template>
