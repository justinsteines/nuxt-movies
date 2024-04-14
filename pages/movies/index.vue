<script setup lang="ts">
const { data: resTrending, isFetching: isFetchingTrending } =
  useMoviesTrendingInfiniteQuery()
const { data: resNowPlaying, isFetching: isFetchingNowPlaying } =
  useMoviesNowPlayingInfiniteQuery()
const { data: resPopular, isFetching: isFetchingPopular } =
  useMoviesPopularInfiniteQuery()
const { data: resUpcoming, isFetching: isFetchingUpcoming } =
  useMoviesUpcomingInfiniteQuery()
const { data: resTopRated, isFetching: isFetchingTopRated } =
  useMoviesTopRatedInfiniteQuery()

const isFetching = computed(
  () =>
    isFetchingTrending.value ||
    isFetchingNowPlaying.value ||
    isFetchingPopular.value ||
    isFetchingUpcoming.value ||
    isFetchingTopRated.value
)

const carousels = computed(() => [
  {
    title: 'Trending Movies',
    items: resTrending.value?.pages.flatMap((p) => p.results),
  },
  {
    title: 'Now Playing Movies',
    items: resNowPlaying.value?.pages.flatMap((p) => p.results),
  },
  {
    title: 'Upcoming Movies',
    items: resUpcoming.value?.pages.flatMap((p) => p.results),
  },
  {
    title: 'Popular Movies',
    items: resPopular.value?.pages.flatMap((p) => p.results),
  },
  {
    title: 'Top Rated Movies',
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
      :link="`/movies/${feature.id}`"
      :title="feature.title"
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
        carousel.items?.map((movie) => ({
          id: movie.id,
          title: movie.title,
          subtitle: {
            rating: movie.vote_average,
            ratingCount: movie.vote_count,
          },
          link: `/movies/${movie.id}`,
          imagePath: movie.poster_path,
        }))
      "
    >
      <template #subtitle="{ rating, ratingCount }">
        <StarRating :rating="+rating!" :rating-count="+ratingCount!" />
      </template>
    </Carousel>
  </div>
</template>
