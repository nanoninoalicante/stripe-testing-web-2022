<script setup>
import { onMounted } from "vue";
import { useGeneralStore } from "../stores/general";
import { usePaymentsStore } from "@/stores/payments";
const paymentsStore = usePaymentsStore();
const general = useGeneralStore();

const stripe = Stripe(
  "pk_test_51J18RHDDF4yhC66hWTwc5VDTXvaFb6rDsZre0vI8JlX49yHahnkKwmRgvONk8OD7BlpJzuewwTL7ww8581FB7G3Y00TZ2X7ezB"
);
const priceId = "price_1JZB3NDDF4yhC66hQwahuram";

let elements;

const submitPayment = async (event) => {
  event.preventDefault();
  general.loading = true;

  const { error } = await stripe.confirmPayment({
    //`Elements` instance that was used to create the Payment Element
    elements,
    confirmParams: {
      return_url: "https://stripe-demo-web-2022.netlify.app/?status=completed",
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
  const response = await fetch("https://stripe-demo-api-dev-v1-eu-tl53xqfleq-ez.a.run.app/create-subscription", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ priceId, customerId: paymentsStore.customerId }),
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
