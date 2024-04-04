export default defineNuxtConfig({
  modules: ['@nuxt/devtools', '@nuxt/eslint', '@nuxtjs/tailwindcss'],
  eslint: {
    config: {
      standalone: false,
    },
  },
})
