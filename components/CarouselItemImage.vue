<script setup lang="ts">
defineProps<{
  imagePath?: string
  alt: string
}>()
</script>

<template>
  <AppLazyImage
    v-if="imagePath"
    :key="imagePath"
    :src="`https://image.tmdb.org/t/p/w185${imagePath}`"
    :src-set="
      [
        `https://image.tmdb.org/t/p/w92${imagePath} 92w`,
        `https://image.tmdb.org/t/p/w154${imagePath} 154w`,
        `https://image.tmdb.org/t/p/w185${imagePath} 185w`,
        `https://image.tmdb.org/t/p/w342${imagePath} 342w`,
        `https://image.tmdb.org/t/p/w500${imagePath} 500w`,
        `https://image.tmdb.org/t/p/w780${imagePath} 780w`,
        `https://image.tmdb.org/t/p/original${imagePath} 980w`,
      ].join(', ')
    "
    :sizes="
      [
        '(max-width: 639px) 309px',
        '(max-width: 767px) 246px',
        '(max-width: 1023px) 305px',
        '(max-width: 1279px) 267px',
        '(max-width: 1535px) 263px',
        '218px',
      ].join(', ')
    "
    :alt="alt"
    container-class="aspect-[6/9] rounded-lg"
    class="w-full rounded-[inherit] object-cover"
  />
  <div
    v-else
    class="flex aspect-[6/9] w-full items-center justify-center rounded-lg bg-slate-900"
  >
    <Icon name="carbon:no-image" class="size-8" />
  </div>
</template>
