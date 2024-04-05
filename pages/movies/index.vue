<script setup lang="ts">
const { data: resTrending, suspense: suspenseTrending } = useMoviesTrendingQuery()
const { data: resNowPlaying, suspense: suspenseNowPlaying } = useMoviesNowPlayingQuery()
const { data: resPopular, suspense: suspensePopular } = useMoviesPopularQuery()
const { data: resUpcoming, suspense: suspenseUpcoming } = useMoviesUpcomingQuery()
const { data: resTopRated, suspense: suspenseTopRated } = useMoviesTopRatedQuery()
await suspenseTrending()
await suspenseNowPlaying()
await suspensePopular()
await suspenseUpcoming()
await suspenseTopRated()
</script>

<template>
  <div>
    <h2>Trending Movies</h2>
    <ul>
      <li v-for="movie of resTrending?.pages.flatMap(p => p.results)" :key="movie.id">
        <NuxtLink :to="`/movies/${movie.id}`">
          {{ movie.title }}
        </NuxtLink>
      </li>
    </ul>
    <br>
    <h2>Movies Now Playing</h2>
    <ul>
      <li v-for="movie of resNowPlaying?.pages.flatMap(p => p.results)" :key="movie.id">
        <NuxtLink :to="`/movies/${movie.id}`">
          {{ movie.title }}
        </NuxtLink>
      </li>
    </ul>
    <br>
    <h2>Upcoming Movies</h2>
    <ul>
      <li v-for="movie of resUpcoming?.pages.flatMap(p => p.results)" :key="movie.id">
        <NuxtLink :to="`/movies/${movie.id}`">
          {{ movie.title }}
        </NuxtLink>
      </li>
    </ul>
    <br>
    <h2>Popular Movies</h2>
    <ul>
      <li v-for="movie of resPopular?.pages.flatMap(p => p.results)" :key="movie.id">
        <NuxtLink :to="`/movies/${movie.id}`">
          {{ movie.title }}
        </NuxtLink>
      </li>
    </ul>
    <br>
    <h2>Top Rated Movies</h2>
    <ul>
      <li v-for="movie of resTopRated?.pages.flatMap(p => p.results)" :key="movie.id">
        <NuxtLink :to="`/movies/${movie.id}`">
          {{ movie.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
