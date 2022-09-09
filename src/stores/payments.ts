import { defineStore } from "pinia";

export const usePaymentsStore = defineStore({
  id: "payments",
  state: () => ({
    customerId: "cus_Jt3Q9UHajxeQtJ",
    paymentIntent: "",
    amount: 1000,
  }),
  actions: {
    setPaymentIntentId(intent) {
      this.paymentIntent = intent;
    },
  },
});