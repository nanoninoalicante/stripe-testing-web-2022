<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="bg-gray-100 min-h-screen">
    <header class="container w-full py-8">
      <div class="w-full flex justify-center items-center">
        <nav>
          <RouterLink to="/">Home</RouterLink>
        </nav>
      </div>
    </header>
    <div
      class="w-full py-8 px-8 flex justify-center items-center"
    >
      <RouterView />
    </div>
  </div>
</template>
