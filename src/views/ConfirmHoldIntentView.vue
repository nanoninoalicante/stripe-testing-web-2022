<script setup>
import { usePaymentsStore } from "@/stores/payments";
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useGeneralStore } from "@/stores/general";
import { useAlertsStore } from "@/stores/alerts";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const general = useGeneralStore();
const alerts = useAlertsStore();
const route = useRoute();
const paymentsStore = usePaymentsStore();
const confirmHoldPayment = async () => {
  general.loading = true;
  const response = await fetch(`${API_BASE_URL}/confirm-hold/${paymentsStore.paymentIntent}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  }).catch((e) => {
    console.log('error: ', e.message);
    alerts.setAlert(e.message)

  });
  const resBody = await response.json();
  console.log("resBody: ", resBody);
  if (resBody.clientSecret) {
    window.location.href = "/?redirect_status=succeeded&payment_intent_client_secret=" + resBody.clientSecret;

  }
}
onMounted(() => {
  console.log("params: ", route.params);
  paymentsStore.setPaymentIntentId(route.params?.intent || route.query?.payment_intent);
})
</script>

<template>
  <main class="w-full px-8 py-4">
    <div class="flex flex-col space-y-8">
      <input type="text" class="p-4 rounded-xl border-2 border-gray-500" v-model="paymentsStore.paymentIntent"
        placeholder="Payment Intent ID" />
      <button @click="confirmHoldPayment"
        class="p-4 bg-gray-200 text-gray-700 hover:bg-gray-50 rounded-2xl text-center">Confirm Hold Payment</button>
    </div>
  </main>
</template>
