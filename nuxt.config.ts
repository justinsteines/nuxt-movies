export default defineNuxtConfig({
  modules: ['@nuxt/devtools', '@nuxt/eslint', '@nuxtjs/tailwindcss', 'nuxt-lodash'],
  eslint: {
    config: {
      standalone: false,
    },
  },
  runtimeConfig: {
    tmdbApiKey: '',
  },
  lodash: {
    prefix: "_",
    upperAfterPrefix: false,
  },
})
