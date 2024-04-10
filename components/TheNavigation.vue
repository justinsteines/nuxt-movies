<script setup lang="ts">
const links = [
  { path: '/', iconName: 'bx:home-alt-2', label: 'Home' },
  { path: '/movies', iconName: 'mdi:movie-open-outline', label: 'Movies' },
  { path: '/shows', iconName: 'bx:tv', label: 'Shows' },
]
</script>

<template>
  <nav
    class="border-t-2 border-slate-50/20 lg:order-first lg:border-r-2 lg:border-t-0"
  >
    <ul
      class="flex h-20 items-center justify-center gap-8 lg:my-8 lg:w-24 lg:flex-col lg:items-center lg:justify-start lg:h-screen-safe"
    >
      <li v-for="link of links" :key="link.path">
        <NuxtLink
          :to="link.path"
          class="inline-block p-4 text-4xl text-slate-100"
          active-class="!text-sky-400"
          :aria-label="link.label"
        >
          <Icon :name="link.iconName" />
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
