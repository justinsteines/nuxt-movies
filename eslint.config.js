import antfu from '@antfu/eslint-config'
import tailwindcss from 'eslint-plugin-tailwindcss'
import eslintConfigPrettier from 'eslint-config-prettier'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    vue: true,
    stylistic: false,
    formatters: true,
    ...{
      ...tailwindcss.configs.recommended,
      plugins: {
        tailwindcss,
      },
    },
  }),
  eslintConfigPrettier
)
