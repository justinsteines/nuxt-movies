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
