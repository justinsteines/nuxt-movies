<script setup lang="ts">
const { data: resTrending, suspense: suspenseTrending } =
  useShowsTrendingQuery()
const { data: resAiringToday, suspense: suspenseAiringToday } =
  useShowsAiringTodayQuery()
const { data: resAiringWeek, suspense: suspenseAiringWeek } =
  useShowsAiringWeekQuery()
const { data: resPopular, suspense: suspensePopular } = useShowsPopularQuery()
const { data: resTopRated, suspense: suspenseTopRated } =
  useShowsTopRatedQuery()

await suspenseTrending()
await suspenseAiringToday()
await suspenseAiringWeek()
await suspensePopular()
await suspenseTopRated()

const carousels = computed(() => [
  {
    title: 'Trending Shows',
    items: resTrending.value?.pages.flatMap((p) => p.results),
  },
  {
    title: 'Shows Airing Today',
    items: resAiringToday.value?.pages.flatMap((p) => p.results),
  },
  {
    title: 'Shows Airing In The Next Week',
    items: resAiringWeek.value?.pages.flatMap((p) => p.results),
  },
  {
    title: 'Popular Shows',
    items: resPopular.value?.pages.flatMap((p) => p.results),
  },
  {
    title: 'Top Rated Shows',
    items: resTopRated.value?.pages.flatMap((p) => p.results),
  },
])
</script>

<template>
  <div>
    <Carousel
      v-for="carousel of carousels"
      :key="carousel.title"
      :title="carousel.title"
      :items="
        carousel.items?.map((show) => ({
          id: show.id,
          title: show.name,
          subtitle: {
            rating: show.vote_average,
            ratingCount: show.vote_count,
          },
          link: `/shows/${show.id}`,
          imagePath: show.poster_path,
        }))
      "
    >
      <template #subtitle="{ rating, ratingCount }">
        <StarRating :rating="+rating!" :rating-count="+ratingCount!" />
      </template>
    </Carousel>
  </div>
</template>
