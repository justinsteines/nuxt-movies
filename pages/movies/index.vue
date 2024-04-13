<script setup lang="ts">
import type { MovieListItem } from '~/types/tmdb'

const { data: resTrending, suspense: suspenseTrending } =
  useMoviesTrendingQuery()
const { data: resNowPlaying, suspense: suspenseNowPlaying } =
  useMoviesNowPlayingQuery()
const { data: resPopular, suspense: suspensePopular } = useMoviesPopularQuery()
const { data: resUpcoming, suspense: suspenseUpcoming } =
  useMoviesUpcomingQuery()
const { data: resTopRated, suspense: suspenseTopRated } =
  useMoviesTopRatedQuery()

await suspenseTrending()
await suspenseNowPlaying()
await suspensePopular()
await suspenseUpcoming()
await suspenseTopRated()

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

// Use "useAsyncData" so that we get hydration and a new feature on every page visit.
const { data: feature } = useAsyncData<MovieListItem | undefined>(() => {
  return new Promise((resolve) =>
    resolve(carousels?.value[0]?.items?.[Math.floor(Math.random() * 10)])
  )
})
</script>

<template>
  <div>
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
