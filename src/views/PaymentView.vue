<script setup>
import { onMounted } from "vue";
import { useGeneralStore } from "../stores/general";
const general = useGeneralStore();

const stripe = Stripe(
  "pk_test_51J18RHDDF4yhC66hWTwc5VDTXvaFb6rDsZre0vI8JlX49yHahnkKwmRgvONk8OD7BlpJzuewwTL7ww8581FB7G3Y00TZ2X7ezB"
);
// The items the customer wants to buy
const items = [{ id: "xl-tshirt" }];

let elements;

async function initialize() {
  general.loading = true;
  const response = await fetch("http://127.0.0.1:4242/create-payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
  const { clientSecret } = await response.json();

  const appearance = {
    theme: "stripe",
  };
  elements = stripe.elements({ appearance, clientSecret });

  general.loading = false;
  const paymentElement = elements.create("payment");
  paymentElement.mount("#payment-element");
}

onMounted(async () => {
  await initialize();
});
</script>

<template>
  <main class="w-full px-8 py-4">
    <form id="payment-form">
      <div id="payment-element">
        <!--Stripe.js injects the Payment Element-->
      </div>
      <button id="submit">
        <div class="spinner hidden" id="spinner"></div>
        <span id="button-text">Pay now</span>
      </button>
      <div id="payment-message" class="hidden"></div>
    </form>
  </main>
</template>
