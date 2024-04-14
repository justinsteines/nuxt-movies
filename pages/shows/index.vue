<script setup lang="ts">
const { data: resTrending, isFetching: isFetchingTrending } =
  useShowsTrendingInfiniteQuery()
const { data: resAiringToday, isFetching: isFetchingAiringToday } =
  useShowsAiringTodayInfiniteQuery()
const { data: resAiringWeek, isFetching: isFetchingAiringWeek } =
  useShowsAiringWeekInfiniteQuery()
const { data: resPopular, isFetching: isFetchingPopular } =
  useShowsPopularInfiniteQuery()
const { data: resTopRated, isFetching: isFetchingTopRated } =
  useShowsTopRatedInfiniteQuery()

const isFetching = computed(
  () =>
    isFetchingTrending.value ||
    isFetchingAiringToday.value ||
    isFetchingAiringWeek.value ||
    isFetchingPopular.value ||
    isFetchingTopRated.value
)

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

// Use async data so that we get hydration and a new feature on every page visit.
const { data: featureIndex } = useLazyAsyncData<number>(() => {
  return new Promise((resolve) => resolve(Math.floor(Math.random() * 15)))
})

const feature = computed(() => {
  if (featureIndex.value === null) {
    return null
  }
  return carousels?.value?.[0]?.items?.[featureIndex.value]
})
</script>

<template>
  <PageLoader v-if="isFetching" />
  <div v-else>
    <Hero
      v-if="feature"
      :key="feature.backdrop_path"
      :link="`/shows/${feature.id}`"
      :title="feature.name"
      :overview="feature.overview"
      :rating="feature.vote_average"
      :rating-count="feature.vote_count"
      :backdrop-path="feature.backdrop_path"
    />
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
