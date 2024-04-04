import antfu from '@antfu/eslint-config'
import tailwindcss from 'eslint-plugin-tailwindcss'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(antfu({
  formatters: true,
  vue: true,
  ...{
    ...tailwindcss.configs.recommended,
    plugins: {
      tailwindcss,
    },
  },
}))
