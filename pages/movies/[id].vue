<script setup lang="ts">
const { data: movie, isFetching } = useMovieDetailQuery()
const { data: recommendations } = useMoviesRecommendationsInfiniteQuery()

const route = useRoute()
const router = useRouter()

const TABS = ['overview', 'videos', 'photos']

const selectedTab = computed(() => {
  const currentTabIndex = TABS.findIndex((tab) => tab === route.query.tab)
  if (currentTabIndex < 0) {
    return 0
  }
  return currentTabIndex
})

function onTabChange(index: number) {
  if (index === 0) {
    router.push({ query: { ...route.query, tab: undefined } })
    return
  }
  router.push({ query: { ...route.query, tab: TABS[index] } })
}
</script>

<template>
  <PageLoader v-if="isFetching" />
  <div v-else-if="movie">
    <Hero
      :key="movie.backdrop_path"
      :title="movie.title"
      :overview="movie.overview"
      :rating="movie.vote_average"
      :rating-count="movie.vote_count"
      :backdrop-path="movie.backdrop_path"
    />
    <HeadlessTabGroup :selected-index="selectedTab" @change="onTabChange">
      <AppContainer class="mt-14">
        <TabList>
          <Tab v-for="tab of TABS" :key="tab">
            <span className="uppercase">{{ tab }}</span>
          </Tab>
        </TabList>
      </AppContainer>
      <TabPanels>
        <HeadlessTabPanel>
          <Carousel
            v-if="movie.credits.cast.length > 0"
            :key="`cast-${movie.id}`"
            title="Cast"
            :items="
              movie.credits.cast.map((person) => ({
                id: person.id,
                title: person.name,
                subtitle: person.character,
                link: `/people/${person.id}`,
                imagePath: person.profile_path,
              }))
            "
            :items-per-page="{
              mobile: 3,
              sm: 4,
              md: 4,
              lg: 5,
              xl: 6,
              '2xl': 7,
            }"
          />
          <Carousel
            v-if="
              recommendations &&
              recommendations.pages.flatMap((p) => p.results).length > 0
            "
            :key="`recommendations-${movie.id}`"
            title="More Like This"
            :items="
              recommendations?.pages
                .flatMap((p) => p.results)
                .map((movie) => ({
                  id: movie.id,
                  link: `/movies/${movie.id}`,
                  imagePath: movie.poster_path,
                  title: movie.title,
                  subtitle: {
                    rating: movie.vote_average,
                    ratingCount: movie.vote_count,
                  },
                }))
            "
            :items-per-page="{
              mobile: 3,
              sm: 4,
              md: 4,
              lg: 5,
              xl: 6,
              '2xl': 7,
            }"
          >
            <template #subtitle="{ rating, ratingCount }">
              <StarRating :rating="+rating!" :rating-count="+ratingCount!" />
            </template>
          </Carousel>
        </HeadlessTabPanel>
        <HeadlessTabPanel>
          <ComingSoon />
        </HeadlessTabPanel>
        <HeadlessTabPanel>
          <ComingSoon />
        </HeadlessTabPanel>
      </TabPanels>
    </HeadlessTabGroup>
  </div>
</template>
