<script setup>
import { useAlertsStore } from "@/stores/alerts";
const alertsStore = useAlertsStore();
const deleteAlert = () => {
    alertsStore.$reset();
}
</script>
<template>
  <div class="fixed w-full bottom-0 left-0 p-8">
    <div
      v-for="alert in alertsStore.alerts"
      :key="alert.message"
      class="flex w-full bg-green-200 p-4 rounded-2xl my-2"
    >
      <div class="flex w-full justify-between items-center">
        {{ alert.message }}
        <a
          @click="deleteAlert"
          class="cursor-pointer py-2 px-4 m-0 bg-white rounded-full hover:bg-gray-100 focus:bg-gray-300"
          >X</a
        >
      </div>
    </div>
  </div>
</template>
