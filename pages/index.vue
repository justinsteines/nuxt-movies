<script setup lang="ts">
const { data: resMovies, isFetching: isFetchingMovies } =
  useMoviesTrendingInfiniteQuery()
const { data: resShows, isFetching: isFetchingShows } =
  useShowsTrendingInfiniteQuery()

const isFetching = computed(
  () => isFetchingMovies.value || isFetchingShows.value
)

// Use async data so that we get hydration and a new feature on every page visit.
const { data: featureIndex } = useLazyAsyncData<number>(() => {
  return new Promise((resolve) => resolve(Math.floor(Math.random() * 15)))
})
const { data: randomBit } = useLazyAsyncData<number>(() => {
  return new Promise((resolve) => resolve(Math.floor(Math.random() * 2)))
})

const feature = computed(() => {
  if (featureIndex.value === null || randomBit.value === null) {
    return null
  }

  let feature

  if (randomBit.value === 0) {
    feature = resMovies.value?.pages.flatMap((p) => p.results)[
      featureIndex.value
    ]
    if (!feature) {
      return null
    }
  } else {
    feature = resShows.value?.pages.flatMap((p) => p.results)[
      featureIndex.value
    ]
    if (!feature) {
      return null
    }
  }

  return feature
})
</script>

<template>
  <PageLoader v-if="isFetching" />
  <div v-else>
    <Hero
      v-if="feature"
      :key="feature.backdrop_path"
      :link="
        'title' in feature ? `/movies/${feature.id}` : `/shows/${feature.id}`
      "
      :title="'title' in feature ? feature.title : feature.name"
      :overview="feature.overview"
      :rating="feature.vote_average"
      :rating-count="feature.vote_count"
      :backdrop-path="feature.backdrop_path"
    />
    <Carousel
      title="Trending Movies"
      :items="
        resMovies?.pages
          .flatMap((p) => p.results)
          .map((movie) => ({
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
    <Carousel
      title="Trending Shows"
      :items="
        resShows?.pages
          .flatMap((p) => p.results)
          .map((show) => ({
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
