<script setup lang="ts">
const { data: movie, suspense } = useMovieDetailQuery()
await suspense()
</script>

<template>
  <div>
    <h1>{{ movie?.title }}</h1>
  </div>
</template>
