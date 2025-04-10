export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      meta: [{ name: 'robots', content: 'noindex' }],
    },
  },

  modules: [
    '@nuxt/devtools',
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    'nuxt-headlessui',
    'nuxt-icon',
    'nuxt-lodash',
    'nuxt-security',
  ],

  eslint: {
    config: {
      standalone: false,
    },
  },

  runtimeConfig: {
    tmdbApiKey: '',
  },

  lodash: {
    prefix: '_',
    upperAfterPrefix: false,
  },

  security: {
    headers: {
      crossOriginEmbedderPolicy:
        process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
      contentSecurityPolicy: {
        'img-src': ["'self'", 'data:', 'https://image.tmdb.org/'],
      },
    },
    corsHandler: {
      origin: (
        import.meta.env.NUXT_TMDB_PROXY_CORS_ORIGIN as string | undefined
      )?.split(','),
    },
  },

  compatibilityDate: '2025-02-16',
})
