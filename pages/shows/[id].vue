<script setup lang="ts">
const { data: show, suspense } = useShowDetailQuery()
await suspense()
</script>

<template>
  <div>
    <h1>{{ show?.name }}</h1>
  </div>
</template>
