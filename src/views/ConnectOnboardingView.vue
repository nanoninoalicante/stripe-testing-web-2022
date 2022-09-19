<script setup>
import { usePaymentsStore } from "@/stores/payments";
const paymentsStore = usePaymentsStore();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const generateOnboardingLink = async () => {
  const response = await fetch(`${API_BASE_URL}/connect/${paymentsStore.connectId}/onboarding-link`, {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });
  const responseData = await response.json();
  console.log("response: ", responseData)
}
</script>

<template>
  <main class="w-full px-8 py-4">
    <div class="flex flex-col space-y-8">
      <input
        type="text"
        class="p-4 rounded-xl border-2 border-gray-500"
        v-model="paymentsStore.connectId"
        placeholder="Connect ID"
      />
      <button
        @click="generateOnboardingLink"
        class="p-4 bg-gray-200 text-gray-700 hover:bg-gray-50 rounded-2xl text-center"
        >Generate Onboarding Link</button
      >
    </div>
  </main>
</template>
