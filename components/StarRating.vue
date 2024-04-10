<script setup lang="ts">
const { rating } = defineProps<{
  rating: number
  ratingCount: number
}>()

const stars = computed(() => (rating / 2).toFixed(1))
const percentage = computed(() => `${Math.round((+stars.value / 5) * 100)}%`)
</script>

<template>
  <div class="relative h-6">
    <template v-if="ratingCount > 0">
      <div
        class="stars before:absolute before:bg-clip-text before:text-transparent before:content-['★★★★★'] after:absolute after:text-sky-400 after:content-['☆☆☆☆☆']"
      />
      <div class="absolute left-[90px] text-base text-slate-400">
        {{ stars }}
      </div>
    </template>
    <small v-else class="text-slate-400">No Rating</small>
  </div>
</template>

<style scoped>
.stars::before {
  background-image: linear-gradient(
    90deg,
    #38bdf8 0% v-bind('percentage'),
    transparent v-bind('percentage') 100%
  );
}
</style>
