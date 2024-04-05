<script setup lang="ts">
const { data: resMovies, suspense: suspenseMovies } = useMoviesTrendingQuery()
const { data: resShows, suspense: suspenseShows } = useShowsTrendingQuery()
await suspenseMovies()
await suspenseShows()
</script>

<template>
  <div>
    <h2>Trending Movies</h2>
    <ul>
      <li v-for="movie of resMovies?.pages.flatMap(p => p.results)" :key="movie.id">
        <NuxtLink :to="`/movies/${movie.id}`">
          {{ movie.title }}
        </NuxtLink>
      </li>
    </ul>
    <br>
    <h2>Trending Shows</h2>
    <ul>
      <li v-for="show of resShows?.pages.flatMap(p => p.results)" :key="show.id">
        <NuxtLink :to="`/shows/${show.id}`">
          {{ show.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
