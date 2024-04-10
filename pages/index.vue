<script setup lang="ts">
import type { MovieListItem, ShowListItem } from '~/types/tmdb'

const { data: resMovies, suspense: suspenseMovies } = useMoviesTrendingQuery()
const { data: resShows, suspense: suspenseShows } = useShowsTrendingQuery()
await suspenseMovies()
await suspenseShows()

// Use "useAsyncData" so that we get hydration and a new feature on every page visit.
const { data: feature } = useAsyncData<
  MovieListItem | ShowListItem | undefined
>(() => {
  return new Promise((resolve) => {
    const featureIndex = Math.floor(Math.random() * 10)

    let feature

    if (Math.floor(Math.random() * 2) === 0) {
      feature = resMovies.value?.pages.flatMap((p) => p.results)[featureIndex]
      if (!feature) {
        resolve(undefined)
        return
      }
    } else {
      feature = resShows.value?.pages.flatMap((p) => p.results)[featureIndex]
      if (!feature) {
        resolve(undefined)
        return
      }
    }

    resolve(feature)
  })
})
</script>

<template>
  <div>
    <Hero
      v-if="feature"
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
