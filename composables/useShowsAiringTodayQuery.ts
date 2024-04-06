import { useInfiniteQuery } from '@tanstack/vue-query'
import type { ShowListItem, TmdbPaginatedResponse } from '~/types/tmdb'

export default function () {
  const { $tmdb } = useNuxtApp()

  return useInfiniteQuery<TmdbPaginatedResponse<ShowListItem>>({
    queryKey: ['shows', 'airingToday'],
    queryFn: ({ pageParam, signal }) =>
      $tmdb('/tv/airing_today', {
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
}
