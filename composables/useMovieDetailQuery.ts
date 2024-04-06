import { useQuery } from '@tanstack/vue-query'
import type { MovieDetail } from '~/types/tmdb'

export default function () {
  const { $tmdb } = useNuxtApp()
  const route = useRoute()

  return useQuery<MovieDetail>({
    queryKey: ['movies', route.params.id],
    queryFn: ({ queryKey, signal }) =>
      $tmdb(`movie/${queryKey[1]}`, {
        query: { append_to_response: 'credits' },
        signal,
      }),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
  })
}
