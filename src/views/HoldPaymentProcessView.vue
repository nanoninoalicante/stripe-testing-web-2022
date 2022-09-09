<script setup>
import { onMounted } from "vue";
import { useGeneralStore } from "../stores/general";
import { usePaymentsStore } from "@/stores/payments";
const paymentsStore = usePaymentsStore();
const general = useGeneralStore();
const getCurrentOrigin = () => window.location.origin;
const STRIPE_PK = import.meta.env.VITE_STRIPE_PK
const STRIPE_RETURN_URL = import.meta.env.VITE_STRIPE_RETURN_URL || getCurrentOrigin();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const stripe = Stripe(
  STRIPE_PK
);
// The items the customer wants to buy
const items = [{ id: "xl-tshirt" }];

let elements;

const submitPayment = async (event) => {
  event.preventDefault();
  general.loading = true;

  const { error } = await stripe.confirmPayment({
    //`Elements` instance that was used to create the Payment Element
    elements,
    confirmParams: {
      return_url: `${STRIPE_RETURN_URL}/hold/confirm?status=completed`,
    },
  });

  if (error) {
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Show error to your customer (for example, payment
    // details incomplete)
    const messageContainer = document.querySelector("#error-message");
    messageContainer.textContent = error.message;
  } else {
    // Your customer will be redirected to your `return_url`. For some payment
    // methods like iDEAL, your customer will be redirected to an intermediate
    // site first to authorize the payment, then redirected to the `return_url`.
  }

  general.loading = false;
};

async function initialize() {
  general.loading = true;
  console.log("stripe return url: ", STRIPE_RETURN_URL);
  const response = await fetch(`${API_BASE_URL}/create-payment-intent-hold`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items, customer: paymentsStore.customerId }),
  });
  const { clientSecret } = await response.json();

  const appearance = {
    theme: "flat",
    
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
    <form id="payment-form" @submit="submitPayment">
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
