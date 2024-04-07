<script setup lang="ts">
import type { ItemsPerPage } from '~/components/Carousel.vue'

const { itemsPerPage } = defineProps<{
  link: string
  itemsPerPage: ItemsPerPage
}>()

let classes = ''

// Generate classes to show the specified number of carousel items at a time
// based on screen size. These classes will need to be safe-listed in the
// tailwind config.
for (const [breakpoint, numItems] of Object.entries(itemsPerPage)) {
  if (breakpoint === 'mobile') {
    classes += `basis-[calc((100%-(${numItems - 1}*0.5rem))/${numItems})]`
    continue
  }
  classes += ` ${breakpoint}:basis-[calc((100%-(${
    numItems - 1
  }*0.5rem))/${numItems})]`
}
</script>

<template>
  <NuxtLink
    :to="link"
    class="flex-none snap-start scroll-ml-2 overflow-hidden md:scroll-ml-12"
    :class="classes"
  >
    <slot />
  </NuxtLink>
</template>
