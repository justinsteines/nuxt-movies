export default defineNuxtPlugin(() => {
  const $tmdb = $fetch.create({
    baseURL: '/tmdb',
  })

  return {
    provide: {
      tmdb: $tmdb,
    },
  }
})
