<script setup lang="ts">
const { data: resMovies, suspense: suspenseMovies } = useMoviesTrendingQuery()
const { data: resShows, suspense: suspenseShows } = useShowsTrendingQuery()
await suspenseMovies()
await suspenseShows()
</script>

<template>
  <div>
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
