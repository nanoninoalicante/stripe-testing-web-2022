import { defineStore } from "pinia";

export const usePaymentsStore = defineStore({
  id: "payments",
  state: () => ({
    customerId: "cus_Jt3Q9UHajxeQtJ",
    connectId: "acct_1LjhCT2S6nRDHsZQ",
    paymentIntent: "",
    currency: "EUR",
    amount: 1000,
    email: "christopher@nanonino.com",
    name: "Chris Hill",
  }),
  actions: {
    setPaymentIntentId(intent: any) {
      this.paymentIntent = intent;
    },
    setPaymentConnectedAccount(connectId: any) {
      this.connectId = connectId;
    },
  },
});
