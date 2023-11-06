<script setup>
import { ref } from "vue";
import { usePaymentsStore } from "@/stores/payments";
import { useGeneralStore } from "../stores/general";

const general = useGeneralStore();
const paymentsStore = usePaymentsStore();
const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "https://cdb5-79-150-142-212.ngrok-free.app";

const customerId = ref("");
const lookupKey = ref("dev_verify_payment_usd");
const paymentLink = ref("");
const getPaymentLink = async () => {
    console.log("get payment link");
    general.loading = true;
    const response = await fetch(
        `${API_BASE_URL}/create-one-time-checkout-session`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                customer: customerId.value || null,
                lookup_key: lookupKey.value,
            }),
        },
    );
    const { paymentLink: url } = await response.json();
    paymentLink.value = url;
    general.loading = false;
};
</script>

<template>
    <main class="w-full px-8 py-4">
        <div class="flex flex-col space-y-8">
            <input
                type="text"
                class="p-4 rounded-xl border-2 border-gray-500"
                v-model="customerId"
                placeholder="Customer Id"
            />
            <input
                type="text"
                class="p-4 rounded-xl border-2 border-gray-500"
                v-model="lookupKey"
                placeholder="Product Lookup Key"
            />
            <button
                @click="getPaymentLink"
                class="p-4 bg-gray-200 text-gray-700 hover:bg-gray-50 rounded-2xl text-center"
            >
                One-time Payment
            </button>
        </div>
        <div v-if="paymentLink" class="flex flex-col mt-10">
            <a
                :href="paymentLink"
                target="_self"
                class="p-4 bg-gray-200 text-gray-700 hover:bg-gray-50 rounded-2xl text-center"
            >
                Pay
            </a>
        </div>
    </main>
</template>
