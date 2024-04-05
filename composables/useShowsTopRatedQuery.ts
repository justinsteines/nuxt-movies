import { useInfiniteQuery } from '@tanstack/vue-query'
import type { ShowListItem, TmdbPaginatedResponse } from '~/types/tmdb'

export default function () {
  const { $tmdb } = useNuxtApp()

  return useInfiniteQuery<TmdbPaginatedResponse<ShowListItem>>({
    queryKey: ['shows', 'topRated'],
    queryFn: ({ pageParam, signal }) => $tmdb('/tv/top_rated', {
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
