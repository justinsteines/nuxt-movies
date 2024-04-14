<script setup lang="ts">
defineProps<{
  link?: string
  title: string
  overview: string
  rating: number
  ratingCount: number
  backdropPath?: string
}>()
</script>

<template>
  <div class="lg:relative lg:flex">
    <div
      class="relative flex max-h-[30rem] items-center overflow-hidden lg:ml-auto lg:w-2/3"
    >
      <div
        class="aspect-video w-full bg-slate-950 after:absolute after:inset-0 after:z-10 after:bg-gradient-to-t after:from-slate-950 after:via-transparent after:via-15% lg:before:absolute lg:before:inset-0 lg:before:z-10 lg:before:bg-gradient-to-r lg:before:from-slate-950 lg:before:via-transparent lg:before:via-50%"
      >
        <img
          v-if="backdropPath"
          :src="`https://image.tmdb.org/t/p/w780${backdropPath}`"
          :srcset="
            [
              `https://image.tmdb.org/t/p/w300${backdropPath} 300w`,
              `https://image.tmdb.org/t/p/w780${backdropPath} 780w`,
              `https://image.tmdb.org/t/p/w1280${backdropPath} 1280w`,
              `https://image.tmdb.org/t/p/original${backdropPath} 1650w`,
            ].join(', ')
          "
          :alt="title"
          sizes="(max-width: 1023px) 100vw, 66vw"
          class="w-full object-cover"
        />
      </div>
    </div>
    <AppContainer
      class="flex items-center lg:absolute lg:z-20 lg:h-full lg:w-1/2"
    >
      <div>
        <NuxtLink :to="link">
          <h1 class="my-5 text-3xl font-bold text-slate-100 lg:text-4xl">
            {{ title }}
          </h1>
        </NuxtLink>
        <StarRating
          :rating="rating"
          :rating-count="ratingCount"
          class="my-4 lg:my-6"
        />
        <p class="line-clamp-3 text-slate-300">{{ overview }}</p>
      </div>
    </AppContainer>
  </div>
</template>
