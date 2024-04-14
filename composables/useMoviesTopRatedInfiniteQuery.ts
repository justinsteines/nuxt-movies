import { useInfiniteQuery } from '@tanstack/vue-query'
import type { MovieListItem, TmdbPaginatedResponse } from '~/types/tmdb'

export default function () {
  const { $tmdb } = useNuxtApp()

  const infiniteQuery = useInfiniteQuery<TmdbPaginatedResponse<MovieListItem>>({
    queryKey: ['movies', 'topRated'],
    queryFn: ({ pageParam, signal }) =>
      $tmdb('/movie/top_rated', {
        query: { page: pageParam },
        signal,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page + 1 < lastPage.total_pages
        ? lastPage.page + 1
        : undefined
    },
  })

  onServerPrefetch(async () => {
    await infiniteQuery.suspense()
  })

  return infiniteQuery
}
