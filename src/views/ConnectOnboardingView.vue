<script setup>
import { ref } from "vue"
import { usePaymentsStore } from "@/stores/payments";
import LoadingSpinner from "../components/icons/LoadingSpinner.vue";
const paymentsStore = usePaymentsStore();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const loading = ref(false);
const stripeOnboardingLink = ref("");
const generateOnboardingLink = async () => {
  loading.value = true;
  const response = await fetch(`${API_BASE_URL}/connect/${paymentsStore.connectId}/onboarding-link`, {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });
  const responseData = await response.json();
  console.log("response: ", responseData)
  loading.value = false;
  stripeOnboardingLink.value = responseData.accountLink?.url;
}
</script>

<template>
  <main class="w-full px-8 py-4">
    <div class="flex flex-col space-y-8">
      <input type="text" class="p-4 rounded-xl border-2 border-gray-500" v-model="paymentsStore.connectId"
        placeholder="Connect ID" />
      <button @click="generateOnboardingLink" :disabled="loading"
        class="flex flex-row justify-center items-center space-x-2 p-4 bg-gray-200 text-gray-700 hover:bg-gray-50 rounded-2xl text-center">
        <LoadingSpinner v-if="loading" class="animate-spin fill-gray-500"></LoadingSpinner> <span>Generate Onboarding
          Link</span>
      </button>
      <p class="break-all">{{stripeOnboardingLink}}</p>
      <a v-if="stripeOnboardingLink" :href="stripeOnboardingLink" target="_blank" :disabled="loading"
        class="flex flex-row justify-center items-center space-x-2 p-4 bg-blue-400 text-white hover:bg-blue-200 rounded-2xl text-center">
        <LoadingSpinner v-if="loading" class="animate-spin fill-gray-500"></LoadingSpinner> <span>Go to
          Onboarding</span>
      </a>
    </div>
  </main>
</template>
