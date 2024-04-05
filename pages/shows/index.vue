<script setup lang="ts">
const { data: resTrending, suspense: suspenseTrending } = useShowsTrendingQuery()
const { data: resAiringToday, suspense: suspenseAiringToday } = useShowsAiringTodayQuery()
const { data: resAiringWeek, suspense: suspenseAiringWeek } = useShowsAiringWeekQuery()
const { data: resPopular, suspense: suspensePopular } = useShowsPopularQuery()
const { data: resTopRated, suspense: suspenseTopRated } = useShowsTopRatedQuery()
await suspenseTrending()
await suspenseAiringToday()
await suspenseAiringWeek()
await suspensePopular()
await suspenseTopRated()
</script>

<template>
  <div>
    <h2>Trending Shows</h2>
    <ul>
      <li v-for="show of resTrending?.pages.flatMap(p => p.results)" :key="show.id">
        <NuxtLink :to="`shows/${show.id}`">
          {{ show.name }}
        </NuxtLink>
      </li>
    </ul>
    <br>
    <h2>Shows Airing Today</h2>
    <ul>
      <li v-for="show of resAiringToday?.pages.flatMap(p => p.results)" :key="show.id">
        <NuxtLink :to="`shows/${show.id}`">
          {{ show.name }}
        </NuxtLink>
      </li>
    </ul>
    <br>
    <h2>Shows Airing In The Next Week</h2>
    <ul>
      <li v-for="show of resAiringWeek?.pages.flatMap(p => p.results)" :key="show.id">
        <NuxtLink :to="`shows/${show.id}`">
          {{ show.name }}
        </NuxtLink>
      </li>
    </ul>
    <br>
    <h2>Popular Shows</h2>
    <ul>
      <li v-for="show of resPopular?.pages.flatMap(p => p.results)" :key="show.id">
        <NuxtLink :to="`shows/${show.id}`">
          {{ show.name }}
        </NuxtLink>
      </li>
    </ul>
    <br>
    <h2>Top Rated Shows</h2>
    <ul>
      <li v-for="show of resTopRated?.pages.flatMap(p => p.results)" :key="show.id">
        <NuxtLink :to="`shows/${show.id}`">
          {{ show.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
