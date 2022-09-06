<script setup>
import { usePaymentsStore } from "@/stores/payments";
const paymentsStore = usePaymentsStore();
</script>

<template>
  <main class="w-full px-8 py-4">
    <div class="flex flex-col space-y-8">
      <input
        type="text"
        class="p-4 rounded-xl border-2 border-gray-500"
        v-model="paymentsStore.customerId"
        placeholder="Customer ID"
      />
      <RouterLink
        to="/hold/payment"
        class="p-4 bg-gray-200 text-gray-700 hover:bg-gray-50 rounded-2xl text-center"
        >Hold Payment</RouterLink
      >
    </div>
  </main>
</template>
