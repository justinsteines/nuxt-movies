<script setup lang="ts">
const links = [
  { path: '/', label: 'Home' },
  { path: '/movies', label: 'Movies' },
  { path: '/shows', label: 'Shows' },
]
</script>

<template>
  <nav>
    <ul class="flex gap-4">
      <li v-for="link of links" :key="link.path">
        <NuxtLink :to="link.path" active-class="underline">
          {{ link.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
