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
        v-model="paymentsStore.name"
        placeholder="Customer Name"
      />
      <input
        type="text"
        class="p-4 rounded-xl border-2 border-gray-500"
        v-model="paymentsStore.email"
        placeholder="Customer Email"
      />
      <input
        type="text"
        class="p-4 rounded-xl border-2 border-gray-500"
        v-model="paymentsStore.customerId"
        placeholder="Customer Id"
      />
      <input
        type="text"
        class="p-4 rounded-xl border-2 border-gray-500"
        v-model="paymentsStore.connectId"
        placeholder="Connected Account ID"
      />
      <input
        type="text"
        class="p-4 rounded-xl border-2 border-gray-500"
        v-model="paymentsStore.currency"
        placeholder="Currency"
      />
      <input
        type="text"
        class="p-4 rounded-xl border-2 border-gray-500"
        v-model="paymentsStore.amount"
        placeholder="Amount"
      />
      <RouterLink
        to="/standard/payment"
        class="p-4 bg-gray-200 text-gray-700 hover:bg-gray-50 rounded-2xl text-center"
        >Standard Destination Payment</RouterLink
      >
    </div>
  </main>
</template>
