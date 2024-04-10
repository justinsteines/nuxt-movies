<script setup lang="ts">
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
</script>

<template>
  <div>
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
