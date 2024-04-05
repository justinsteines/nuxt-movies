export default defineEventHandler((event) => {
  const { tmdbApiKey } = useRuntimeConfig()

  const tmdbBaseUrl = 'https://api.themoviedb.org/3'

  const { _: url } = getRouterParams(event)

  const query = {
    api_key: tmdbApiKey,
    language: 'en-US',
    include_adult: false,
    ...getQuery(event),
  }

  return $fetch(url as string, { baseURL: tmdbBaseUrl, query })
})
