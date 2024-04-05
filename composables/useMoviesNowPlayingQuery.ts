import { useInfiniteQuery } from '@tanstack/vue-query'
import type { MovieListItem, TmdbPaginatedResponse } from '~/types/tmdb'

export default function () {
  const { $tmdb } = useNuxtApp()

  return useInfiniteQuery<TmdbPaginatedResponse<MovieListItem>>({
    queryKey: ['movies', 'nowPlaying'],
    queryFn: ({ pageParam, signal }) => $tmdb('/movie/now_playing', {
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
