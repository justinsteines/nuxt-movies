<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    <h1>Movies Detail Page</h1>
    <p>Id: {{ route.params.id }}</p>
  </div>
</template>
