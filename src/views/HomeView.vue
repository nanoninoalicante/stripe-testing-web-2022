<script setup>
import { useAlertsStore } from "@/stores/alerts";
import { onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const alertsStore = useAlertsStore();
onMounted(() => {
  console.log("route: ", route.query);
  if (route.query.redirect_status === "succeeded") {
    alertsStore.setAlert(`payment succeeded - ${route.query?.payment_intent}`);
    router.push({ path: "/", query: {} });
  }
});
</script>

<template>
  <main class="w-full px-8 py-4">
    <div class="flex flex-col space-y-8">
      <RouterLink
        to="/standard"
        class="p-4 bg-lime-400 text-gray-700 hover:bg-gray-200 rounded-2xl text-center"
        >Standard Payment</RouterLink
      >
      <RouterLink
        to="/subscription"
        class="p-4 bg-cyan-400 text-gray-700 hover:bg-gray-200 rounded-2xl text-center"
        >Subscription</RouterLink
      >
    </div>
  </main>
</template>
