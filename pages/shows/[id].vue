<script setup lang="ts">
const { data: show, suspense } = useShowDetailQuery()
const { data: recommendations, suspense: recommendationsSuspense } =
  useShowsRecommendationsQuery()

await suspense()
await recommendationsSuspense()

const route = useRoute()
const router = useRouter()

const TABS = ['overview', 'episodes', 'videos', 'photos']

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
  <div v-if="show">
    <Hero
      :key="`show/${show.id}`"
      :title="show.name"
      :overview="show.overview"
      :rating="show.vote_average"
      :rating-count="show.vote_count"
      :backdrop-path="show.backdrop_path"
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
            v-if="show.credits.cast.length > 0"
            :key="`cast-${show.id}`"
            title="Cast"
            :items="
              show.credits.cast.map((person) => ({
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
            :key="`recommendations-${show.id}`"
            title="More Like This"
            :items="
              recommendations?.pages
                .flatMap((p) => p.results)
                .map((show) => ({
                  id: show.id,
                  link: `/shows/${show.id}`,
                  imagePath: show.poster_path,
                  title: show.name,
                  subtitle: {
                    rating: show.vote_average,
                    ratingCount: show.vote_count,
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
        <HeadlessTabPanel>
          <ComingSoon />
        </HeadlessTabPanel>
      </TabPanels>
    </HeadlessTabGroup>
  </div>
</template>
