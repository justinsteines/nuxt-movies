import { useInfiniteQuery } from '@tanstack/vue-query'
import type { MovieListItem, TmdbPaginatedResponse } from '~/types/tmdb'

export default function () {
  const { $tmdb } = useNuxtApp()
  const route = useRoute()

  return useInfiniteQuery<TmdbPaginatedResponse<MovieListItem>>({
    queryKey: ['movies', route.params.id, 'recommendations'],
    queryFn: ({ queryKey, pageParam, signal }) => $tmdb(`movie/${queryKey[1]}/recommendations`, {
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
