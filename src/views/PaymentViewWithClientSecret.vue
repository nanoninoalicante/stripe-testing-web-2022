<script setup>
import { onMounted } from "vue";
import { useGeneralStore } from "../stores/general";
import { useRoute } from "vue-router";
const general = useGeneralStore();
const route = useRoute();

const STRIPE_PK = import.meta.env.VITE_STRIPE_PK;
const STRIPE_RETURN_URL = import.meta.env.VITE_STRIPE_RETURN_URL || "https://loving-multiply-kangaroo.ngrok-free.app";

const stripe = Stripe(STRIPE_PK);

let elements;

const submitPayment = async (event) => {
  event.preventDefault();
  general.loading = true;

  const { error } = await stripe.confirmPayment({
    //`Elements` instance that was used to create the Payment Element
    elements,
    confirmParams: {
      return_url: `${STRIPE_RETURN_URL}/?status=completed`,
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
  const clientSecret = route.query?.client_secret;
  if(!clientSecret) {
    general.loading = false;
    console.log("no client secret");
    return;
  }
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
