import { defineStore } from "pinia";

export const usePaymentsStore = defineStore({
  id: "payments",
  state: () => ({
    customerId: "cus_Jt3Q9UHajxeQtJ",
    connectId: "acct_1LjhCT2S6nRDHsZQ",
    paymentIntent: "",
    amount: 1000,
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
