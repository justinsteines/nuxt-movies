<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="hidden h-16 flex-col px-1 md:flex">
    <div class="mt-2 truncate text-lg">{{ title }}</div>
    <slot name="subtitle">
      <div v-if="subtitle" class="truncate text-slate-400">
        {{ subtitle }}
      </div>
    </slot>
  </div>
</template>
