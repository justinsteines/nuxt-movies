import { useInfiniteQuery } from '@tanstack/vue-query'
import type { ShowListItem, TmdbPaginatedResponse } from '~/types/tmdb'

export default function () {
  const { $tmdb } = useNuxtApp()

  return useInfiniteQuery<TmdbPaginatedResponse<ShowListItem>>({
    queryKey: ['shows', 'airingWeek'],
    queryFn: ({ pageParam, signal }) => $tmdb('/tv/on_the_air', {
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
