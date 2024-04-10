<template>
  <div
    class="grid grid-rows-[1fr_auto] h-screen-safe 2xl:container lg:grid-cols-[auto_1fr] lg:grid-rows-1 2xl:mx-auto"
  >
    <main class="overflow-auto">
      <slot />
    </main>
    <TheNavigation />
  </div>
</template>
