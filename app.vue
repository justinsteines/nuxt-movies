<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

useHead({
  bodyAttrs: {
    class: 'bg-slate-950 text-slate-50',
  },
})

// Use SSR-safe IDs for Headless UI.
provideHeadlessUseId(() => useId())
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <VueQueryDevtools />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
