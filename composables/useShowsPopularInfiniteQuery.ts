import { useInfiniteQuery } from '@tanstack/vue-query'
import type { ShowListItem, TmdbPaginatedResponse } from '~/types/tmdb'

export default function () {
  const { $tmdb } = useNuxtApp()

  const infiniteQuery = useInfiniteQuery<TmdbPaginatedResponse<ShowListItem>>({
    queryKey: ['shows', 'popular'],
    queryFn: ({ pageParam, signal }) =>
      $tmdb('/tv/popular', {
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
